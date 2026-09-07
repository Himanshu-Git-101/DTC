import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Layers, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { HeroCanvas } from './HeroCanvas';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Decorative Gradients & Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-dtc-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-dtc-hot/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Badge variant="cyan" pulse size="md">
            Woxsen University Engineering Research
          </Badge>
          <Badge variant="warm" size="md">
            Target: NVIDIA H100 SXM5 (700W – 780W)
          </Badge>
          <Badge variant="green" size="md">
            H-ASP 70-20-10 Passive Flow Split
          </Badge>
        </motion.div>

        {/* Hero Title & Subheadline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
              COOLING THE{' '}
              <span className="bg-gradient-to-r from-dtc-cyan via-blue-400 to-dtc-hot bg-clip-text text-transparent">
                NEXT GENERATION
              </span>{' '}
              OF AI.
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-300 font-display">
              A Direct-to-Chip Liquid Cooling Architecture for High-Density AI Accelerators.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans max-w-2xl">
              As AI accelerators exceed 700W, traditional uniform cold plates starve the high-flux compute core (~218 W/cm²). Our <strong className="text-slate-200">Heterogeneous Area-Specific Cold Plate (H-ASP)</strong> introduces a co-designed passive manifold enforcing a <strong className="text-dtc-cyan">70-20-10 flow split</strong>, lowering thermal resistance by <strong className="text-dtc-green">20–30%</strong> while slashing pumping power.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={ChevronRight}
                onClick={() => scrollTo('solution')}
              >
                Explore H-ASP Solution
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Layers}
                onClick={() => scrollTo('exploded')}
              >
                View 3D Exploded View
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={Sparkles}
                onClick={() => scrollTo('virtual-lab')}
              >
                Interactive Lab
              </Button>
            </div>

            {/* Quick Live Telemetry Strip */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              <div className="glass-panel p-3 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  Thermal Resistance (R_th)
                </span>
                <span className="text-lg sm:text-xl font-mono font-bold text-dtc-cyan">
                  0.053 <span className="text-xs font-normal text-slate-400">K/W</span>
                </span>
                <span className="text-[10px] text-dtc-green block mt-0.5">▼ 20-30% vs Monolithic</span>
              </div>

              <div className="glass-panel p-3 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  Hotspot Reduction
                </span>
                <span className="text-lg sm:text-xl font-mono font-bold text-dtc-hot">
                  -5°C to -10°C
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">27-30°C Above Coolant</span>
              </div>

              <div className="glass-panel p-3 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  Pumping Power
                </span>
                <span className="text-lg sm:text-xl font-mono font-bold text-dtc-warm">
                  -25% to -40%
                </span>
                <span className="text-[10px] text-dtc-green block mt-0.5">0.60x - 0.75x Baseline</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Simulation Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <HeroCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
