import React from 'react';
import { useAppStore } from '../services/store';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Cpu, 
  Files, 
  CheckCheck, 
  Network, 
  ShieldAlert, 
  Clock, 
  Play, 
  Activity, 
  ArrowUpRight,
  ShieldCheck,
  WifiOff,
  Database,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const store = useAppStore();

  const taskTimeData = [
    { time: '08:00', rawTasks: 12, verifiedTasks: 12 },
    { time: '10:00', rawTasks: 28, verifiedTasks: 27 },
    { time: '12:00', rawTasks: 45, verifiedTasks: 44 },
    { time: '14:00', rawTasks: 62, verifiedTasks: 61 },
    { time: '16:00', rawTasks: 89, verifiedTasks: 87 },
    { time: '18:00', rawTasks: 110, verifiedTasks: 108 },
    { time: '20:00', rawTasks: 148, verifiedTasks: 146 },
  ];

  const agentUtilData = [
    { name: 'Firewall', util: 92 },
    { name: 'Master', util: 78 },
    { name: 'Router', util: 65 },
    { name: 'Vision', util: 84 },
    { name: 'Knowledge', util: 89 },
    { name: 'Data', util: 71 },
    { name: 'Verifier', util: 95 },
  ];

  const verificationBreakdown = [
    { name: 'Formally Verified', value: 88, color: '#10b981' },
    { name: 'Human Review Needed', value: 9, color: '#f59e0b' },
    { name: 'Hallucination Blocked', value: 3, color: '#f43f5e' },
  ];

  const docTypeData = [
    { type: 'NDT Reports', count: 48 },
    { type: 'P&ID Drawings', count: 32 },
    { type: 'SOPs', count: 26 },
    { type: 'Manuals', count: 24 },
    { type: 'Vibration Logs', count: 18 },
  ];

  const activityFeed = [
    { time: '14:32:17', agent: 'Deliverable Gen', action: 'Generated formal urgent maintenance note for Pump P-204', icon: CheckCircle2, color: 'text-emerald-400' },
    { time: '14:32:15', agent: 'Verification Agent', action: 'Validated 7.82 mm/s RMS against SOP-204 Section 3.2 (100% Match)', icon: CheckCheck, color: 'text-emerald-400' },
    { time: '14:32:11', agent: 'Knowledge Agent', action: 'Retrieved 4 relevant chunks from Plant_Safety_SOP_204.pdf', icon: Database, color: 'text-cyan-400' },
    { time: '14:32:09', agent: 'Vision Agent', action: 'Extracted tabular vibration values from Inspection Report page 4', icon: Activity, color: 'text-purple-400' },
    { time: '14:32:07', agent: 'Task Router', action: 'Classified task as Inspection Report Analysis & dispatched sub-agents', icon: Network, color: 'text-blue-400' },
    { time: '14:32:05', agent: 'AI Firewall', action: 'Scanned input payload: 0 adversarial tokens, air-gap intact', icon: ShieldCheck, color: 'text-emerald-400' },
    { time: '14:32:04', agent: 'Master Agent', action: 'Created task execution plan for Pump P-204 diagnostics', icon: Cpu, color: 'text-cyan-400' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Top Banner: Sovereign Air-Gap & Status Matrix */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h1 className="text-base font-bold text-white tracking-wider">
                SOVEREIGN OPERATIONS DASHBOARD
              </h1>
              <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                REFINERY UNIT CDU-2
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Confidential on-premise industrial AI command center. Zero cloud dependencies.
            </p>
          </div>

          {/* 6 System Status Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <div className="px-2.5 py-1 rounded bg-[#07090e] border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Local AI: <strong className="font-bold">ONLINE</strong></span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#07090e] border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Knowledge Base: <strong className="font-bold">READY</strong></span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#07090e] border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Secure Tools: <strong className="font-bold">ACTIVE</strong></span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#07090e] border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Verification Engine: <strong className="font-bold">ACTIVE</strong></span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#07090e] border border-rose-500/30 text-rose-400 flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5" />
              <span>External Network: <strong className="font-bold">BLOCKED</strong></span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#07090e] border border-cyan-500/30 text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AI Firewall: <strong className="font-bold">ACTIVE</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <MetricCard
          label="Active Tasks"
          value="3"
          subValue="/ 148 done"
          trend="+18%"
          trendPositive={true}
          icon={Activity}
          color="cyan"
          onClick={() => store.setCurrentPage('workbench')}
        />
        <MetricCard
          label="Docs Processed"
          value="148"
          subValue="Local PDFs"
          trend="+12 today"
          trendPositive={true}
          icon={Files}
          color="blue"
          onClick={() => store.setCurrentPage('documents')}
        />
        <MetricCard
          label="Verification Rate"
          value="98.4%"
          subValue="Ground-truth"
          trend="+0.6%"
          trendPositive={true}
          icon={CheckCheck}
          color="emerald"
          onClick={() => store.setCurrentPage('verification')}
        />
        <MetricCard
          label="Agents Running"
          value="8"
          subValue="Isolated nodes"
          trend="100% health"
          trendPositive={true}
          icon={Network}
          color="cyan"
          onClick={() => store.setCurrentPage('network')}
        />
        <MetricCard
          label="Security Events"
          value="142"
          subValue="Quarantined"
          trend="0 breaches"
          trendPositive={true}
          icon={ShieldAlert}
          color="rose"
          onClick={() => store.setCurrentPage('firewall')}
        />
        <MetricCard
          label="Avg Proc Time"
          value="1.4s"
          subValue="Local GPU"
          trend="-220ms"
          trendPositive={true}
          icon={Clock}
          color="amber"
        />
      </div>

      {/* Charts Row 1: Tasks Processed Over Time & Verification Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tasks Processed Over Time (Area Chart - 8 cols) */}
        <div className="lg:col-span-8 bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Industrial Tasks Processed Over Time
              </h3>
              <p className="text-[11px] text-slate-400">
                Cumulative raw ingestion vs formally verified ground-truth tasks
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 bg-slate-600 rounded"></span> Ingested
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded"></span> Formally Verified
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskTimeData}>
                <defs>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c1017', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="rawTasks" stroke="#64748b" fill="#1e293b" fillOpacity={0.5} name="Total Tasks" />
                <Area type="monotone" dataKey="verifiedTasks" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorVerified)" name="Verified Output" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Status Donut (4 cols) */}
        <div className="lg:col-span-4 bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Verification Engine Breakdown
            </h3>
            <p className="text-[11px] text-slate-400">
              Hallucination prevention & verification distribution
            </p>
          </div>

          <div className="h-48 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {verificationBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c1017', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
            {verificationBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2: Agent Utilization & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agent Utilization (Bar Chart - 6 cols) */}
        <div className="lg:col-span-6 bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Agent Resource Utilization (%)
              </h3>
              <p className="text-[11px] text-slate-400">
                Local inference core load across the 8 sovereign agents
              </p>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              OPTIMIZED
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentUtilData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c1017', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Bar dataKey="util" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live-looking Agent Activity Stream (6 cols) */}
        <div className="lg:col-span-6 bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Live Sovereign Activity Stream
              </h3>
              <p className="text-[11px] text-slate-400">
                Real-time agent execution events and verification milestones
              </p>
            </div>
            <button 
              onClick={() => store.setCurrentPage('audit')}
              className="text-[10px] text-cyan-400 hover:underline"
            >
              Full Audit Trail →
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-56 pr-1">
            {activityFeed.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-2 rounded bg-[#07090e] border border-slate-800/80 text-[11px] hover:border-slate-700 transition-colors"
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{item.agent}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 truncate mt-0.5">{item.action}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
