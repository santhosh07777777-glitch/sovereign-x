import React from 'react';
import { useAppStore } from '../../services/store';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const store = useAppStore();

  if (store.toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {store.toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        };

        const borderStyles = {
          success: 'border-emerald-500/40 bg-[#0b1414]',
          warning: 'border-amber-500/40 bg-[#16120b]',
          error: 'border-rose-500/40 bg-[#170c0f]',
          info: 'border-cyan-500/40 bg-[#09131a]'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderStyles[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-mono font-semibold tracking-wide uppercase text-white">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => store.removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
