import type { SimulationParams, SimulationOutputs } from '../types';

/**
 * Calculates real-time thermal and fluid dynamics for the H-ASP vs Monolithic cold plate
 */
export function calculateThermalPhysics(params: SimulationParams): SimulationOutputs {
  const { thermalLoad, flowRate, finDensity, ambientCoolantTemp } = params;

  // Mass flow distribution (H-ASP: 70% Core, 20% HBM, 10% IO)
  const flowA = flowRate * 0.70; // LPM to Zone A

  // Core power proportion (~68.5% in compute core die, 480W out of 700W)
  const powerA = thermalLoad * (480 / 700);

  // Convective scaling factors based on flow velocity and microchannel density
  const normalizedFlow = Math.max(0.1, flowA / 0.84); // 0.84 LPM is baseline (70% of 1.2 LPM)
  const normalizedFin = Math.max(0.2, finDensity / 120);

  // Convective resistance inverse of (h * Area * eta)
  const R_cond = 0.014;
  const R_conv_A = 0.039 / (Math.pow(normalizedFlow, 0.65) * Math.pow(normalizedFin, 0.45));
  const R_th_hasp = R_cond + R_conv_A;

  // Fluid caloric temperature rise: ΔT_fluid = P / (m_dot * Cp)
  const massFlowTotalKgPerSec = (flowRate / 60) * 1.0;
  const deltaTFluid = (thermalLoad / (massFlowTotalKgPerSec * 4184)) * 0.5;

  // Peak hotspot junction temperature
  const hotspotTemp = ambientCoolantTemp + (powerA * R_th_hasp) + deltaTFluid;
  const avgJunctionTemp = ambientCoolantTemp + (thermalLoad * (R_th_hasp * 0.75)) + (deltaTFluid * 0.7);

  // Darcy-Weisbach Pressure Drop: ΔP ~ f * (L/Dh) * (rho * v^2 / 2)
  const deltaP = 3800 * Math.pow(flowRate / 1.0, 1.75) * Math.pow(normalizedFin, 1.2);

  // Hydraulic pumping power: W_pump = ΔP * Q (in m^3/s)
  const flowM3s = (flowRate / 60) / 1000;
  const pumpingPower = deltaP * flowM3s;

  const isOverheating = hotspotTemp > 82.0;
  const isHighPressureWarning = deltaP > 35000;

  let statusMessage = "Optimal Thermal State: Sub-30°C Hotspot Delta";
  if (isOverheating && isHighPressureWarning) {
    statusMessage = "Critical: Severe Thermal Throttling & Extreme Hydraulic Pressure";
  } else if (isOverheating) {
    statusMessage = "Warning: Silicon Junction Approaching 85°C Max Thermal Limit";
  } else if (isHighPressureWarning) {
    statusMessage = "Warning: High Manifold Pressure Drop (>35 kPa)";
  }

  return {
    hotspotTemp: Number(hotspotTemp.toFixed(1)),
    avgJunctionTemp: Number(avgJunctionTemp.toFixed(1)),
    thermalResistance: Number(R_th_hasp.toFixed(4)),
    pressureDrop: Math.round(deltaP),
    pumpingPower: Number(pumpingPower.toFixed(2)),
    flowSplitRatio: [70, 20, 10],
    isOverheating,
    isHighPressureWarning,
    statusMessage,
  };
}

/**
 * Calculates monolithic cold plate baseline physics for comparison
 */
export function calculateMonolithicPhysics(thermalLoad: number, flowRate: number): {
  hotspotTemp: number;
  thermalResistance: number;
  pressureDrop: number;
  pumpingPower: number;
} {
  // Monolithic has uniform flow (33.3% to each zone), starving Zone A
  const flowA_mono = flowRate * 0.333;
  const normalizedFlowMono = Math.max(0.1, flowA_mono / 0.84);
  const R_cond = 0.016;
  const R_conv_mono = 0.0597 / Math.pow(normalizedFlowMono, 0.65);
  const R_th_mono = R_cond + R_conv_mono;

  const powerA = thermalLoad * (480 / 700);
  const massFlowTotalKgPerSec = (flowRate / 60) * 1.0;
  const deltaTFluid = (thermalLoad / (massFlowTotalKgPerSec * 4184)) * 0.7;

  const hotspotTemp = 25.0 + (powerA * R_th_mono) + deltaTFluid;
  const deltaP = 5890 * Math.pow(flowRate / 1.0, 1.75);
  const flowM3s = (flowRate / 60) / 1000;
  const pumpingPower = deltaP * flowM3s;

  return {
    hotspotTemp: Number(hotspotTemp.toFixed(1)),
    thermalResistance: Number(R_th_mono.toFixed(4)),
    pressureDrop: Math.round(deltaP),
    pumpingPower: Number(pumpingPower.toFixed(2)),
  };
}
