import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { GOVERNING_EQUATIONS } from '../../data/projectData';

export const FormulaCard: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('flow-split');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h4 className="font-mono text-base font-bold text-slate-100 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-dtc-cyan" />
          GOVERNING THERMO-FLUID MATHEMATICAL FORMULAS
        </h4>
        <span className="text-xs font-mono text-slate-400">Click to expand symbol map & rationale</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GOVERNING_EQUATIONS.map((eq) => {
          const isExpanded = expandedId === eq.id;
          return (
            <div
              key={eq.id}
              className={`p-5 rounded-2xl glass-panel border transition-all duration-300 ${
                isExpanded
                  ? 'border-dtc-cyan shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : eq.id)}
                className="cursor-pointer flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-mono text-[10px] text-dtc-cyan uppercase tracking-wider block">
                    {eq.title}
                  </span>
                  <div className="p-3 my-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base font-bold text-white tracking-widest text-center shadow-inner">
                    {eq.renderedFormula}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mt-2">
                {eq.description}
              </p>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 mt-4 border-t border-slate-800 space-y-3"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 uppercase block mb-1">
                        Variable Symbol Definitions:
                      </span>
                      <div className="space-y-1">
                        {eq.symbolMap.map((sym) => (
                          <div
                            key={sym.symbol}
                            className="flex items-baseline justify-between text-xs font-mono p-1.5 rounded bg-slate-950/70"
                          >
                            <span className="text-dtc-cyan font-bold">{sym.symbol}</span>
                            <span className="text-slate-300">{sym.meaning}</span>
                            <span className="text-slate-500 text-[10px]">{sym.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-dtc-cyan/5 border border-dtc-cyan/20">
                      <span className="font-mono text-[10px] text-dtc-cyan uppercase font-bold block mb-0.5">
                        Engineering Impact:
                      </span>
                      <p className="font-sans text-xs text-slate-300 leading-relaxed">
                        {eq.engineeringSignificance}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
