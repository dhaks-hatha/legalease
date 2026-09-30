import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Edit3, 
  Eye, 
  Copy, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert,
  FolderOpen
} from 'lucide-react';
import { LegalDocument, DocumentCategory } from '../types/document';
import { DOCUMENT_TEMPLATES } from '../data/templates';

interface DashboardProps {
  documents: LegalDocument[];
  onSelectTemplate: (templateId: string) => void;
  onOpenEditor: (doc: LegalDocument) => void;
  onOpenPreview: (doc: LegalDocument) => void;
  onDuplicateDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onNavigateToTemplates: () => void;
  onNavigateToAllDocuments: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  documents,
  onSelectTemplate,
  onOpenEditor,
  onOpenPreview,
  onDuplicateDocument,
  onDeleteDocument,
  onNavigateToTemplates,
  onNavigateToAllDocuments
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Business', 'Employment', 'Rental', 'Personal', 'Agreements'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.jurisdictionState.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const recentDocs = filteredDocs.slice(0, 5);
  const drafts = documents.filter((d) => d.status === 'draft');
  const completed = documents.filter((d) => d.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Workspace Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, <strong className="font-semibold text-slate-700 dark:text-slate-300">Alex Rivera</strong>. Draft, review, and customize legal contracts with AI assistance.
          </p>
        </div>

        <button
          onClick={onNavigateToTemplates}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Document</span>
        </button>
      </div>

      {/* Quantitative Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Drafts in Vault
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
              {documents.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              9 Templates Available
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Active Drafts
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {drafts.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Ready for editing</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Finalized Drafts
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {completed.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Exportable to PDF</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by title, party or jurisdiction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Documents Table & Saved Drafts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recently Generated Documents & Drafts
            </h2>
          </div>
          {documents.length > 5 && (
            <button
              onClick={onNavigateToAllDocuments}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View all ({documents.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentDocs.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No documents found matching criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or generate a new document from templates.</p>
            <button
              onClick={onNavigateToTemplates}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 cursor-pointer"
            >
              Choose a Template
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-medium">
                <tr>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Jurisdiction</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 text-slate-700 dark:text-slate-300">
                {recentDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                      {doc.category}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {doc.jurisdictionState}, {doc.jurisdictionCountry}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {new Date(doc.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      {doc.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Final Draft</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                          <Clock className="w-3 h-3" />
                          <span>In Draft</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => onOpenEditor(doc)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                        title="Edit Clauses & Wording"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenPreview(doc)}
                        className="p-1.5 text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                        title="Preview Formal A4 Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDuplicateDocument(doc.id)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                        title="Duplicate Document"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteDocument(doc.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Template Picker Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Start with a Proven Legal Template
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any document to launch the 4-step AI drafting wizard.
            </p>
          </div>
          <button
            onClick={onNavigateToTemplates}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Browse All 9 Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOCUMENT_TEMPLATES.slice(0, 3).map((template) => (
            <div
              key={template.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-medium text-blue-600 dark:text-blue-400">{template.category}</span>
                  <span className="font-mono text-[11px]">{template.estimatedTime}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{template.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {template.keyClauses.length} standard clauses
                </span>
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Disclaimer Ribbon at Bottom */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Notice:</strong> LegalEase uses AI to generate document drafts based on the information provided by the user. These drafts are for informational purposes and may not be suitable for every situation. LegalEase is not a law firm and does not provide legal advice. Users should consult a qualified legal professional when appropriate.
        </p>
      </div>
    </div>
  );
};
