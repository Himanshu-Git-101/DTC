import React from 'react';
import { Cpu, ArrowUp } from 'lucide-react';
import { PROJECT_INFO } from '../../data/projectData';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-slate-950 border-t border-slate-900 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Abstract */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-dtc-cyan/40 flex items-center justify-center text-dtc-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-mono text-sm font-bold tracking-widest text-slate-100">
                DTC <span className="text-dtc-cyan">//</span> COOL
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed max-w-sm">
              Next-Gen Direct-to-Chip (DTC) liquid cooling co-design architecture for high-power AI accelerators like the NVIDIA H100 SXM5.
            </p>
            <div className="text-[11px] text-slate-400">
              Research Affiliation: <span className="text-slate-300 font-semibold">{PROJECT_INFO.institution}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold block mb-3">
              Case Study Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <button onClick={() => scrollTo('overview')} className="text-left hover:text-dtc-cyan transition-colors">
                01. Overview
              </button>
              <button onClick={() => scrollTo('problem')} className="text-left hover:text-dtc-cyan transition-colors">
                02. The Problem
              </button>
              <button onClick={() => scrollTo('solution')} className="text-left hover:text-dtc-cyan transition-colors">
                03. H-ASP Solution
              </button>
              <button onClick={() => scrollTo('coldplate')} className="text-left hover:text-dtc-cyan transition-colors">
                04. CAD Cold Plate
              </button>
              <button onClick={() => scrollTo('exploded')} className="text-left hover:text-dtc-cyan transition-colors">
                05. Exploded View
              </button>
              <button onClick={() => scrollTo('architecture')} className="text-left hover:text-dtc-cyan transition-colors">
                06. System Architecture
              </button>
              <button onClick={() => scrollTo('results')} className="text-left hover:text-dtc-cyan transition-colors">
                07. Analytical Results
              </button>
              <button onClick={() => scrollTo('virtual-lab')} className="text-left hover:text-dtc-cyan transition-colors">
                08. Virtual Lab
              </button>
            </div>
          </div>

          {/* Engineering Meta */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold block mb-3">
              Research Status
            </span>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span>R_th Peak:</span>
                <span className="text-dtc-cyan font-bold">0.053 K/W</span>
              </div>
              <div className="flex justify-between">
                <span>Flow Split:</span>
                <span className="text-slate-200">70 / 20 / 10 %</span>
              </div>
              <div className="flex justify-between">
                <span>Target Chip:</span>
                <span className="text-slate-200">NVIDIA H100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            Built as an interactive engineering case study & Web Development Internship portfolio.
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Woxsen University AI Thermal Lab</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-dtc-cyan flex items-center gap-1 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
