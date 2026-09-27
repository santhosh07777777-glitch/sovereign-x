import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { AgentInfo } from '../types';
import { 
  Network, 
  Cpu, 
  ShieldCheck, 
  GitFork, 
  Eye, 
  Database, 
  LineChart, 
  CheckCircle2, 
  FileText,
  Clock,
  Key,
  Activity,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const NetworkPage: React.FC = () => {
  const store = useAppStore();
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(store.agents[1]); // Default Master Agent

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'GitFork': return <GitFork className="w-5 h-5 text-blue-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'LineChart': return <LineChart className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-teal-400" />;
      default: return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              SOVEREIGN AGENT TOPOLOGY & ORCHESTRATION NETWORK
            </h1>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800 font-semibold">
              LANGGRAPH LOCAL RUNTIME
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual topology of autonomous on-premise agents, sandbox isolation boundaries, and execution telemetry.
          </p>
        </div>
      </div>

      {/* Main Grid: Visual Topology Canvas (8 cols) + Agent Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Topology Graph (8 cols) */}
        <div className="lg:col-span-8 bg-[#0c1017] border border-slate-800 rounded-xl p-6 shadow-xl relative tech-grid overflow-hidden">
          {/* Subtle Central Sovereign Hub Label */}
          <div className="text-center mb-6">
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold bg-[#07090e] px-3 py-1 rounded border border-cyan-900 shadow-glow-cyan">
              LOCAL ORCHESTRATION BUS (ZERO EGRESS)
            </span>
          </div>

          {/* Topology Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {store.agents.map((agent) => {
              const isSelected = selectedAgent?.id === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-lg bg-[#07090e] relative ${
                    isSelected
                      ? 'border-cyan-400 ring-2 ring-cyan-500/30 shadow-glow-cyan scale-[1.02]'
                      : 'border-slate-800 hover:border-slate-700 hover:bg-[#090d14]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      {getAgentIcon(agent.iconName)}
                    </div>
                    <StatusBadge status={agent.status} size="sm" />
                  </div>

                  <h3 className="text-xs font-bold text-white mt-3 truncate">{agent.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{agent.role}</p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1 text-[10px] text-slate-400">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="text-slate-200 truncate max-w-[90px]">{agent.model.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success:</span>
                      <span className="text-emerald-400 font-bold">{agent.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latency:</span>
                      <span className="text-cyan-300 font-mono">{agent.latencyAvg}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SVG Interconnection Overlay */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Communication Protocol: Isolated Unix Domain Sockets / IPC</span>
            <span className="text-emerald-400 font-semibold">Air-Gap Boundary: 100% Enforced</span>
          </div>
        </div>

        {/* Detailed Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          {selectedAgent ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{selectedAgent.name}</h3>
                    <StatusBadge status={selectedAgent.status} size="sm" />
                  </div>
                  <p className="text-xs text-cyan-400 mt-0.5">{selectedAgent.role}</p>
                </div>
              </div>

              {/* Current Task */}
              <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block mb-1">Current Active Task</span>
                <p className="text-xs text-white leading-relaxed">{selectedAgent.currentTask || 'Idle / Standby'}</p>
              </div>

              {/* Execution Specs */}
              <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 uppercase block">Engine Specifications</span>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Underlying Model:</span>
                  <span className="text-slate-200 font-bold">{selectedAgent.model}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Tokens Processed:</span>
                  <span className="text-cyan-300 font-mono">{selectedAgent.tokensProcessed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Average Latency:</span>
                  <span className="text-emerald-400 font-mono">{selectedAgent.latencyAvg}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Historical Reliability:</span>
                  <span className="text-emerald-400 font-bold">{selectedAgent.successRate}%</span>
                </div>
              </div>

              {/* Security Permissions */}
              <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block mb-2 flex items-center gap-1 font-bold">
                  <Key className="w-3 h-3 text-amber-400" />
                  Sandbox Permissions Granted
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.permissions.map((perm) => (
                    <span 
                      key={perm}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select an agent node to inspect telemetry.
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400">
            Node Enclave: Docker / cgroups / Linux Namespaces Isolated
          </div>
        </div>
      </div>
    </div>
  );
};
