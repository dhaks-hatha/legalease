import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Scale, FileText } from 'lucide-react';

interface GenerationLoaderProps {
  documentTitle: string;
  jurisdiction: string;
  onComplete: () => void;
}

export const GenerationLoader: React.FC<GenerationLoaderProps> = ({
  documentTitle,
  jurisdiction,
  onComplete
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages = [
    { title: 'Analyzing your information...', detail: `Parsing party obligations, roles, and scope parameters for ${jurisdiction}.` },
    { title: 'Structuring your document...', detail: 'Organizing recitals, definitions, and standard operational covenants.' },
    { title: 'Generating clauses...', detail: 'Applying non-disclosure terms, indemnification boundaries, and remedies.' },
    { title: 'Preparing your draft...', detail: 'Compiling formal numbering, signature blocks, and notary acknowledgments.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [stages.length, onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentStageIndex + 1) / stages.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-8 shadow-2xl text-center space-y-6">
        
        {/* Animated Badge */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-60" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Sparkles className="w-8 h-8 animate-pulse text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            AI Legal Draft Synthesis
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto truncate">
            Drafting <strong className="text-slate-200">{documentTitle}</strong>
          </p>
          <p className="text-[11px] font-mono text-teal-400 mt-0.5">
            Jurisdiction: {jurisdiction}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/60">
            <div
              className="bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Synthesizing Clauses</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Active Stages Checklist */}
        <div className="space-y-2.5 text-left pt-2">
          {stages.map((stg, idx) => {
            const isFinished = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-slate-800/90 border-teal-500/60 shadow-sm'
                    : isFinished
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-slate-900/30 border-slate-800/40 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-teal-400 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-white' : isFinished ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {stg.title}
                  </span>
                </div>
                {isCurrent && (
                  <p className="text-[11px] text-teal-300/80 mt-1 pl-6 leading-normal">
                    {stg.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500">
          Tailoring language to avoid non-enforceable ambiguities...
        </p>
      </div>
    </div>
  );
};
