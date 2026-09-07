import React, { useState } from 'react';
import {
  THERMAL_RESISTANCE_VS_FLUX_DATA,
  PRESSURE_DROP_VS_FLOW_DATA,
  HOTSPOT_TEMP_VS_FLOW_DATA,
} from '../../data/resultsData';

export const InteractiveChart: React.FC = () => {
  const [activeGraph, setActiveGraph] = useState<'resistance' | 'pressure' | 'hotspot'>('resistance');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const graphConfig = {
    resistance: {
      title: 'Graph 1: Thermal Resistance (R_th) vs Heat Flux',
      xLabel: 'Heat Flux (W/cm²)',
      yLabel: 'Thermal Resistance R_th (K/W)',
      data: THERMAL_RESISTANCE_VS_FLUX_DATA,
      yMin: 0.04,
      yMax: 0.16,
      formatY: (v: number) => `${v.toFixed(3)} K/W`,
      formatX: (v: number) => `${v} W/cm²`,
      annotation: 'H-ASP maintains flat 0.053 K/W resistance up to 200 W/cm², while monolithic spikes.',
    },
    pressure: {
      title: 'Graph 2: Pressure Drop (ΔP) vs Total Flow Rate',
      xLabel: 'Coolant Flow Rate (LPM)',
      yLabel: 'Total Pressure Drop ΔP (Pa)',
      data: PRESSURE_DROP_VS_FLOW_DATA,
      yMin: 0,
      yMax: 60000,
      formatY: (v: number) => `${v.toLocaleString()} Pa`,
      formatX: (v: number) => `${v} LPM`,
      annotation: 'H-ASP wide peripheral channels in Zone B & C drop system pressure by 20%–40%.',
    },
    hotspot: {
      title: 'Graph 3: Hotspot Temperature Above Coolant vs Flow Rate',
      xLabel: 'Coolant Flow Rate (LPM)',
      yLabel: 'Hotspot ΔT Above Inlet Coolant (°C)',
      data: HOTSPOT_TEMP_VS_FLOW_DATA,
      yMin: 20,
      yMax: 50,
      formatY: (v: number) => `${v.toFixed(1)} °C`,
      formatX: (v: number) => `${v} LPM`,
      annotation: '70% flow to compute core reduces peak silicon hotspot delta by 5°C to 10°C.',
    },
  };

  const current = graphConfig[activeGraph];
  const data = current.data;

  // Chart coordinate mapping
  const chartW = 580;
  const chartH = 260;
  const padL = 60;
  const padR = 20;
  const padT = 30;
  const padB = 40;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const minX = data[0].x;
  const maxX = data[data.length - 1].x;
  const minY = current.yMin;
  const maxY = current.yMax;

  const getX = (val: number) => padL + ((val - minX) / (maxX - minX)) * plotW;
  const getY = (val: number) => padT + plotH - ((val - minY) / (maxY - minY)) * plotH;

  // Generate SVG path for Monolithic curve
  const monoPath = data.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${getX(pt.x)} ${getY(pt.monolithic)}`,
    ''
  );

  // Generate SVG path for H-ASP curve
  const haspPath = data.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${getX(pt.x)} ${getY(pt.hasp)}`,
    ''
  );

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      {/* Graph Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="font-mono text-[10px] text-dtc-cyan uppercase tracking-wider block">
            Analytical Simulation Benchmarks
          </span>
          <h4 className="font-mono text-base font-bold text-slate-100">
            {current.title}
          </h4>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => {
              setActiveGraph('resistance');
              setHoveredPointIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeGraph === 'resistance'
                ? 'bg-dtc-cyan text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Thermal Resistance
          </button>
          <button
            onClick={() => {
              setActiveGraph('pressure');
              setHoveredPointIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeGraph === 'pressure'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pressure Drop
          </button>
          <button
            onClick={() => {
              setActiveGraph('hotspot');
              setHoveredPointIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeGraph === 'hotspot'
                ? 'bg-dtc-hot text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hotspot Delta
          </button>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-x-auto bg-slate-100 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-900 select-none">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto min-w-[500px]">
          {/* Grid lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const yVal = minY + ((maxY - minY) / 4) * i;
            const yPos = getY(yVal);
            return (
              <g key={i}>
                <line
                  x1={padL}
                  y1={yPos}
                  x2={padL + plotW}
                  y2={yPos}
                  className="stroke-slate-300 dark:stroke-white/10"
                  strokeDasharray="4 4"
                />
                <text
                  x={padL - 8}
                  y={yPos + 4}
                  className="fill-slate-500 dark:fill-[#64748b]"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {current.formatY(yVal)}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {data.map((pt, idx) => {
            if (idx % 2 !== 0 && data.length > 6) return null;
            return (
              <text
                key={idx}
                x={getX(pt.x)}
                y={padT + plotH + 18}
                className="fill-slate-500 dark:fill-[#64748b]"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {current.formatX(pt.x)}
              </text>
            );
          })}

          {/* Monolithic Curve (Red / Orange Dashed) */}
          <path
            d={monoPath}
            fill="none"
            className="stroke-dtc-hot"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />

          {/* H-ASP Proposed Curve (Solid Glowing Cyan) */}
          <path
            d={haspPath}
            fill="none"
            className="stroke-dtc-cyan"
            strokeWidth="3"
          />

          {/* Data Points */}
          {data.map((pt, idx) => {
            const isHovered = hoveredPointIndex === idx;
            return (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPointIndex(idx)}>
                {/* Monolithic point */}
                <circle
                  cx={getX(pt.x)}
                  cy={getY(pt.monolithic)}
                  r={isHovered ? 6 : 3.5}
                  fill="#FF3B30"
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                {/* H-ASP point */}
                <circle
                  cx={getX(pt.x)}
                  cy={getY(pt.hasp)}
                  r={isHovered ? 7 : 4.5}
                  fill="#00F0FF"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip / Point Inspector */}
        {hoveredPointIndex !== null && (
          <div className="absolute top-6 right-6 p-3 rounded-xl bg-slate-900/95 border border-dtc-cyan shadow-xl font-mono text-xs space-y-1 backdrop-blur-md">
            <span className="text-slate-400 block text-[10px]">
              X: {current.formatX(data[hoveredPointIndex].x)}
            </span>
            <div className="flex items-center gap-2 text-dtc-cyan font-bold">
              <span className="w-2 h-2 rounded-full bg-dtc-cyan" />
              <span>H-ASP: {current.formatY(data[hoveredPointIndex].hasp)}</span>
            </div>
            <div className="flex items-center gap-2 text-dtc-hot">
              <span className="w-2 h-2 rounded-full bg-dtc-hot" />
              <span>Monolithic: {current.formatY(data[hoveredPointIndex].monolithic)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Annotation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-dtc-cyan font-bold">
            <span className="w-4 h-0.5 bg-dtc-cyan shadow-[0_0_8px_#00F0FF]" />
            <span>H-ASP Proposed Design (70-20-10 Split)</span>
          </div>
          <div className="flex items-center gap-2 text-dtc-hot">
            <span className="w-4 h-0.5 bg-dtc-hot border-b border-dashed" />
            <span>Monolithic Cold Plate (Uniform Flow)</span>
          </div>
        </div>

        <p className="text-slate-400 font-sans text-xs italic">
          {current.annotation}
        </p>
      </div>
    </div>
  );
};
