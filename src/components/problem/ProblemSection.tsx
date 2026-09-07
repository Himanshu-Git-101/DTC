import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, AlertOctagon, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Badge } from '../common/Badge';
import { HeatSimulator } from './HeatSimulator';

export const ProblemSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number>(0);

  const problemCards = [
    {
      id: 1,
      number: 'CARD 01',
      title: 'Increasing Compute Density',
      tagline: '700W+ per Silicon Package',
      description:
        'Modern AI accelerators like the NVIDIA H100 SXM5 deliver unprecedented FP8 tensor performance. Scaling transistors down to 4nm while pushing clock speeds to 1.8GHz elevates accelerator package power to 700W–780W.',
      stat: '700W – 780W TDP',
      statLabel: 'Accelerator Power Draw',
      icon: TrendingUp,
      color: 'text-dtc-cyan',
      borderColor: 'hover:border-dtc-cyan/50',
    },
    {
      id: 2,
      number: 'CARD 02',
      title: 'Extreme Heat Flux Non-Uniformity',
      tagline: '20× Spatial Variation Across Die',
      description:
        'Power is not dissipated evenly. The 2.2 cm² compute core generates ~480W (~218 W/cm²), while memory modules and I/O dissipate only 11–23 W/cm². Uniform cold plates starve the compute core while wasting fluid on cold zones.',
      stat: '~218 W/cm²',
      statLabel: 'Compute Core Flux Density',
      icon: Flame,
      color: 'text-dtc-hot',
      borderColor: 'hover:border-dtc-hot/50',
    },
    {
      id: 3,
      number: 'CARD 03',
      title: 'The Silicon Thermal Bottleneck',
      tagline: 'Throttling, Failure & PUE Spikes',
      description:
        'When heat cannot escape efficiently across the thermal interface, junction temperatures surge above 85°C. Silicon automatically throttles frequencies by 15–30%, degrading cluster training throughput and escalating data center cooling costs.',
      stat: '15% – 30%',
      statLabel: 'Compute Lost to Throttling',
      icon: AlertOctagon,
      color: 'text-dtc-warm',
      borderColor: 'hover:border-dtc-warm/50',
    },
  ];

  return (
    <section id="problem" className="relative py-20 bg-dtc-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="hot" size="md" className="mb-3">
            01 // THE THERMAL CHALLENGE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            AI PERFORMANCE IS CONSTRAINED BY{' '}
            <span className="text-dtc-hot">HEAT DENSITY.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            As deep learning models scale into trillions of parameters, accelerators hit a thermal barrier. Traditional air and monolithic liquid cooling treat chips as uniform heat sources, leading to localized silicon starvation.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problemCards.map((card, idx) => {
            const Icon = card.icon;
            const isSelected = selectedCard === idx;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedCard(idx)}
                className={`glass-panel p-6 rounded-2xl cursor-pointer transition-all duration-300 relative border ${
                  isSelected
                    ? 'border-dtc-cyan bg-slate-900/90 shadow-[0_0_30px_rgba(0,240,255,0.15)] scale-[1.02]'
                    : `border-slate-800/80 ${card.borderColor} hover:bg-slate-900/60`
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-slate-500 tracking-wider">
                    {card.number}
                  </span>
                  <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-slate-100 mb-1">
                  {card.title}
                </h3>
                <span className="font-mono text-xs font-semibold text-slate-400 block mb-3">
                  {card.tagline}
                </span>

                <p className="text-sm text-slate-400 leading-relaxed font-sans mb-6">
                  {card.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-mono font-bold text-slate-100 block">
                      {card.stat}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {card.statLabel}
                    </span>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 ${isSelected ? 'text-dtc-cyan' : 'text-slate-600'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Heat Simulator Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HeatSimulator />
        </motion.div>
      </div>
    </section>
  );
};
