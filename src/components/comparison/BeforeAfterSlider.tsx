import React, { useState } from 'react';
import { Flame, ShieldCheck, ArrowLeftRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section className="relative py-20 bg-dtc-bg overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="cyan" size="md" className="mb-3">
            03 // BEFORE & AFTER COMPARISON
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            DIRECT THERMAL EXTRACTION{' '}
            <span className="text-dtc-cyan">IN ACTION.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            Drag the divider to compare the thermal heat map of a monolithic cold plate vs our Heterogeneous Area-Specific Cold Plate (H-ASP) under full 700W load.
          </p>
        </div>

        {/* Interactive Split View Container */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl select-none">
          <div className="relative h-[380px] sm:h-[440px] md:h-[480px] w-full bg-slate-950 overflow-hidden">
            {/* RIGHT SIDE (AFTER - H-ASP DTC) */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/40 from-slate-50 via-white to-sky-50/60">
              <div className="flex justify-end">
                <div className="glass-panel px-4 py-2 rounded-xl border border-dtc-cyan/40 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-dtc-green" />
                  <div>
                    <span className="font-mono text-xs font-bold text-dtc-cyan block">
                      AFTER: H-ASP COLD PLATE
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      70-20-10 Flux-Matched Flow
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic Representation of H-ASP Uniform Thermal Map */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[340px] sm:w-[420px] h-[220px] rounded-2xl border-2 border-dtc-cyan/50 bg-slate-900/90 p-4 flex flex-col justify-between shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                  <div className="flex justify-between font-mono text-[10px] text-dtc-cyan">
                    <span>INLET: 25.0°C</span>
                    <span>OUTLET: 37.2°C</span>
                  </div>
                  {/* Smooth Cyan / Green Gradient representing controlled thermals */}
                  <div className="w-full h-24 rounded-lg bg-gradient-to-r from-dtc-cyan/30 via-emerald-500/20 to-amber-500/30 flex items-center justify-center border border-dtc-cyan/30">
                    <span className="font-mono text-xs font-bold text-dtc-cyan tracking-wider">
                      CONTROLLED HOTSPOT: 27°C ΔT ABOVE COOLANT
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400">
                    <span>Zone A (70% Flow): 0.053 K/W</span>
                    <span>Pressure Drop: 3800 Pa</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="font-mono text-xs text-dtc-green bg-slate-900/90 px-3 py-1.5 rounded-lg border border-dtc-green/30">
                  ✔ Zero Silicon Throttling (Sustained 1.8GHz Boost)
                </div>
              </div>
            </div>

            {/* LEFT SIDE (BEFORE - MONOLITHIC COLD PLATE) clipped by sliderPosition */}
            <div
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-red-950/40 from-slate-50 via-white to-red-50/60 border-r-2 border-slate-400 dark:border-white/80 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="flex justify-start">
                <div className="glass-panel px-4 py-2 rounded-xl border border-dtc-hot/40 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-dtc-hot" />
                  <div>
                    <span className="font-mono text-xs font-bold text-dtc-hot block">
                      BEFORE: MONOLITHIC COLD PLATE
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Uniform Flow Distribution
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic Representation of Hotspot Concentration */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[340px] sm:w-[420px] h-[220px] rounded-2xl border-2 border-dtc-hot/50 bg-slate-900/90 p-4 flex flex-col justify-between shadow-[0_0_50px_rgba(255,59,48,0.3)]">
                  <div className="flex justify-between font-mono text-[10px] text-dtc-hot">
                    <span>INLET: 25.0°C</span>
                    <span>OUTLET: 32.0°C (Starved)</span>
                  </div>
                  {/* Blistering Red Hotspot in Center */}
                  <div className="w-full h-24 rounded-lg bg-gradient-to-r from-red-600/60 via-red-500/90 to-amber-600/50 flex items-center justify-center border border-dtc-hot animate-pulse">
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      CONCENTRATED HOTSPOT: 37.3°C ΔT (THROTTLING)
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400">
                    <span>Core Starvation: 0.0757 K/W</span>
                    <span>Pressure Drop: 5890 Pa</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="font-mono text-xs text-dtc-hot bg-slate-900/90 px-3 py-1.5 rounded-lg border border-dtc-hot/30">
                  ✖ Severe Thermal Throttling Triggered (&gt;85°C Junction)
                </div>
              </div>
            </div>

            {/* Slider Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow-lg text-slate-200">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Hidden interactive range input across whole container */}
            <input
              type="range"
              min={5}
              max={95}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              aria-label="Drag before and after thermal slider"
            />
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div>
              <span className="text-slate-500 uppercase tracking-widest block text-[10px]">
                Thermal Improvement
              </span>
              <span className="text-slate-200 font-bold">
                5°C – 10°C Hotspot Drop | 20–30% Lower Thermal Resistance
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-dtc-cyan animate-pulse" />
              <span>Drag slider horizontally to compare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
