import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../common/Badge';
import { Sliders } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  thickness: string;
  material: string;
  functionDesc: string;
  color: string;
  offsetMultiplier: number;
}

export const ExplodedView: React.FC = () => {
  const { isDark } = useTheme();
  // 0 = fully assembled, 100 = maximum layer separation
  const [explosionAmount, setExplosionAmount] = useState<number>(65);

  const layers: Layer[] = [
    {
      id: 'l1',
      title: '1. Manifold Lid & Inlet/Outlet Ports',
      subtitle: 'Additive Manufactured PEEK / Titanium Cover',
      thickness: '4.0 mm',
      material: 'Titanium Ti-6Al-4V / PEEK Polymer',
      functionDesc: 'Directs pressurized coolant through dual inlets into the 3-zone distribution plenum with O-ring hermetic sealing.',
      color: '#00F0FF',
      offsetMultiplier: -2.2,
    },
    {
      id: 'l2',
      title: '2. 3-Zone Flow Distribution Manifold',
      subtitle: 'Passive Flow Split Routing (70-20-10)',
      thickness: '2.5 mm',
      material: 'Pure Copper Cu-ETP (3D Printed)',
      functionDesc: 'Engineered fluid channels enforce a 70% flow concentration to Zone A compute core, 20% to HBM3, and 10% to VRM peripherals without active valves.',
      color: '#2563EB',
      offsetMultiplier: -1.2,
    },
    {
      id: 'l3',
      title: '3. Microchannel Fin Array Baseplate',
      subtitle: '150µm Ultra-Dense Micro-Fins',
      thickness: '1.8 mm',
      material: 'Oxygen-Free High Conductivity Copper (C10100)',
      functionDesc: 'Features 8:1 aspect ratio micro-fins directly absorbing heat flux up to 218 W/cm² with convective coefficient >18,000 W/m²K.',
      color: '#B87333',
      offsetMultiplier: 0,
    },
    {
      id: 'l4',
      title: '4. Indium-Gallium Liquid Metal TIM',
      subtitle: 'Thermal Interface Material (TIM 1.5)',
      thickness: '0.05 mm',
      material: 'Gallium-Indium-Tin Eutectic (Galinstan)',
      functionDesc: 'Eliminates microscopic air gaps between copper baseplate and silicon die with ultra-high thermal conductivity (73 W/m·K) vs traditional paste (6 W/m·K).',
      color: '#FBBF24',
      offsetMultiplier: 0.8,
    },
    {
      id: 'l5',
      title: '5. NVIDIA GH100 Compute Silicon + 6x HBM3',
      subtitle: 'High-Density AI Accelerator Package',
      thickness: '0.85 mm',
      material: 'Monolithic Silicon Die + CoWoS Interposer',
      functionDesc: 'Generates up to 700W TDP under FP8 Transformer Engine load. Peak thermal flux localized at center compute cores.',
      color: '#FF3B30',
      offsetMultiplier: 1.8,
    },
    {
      id: 'l6',
      title: '6. SXM5 Substrate PCB Carrier',
      subtitle: 'Multi-Layer High-Speed Circuit Board',
      thickness: '5.0 mm',
      material: 'FR4 Multi-layer PCB with Gold Plated BGA',
      functionDesc: 'Power delivery planes delivering over 800 Amps to core logic via 1000+ pin high-density mezzanine socket.',
      color: '#10B981',
      offsetMultiplier: 2.8,
    },
  ];

  return (
    <section id="exploded" className="relative py-20 bg-slate-950 overflow-hidden border-t border-[#DCE4EE] dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="cyan" size="md" className="mb-3">
            06 // 3D LAYER ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0B1220] dark:text-white tracking-tight">
            EXPLODED{' '}
            <span className="bg-gradient-to-r from-blue-600 dark:from-dtc-cyan via-amber-500 to-red-600 bg-clip-text text-transparent">
              ASSEMBLY VIEW.
            </span>
          </h2>
          <p className="mt-4 text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            Scrub the slider below to separate the physical assembly layers and explore how the cold plate integrates directly onto the NVIDIA H100 SXM5 accelerator die.
          </p>
        </div>

        {/* Interactive Scrub Bar */}
        <div className="max-w-xl mx-auto mb-12 p-4 glass-panel rounded-2xl border border-[#DCE4EE] dark:border-slate-800 flex items-center gap-4">
          <span className="font-mono text-xs text-[#526174] dark:text-slate-400 uppercase font-semibold flex items-center gap-1.5 shrink-0">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-dtc-cyan" /> Assembled
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={explosionAmount}
            onChange={(e) => setExplosionAmount(Number(e.target.value))}
            className="w-full"
            aria-label="Exploded view separation slider"
          />

          <span className="font-mono text-xs text-blue-600 dark:text-dtc-cyan uppercase font-bold flex items-center gap-1.5 shrink-0">
            {explosionAmount}% Exploded
          </span>
        </div>

        {/* 3D Isometric Stack Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Visual Stack Graphic */}
          <div className="lg:col-span-6 relative glass-panel p-6 sm:p-10 rounded-3xl border border-[#DCE4EE] dark:border-slate-800 flex flex-col items-center justify-center min-h-[460px] select-none">
            <div className="relative w-full max-w-md h-[380px] flex items-center justify-center">
              {layers.map((layer, idx) => {
                const yOffset = (explosionAmount / 100) * 110 * layer.offsetMultiplier;
                const scale = 1 - Math.abs(layer.offsetMultiplier) * 0.03 * (explosionAmount / 100);

                return (
                  <motion.div
                    key={layer.id}
                    animate={{
                      y: yOffset,
                      scale: scale,
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                    className="absolute w-[280px] sm:w-[340px] h-[52px] rounded-xl border flex items-center justify-between px-4 shadow-xl backdrop-blur-md cursor-pointer group hover:border-blue-500 dark:hover:border-white transition-colors"
                    style={{
                      backgroundColor: isDark ? `${layer.color}18` : `${layer.color}25`,
                      borderColor: `${layer.color}80`,
                      boxShadow: isDark
                        ? `0 ${10 + idx * 5}px 25px -5px rgba(0,0,0,0.8), 0 0 15px ${layer.color}30`
                        : `0 ${6 + idx * 3}px 18px -4px rgba(11,18,32,0.1), 0 0 10px ${layer.color}20`,
                      zIndex: 10 - idx,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="font-mono text-xs font-bold text-[#0B1220] dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-white">
                        {layer.title.split('. ')[1]}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#526174] dark:text-slate-400 font-semibold">
                      {layer.thickness}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 text-center font-mono text-xs text-[#526174] dark:text-slate-400">
              Direct-to-Chip Contact Height: <strong className="text-blue-600 dark:text-dtc-cyan">14.2 mm Total</strong>
            </div>
          </div>

          {/* Layer Detail Cards Column */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className="p-4 rounded-xl glass-panel border border-[#DCE4EE] dark:border-slate-800/80 hover:border-blue-500/40 dark:hover:border-slate-700 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-sm font-bold text-[#0B1220] dark:text-slate-100 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    />
                    {layer.title}
                  </h4>
                  <span className="font-mono text-[10px] text-blue-700 dark:text-dtc-cyan bg-blue-50 dark:bg-dtc-cyan/10 px-2 py-0.5 rounded border border-blue-200 dark:border-dtc-cyan/20 font-semibold">
                    {layer.thickness}
                  </span>
                </div>

                <div className="text-xs font-mono text-amber-700 dark:text-dtc-warm">
                  {layer.material}
                </div>

                <p className="text-xs text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
                  {layer.functionDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
