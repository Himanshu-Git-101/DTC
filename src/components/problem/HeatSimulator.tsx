import React, { useState, useEffect, useRef } from 'react';
import { Flame, AlertTriangle, Gauge, Zap } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useTheme } from '../../context/ThemeContext';

export const HeatSimulator: React.FC = () => {
  const { isDark } = useTheme();
  // Thermal load slider: 200W to 800W
  const [thermalLoad, setThermalLoad] = useState<number>(700);

  // Derived engineering calculations
  const computeCoreFlux = Math.round((thermalLoad * 0.7) / 2.2); // ~222 W/cm² at 700W
  const airJunctionTemp = Math.round(35 + thermalLoad * 0.082); // Air cooler struggles: 92.4°C at 700W
  const dtcJunctionTemp = Math.round(25 + thermalLoad * 0.041); // DTC liquid cooling: 53.7°C at 700W
  const isOverheating = airJunctionTemp > 85;
  const isHighLoad = thermalLoad >= 650;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 280;
    };
    window.addEventListener('resize', handleResize);

    let frame = 0;

    const render = () => {
      frame += 0.03;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const dieW = Math.min(width * 0.7, 360);
      const dieH = 200;
      const dieX = cx - dieW / 2;
      const dieY = cy - dieH / 2;

      // 1. Draw SXM5 PCB Carrier Base
      ctx.fillStyle = isDark ? '#0a0e17' : '#E2E8F0';
      ctx.strokeStyle = isDark ? '#1e293b' : '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(dieX - 20, dieY - 20, dieW + 40, dieH + 40, 12);
      ctx.fill();
      ctx.stroke();

      // PCB Grid
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(11, 18, 32, 0.05)';
      ctx.lineWidth = 1;
      for (let x = dieX - 10; x < dieX + dieW + 10; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, dieY - 15);
        ctx.lineTo(x, dieY + dieH + 15);
        ctx.stroke();
      }

      // 2. Draw 6x HBM3 Memory modules
      const hbmW = dieW * 0.16;
      const hbmH = dieH * 0.32;
      const hbmTopY = dieY + 12;
      const hbmBottomY = dieY + dieH - hbmH - 12;

      const hbms = [
        { x: dieX + 12, y: hbmTopY },
        { x: dieX + dieW * 0.28, y: hbmTopY },
        { x: dieX + dieW - hbmW - 12, y: hbmTopY },
        { x: dieX + 12, y: hbmBottomY },
        { x: dieX + dieW * 0.28, y: hbmBottomY },
        { x: dieX + dieW - hbmW - 12, y: hbmBottomY },
      ];

      const hbmWarmth = (thermalLoad / 800) * 0.5;
      hbms.forEach((hbm) => {
        ctx.fillStyle = `rgba(255, 149, 0, ${0.1 + hbmWarmth * 0.3})`;
        ctx.strokeStyle = `rgba(255, 149, 0, ${0.3 + hbmWarmth * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(hbm.x, hbm.y, hbmW, hbmH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isDark ? 'rgba(255, 149, 0, 0.8)' : '#c2410c';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('HBM3', hbm.x + 4, hbm.y + 12);
      });

      // 3. Compute Core Die (Center GH100 Silicon)
      const coreW = dieW * 0.36;
      const coreH = dieH * 0.64;
      const coreX = cx - coreW / 2;
      const coreY = cy - coreH / 2;

      // Thermal Heatmap Gradient (Expands dramatically with thermalLoad)
      const heatIntensity = (thermalLoad - 200) / 600; // 0.0 to 1.0
      const pulse = 1 + Math.sin(frame * 4) * (0.05 + heatIntensity * 0.1);
      const gradientRadius = (coreW * 0.8) * (0.8 + heatIntensity * 0.8) * pulse;

      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, gradientRadius);
      if (heatIntensity > 0.8) {
        grad.addColorStop(0, `rgba(255, 0, 0, 0.95)`);
        grad.addColorStop(0.3, `rgba(255, 59, 48, 0.8)`);
        grad.addColorStop(0.6, `rgba(255, 149, 0, 0.5)`);
        grad.addColorStop(1, `rgba(0, 240, 255, 0.05)`);
      } else if (heatIntensity > 0.4) {
        grad.addColorStop(0, `rgba(255, 59, 48, 0.8)`);
        grad.addColorStop(0.4, `rgba(255, 149, 0, 0.6)`);
        grad.addColorStop(0.8, `rgba(255, 204, 0, 0.3)`);
        grad.addColorStop(1, `rgba(0, 240, 255, 0.05)`);
      } else {
        grad.addColorStop(0, `rgba(255, 149, 0, 0.6)`);
        grad.addColorStop(0.5, `rgba(255, 204, 0, 0.3)`);
        grad.addColorStop(1, `rgba(0, 240, 255, 0.1)`);
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(coreX, coreY, coreW, coreH, 6);
      ctx.fill();

      // Isotherm contour lines
      const numRings = 3 + Math.floor(heatIntensity * 4);
      for (let r = 1; r <= numRings; r++) {
        const ringRad = (gradientRadius / numRings) * r;
        ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${0.15 - (r / numRings) * 0.1})` : `rgba(11, 18, 32, ${0.15 - (r / numRings) * 0.1})`;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, ringRad, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Silicon Die Border
      ctx.strokeStyle = heatIntensity > 0.8 ? '#FF3B30' : '#FF9500';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Thermal Hotspot Callout
      ctx.textAlign = 'center';
      ctx.fillStyle = isDark ? '#ffffff' : '#0B1220';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('GH100 COMPUTE CORE', cx, coreY + 22);

      ctx.fillStyle = heatIntensity > 0.8 ? '#FF3B30' : '#FF9500';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`${computeCoreFlux} W/cm² FLUX`, cx, cy + 4);

      ctx.font = '10px monospace';
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.7)' : '#526174';
      ctx.fillText(`Peak Die Area: 2.2 cm²`, cx, coreY + coreH - 16);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [thermalLoad, computeCoreFlux, isDark]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-[#DCE4EE] dark:border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCE4EE] dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-dtc-hot animate-pulse" />
            <h4 className="font-mono text-base font-bold text-[#0B1220] dark:text-slate-100">
              REAL-TIME ACCELERATOR THERMAL FLUX SIMULATOR
            </h4>
          </div>
          <p className="text-xs font-mono text-[#526174] dark:text-slate-400 mt-0.5">
            Adjust the slider to observe localized silicon heat flux and isotherm spreading
          </p>
        </div>

        <div>
          <Badge
            variant={isOverheating ? 'hot' : isHighLoad ? 'warm' : 'cyan'}
            pulse={isOverheating}
            size="md"
          >
            {isOverheating
              ? 'THERMAL LOAD: CRITICAL OVERHEAT'
              : isHighLoad
              ? 'THERMAL LOAD: HIGH (NVIDIA H100 SXM5)'
              : 'THERMAL LOAD: MODERATE / IDLE'}
          </Badge>
        </div>
      </div>

      {/* Interactive Slider Control */}
      <div className="space-y-3 p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-[#DCE4EE] dark:border-slate-800">
        <div className="flex justify-between items-center font-mono text-xs">
          <span className="text-[#526174] dark:text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            TOTAL ACCELERATOR TDP:
          </span>
          <span className="text-lg font-bold text-[#0B1220] dark:text-slate-100">
            {thermalLoad} Watts
          </span>
        </div>

        <input
          type="range"
          min={200}
          max={800}
          step={25}
          value={thermalLoad}
          onChange={(e) => setThermalLoad(Number(e.target.value))}
          className="w-full slider-thermal"
        />

        <div className="flex justify-between text-[11px] font-mono text-[#64748B] dark:text-slate-500">
          <span>200W (Idle / Inference)</span>
          <span>450W (Standard)</span>
          <span className="text-amber-600 dark:text-dtc-warm font-semibold">700W (H100 SXM5)</span>
          <span className="text-red-600 dark:text-dtc-hot font-semibold">800W (Next-Gen)</span>
        </div>
      </div>

      {/* 2D Silicon Thermal Heatmap Canvas */}
      <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-[#DCE4EE] dark:border-slate-900 shadow-inner">
        <canvas ref={canvasRef} className="w-full h-auto block" />
      </div>

      {/* Dual Comparative Readout Cards: Air vs Liquid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Air Cooling Outcome */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isOverheating
              ? 'bg-red-500/10 border-red-500/40'
              : 'bg-slate-100/80 dark:bg-slate-900/70 border-[#DCE4EE] dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#526174] dark:text-slate-400">
              TRADITIONAL FORCED AIR COOLER
            </span>
            {isOverheating && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-red-600 dark:text-dtc-hot font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                THROTTLING
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-mono font-extrabold ${
                isOverheating ? 'text-red-600 dark:text-dtc-hot' : 'text-[#0B1220] dark:text-slate-200'
              }`}
            >
              {airJunctionTemp}°C
            </span>
            <span className="text-xs font-mono text-[#526174] dark:text-slate-400">
              Junction Temp (T_j limit: 85°C)
            </span>
          </div>
          <p className="mt-2 text-xs text-[#526174] dark:text-slate-400">
            {isOverheating
              ? 'Thermal resistance (0.095 K/W) causes severe thermal saturation. Fans ramp to 100% (78 dB) and GPU throttles by 25–40%.'
              : 'Adequate for lower TDP, but reaches high acoustic noise and power consumption.'}
          </p>
        </div>

        {/* DTC Liquid Cooling Outcome */}
        <div className="p-4 rounded-xl bg-blue-500/10 dark:bg-dtc-cyan/10 border border-blue-500/30 dark:border-dtc-cyan/30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-blue-700 dark:text-dtc-cyan font-semibold">
              H-ASP DIRECT-TO-CHIP LIQUID
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-dtc-green font-bold">
              <Gauge className="w-3.5 h-3.5" />
              OPTIMAL
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-extrabold text-blue-600 dark:text-dtc-cyan">
              {dtcJunctionTemp}°C
            </span>
            <span className="text-xs font-mono text-[#526174] dark:text-slate-400">
              Junction Temp (ΔT = {airJunctionTemp - dtcJunctionTemp}°C cooler)
            </span>
          </div>
          <p className="mt-2 text-xs text-[#526174] dark:text-slate-300">
            Microchannel convective heat transfer coefficient (&gt;18,000 W/m²K) dissipates core hotspot easily. Silicon runs cool with 0% throttling.
          </p>
        </div>
      </div>
    </div>
  );
};
