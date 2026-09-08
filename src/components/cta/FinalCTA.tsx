import React from 'react';
import { ArrowUp, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const FinalCTA: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 bg-[#F5F8FC] dark:bg-gradient-to-b dark:from-dtc-bg dark:via-slate-950 dark:to-dtc-bg overflow-hidden border-t border-[#DCE4EE] dark:border-slate-900 transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/8 dark:bg-dtc-cyan/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <Badge variant="cyan" size="md" pulse>
          CONCLUSION & FUTURE VISION
        </Badge>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#0B1220] dark:text-white tracking-tight leading-[1.1]">
          THE FUTURE OF COMPUTE NEEDS A{' '}
          <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-red-600 dark:from-dtc-cyan dark:via-amber-400 dark:to-dtc-hot bg-clip-text text-transparent">
            BETTER WAY TO COOL.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#526174] dark:text-slate-300 font-sans leading-relaxed">
          Exploring how Direct-to-Chip liquid cooling and the Heterogeneous Area-Specific Cold Plate (H-ASP) architecture solve the thermal density crisis for next-generation 700W+ AI accelerators.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            icon={ChevronRight}
            onClick={() => scrollTo('solution')}
          >
            Review H-ASP Architecture
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={Sparkles}
            onClick={() => scrollTo('virtual-lab')}
          >
            Launch Engineering Sandbox
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={ArrowUp}
            onClick={scrollToTop}
          >
            Back to Top
          </Button>
        </div>
      </div>
    </section>
  );
};
