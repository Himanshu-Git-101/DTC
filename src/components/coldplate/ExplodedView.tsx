import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ExplodedView: React.FC = () => {
  const [explosionAmount, setExplosionAmount] = useState<number>(65); // 0 (assembled) to 100 (fully exploded)

  const layers = [
    {
      id: 'manifold-top',
      title: '1. Manifold Enclosure & Fluid Header',
      material: 'Laser-Welded Pure Copper / AlSi10Mg Cover',
      thickness: '4.5 mm',
      conductivity: 'k = 398 W/m·K',
      description: 'Hermetically sealed upper distribution manifold containing inlet/outlet flow restrictors and plenum baffles that enforce the 70-20-10 passive hydraulic split.',
      color: '#00F0FF',
      offsetMultiplier: -1.6,
    },
    {
      id: 'microchannels',
      title: '2. Heterogeneous Microchannel Array',
      material: 'Selective Laser Melted (SLM) Cu-ETP',
      thickness: '1.8 mm Fin Height',
      conductivity: 'k = 390 W/m·K',
      description: '3D printed copper baseplate featuring 120µm wide microchannels in Zone A (Compute), 300µm in Zone B (HBM), and 600µm in Zone C (IO/PDN).',
      color: '#B87333',
      offsetMultiplier: -0.7,
    },
    {
      id: 'tim',
      title: '3. Micro-Thin Indium TIM Layer',
      material: 'Indium-Silver Liquid Metal Matrix',
      thickness: '25 µm Bondline',
      conductivity: 'k = 86 W/m·K',
      description: 'High-conductivity compliant thermal interface material minimizing microscopic interfacial void resistance between silicon die and copper baseplate.',
      color: '#94A3B8',
      offsetMultiplier: 0.1,
    },
    {
      id: 'silicon-die',
      title: '4. NVIDIA H100 SXM5 Silicon Package',
      material: '4N TSMC Silicon (GH100) + 6x HBM3 Stacks',
      thickness: '775 µm Silicon Die',
      conductivity: 'k = 148 W/m·K',
      description: 'Active 700W+ AI accelerator producing ~218 W/cm² localized heat flux at the primary compute die and ~23 W/cm² across 80GB HBM3 memory stacks.',
      color: '#FF3B30',
      offsetMultiplier: 0.9,
    },
    {
      id: 'substrate-socket',
      title: '5. High-Density SXM5 Carrier Substrate',
      material: 'Multi-Layer Organic (MLO) Substrate + NVLink4',
      thickness: '2.2 mm Substrate',
      conductivity: 'High-Density BGA Interconnect',
      description: 'High-speed substrate carrier delivering 1000A+ power delivery and 900 GB/s NVLink-4 interconnect to adjacent server cluster GPUs.',
      color: '#10B981',
      offsetMultiplier: 1.7,
    },
  ];

  return (
    <section id="exploded" className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="cyan" size="md" className="mb-3">
            06 // 3D LAYER ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            EXPLODED{' '}
            <span className="bg-gradient-to-r from-dtc-cyan via-amber-400 to-dtc-hot bg-clip-text text-transparent">
              ASSEMBLY VIEW.
            </span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            Scrub the slider below to separate the physical assembly layers and explore how the cold plate integrates directly onto the NVIDIA H100 SXM5 accelerator die.
          </p>
        </div>

        {/* Interactive Scrub Bar */}
        <div className="max-w-xl mx-auto mb-12 p-4 glass-panel rounded-2xl border border-slate-800 flex items-center gap-4">
          <span className="font-mono text-xs text-slate-400 uppercase font-semibold flex items-center gap-1.5 shrink-0">
            <Sliders className="w-4 h-4 text-dtc-cyan" /> Assembled
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

          <span className="font-mono text-xs text-dtc-cyan uppercase font-bold flex items-center gap-1.5 shrink-0">
            {explosionAmount}% Exploded
          </span>
        </div>

        {/* 3D Isometric Stack Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Visual Stack Graphic */}
          <div className="lg:col-span-6 relative glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 flex flex-col items-center justify-center min-h-[460px] select-none">
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
                    className="absolute w-[280px] sm:w-[340px] h-[52px] rounded-xl border flex items-center justify-between px-4 shadow-xl backdrop-blur-md cursor-pointer group hover:border-white transition-colors"
                    style={{
                      backgroundColor: `${layer.color}18`,
                      borderColor: `${layer.color}80`,
                      boxShadow: `0 ${10 + idx * 5}px 25px -5px rgba(0,0,0,0.8), 0 0 15px ${layer.color}30`,
                      zIndex: 10 - idx,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="font-mono text-xs font-bold text-slate-100 group-hover:text-white">
                        {layer.title.split('. ')[1]}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-slate-400">
                      {layer.thickness}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 text-center font-mono text-xs text-slate-400">
              Direct-to-Chip Contact Height: <strong className="text-dtc-cyan">14.2 mm Total</strong>
            </div>
          </div>

          {/* Layer Detail Cards Column */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className="p-4 rounded-xl glass-panel border border-slate-800/80 hover:border-slate-700 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-sm font-bold text-slate-100 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    />
                    {layer.title}
                  </h4>
                  <span className="font-mono text-[10px] text-dtc-cyan bg-dtc-cyan/10 px-2 py-0.5 rounded border border-dtc-cyan/20">
                    {layer.conductivity}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {layer.description}
                </p>
                <div className="flex justify-between font-mono text-[10px] text-slate-400 pt-1">
                  <span>Material: {layer.material}</span>
                  <span>Thickness: {layer.thickness}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
