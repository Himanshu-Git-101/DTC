import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: "INITIALIZING THERMAL SYSTEM...", detail: "Mounting NVIDIA H100 SXM5 telemetry bus (700W TDP)..." },
    { text: "LOADING COOLANT LOOP...", detail: "Priming PG25 fluid lines & establishing 70-20-10 passive manifold split..." },
    { text: "CALIBRATING H-ASP SENSORS...", detail: "Zone A: 218 W/cm² | Zone B: 23 W/cm² | Zone C: 11 W/cm²" },
    { text: "SYSTEM READY", detail: "Thermal resistance calibrated at 0.053 K/W. Engaging interactive case study." },
  ];

  useEffect(() => {
    // Check if user already saw bootloader in this session
    const hasSeenBoot = sessionStorage.getItem('dtc_boot_complete');
    if (hasSeenBoot) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('dtc_boot_complete', 'true');
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 30) setStepIndex(0);
    else if (progress < 65) setStepIndex(1);
    else if (progress < 90) setStepIndex(2);
    else setStepIndex(3);
  }, [progress]);

  const handleSkip = () => {
    sessionStorage.setItem('dtc_boot_complete', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dtc-bg text-slate-100 p-6 select-none bg-tech-grid"
    >
      <div className="absolute top-6 left-6 flex items-center gap-3 font-mono text-xs text-slate-500">
        <Terminal className="w-4 h-4 text-dtc-cyan animate-pulse" />
        <span>DTC_DIAGNOSTICS_V2.4 // BOOT_SEQUENCE</span>
      </div>

      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 font-mono text-xs text-slate-400 hover:text-dtc-cyan border border-slate-800 hover:border-dtc-cyan/40 px-3 py-1.5 rounded transition-colors"
      >
        [ESC] SKIP BOOT
      </button>

      <div className="w-full max-w-lg glass-panel p-8 rounded-2xl relative hud-corner border border-dtc-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-dtc-cyan shadow-[0_0_10px_#00F0FF] animate-ping" />
            <span className="font-mono text-sm tracking-widest text-dtc-cyan font-semibold">
              DTC // THERMAL-X
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {progress}%
          </span>
        </div>

        {/* Dynamic Step Text */}
        <div className="min-h-[110px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                {stepIndex === 3 ? (
                  <ShieldCheck className="w-5 h-5 text-dtc-green" />
                ) : (
                  <Activity className="w-5 h-5 text-dtc-cyan animate-spin" />
                )}
                <h3 className="font-mono text-base md:text-lg font-bold tracking-wider text-slate-100">
                  {steps[stepIndex].text}
                </h3>
              </div>
              <p className="font-mono text-xs text-slate-400 pl-7 leading-relaxed">
                {steps[stepIndex].detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-dtc-cyan to-dtc-hot"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-slate-400">
            <span>MEM: 80GB HBM3 OK</span>
            <span>FLUX: 218 W/cm² DETECTED</span>
            <span>MANIFOLD: 70/20/10 LOCKED</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-slate-400 font-mono text-xs">
        <Cpu className="w-4 h-4 text-slate-400" />
        <span>Woxsen University AI Thermal Engineering Laboratory</span>
      </div>
    </motion.div>
  );
};
