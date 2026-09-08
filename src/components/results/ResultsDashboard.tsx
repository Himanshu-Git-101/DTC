import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingDown, Layers, Table } from 'lucide-react';
import { Badge } from '../common/Badge';
import { InteractiveChart } from './InteractiveChart';
import { FormulaCard } from './FormulaCard';
import { ANALYTICAL_METRICS } from '../../data/projectData';
import { COMPARISON_TABLE } from '../../data/resultsData';

export const ResultsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'benchmarks' | 'table' | 'equations'>('benchmarks');

  return (
    <section id="results" className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="cyan" size="md" className="mb-3">
            09 // ANALYTICAL & SIMULATION VALIDATION
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0B1220] dark:text-white tracking-tight">
            VALIDATING THE{' '}
            <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-green-600 dark:from-dtc-cyan dark:via-emerald-400 dark:to-dtc-green bg-clip-text text-transparent">
              H-ASP ARCHITECTURE.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526174] dark:text-slate-400 font-sans leading-relaxed">
            Analytical modeling and thermofluidic calculations prove that matching coolant mass flow directly to localized heat flux reduces peak silicon hotspot temperatures while cutting hydraulic pumping losses.
          </p>
        </div>

        {/* 5 Real Metric Delta Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {ANALYTICAL_METRICS.map((item, idx) => (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-dtc-cyan/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  {item.metric}
                </span>
                <div className="font-mono text-xl font-bold text-white">
                  {item.haspValue} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                </div>
                <div className="text-xs font-mono text-dtc-green font-semibold mt-1 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{item.improvement}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
                <span>Baseline: </span>
                <span className="text-slate-400 line-through">{item.monolithicValue} {item.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'benchmarks'
                ? 'bg-dtc-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Interactive Benchmark Charts</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'table'
                ? 'bg-dtc-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Comparison Matrix Table</span>
          </button>

          <button
            onClick={() => setActiveTab('equations')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'equations'
                ? 'bg-dtc-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Governing Math Equations</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'benchmarks' && <InteractiveChart />}

        {activeTab === 'table' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 overflow-x-auto">
            <h4 className="font-mono text-base font-bold text-slate-100 mb-4">
              ARCHITECTURAL COMPARISON: CONVENTIONAL VS MONOLITHIC DTC VS H-ASP DTC
            </h4>
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Evaluation Factor</th>
                  <th className="py-3 px-4">Conventional Air Cooling</th>
                  <th className="py-3 px-4">Monolithic Liquid Cold Plate</th>
                  <th className="py-3 px-4 text-dtc-cyan font-bold">H-ASP DTC Innovation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.highlight ? 'bg-dtc-cyan/5' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-200">{row.factor}</td>
                    <td className="py-3.5 px-4 text-slate-400">{row.conventional}</td>
                    <td className="py-3.5 px-4 text-slate-300">{row.monolithicDtc}</td>
                    <td className="py-3.5 px-4 font-bold text-dtc-cyan">{row.haspDtc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'equations' && <FormulaCard />}
      </div>
    </section>
  );
};
