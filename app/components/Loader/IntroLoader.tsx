"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type IntroLoaderProps = {
  onComplete: () => void;
};

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const value = Math.floor(eased * 100);
      setProgress(value);

      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 350);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050505]"
      aria-live="polite"
      aria-label="Loading SneakPeek"
    >
      <div className="pointer-events-none relative w-[min(90vw,560px)]">
        <div className="absolute inset-0 blur-3xl bg-[radial-gradient(circle_at_center,rgba(13,93,255,0.25),transparent_55%)]" />
        <motion.div
          initial={{ scale: 0.96, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
        >
          <p className="text-xs uppercase tracking-[0.34em] text-[#a8a8a8]">SneakPeek</p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Assembling the Reveal</h1>
          <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d9d9d9] via-[#f1e6bf] to-[#4f8fff]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-[#a8a8a8]">
            <span>Material calibration</span>
            <span>{progress}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
