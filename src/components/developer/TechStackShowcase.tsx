import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Sparkles, Cpu, Calculator, Layers, Laptop } from 'lucide-react';
import { Badge } from '../common/Badge';
import { WEB_TECH_STACK } from '../../data/projectData';

export const TechStackShowcase: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Palette,
    Sparkles,
    Cpu,
    Calculator,
    Layers,
  };

  return (
    <section id="tech-stack" className="relative py-20 bg-dtc-bg overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            16 // WEB DEVELOPMENT INTERNSHIP PORTFOLIO SHOWCASE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0B1220] dark:text-white tracking-tight">
            BUILT WITH MODERN{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-dtc-cyan dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              WEB TECHNOLOGIES.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            This interactive engineering case-study website is built from the ground up to demonstrate advanced frontend engineering, 60fps real-time physics simulation, and state-of-the-art UI/UX design.
          </p>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEB_TECH_STACK.map((tech, idx) => {
            const Icon = iconMap[tech.icon] || Code2;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-dtc-cyan/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-dtc-cyan group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-dtc-cyan transition-colors">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-dtc-cyan block uppercase mb-0.5">
                    Portfolio Role:
                  </span>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {tech.roleInProject}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlights summary banner */}
        <div className="mt-10 p-6 rounded-3xl glass-panel border border-dtc-cyan/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-dtc-cyan/15 text-dtc-cyan border border-dtc-cyan/30 shrink-0">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white">
                Frontend Architecture Highlights
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Zero external UI kits • Client-side Navier-Stokes analytical simulator • 100% responsive fluid design • Strict TypeScript types
              </p>
            </div>
          </div>

          <Badge variant="green" size="md" className="shrink-0">
            Internship Portfolio Ready
          </Badge>
        </div>
      </div>
    </section>
  );
};
