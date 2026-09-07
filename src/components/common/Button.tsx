import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'thermal' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  glow = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-mono',
    md: 'text-sm px-5 py-2.5 gap-2 font-mono',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-mono tracking-wide',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 keep-white btn-text-white dark:bg-dtc-cyan dark:text-black dark:font-semibold dark:hover:bg-white dark:shadow-[0_0_20px_rgba(0,240,255,0.3)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] dark:hover:translate-y-0',
    secondary:
      'bg-white text-slate-800 border border-blue-600/30 hover:bg-blue-50/80 hover:border-blue-600 hover:text-blue-700 shadow-sm dark:bg-slate-900/90 dark:text-slate-100 dark:border-slate-700/80 dark:hover:border-dtc-cyan/50 dark:hover:bg-slate-800/90 dark:hover:text-dtc-cyan',
    thermal:
      'bg-red-600 text-white font-semibold hover:bg-red-700 shadow-[0_4px_14px_rgba(239,68,68,0.35)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] keep-white btn-text-white dark:bg-dtc-hot dark:text-white dark:hover:bg-red-500 dark:shadow-[0_0_20px_rgba(255,59,48,0.35)] dark:hover:shadow-[0_0_30px_rgba(255,59,48,0.6)]',
    ghost:
      'bg-transparent text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 dark:bg-transparent dark:text-slate-300 dark:hover:text-dtc-cyan dark:hover:bg-slate-800/50',
    outline:
      'bg-transparent text-blue-600 border border-blue-600/50 hover:bg-blue-50/80 hover:border-blue-600 shadow-sm dark:bg-transparent dark:text-dtc-cyan dark:border-dtc-cyan/40 dark:hover:bg-dtc-cyan/10 dark:hover:border-dtc-cyan dark:shadow-[0_0_15px_rgba(0,240,255,0.15)]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        glow ? 'ring-2 ring-dtc-cyan/40 ring-offset-2 ring-offset-dtc-bg' : ''
      } ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span className="keep-white">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
};
