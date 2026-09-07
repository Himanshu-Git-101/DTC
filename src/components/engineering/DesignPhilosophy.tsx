import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Droplets, Shield, Gauge, Wrench, Box } from 'lucide-react';
import { Badge } from '../common/Badge';

export const DesignPhilosophy: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const philosophies = [
    {
      title: '1. Area-Specific Flow Uniformity',
      tagline: 'Coolant where heat lives, not where space is',
      detail: 'Uniform cold plates waste up to 60% of their mass flow cooling low-flux I/O and memory banks while starving the 218 W/cm² compute die. H-ASP enforces proportional flux-matching.',
      icon: Droplets,
      color: 'text-dtc-cyan',
    },
    {
      title: '2. Pressure Drop Optimization',
      tagline: 'Mitigating Darcy-Weisbach friction losses',
      detail: 'Ultra-dense microchannels create high viscous drag. By confining 150µm channels strictly to Zone A and widening peripheral passages to 800µm, overall pressure drop drops by 40%.',
      icon: Gauge,
      color: 'text-amber-400',
    },
    {
      title: '3. Additive Manufacturability (SLM Cu)',
      tagline: 'Co-designing for selective laser powder printing',
      detail: 'Designed with 45° overhang self-supporting manifold roofs and 120µm minimum wall thicknesses, enabling pure copper metal 3D printing without internal support removal issues.',
      icon: Wrench,
      color: 'text-emerald-400',
    },
    {
      title: '4. Zero-Tolerance Seal Reliability',
      tagline: 'Pressurized liquid millimeters from 700W silicon',
      detail: 'Features laser-welded copper top covers, dual EPDM compression seals, and negative-pressure loop compatibility to ensure 100% leak-proof server operation across 50,000+ power cycles.',
      icon: Shield,
      color: 'text-purple-400',
    },
    {
      title: '5. Sub-15mm Server Packaging',
      tagline: 'Drop-in compatibility with standard 1U/2U blades',
      detail: 'Low vertical profile with integrated 90° blind-mate quick disconnects fits standard Open Compute Project (OCP) GPU tray envelopes with zero chassis redesign.',
      icon: Box,
      color: 'text-rose-400',
    },
  ];

  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <Badge variant="cyan" size="md" className="mb-3">
            11 // DESIGN PHILOSOPHY
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            DESIGNING FOR{' '}
            <span className="text-dtc-cyan">EXTREME HEAT.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            Cold plate architecture is not simply about routing liquid near a chip. It requires balancing fluid dynamics, micro-additive manufacturing, structural mechanics, and zero-defect reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {philosophies.map((item, idx) => {
            const Icon = item.icon;
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={item.title}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={`p-6 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'border-dtc-cyan shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-slate-900/90'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  <h3 className="font-mono text-sm font-bold text-slate-100 mb-1">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[11px] text-dtc-cyan block mb-3">
                    {item.tagline}
                  </span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-slate-300 font-sans leading-relaxed pt-3 border-t border-slate-800/80"
                    >
                      {item.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
