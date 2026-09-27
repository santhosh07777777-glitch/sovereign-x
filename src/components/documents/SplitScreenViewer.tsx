import React, { useState } from 'react';
import { DocumentItem } from '../../types';
import { 
  X, 
  FileText, 
  Shield, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  Crosshair,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface SplitScreenViewerProps {
  document: DocumentItem;
  onClose: () => void;
}

export const SplitScreenViewer: React.FC<SplitScreenViewerProps> = ({ document, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState<'extracted' | 'ocr' | 'sop_mapping'>('extracted');
  const [highlightBox, setHighlightBox] = useState<string | null>('bearing-hotspot');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 font-mono">
      <div className="w-full h-full max-w-7xl rounded-xl bg-[#0c1017] border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#07090e] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">{document.name}</h3>
                <StatusBadge status={document.securityClass} size="sm" />
                <StatusBadge status={document.verificationStatus} size="sm" />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Category: {document.category} • Size: {document.size} • Uploaded: {document.uploadedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-[#0c1017] border border-slate-800 rounded px-2 py-1 text-xs">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
                className="text-slate-400 hover:text-white p-0.5"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-300 w-10 text-center text-[11px]">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(160, prev + 15))}
                className="text-slate-400 hover:text-white p-0.5"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Screen Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* LEFT PANE: Document Preview with Visual Bounding Boxes & Annotations (7 cols) */}
          <div className="lg:col-span-7 bg-[#05070a] border-r border-slate-800 p-6 overflow-auto flex flex-col items-center justify-start relative select-none">
            {/* Visual Document Canvas Simulation */}
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }} 
              className="w-[580px] min-h-[760px] bg-[#0d121c] border border-slate-700 rounded-lg shadow-2xl p-6 relative transition-transform duration-150"
            >
              {/* Document Header Representation */}
              <div className="border-b border-slate-700 pb-4 mb-4">
                <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase tracking-widest">
                  <span>CONFIDENTIAL INDUSTRIAL DOCUMENT</span>
                  <span className="text-rose-400 font-bold">SOVEREIGN AIR-GAP SECURE</span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  CRUDE DISTILLATION UNIT (CDU-2) — NDT & VIBRATION INSPECTION REPORT
                </h4>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Report ID: NDT-2026-CDU-P204</span>
                  <span>Inspection Date: 2026-09-24</span>
                  <span>Asset: PUMP P-204</span>
                </div>
              </div>

              {/* Inspection Table Simulation with Bounding Box Overlay */}
              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-200 uppercase mb-2">
                    1.0 Overall Equipment Condition
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Inspection conducted under full operational load (2980 RPM, Discharge Pressure 18.2 bar). Severe high-frequency audible humming detected in vicinity of non-drive end bearing pedestal.
                  </p>
                </div>

                {/* The highlighted table with interactive bounding box */}
                <div className="relative mt-3">
                  <div className="text-[10px] font-bold text-cyan-400 mb-1">
                    Table 2.0: Non-Destructive Vibration Velocity Spectrum (RMS mm/s)
                  </div>
                  
                  <div className="border border-slate-700 rounded bg-[#080c13] text-[10px] overflow-hidden">
                    <div className="grid grid-cols-5 bg-slate-800/80 p-1.5 font-bold text-slate-200">
                      <div>Pos</div>
                      <div>Axis</div>
                      <div>Overall (mm/s)</div>
                      <div>Dominant Freq</div>
                      <div>Zone (ISO)</div>
                    </div>
                    <div className="grid grid-cols-5 p-1.5 border-t border-slate-800 text-slate-400">
                      <div>1H</div>
                      <div>Motor DE (Horiz)</div>
                      <div>2.10 mm/s</div>
                      <div>1X (49.6 Hz)</div>
                      <div className="text-emerald-400">Zone B</div>
                    </div>
                    <div className="grid grid-cols-5 p-1.5 border-t border-slate-800 text-slate-400">
                      <div>2H</div>
                      <div>Pump DE (Horiz)</div>
                      <div>3.42 mm/s</div>
                      <div>1X (49.6 Hz)</div>
                      <div className="text-emerald-400">Zone B</div>
                    </div>

                    {/* TARGET ANOMALY ROW */}
                    <div className="grid grid-cols-5 p-1.5 border-t border-rose-500/50 bg-rose-950/30 text-rose-200 font-bold relative">
                      <div>3H</div>
                      <div>Pump NDE (Horiz)</div>
                      <div className="text-rose-400 font-mono font-bold">7.82 mm/s</div>
                      <div>1X + 2X + Harm</div>
                      <div className="text-rose-400 font-mono">ZONE D (TRIP)</div>
                    </div>

                    <div className="grid grid-cols-5 p-1.5 border-t border-slate-800 text-slate-400">
                      <div>3V</div>
                      <div>Pump NDE (Vert)</div>
                      <div>4.10 mm/s</div>
                      <div>1X (49.6 Hz)</div>
                      <div className="text-emerald-400">Zone B</div>
                    </div>
                  </div>

                  {/* Visual AI Bounding Box Callout */}
                  <div 
                    onClick={() => setHighlightBox('bearing-hotspot')}
                    className={`absolute -inset-1 border-2 border-dashed ${highlightBox === 'bearing-hotspot' ? 'border-cyan-400 bg-cyan-500/10' : 'border-amber-400/60'} rounded transition-all cursor-pointer pointer-events-auto`}
                  >
                    <div className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded bg-cyan-500 text-black text-[9px] font-bold flex items-center gap-1 shadow-lg">
                      <Crosshair className="w-2.5 h-2.5" />
                      AI EXTRACTED ANOMALY (Conf: 98.4%)
                    </div>
                  </div>
                </div>

                {/* Section 2: Thermography */}
                <div className="mt-4 pt-2 border-t border-slate-800">
                  <h5 className="text-[11px] font-bold text-slate-200 uppercase mb-1">
                    2.0 Infrared Thermography Findings
                  </h5>
                  <div className="p-2.5 rounded bg-[#0a0e16] border border-slate-800 text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">NDE Bearing Pedestal:</span>
                      <span className="text-rose-400 font-mono font-bold">86.4°C (Normal Max: 75.0°C)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Drive End Bearing:</span>
                      <span className="text-slate-200 font-mono">61.2°C (Acceptable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Motor Stator Surface:</span>
                      <span className="text-slate-200 font-mono">54.0°C (Normal)</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Engineering Drawing / P&ID Mock */}
                <div className="mt-4 pt-2 border-t border-slate-800">
                  <h5 className="text-[11px] font-bold text-slate-200 uppercase mb-1">
                    3.0 P&ID Piping & Valve Arrangement (02-CDU-PID-204)
                  </h5>
                  <div className="h-28 rounded bg-[#07090e] border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                    {/* Simulated SVG schematic */}
                    <svg className="w-full h-full text-slate-600" viewBox="0 0 400 100">
                      <line x1="20" y1="50" x2="160" y2="50" stroke="#334155" strokeWidth="2" />
                      <line x1="160" y1="50" x2="240" y2="50" stroke="#06b6d4" strokeWidth="3" />
                      <line x1="240" y1="50" x2="380" y2="50" stroke="#334155" strokeWidth="2" />
                      {/* Pump symbol */}
                      <circle cx="200" cy="50" r="24" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                      <polygon points="190,38 215,50 190,62" fill="#06b6d4" />
                      <text x="180" y="88" fill="#e2e8f0" fontSize="10" fontFamily="monospace">P-204</text>
                      {/* Isolation Valves */}
                      <polygon points="80,42 100,58 100,42 80,58" fill="#38bdf8" />
                      <text x="75" y="36" fill="#94a3b8" fontSize="9" fontFamily="monospace">V-204A</text>
                      <polygon points="300,42 320,58 320,42 300,58" fill="#38bdf8" />
                      <text x="295" y="36" fill="#94a3b8" fontSize="9" fontFamily="monospace">V-204B</text>
                    </svg>
                    <div className="absolute bottom-1 right-2 text-[9px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
                      Suction Line 12"-CDU-101 Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: AI Extracted Telemetry, SOP Links & Evidence (5 cols) */}
          <div className="lg:col-span-5 bg-[#090d14] flex flex-col overflow-hidden">
            {/* Tab navigation */}
            <div className="flex border-b border-slate-800 bg-[#070a0f]">
              <button
                onClick={() => setActiveTab('extracted')}
                className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'extracted'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                Extracted Data & Findings
              </button>
              <button
                onClick={() => setActiveTab('sop_mapping')}
                className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'sop_mapping'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                SOP-204 Correlation
              </button>
              <button
                onClick={() => setActiveTab('ocr')}
                className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ocr'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileSearch className="w-3.5 h-3.5" />
                Raw OCR Text
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {activeTab === 'extracted' && (
                <>
                  {/* Entity Extraction Summary */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Extracted Asset Metadata
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded bg-[#0e1420] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">ASSET TAG</span>
                        <span className="text-white font-bold font-mono">PUMP P-204</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0e1420] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">REFINERY UNIT</span>
                        <span className="text-cyan-300 font-bold font-mono">CDU-2 (Crude Distillation)</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0e1420] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">ROTATIONAL SPEED</span>
                        <span className="text-slate-200 font-bold font-mono">2980 RPM</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0e1420] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">BEARING TYPE</span>
                        <span className="text-slate-200 font-bold font-mono">SKF 7314 BECBM</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantitative Measurements */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Critical Measurements & Thresholds
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-300">Point 3H Vibration Velocity</span>
                          <span className="font-mono font-bold text-rose-400 text-sm">7.82 mm/s RMS</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span>ISO 10816-3 Zone C Limit: 4.5 mm/s</span>
                          <span className="text-rose-400 font-bold">BREACHED (+73.7%)</span>
                        </div>
                        <div className="mt-2 text-[10px] text-slate-300 bg-[#080c13] p-1.5 rounded">
                          Coordinates: Page 4, Table 2.0, Row 3H [x:120, y:440, w:280, h:45]
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300">Bearing Metal Temperature</span>
                          <span className="font-mono font-bold text-amber-400 text-sm">86.4°C</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span>OEM Manual Limit: 75.0°C</span>
                          <span className="text-amber-400 font-bold">EXCEEDED (+11.4°C)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actionable Engineering Recommendation */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Automated Directive Formulation
                    </h4>
                    <div className="p-3 rounded-lg bg-[#0e1420] border border-cyan-500/30 text-xs text-slate-300 space-y-2">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Verification Agent Output: Formally Verified
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        Based on the confirmed 7.82 mm/s RMS measurement, <strong className="text-white">Plant Safety SOP-204 Section 3.2</strong> takes immediate precedence. Controlled switchover to auxiliary pump P-204B must be executed within 24 hours.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'sop_mapping' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#0e1420] border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-300">Plant_Safety_SOP_204.pdf</span>
                      <span className="text-[10px] text-emerald-400 font-bold">100% CORRELATION</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      "Section 3.2, Paragraph 2: Vibration velocities in excess of 7.0 mm/s RMS represent Zone D (Unacceptable). Operational personnel must initiate controlled unit switchover and bearing teardown within 24 operational hours."
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Matched by Knowledge Agent via Local BGE-Large embeddings.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0e1420] border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-300">Equipment_Manual_P204_API610.pdf</span>
                      <span className="text-[10px] text-emerald-400 font-bold">96.2% CORRELATION</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      "Section 6.4: Maximum permissible bearing metal operating temperature is 75°C. Continued operation at 85°C+ risks thermal cage seizure."
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'ocr' && (
                <div className="p-3 rounded-lg bg-[#06080d] border border-slate-800 font-mono text-[11px] text-slate-400 space-y-2">
                  <p className="text-cyan-400 font-bold">// RAW LOCAL OCR STREAM (Deterministic)</p>
                  <p>LINE 01: BHARAT PETROLEUM REFINERIES LTD - CDU UNIT 2</p>
                  <p>LINE 02: INSPECTION REPORT FOR ROTATING EQUIPMENT P-204</p>
                  <p>LINE 03: DATE OF TEST: 2026-09-24 14:15 IST</p>
                  <p>LINE 04: SENSOR POINT 1H MOTOR DE VELOCITY: 2.10 MM/S</p>
                  <p>LINE 05: SENSOR POINT 2H PUMP DE VELOCITY: 3.42 MM/S</p>
                  <p className="text-rose-400 font-bold">LINE 06: SENSOR POINT 3H PUMP NDE VELOCITY: 7.82 MM/S RMS [CRITICAL]</p>
                  <p>LINE 07: SENSOR POINT 3V PUMP NDE VERTICAL: 4.10 MM/S</p>
                  <p>LINE 08: THERMAL SCAN POINT NDE: 86.4 DEG CELSIUS</p>
                  <p>LINE 09: END OF STREAM - OCR INTEGRITY CHECKSUM: 0x9f4a12c8</p>
                </div>
              )}
            </div>

            {/* Bottom Citation Footnote */}
            <div className="p-3 bg-[#070a0f] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>All references verified against local document cryptographic hash</span>
              <span className="text-cyan-400 font-semibold">Zero data transmitted externally</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
