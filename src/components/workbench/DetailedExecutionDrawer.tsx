import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { 
  X, 
  Layers, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  FileCode, 
  GitMerge, 
  CheckCheck, 
  Server, 
  ExternalLink,
  Lock,
  Hash
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface DetailedExecutionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailedExecutionDrawer: React.FC<DetailedExecutionDrawerProps> = ({ isOpen, onClose }) => {
  const store = useAppStore();
  const [activeTab, setActiveTab] = useState<'agents' | 'tools' | 'audit'>('agents');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm select-none font-mono">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Slide-out Drawer Panel */}
      <div className="w-full max-w-2xl bg-[#0c1017] border-l border-slate-700/80 shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#07090e] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white tracking-wide">
                DETAILED EXECUTION & ENCLAVE TELEMETRY
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Full 9-stage DAG, deterministic latency benchmarks, and isolated tool audits
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-[#090d14] text-xs">
          <button
            onClick={() => setActiveTab('agents')}
            className={`flex-1 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'agents'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            9-Stage Agent DAG
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`flex-1 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'tools'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tool & Python Sandbox
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex-1 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'audit'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit & Cryptographic Hash
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {activeTab === 'agents' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>Autonomous Sovereign Agents (Local Pipeline)</span>
                <span>Cumulative: 2,280ms</span>
              </div>

              {store.workflowNodes.map((node, idx) => (
                <div
                  key={node.id}
                  className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 hover:border-slate-700 transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-[10px] text-cyan-400">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white">{node.name}</span>
                      <span className="text-[10px] text-slate-400">({node.role})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {node.durationMs && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {node.durationMs}ms
                        </span>
                      )}
                      <StatusBadge status={node.status} size="sm" />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {node.actionDescription}
                  </p>

                  {node.details && node.details.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[10px] text-slate-400">
                      {node.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => {
                    store.setCurrentPage('network');
                    onClose();
                  }}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Open Visual Agent Network Page <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    store.setCurrentPage('evidence');
                    onClose();
                  }}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Open Full Evidence Graph <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" /> Python 3.11 Sandbox Confinement
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    ISOLATED
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Executed deterministic numerical evaluation under Linux seccomp profile without raw socket privileges.
                </p>
                <div className="p-2.5 rounded bg-[#0c1017] border border-slate-800 text-[10px] text-cyan-300 font-mono">
                  &gt; evaluate_iso_10816(velocity=7.82, foundation="rigid")<br />
                  &gt; Output: &#123; "zone": "Zone D", "status": "CRITICAL TRIP" &#125;<br />
                  &gt; Sockets requested: 0 • CPU Time: 14ms
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" /> Qwen3-VL OCR & Drawing Parser
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    VRAM LOCAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Tabular OCR extraction completed for Inspection Report Page 4. Parsed 24 numerical matrix cells with 98.4% coordinate precision.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    store.setCurrentPage('tools');
                    onClose();
                  }}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Open Secure Tools & Python Editor Page <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cryptographic Digest</span>
                  <span className="text-emerald-400 font-bold">SHA-256 Validated</span>
                </div>
                <div className="p-2 rounded bg-[#0c1017] border border-slate-800 text-[11px] text-cyan-300 break-all">
                  0x8f2a991c4d92a184e493b821a3e810a072bf9412
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Model Fingerprint</span>
                  <span className="text-slate-200 font-bold">gpt-oss-20B (Q4_K_M)</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Local weights mounted at /enclave/models/gpt-oss-20b.gguf
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#07090e] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Outbound Network Telemetry</span>
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> BLOCKED (0 packets)
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Kernel iptables air-gap rule dropped all external interfaces.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    store.setCurrentPage('audit');
                    onClose();
                  }}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Open Complete Enterprise Audit Dashboard <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#07090e] flex items-center justify-between text-[11px] text-slate-400">
          <span>Sovereign Enclave Status: Verified</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
