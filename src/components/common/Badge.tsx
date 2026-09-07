import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'hot' | 'warm' | 'green' | 'default' | 'outline';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  pulse = false,
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-dtc-cyan/10 text-dtc-cyan border-dtc-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]',
    hot: 'bg-dtc-hot/10 text-dtc-hot border-dtc-hot/30 shadow-[0_0_10px_rgba(255,59,48,0.2)]',
    warm: 'bg-dtc-warm/10 text-dtc-warm border-dtc-warm/30 shadow-[0_0_10px_rgba(255,149,0,0.2)]',
    green: 'bg-dtc-green/10 text-dtc-green border-dtc-green/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    outline: 'bg-transparent text-slate-400 border-slate-700/60',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-mono uppercase',
    md: 'text-xs px-2.5 py-1 tracking-wider font-mono uppercase',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              variant === 'hot'
                ? 'bg-dtc-hot'
                : variant === 'warm'
                ? 'bg-dtc-warm'
                : variant === 'green'
                ? 'bg-dtc-green'
                : 'bg-dtc-cyan'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              variant === 'hot'
                ? 'bg-dtc-hot'
                : variant === 'warm'
                ? 'bg-dtc-warm'
                : variant === 'green'
                ? 'bg-dtc-green'
                : 'bg-dtc-cyan'
            }`}
          />
        </span>
      )}
      {children}
    </span>
  );
};
