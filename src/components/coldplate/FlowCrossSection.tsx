import React, { useEffect, useRef, useState } from 'react';
import { Layers, Thermometer, Wind, Play, Pause } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  channelIndex: number;
}

export const FlowCrossSection: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'normal' | 'thermal' | 'cross-section'>('normal');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 300);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 300;
    };
    window.addEventListener('resize', handleResize);

    // Streamline particles
    const numParticles = 140;
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: 60 + Math.random() * 160,
        vx: 1.5 + Math.random() * 2.5,
        vy: (Math.random() - 0.5) * 0.2,
        channelIndex: Math.floor(Math.random() * 12),
      });
    }

    let frame = 0;

    const render = () => {
      frame += 0.025;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const chW = Math.min(width * 0.9, 640);
      const chH = 200;
      const chX = cx - chW / 2;
      const chY = cy - chH / 2;

      // 1. Draw Cold Plate Cross-Section Channel Housing
      ctx.fillStyle = isDark ? '#060a12' : '#E2E8F0';
      ctx.strokeStyle = isDark ? '#1e293b' : '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(chX, chY, chW, chH, 12);
      ctx.fill();
      ctx.stroke();

      // Top and Bottom Copper Walls (Cross-Section Cut)
      ctx.fillStyle = '#b87333';
      ctx.fillRect(chX, chY, chW, 16); // Top copper lid cut
      ctx.fillRect(chX, chY + chH - 24, chW, 24); // Bottom baseplate cut

      // Label Copper Base
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PURE COPPER BASEPLATE (3D PRINTED Cu-ETP)', cx, chY + chH - 8);

      // 2. Microchannel Fins (Zone A center, Zone B left/right, Zone C periphery)
      const coreStartX = cx - chW * 0.22;
      const coreEndX = cx + chW * 0.22;

      if (viewMode === 'cross-section' || viewMode === 'normal') {
        // Zone A: Ultra-dense microchannel fins
        ctx.fillStyle = '#b87333';
        const finW = 3;
        const finSpacing = 8;
        for (let fx = coreStartX; fx < coreEndX; fx += finSpacing) {
          ctx.fillRect(fx, chY + 16, finW, chH - 40);
        }
      }

      // 3. Thermal Heat Flux Arrows from Bottom (GH100 Silicon Die)
      if (viewMode === 'thermal' || viewMode === 'normal') {
        const pulse = 0.8 + Math.sin(frame * 4) * 0.2;
        const grad = ctx.createLinearGradient(cx, chY + chH - 24, cx, chY + 20);
        grad.addColorStop(0, `rgba(255, 59, 48, ${0.8 * pulse})`);
        grad.addColorStop(0.5, `rgba(255, 149, 0, ${0.4 * pulse})`);
        grad.addColorStop(1, 'rgba(0, 240, 255, 0.05)');

        ctx.fillStyle = grad;
        ctx.fillRect(coreStartX, chY + 16, coreEndX - coreStartX, chH - 40);

        // Heat flux text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('HIGH FLUX REGION: 218 W/cm²', cx, chY + chH - 36);
      }

      // 4. Fluid Particle Streamlines
      if (isPlaying) {
        particles.forEach((p) => {
          // Accelerate over Zone A core
          const inCore = p.x >= coreStartX && p.x <= coreEndX;
          const speedFactor = inCore ? 2.8 : 1.4;

          p.x += p.vx * speedFactor;
          p.y += p.vy;

          if (p.x > chX + chW) {
            p.x = chX;
            p.y = chY + 24 + Math.random() * (chH - 56);
          }

          // Compute color depending on X position and View Mode
          const progress = (p.x - chX) / chW;
          let color = '#00F0FF';

          if (viewMode === 'thermal') {
            if (progress < 0.35) color = '#00F0FF'; // Cold inlet
            else if (progress < 0.65) color = '#FF9500'; // Absorbing heat in Zone A
            else color = '#FF3B30'; // Hot discharge
          } else if (viewMode === 'cross-section') {
            color = inCore ? '#00F0FF' : 'rgba(0, 240, 255, 0.4)';
          }

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, inCore ? 2.5 : 2.0, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 5. Inlet & Outlet annotations
      ctx.fillStyle = isDark ? '#00F0FF' : '#0284c7';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('◀ COOLANT INLET (25.0°C)', chX + 12, chY - 10);

      ctx.fillStyle = isDark ? '#FF3B30' : '#dc2626';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('WARMED DISCHARGE (37.2°C) ▶', chX + chW - 12, chY - 10);

      // 6. Microchannel Dimensions Callouts
      ctx.fillStyle = isDark ? '#64748B' : '#526174';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Channel Width w_c = 150 µm | Fin Width w_fin = 100 µm | Height H = 1.2 mm', cx, chY + 12);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, viewMode, isDark]);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-[#DCE4EE] dark:border-slate-800 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCE4EE] dark:border-slate-800">
        <div>
          <h4 className="font-mono text-base font-bold text-[#0B1220] dark:text-slate-100 flex items-center gap-2">
            <Wind className="w-5 h-5 text-blue-600 dark:text-dtc-cyan" />
            INTERNAL MICROCHANNEL STREAMLINES (CAD CROSS-SECTION)
          </h4>
          <p className="text-xs font-mono text-[#526174] dark:text-slate-400 mt-0.5">
            Observing localized fluid acceleration and convective heat transfer within copper micro-fins
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-[#DCE4EE] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-dtc-cyan transition-colors"
            aria-label={isPlaying ? 'Pause fluid streamlines' : 'Play fluid streamlines'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* View Mode Filters */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-[#DCE4EE] dark:border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('normal')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'normal'
                  ? 'bg-blue-600 text-white dark:bg-dtc-cyan/20 dark:text-dtc-cyan font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
              }`}
            >
              Streamlines
            </button>
            <button
              onClick={() => setViewMode('thermal')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'thermal'
                  ? 'bg-red-600 text-white dark:bg-dtc-hot/20 dark:text-dtc-hot font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              Thermal Flux
            </button>
            <button
              onClick={() => setViewMode('cross-section')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'cross-section'
                  ? 'bg-amber-600 text-white dark:bg-dtc-warm/20 dark:text-dtc-warm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Fin Geometry
            </button>
          </div>
        </div>
      </div>

      {/* 2D Canvas Viewport */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-[#DCE4EE] dark:border-slate-900 shadow-inner">
        <canvas ref={canvasRef} className="w-full h-auto block" />
      </div>

      {/* Microchannel Specification Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-[#DCE4EE] dark:border-slate-800/80">
          <span className="text-[#64748B] dark:text-slate-500 block text-[10px]">MICROCHANNEL ASPECT RATIO</span>
          <span className="text-[#0B1220] dark:text-slate-200 font-bold text-sm">8.0 : 1 (1.2mm / 150µm)</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-[#DCE4EE] dark:border-slate-800/80">
          <span className="text-[#64748B] dark:text-slate-500 block text-[10px]">HEAT TRANSFER COEFFICIENT (h)</span>
          <span className="text-blue-600 dark:text-dtc-cyan font-bold text-sm">18,400 W/m²·K</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-[#DCE4EE] dark:border-slate-800/80">
          <span className="text-[#64748B] dark:text-slate-500 block text-[10px]">REYNOLDS NUMBER (Re)</span>
          <span className="text-emerald-600 dark:text-dtc-green font-bold text-sm">1,240 (Laminar Flow)</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-[#DCE4EE] dark:border-slate-800/80">
          <span className="text-[#64748B] dark:text-slate-500 block text-[10px]">TOTAL PRESSURE DROP (ΔP)</span>
          <span className="text-amber-600 dark:text-dtc-warm font-bold text-sm">18.4 kPa @ 1.2 LPM</span>
        </div>
      </div>
    </div>
  );
};
