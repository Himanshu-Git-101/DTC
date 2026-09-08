import React, { useState, useMemo } from 'react';
import { Gauge, Flame, Droplets, RotateCcw, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { Badge } from '../common/Badge';
import { calculateThermalPhysics, calculateMonolithicPhysics } from '../../utils/math';

export const VirtualLab: React.FC = () => {
  const [thermalLoad, setThermalLoad] = useState<number>(700); // 200 - 800 W
  const [flowRate, setFlowRate] = useState<number>(1.2); // 0.5 - 2.5 LPM
  const [finDensity, setFinDensity] = useState<number>(120); // 50 - 200 fins/cm

  const haspResults = useMemo(() => {
    return calculateThermalPhysics({
      thermalLoad,
      flowRate,
      finDensity,
      ambientCoolantTemp: 25.0,
    });
  }, [thermalLoad, flowRate, finDensity]);

  const monoResults = useMemo(() => {
    return calculateMonolithicPhysics(thermalLoad, flowRate);
  }, [thermalLoad, flowRate]);

  const handleReset = () => {
    setThermalLoad(700);
    setFlowRate(1.2);
    setFinDensity(120);
  };

  return (
    <section id="virtual-lab" className="relative py-20 bg-dtc-bg border-t border-slate-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-dtc-cyan/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="warm" size="md" className="mb-3" pulse>
            10 // INTERACTIVE ENGINEERING SANDBOX
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0B1220] dark:text-white tracking-tight">
            VIRTUAL THERMAL{' '}
            <span className="bg-gradient-to-r from-amber-500 via-blue-600 to-red-600 dark:from-amber-400 dark:via-dtc-cyan dark:to-dtc-hot bg-clip-text text-transparent">
              ENGINEERING LAB.
            </span>
          </h2>
          <p className="mt-4 text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            Adjust operating flow rates, accelerator workloads, and channel densities to observe real-time dynamic thermal resistance, pressure drop, and junction temperatures.
          </p>
        </div>

        {/* Sandbox Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Interactive Physics Sliders */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-dtc-cyan/30 space-y-6 hud-corner shadow-[0_0_40px_rgba(0,240,255,0.08)]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-mono text-xs uppercase tracking-widest text-dtc-cyan font-bold flex items-center gap-2">
                <Gauge className="w-4 h-4" /> Physics Input Variables
              </span>

              <button
                onClick={handleReset}
                className="font-mono text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset H100 Defaults</span>
              </button>
            </div>

            {/* Slider 1: Thermal Load */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-dtc-hot" />
                  <span>Total Thermal Load (P):</span>
                </label>
                <span className="font-mono text-base font-bold text-dtc-hot">
                  {thermalLoad} <span className="text-xs font-normal text-slate-400">Watts</span>
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={800}
                step={20}
                value={thermalLoad}
                onChange={(e) => setThermalLoad(Number(e.target.value))}
                className="w-full slider-thermal"
                aria-label="Thermal load slider"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>200W (Idle)</span>
                <span>500W</span>
                <span className="text-dtc-warm font-bold">700W (H100)</span>
                <span>800W (Peak)</span>
              </div>
            </div>

            {/* Slider 2: Coolant Flow Rate */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-dtc-cyan" />
                  <span>Total Coolant Flow Rate (Q):</span>
                </label>
                <span className="font-mono text-base font-bold text-dtc-cyan">
                  {flowRate.toFixed(2)} <span className="text-xs font-normal text-slate-400">LPM</span>
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2.5}
                step={0.1}
                value={flowRate}
                onChange={(e) => setFlowRate(Number(e.target.value))}
                className="w-full"
                aria-label="Coolant flow rate slider"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>0.5 LPM (Low)</span>
                <span className="text-dtc-cyan font-bold">1.2 LPM (Nominal)</span>
                <span>2.5 LPM (Max Pump)</span>
              </div>
            </div>

            {/* Slider 3: Fin Density */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Zone A Fin Density (N):</span>
                </label>
                <span className="font-mono text-base font-bold text-amber-400">
                  {finDensity} <span className="text-xs font-normal text-slate-400">fins/cm</span>
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                step={10}
                value={finDensity}
                onChange={(e) => setFinDensity(Number(e.target.value))}
                className="w-full"
                aria-label="Fin density slider"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>50 fins/cm</span>
                <span className="text-amber-400 font-bold">120 fins/cm (SLM Copper)</span>
                <span>200 fins/cm</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Physics Computation Outputs */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-dtc-green" /> Real-Time Computed Telemetry
              </span>

              <Badge
                variant={haspResults.isOverheating ? 'hot' : 'cyan'}
                pulse={haspResults.isOverheating}
                size="sm"
              >
                {haspResults.isOverheating ? 'THROTTLING RISK' : 'STABLE THERMAL MARGIN'}
              </Badge>
            </div>

            {/* Main Junction Temperature Readout */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                  Peak Silicon Hotspot (T_j,peak)
                </span>
                <div className="text-3xl font-mono font-extrabold text-white flex items-baseline gap-2">
                  <span className={haspResults.isOverheating ? 'text-dtc-hot' : 'text-dtc-cyan'}>
                    {haspResults.hotspotTemp}°C
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    (ΔT = {(haspResults.hotspotTemp - 25).toFixed(1)}°C)
                  </span>
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-slate-400 text-[10px] block">Monolithic Baseline:</span>
                <span className="text-dtc-hot line-through font-bold">{monoResults.hotspotTemp}°C</span>
                <span className="text-dtc-green block text-[10px]">
                  -{(monoResults.hotspotTemp - haspResults.hotspotTemp).toFixed(1)}°C Cooler
                </span>
              </div>
            </div>

            {/* 4 Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-dtc-cyan uppercase block">Thermal Resistance</span>
                <span className="text-lg font-bold text-white">{haspResults.thermalResistance} K/W</span>
                <span className="text-[10px] text-dtc-green block">Mono: {monoResults.thermalResistance} K/W</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-dtc-warm uppercase block">Hydraulic Pressure (ΔP)</span>
                <span className="text-lg font-bold text-white">{haspResults.pressureDrop.toLocaleString()} Pa</span>
                <span className="text-[10px] text-dtc-green block">Mono: {monoResults.pressureDrop.toLocaleString()} Pa</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-amber-400 uppercase block">Pumping Power</span>
                <span className="text-lg font-bold text-white">{haspResults.pumpingPower} W</span>
                <span className="text-[10px] text-dtc-green block">Mono: {monoResults.pumpingPower} W</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-dtc-green uppercase block">Flow Distribution</span>
                <span className="text-lg font-bold text-dtc-cyan">70 / 20 / 10 %</span>
                <span className="text-[10px] text-slate-400 block">Flux-Matched</span>
              </div>
            </div>

            {/* Status & Physics Callout */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-dtc-green" />
                <span className="font-bold text-slate-100">{haspResults.statusMessage}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Calculations dynamically evaluate convective coefficient $h_A$, hydraulic diameter $D_h$, Darcy friction factor, and caloric fluid temperature rise.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center font-mono text-[11px] text-slate-400 mt-8">
          * Interactive parameters are calculated using Navier-Stokes & Darcy-Weisbach analytical approximations based on Woxsen University research data.
        </p>
      </div>
    </section>
  );
};
