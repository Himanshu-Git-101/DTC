export interface ChartDataPoint {
  x: number;
  monolithic: number;
  hasp: number;
  label?: string;
}

export const THERMAL_RESISTANCE_VS_FLUX_DATA: ChartDataPoint[] = [
  { x: 25, monolithic: 0.082, hasp: 0.058 },
  { x: 50, monolithic: 0.083, hasp: 0.057 },
  { x: 75, monolithic: 0.086, hasp: 0.056 },
  { x: 100, monolithic: 0.091, hasp: 0.055 },
  { x: 125, monolithic: 0.098, hasp: 0.054 },
  { x: 150, monolithic: 0.108, hasp: 0.054 },
  { x: 175, monolithic: 0.122, hasp: 0.053 },
  { x: 200, monolithic: 0.142, hasp: 0.053 },
];

export const PRESSURE_DROP_VS_FLOW_DATA: ChartDataPoint[] = [
  { x: 0.25, monolithic: 850, hasp: 520 },
  { x: 0.50, monolithic: 2400, hasp: 1450 },
  { x: 0.75, monolithic: 5200, hasp: 3100 },
  { x: 1.00, monolithic: 9800, hasp: 5890 },
  { x: 1.25, monolithic: 16500, hasp: 9900 },
  { x: 1.50, monolithic: 25500, hasp: 15200 },
  { x: 1.75, monolithic: 38000, hasp: 22800 },
  { x: 2.00, monolithic: 54000, hasp: 32400 },
];

export const HOTSPOT_TEMP_VS_FLOW_DATA: ChartDataPoint[] = [
  { x: 0.4, monolithic: 45.2, hasp: 33.5 },
  { x: 0.6, monolithic: 41.8, hasp: 30.8 },
  { x: 0.8, monolithic: 39.5, hasp: 29.1 },
  { x: 1.0, monolithic: 37.3, hasp: 27.6 },
  { x: 1.2, monolithic: 35.8, hasp: 26.4 },
  { x: 1.4, monolithic: 34.6, hasp: 25.5 },
  { x: 1.6, monolithic: 33.7, hasp: 24.8 },
  { x: 1.8, monolithic: 33.0, hasp: 24.2 },
  { x: 2.0, monolithic: 32.5, hasp: 23.8 },
];

export const COMPARISON_TABLE = [
  {
    factor: "Cooling Medium",
    conventional: "Forced Air / Heatsink Fans",
    monolithicDtc: "Liquid (Water-Glycol PG25)",
    haspDtc: "Liquid with Heterogeneous Flux Matching",
    highlight: false,
  },
  {
    factor: "Heat Interface",
    conventional: "Indirect (IHS + Bulky Air Fin Stack)",
    monolithicDtc: "Direct-to-Chip (Uniform Channels)",
    haspDtc: "Direct-to-Chip (Area-Specific 70/20/10 Microchannels)",
    highlight: true,
  },
  {
    factor: "High Heat Flux (>200 W/cm²)",
    conventional: "Severe Thermal Throttling / Unviable",
    monolithicDtc: "Prone to Localized Hotspot Starvation",
    haspDtc: "Engineered 70% Flow Allocation to Core",
    highlight: true,
  },
  {
    factor: "Hydraulic Pressure Drop",
    conventional: "High Fan Static Pressure (Acoustic Noise)",
    monolithicDtc: "High Uniform Friction Loss (~5890 Pa)",
    haspDtc: "20%–40% Lower Pressure Drop (~3500–4100 Pa)",
    highlight: true,
  },
  {
    factor: "Pumping / Operating Power",
    conventional: "High Fan Power Draw (~15–20% of Server)",
    monolithicDtc: "Baseline Liquid Pumping (1.00x)",
    haspDtc: "25%–40% Reduction in Pumping Power (0.60–0.75x)",
    highlight: true,
  },
  {
    factor: "Thermal Resistance (R_th)",
    conventional: "> 0.20 K/W",
    monolithicDtc: "0.0757 K/W",
    haspDtc: "0.053 – 0.060 K/W (20–30% Lower)",
    highlight: true,
  },
  {
    factor: "Facility PUE Impact",
    conventional: "PUE ~1.4 – 1.6 (High AC Overhead)",
    monolithicDtc: "PUE ~1.20",
    haspDtc: "PUE 1.15 (Single-Phase) / 1.07 (Two-Phase Ready)",
    highlight: false,
  },
];

export const ENGINEERING_CHALLENGES = [
  {
    id: "challenge-1",
    title: "Extreme Non-Uniform Flux Density",
    tagline: "20× Spatial Variation Across Silicon",
    problem: "The GH100 compute core dissipates ~218 W/cm² while surrounding memory and I/O dissipate only 11–23 W/cm². Uniform cold plates starve the core while oversupplying cold coolant to cold zones.",
    solution: "H-ASP implements a heterogeneous 3-zone microchannel architecture with a passive 70-20-10 manifold flow split, matching fluid volume directly to heat generation.",
    icon: "Flame",
    color: "#FF3B30",
  },
  {
    id: "challenge-2",
    title: "Hydraulic Pressure Penalty vs Fin Density",
    tagline: "The Narrow Microchannel Trade-Off",
    problem: "Making microchannels ultra-narrow across the entire die creates massive fluid friction (Darcy-Weisbach loss), demanding unsustainable pump power and thick manifold walls.",
    solution: "Restrict ultra-dense microchannels (150µm) strictly to the 2.2 cm² compute core, while widening channels in Zone B (350µm) and Zone C (800µm) to reduce total pressure drop by up to 40%.",
    icon: "Gauge",
    color: "#FF9500",
  },
  {
    id: "challenge-3",
    title: "Micro-Additive Copper Manufacturability",
    tagline: "Sub-200 Micron Pure Copper 3D Printing",
    problem: "Conventional CNC milling cannot easily machine varying fin heights and complex 3D internal distribution manifolds into high-conductivity pure copper without high cost and burrs.",
    solution: "Designed for Selective Laser Melting (SLM) metal 3D printing in pure copper (Cu-ETP) with optimized laser scan strategies for 120µm wall thicknesses and internal flow baffles.",
    icon: "Printer",
    color: "#10B981",
  },
  {
    id: "challenge-4",
    title: "Zero-Tolerance Leak Prevention",
    tagline: "Dielectric & EPDM Gasket Reliability",
    problem: "Direct-to-Chip designs place pressurized liquid millimeters away from 700W electronic compute boards, where any fluid egress results in catastrophic system failure.",
    solution: "Integrated dual-barrier laser-welded manifold covers, O-ring compression channels, negative-pressure loop compatibility, and non-conductive PG25 coolant formulation.",
    icon: "ShieldAlert",
    color: "#00F0FF",
  },
  {
    id: "challenge-5",
    title: "Sub-Millimeter Packaging Constraints",
    tagline: "Fitting 1U/2U High-Density Server Blades",
    problem: "Data center server racks limit vertical clearance above GPU boards to under 25mm, including quick-disconnect fittings and coolant tube bend radiuses.",
    solution: "Ultra-low-profile 14mm cold plate height with low-profile 90° blind-mate quick disconnects and top-entry integrated manifold headers.",
    icon: "Minimize2",
    color: "#8B5CF6",
  },
  {
    id: "challenge-6",
    title: "Transient Thermal Shock & Inception",
    tagline: "Handling Millisecond AI Inference Spikes",
    problem: "Large Language Model (LLM) batch inference causes instantaneous power surges from 200W idle to 750W peak in under 10 milliseconds, risking localized dryout.",
    solution: "The high thermal mass of the copper base combined with high-speed convective velocity in Zone A absorbs thermal shocks without temperature spikes or flow instability.",
    icon: "Zap",
    color: "#EC4899",
  },
];
