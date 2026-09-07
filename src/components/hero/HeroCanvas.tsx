import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  zone: 'A' | 'B' | 'C';
  temp: number; // 0 (cold cyan) to 1 (hot red)
  size: number;
  life: number;
  maxLife: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFlowMode, setActiveFlowMode] = useState<'all' | 'zone-a' | 'zone-b' | 'zone-c'>('all');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = Math.min(540, Math.max(380, width * 0.55)));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(540, Math.max(380, width * 0.55));
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles: Particle[] = [];
    const maxParticles = width < 600 ? 120 : 260;

    const createParticle = (): Particle => {
      // Pick zone based on 70-20-10 distribution
      const rand = Math.random();
      let zone: 'A' | 'B' | 'C' = 'A';
      if (rand > 0.70 && rand <= 0.90) zone = 'B';
      else if (rand > 0.90) zone = 'C';

      if (activeFlowMode === 'zone-a') zone = 'A';
      if (activeFlowMode === 'zone-b') zone = 'B';
      if (activeFlowMode === 'zone-c') zone = 'C';

      // Start at inlet port (left side of manifold)
      const inletX = width * 0.12;
      const inletY = height * 0.5 + (Math.random() - 0.5) * 40;

      return {
        x: inletX,
        y: inletY,
        vx: 1.5 + Math.random() * 2,
        vy: (Math.random() - 0.5) * 0.5,
        zone,
        temp: 0,
        size: zone === 'A' ? 2.5 : zone === 'B' ? 3.2 : 4.0,
        life: 0,
        maxLife: 180 + Math.random() * 60,
      };
    };

    // Initialize initial particles
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.x = width * 0.12 + Math.random() * (width * 0.76);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 0. Detect active theme
      const isDark = document.documentElement.classList.contains('dark');

      // Coordinate anchors
      const cx = width * 0.5;
      const cy = height * 0.5;
      const chipW = width * 0.72;
      const chipH = height * 0.68;
      const chipX = cx - chipW / 2;
      const chipY = cy - chipH / 2;

      // 1. Draw Silicon PCB / SXM5 Substrate Base
      ctx.fillStyle = isDark ? '#080c14' : '#E2E8F0';
      ctx.strokeStyle = isDark ? '#1e293b' : '#94A3B8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(chipX - 16, chipY - 16, chipW + 32, chipH + 32, 16);
      ctx.fill();
      ctx.stroke();

      // Substrate pin grid pattern
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.06)';
      ctx.lineWidth = 1;
      const gridStep = 24;
      for (let gx = chipX; gx < chipX + chipW; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, chipY - 10);
        ctx.lineTo(gx, chipY + chipH + 10);
        ctx.stroke();
      }

      // 2. Draw 6x HBM3 Memory Stacks (Zone B)
      const hbmW = chipW * 0.12;
      const hbmH = chipH * 0.28;
      const hbmYTop = chipY + chipH * 0.12;
      const hbmYBottom = chipY + chipH * 0.60;

      const hbmPositions = [
        { x: chipX + chipW * 0.14, y: hbmYTop, label: 'HBM3 #1' },
        { x: chipX + chipW * 0.32, y: hbmYTop, label: 'HBM3 #2' },
        { x: chipX + chipW * 0.74, y: hbmYTop, label: 'HBM3 #3' },
        { x: chipX + chipW * 0.14, y: hbmYBottom, label: 'HBM3 #4' },
        { x: chipX + chipW * 0.32, y: hbmYBottom, label: 'HBM3 #5' },
        { x: chipX + chipW * 0.74, y: hbmYBottom, label: 'HBM3 #6' },
      ];

      hbmPositions.forEach((hbm) => {
        ctx.fillStyle = isDark ? '#111827' : '#F8FAFC';
        ctx.strokeStyle = isDark ? '#ff9500' : '#D97706';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(hbm.x, hbm.y, hbmW, hbmH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isDark ? 'rgba(255, 149, 0, 0.6)' : 'rgba(180, 83, 9, 0.8)';
        ctx.font = '9px monospace';
        ctx.fillText('HBM3', hbm.x + 4, hbm.y + 12);
      });

      // 3. Draw Primary Compute Core Die (Zone A - GH100 Compute Silicon)
      const coreW = chipW * 0.28;
      const coreH = chipH * 0.54;
      const coreX = cx - coreW / 2;
      const coreY = cy - coreH / 2;

      // Thermal Heat Map Glow on Compute Die
      const heatPulse = 0.85 + Math.sin(time * 3) * 0.15;
      const heatGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, coreW * 0.8);
      heatGrad.addColorStop(0, isDark ? `rgba(255, 59, 48, ${0.45 * heatPulse})` : `rgba(220, 38, 38, ${0.35 * heatPulse})`);
      heatGrad.addColorStop(0.5, isDark ? `rgba(255, 149, 0, ${0.25 * heatPulse})` : `rgba(217, 119, 6, ${0.20 * heatPulse})`);
      heatGrad.addColorStop(1, isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(2, 132, 199, 0.05)');

      ctx.fillStyle = heatGrad;
      ctx.beginPath();
      ctx.roundRect(coreX, coreY, coreW, coreH, 8);
      ctx.fill();

      // Compute Core Border
      ctx.strokeStyle = isDark ? '#ff3b30' : '#DC2626';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Compute Die Label
      ctx.fillStyle = isDark ? '#ffffff' : '#0F172A';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ZONE A: COMPUTE CORE', cx, coreY + 18);
      ctx.fillStyle = isDark ? '#ff3b30' : '#DC2626';
      ctx.font = '10px monospace';
      ctx.fillText('218 W/cm² [480W]', cx, coreY + 32);

      // 4. Draw Microchannel Structure (Copper Fin Array Outline)
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(2, 132, 199, 0.25)';
      ctx.lineWidth = 1;
      const finSpacing = 6;
      for (let fx = coreX + 10; fx < coreX + coreW - 10; fx += finSpacing) {
        ctx.beginPath();
        ctx.moveTo(fx, coreY + 40);
        ctx.lineTo(fx, coreY + coreH - 10);
        ctx.stroke();
      }

      // 5. Draw Cold Plate Manifold Housing (Translucent Glassmorphism)
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.75)';
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.4)' : 'rgba(2, 132, 199, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(chipX - 4, chipY - 4, chipW + 8, chipH + 8, 12);
      ctx.fill();
      ctx.stroke();

      // Inlet and Outlet Flanges
      const portRadius = 16;
      const inletX = chipX - 2;
      const inletY = cy;
      const outletX = chipX + chipW + 2;
      const outletY = cy;

      // INLET PORT
      ctx.fillStyle = isDark ? '#00f0ff' : '#0284C7';
      ctx.beginPath();
      ctx.arc(inletX, inletY, portRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isDark ? '#000000' : '#FFFFFF';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('IN', inletX, inletY + 3);

      // OUTLET PORT
      ctx.fillStyle = isDark ? '#ff3b30' : '#DC2626';
      ctx.beginPath();
      ctx.arc(outletX, outletY, portRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('OUT', outletX, outletY + 3);

      // 6. Fluid Particles Simulation & Rendering
      if (isPlaying) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Target trajectory depending on zone
          let targetY = cy;
          let speedFactor = 1.0;

          if (p.zone === 'A') {
            targetY = coreY + 45 + ((i % 12) / 12) * (coreH - 55);
            speedFactor = 2.4; // 70% flow volume -> high velocity
          } else if (p.zone === 'B') {
            targetY = i % 2 === 0 ? hbmYTop + hbmH / 2 : hbmYBottom + hbmH / 2;
            speedFactor = 1.4;
          } else {
            targetY = i % 2 === 0 ? chipY + 18 : chipY + chipH - 18;
            speedFactor = 0.9;
          }

          // Move towards target Y, advance X
          p.y += (targetY - p.y) * 0.05 + p.vy;
          p.x += p.vx * speedFactor;
          p.life++;

          // Heating calculation based on proximity to Zone A & X progress
          const progress = (p.x - chipX) / chipW;
          if (p.zone === 'A') {
            p.temp = Math.min(1.0, Math.max(0, (progress - 0.25) * 1.5));
          } else if (p.zone === 'B') {
            p.temp = Math.min(0.65, Math.max(0, (progress - 0.2) * 0.9));
          } else {
            p.temp = Math.min(0.3, Math.max(0, (progress - 0.1) * 0.4));
          }

          // Reset particle when exiting outlet
          if (p.x > outletX + 10 || p.life > p.maxLife) {
            particles[i] = createParticle();
          }

          // Color interpolation from Cold Cyan (0) to Warm Orange (0.5) to Hot Red (1.0)
          let r = 0, g = 240, b = 255;
          if (isDark) {
            if (p.temp < 0.5) {
              const t = p.temp * 2;
              r = Math.round(0 + t * 255);
              g = Math.round(240 - t * 90);
              b = Math.round(255 - t * 255);
            } else {
              const t = (p.temp - 0.5) * 2;
              r = 255;
              g = Math.round(150 - t * 90);
              b = Math.round(0);
            }
          } else {
            // Light mode: precision cyan #0284C7 (2, 132, 199) to amber to red #DC2626 (220, 38, 38)
            if (p.temp < 0.5) {
              const t = p.temp * 2;
              r = Math.round(2 + t * 215);
              g = Math.round(132 - t * 13);
              b = Math.round(199 - t * 193);
            } else {
              const t = (p.temp - 0.5) * 2;
              r = Math.round(217 + t * 3);
              g = Math.round(119 - t * 81);
              b = Math.round(6 + t * 32);
            }
          }

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
          if (isDark) {
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
            ctx.shadowBlur = 6;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // HUD Telemetry overlay labels on canvas
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.font = '10px monospace';
      ctx.fillText('COOLANT INLET: 25.0°C | PG25 @ 1.2 LPM', chipX, chipY - 24);

      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 59, 48, 0.9)';
      ctx.fillText('COOLANT OUTLET: 37.2°C | 700W EXTRACTED', chipX + chipW, chipY - 24);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, activeFlowMode]);

  return (
    <div className="relative w-full rounded-2xl glass-panel p-4 md:p-6 hud-corner overflow-hidden border border-dtc-cyan/30 shadow-[0_0_40px_rgba(0,240,255,0.12)]">
      {/* Top Controls & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-dtc-cyan animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
            INTERACTIVE CFD STREAMLINE SIMULATION
          </span>
        </div>

        {/* Zone Filters */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveFlowMode('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeFlowMode === 'all'
                ? 'bg-dtc-cyan text-black font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (70/20/10)
          </button>
          <button
            onClick={() => setActiveFlowMode('zone-a')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeFlowMode === 'zone-a'
                ? 'bg-dtc-hot text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Zone A (70%)
          </button>
          <button
            onClick={() => setActiveFlowMode('zone-b')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeFlowMode === 'zone-b'
                ? 'bg-dtc-warm text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Zone B (20%)
          </button>
          <button
            onClick={() => setActiveFlowMode('zone-c')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeFlowMode === 'zone-c'
                ? 'bg-dtc-cyan/30 text-dtc-cyan font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Zone C (10%)
          </button>
        </div>

        {/* Play/Pause */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-300 hover:text-dtc-cyan hover:border-dtc-cyan transition-colors"
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-950/80 border border-slate-900">
        <canvas ref={canvasRef} className="w-full h-auto block cursor-crosshair" />

        {/* Bottom Legend Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-dtc-cyan">
              <span className="w-2 h-2 rounded-full bg-dtc-cyan shadow-[0_0_6px_#00F0FF]" />
              <span>Inlet Coolant (25°C)</span>
            </div>
            <div className="flex items-center gap-1.5 text-dtc-warm">
              <span className="w-2 h-2 rounded-full bg-dtc-warm shadow-[0_0_6px_#FF9500]" />
              <span>Convective Absorption</span>
            </div>
            <div className="flex items-center gap-1.5 text-dtc-hot">
              <span className="w-2 h-2 rounded-full bg-dtc-hot shadow-[0_0_6px_#FF3B30]" />
              <span>Heated Discharge (37°C)</span>
            </div>
          </div>

          <div className="text-slate-400 hidden sm:block">
            Target: <span className="text-slate-200 font-semibold">NVIDIA H100 SXM5</span>
          </div>
        </div>
      </div>
    </div>
  );
};
