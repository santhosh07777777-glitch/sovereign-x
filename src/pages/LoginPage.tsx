import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { Shield, Lock, Cpu, Server, CheckCircle2, ArrowRight, Radio } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const store = useAppStore();
  const [operatorId, setOperatorId] = useState('ENG-VERMA-LEVEL4');
  const [sectorKey, setSectorKey] = useState('REFINERY-CDU-JAMNAGAR');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleEnterWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      store.isAuthenticated = true;
      store.setCurrentPage('workbench');
      store.addToast('success', 'Terminal Access Granted', 'Authenticated as Dr. A. Verma (Level 4 Clearance) in Local Air-Gapped Mode.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col justify-between font-mono relative overflow-hidden tech-grid select-none">
      {/* Background glowing telemetry accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner */}
      <header className="p-6 flex items-center justify-between border-b border-slate-900 bg-[#070a0f]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-wider text-base text-white">SOVEREIGN-X</span>
            <span className="text-[10px] text-cyan-400 block tracking-wider">AIR-GAPPED INDUSTRIAL WORKBENCH</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            ON-PREMISE / AIR-GAPPED
          </span>
        </div>
      </header>

      {/* Center Login Terminal */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0c1017] border border-slate-800 rounded-xl p-8 shadow-2xl relative">
          {/* Subtle top indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-t-xl"></div>

          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 mb-3 shadow-glow-cyan">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-white">SOVEREIGN-X</h1>
            <p className="text-xs text-cyan-400 font-semibold mt-1">
              Verification-First Sovereign Agentic AI Workbench
            </p>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              "Secure intelligence for confidential industrial operations, refineries, and critical infrastructure."
            </p>
          </div>

          <form onSubmit={handleEnterWorkspace} className="space-y-4 text-xs">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                Authorized Personnel Identity
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-white outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                Confidential Sector Code
              </label>
              <input
                type="text"
                value={sectorKey}
                onChange={(e) => setSectorKey(e.target.value)}
                className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-white outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>

            {/* Security checklist */}
            <div className="p-3 rounded bg-[#07090e] border border-slate-800/80 space-y-1.5 text-[10px] text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Local GPU / Tensor Inference: ONLINE (gpt-oss-20B)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>External Telemetry & Cloud Sockets: BLOCKED</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deterministic Fact-Verification Engine: ENGAGED</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>{isVerifying ? 'AUTHENTICATING ENCLAVE...' : 'ENTER SECURE WORKSPACE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center mt-4">
            Simulated Local Environment • Smart India Hackathon Demo Prototype
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-slate-900 bg-[#070a0f] text-center text-[10px] text-slate-400">
        SOVEREIGN-X • Confidential Industrial Operations Protocol • Air-Gapped Level 4 Clearance
      </footer>
    </div>
  );
};
