export interface ApplicationCard {
  id: string;
  title: string;
  category: string;
  powerDensity: string;
  description: string;
  whyDtc: string;
  keyBenefit: string;
  icon: string;
}

export const APPLICATIONS_DATA: ApplicationCard[] = [
  {
    id: "ai-datacenters",
    title: "Hyperscale AI Data Centers",
    category: "Infrastructure",
    powerDensity: "40kW – 100kW+ per rack",
    description: "Multi-megawatt facilities running large cluster training (10,000+ GPUs) for frontier foundation models like GPT, Claude, and Gemini.",
    whyDtc: "Air cooling maxes out at ~30kW/rack. H-ASP Direct-to-Chip cooling enables 100kW+ rack densities, slashing facility space by 60% and dropping cooling PUE to 1.15.",
    keyBenefit: "Enables 3.5× higher compute density per square meter",
    icon: "Server",
  },
  {
    id: "gpu-servers",
    title: "Dense 8-Way GPU Server Blades",
    category: "Hardware",
    powerDensity: "6.4kW per 2U chassis (8x H100 SXM5)",
    description: "High-density compute nodes pairing 8x NVIDIA H100 SXM5 GPUs interconnected via NVLink-4 switches running non-stop matrix tensor calculations.",
    whyDtc: "Eliminates high-RPM screaming delta fans, reduces internal chassis acoustic noise from 85dB to near-silent operation, and eliminates thermal throttling.",
    keyBenefit: "100% sustained GPU boost clocks without throttling",
    icon: "Cpu",
  },
  {
    id: "hpc-supercomputing",
    title: "Scientific Supercomputing & HPC",
    category: "Science & Simulation",
    powerDensity: "Exascale compute clusters",
    description: "National laboratories running climate modeling, molecular dynamics, nuclear astrophysics, and quantum chemistry simulations.",
    whyDtc: "Tight temperature uniformity across all memory and compute dies ensures identical numerical floating-point execution and minimizes system-wide jitter.",
    keyBenefit: "Maximizes mean time between failures (MTBF)",
    icon: "Atom",
  },
  {
    id: "edge-ai",
    title: "Edge AI & Harsh Environment Nodes",
    category: "Edge Computing",
    powerDensity: "Sealed chassis (500W – 2kW)",
    description: "Autonomous robotics, military field defense units, and industrial vision pods operating in dusty, sealed, or high-ambient outdoor environments.",
    whyDtc: "Direct liquid cooling allows completely sealed IP67 dustproof enclosures with no external air intake filters or fan maintenance required.",
    keyBenefit: "Zero maintenance in dusty/corrosive outdoor environments",
    icon: "Shield",
  },
  {
    id: "cloud-inference",
    title: "Cloud AI Real-Time Inference Fleets",
    category: "Cloud Services",
    powerDensity: "Dynamic variable loads (100W–750W)",
    description: "Multi-tenant cloud infrastructure serving millions of real-time conversational AI, multimodal video generation, and search queries.",
    whyDtc: "Rapid thermal response time handles sudden traffic spikes in milliseconds without junction temperature spikes or power capping.",
    keyBenefit: "25–40% lower operational pumping power overhead",
    icon: "CloudLightning",
  },
  {
    id: "workstations",
    title: "Extreme AI Developer Workstations",
    category: "Workstations",
    powerDensity: "Quad-GPU desk-side systems (3kW)",
    description: "Local AI research workstations deployed in university laboratories, startups, and enterprise engineering offices.",
    whyDtc: "Provides quiet, library-level acoustic operation (<32dB) right next to researchers while cooling 4x flagship accelerators under full load.",
    keyBenefit: "Acoustically silent high-power desk-side development",
    icon: "Monitor",
  },
];

export const FUTURE_SCOPE_ROADMAP = [
  {
    phase: "PHASE 01 — CURRENT",
    title: "Heterogeneous Single-Phase H-ASP",
    timeline: "Completed Research",
    status: "Validated",
    description: "Validated 70-20-10 passive manifold distribution, 3D printed pure copper microchannels, achieving 0.053 K/W thermal resistance for NVIDIA H100 SXM5.",
    badge: "Current Milestone",
    color: "#00F0FF",
  },
  {
    phase: "PHASE 02 — SHORT TERM",
    title: "Micro-Convective Two-Phase Evaporation",
    timeline: "Next Iteration",
    status: "In Development",
    description: "Transitioning to low-GWP dielectric two-phase fluids utilizing latent heat of vaporization in Zone A to achieve sub-0.035 K/W thermal resistance at PUE 1.07.",
    badge: "Next Phase",
    color: "#FF9500",
  },
  {
    phase: "PHASE 03 — MEDIUM TERM",
    title: "Silicon-Embedded In-Die Microchannels",
    timeline: "Research & Scaling",
    status: "Concept Exploration",
    description: "Etching microchannels directly into the backside of the silicon wafer (3D IC co-design) to completely eliminate TIM thermal resistance ($R_{TIM} \\to 0$).",
    badge: "Advanced Scaling",
    color: "#10B981",
  },
  {
    phase: "PHASE 04 — LONG TERM",
    title: "AI-Driven Autonomous Flow Balancing",
    timeline: "Future Horizon",
    status: "Vision",
    description: "Integrating embedded micro-piezoelectric valves with telemetry-driven ML models to dynamically shift coolant in microseconds based on active GPU tensor kernels.",
    badge: "Autonomous Thermal AI",
    color: "#8B5CF6",
  },
];
