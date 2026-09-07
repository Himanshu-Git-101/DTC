import React, { useState, useEffect, useRef } from 'react';
import { Flame, Gauge, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const HeatSimulator: React.FC = () => {
  const [thermalLoad, setThermalLoad] = useState<number>(700); // 200 to 800 W
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute thermal indicators based on load
  const isOverheating = thermalLoad > 740;
  const isHighLoad = thermalLoad >= 600;
  const computeCoreFlux = (thermalLoad * (218 / 700)).toFixed(0);
  const estimatedHotspotTemp = (25 + (thermalLoad * 0.053)).toFixed(1);
  const monolithicHotspotTemp = (25 + (thermalLoad * 0.0757) + 5).toFixed(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 340;
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
      ctx.fillStyle = '#0a0e17';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(dieX - 20, dieY - 20, dieW + 40, dieH + 40, 12);
      ctx.fill();
      ctx.stroke();

      // PCB Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '8px monospace';
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
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - (r / numRings) * 0.1})`;
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
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('GH100 COMPUTE CORE', cx, coreY + 22);

      ctx.fillStyle = heatIntensity > 0.8 ? '#FF3B30' : '#FFD60A';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`${computeCoreFlux} W/cm² FLUX`, cx, cy + 4);

      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(`Peak Die Area: 2.2 cm²`, cx, coreY + coreH - 16);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [thermalLoad, computeCoreFlux]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-dtc-hot animate-pulse" />
            <h4 className="font-mono text-base font-bold text-slate-100">
              REAL-TIME ACCELERATOR THERMAL FLUX SIMULATOR
            </h4>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
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
      <div className="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between">
          <label htmlFor="thermal-slider" className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-dtc-cyan" />
            <span>ACCELERATOR THERMAL LOAD (TDP):</span>
          </label>
          <span className="font-mono text-lg font-bold text-dtc-hot">
            {thermalLoad} <span className="text-xs text-slate-400">WATTS</span>
          </span>
        </div>

        <input
          id="thermal-slider"
          type="range"
          min={200}
          max={800}
          step={20}
          value={thermalLoad}
          onChange={(e) => setThermalLoad(Number(e.target.value))}
          className="w-full slider-thermal"
        />

        <div className="flex justify-between font-mono text-[10px] text-slate-400">
          <span>200W (Idle Load)</span>
          <span>400W (Standard GPU)</span>
          <span className="text-dtc-warm font-bold">700W (H100 SXM5 Baseline)</span>
          <span className="text-dtc-hot font-bold">800W (Overclock Peak)</span>
        </div>
      </div>

      {/* Die Thermal Visualization Canvas */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-900">
        <canvas ref={canvasRef} className="w-full h-auto block" />
      </div>

      {/* Dynamic Comparison Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Monolithic Cold Plate Result */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-dtc-hot/30 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-slate-400 uppercase font-semibold">
              Traditional Monolithic Cold Plate
            </span>
            <AlertTriangle className="w-4 h-4 text-dtc-hot" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-dtc-hot">
              {monolithicHotspotTemp}°C
            </span>
            <span className="text-xs font-mono text-slate-400">Silicon Hotspot</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed">
            Uniform flow starves the compute die. High localized thermal resistance (<strong className="text-slate-200">0.0757 K/W</strong>) causes throttling at &gt;700W.
          </p>
        </div>

        {/* H-ASP Result */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-dtc-cyan/40 relative shadow-[0_0_20px_rgba(0,240,255,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-dtc-cyan uppercase font-semibold">
              H-ASP Heterogeneous Cold Plate
            </span>
            <ShieldCheck className="w-4 h-4 text-dtc-green" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-dtc-cyan">
              {estimatedHotspotTemp}°C
            </span>
            <span className="text-xs font-mono text-dtc-green font-semibold">
              (-{(Number(monolithicHotspotTemp) - Number(estimatedHotspotTemp)).toFixed(1)}°C Cooler)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed">
            Passive 70% flow allocation to compute core slashes resistance to <strong className="text-dtc-cyan">0.053 K/W</strong>, keeping silicon in safe boost range.
          </p>
        </div>
      </div>
    </div>
  );
};
