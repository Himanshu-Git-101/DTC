import React from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, PenTool, GitBranch, Activity, Printer, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProjectJourney: React.FC = () => {
  const journeySteps = [
    {
      stage: 'STAGE 01',
      title: 'Problem Identification',
      detail: 'Analyzed NVIDIA H100 SXM5 700W thermal dissipation. Discovered that 20× spatial heat flux non-uniformity (~218 W/cm² on core vs 11–23 W/cm² on periphery) causes severe silicon throttling under uniform monolithic cooling.',
      icon: Search,
      color: '#FF3B30',
    },
    {
      stage: 'STAGE 02',
      title: 'Thermal & Fluid Mechanics Research',
      detail: 'Investigated microchannel convective heat transfer regimes ($Re \\approx 850\\text{--}1400$), laminar boundary layer disruption, and Darcy-Weisbach pressure drop trade-offs.',
      icon: Lightbulb,
      color: '#FF9500',
    },
    {
      stage: 'STAGE 03',
      title: 'H-ASP Architecture Formulation',
      detail: 'Formulated the Heterogeneous Area-Specific Cold Plate (H-ASP) hypothesis: passively matching coolant volume to local heat generation via internal hydraulic resistance sizing.',
      icon: GitBranch,
      color: '#00F0FF',
    },
    {
      stage: 'STAGE 04',
      title: 'Parametric CAD & Microchannel Modeling',
      detail: 'Designed 3-zone parametric copper fin arrays: 150µm microchannels for Zone A (Compute Core), 350µm for Zone B (HBM3), and 800µm for Zone C (Power Delivery).',
      icon: PenTool,
      color: '#3B82F6',
    },
    {
      stage: 'STAGE 05',
      title: 'Analytical Modeling & CFD Validation',
      detail: 'Solved governing mass flow and heat conduction equations. Validated 20–30% lower thermal resistance ($0.053\\text{ K/W}$), 5–10°C hotspot drop, and 20–40% lower pressure drop.',
      icon: Activity,
      color: '#10B981',
    },
    {
      stage: 'STAGE 06',
      title: 'Additive Manufacturing & Metal 3D Printing',
      detail: 'Evaluated Selective Laser Melting (SLM) additive manufacturing in pure copper (Cu-ETP) with 120µm wall thicknesses and dual-barrier laser-welded manifold sealing.',
      icon: Printer,
      color: '#8B5CF6',
    },
    {
      stage: 'STAGE 07',
      title: 'Academic Research & Web Portfolio Case Study',
      detail: 'Authored research presentation at Woxsen University under faculty supervision by Dr. Praneeth N, and developed this interactive engineering case study.',
      icon: Award,
      color: '#EC4899',
    },
  ];

  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="md" className="mb-3">
            15 // RESEARCH & DEVELOPMENT MILESTONES
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            THE ENGINEERING{' '}
            <span className="text-dtc-cyan">JOURNEY.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            From initial problem identification at Woxsen University to parametric CAD modeling, analytical validation, and additive manufacturing co-design.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-slate-800" />

          <div className="space-y-8">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.stage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[46%] glass-panel p-6 rounded-3xl border border-slate-800 hover:border-dtc-cyan/40 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                        style={{
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                          border: `1px solid ${step.color}30`,
                        }}
                      >
                        {step.stage}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden md:flex relative z-10 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-700 items-center justify-center text-slate-300 shadow-xl">
                    <Icon className="w-5 h-5 text-dtc-cyan" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block w-[46%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
