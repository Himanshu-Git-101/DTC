import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Droplets, RefreshCw, Cpu, ArrowRight, Zap } from 'lucide-react';
import { Badge } from '../common/Badge';

export const SystemArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('cold-plate');

  const nodes = [
    {
      id: 'ai-chip',
      title: '1. AI Accelerator Die',
      tagline: '700W+ Heat Generation',
      detail: 'NVIDIA H100 SXM5 GPU executing matrix tensor operations with peak heat flux of 218 W/cm².',
      icon: Cpu,
      color: '#FF3B30',
    },
    {
      id: 'cold-plate',
      title: '2. H-ASP Cold Plate',
      tagline: '70-20-10 Passive Manifold',
      detail: '3D printed copper cold plate absorbing flux directly above silicon with area-specific microchannels.',
      icon: Droplets,
      color: '#00F0FF',
    },
    {
      id: 'blade-manifold',
      title: '3. Server Blade Quick-Disconnects',
      tagline: 'Blind-Mate Dripless Couplings',
      detail: 'Interconnects 8x H100 cold plates inside 2U chassis with negative-pressure leak protection.',
      icon: Server,
      color: '#3B82F6',
    },
    {
      id: 'rack-cdu',
      title: '4. Rack Coolant Distribution Unit (CDU)',
      tagline: 'Secondary Closed Loop',
      detail: 'Houses redundant variable-speed pumps, deionization filters, and plate heat exchangers.',
      icon: RefreshCw,
      color: '#10B981',
    },
    {
      id: 'facility-loop',
      title: '5. Facility Water & Dry Coolers',
      tagline: 'PUE 1.15 / 1.07 Heat Rejection',
      detail: 'Rejects thermal energy to outside ambient air without energy-intensive mechanical chillers.',
      icon: Zap,
      color: '#8B5CF6',
    },
  ];

  return (
    <section id="architecture" className="relative py-20 bg-dtc-bg border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            07 // COMPLETE HYDRAULIC INFRASTRUCTURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            DATA CENTER SYSTEM{' '}
            <span className="text-dtc-cyan">ARCHITECTURE.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            From the sub-millimeter microchannels sitting on the GPU die to the multi-megawatt rack Coolant Distribution Unit (CDU), explore the complete Direct-to-Chip thermal loop.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;
              return (
                <div key={node.id} className="relative flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode(node.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between min-h-[160px] ${
                      isSelected
                        ? 'bg-slate-900 border-dtc-cyan shadow-[0_0_30px_rgba(0,240,255,0.2)] scale-[1.02]'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${node.color}20`,
                          color: node.color,
                          border: `1px solid ${node.color}40`,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-mono text-xs font-bold text-slate-100 mb-1">
                        {node.title}
                      </h4>
                      <span className="font-mono text-[10px] text-dtc-cyan block">
                        {node.tagline}
                      </span>
                    </div>

                    <span className="font-mono text-[9px] text-slate-500 uppercase mt-3 block">
                      Click to inspect details
                    </span>
                  </button>

                  {idx < nodes.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-dtc-cyan">
                      <ArrowRight className="w-4 h-4 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Node Inspector Detail Banner */}
          {selectedNode && (
            <motion.div
              key={selectedNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-5 rounded-2xl bg-slate-900/90 border border-dtc-cyan/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs text-dtc-cyan uppercase font-bold tracking-wider">
                  Loop Component Selected: {nodes.find((n) => n.id === selectedNode)?.title}
                </span>
                <p className="font-sans text-sm text-slate-300">
                  {nodes.find((n) => n.id === selectedNode)?.detail}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Badge variant="green" size="md">
                  PUE Impact: 1.15 Baseline
                </Badge>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
