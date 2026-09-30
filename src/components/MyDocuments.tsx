import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit3, 
  Eye, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Download, 
  Filter, 
  FolderPlus 
} from 'lucide-react';
import { LegalDocument, DocumentCategory, DocumentStatus } from '../types/document';
import { exportDocumentAsDocx } from '../utils/storage';

interface MyDocumentsProps {
  documents: LegalDocument[];
  onOpenEditor: (doc: LegalDocument) => void;
  onOpenPreview: (doc: LegalDocument) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export const MyDocuments: React.FC<MyDocumentsProps> = ({
  documents,
  onOpenEditor,
  onOpenPreview,
  onDuplicate,
  onDelete,
  onCreateNew
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const categories = ['All', 'Business', 'Employment', 'Rental', 'Personal', 'Agreements'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.jurisdictionState.toLowerCase().includes(search.toLowerCase()) ||
      doc.partyA.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.partyB.name.toLowerCase().includes(search.toLowerCase());

    const matchesCat = categoryFilter === 'All' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Documents & Draft History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your legal agreements, contracts, and saved drafts in one centralized vault.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Document</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, party, or jurisdiction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'All'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'draft'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Finalized
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-slate-400 text-[11px] uppercase font-semibold">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              categoryFilter === cat
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <FolderPlus className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No documents found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You don't have any documents matching the current search filters. Create a new document to get started.
          </p>
          <button
            onClick={onCreateNew}
            className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 cursor-pointer"
          >
            Create New Document
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-medium">
              <tr>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 text-slate-700 dark:text-slate-300">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white max-w-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div className="truncate">
                        <p className="truncate">{doc.title}</p>
                        <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                          {doc.partyA.name} & {doc.partyB.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                    {doc.category}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {doc.jurisdictionState}, {doc.jurisdictionCountry}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {new Date(doc.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    {doc.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        <Clock className="w-3 h-3" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => onOpenEditor(doc)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded transition-colors"
                      title="Edit Document"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenPreview(doc)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/60 rounded transition-colors"
                      title="Preview Document"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => onDuplicate(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors"
                      title="Duplicate Document"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
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
  );
};
