import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ShortenPath: React.FC = () => {
  const traditionalSteps = [
    { label: 'SILICON CHIP', desc: '700W Heat Source', highlight: true },
    { label: 'TIM 1', desc: 'Polymer/Solder', highlight: false },
    { label: 'COPPER IHS', desc: 'Bulk Heat Spreader', highlight: false },
    { label: 'TIM 2', desc: 'Thermal Paste', highlight: false },
    { label: 'AIR HEATSINK', desc: 'Heavy Aluminum Stack', highlight: false },
    { label: 'FORCED AIR', desc: 'Poor Heat Capacity', highlight: false },
  ];

  const dtcSteps = [
    { label: 'SILICON CHIP', desc: 'GH100 218 W/cm² Core', highlight: true },
    { label: 'INDIUM TIM', desc: 'Micro-Thin High-K', highlight: false },
    { label: 'H-ASP COLD PLATE', desc: '3D Copper Microchannels', highlight: true },
    { label: 'LIQUID COOLANT', desc: 'PG25 70/20/10 Loop', highlight: true },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs font-bold text-dtc-cyan uppercase tracking-widest block mb-2">
          THE DESIGN IDEA
        </span>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-100">
          SHORTEN THE THERMAL PATH.
        </h3>
        <p className="text-sm text-slate-400 mt-2 font-sans">
          Every mechanical interface and boundary layer introduces thermal contact resistance (R_th). Direct-to-Chip eliminates 3 intermediate thermal barriers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Traditional Path */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-mono text-xs font-bold text-dtc-hot uppercase">
              Traditional Path (6 Stages)
            </span>
            <span className="font-mono text-xs text-dtc-hot font-semibold">
              R_th &gt; 0.20 K/W
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {traditionalSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center flex-1 min-w-[100px]">
                  <span className="text-[11px] font-mono font-bold text-slate-200 block">
                    {step.label}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    {step.desc}
                  </span>
                </div>
                {idx < traditionalSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs text-slate-500 font-mono pt-2">
            ✖ High parasitic temperature gradients across heat spreader and secondary TIM layer.
          </p>
        </div>

        {/* DTC Shortened Path */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-dtc-cyan/40 space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-mono text-xs font-bold text-dtc-cyan uppercase">
              H-ASP Direct Path (4 Stages)
            </span>
            <span className="font-mono text-xs text-dtc-green font-bold">
              R_th = 0.053 K/W (-73%)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {dtcSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div
                  className={`p-2.5 rounded-lg text-center flex-1 min-w-[110px] ${
                    step.highlight
                      ? 'bg-dtc-cyan/15 border border-dtc-cyan/50 text-dtc-cyan'
                      : 'bg-slate-950 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold block">
                    {step.label}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block">
                    {step.desc}
                  </span>
                </div>
                {idx < dtcSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-dtc-cyan hidden sm:block shrink-0 animate-pulse" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs text-dtc-cyan/80 font-mono pt-2">
            ✔ Fluid microchannels sit directly above active silicon transistors for instant convective transfer.
          </p>
        </div>
      </div>
    </div>
  );
};
