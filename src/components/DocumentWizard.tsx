import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Building2, 
  Calendar, 
  Globe2, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Edit2
} from 'lucide-react';
import { DocumentTemplate } from '../types/document';

interface DocumentWizardProps {
  template: DocumentTemplate;
  onBack: () => void;
  onGenerate: (formData: any) => void;
  onOpenAssistant: () => void;
}

export const DocumentWizard: React.FC<DocumentWizardProps> = ({
  template,
  onBack,
  onGenerate,
  onOpenAssistant
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: template.defaultValues.title,
    jurisdictionCountry: template.defaultValues.jurisdictionCountry,
    jurisdictionState: template.defaultValues.jurisdictionState,
    effectiveDate: template.defaultValues.effectiveDate,
    purpose: template.defaultValues.purpose,
    partyA: { ...template.defaultValues.partyA },
    partyB: { ...template.defaultValues.partyB },
    customTerms: { ...template.defaultValues.customTerms }
  });

  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Basic Information', desc: 'Title, Date & Jurisdiction' },
    { number: 2, title: 'Party Information', desc: 'Entity names & addresses' },
    { number: 3, title: 'Agreement Details', desc: 'Clauses, terms & parameters' },
    { number: 4, title: 'Review & Synthesize', desc: 'Audit summary & AI generate' }
  ];

  const handleFillDemoData = () => {
    setFormData({
      title: template.defaultValues.title,
      jurisdictionCountry: template.defaultValues.jurisdictionCountry,
      jurisdictionState: template.defaultValues.jurisdictionState,
      effectiveDate: template.defaultValues.effectiveDate,
      purpose: template.defaultValues.purpose,
      partyA: { ...template.defaultValues.partyA },
      partyB: { ...template.defaultValues.partyB },
      customTerms: { ...template.defaultValues.customTerms }
    });
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Document title is required.';
      if (!formData.jurisdictionCountry.trim()) errs.jurisdictionCountry = 'Country jurisdiction is required.';
      if (!formData.jurisdictionState.trim()) errs.jurisdictionState = 'State or province is required.';
      if (!formData.purpose.trim()) errs.purpose = 'Purpose of agreement is required.';
    } else if (step === 2) {
      if (!formData.partyA.name.trim()) errs.partyAName = 'Party A legal name is required.';
      if (!formData.partyA.address.trim()) errs.partyAAddress = 'Party A address is required.';
      if (!formData.partyB.name.trim()) errs.partyBName = 'Party B legal name is required.';
      if (!formData.partyB.address.trim()) errs.partyBAddress = 'Party B address is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = () => {
    if (!disclaimerAccepted) {
      setErrors({ disclaimer: 'Please acknowledge the legal disclaimer to generate your draft.' });
      return;
    }
    onGenerate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Demo Fill Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 mb-1"
          >
            ← Back to Templates
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {template.title}
            </h1>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
              Guided Drafting
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFillDemoData}
            type="button"
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Populate with realistic sample party and term data"
          >
            ✨ Fill Sample Demo Data
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((st) => {
          const isActive = currentStep === st.number;
          const isDone = currentStep > st.number;

          return (
            <div
              key={st.number}
              onClick={() => {
                if (st.number < currentStep || validateStep(currentStep)) {
                  setCurrentStep(st.number);
                }
              }}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500/80 text-blue-900 dark:text-blue-200'
                  : isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : st.number}
                </span>
                <span className="text-xs font-bold truncate">{st.title}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 pl-7 truncate hidden sm:block">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Step Form Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
        
        {/* STEP 1: Basic Information & Jurisdiction */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 1: Basic Information & Governing Jurisdiction
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Specifying the correct legal jurisdiction is essential because contract statutes, tenant rights, and non-disclosure standards vary by region.
              </p>
            </div>

            <div className="space-y-4">
              {/* Document Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Mutual Non-Disclosure Agreement"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              {/* Jurisdiction Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Governing Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jurisdictionCountry}
                    onChange={(e) => setFormData({ ...formData, jurisdictionCountry: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="European Union">European Union</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    State / Province / Region <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.jurisdictionState}
                    onChange={(e) => setFormData({ ...formData, jurisdictionState: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Delaware, California, Ontario, Maharashtra"
                  />
                  {errors.jurisdictionState && <p className="text-xs text-red-500 mt-1">{errors.jurisdictionState}</p>}
                </div>
              </div>

              {/* Effective Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Effective Execution Date
                </label>
                <input
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  className="w-full sm:w-64 px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Purpose of Agreement <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the commercial context, scope of project, or tenancy reason..."
                />
                {errors.purpose && <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Party Information */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 2: Contracting Parties & Signatories
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter the formal legal names, entity classifications, and registered addresses for both parties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Party A */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {formData.partyA.role || 'First Party (Party A)'}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">Disclosing / Primary</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Legal Entity / Full Individual Name *
                  </label>
                  <input
                    type="text"
                    value={formData.partyA.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, name: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g. Apex Horizon Technologies Inc."
                  />
                  {errors.partyAName && <p className="text-[11px] text-red-500 mt-0.5">{errors.partyAName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Entity Type
                    </label>
                    <input
                      type="text"
                      value={formData.partyA.entityType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyA: { ...formData.partyA, entityType: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="e.g. Corporation, LLC, Individual"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={formData.partyA.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyA: { ...formData.partyA, email: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="contact@entity.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Registered Physical Address *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.partyA.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, address: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    placeholder="Street, Suite, City, State, ZIP"
                  />
                  {errors.partyAAddress && <p className="text-[11px] text-red-500 mt-0.5">{errors.partyAAddress}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Authorized Signatory
                    </label>
                    <input
                      type="text"
                      value={formData.partyA.signatoryName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyA: { ...formData.partyA, signatoryName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="e.g. Elena Rostova"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Signatory Title
                    </label>
                    <input
                      type="text"
                      value={formData.partyA.signatoryTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyA: { ...formData.partyA, signatoryTitle: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="e.g. Chief Executive Officer"
                    />
                  </div>
                </div>
              </div>

              {/* Party B */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    {formData.partyB.role || 'Second Party (Party B)'}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">Receiving / Counterparty</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Legal Entity / Full Individual Name *
                  </label>
                  <input
                    type="text"
                    value={formData.partyB.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, name: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    placeholder="e.g. Vanguard Ventures LLC"
                  />
                  {errors.partyBName && <p className="text-[11px] text-red-500 mt-0.5">{errors.partyBName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Entity Type
                    </label>
                    <input
                      type="text"
                      value={formData.partyB.entityType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyB: { ...formData.partyB, entityType: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="e.g. LLC, Corporation, Individual"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={formData.partyB.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyB: { ...formData.partyB, email: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="partner@counterparty.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Registered Physical Address *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.partyB.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, address: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    placeholder="Street, Suite, City, State, ZIP"
                  />
                  {errors.partyBAddress && <p className="text-[11px] text-red-500 mt-0.5">{errors.partyBAddress}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Authorized Signatory
                    </label>
                    <input
                      type="text"
                      value={formData.partyB.signatoryName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyB: { ...formData.partyB, signatoryName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="e.g. Marcus Vance"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Signatory Title
                    </label>
                    <input
                      type="text"
                      value={formData.partyB.signatoryTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partyB: { ...formData.partyB, signatoryTitle: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      placeholder="e.g. Managing Director"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Agreement Details & Specific Parameters */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 3: Agreement Clauses & Specific Terms
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize operational provisions, survival periods, fees, and dispute mechanisms for this {template.title}.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(formData.customTerms).map(([key, val]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customTerms: { ...formData.customTerms, [key]: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              {/* Extra Clause Suggestion Callout */}
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Want assistance understanding these clause options?</span>
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300/80">
                    You can ask LegalEase Assistant anytime to explain dispute mechanisms, indemnification caps, or survival terms.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenAssistant}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors shrink-0"
                >
                  Ask Assistant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review Summary & AI Synthesis Action */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 4: Review & Finalize Draft
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Please audit your contract summary below. You can click any section to make edits before AI synthesis.
              </p>
            </div>

            {/* Audit Summary Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-xs">
              
              {/* Section 1 summary */}
              <div className="p-4 flex items-start justify-between gap-4">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px]">
                    Basic Info & Jurisdiction
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{formData.title}</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Jurisdiction: <span className="font-mono text-slate-700 dark:text-slate-300">{formData.jurisdictionState}, {formData.jurisdictionCountry}</span> · Effective Date: <span className="font-mono">{formData.effectiveDate}</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Purpose: {formData.purpose}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Section 2 summary */}
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 text-[10px]">
                      {formData.partyA.role}
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{formData.partyA.name}</p>
                    <p className="text-slate-500 text-[11px]">{formData.partyA.address}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Signatory: {formData.partyA.signatoryName} ({formData.partyA.signatoryTitle})</p>
                  </div>

                  <div>
                    <span className="font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 text-[10px]">
                      {formData.partyB.role}
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{formData.partyB.name}</p>
                    <p className="text-slate-500 text-[11px]">{formData.partyB.address}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Signatory: {formData.partyB.signatoryName} ({formData.partyB.signatoryTitle})</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 font-medium shrink-0"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Section 3 summary */}
              <div className="p-4 flex items-start justify-between gap-4">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px]">
                    Specific Terms & Scope
                  </span>
                  <div className="mt-1 space-y-1 text-slate-700 dark:text-slate-300">
                    {Object.entries(formData.customTerms).map(([k, v]) => (
                      <p key={k}>
                        <strong className="font-medium text-slate-500 dark:text-slate-400">{k}:</strong> {v}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

            </div>

            {/* Mandatory Statutory Disclaimer Checkbox */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={disclaimerAccepted}
                  onChange={(e) => {
                    setDisclaimerAccepted(e.target.checked);
                    if (e.target.checked) {
                      const newErrs = { ...errors };
                      delete newErrs.disclaimer;
                      setErrors(newErrs);
                    }
                  }}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  I understand that <strong>LegalEase provides document drafts for informational purposes and is not a law firm</strong>. These drafts may not cover every statutory requirement in {formData.jurisdictionState}, {formData.jurisdictionCountry}. I agree to consult a licensed attorney before relying on this contract for binding commercial or legal disputes.
                </span>
              </label>
              {errors.disclaimer && (
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 pl-7">
                  {errors.disclaimer}
                </p>
              )}
            </div>

            {/* Big Action Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>Generate Draft with AI</span>
              </button>
              <p className="text-[11px] text-slate-400 mt-2">
                Synthesizes {template.keyClauses.length} jurisdiction-tailored clauses into an editable document
              </p>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons (Prev / Next) */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={currentStep === 1 ? onBack : handlePrev}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentStep === 1 ? 'Cancel' : 'Previous Step'}</span>
          </button>

          {currentStep < 4 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
