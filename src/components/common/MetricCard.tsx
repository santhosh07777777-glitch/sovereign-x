import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: LucideIcon;
  color?: 'cyan' | 'emerald' | 'amber' | 'blue' | 'rose';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  trend,
  trendPositive,
  icon: Icon,
  color = 'cyan',
  onClick
}) => {
  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40',
  };

  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden bg-[#0c1017] border border-slate-800/80 rounded-lg p-4 transition-all duration-200 hover:border-slate-700 hover:shadow-lg ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-mono tracking-wider text-slate-400 uppercase font-medium">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
            {subValue && (
              <span className="text-xs text-slate-400 font-mono">{subValue}</span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-md border ${colorMap[color]} transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-mono">
          <span className={trendPositive ? 'text-emerald-400' : 'text-amber-400'}>
            {trend}
          </span>
          <span className="text-slate-500">vs previous cycle</span>
        </div>
      )}
    </div>
  );
};
