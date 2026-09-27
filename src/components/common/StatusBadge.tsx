import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  variant?: 'outline' | 'solid';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  variant = 'solid' 
}) => {
  const getStyles = () => {
    const s = status.toLowerCase();
    if (s.includes('verified') || s.includes('active') || s.includes('online') || s.includes('completed') || s.includes('success')) {
      return variant === 'solid' 
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
        : 'border-emerald-500 text-emerald-400';
    }
    if (s.includes('running') || s.includes('processing') || s.includes('investigating')) {
      return variant === 'solid'
        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 animate-pulse'
        : 'border-cyan-500 text-cyan-300';
    }
    if (s.includes('review') || s.includes('warning') || s.includes('standby') || s.includes('medium') || s.includes('unsatisfactory')) {
      return variant === 'solid'
        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        : 'border-amber-500 text-amber-400';
    }
    if (s.includes('blocked') || s.includes('rejected') || s.includes('critical') || s.includes('failed') || s.includes('exceeded')) {
      return variant === 'solid'
        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        : 'border-rose-500 text-rose-400';
    }
    // Default neutral
    return variant === 'solid'
      ? 'bg-slate-800 text-slate-300 border-slate-700'
      : 'border-slate-700 text-slate-300';
  };

  const sizeClasses = size === 'sm' 
    ? 'text-[10px] px-1.5 py-0.5' 
    : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold rounded border ${sizeClasses} ${getStyles()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
};
