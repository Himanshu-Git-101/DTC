import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, GitBranch, Waves, LogOut, RefreshCw, ChevronRight, Activity } from 'lucide-react';
import { Badge } from '../common/Badge';
import { SYSTEM_WORKFLOW_STEPS } from '../../data/projectData';

export const HowItWorks: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = SYSTEM_WORKFLOW_STEPS[activeStepIndex];

  const iconMap: Record<string, React.ElementType> = {
    Cpu,
    Layers,
    GitBranch,
    Waves,
    LogOut,
    RefreshCw,
  };

  return (
    <section id="how-it-works" className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            08 // OPERATIONAL SEQUENCE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            HOW IT{' '}
            <span className="bg-gradient-to-r from-dtc-cyan via-blue-400 to-dtc-hot bg-clip-text text-transparent">
              WORKS.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            Follow the micro-scale thermo-fluidic journey from 218 W/cm² transistor heat dissipation to closed-loop data center heat rejection.
          </p>
        </div>

        {/* Step Selector Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {SYSTEM_WORKFLOW_STEPS.map((step, idx) => {
            const Icon = iconMap[step.iconName] || Cpu;
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-slate-900 border-dtc-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)] scale-[1.02]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-dtc-cyan' : 'text-slate-500'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-dtc-cyan' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-100 line-clamp-1">
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 block line-clamp-1">
                    {step.tagline}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Stage Visualizer */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 hud-corner relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.stepNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Description & Step Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-dtc-cyan/15 border border-dtc-cyan/40 text-dtc-cyan font-mono font-bold flex items-center justify-center text-sm">
                    {activeStep.stepNumber}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {activeStep.title}
                    </h3>
                    <span className="font-mono text-xs text-dtc-cyan font-semibold">
                      {activeStep.tagline}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Step controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ◀ Previous Step
                  </button>
                  <button
                    disabled={activeStepIndex === SYSTEM_WORKFLOW_STEPS.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        Math.min(SYSTEM_WORKFLOW_STEPS.length - 1, prev + 1)
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-dtc-cyan text-black font-semibold text-xs font-mono hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Telemetry State Indicator Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-mono text-xs text-slate-400 uppercase font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-dtc-cyan animate-pulse" />
                    Telemetry State @ Step {activeStep.stepNumber}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-dtc-green" />
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-dtc-cyan uppercase block">Inlet Fluid Temp</span>
                    <span className="text-base font-bold text-slate-100">{activeStep.telemetryState.tempInlet}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-dtc-hot uppercase block">Outlet Discharge</span>
                    <span className="text-base font-bold text-slate-100">{activeStep.telemetryState.tempOutlet}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-dtc-warm uppercase block">Local Flow Velocity</span>
                    <span className="text-base font-bold text-slate-100">{activeStep.telemetryState.flowVelocity}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-dtc-green uppercase block">Heat Flux Removed</span>
                    <span className="text-base font-bold text-slate-100">{activeStep.telemetryState.heatFluxRemoved}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-[11px] font-mono text-slate-400">
                  Status: <strong className="text-dtc-cyan">Laminar to Transitional Micro-Channel Regime (Re ≈ 850–1400)</strong>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
