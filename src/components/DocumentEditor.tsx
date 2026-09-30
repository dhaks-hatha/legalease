import React, { useState } from 'react';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Plus, 
  RotateCcw, 
  RotateCw, 
  Search, 
  Bold, 
  Italic, 
  Underline, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  Check, 
  FileText, 
  ChevronRight, 
  X,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { LegalDocument, DocumentClause } from '../types/document';
import { 
  explainClause, 
  simplifyClause, 
  rewriteClause, 
  SUGGESTED_ADDITIONAL_CLAUSES,
  ClauseExplanation
} from '../utils/aiLegalEngine';

interface DocumentEditorProps {
  document: LegalDocument;
  onSave: (doc: LegalDocument) => void;
  onPreview: (doc: LegalDocument) => void;
  onBack: () => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  document: initialDoc,
  onSave,
  onPreview,
  onBack
}) => {
  const [doc, setDoc] = useState<LegalDocument>(initialDoc);
  const [history, setHistory] = useState<LegalDocument[]>([initialDoc]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [selectedClauseId, setSelectedClauseId] = useState<string>(
    initialDoc.clauses[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [explanationData, setExplanationData] = useState<ClauseExplanation | null>(null);
  const [rewriteSuggestion, setRewriteSuggestion] = useState<string | null>(null);
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  // Push state to undo/redo history
  const updateDocWithHistory = (newDoc: LegalDocument) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newDoc);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setDoc(newDoc);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDoc(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDoc(history[historyIndex + 1]);
    }
  };

  const selectedClause = doc.clauses.find((c) => c.id === selectedClauseId) || doc.clauses[0];

  const handleClauseTextChange = (clauseId: string, newText: string) => {
    const updatedClauses = doc.clauses.map((c) =>
      c.id === clauseId ? { ...c, text: newText } : c
    );
    const newDoc = { ...doc, clauses: updatedClauses };
    updateDocWithHistory(newDoc);
  };

  const handleClauseHeadingChange = (clauseId: string, newHeading: string) => {
    const updatedClauses = doc.clauses.map((c) =>
      c.id === clauseId ? { ...c, heading: newHeading } : c
    );
    const newDoc = { ...doc, clauses: updatedClauses };
    updateDocWithHistory(newDoc);
  };

  const handleAddClause = () => {
    const newNum = `${doc.clauses.length + 1}.0`;
    const newClause: DocumentClause = {
      id: `c-custom-${Date.now()}`,
      number: newNum,
      heading: 'Additional Covenant or Provision',
      text: 'The Parties further mutually covenant and agree to perform and observe all covenants, stipulations, and agreements herein contained.',
      explanation: 'Customized provision added by user.',
      category: 'Custom'
    };
    const newDoc = { ...doc, clauses: [...doc.clauses, newClause] };
    updateDocWithHistory(newDoc);
    setSelectedClauseId(newClause.id);
  };

  const handleDeleteClause = (clauseId: string) => {
    if (doc.clauses.length <= 1) return;
    const updatedClauses = doc.clauses
      .filter((c) => c.id !== clauseId)
      .map((c, i) => ({ ...c, number: `${i + 1}.0` }));
    const newDoc = { ...doc, clauses: updatedClauses };
    updateDocWithHistory(newDoc);
    if (selectedClauseId === clauseId) {
      setSelectedClauseId(updatedClauses[0]?.id || '');
    }
  };

  const handleExplainClause = () => {
    if (!selectedClause) return;
    const expl = explainClause(selectedClause.heading, selectedClause.text);
    setExplanationData(expl);
    setRewriteSuggestion(null);
  };

  const handleSimplifyClause = () => {
    if (!selectedClause) return;
    const simplified = simplifyClause(selectedClause.text);
    setRewriteSuggestion(simplified);
    setExplanationData(null);
  };

  const handleRewriteStyle = (style: 'strict' | 'mutual' | 'simplified') => {
    if (!selectedClause) return;
    const rewritten = rewriteClause(selectedClause.heading, style);
    setRewriteSuggestion(rewritten);
    setExplanationData(null);
  };

  const handleApplyRewrite = () => {
    if (!selectedClause || !rewriteSuggestion) return;
    handleClauseTextChange(selectedClause.id, rewriteSuggestion);
    setRewriteSuggestion(null);
  };

  const handleInsertSuggestedClause = (sug: typeof SUGGESTED_ADDITIONAL_CLAUSES[0]) => {
    const newNum = `${doc.clauses.length + 1}.0`;
    const newClause: DocumentClause = {
      id: `c-sug-${Date.now()}`,
      number: newNum,
      heading: sug.heading,
      text: sug.text,
      explanation: sug.explanation,
      category: 'Suggested'
    };
    const newDoc = { ...doc, clauses: [...doc.clauses, newClause] };
    updateDocWithHistory(newDoc);
    setSelectedClauseId(newClause.id);
    setShowSuggestModal(false);
  };

  const handleSave = () => {
    onSave(doc);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const filteredClauses = doc.clauses.filter((c) =>
    c.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      {/* Top Editor Bar */}
      <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left: Back & Title Edit */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={doc.title}
                  onChange={(e) => updateDocWithHistory({ ...doc, title: e.target.value })}
                  className="font-bold text-sm sm:text-base text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 focus:outline-none px-1 py-0.5"
                />
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {doc.jurisdictionState}, {doc.jurisdictionCountry}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pl-1">
                Draft auto-saved locally · {doc.clauses.length} clauses
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Undo / Redo */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Redo (Ctrl+Y)"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={() => onPreview(doc)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview A4 Document</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main 2-Column Editor Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Clause Navigation & Editor (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          
          {/* Formatting & Clause Search Toolbar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find in clauses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

              <button
                onClick={handleAddClause}
                className="px-2.5 py-1 text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Clause</span>
              </button>

              <button
                onClick={() => setShowSuggestModal(true)}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Suggest Clauses</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              {filteredClauses.length} clauses displayed
            </div>
          </div>

          {/* Clause Cards Stack */}
          <div className="space-y-4">
            {filteredClauses.map((clause) => {
              const isSelected = clause.id === selectedClauseId;

              return (
                <div
                  key={clause.id}
                  onClick={() => setSelectedClauseId(clause.id)}
                  className={`rounded-xl border transition-all p-5 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-500/80 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                        {clause.number}
                      </span>
                      <input
                        type="text"
                        value={clause.heading}
                        onChange={(e) => handleClauseHeadingChange(clause.id, e.target.value)}
                        className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 focus:outline-none flex-1 px-1"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClauseId(clause.id);
                          handleExplainClause();
                        }}
                        className="p-1 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-xs flex items-center gap-1"
                        title="Explain this clause in plain English"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">Explain</span>
                      </button>

                      {doc.clauses.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClause(clause.id);
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                          title="Delete Clause"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Clause Text Editor Area */}
                  <textarea
                    rows={4}
                    value={clause.text}
                    onChange={(e) => handleClauseTextChange(clause.id, e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-legal leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                  />

                  {/* Inline quick plain-English explanation bar */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <p className="italic truncate max-w-md">
                      <strong>AI Summary:</strong> {clause.explanation}
                    </p>
                    {isSelected && (
                      <span className="text-blue-500 dark:text-blue-400 font-medium">
                        Active in AI Assistant →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: AI Clause Assistant Panel (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="sticky top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    AI Clause Assistant
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Analyzing Clause {selectedClause.number}: {selectedClause.heading}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Explain, Make Simpler, Rewrite, Suggest */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExplainClause}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 mb-0.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Explain Clause</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Plain-English meaning & risks
                </p>
              </button>

              <button
                onClick={handleSimplifyClause}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-0.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Make Simpler</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Strip jargon into plain language
                </p>
              </button>
            </div>

            {/* Rewrite Tone Selectors */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 space-y-2">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Rewrite Clause Style:
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRewriteStyle('strict')}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Strict / High Protection
                </button>
                <button
                  onClick={() => handleRewriteStyle('mutual')}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Balanced / Mutual
                </button>
              </div>
            </div>

            {/* Result Area: Plain English Explanation */}
            {explanationData && (
              <div className="p-4 rounded-xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/80 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                    Plain-English Explanation
                  </span>
                  <button
                    onClick={() => setExplanationData(null)}
                    className="text-teal-600 hover:text-teal-800 dark:text-teal-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <p className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed font-medium">
                  {explanationData.plainEnglish}
                </p>

                <div className="pt-2 border-t border-teal-200 dark:border-teal-900/60 text-[11px] text-teal-800 dark:text-teal-300 space-y-1">
                  <p className="font-semibold">Key Considerations & Legal Risks:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {explanationData.keyRisks.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                  </ul>
                  <p className="mt-2 pt-1 font-semibold text-teal-950 dark:text-teal-100">
                    Practical Tip: <span className="font-normal text-teal-800 dark:text-teal-200">{explanationData.practicalTip}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Result Area: Rewrite Suggestion with 1-Click Replace */}
            {rewriteSuggestion && (
              <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                    AI Suggested Replacement Text
                  </span>
                  <button
                    onClick={() => setRewriteSuggestion(null)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900 text-xs font-legal leading-relaxed text-slate-800 dark:text-slate-200">
                  {rewriteSuggestion}
                </div>

                <button
                  onClick={handleApplyRewrite}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Replace in Document</span>
                </button>
              </div>
            )}

            {/* Suggested Clauses Quick Add */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Recommended Standard Clauses
              </p>
              <div className="space-y-1.5">
                {SUGGESTED_ADDITIONAL_CLAUSES.slice(0, 3).map((sug) => (
                  <button
                    key={sug.id}
                    onClick={() => handleInsertSuggestedClause(sug)}
                    className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                      + {sug.heading}
                    </span>
                    <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer Box */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300/80 leading-normal flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>
                LegalEase AI provides clause explanations for clarity. These do not constitute formal legal opinions or attorney representation.
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Suggested Clauses Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Add Recommended Legal Clauses
                </h3>
              </div>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Select standard commercial and risk-mitigation clauses to append to your {doc.title}.
            </p>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {SUGGESTED_ADDITIONAL_CLAUSES.map((sug) => (
                <div
                  key={sug.id}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {sug.heading}
                    </h4>
                    <button
                      onClick={() => handleInsertSuggestedClause(sug)}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                    >
                      Insert Clause
                    </button>
                  </div>
                  <p className="text-xs font-legal text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sug.text}
                  </p>
                  <p className="text-[11px] text-teal-600 dark:text-teal-400 italic">
                    Purpose: {sug.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSuggestModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Draft Success Notification Toast */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 shadow-2xl rounded-xl px-4 py-3 flex items-center gap-3 animate-in slide-in-from-bottom-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Draft Saved Locally</p>
            <p className="text-[11px] text-slate-400">All clauses and party revisions stored safely.</p>
          </div>
        </div>
      )}
    </div>
  );
};
