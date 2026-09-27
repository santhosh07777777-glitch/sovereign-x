import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { 
  FileText, 
  Presentation, 
  Table, 
  FileCheck2, 
  Download, 
  X, 
  CheckCircle2, 
  Printer, 
  ShieldCheck,
  Calendar,
  UserCheck
} from 'lucide-react';

interface DeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeliverableFormat = 'word' | 'powerpoint' | 'excel' | 'approval_note' | 'inspection_summary';

export const DeliverableModal: React.FC<DeliverableModalProps> = ({ isOpen, onClose }) => {
  const store = useAppStore();
  const [selectedFormat, setSelectedFormat] = useState<DeliverableFormat>('word');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(100);

  if (!isOpen) return null;

  const formats = [
    { id: 'word', label: 'Word Engineering Report (.docx)', icon: FileText, desc: 'Full formal equipment health diagnostic with embedded evidence anchors.' },
    { id: 'powerpoint', label: 'Executive Briefing (.pptx)', icon: Presentation, desc: 'Leadership slide deck summarizing critical risks and shutdown timeline.' },
    { id: 'excel', label: 'Telemetry & Vibration Model (.xlsx)', icon: Table, desc: 'Raw sensor data table, FFT harmonics, and ISO 10816-3 zones.' },
    { id: 'approval_note', label: 'Plant GM Approval Note', icon: FileCheck2, desc: 'Formal memorandum requiring General Manager signature for maintenance switchover.' },
    { id: 'inspection_summary', label: 'Emergency Dispatch Slip', icon: Printer, desc: 'Immediate work order slip for maintenance technicians on site.' },
  ];

  const handleDownload = () => {
    setIsGenerating(true);
    setGenerationProgress(20);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Trigger mock file download
          const blob = new Blob([
            `SOVEREIGN-X VERIFIED DELIVERABLE\n` +
            `Target Asset: Pump P-204 (Crude Distillation Unit 2)\n` +
            `Generated: ${new Date().toISOString()}\n` +
            `Status: VERIFIED (94.2% Confidence)\n` +
            `Cryptographic Integrity Hash: 0x8f2a991c4d92a184e493b821a3\n` +
            `Lead Signoff: Dr. A. Verma (Lead Chief Engineer)\n` +
            `\nSummary Findings:\n` +
            `- NDE Bearing Vibration: 7.82 mm/s RMS (ISO 10816-3 Zone D Breached)\n` +
            `- SOP-204 Compliance: Mandatory shutdown and switchover to P-204B within 24h\n`
          ], { type: 'text/plain' });
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `SOVEREIGN-X_Pump_P204_${selectedFormat.toUpperCase()}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          store.addToast('success', 'Deliverable Exported', `Downloaded verified package for ${selectedFormat.replace('_', ' ').toUpperCase()}.`);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl rounded-xl bg-[#0c1017] border border-slate-700/80 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden font-mono">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#07090e]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                DELIVERABLE COMPILER & EXPORT CENTER
              </h2>
              <p className="text-xs text-slate-400">
                Generate formally verified industrial deliverables with cryptographic audit seal.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split between format selector and live document preview */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left: Format Selector (4 cols) */}
          <div className="md:col-span-4 p-4 border-r border-slate-800 bg-[#080c13] space-y-2 overflow-y-auto">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">
              Select Output Format
            </p>
            {formats.map((fmt) => {
              const Icon = fmt.icon;
              const isSelected = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id as DeliverableFormat)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-glow-cyan'
                      : 'bg-[#0a0e16] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold">{fmt.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {fmt.desc}
                  </p>
                </button>
              );
            })}

            <div className="mt-4 p-3 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px]">
              <div className="flex items-center gap-1.5 font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Air-Gap Verification Seal
              </div>
              All outputs are rendered strictly on local CPU/GPU with embedded provenance metadata.
            </div>
          </div>

          {/* Right: Realistic Rendered Document Preview (8 cols) */}
          <div className="md:col-span-8 p-6 bg-[#07090e] overflow-y-auto flex flex-col justify-between">
            <div className="bg-[#0f141f] border border-slate-800 rounded-lg p-6 shadow-inner text-slate-200 text-xs space-y-4">
              {/* Document Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 tracking-wider font-semibold">
                    BHARAT REFINERIES & PSUS • TECHNICAL SERVICES WING
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {selectedFormat === 'approval_note' 
                      ? 'MEMORANDUM: EMERGENCY BEARING SWITCHOVER FOR PUMP P-204'
                      : selectedFormat === 'powerpoint'
                      ? 'CRITICAL ROTATING ASSET RISK BRIEFING — CDU-2'
                      : 'EQUIPMENT HEALTH & NDT DIAGNOSTIC REPORT: P-204'}
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-1 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 2026-09-27</span>
                    <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> Dr. A. Verma (Lead Chief Engineer)</span>
                    <span className="text-emerald-400 font-bold">STATUS: VERIFIED</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    RESTRICTED
                  </span>
                </div>
              </div>

              {/* Dynamic Content Preview */}
              {selectedFormat === 'word' && (
                <div className="space-y-3 leading-relaxed text-slate-300">
                  <p className="font-semibold text-white">1. Executive Summary & Root Cause Analysis</p>
                  <p className="text-xs">
                    Non-Destructive Testing (NDT) conducted on Crude Distillation Unit (CDU-2) Secondary Booster Pump P-204 identified overall vibration velocity of <strong className="text-rose-400 font-mono">7.82 mm/s RMS</strong> on the non-drive end bearing. In accordance with <span className="text-cyan-300 underline">ISO 10816-3 Class II (Rigid Mount)</span>, this measurement falls into <strong>Zone D (Critical/Unacceptable)</strong>.
                  </p>

                  <p className="font-semibold text-white mt-3">2. SOP-204 Mandated Directives</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Execute controlled load transfer to standby pump P-204B within <strong>24 operational hours</strong>.</li>
                    <li>Teardown and inspect bearing SKF 7314 BECBM for inner race micro-spalling.</li>
                    <li>Conduct laboratory chemical analysis of ISO VG 68 mineral lubricant for particulate debris.</li>
                  </ul>

                  <p className="font-semibold text-white mt-3">3. Cryptographic Verification Trail</p>
                  <div className="p-2.5 rounded bg-[#0a0d14] border border-slate-800 text-[10px] font-mono space-y-1">
                    <div>SHA-256 Digest: 0x8f2a991c4d92a184e493b821a3e810a072</div>
                    <div>Source Offsets: Inspection_Report_P204.pdf (Page 4, Table 2)</div>
                    <div>Independent Check: Passed (Zero hallucination risk detected)</div>
                  </div>
                </div>
              )}

              {selectedFormat === 'powerpoint' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-slate-900 to-[#121a29] border border-slate-700">
                    <p className="text-[10px] text-cyan-400 font-mono uppercase">Slide 1 of 4 • Executive Overview</p>
                    <h4 className="text-sm font-bold text-white mt-1">Pump P-204: Mandatory 24-Hour Switchover</h4>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div className="p-2 rounded bg-slate-800 border border-slate-700">
                        <div className="text-rose-400 font-bold text-base">7.8 mm/s</div>
                        <div className="text-[9px] text-slate-400">Current Vibration (Limit: 4.5)</div>
                      </div>
                      <div className="p-2 rounded bg-slate-800 border border-slate-700">
                        <div className="text-amber-400 font-bold text-base">86.4 °C</div>
                        <div className="text-[9px] text-slate-400">Bearing Metal Temp (Max: 75.0)</div>
                      </div>
                      <div className="p-2 rounded bg-slate-800 border border-slate-700">
                        <div className="text-emerald-400 font-bold text-base">100%</div>
                        <div className="text-[9px] text-slate-400">P-204B Standby Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFormat === 'excel' && (
                <div className="space-y-2">
                  <p className="font-semibold text-white text-xs">Vibration Frequency & Harmonics Matrix (Spreadsheet Excerpt)</p>
                  <div className="border border-slate-800 rounded overflow-hidden text-[10px]">
                    <div className="grid grid-cols-4 bg-slate-800/80 p-1.5 font-bold text-slate-300">
                      <div>Measurement Point</div>
                      <div>Velocity (mm/s)</div>
                      <div>ISO Zone</div>
                      <div>Alarm State</div>
                    </div>
                    <div className="grid grid-cols-4 p-1.5 border-t border-slate-800 bg-[#0a0d14]">
                      <div>1H (Motor DE)</div>
                      <div>2.10</div>
                      <div>Zone B</div>
                      <div className="text-emerald-400">Normal</div>
                    </div>
                    <div className="grid grid-cols-4 p-1.5 border-t border-slate-800 bg-[#0c1017]">
                      <div>2H (Pump DE)</div>
                      <div>3.42</div>
                      <div>Zone B</div>
                      <div className="text-emerald-400">Normal</div>
                    </div>
                    <div className="grid grid-cols-4 p-1.5 border-t border-slate-800 bg-rose-950/20 text-rose-300 font-bold">
                      <div>3H (Pump NDE)</div>
                      <div>7.82</div>
                      <div>Zone D</div>
                      <div className="text-rose-400">CRITICAL TRIP</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFormat === 'approval_note' && (
                <div className="space-y-3 leading-relaxed text-xs">
                  <p>
                    <strong>TO:</strong> General Manager (Operations) — CDU Complex<br/>
                    <strong>FROM:</strong> Dr. A. Verma (Lead Chief Reliability Engineer)<br/>
                    <strong>SUBJECT:</strong> Request for Immediate Load Switchover from P-204 to P-204B
                  </p>
                  <p className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    "Under technical authority granted by Plant Safety SOP-204 Section 3.2, immediate executive sign-off is requested to initiate load migration to standby pump P-204B due to imminent bearing race spalling risk on active asset P-204."
                  </p>
                  <div className="flex justify-between items-end pt-4 border-t border-slate-800 text-[10px]">
                    <div>
                      <div>Verification Stamp: <span className="text-cyan-400">SOVEREIGN-X #942</span></div>
                      <div>Timestamp: 2026-09-27 14:32:17 IST</div>
                    </div>
                    <div className="text-right border-t border-dashed border-slate-600 pt-2 px-6">
                      Chief General Manager Sign-Off
                    </div>
                  </div>
                </div>
              )}

              {selectedFormat === 'inspection_summary' && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200">
                    <strong>EMERGENCY WORK DISPATCH ORDER #WO-2026-0927-41</strong>
                    <p className="text-[11px] text-slate-300 mt-1">Assigned Crew: Mechanical Maintenance Team Alpha</p>
                  </div>
                  <ul className="list-decimal pl-5 space-y-1 text-slate-300 text-xs">
                    <li>Isolate suction valve V-204A and discharge valve V-204B.</li>
                    <li>Install lockout-tagout (LOTO) on breaker 415V-MCC-204.</li>
                    <li>Disassemble bearing carrier; preserve lube oil sample in sterile bottle.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <div className="text-[11px] text-slate-400">
                {isGenerating ? `Generating local package (${generationProgress}%)...` : 'Ready for download (Local Air-Gapped Sandbox)'}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-glow-cyan transition-all disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGenerating ? 'Exporting...' : 'Download Deliverable Package'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
