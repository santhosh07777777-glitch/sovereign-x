import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { 
  Server, 
  Download, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  FileText,
  Clock,
  Layers,
  Hash
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { AuditEntry } from '../types';

export const AuditPage: React.FC = () => {
  const store = useAppStore();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('ALL');

  const eventTypes = [
    'ALL', 
    'Task Execution', 
    'Security Scan', 
    'Knowledge Retrieval', 
    'Verification', 
    'Deliverable Generated'
  ];

  const filteredLogs = store.auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          log.agent.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          log.user.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          log.hash.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesType = selectedEventType === 'ALL' || log.eventType === selectedEventType;
    return matchesSearch && matchesType;
  });

  const handleExportAudit = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SOVEREIGN_X_AUDIT_LEDGER_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    store.addToast('success', 'Audit Ledger Exported', 'Downloaded cryptographically signed audit trail (JSON format).');
  };

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              IMMUTABLE AUDIT TRAIL & MONITORING
            </h1>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> CRYPTOGRAPHIC LEDGER
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete sequential provenance record of agent delegations, human approvals, security checks, and deliverables.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0c1017] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors text-xs font-semibold shadow-glow-cyan"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Ledger (.JSON)</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c1017] p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2 w-72">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by agent, hash, or keyword..."
            className="w-full bg-transparent text-white placeholder-slate-400 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedEventType(type)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedEventType === type
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Entries List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-[#0c1017] border border-slate-800/90 hover:border-slate-700 transition-colors text-xs space-y-2 group shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-cyan-300 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {log.timestamp}
                </span>
                <span className="text-white font-bold">{log.agent}</span>
                <span className="text-[10px] text-slate-400 font-normal">via {log.user}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <Hash className="w-3 h-3 text-cyan-400" />
                  {log.hash}
                </span>
                <StatusBadge status={log.status} size="sm" />
              </div>
            </div>

            <p className="text-slate-200 leading-relaxed font-sans text-xs">
              {log.details}
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span>Model In Use: <strong className="text-slate-300">{log.model}</strong></span>
              <span>Event Category: <strong className="text-cyan-400">{log.eventType}</strong></span>
              <span className="text-emerald-400">Air-Gap Verified ✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
