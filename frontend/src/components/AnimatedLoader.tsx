"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, Activity, Dna, Cpu, FileCheck } from "lucide-react";

const loaderSteps = [
  { text: "Starting secure check...", icon: ShieldCheck },
  { text: "Reviewing the test fields...", icon: Activity },
  { text: "Running the risk model...", icon: Cpu },
  { text: "Finding what affected the result...", icon: Dna },
  { text: "Preparing the risk result...", icon: FileCheck },
];

export function AnimatedLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < loaderSteps.length - 1 ? prev + 1 : prev));
    }, 800); // Progress every 800ms

    return () => clearInterval(interval);
  }, []);

  const Icon = loaderSteps[currentStep].icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-24 h-24 rounded-full border-2 border-dashed border-primary/40"
        />
        {/* Inner pulsing solid ring */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute w-16 h-16 rounded-full bg-primary/20"
        />
        {/* Center icon that pops in when changed */}
        <motion.div
          key={currentStep}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground relative z-10 shadow-lg"
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>

      <div className="text-center space-y-2">
        <motion.p
          key={loaderSteps[currentStep].text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-bold text-foreground"
        >
          {loaderSteps[currentStep].text}
        </motion.p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Step {currentStep + 1} of {loaderSteps.length}
        </p>
      </div>
    </div>
  );
}
