import React from 'react';
import { GraduationCap, Building2, Mail } from 'lucide-react';
import { Badge } from '../common/Badge';
import { TEAM_MEMBERS, PROJECT_INFO } from '../../data/projectData';

export const TeamSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" size="md" className="mb-3">
            17 // ACADEMIC RESEARCH & CREDITS
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            ENGINEERING RESEARCH{' '}
            <span className="text-dtc-cyan">TEAM.</span>
          </h2>
          <p className="mt-4 text-slate-400 font-sans leading-relaxed">
            Conducted at <strong className="text-slate-200">Woxsen University</strong> under academic faculty supervision by <strong className="text-dtc-cyan">{PROJECT_INFO.supervisor}</strong>.
          </p>
        </div>

        {/* Supervisor Card */}
        <div className="max-w-4xl mx-auto mb-10 p-6 sm:p-8 rounded-3xl glass-panel border border-dtc-cyan/40 relative hud-corner shadow-[0_0_40px_rgba(0,240,255,0.1)]">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-dtc-cyan/15 border border-dtc-cyan/40 flex items-center justify-center text-dtc-cyan shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-xs text-dtc-cyan uppercase tracking-wider font-bold">
                  Faculty Supervisor & Advisor
                </span>
                <span className="font-mono text-xs text-slate-500">• Woxsen University</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white">
                {PROJECT_INFO.supervisor}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Supervised research methodology, thermodynamic modeling verification, and additive manufacturing evaluation for next-generation direct-to-chip AI accelerator cooling architectures.
              </p>
            </div>
          </div>
        </div>

        {/* Student Researchers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="p-5 rounded-2xl glass-panel border border-slate-800/80 hover:border-dtc-cyan/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-dtc-cyan">
                    {member.name.charAt(0)}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase">
                    Researcher
                  </span>
                </div>

                <h4 className="font-display font-bold text-base text-white mb-1">
                  {member.name}
                </h4>

                <span className="font-mono text-xs text-dtc-cyan block mb-2 font-semibold">
                  {member.role}
                </span>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {member.contribution}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-500">
                {member.institution}
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Contact Bar */}
        <div className="mt-10 max-w-2xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center font-mono text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-dtc-cyan" />
            <a href={`mailto:${PROJECT_INFO.contactEmail}`} className="hover:text-dtc-cyan transition-colors">
              {PROJECT_INFO.contactEmail}
            </a>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>School of Technology, Woxsen University</span>
          </div>
        </div>
      </div>
    </section>
  );
};
