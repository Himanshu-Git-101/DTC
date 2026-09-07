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
      'bg-dtc-cyan text-black font-semibold hover:bg-white shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]',
    secondary:
      'bg-slate-900/90 text-slate-100 border border-slate-700/80 hover:border-dtc-cyan/50 hover:bg-slate-800/90 hover:text-dtc-cyan',
    thermal:
      'bg-dtc-hot text-white font-semibold hover:bg-red-500 shadow-[0_0_20px_rgba(255,59,48,0.35)] hover:shadow-[0_0_30px_rgba(255,59,48,0.6)]',
    ghost:
      'bg-transparent text-slate-300 hover:text-dtc-cyan hover:bg-slate-800/50',
    outline:
      'bg-transparent text-dtc-cyan border border-dtc-cyan/40 hover:bg-dtc-cyan/10 hover:border-dtc-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        glow ? 'ring-2 ring-dtc-cyan/40 ring-offset-2 ring-offset-dtc-bg' : ''
      } ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
};
