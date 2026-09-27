import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { VerificationItem } from '../types';
import { 
  CheckCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Eye, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const VerificationPage: React.FC = () => {
  const store = useAppStore();
  const [selectedItem, setSelectedItem] = useState<VerificationItem>(store.verificationQueue[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredQueue = store.verificationQueue.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              FORMAL VERIFICATION & AUDIT CENTER
            </h1>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800 font-semibold">
              HUMAN-IN-THE-LOOP (HITL) ENABLED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Independent ground-truth cross-examination of AI claims against raw document coordinates and industrial standards.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-1.5 bg-[#0c1017] p-1 rounded border border-slate-800 text-xs">
          {['ALL', 'Verified', 'Needs Review', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded transition-colors ${
                filterStatus === status
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Queue Table (7 cols) + Verification Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Verification Queue (7 cols) */}
        <div className="lg:col-span-7 bg-[#0c1017] border border-slate-800 rounded-xl overflow-hidden shadow-xl text-xs flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-[#07090e] flex items-center justify-between">
            <span className="font-bold text-white uppercase tracking-wider text-xs">
              Active Verification Queue ({filteredQueue.length})
            </span>
            <span className="text-[10px] text-slate-400">Deterministic Confidence Threshold: 90%</span>
          </div>

          <div className="divide-y divide-slate-800/80 overflow-y-auto max-h-[560px]">
            {filteredQueue.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 transition-colors cursor-pointer ${
                    isSelected ? 'bg-cyan-950/20 border-l-2 border-cyan-400' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-semibold text-white leading-relaxed flex-1">
                      {item.claim}
                    </p>
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>Source: <strong className="text-slate-200">{item.sourceDoc}</strong></span>
                      <span>Loc: <strong className="text-cyan-400">{item.sourcePage}</strong></span>
                    </div>
                    <span className="text-emerald-400 font-bold">
                      Confidence: {item.confidence}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Verification Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                    Claim Validation Ledger
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{selectedItem.id}</span>
                    <StatusBadge status={selectedItem.status} size="sm" />
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <span>Agent: {selectedItem.generatingAgent}</span>
                  <div className="text-emerald-400 font-bold">{selectedItem.confidence}% Verified</div>
                </div>
              </div>

              {/* Claim Display */}
              <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  AI-Generated Assertion
                </span>
                <p className="text-xs text-white leading-relaxed font-sans">
                  "{selectedItem.claim}"
                </p>
              </div>

              {/* Ground Truth Source Reference */}
              <div className="p-3 rounded-lg bg-[#080d14] border border-cyan-500/30 space-y-1">
                <span className="text-[10px] text-cyan-400 uppercase font-bold block flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Ground-Truth Source Excerpt ({selectedItem.sourceDoc} / {selectedItem.sourcePage})
                </span>
                <p className="text-xs text-cyan-200 italic leading-relaxed">
                  {selectedItem.groundTruthExcerpt}
                </p>
              </div>

              {/* Independent Validation */}
              <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block flex items-center gap-1">
                  <Scale className="w-3 h-3" />
                  Independent Validation Engine Output
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedItem.independentCheck}
                </p>
              </div>

              {selectedItem.reviewerNotes && (
                <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
                  <strong>Engineer Flag:</strong> {selectedItem.reviewerNotes}
                </div>
              )}

              {/* Action Buttons: Functional Approve / Reject / Reverification */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => store.approveVerificationItem(selectedItem.id)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-emerald transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Claim
                  </button>
                  <button
                    onClick={() => store.rejectVerificationItem(selectedItem.id)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Claim
                  </button>
                </div>

                <button
                  onClick={() => store.requestReverification(selectedItem.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  Request Deep Reverification
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select a verification queue item.
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400">
            Signoff Authority: Dr. A. Verma (Lead Chief Engineer) • SHA-256 Validated
          </div>
        </div>
      </div>
    </div>
  );
};
