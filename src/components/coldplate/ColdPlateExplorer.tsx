import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../common/Badge';
import { Info, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HotspotPin {
  id: string;
  name: string;
  title: string;
  category: 'zone-a' | 'zone-b' | 'zone-c' | 'manifold' | 'inlet';
  x: number; // percentage
  y: number; // percentage
  description: string;
  specs: string;
}

const pins: HotspotPin[] = [
  {
    id: 'inlet',
    name: 'Inlet Manifold',
    title: 'Dual 6mm Quick-Disconnect Fluid Ports',
    category: 'inlet',
    x: 14,
    y: 50,
    description: 'Houses dual low-pressure-drop barb fittings compatible with PG25 water-glycol coolant running at 1.2 LPM at 25.0°C.',
    specs: 'Flow Rate: 1.2 LPM | Inlet Temperature: 25.0°C | Fitting: 6mm Push-Lock ID',
  },
  {
    id: 'zone-a',
    name: 'Zone A: Microchannels',
    title: 'High-Flux Compute Die Micro-Fin Array',
    category: 'zone-a',
    x: 50,
    y: 50,
    description: 'High aspect ratio (8:1) microchannels positioned directly above the GH100 high-flux silicon core (~218 W/cm²). Receives 70% of total fluid volume.',
    specs: 'Channel Width: 150 µm | Fin Width: 100 µm | Fin Height: 1.2 mm | Allocation: 70% Q_in',
  },
  {
    id: 'zone-b-top',
    name: 'Zone B: HBM3 Banks',
    title: 'Upper HBM3 Memory Cooling Channels',
    category: 'zone-b',
    x: 35,
    y: 28,
    description: 'Moderate aspect ratio microchannels cooling 3x stacked HBM3 memory modules. Moderate thermal density (~45 W/cm²). Receives 20% of passive flow.',
    specs: 'Channel Width: 250 µm | Fin Width: 150 µm | Aspect: 4:1 | Allocation: 20% Q_in',
  },
  {
    id: 'zone-b-bottom',
    name: 'Zone B: HBM3 Banks',
    title: 'Lower HBM3 Memory Cooling Channels',
    category: 'zone-b',
    x: 65,
    y: 72,
    description: 'Lower array for the remaining 3x HBM3 modules. Ensures junction temperatures remain under 65°C to avoid memory refresh latency degradation.',
    specs: 'Channel Width: 250 µm | Fin Width: 150 µm | Aspect: 4:1 | Target Temp: <65°C',
  },
  {
    id: 'zone-c',
    name: 'Zone C: VRM & Periphery',
    title: 'Power Stage & Peripheral Flow Circuit',
    category: 'zone-c',
    x: 50,
    y: 82,
    description: 'Wide cross-section channels cooling peripheral voltage regulator modules (VRMs) and SXM5 bridge circuits. Low pressure drop to prioritize Zone A.',
    specs: 'Channel Width: 500 µm | Fin Width: 300 µm | Allocation: 10% Q_in | ΔP: Minimal',
  },
  {
    id: 'outlet',
    name: 'Discharge Manifold',
    title: 'Consolidated Return Collector',
    category: 'manifold',
    x: 86,
    y: 50,
    description: 'Blends heated streams from Zone A, B, and C with minimal backpressure before routing into the rack CDU closed loop.',
    specs: 'Discharge Temp: ~37.2°C | Combined ΔP: 18.4 kPa | Material: Additively Manufactured Cu-ETP',
  },
];

export const ColdPlateExplorer: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedPin, setSelectedPin] = useState<HotspotPin | null>(pins[1]); // Default to Zone A

  return (
    <section id="coldplate" className="relative py-20 bg-dtc-bg border-t border-[#DCE4EE] dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="cyan" size="md">
            Interactive Hardware Inspection
          </Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#0B1220] dark:text-white">
            THE H-ASP COLD PLATE ARCHITECTURE.
          </h2>
          <p className="mt-4 text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            Click on any interactive hotspot pin on the cold plate CAD diagram to inspect internal microchannel dimensions, flow allocations, and thermal specifications.
          </p>
        </div>

        {/* Cold Plate Interactive CAD Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Visual CAD Canvas */}
          <div className="lg:col-span-8 relative glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/30 dark:border-dtc-cyan/30 hud-corner shadow-[0_8px_30px_rgba(37,99,235,0.08)] dark:shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-950 rounded-2xl border border-[#DCE4EE] dark:border-slate-900 overflow-hidden flex items-center justify-center p-6 select-none shadow-inner">
              {/* Cold Plate Outer Enclosure SVG Schematic */}
              <svg viewBox="0 0 700 440" className="w-full h-full filter drop-shadow-md">
                {/* Cold Plate Base Metallic Body (Brushed aluminum in light, dark metallic in dark) */}
                <rect
                  x="70"
                  y="40"
                  width="560"
                  height="360"
                  rx="24"
                  fill={isDark ? '#0c1322' : '#E2E8F0'}
                  stroke={isDark ? '#1e293b' : '#94A3B8'}
                  strokeWidth="3"
                />

                {/* Copper Microchannel Base Chamber */}
                <rect
                  x="120"
                  y="80"
                  width="460"
                  height="280"
                  rx="16"
                  fill={isDark ? '#151e33' : '#CBD5E1'}
                  stroke={isDark ? 'rgba(0, 240, 255, 0.4)' : '#2563EB'}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* Zone B: Top HBM Modules */}
                <rect x="180" y="105" width="85" height="60" rx="6" fill={isDark ? '#2d1c08' : '#FFEDD5'} stroke={isDark ? '#ff9500' : '#ea580c'} strokeWidth="1.5" />
                <rect x="290" y="105" width="85" height="60" rx="6" fill={isDark ? '#2d1c08' : '#FFEDD5'} stroke={isDark ? '#ff9500' : '#ea580c'} strokeWidth="1.5" />
                <rect x="435" y="105" width="85" height="60" rx="6" fill={isDark ? '#2d1c08' : '#FFEDD5'} stroke={isDark ? '#ff9500' : '#ea580c'} strokeWidth="1.5" />

                {/* Zone A: Center Compute Core Die */}
                <rect
                  x="230"
                  y="180"
                  width="240"
                  height="110"
                  rx="8"
                  fill={isDark ? '#3b0f0f' : '#FEE2E2'}
                  stroke={isDark ? '#ff3b30' : '#dc2626'}
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
                    stroke={isDark ? 'rgba(0, 240, 255, 0.6)' : '#2563EB'}
                    strokeWidth="1.5"
                  />
                ))}

                {/* Zone C: Lower Power Delivery / I/O Channels */}
                <rect x="160" y="305" width="380" height="40" rx="6" fill={isDark ? '#08222b' : '#CFFAFE'} stroke={isDark ? '#00f0ff' : '#0891b2'} strokeWidth="1.5" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1={175 + i * 30}
                    y1={310}
                    x2={175 + i * 30}
                    y2={340}
                    stroke={isDark ? 'rgba(0, 240, 255, 0.4)' : '#06B6D4'}
                    strokeWidth="2"
                  />
                ))}

                {/* Inlet Port Geometry */}
                <circle cx="95" cy="220" r="28" fill={isDark ? '#00f0ff' : '#0284c7'} />
                <circle cx="95" cy="220" r="18" fill={isDark ? '#05070b' : '#FFFFFF'} stroke={isDark ? '#00f0ff' : '#0284c7'} strokeWidth="3" />
                <text x="95" y="224" fill={isDark ? '#00f0ff' : '#0284c7'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">INLET</text>

                {/* Outlet Port Geometry */}
                <circle cx="605" cy="220" r="28" fill={isDark ? '#ff3b30' : '#dc2626'} />
                <circle cx="605" cy="220" r="18" fill={isDark ? '#05070b' : '#FFFFFF'} stroke={isDark ? '#ff3b30' : '#dc2626'} strokeWidth="3" />
                <text x="605" y="224" fill={isDark ? '#ff3b30' : '#dc2626'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">OUTLET</text>

                {/* Flow Streamline Arrows */}
                <path d="M 125 220 Q 180 180 230 220" fill="none" stroke={isDark ? '#00f0ff' : '#0284c7'} strokeWidth="2" strokeDasharray="5 5" />
                <path d="M 470 220 Q 530 240 575 220" fill="none" stroke={isDark ? '#ff3b30' : '#dc2626'} strokeWidth="2" strokeDasharray="5 5" />
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
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          pin.category === 'zone-a'
                            ? 'bg-red-500'
                            : pin.category === 'zone-b'
                            ? 'bg-amber-500'
                            : 'bg-blue-600 dark:bg-dtc-cyan'
                        }`}
                      />
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-[10px] font-mono font-bold shadow-lg border-2 ${
                          isSelected
                            ? 'bg-white text-black border-blue-600 dark:border-white ring-2 ring-blue-500/50 dark:ring-dtc-cyan'
                            : pin.category === 'zone-a'
                            ? 'bg-red-600 text-white border-red-300'
                            : pin.category === 'zone-b'
                            ? 'bg-amber-500 text-black border-amber-200'
                            : 'bg-blue-600 dark:bg-dtc-cyan text-white dark:text-black border-blue-300 dark:border-white'
                        }`}
                      >
                        ●
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hint footer */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#526174] dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-dtc-cyan font-medium">
                <Info className="w-4 h-4" /> Click pins to view microchannel specifications
              </span>
              <span>Pure Copper Additive Manufactured Cold Plate</span>
            </div>
          </div>

          {/* Hotspot Information Sidebar / Inspector Panel */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-[#DCE4EE] dark:border-slate-800 min-h-[380px] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-blue-600 dark:text-dtc-cyan uppercase tracking-widest block mb-1 font-semibold">
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
                      <h3 className="text-xl font-display font-bold text-[#0B1220] dark:text-white">
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

                      <p className="text-sm text-[#526174] dark:text-slate-300 font-sans leading-relaxed">
                        {selectedPin.description}
                      </p>

                      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-[#DCE4EE] dark:border-slate-800">
                        <span className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase block mb-1 font-semibold">
                          Engineering Specs
                        </span>
                        <p className="font-mono text-xs text-blue-700 dark:text-dtc-cyan leading-relaxed font-semibold">
                          {selectedPin.specs}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-12 text-center text-[#526174] dark:text-slate-400 font-mono text-xs space-y-3">
                      <Layers className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
                      <p>Select any pin on the cold plate CAD view to inspect internal channel geometry and thermal parameters.</p>
                      <button
                        onClick={() => setSelectedPin(pins[1])}
                        className="text-blue-600 dark:text-dtc-cyan underline hover:text-blue-800 dark:hover:text-white"
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
                  className="mt-6 text-xs font-mono text-[#526174] dark:text-slate-400 hover:text-blue-600 dark:hover:text-white underline text-left"
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
