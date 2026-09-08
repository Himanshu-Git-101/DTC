import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ShortenPath } from './ShortenPath';
import { ZONES_DATA } from '../../data/projectData';

export const SolutionSection: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState<number>(0);
  const activeZone = ZONES_DATA[activeZoneIndex];

  return (
    <section id="solution" className="relative py-20 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="green" size="md" className="mb-3">
            04 // CORE ARCHITECTURAL INNOVATION
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0B1220] dark:text-white tracking-tight">
            OUR APPROACH:{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-dtc-cyan dark:to-blue-400 bg-clip-text text-transparent">
              H-ASP COLD PLATE.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            Rather than distributing coolant uniformly across the whole package, the <strong className="text-[#0B1220] dark:text-slate-200">Heterogeneous Area-Specific Cold Plate (H-ASP)</strong> utilizes a co-designed passive manifold that enforces a <strong className="text-blue-600 dark:text-dtc-cyan">70-20-10 flow split</strong> tailored directly to the spatial heat flux profile of the NVIDIA H100 SXM5 GPU.
          </p>
        </div>

        {/* 3 Heterogeneous Zones Interactive Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Zone Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-2">
              Select Microchannel Zone
            </span>

            {ZONES_DATA.map((zone, idx) => {
              const isSelected = activeZoneIndex === idx;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between relative group ${
                    isSelected
                      ? 'bg-slate-900 border-dtc-cyan shadow-[0_0_25px_rgba(0,240,255,0.15)] scale-[1.01]'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center"
                        style={{
                          backgroundColor: `${zone.color}20`,
                          color: zone.color,
                          border: `1px solid ${zone.color}50`,
                        }}
                      >
                        {zone.zoneLetter}
                      </span>
                      <h4 className="font-mono text-sm font-bold text-slate-100 group-hover:text-dtc-cyan transition-colors">
                        {zone.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      {zone.targetComponent}
                    </p>
                  </div>

                  <div className="text-right font-mono">
                    <span
                      className="text-lg font-bold block"
                      style={{ color: zone.color }}
                    >
                      {zone.flowPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">
                      Flow Allocation
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Passive Manifold Callout */}
            <div className="p-4 rounded-xl bg-dtc-cyan/5 border border-dtc-cyan/20 text-xs font-mono text-slate-400 flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-dtc-cyan shrink-0" />
              <span>
                <strong className="text-slate-200">Zero Active Valves:</strong> The 70-20-10 distribution is permanently enforced by internal hydraulic channel resistance ratios.
              </span>
            </div>
          </div>

          {/* Active Zone Detail Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 hud-corner relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-lg font-mono text-sm font-bold flex items-center justify-center"
                    style={{
                      backgroundColor: `${activeZone.color}20`,
                      color: activeZone.color,
                      border: `1px solid ${activeZone.color}60`,
                    }}
                  >
                    ZONE {activeZone.zoneLetter}
                  </span>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {activeZone.name}
                    </h3>
                    <span className="font-mono text-xs text-slate-400">
                      {activeZone.channelType}
                    </span>
                  </div>
                </div>

                <Badge variant={activeZone.zoneLetter === 'A' ? 'hot' : activeZone.zoneLetter === 'B' ? 'warm' : 'cyan'}>
                  {activeZone.heatFlux} W/cm² Flux Density
                </Badge>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Heat Flux</span>
                  <span className="text-base font-bold text-slate-100">{activeZone.heatFlux} W/cm²</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Power Dissipated</span>
                  <span className="text-base font-bold text-slate-100">{activeZone.power} W</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Die Footprint</span>
                  <span className="text-base font-bold text-slate-100">{activeZone.area} cm²</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Coolant Flow</span>
                  <span className="text-base font-bold text-dtc-cyan">{activeZone.flowPercentage}% Total</span>
                </div>
              </div>

              {/* Fin Geometry Specifications */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-[10px] text-dtc-cyan uppercase font-semibold tracking-wider block mb-1">
                  Microchannel Fin Specifications
                </span>
                <p className="font-mono text-xs text-slate-200">
                  {activeZone.channelFinDensity}
                </p>
              </div>

              {/* Rationale & Descriptions */}
              <div className="space-y-3 font-sans text-sm text-slate-300 leading-relaxed">
                <div>
                  <strong className="text-slate-100 font-display block mb-1">Thermal Challenge:</strong>
                  <p className="text-slate-400">{activeZone.description}</p>
                </div>
                <div>
                  <strong className="text-dtc-cyan font-display block mb-1">Fluid Dynamic Rationale:</strong>
                  <p className="text-slate-400">{activeZone.fluidDynamicRationale}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Shorten Path Comparison Section */}
        <ShortenPath />
      </div>
    </section>
  );
};
