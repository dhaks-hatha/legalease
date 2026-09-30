import React from 'react';
import { 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  SlidersHorizontal, 
  Download, 
  Eye, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Users, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../data/templates';

interface LandingPageProps {
  onStartCreate: () => void;
  onExploreTemplates: () => void;
  onSelectTemplate: (templateId: string) => void;
  onOpenAssistant: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreate,
  onExploreTemplates,
  onSelectTemplate,
  onOpenAssistant
}) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Statutory Disclaimer Ribbon at top of landing */}
      <div className="bg-amber-950/60 border-b border-amber-800/40 px-4 py-2 text-center text-xs text-amber-200/90 flex items-center justify-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          <strong>Legal Disclaimer:</strong> LegalEase provides AI-assisted document drafts for informational purposes and is not a law firm. Always consult a licensed attorney for binding legal counsel.
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-teal-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Legal-Tech Drafting Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance">
                Create Legal Documents,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                  Simplified by AI
                </span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Draft customized, jurisdiction-compliant legal contracts, NDAs, rental agreements, and employment offers in minutes. Answer plain-English questions, review generated clauses, and inspect explanations in plain language.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onStartCreate}
                  className="px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Create a Document</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={onExploreTemplates}
                  className="px-6 py-3.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 transition-colors cursor-pointer"
                >
                  Explore Templates (9)
                </button>
              </div>

              {/* Trust & Audience Markers */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>State & Country Specific Jurisdiction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Plain-English Clause Explanations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Export to PDF & DOCX</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Document Draft Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-2xl relative">
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/70 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="font-mono text-slate-300 ml-2">Mutual_NDA_Draft.pdf</span>
                  </div>
                  <span className="text-[11px] text-teal-400 font-medium">AI Synthesized</span>
                </div>

                {/* Simulated Document Preview */}
                <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3 font-legal text-xs text-slate-300 leading-relaxed">
                  <div className="text-center pb-2 border-b border-slate-800">
                    <p className="font-sans text-[11px] tracking-widest uppercase text-slate-400">Contract Draft Specimen</p>
                    <h3 className="font-sans font-bold text-sm text-white mt-1">MUTUAL NON-DISCLOSURE AGREEMENT</h3>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">Governing Jurisdiction: Delaware, United States</p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-200">1.0 DEFINITION OF CONFIDENTIAL INFORMATION</p>
                    <p className="text-slate-300 mt-1 line-clamp-3">
                      "Confidential Information" shall include all proprietary trade secrets, algorithms, customer data, and business plans exchanged between Apex Horizon Technologies Inc. and Vanguard Ventures LLC...
                    </p>
                  </div>

                  {/* Interactive simulated AI callout */}
                  <div className="p-2.5 rounded-md bg-teal-950/50 border border-teal-800/60 font-sans text-[11px]">
                    <div className="flex items-center gap-1.5 font-semibold text-teal-300 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>LegalEase AI Plain-English Breakdown</span>
                    </div>
                    <p className="text-teal-200/90 leading-normal">
                      Protects all disclosed proprietary software and records for 3 years. Both parties are barred from leaking details to non-essential personnel.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-sans text-slate-400 border-t border-slate-800">
                    <span>Parties: 2 Verified Entities</span>
                    <button
                      onClick={() => onSelectTemplate('nda')}
                      className="text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
                    >
                      <span>Draft this agreement</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A Complete Legal Document Engine
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Engineered specifically for individuals, freelancers, startups, and students who need reliable document drafts without billable hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">AI-Powered Drafting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart synthesis generates customized clauses based on your exact jurisdiction, party designations, and commercial parameters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Easy Guided Forms</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step-by-step plain English questionnaires. No confusing legalese—fill in parties, term lengths, and payment terms intuitively.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Multiple Document Types</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ready-to-use templates for NDAs, Residential Leases, Employment Contracts, Freelance SOWs, General Affidavits, and Partnership Deeds.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Download & Edit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full clause-by-clause editor with "Explain in Plain English", rewrite tools, and instant export to professional PDF or editable DOCX formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates Showcase */}
      <section className="py-16 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-teal-400">Library of Templates</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Standard Commercial & Personal Drafts
              </h2>
            </div>
            <button
              onClick={onExploreTemplates}
              className="text-xs font-medium text-teal-400 hover:text-teal-300 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View all 9 templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCUMENT_TEMPLATES.slice(0, 3).map((template) => (
              <div
                key={template.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{template.category}</span>
                    <span className="font-mono">{template.estimatedTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <p className="font-medium text-slate-300 mb-1">Key clauses covered:</p>
                    <ul className="space-y-1">
                      {template.keyClauses.slice(0, 3).map((kc, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-1 h-1 rounded-full bg-teal-400" />
                          <span className="truncate">{kc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Draft Status: Ready</span>
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                  >
                    Create Draft
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences Bento */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Designed For Real-World Need
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Standardize agreements without the prohibitive overhead of traditional retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <Building2 className="w-6 h-6 text-teal-400 mb-3" />
              <h3 className="text-sm font-semibold text-white">Startups & Founders</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Execute mutual NDAs with angel investors, co-founder equity splits, and vendor master services agreements.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <Briefcase className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-sm font-semibold text-white">Freelancers & Creators</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Protect your design, engineering, and consulting deliverables with milestone clauses and IP transfer terms.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <GraduationCap className="w-6 h-6 text-indigo-400 mb-3" />
              <h3 className="text-sm font-semibold text-white">Students & Researchers</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Learn contract mechanics, understand plain-English legal clauses, and draft project collaboration deeds.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <Users className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-sm font-semibold text-white">Tenants & Landlords</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Draft straightforward residential rental agreements, pet deposit addenda, and leave-and-license permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Statutory Disclaimer Section */}
      <section className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Important Legal Notice & Terms of Use</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            LegalEase uses artificial intelligence to generate preliminary document drafts based upon user input. These drafts are intended strictly for educational, informational, and organizational purposes and may not cover unique statutory peculiarities of every municipality or jurisdiction. LegalEase is not a law firm, does not provide legal representation, and does not create an attorney-client relationship. You should consult a qualified legal professional licensed in your jurisdiction prior to signing binding legal agreements.
          </p>
          <div className="mt-6">
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Have questions about contract clauses? Ask LegalEase Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-teal-400" />
            <span className="font-semibold text-slate-200">LegalEase</span>
            <span>· AI-Powered Legal Document Generator</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onExploreTemplates} className="hover:text-slate-200 transition-colors">Templates</button>
            <button onClick={onOpenAssistant} className="hover:text-slate-200 transition-colors">AI Assistant</button>
            <span>Draft Specimen v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
