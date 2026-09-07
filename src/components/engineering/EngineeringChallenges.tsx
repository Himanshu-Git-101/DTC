import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Gauge, Printer, ShieldAlert, Minimize2, Zap, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ENGINEERING_CHALLENGES } from '../../data/resultsData';

export const EngineeringChallenges: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<number>(0);

  const iconMap: Record<string, React.ElementType> = {
    Flame,
    Gauge,
    Printer,
    ShieldAlert,
    Minimize2,
    Zap,
  };

  return (
    <section className="relative py-20 bg-dtc-bg overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="hot" size="md" className="mb-3">
            12 // THE HARD PART
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            ENGINEERING THE{' '}
            <span className="text-dtc-hot">HARDEST CONSTRAINTS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            Direct-to-Chip liquid cooling is notoriously difficult to engineer. Here is how our architecture solves the 6 toughest thermo-mechanical hurdles.
          </p>
        </div>

        {/* 6 Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGINEERING_CHALLENGES.map((ch, idx) => {
            const Icon = iconMap[ch.icon] || Flame;
            const isSelected = selectedChallenge === idx;
            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setSelectedChallenge(idx)}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-dtc-cyan shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-slate-900/90'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${ch.color}20`,
                        color: ch.color,
                        border: `1px solid ${ch.color}50`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      CHALLENGE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-100 mb-1">
                    {ch.title}
                  </h3>
                  <span className="font-mono text-xs text-slate-400 block mb-3 font-semibold">
                    {ch.tagline}
                  </span>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400">
                      <strong className="text-dtc-hot font-mono block mb-1">✖ The Problem:</strong>
                      {ch.problem}
                    </div>

                    <div className="p-3 rounded-xl bg-dtc-cyan/5 border border-dtc-cyan/20 text-slate-300">
                      <strong className="text-dtc-cyan font-mono block mb-1">✔ Our Solution:</strong>
                      {ch.solution}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>H-ASP Co-Design Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-dtc-green" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
