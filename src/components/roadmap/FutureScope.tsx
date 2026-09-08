import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../common/Badge';
import { FUTURE_SCOPE_ROADMAP } from '../../data/applicationsData';

export const FutureScope: React.FC = () => {
  return (
    <section id="roadmap" className="relative py-20 bg-dtc-bg overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            14 // RESEARCH ROADMAP
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0B1220] dark:text-white tracking-tight">
            WHERE THIS CAN{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 dark:from-dtc-cyan dark:via-purple-400 dark:to-dtc-hot bg-clip-text text-transparent">
              GO NEXT.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            From single-phase copper microchannels to two-phase dielectric vaporization and silicon-integrated in-die microchannels, explore our long-term research horizon.
          </p>
        </div>

        {/* Futuristic Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUTURE_SCOPE_ROADMAP.map((item, idx) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-dtc-cyan/40 transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    {item.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                  {item.phase}
                </span>

                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                <span>Status:</span>
                <span className="font-bold text-slate-200">{item.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
