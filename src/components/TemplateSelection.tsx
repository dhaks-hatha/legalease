import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../data/templates';
import { DocumentTemplate, DocumentCategory } from '../types/document';

interface TemplateSelectionProps {
  onSelectTemplate: (templateId: string) => void;
  onBackToDashboard: () => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  onSelectTemplate,
  onBackToDashboard
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<DocumentTemplate | null>(null);

  const categories = ['All', 'Business', 'Employment', 'Rental', 'Personal', 'Agreements'];

  const filteredTemplates = DOCUMENT_TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || tpl.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 mb-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Document Template Library
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose a verified contract or agreement template to begin your guided AI questionnaire.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates (e.g., NDA, Rental, Freelance, Privacy)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === cat
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid (All 9 requested templates) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all p-6 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{template.category}</span>
                <span className="font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{template.estimatedTime}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {template.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {template.description}
              </p>

              {/* Key Clauses List */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Clauses Included:
                </p>
                <ul className="space-y-1.5">
                  {template.keyClauses.slice(0, 4).map((clause, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span className="truncate">{clause}</span>
                    </li>
                  ))}
                  {template.keyClauses.length > 4 && (
                    <li className="text-[11px] text-slate-400 pl-5">
                      + {template.keyClauses.length - 4} additional jurisdiction clauses
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewTemplate(template)}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Inspect Clauses
              </button>

              <button
                onClick={() => onSelectTemplate(template.id)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Create</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Clauses Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{previewTemplate.category}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{previewTemplate.title}</h3>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {previewTemplate.description}
            </p>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Contract Structure & Default Clauses
              </h4>
              <div className="space-y-2">
                {previewTemplate.keyClauses.map((clause, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {idx + 1}.0 {clause}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Takes ~{previewTemplate.estimatedTime}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = previewTemplate.id;
                    setPreviewTemplate(null);
                    onSelectTemplate(id);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 cursor-pointer"
                >
                  Start Questionnaire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
