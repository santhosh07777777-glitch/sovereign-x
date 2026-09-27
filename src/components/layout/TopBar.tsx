import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { 
  Search, 
  Bell, 
  DownloadCloud, 
  ShieldCheck, 
  Cpu, 
  WifiOff, 
  User, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

interface TopBarProps {
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSearch }) => {
  const store = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pendingVerificationCount = store.verificationQueue.filter(v => v.status === 'Needs Review').length;

  return (
    <header className="h-14 bg-[#0a0d14] border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0 z-10">
      {/* Left: Global Search Shortcut */}
      <div className="flex items-center gap-3 w-80">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-md bg-[#07090e] border border-slate-800 text-slate-400 text-xs hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Search SOPs, tags, assets...</span>
          </div>
          <kbd className="font-mono text-[10px] bg-slate-800/80 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Center: Live System Security & Inference Telemetry */}
      <div className="hidden xl:flex items-center gap-4">
        {/* Local Inference Telemetry */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#07090e] border border-slate-800/80 text-[11px] font-mono">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">LOCAL INFERENCE:</span>
          <span className="text-cyan-300 font-semibold">18.4 tok/s</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* AI Firewall Status */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#07090e] border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-slate-400">AI FIREWALL:</span>
          <span className="font-semibold">ACTIVE</span>
        </div>

        {/* Air-gap verification */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#07090e] border border-rose-500/20 text-[11px] font-mono text-rose-400">
          <WifiOff className="w-3.5 h-3.5" />
          <span className="text-slate-400">OUTBOUND EGRESS:</span>
          <span className="font-semibold">BLOCKED (0 KB/s)</span>
        </div>
      </div>

      {/* Right: Actions, Notifications, Deliverables & User */}
      <div className="flex items-center gap-2.5">
        {/* Deliverables quick generator button */}
        <button
          onClick={() => store.setDeliverableModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111927] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
        >
          <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">EXPORT DELIVERABLE</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="System Alerts & Verification Items"
          >
            <Bell className="w-4 h-4" />
            {pendingVerificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[#0a0d14]"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-[#0c1017] border border-slate-800 shadow-2xl p-3 z-50 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-semibold text-white">System Security & Verification</span>
                <span className="text-[10px] text-cyan-400">{pendingVerificationCount} pending</span>
              </div>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Human Review Required
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Pressure transmitter PT-204 delta requires engineering review before confirmation.
                  </p>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    SOP-204 Cross-Check Complete
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Pump P-204 bearing vibration of 7.8 mm/s formally verified against plant limits.
                  </p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 text-center">
                <button 
                  onClick={() => {
                    store.setCurrentPage('verification');
                    setShowNotifications(false);
                  }}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  View Verification Center →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-slate-800/80 transition-colors"
          >
            <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-white leading-tight">Dr. A. Verma</div>
              <div className="text-[10px] text-slate-400 font-mono leading-tight">Chief Lead Eng</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#0c1017] border border-slate-800 shadow-2xl p-3 z-50 text-xs font-mono">
              <div className="pb-2 border-b border-slate-800">
                <p className="text-white font-semibold">Dr. A. Verma</p>
                <p className="text-[10px] text-slate-400">Chief Lead Reliability Engineer</p>
                <p className="text-[10px] text-cyan-400 mt-0.5">PSU Clearance: Level 4 (Confidential)</p>
              </div>
              <div className="py-2 space-y-1">
                <button
                  onClick={() => {
                    store.setCurrentPage('settings');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                >
                  Security & Model Settings
                </button>
                <button
                  onClick={() => {
                    store.setCurrentPage('audit');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                >
                  Personal Audit Session
                </button>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    store.isAuthenticated = false;
                    setShowUserMenu(false);
                    store.addToast('info', 'Logged Out', 'Returned to Sovereign Gateway Login.');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded text-rose-400 hover:bg-rose-500/10 font-semibold"
                >
                  Lock Terminal / Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
