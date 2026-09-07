import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Info } from 'lucide-react';
import { Badge } from '../common/Badge';

interface HotspotPin {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  category: 'inlet' | 'outlet' | 'zone-a' | 'zone-b' | 'zone-c' | 'baseplate';
  title: string;
  description: string;
  specs: string;
}

export const ColdPlateExplorer: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<HotspotPin | null>(null);

  const pins: HotspotPin[] = [
    {
      id: 'inlet',
      name: 'INLET MANIFOLD PORT',
      x: 14,
      y: 50,
      category: 'inlet',
      title: 'Coolant Supply Inlet Header',
      description: 'Accepts 25.0°C PG25 dielectric coolant from the server quick-disconnect fitting and distributes incoming fluid evenly into the 3-zone internal manifold.',
      specs: 'Diameter: 8.0mm | Fluid: Water-Glycol 25% | Supply Temp: 25.0°C | Mass Flow: 1.2 LPM',
    },
    {
      id: 'zone-a',
      name: 'ZONE A: ULTRA-DENSE MICROCHANNELS',
      x: 50,
      y: 50,
      category: 'zone-a',
      title: 'Compute Core Microchannel Fin Array',
      description: 'Positioned directly over the 2.2 cm² GH100 compute die. Features 120µm wide copper fins with 150µm channel gaps receiving 70% of total mass flow to maximize heat transfer coefficient.',
      specs: 'Fin Width: 120µm | Channel Gap: 150µm | Fin Height: 1.8mm | Heat Flux: 218 W/cm²',
    },
    {
      id: 'zone-b',
      name: 'ZONE B: HBM MEMORY CHANNELS',
      x: 32,
      y: 26,
      category: 'zone-b',
      title: 'High-Bandwidth Memory (HBM3) Fin Array',
      description: 'Cools 6x 3D-stacked HBM3 memory modules. Medium-density fin array receives 20% of coolant flow to maintain stack temperatures below 85°C without unnecessary pressure drop.',
      specs: 'Fin Width: 300µm | Channel Gap: 350µm | Fin Height: 1.2mm | Heat Flux: 23 W/cm²',
    },
    {
      id: 'zone-c',
      name: 'ZONE C: WIDE LOW-RESISTANCE CHANNELS',
      x: 50,
      y: 84,
      category: 'zone-c',
      title: 'Power Delivery (PDN) Flow Passage',
      description: 'Covers peripheral voltage regulators and NVLink transceivers. 800µm wide channels provide gentle cooling with minimal hydraulic resistance, saving pumping power.',
      specs: 'Channel Width: 800µm | Fin Height: 1.0mm | Flow Allocation: 10% | Pressure Penalty: Minimal',
    },
    {
      id: 'outlet',
      name: 'OUTLET DISCHARGE PLENUM',
      x: 86,
      y: 50,
      category: 'outlet',
      title: 'Heated Fluid Discharge Header',
      description: 'Collects heated fluid streams from Zones A, B, and C into a low-turbulence collector, directing warm 37.2°C fluid out to the data center cooling loop.',
      specs: 'Diameter: 8.0mm | Discharge Temp: 37.2°C | Power Carried: 700W+ | Fluid Velocity: 1.5 m/s',
    },
  ];

  return (
    <section id="coldplate" className="relative py-20 bg-dtc-bg border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            05 // INTERACTIVE CAD COLD PLATE EXPLORER
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            ENGINEERING THE{' '}
            <span className="text-dtc-cyan">COLD PLATE.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            Click on any interactive hotspot pin on the cold plate CAD diagram to inspect internal microchannel dimensions, flow allocations, and thermal specifications.
          </p>
        </div>

        {/* Cold Plate Interactive CAD Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Visual CAD Canvas */}
          <div className="lg:col-span-8 relative glass-panel p-6 sm:p-10 rounded-3xl border border-dtc-cyan/30 hud-corner shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-900 overflow-hidden flex items-center justify-center p-6 select-none">
              {/* Cold Plate Outer Enclosure SVG Schematic */}
              <svg viewBox="0 0 700 440" className="w-full h-full">
                {/* Cold Plate Base Metallic Body */}
                <rect
                  x="70"
                  y="40"
                  width="560"
                  height="360"
                  rx="24"
                  className="fill-slate-200 dark:fill-[#0c1322] stroke-slate-300 dark:stroke-[#1e293b]"
                  strokeWidth="3"
                />

                {/* Copper Microchannel Base Chamber */}
                <rect
                  x="120"
                  y="80"
                  width="460"
                  height="280"
                  rx="16"
                  className="fill-slate-50 dark:fill-[#151e33] stroke-dtc-cyan/40"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* Zone B: Top HBM Modules */}
                <rect x="180" y="105" width="85" height="60" rx="6" className="fill-amber-100 dark:fill-[#2d1c08] stroke-dtc-warm" strokeWidth="1.5" />
                <rect x="290" y="105" width="85" height="60" rx="6" className="fill-amber-100 dark:fill-[#2d1c08] stroke-dtc-warm" strokeWidth="1.5" />
                <rect x="435" y="105" width="85" height="60" rx="6" className="fill-amber-100 dark:fill-[#2d1c08] stroke-dtc-warm" strokeWidth="1.5" />

                {/* Zone A: Center Compute Core Die */}
                <rect
                  x="230"
                  y="180"
                  width="240"
                  height="110"
                  rx="8"
                  className="fill-red-100 dark:fill-[#3b0f0f] stroke-dtc-hot"
                  strokeWidth="2.5"
                />

                {/* Microchannel Fin lines in Zone A */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1={245 + i * 9}
                    y1={190}
                    x2={245 + i * 9}
                    y2={280}
                    className="stroke-dtc-cyan/60"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Zone C: Lower Power Delivery / I/O Channels */}
                <rect x="160" y="305" width="380" height="40" rx="6" className="fill-sky-100 dark:fill-[#08222b] stroke-dtc-cyan" strokeWidth="1.5" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1={175 + i * 30}
                    y1={310}
                    x2={175 + i * 30}
                    y2={340}
                    className="stroke-dtc-cyan/40"
                    strokeWidth="2"
                  />
                ))}

                {/* Inlet Port Geometry */}
                <circle cx="95" cy="220" r="28" className="fill-dtc-cyan" />
                <circle cx="95" cy="220" r="18" className="fill-slate-900 dark:fill-[#05070b] stroke-dtc-cyan" strokeWidth="3" />
                <text x="95" y="224" className="fill-dtc-cyan" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">INLET</text>

                {/* Outlet Port Geometry */}
                <circle cx="605" cy="220" r="28" className="fill-dtc-hot" />
                <circle cx="605" cy="220" r="18" className="fill-slate-900 dark:fill-[#05070b] stroke-dtc-hot" strokeWidth="3" />
                <text x="605" y="224" className="fill-dtc-hot" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">OUTLET</text>

                {/* Flow Streamline Arrows */}
                <path d="M 125 220 Q 180 180 230 220" fill="none" className="stroke-dtc-cyan" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M 470 220 Q 530 240 575 220" fill="none" className="stroke-dtc-hot" strokeWidth="2" strokeDasharray="5 5" />
              </svg>

              {/* Interactive Hotspot Pins Overlay */}
              {pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform ${
                      isSelected ? 'scale-125' : 'hover:scale-110'
                    }`}
                    aria-label={`Inspect ${pin.name}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                          pin.category === 'zone-a'
                            ? 'bg-dtc-hot'
                            : pin.category === 'zone-b'
                            ? 'bg-dtc-warm'
                            : 'bg-dtc-cyan'
                        }`}
                      />
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-lg border-2 ${
                          isSelected
                            ? 'bg-white text-black border-dtc-cyan shadow-[0_0_20px_#00F0FF]'
                            : pin.category === 'zone-a'
                            ? 'bg-dtc-hot text-white border-white'
                            : pin.category === 'zone-b'
                            ? 'bg-dtc-warm text-white border-white'
                            : 'bg-dtc-cyan text-black border-white'
                        }`}
                      >
                        +
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint footer */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-dtc-cyan">
                <Info className="w-4 h-4" /> Click pins to view microchannel specifications
              </span>
              <span>Pure Copper Additive Manufactured Cold Plate</span>
            </div>
          </div>

          {/* Hotspot Information Sidebar / Inspector Panel */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 min-h-[380px] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-dtc-cyan uppercase tracking-widest block mb-1">
                  CAD Component Inspector
                </span>

                <AnimatePresence mode="wait">
                  {selectedPin ? (
                    <motion.div
                      key={selectedPin.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-display font-bold text-white">
                        {selectedPin.title}
                      </h3>

                      <Badge
                        variant={
                          selectedPin.category === 'zone-a'
                            ? 'hot'
                            : selectedPin.category === 'zone-b'
                            ? 'warm'
                            : 'cyan'
                        }
                      >
                        {selectedPin.name}
                      </Badge>

                      <p className="text-sm text-slate-300 font-sans leading-relaxed">
                        {selectedPin.description}
                      </p>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                          Engineering Specs
                        </span>
                        <p className="font-mono text-xs text-dtc-cyan leading-relaxed">
                          {selectedPin.specs}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-12 text-center text-slate-400 font-mono text-xs space-y-3">
                      <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                      <p>Select any pin on the cold plate CAD view to inspect internal channel geometry and thermal parameters.</p>
                      <button
                        onClick={() => setSelectedPin(pins[1])}
                        className="text-dtc-cyan underline hover:text-white"
                      >
                        Quick view: Zone A Compute Core
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {selectedPin && (
                <button
                  onClick={() => setSelectedPin(null)}
                  className="mt-6 text-xs font-mono text-slate-400 hover:text-white underline text-left"
                >
                  Reset Inspector
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
