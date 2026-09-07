import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Cpu, Atom, Shield, CloudLightning, Monitor, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { APPLICATIONS_DATA } from '../../data/applicationsData';

export const ApplicationsGrid: React.FC = () => {
  const [expandedAppId, setExpandedAppId] = useState<string | null>('ai-datacenters');

  const iconMap: Record<string, React.ElementType> = {
    Server,
    Cpu,
    Atom,
    Shield,
    CloudLightning,
    Monitor,
  };

  return (
    <section id="applications" className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            13 // REAL-WORLD DEPLOYMENT SECTORS
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            WHERE DTC SCALES{' '}
            <span className="text-dtc-cyan">NEXT-GEN COMPUTE.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            From 100kW+ hyperscale AI data centers training frontier models to sealed IP67 autonomous robotics, Direct-to-Chip cooling unlocks new thermal frontiers.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLICATIONS_DATA.map((app) => {
            const Icon = iconMap[app.icon] || Server;
            const isExpanded = expandedAppId === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'border-dtc-cyan shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-slate-900/90'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-dtc-cyan">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-dtc-warm bg-dtc-warm/10 border border-dtc-warm/20 px-2.5 py-1 rounded-full uppercase">
                      {app.powerDensity}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-100 mb-1">
                    {app.title}
                  </h3>
                  <span className="font-mono text-xs text-slate-500 block mb-3 uppercase tracking-wider">
                    {app.category}
                  </span>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                    {app.description}
                  </p>
                </div>

                <div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-dtc-cyan">
                    <span className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-dtc-green" />
                      {app.keyBenefit}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-3 mt-3 border-t border-slate-800/60"
                      >
                        <span className="font-mono text-[10px] text-dtc-cyan uppercase font-bold block mb-1">
                          Why Direct-to-Chip (DTC)?
                        </span>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                          {app.whyDtc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
