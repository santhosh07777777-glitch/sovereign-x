import React from 'react';
import { useAppStore } from '../../services/store';
import { 
  LayoutDashboard, 
  Terminal, 
  Files, 
  Database, 
  Network, 
  GitMerge, 
  CheckCheck, 
  Wrench, 
  ShieldCheck, 
  Settings,
  Shield,
  Play,
  Server,
  Lock,
  Radio
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const store = useAppStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workbench', label: 'AI Workbench', icon: Terminal, highlight: true },
    { id: 'documents', label: 'Documents', icon: Files },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'network', label: 'Agent Network', icon: Network },
    { id: 'evidence', label: 'Evidence Graph', icon: GitMerge },
    { id: 'verification', label: 'Verification', icon: CheckCheck, badge: store.verificationQueue.filter(v => v.status === 'Needs Review').length },
    { id: 'tools', label: 'Secure Tools', icon: Wrench },
    { id: 'firewall', label: 'AI Firewall', icon: ShieldCheck, badge: 'ACTIVE' },
    { id: 'audit', label: 'Audit & Monitoring', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleRunDemo = () => {
    store.setCurrentPage('workbench');
    store.runAgentWorkflow('Analyze Pump P-204 Inspection Report');
  };

  return (
    <aside className="w-64 bg-[#0a0d14] border-r border-slate-800/80 flex flex-col shrink-0 select-none z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold tracking-wider text-base text-white">SOVEREIGN-X</span>
              <span className="text-[9px] font-mono px-1 py-0.2 bg-cyan-950 text-cyan-400 border border-cyan-700/50 rounded">v1.0</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">Sovereign Industrial AI</p>
          </div>
        </div>

        {/* System Airgap Status Badge */}
        <div className="mt-3.5 flex items-center justify-between px-2.5 py-1.5 rounded bg-[#07090e] border border-emerald-500/30 text-emerald-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-wider">LOCAL / SECURE</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500/80">AIR-GAPPED</span>
        </div>

        {/* 1-Click Demo Mode Trigger */}
        <button
          onClick={handleRunDemo}
          disabled={store.isExecutingWorkflow}
          className="mt-3 w-full group relative overflow-hidden flex items-center justify-center gap-2 py-2 px-3 rounded bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-semibold hover:border-cyan-400 hover:text-white transition-all shadow-glow-cyan disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 fill-cyan-400 ${store.isExecutingWorkflow ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
          <span>{store.isExecutingWorkflow ? 'PIPELINE RUNNING...' : 'DEMO: PUMP P-204'}</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 pb-1 font-semibold">
          Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = store.currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => store.setCurrentPage(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="tracking-wide">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  typeof item.badge === 'number' 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Workspace Context */}
      <div className="p-3 border-t border-slate-800/80 bg-[#080b11] text-[11px] font-mono space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[10px] uppercase tracking-wider">Workspace</span>
          <span className="text-cyan-400 font-semibold text-[10px]">CDU-2 REFINERY</span>
        </div>
        <div className="p-2 rounded bg-[#0c1017] border border-slate-800 text-[10px] text-slate-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Model:</span>
            <span className="text-slate-200">gpt-oss-20B (Q4)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Clearance:</span>
            <span className="text-emerald-400 font-bold">LEVEL 4 - PSU/DEF</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Ext Net:</span>
            <span className="text-rose-400 flex items-center gap-1 font-semibold">
              <Lock className="w-2.5 h-2.5" /> BLOCKED
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
