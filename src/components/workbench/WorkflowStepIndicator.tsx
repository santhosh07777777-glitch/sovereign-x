import React from 'react';
import { useAppStore } from '../../services/store';
import { UploadCloud, Play, CheckCheck, FileText, ArrowRight } from 'lucide-react';

export const WorkflowStepIndicator: React.FC = () => {
  const store = useAppStore();

  // Determine current active step:
  // 1: Upload (idle, or before run)
  // 2: Analyze (running agents 1-5)
  // 3: Verify (running verification agent)
  // 4: Result (completed)
  let currentStep = 1;

  if (store.isExecutingWorkflow) {
    if (store.activeNodeIndex >= 6) {
      currentStep = 3; // Verify stage
    } else {
      currentStep = 2; // Analyze stage
    }
  } else if (store.hasExecutedDemo) {
    currentStep = 4; // Result completed
  }

  const steps = [
    { number: 1, label: 'Upload', icon: UploadCloud },
    { number: 2, label: 'Analyze', icon: Play },
    { number: 3, label: 'Verify', icon: CheckCheck },
    { number: 4, label: 'Result', icon: FileText },
  ];

  return (
    <div className="bg-[#0a0d14] border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between select-none">
      <div className="flex items-center gap-1.5 sm:gap-4 text-xs font-mono">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isPassed = currentStep > step.number;

          return (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-glow-cyan'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isPassed ? '✓' : step.number}
                </div>
                <span
                  className={`tracking-wider ${
                    isActive
                      ? 'text-cyan-300 font-bold'
                      : isPassed
                      ? 'text-slate-300 font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <span className="text-slate-700 hidden sm:inline">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Local Air-Gapped Intelligence</span>
      </div>
    </div>
  );
};
