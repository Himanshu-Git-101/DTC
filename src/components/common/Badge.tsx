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
    cyan: 'bg-blue-50 text-blue-700 border-blue-200/80 shadow-sm dark:bg-dtc-cyan/10 dark:text-dtc-cyan dark:border-dtc-cyan/30 dark:shadow-[0_0_10px_rgba(0,240,255,0.15)]',
    hot: 'bg-red-50 text-red-700 border-red-200/80 shadow-sm dark:bg-dtc-hot/10 dark:text-dtc-hot dark:border-dtc-hot/30 dark:shadow-[0_0_10px_rgba(255,59,48,0.2)]',
    warm: 'bg-amber-50 text-amber-800 border-amber-200/80 shadow-sm dark:bg-dtc-warm/10 dark:text-dtc-warm dark:border-dtc-warm/30 dark:shadow-[0_0_10px_rgba(255,149,0,0.2)]',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-sm dark:bg-dtc-green/10 dark:text-dtc-green dark:border-dtc-green/30 dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    default: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    outline: 'bg-transparent text-slate-600 border-slate-300 dark:bg-transparent dark:text-slate-400 dark:border-slate-700/60',
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
                ? 'bg-red-500 dark:bg-dtc-hot'
                : variant === 'warm'
                ? 'bg-amber-500 dark:bg-dtc-warm'
                : variant === 'green'
                ? 'bg-emerald-500 dark:bg-dtc-green'
                : 'bg-blue-600 dark:bg-dtc-cyan'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              variant === 'hot'
                ? 'bg-red-500 dark:bg-dtc-hot'
                : variant === 'warm'
                ? 'bg-amber-500 dark:bg-dtc-warm'
                : variant === 'green'
                ? 'bg-emerald-500 dark:bg-dtc-green'
                : 'bg-blue-600 dark:bg-dtc-cyan'
            }`}
          />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
