import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const tooltipText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const ariaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel}
        className="relative group min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-dtc-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dtc-bg
          bg-slate-900/80 border border-slate-700/80 shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:border-dtc-cyan/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:scale-105 active:scale-95
          dark:bg-slate-900/80 dark:border-slate-700/80 dark:hover:border-dtc-cyan/60 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]
          light:bg-white/90 light:border-slate-200 light:shadow-[0_2px_12px_rgba(11,18,32,0.06)] light:hover:border-blue-500/60 light:hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Subtle background ambient pulse */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${
            isDark ? 'bg-amber-400/10' : 'bg-blue-600/10'
          }`}
        />

        {/* Animated Icon Container */}
        <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="sun-icon"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] group-hover:rotate-45 transition-transform duration-300"
              >
                <Sun className="w-5 h-5" strokeWidth={2.2} />
              </motion.div>
            ) : (
              <motion.div
                key="moon-icon"
                initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] group-hover:-rotate-12 transition-transform duration-300"
              >
                <Moon className="w-5 h-5 fill-blue-600/20" strokeWidth={2.2} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Accessible Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg pointer-events-none whitespace-nowrap z-50 font-mono text-[11px] tracking-wide font-medium shadow-xl border
              bg-slate-900/95 text-slate-200 border-slate-700
              dark:bg-slate-900/95 dark:text-slate-200 dark:border-slate-700
              light:bg-white light:text-slate-900 light:border-slate-200 light:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            role="tooltip"
          >
            {tooltipText}
            {/* Tooltip Arrow */}
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-l border-t
                bg-slate-900 border-slate-700
                dark:bg-slate-900 dark:border-slate-700
                light:bg-white light:border-slate-200"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
