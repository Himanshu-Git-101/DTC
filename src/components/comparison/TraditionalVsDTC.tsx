import React, { useState } from 'react';
import { ArrowDown, Wind, Droplets, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TraditionalVsDTC: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100%

  return (
    <section className="relative py-20 bg-slate-950/80 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            02 // ARCHITECTURAL PARADIGM SHIFT
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            WHY TRADITIONAL COOLING{' '}
            <span className="text-dtc-hot">FAILS AT 700W.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            Drag the comparison slider below to see how Direct-to-Chip architecture eliminates 4 layers of thermal resistance by bringing liquid directly to the silicon package.
          </p>
        </div>

        {/* Large Central Statement */}
        <div className="glass-panel p-6 rounded-2xl max-w-4xl mx-auto mb-10 text-center border border-dtc-cyan/30">
          <p className="text-base sm:text-lg font-display font-semibold text-slate-100 leading-relaxed">
            "Instead of moving heat through multiple stages before reaching the cooling medium, <span className="text-dtc-cyan">Direct-to-Chip (DTC) cooling</span> brings the fluid interface directly over the heat-generating transistors."
          </p>
        </div>

        {/* Interactive Split Comparison Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 relative max-w-5xl mx-auto">
          {/* Slider Controls */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold text-dtc-hot uppercase flex items-center gap-1.5">
              <Wind className="w-4 h-4" /> Traditional Air / Indirect
            </span>

            <div className="flex-1 max-w-xs">
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full"
                aria-label="Comparison split slider"
              />
            </div>

            <span className="font-mono text-xs font-bold text-dtc-cyan uppercase flex items-center gap-1.5">
              <Droplets className="w-4 h-4" /> Direct-to-Chip (H-ASP)
            </span>
          </div>

          {/* Side by side thermal stack diagrams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* TRADITIONAL STACK */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                sliderPos < 50
                  ? 'border-dtc-hot/60 bg-dtc-hot/5 shadow-[0_0_30px_rgba(255,59,48,0.15)]'
                  : 'border-slate-800 bg-slate-900/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div>
                  <span className="font-mono text-xs text-dtc-hot font-bold uppercase tracking-wider block">
                    Conventional Architecture
                  </span>
                  <h3 className="text-lg font-display font-bold text-slate-100">
                    Indirect Multi-Stage Stack
                  </h3>
                </div>
                <XCircle className="w-6 h-6 text-dtc-hot" />
              </div>

              {/* Stack items */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-lg bg-dtc-hot/20 border border-dtc-hot/40 text-center font-bold text-dtc-hot">
                  AI ACCELERATOR DIE (700W HOTSPOT)
                </div>
                <div className="flex justify-center text-slate-500">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-center text-slate-300">
                  Thermal Interface Material 1 (TIM1)
                </div>
                <div className="flex justify-center text-slate-500">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-center text-slate-300">
                  Integrated Heat Spreader (IHS Copper Lid)
                </div>
                <div className="flex justify-center text-slate-500">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-center text-slate-300">
                  Thermal Interface Material 2 (TIM2 Paste)
                </div>
                <div className="flex justify-center text-slate-500">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center text-slate-400">
                  Bulky Aluminum / Copper Heatsink Fin Stack
                </div>
                <div className="flex justify-center text-slate-500">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center text-slate-500">
                  Forced Air Convection (High Acoustic Noise)
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>Total Thermal Resistance:</span>
                  <span className="text-dtc-hot font-bold">&gt; 0.20 K/W</span>
                </div>
                <div className="flex justify-between">
                  <span>Rack Density Limit:</span>
                  <span className="text-dtc-hot font-bold">Max 30 kW / Rack</span>
                </div>
              </div>
            </div>

            {/* DIRECT-TO-CHIP STACK */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                sliderPos >= 50
                  ? 'border-dtc-cyan/60 bg-dtc-cyan/5 shadow-[0_0_30px_rgba(0,240,255,0.15)]'
                  : 'border-slate-800 bg-slate-900/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div>
                  <span className="font-mono text-xs text-dtc-cyan font-bold uppercase tracking-wider block">
                    Direct-to-Chip Innovation
                  </span>
                  <h3 className="text-lg font-display font-bold text-slate-100">
                    H-ASP Direct Liquid Interface
                  </h3>
                </div>
                <CheckCircle2 className="w-6 h-6 text-dtc-cyan" />
              </div>

              {/* Stack items */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-dtc-hot/20 border border-dtc-hot/40 text-center font-bold text-dtc-hot">
                  AI ACCELERATOR DIE (GH100 SILICON)
                </div>
                <div className="flex justify-center text-dtc-cyan">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3 rounded-lg bg-slate-800 border border-dtc-cyan/30 text-center text-slate-200">
                  Micro-Thin Indium / Liquid Metal Interface
                </div>
                <div className="flex justify-center text-dtc-cyan">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-900/60 via-dtc-cyan/20 to-blue-900/60 border border-dtc-cyan text-center font-bold text-dtc-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  3D COPPER COLD PLATE (70/20/10 MICROCHANNELS)
                </div>
                <div className="flex justify-center text-dtc-cyan">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-lg bg-dtc-cyan text-black font-bold text-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  DIRECT LIQUID COOLANT FLOW (PG25 @ 25°C)
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>Total Thermal Resistance:</span>
                  <span className="text-dtc-cyan font-bold">0.053 – 0.060 K/W</span>
                </div>
                <div className="flex justify-between">
                  <span>Rack Density Capability:</span>
                  <span className="text-dtc-green font-bold">100 kW+ / Rack</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
