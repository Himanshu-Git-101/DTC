import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Target, Layers, Droplets, Building2 } from 'lucide-react';

export const ProjectSnapshot: React.FC = () => {
  const stats = [
    {
      label: 'PROJECT',
      value: 'Direct-to-Chip Liquid Cooling',
      detail: 'Next-Gen Co-Design Thermal Architecture',
      icon: Droplets,
      color: 'text-dtc-cyan',
    },
    {
      label: 'TARGET HARDWARE',
      value: 'NVIDIA H100 SXM5',
      detail: '700W – 780W TDP | 80GB HBM3',
      icon: Cpu,
      color: 'text-dtc-green',
    },
    {
      label: 'CORE INNOVATION',
      value: 'H-ASP Architecture',
      detail: 'Heterogeneous Area-Specific Cold Plate',
      icon: Layers,
      color: 'text-dtc-warm',
    },
    {
      label: 'FLOW DISPATCH',
      value: '70% / 20% / 10%',
      detail: 'Passive Manifold Allocation (Core/HBM/IO)',
      icon: Target,
      color: 'text-dtc-cyan',
    },
    {
      label: 'RESEARCH INSTITUTION',
      value: 'Woxsen University',
      detail: 'Supervised by Dr. Praneeth N',
      icon: Building2,
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="relative py-8 border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-panel p-4 rounded-xl border border-slate-800/80 hover:border-dtc-cyan/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="font-mono font-bold text-sm sm:text-base text-slate-100 group-hover:text-dtc-cyan transition-colors">
                  {stat.value}
                </div>
                <p className="font-mono text-[11px] text-slate-400 mt-1 leading-tight">
                  {stat.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
