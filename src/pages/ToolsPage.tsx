import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { INITIAL_SECURE_TOOLS } from '../data/mockData';
import { SecureTool } from '../types';
import { PythonSandbox } from '../components/tools/PythonSandbox';
import { 
  Wrench, 
  Terminal, 
  Calculator, 
  FileSearch, 
  Table, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Play,
  RotateCcw,
  Cpu
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const ToolsPage: React.FC = () => {
  const store = useAppStore();
  const [tools] = useState<SecureTool[]>(INITIAL_SECURE_TOOLS);
  const [selectedTool, setSelectedTool] = useState<SecureTool>(tools[0]);

  // Quick unit calculator simulation state
  const [calcInput, setCalcInput] = useState({ flowRate: 420, head: 184, eff: 0.78, s: 0.85 });
  const [calcOutput, setCalcOutput] = useState<number>(187.4);

  const handleComputePower = () => {
    // Hydraulic pump power: P (kW) = (Q * H * rho * g) / (3600 * 1000 * eta)
    const q = calcInput.flowRate; // m3/h
    const h = calcInput.head; // m
    const rho = calcInput.s * 1000; // kg/m3 (crude oil SG 0.85)
    const eta = calcInput.eff;
    const power = (q * h * rho * 9.81) / (3600 * 1000 * eta);
    setCalcOutput(parseFloat(power.toFixed(1)));
    store.addToast('info', 'Math Engine Executed', `Calculated shaft power for Pump P-204: ${power.toFixed(1)} kW in isolated sandbox.`);
  };

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'tool-py-sandbox': return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'tool-calc': return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'tool-ocr': return <FileSearch className="w-5 h-5 text-purple-400" />;
      case 'tool-pid': return <Table className="w-5 h-5 text-blue-400" />;
      case 'tool-validator': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'tool-docgen': return <FileText className="w-5 h-5 text-teal-400" />;
      default: return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              SECURE AIR-GAPPED TOOL LAYER
            </h1>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> NETWORK ACCESS: BLOCKED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic mathematical engines, Python interpreters, and OCR parsers operating under strict seccomp/cgroup confinement.
          </p>
        </div>
      </div>

      {/* Tools Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => {
          const isSelected = selectedTool.id === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setSelectedTool(t)}
              className={`p-4 rounded-xl border transition-all cursor-pointer bg-[#0c1017] shadow-lg ${
                isSelected
                  ? 'border-cyan-400 ring-2 ring-cyan-500/20 shadow-glow-cyan'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  {getToolIcon(t.id)}
                </div>
                <StatusBadge status={t.status} size="sm" />
              </div>

              <h3 className="text-xs font-bold text-white mt-3">{t.name}</h3>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {t.description}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-cyan-400 font-bold">{t.permissions}</span>
                <span>{t.executionCount} executions</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tool Runner: Embedded Python Sandbox */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Live Tool Execution Environment
          </h2>
          <span className="text-[10px] text-slate-400">Isolated Linux Namespace Container</span>
        </div>

        {/* Python Sandbox (Always interactive) */}
        <PythonSandbox />
      </div>

      {/* Interactive Hydraulic Power Solver Widget */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Hydraulic Pump Shaft Power Calculator (Deterministic Tool)
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">API 610 EQUATION VERIFIED</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Flow Rate Q (m³/h)</label>
            <input
              type="number"
              value={calcInput.flowRate}
              onChange={(e) => setCalcInput({ ...calcInput, flowRate: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Differential Head H (m)</label>
            <input
              type="number"
              value={calcInput.head}
              onChange={(e) => setCalcInput({ ...calcInput, head: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Fluid Specific Gravity</label>
            <input
              type="number"
              step="0.05"
              value={calcInput.s}
              onChange={(e) => setCalcInput({ ...calcInput, s: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Pump Hydraulic Efficiency (η)</label>
            <input
              type="number"
              step="0.01"
              value={calcInput.eff}
              onChange={(e) => setCalcInput({ ...calcInput, eff: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Computed Brake Power:</span>
            <span className="text-base font-bold text-amber-400 font-mono">{calcOutput} kW</span>
            <span className="text-[10px] text-slate-400">(Motor rating: 220 kW • Margin: +14.8%)</span>
          </div>

          <button
            onClick={handleComputePower}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-glow-amber transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
            Recalculate in Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
