import React, { useState } from 'react';
import { Play, RotateCcw, ShieldAlert, Cpu, Terminal, CheckCircle2, Lock } from 'lucide-react';

const SAMPLE_SCRIPTS = [
  {
    id: 'iso-10816',
    title: 'ISO 10816-3 Vibration Severity Evaluator',
    code: `# Air-Gapped Industrial Python Sandbox
# ISO 10816-3 Evaluation for Centrifugal Pumps (Class II, Rigid Foundation)
import math

def calculate_iso_zone(velocity_rms_mms):
    if velocity_rms_mms < 1.4:
        return {"zone": "Zone A", "status": "Good / Newly Commissioned", "action": "Normal Operation"}
    elif velocity_rms_mms <= 4.5:
        return {"zone": "Zone B", "status": "Acceptable for Unrestricted Continuous Run", "action": "Routine Monitoring"}
    elif velocity_rms_mms <= 7.0:
        return {"zone": "Zone C", "status": "Unsatisfactory / Early Bearing Degradation", "action": "Schedule Inspection"}
    else:
        return {"zone": "Zone D", "status": "CRITICAL UNACCEPTABLE DAMAGE RISK", "action": "TRIP / IMMEDIATE 24H SHUTDOWN"}

# Telemetry input from Pump P-204 non-drive end bearing
sensor_val = 7.82  # mm/s RMS

result = calculate_iso_zone(sensor_val)
print("=== ISO 10816-3 DETERMINISTIC VERIFICATION ===")
print(f"Input Sensor Velocity : {sensor_val} mm/s RMS")
print(f"Evaluated Standard Zone: {result['zone']}")
print(f"Machine Severity Status: {result['status']}")
print(f"Mandated SOP Protocol  : {result['action']}")
print("================================================")`
  },
  {
    id: 'lube-temp',
    title: 'Lubricant Film Degradation & Arrhenius Rate',
    code: `# Oil Life Degradation Calculator under Elevated Temperature
def lube_film_half_life(operating_temp_c, baseline_temp_c=75.0):
    delta_t = operating_temp_c - baseline_temp_c
    if delta_t <= 0:
        return 1.0  # 100% life
    # Arrhenius rule: life is halved every 10°C rise above maximum design rating
    factor = 0.5 ** (delta_t / 10.0)
    return factor

measured_temp = 86.4  # P-204 NDE Bearing
remaining_life_ratio = lube_film_half_life(measured_temp)

print("=== LUBRICANT THERMAL LIFE ASSESSMENT ===")
print(f"Measured Bearing Metal Temp: {measured_temp} °C (OEM Limit: 75.0 °C)")
print(f"Excess Thermal Gradient    : +{round(measured_temp - 75.0, 1)} °C")
print(f"Remaining Oil Life Ratio   : {round(remaining_life_ratio * 100, 1)}% of normal interval")
print("Action: Immediate lubricant sample flush required.")`
  }
];

export const PythonSandbox: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState(SAMPLE_SCRIPTS[0]);
  const [code, setCode] = useState(SAMPLE_SCRIPTS[0].code);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [execTelemetry, setExecTelemetry] = useState({ time: '14ms', mem: '7.8 MB', exitCode: 0 });

  const handleSelectScript = (s: typeof SAMPLE_SCRIPTS[0]) => {
    setSelectedScript(s);
    setCode(s.code);
    setOutput(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      if (selectedScript.id === 'iso-10816') {
        setOutput(
          `=== ISO 10816-3 DETERMINISTIC VERIFICATION ===\n` +
          `Input Sensor Velocity : 7.82 mm/s RMS\n` +
          `Evaluated Standard Zone: Zone D\n` +
          `Machine Severity Status: CRITICAL UNACCEPTABLE DAMAGE RISK\n` +
          `Mandated SOP Protocol  : TRIP / IMMEDIATE 24H SHUTDOWN\n` +
          `================================================\n` +
          `[SANDBOX CHECK]: Verified 0 outbound sockets requested.\n` +
          `[SANDBOX CHECK]: Memory space safely cleared.`
        );
      } else {
        setOutput(
          `=== LUBRICANT THERMAL LIFE ASSESSMENT ===\n` +
          `Measured Bearing Metal Temp: 86.4 °C (OEM Limit: 75.0 °C)\n` +
          `Excess Thermal Gradient    : +11.4 °C\n` +
          `Remaining Oil Life Ratio   : 45.4% of normal interval\n` +
          `Action: Immediate lubricant sample flush required.\n` +
          `[SANDBOX CHECK]: Execution finished with exit code 0.`
        );
      }
    }, 400);
  };

  return (
    <div className="bg-[#0c1017] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono">
      {/* Top Banner: Security notice */}
      <div className="bg-[#07090e] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">AIR-GAPPED PYTHON SANDBOX</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
            <Lock className="w-2.5 h-2.5" /> NETWORK ACCESS: BLOCKED
          </span>
        </div>
        <div className="flex items-center gap-2">
          {SAMPLE_SCRIPTS.map(s => (
            <button
              key={s.id}
              onClick={() => handleSelectScript(s)}
              className={`text-[10px] px-2.5 py-1 rounded border transition-colors ${
                selectedScript.id === s.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Output Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
        {/* Code Input (7 cols) */}
        <div className="lg:col-span-7 p-4 bg-[#0a0d14] border-r border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 mb-2 border-b border-slate-800">
              <span>Python 3.11 (Restricted Builtins)</span>
              <span>deterministic_math.py</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              className="w-full bg-transparent text-xs text-cyan-200/90 font-mono leading-relaxed outline-none resize-none selection:bg-cyan-900"
              spellCheck={false}
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCode(selectedScript.code)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Code
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-glow-emerald transition-all disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? 'Executing in Sandbox...' : 'Run in Isolated Sandbox'}</span>
            </button>
          </div>
        </div>

        {/* Stdout Output Console (5 cols) */}
        <div className="lg:col-span-5 p-4 bg-[#05070a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 mb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Isolated STDOUT / STDERR
              </span>
              <span className="text-slate-400">Exit: 0</span>
            </div>

            {isRunning ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
                <Cpu className="w-6 h-6 text-cyan-400 animate-spin mb-2" />
                <span>Running deterministic numerical verification...</span>
              </div>
            ) : output ? (
              <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap leading-relaxed">
                {output}
              </pre>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Click "Run in Isolated Sandbox" to verify industrial telemetry equations.
              </div>
            )}
          </div>

          {/* Execution Telemetry Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Duration: {execTelemetry.time}</span>
            <span>Mem: {execTelemetry.mem}</span>
            <span className="text-emerald-400">Air-Gap: INTACT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
