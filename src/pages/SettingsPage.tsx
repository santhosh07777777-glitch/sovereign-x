import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Sliders, 
  Server, 
  Save, 
  CheckCircle2,
  HardDrive,
  Eye,
  Key
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const store = useAppStore();

  const [orgName, setOrgName] = useState('Bharat Petroleum Corporation Ltd (Refinery Division)');
  const [unitCode, setUnitCode] = useState('CDU-2 Jamnagar Complex');
  const [reasoningModel, setReasoningModel] = useState('gpt-oss-20B (Local Q4_K_M)');
  const [visionModel, setVisionModel] = useState('Qwen3-VL-8B-Instruct (Local NF4)');
  const [airgapStrict, setAirgapStrict] = useState(true);
  const [verificationThreshold, setVerificationThreshold] = useState(90);
  const [sandboxRestricted, setSandboxRestricted] = useState(true);

  const handleSave = () => {
    store.addToast('success', 'Configuration Updated', 'Local sovereignty settings applied to all 8 agent nodes.');
  };

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              SOVEREIGN ENCLAVE & MODEL CONFIGURATION
            </h1>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
              ON-PREMISE ONLY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure local neural weights, air-gap enforcement boundaries, and mathematical verification thresholds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-glow-cyan transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Enclave Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Workspace & Facility Profile */}
        <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              Facility & Clearance Parameters
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Organization / Enterprise</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Operating Industrial Sector</label>
              <input
                type="text"
                value={unitCode}
                onChange={(e) => setUnitCode(e.target.value)}
                className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="p-3 rounded bg-[#07090e] border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Enclave Security Level:</span>
                <span className="text-emerald-400 font-bold">LEVEL 4 - PSU/DEFENCE CERTIFIED</span>
              </div>
              <div className="flex justify-between">
                <span>Hardware Acceleration:</span>
                <span className="text-slate-200">Local Tensor Cores (NVIDIA H100 NVLink 80GB)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Local AI Models Selection */}
        <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              Local AI Models (Air-Gapped Weights)
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">
                Reasoning & Orchestration Model (Master Agent)
              </label>
              <select
                value={reasoningModel}
                onChange={(e) => setReasoningModel(e.target.value)}
                className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
              >
                <option value="gpt-oss-20B (Local Q4_K_M)">gpt-oss-20B (Local 4-bit Quantized - Recommended)</option>
                <option value="gpt-oss-70B (Local INT8)">gpt-oss-70B (Local 8-bit Heavy Industrial)</option>
                <option value="Llama-3.1-70B-Instruct-Q4">Llama-3.1-70B-Instruct (On-Premise Enclave)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">
                Vision & Drawing Parsing Model (Vision Agent)
              </label>
              <select
                value={visionModel}
                onChange={(e) => setVisionModel(e.target.value)}
                className="w-full bg-[#07090e] border border-slate-800 rounded p-2 text-white outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Qwen3-VL-8B-Instruct (Local NF4)">Qwen3-VL-8B-Instruct (P&ID & OCR Specialist)</option>
                <option value="InternVL-2.5-8B (Local)">InternVL-2.5-8B (Schematic Object Detection)</option>
              </select>
            </div>

            <div className="p-3 rounded bg-purple-950/20 border border-purple-800/40 text-purple-300 text-[11px]">
              Weights loaded in isolated VRAM without cloud dependencies.
            </div>
          </div>
        </div>

        {/* Section 3: Air-Gap & Network Security Toggles */}
        <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Lock className="w-4 h-4 text-rose-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              Air-Gap Enforcement & Firewall Gate
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Strict Air-Gapped Mode</p>
                <p className="text-[10px] text-slate-400">Drops all outbound HTTP/WebSocket sockets unconditionally</p>
              </div>
              <button
                onClick={() => setAirgapStrict(!airgapStrict)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  airgapStrict ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  airgapStrict ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Seccomp Tool Sandbox Confinement</p>
                <p className="text-[10px] text-slate-400">Isolate Python and unit calculators from root filesystem</p>
              </div>
              <button
                onClick={() => setSandboxRestricted(!sandboxRestricted)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  sandboxRestricted ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  sandboxRestricted ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Verification Thresholds */}
        <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              Verification Engine Parameters
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-[10px] text-slate-400 uppercase">Minimum Auto-Approval Threshold</label>
                <span className="text-emerald-400 font-bold">{verificationThreshold}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={verificationThreshold}
                onChange={(e) => setVerificationThreshold(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Any claim below this score triggers mandatory Human-in-the-Loop review.
              </p>
            </div>

            <div className="p-3 rounded bg-[#07090e] border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Audit Trail Retention:</span>
                <span className="text-white font-bold">Immutable / Indefinite</span>
              </div>
              <div className="flex justify-between">
                <span>Cryptographic Digest:</span>
                <span className="text-cyan-300 font-mono">SHA-256 Block Chaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
