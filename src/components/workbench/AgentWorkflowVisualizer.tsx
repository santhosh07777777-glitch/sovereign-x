import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { 
  ShieldCheck, 
  GitFork, 
  Database, 
  CheckCheck, 
  Layers, 
  Check, 
  Loader2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { DetailedExecutionDrawer } from './DetailedExecutionDrawer';

export const AgentWorkflowVisualizer: React.FC = () => {
  const store = useAppStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Map the 9 internal workflow nodes to the 4 simplified high-level stages:
  // 1. AI Firewall (node-firewall)
  // 2. Task Router (node-master, node-router)
  // 3. Knowledge Agent (node-specialized, node-tools)
  // 4. Verification Agent (node-verification, node-evidence, node-deliverable)

  const getStageStatus = (stageIndex: number): 'Completed' | 'Running' | 'Waiting' => {
    if (!store.isExecutingWorkflow) {
      return store.hasExecutedDemo ? 'Completed' : 'Waiting';
    }

    const nodeIdx = store.activeNodeIndex;
    if (stageIndex === 1) {
      if (nodeIdx === 1) return 'Running';
      if (nodeIdx > 1) return 'Completed';
      return 'Waiting';
    }
    if (stageIndex === 2) {
      if (nodeIdx >= 2 && nodeIdx <= 3) return 'Running';
      if (nodeIdx > 3) return 'Completed';
      return 'Waiting';
    }
    if (stageIndex === 3) {
      if (nodeIdx >= 4 && nodeIdx <= 5) return 'Running';
      if (nodeIdx > 5) return 'Completed';
      return 'Waiting';
    }
    if (stageIndex === 4) {
      if (nodeIdx >= 6) return 'Running';
      return 'Waiting';
    }
    return 'Waiting';
  };

  const stages = [
    {
      id: 'firewall',
      name: 'AI Firewall',
      status: getStageStatus(1),
      desc: 'Input sanitized & prompt scan',
      icon: ShieldCheck,
      color: 'text-emerald-400'
    },
    {
      id: 'router',
      name: 'Task Router',
      status: getStageStatus(2),
      desc: 'Intent classified as Inspection',
      icon: GitFork,
      color: 'text-blue-400'
    },
    {
      id: 'knowledge',
      name: 'Knowledge Agent',
      status: getStageStatus(3),
      desc: 'Retrieved SOP-204 & tolerances',
      icon: Database,
      color: 'text-cyan-400'
    },
    {
      id: 'verifier',
      name: 'Verification Agent',
      status: getStageStatus(4),
      desc: 'Ground-truth cross-examination',
      icon: CheckCheck,
      color: 'text-emerald-400'
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#0a0d14] border-l border-slate-800/80 p-5 font-mono select-none overflow-y-auto justify-between text-xs">
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">
            AI Process
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Local sovereign agents executing on-premise.
          </p>
        </div>

        {/* 4 Simple Vertical Stages with connecting lines */}
        <div className="space-y-4 relative pl-1">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'Completed';
            const isRunning = stage.status === 'Running';
            const isWaiting = stage.status === 'Waiting';

            return (
              <div key={stage.id} className="relative flex items-start gap-3">
                {/* Connecting Line */}
                {idx < stages.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-8 w-0.5 h-8 transition-colors ${
                      isCompleted ? 'bg-emerald-500/40' : 'bg-slate-800'
                    }`}
                  />
                )}

                {/* Node Status Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : isRunning
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse shadow-glow-cyan'
                      : 'bg-[#07090e] border-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : isRunning ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  )}
                </div>

                {/* Stage Info Card */}
                <div
                  className={`flex-1 p-3 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-[#0c1017] border-slate-800'
                      : isRunning
                      ? 'bg-[#091522] border-cyan-500/40 shadow-glow-cyan'
                      : 'bg-[#07090e] border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCompleted
                          ? 'text-white'
                          : isRunning
                          ? 'text-cyan-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        isCompleted
                          ? 'text-emerald-400'
                          : isRunning
                          ? 'text-cyan-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button to View Advanced Detailed Execution */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full py-2.5 px-3 rounded-lg bg-[#0c1017] hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2 group"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>View Detailed Execution</span>
          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <p className="text-[10px] text-center text-slate-500">
          Inspect 9-stage DAG, tool sandboxes, and audit hashes
        </p>
      </div>

      {/* Advanced Telemetry Drawer */}
      <DetailedExecutionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
