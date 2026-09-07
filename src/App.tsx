import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Common Components
import { BootLoader } from './components/common/BootLoader';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Story Sections
import { Hero } from './components/hero/Hero';
import { ProjectSnapshot } from './components/snapshot/ProjectSnapshot';
import { ProblemSection } from './components/problem/ProblemSection';
import { TraditionalVsDTC } from './components/comparison/TraditionalVsDTC';
import { BeforeAfterSlider } from './components/comparison/BeforeAfterSlider';
import { SolutionSection } from './components/solution/SolutionSection';
import { ColdPlateExplorer } from './components/coldplate/ColdPlateExplorer';
import { FlowCrossSection } from './components/coldplate/FlowCrossSection';
import { ExplodedView } from './components/coldplate/ExplodedView';
import { SystemArchitecture } from './components/architecture/SystemArchitecture';
import { HowItWorks } from './components/architecture/HowItWorks';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { VirtualLab } from './components/engineering/VirtualLab';
import { DesignPhilosophy } from './components/engineering/DesignPhilosophy';
import { EngineeringChallenges } from './components/engineering/EngineeringChallenges';
import { ApplicationsGrid } from './components/applications/ApplicationsGrid';
import { FutureScope } from './components/roadmap/FutureScope';
import { ProjectJourney } from './components/roadmap/ProjectJourney';
import { TechStackShowcase } from './components/developer/TechStackShowcase';
import { TeamSection } from './components/developer/TeamSection';
import { FinalCTA } from './components/cta/FinalCTA';

export function App() {
  const [bootComplete, setBootComplete] = useState<boolean>(() => {
    return sessionStorage.getItem('dtc_boot_complete') === 'true';
  });

  return (
    <div className="min-h-screen bg-dtc-bg text-slate-100 flex flex-col selection:bg-dtc-cyan selection:text-black">
      {/* High-tech Diagnostic Boot Sequence */}
      <AnimatePresence>
        {!bootComplete && <BootLoader onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      {/* Main App Navigation */}
      <Navbar />

      {/* Interactive Case Study Content */}
      <main className="flex-1 w-full overflow-hidden">
        {/* 1. Hero & Visual Telemetry */}
        <Hero />

        {/* 2. Horizontal Project Snapshot */}
        <ProjectSnapshot />

        {/* 3. The Problem & Thermal Load Simulator */}
        <ProblemSection />

        {/* 4. Traditional vs DTC Comparison */}
        <TraditionalVsDTC />

        {/* 5. Before / After Thermal Extraction */}
        <BeforeAfterSlider />

        {/* 6. H-ASP 3-Zone Architecture & Shortened Thermal Path */}
        <SolutionSection />

        {/* 7. CAD Cold Plate Explorer */}
        <ColdPlateExplorer />

        {/* 8. Internal Microchannel Streamlines Cross-Section */}
        <section className="py-12 bg-dtc-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FlowCrossSection />
          </div>
        </section>

        {/* 9. 3D Exploded View Assembly */}
        <ExplodedView />

        {/* 10. Data Center System Architecture */}
        <SystemArchitecture />

        {/* 11. How It Works (6-Step Operational Story) */}
        <HowItWorks />

        {/* 12. Analytical Validation, Benchmark Charts & Governing Math */}
        <ResultsDashboard />

        {/* 13. Virtual Engineering Lab (Interactive Multi-Variable Sandbox) */}
        <VirtualLab />

        {/* 14. Design Philosophy Trade-Offs */}
        <DesignPhilosophy />

        {/* 15. The Hard Part (6 Engineering Challenges) */}
        <EngineeringChallenges />

        {/* 16. Real-World Applications Grid */}
        <ApplicationsGrid />

        {/* 17. Future Research Roadmap */}
        <FutureScope />

        {/* 18. Project Development Journey */}
        <ProjectJourney />

        {/* 19. Web Development Internship Portfolio Tech Stack */}
        <TechStackShowcase />

        {/* 20. Engineering Team & Woxsen University Credits */}
        <TeamSection />

        {/* 21. Final High-Impact CTA */}
        <FinalCTA />
      </main>

      {/* Engineering Footer */}
      <Footer />
    </div>
  );
}

export default App;
