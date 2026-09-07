export interface ColdPlateZone {
  id: string;
  name: string;
  zoneLetter: 'A' | 'B' | 'C';
  targetComponent: string;
  heatFlux: number; // in W/cm^2
  power: number; // in W
  area: number; // in cm^2
  flowPercentage: number; // e.g. 70, 20, 10
  channelType: string;
  channelFinDensity: string;
  description: string;
  fluidDynamicRationale: string;
  color: string;
}

export interface AnalyticalResultMetric {
  metric: string;
  monolithicValue: string;
  haspValue: string;
  improvement: string;
  unit: string;
  explanation: string;
}

export interface GoverningEquation {
  id: string;
  title: string;
  latex: string;
  renderedFormula: string;
  symbolMap: { symbol: string; meaning: string; unit: string }[];
  description: string;
  engineeringSignificance: string;
}

export interface SystemStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  telemetryState: {
    tempInlet: string;
    tempOutlet: string;
    flowVelocity: string;
    heatFluxRemoved: string;
  };
  iconName: string;
}

export interface SimulationParams {
  thermalLoad: number; // 200 - 800 W
  flowRate: number; // 0.5 - 2.5 LPM
  finDensity: number; // 50 - 200 fins/cm
  ambientCoolantTemp: number; // 25 C
}

export interface SimulationOutputs {
  hotspotTemp: number;
  avgJunctionTemp: number;
  thermalResistance: number;
  pressureDrop: number;
  pumpingPower: number;
  flowSplitRatio: [number, number, number];
  isOverheating: boolean;
  isHighPressureWarning: boolean;
  statusMessage: string;
}

export interface TeamMember {
  name: string;
  role: string;
  institution: string;
  contribution: string;
}

export interface TechItem {
  name: string;
  category: string;
  description: string;
  roleInProject: string;
  icon: string;
}
