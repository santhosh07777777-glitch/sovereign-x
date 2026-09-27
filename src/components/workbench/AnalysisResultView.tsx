import React from 'react';
import { useAppStore } from '../../services/store';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  BookOpen, 
  Eye, 
  FileCheck2, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers
} from 'lucide-react';

export const AnalysisResultView: React.FC = () => {
  const store = useAppStore();

  const handleOpenEvidence = () => {
    // Open the primary document in SplitScreenViewer
    if (store.documents.length > 0) {
      store.setDocumentForViewer(store.documents[0]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#07090e] font-mono text-xs overflow-hidden select-none">
      {/* Top Header */}
      <div className="px-6 py-4 border-b border-slate-800/80 bg-[#0a0d14] flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-wide">
              Analysis Result
            </h1>
            <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              Pump_P204_Inspection_Report.pdf
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Local Sovereign AI verified diagnostic summary
          </p>
        </div>

        <button
          onClick={() => store.setDeliverableModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-glow-cyan transition-all"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        {store.isExecutingWorkflow ? (
          /* Clean, calm loading state */
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
              <Cpu className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                SOVEREIGN-X is analyzing the document
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Local AI agents are processing your request.
              </p>
            </div>
            <div className="text-[10px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-800">
              Air-Gapped Local Inference • Zero Cloud Transmission
            </div>
          </div>
        ) : (
          /* High-Impact Clean Result Card */
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Top Verification Status Badge */}
            <div className="p-4 rounded-xl bg-[#0c1017] border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">
                  Verification Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-cyan-300 font-bold">94.2% confidence</span>
                </div>
              </div>

              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800 font-semibold">
                Ground-Truth Cross-Checked
              </span>
            </div>

            {/* Primary Finding Alert Box */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 to-rose-950/20 border border-amber-500/30 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Finding: Pump P-204 Requires Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Abnormal vibration and bearing temperature were detected during the latest operational cycle.
              </p>
            </div>

            {/* Key Findings List */}
            <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 shadow-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-200">
                Key Findings
              </h3>

              <div className="space-y-3">
                {/* Finding 1 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#07090e] border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    1
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">High vibration</span>
                      <span className="text-xs font-bold text-rose-400 font-mono">7.8 mm/s RMS</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Reference limit: 4.5 mm/s RMS (ISO 10816-3 Zone D breach)
                    </p>
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#07090e] border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    2
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">High bearing temperature</span>
                      <span className="text-xs font-bold text-amber-400 font-mono">86°C</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Recommended limit: 75°C (OEM API 610 design threshold)
                    </p>
                  </div>
                </div>

                {/* Finding 3 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#07090e] border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    3
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Maintenance overdue</span>
                      <span className="text-xs font-bold text-slate-300 font-mono">~120 hours</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Periodic lubrication and seal inspection window exceeded
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 shadow-lg space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-200">
                Recommended Actions
              </h3>

              <div className="space-y-2">
                {[
                  'Inspect the drive-end and non-drive-end bearing assembly',
                  'Check and correct lubrication level (ISO VG 68 mineral lubricant)',
                  'Verify pump and motor shaft alignment before restarting',
                  'Repeat vibration and temperature measurements under load'
                ].map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#07090e] border border-slate-800/80 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Evidence References */}
            <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-200">
                  Supporting Evidence
                </h3>
                <button
                  onClick={handleOpenEvidence}
                  className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" /> View Evidence in Detail
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={handleOpenEvidence}
                  className="p-3 rounded-lg bg-[#07090e] border border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Inspection Report
                      </p>
                      <p className="text-[10px] text-slate-400">Page 4 • Table 2 (Vibration Spectrum)</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div
                  onClick={handleOpenEvidence}
                  className="p-3 rounded-lg bg-[#07090e] border border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                        SOP-204
                      </p>
                      <p className="text-[10px] text-slate-400">Section 3.2 • Shutdown Criteria</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-400">
                Lead Chief Engineer Sign-Off: Ready for Dispatch
              </span>
              <button
                onClick={() => store.setDeliverableModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-glow-cyan transition-all"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
