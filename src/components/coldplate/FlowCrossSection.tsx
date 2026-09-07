import React, { useState, useEffect, useRef } from 'react';
import { Waves, Play, Pause } from 'lucide-react';

export const FlowCrossSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'normal' | 'thermal' | 'cross-section'>('normal');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Streamline particles
    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: 80 + Math.random() * (height - 160),
      vx: 1.5 + Math.random() * 2.5,
      vy: (Math.random() - 0.5) * 0.4,
      zone: Math.random() > 0.3 ? 'A' : Math.random() > 0.5 ? 'B' : 'C',
      life: Math.random() * 100,
    }));

    let frame = 0;

    const render = () => {
      frame += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const chW = width * 0.85;
      const chH = 200;
      const chX = cx - chW / 2;
      const chY = cy - chH / 2;

      // 1. Draw Cold Plate Cross-Section Channel Housing
      // 0. Detect active theme
      const isDark = document.documentElement.classList.contains('dark');

      // 1. Channel Housing Background
      ctx.fillStyle = isDark ? '#060a12' : '#F1F5F9';
      ctx.strokeStyle = isDark ? '#1e293b' : '#94A3B8';
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
        grad.addColorStop(0, isDark ? `rgba(255, 59, 48, ${0.8 * pulse})` : `rgba(220, 38, 38, ${0.75 * pulse})`);
        grad.addColorStop(0.5, isDark ? `rgba(255, 149, 0, ${0.4 * pulse})` : `rgba(217, 119, 6, ${0.35 * pulse})`);
        grad.addColorStop(1, isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(2, 132, 199, 0.05)');

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
          let color = isDark ? '#00F0FF' : '#0284C7';

          if (viewMode === 'thermal') {
            if (progress < 0.35) color = isDark ? '#00F0FF' : '#0284C7'; // Cold inlet
            else if (progress < 0.65) color = isDark ? '#FF9500' : '#D97706'; // Absorbing heat in Zone A
            else color = isDark ? '#FF3B30' : '#DC2626'; // Hot discharge
          } else if (viewMode === 'cross-section') {
            color = inCore 
              ? (isDark ? '#00F0FF' : '#0284C7') 
              : (isDark ? 'rgba(0, 240, 255, 0.4)' : 'rgba(2, 132, 199, 0.45)');
          }

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, inCore ? 2.5 : 2.0, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 5. Inlet & Outlet annotations
      ctx.fillStyle = isDark ? '#00F0FF' : '#0284C7';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('◀ COOLANT INLET (25.0°C)', chX + 12, chY - 10);

      ctx.fillStyle = isDark ? '#FF3B30' : '#DC2626';
      ctx.textAlign = 'right';
      ctx.fillText('HEATED OUTLET (37.2°C) ▶', chX + chW - 12, chY - 10);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [viewMode, isPlaying]);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-mono text-base font-bold text-slate-100 flex items-center gap-2">
            <Waves className="w-5 h-5 text-dtc-cyan" />
            INTERNAL MICROCHANNEL CROSS-SECTION STREAMLINES
          </h4>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Visualize fluid boundary layer disruption and thermal absorption across the copper fin array
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('normal')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'normal'
                  ? 'bg-dtc-cyan text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal View
            </button>
            <button
              onClick={() => setViewMode('thermal')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'thermal'
                  ? 'bg-dtc-hot text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Thermal Mode
            </button>
            <button
              onClick={() => setViewMode('cross-section')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'cross-section'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Channel Cut
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-dtc-cyan"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900">
        <canvas ref={canvasRef} className="w-full h-auto block" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-400">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-dtc-cyan block uppercase">Zone A Flow Velocity</span>
          <span className="text-slate-200 font-bold">2.4 m/s (High Reynolds)</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-dtc-warm block uppercase">Thermal Boundary Layer</span>
          <span className="text-slate-200 font-bold">&lt; 35 µm Thin Layer</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-dtc-green block uppercase">Convective Transfer (h)</span>
          <span className="text-slate-200 font-bold">&gt; 38,000 W/m²·K</span>
        </div>
      </div>
    </div>
  );
};
