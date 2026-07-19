"use client";

import { motion } from "framer-motion";
import { ShoeBoxScene } from "@/app/components/ShoeBox/ShoeBoxScene";

type HeroEntryProps = {
  opened: boolean;
  onEnter: () => void;
};

export function HeroEntry({ opened, onEnter }: HeroEntryProps) {
  return (
    <section id="top" className="relative grid min-h-[100svh] place-items-center overflow-hidden px-4 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,143,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(241,230,191,0.1),transparent_44%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 space-y-5 lg:order-1"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#a8a8a8]">Luxury Sneaker Archive</p>
          <h1 className="text-5xl font-semibold leading-[0.92] text-white sm:text-7xl lg:text-8xl">SneakPeek</h1>
          <p className="max-w-lg text-base text-[#d9d9d9] sm:text-lg">Every Pair Has A Story</p>
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#f1e6bf]/60 px-8 py-3 text-sm uppercase tracking-[0.2em] text-[#f1e6bf] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1e6bf]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#f1e6bf]/20 to-transparent transition duration-700 group-hover:translate-x-full" />
            Enter Collection
          </button>
          {opened ? <p className="text-sm text-[#d9d9d9]">Tap to open. Scroll to begin the chapter.</p> : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="order-1 h-[330px] overflow-hidden rounded-3xl border border-white/10 bg-black/35 shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:h-[480px] lg:order-2"
        >
          <ShoeBoxScene opened={opened} />
        </motion.div>
      </div>
    </section>
  );
}
