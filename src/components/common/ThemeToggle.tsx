import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'navbar' | 'compact' | 'floating';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'navbar', className = '' }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'floating') {
    return (
      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-dtc-cyan select-none group ${
          isDark
            ? 'bg-slate-900/90 text-dtc-cyan border-dtc-cyan/40 hover:border-dtc-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]'
            : 'bg-white/95 text-sky-700 border-slate-200 hover:border-sky-500 shadow-slate-300/50 hover:shadow-sky-100'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'Cleanroom Lab' : 'Chilled Telemetry'} Mode`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" /> : <Moon className="w-5 h-5 text-sky-600 group-hover:-rotate-12 transition-transform" />}
        </motion.div>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg border transition-all duration-200 select-none flex items-center justify-center ${
          isDark
            ? 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-dtc-cyan hover:border-dtc-cyan/50'
            : 'bg-white text-slate-700 border-slate-200 hover:text-sky-700 hover:border-sky-400 shadow-sm'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'Cleanroom Lab' : 'Chilled Telemetry'} Mode`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-4 h-4 text-sky-600 hover:-rotate-12 transition-transform" />
        )}
      </button>
    );
  }

  // Default: 'navbar' - High-tech mechanical switch pill
  return (
    <button
      role="switch"
      aria-checked={!isDark}
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-8 rounded-full p-1 cursor-pointer transition-all duration-300 select-none border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtc-cyan ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 hover:border-dtc-cyan/40 w-[68px]'
          : 'bg-slate-100 border-slate-300 hover:border-sky-400 shadow-inner w-[68px]'
      } ${className}`}
      aria-label="Toggle light and dark color mode"
      title={`Current: ${isDark ? 'Chilled Telemetry (Dark)' : 'Cleanroom Lab (Light)'}. Click to switch.`}
    >
      {/* Background track labels */}
      <div className="w-full flex justify-between items-center px-1.5 pointer-events-none text-[10px] font-mono select-none">
        <Moon className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'opacity-30 text-dtc-cyan' : 'opacity-70 text-slate-400'}`} />
        <Sun className={`w-3.5 h-3.5 transition-opacity ${!isDark ? 'opacity-30 text-amber-600' : 'opacity-70 text-slate-500'}`} />
      </div>

      {/* Sliding pill thumb */}
      <motion.div
        className={`absolute top-[3px] w-[26px] h-[26px] rounded-full flex items-center justify-center shadow-md transition-colors ${
          isDark
            ? 'left-[3px] bg-slate-800 text-dtc-cyan border border-dtc-cyan/40 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
            : 'left-[39px] bg-white text-amber-500 border border-amber-300/80 shadow-slate-300'
        }`}
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-dtc-cyan" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};
