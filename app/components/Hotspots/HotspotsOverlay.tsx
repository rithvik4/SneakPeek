"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ShoeHotspot } from "@/app/data/shoes";

type HotspotsOverlayProps = {
  hotspots: ShoeHotspot[];
};

export function HotspotsOverlay({ hotspots }: HotspotsOverlayProps) {
  const [active, setActive] = useState(hotspots[0]?.id);

  return (
    <div className="relative min-h-[320px] rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(13,93,255,0.18),transparent_48%),#0a0a0a] p-6 sm:min-h-[420px]">
      <p className="text-xs uppercase tracking-[0.28em] text-[#a8a8a8]">Interactive Hotspots</p>

      <div className="absolute inset-0">
        {hotspots.map((spot) => {
          const isActive = active === spot.id;

          return (
            <button
              key={spot.id}
              type="button"
              onMouseEnter={() => setActive(spot.id)}
              onFocus={() => setActive(spot.id)}
              onClick={() => setActive(spot.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              aria-label={`Show details for ${spot.label}`}
            >
              <motion.span
                animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.66 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex size-6 items-center justify-center rounded-full border border-[#d9d9d9]/80 bg-[#050505]/90 text-[10px] text-white"
              >
                +
              </motion.span>
              <motion.span
                animate={{ scale: isActive ? 1.9 : 1.3, opacity: isActive ? 0.34 : 0.15 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 rounded-full border border-[#f1e6bf]"
              />
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur">
        {hotspots
          .filter((spot) => spot.id === active)
          .map((spot) => (
            <div key={spot.id}>
              <p className="text-sm font-semibold tracking-wide text-white">{spot.label}</p>
              <ul className="mt-2 space-y-1 text-sm text-[#d9d9d9]">
                {spot.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
