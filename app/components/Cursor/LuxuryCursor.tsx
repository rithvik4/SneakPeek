"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function LuxuryCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 500, damping: 36 });
  const springY = useSpring(y, { stiffness: 500, damping: 36 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove);

    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <>
      <motion.div
        style={{ left: springX, top: springY }}
        className="pointer-events-none fixed z-[120] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1e6bf] shadow-[0_0_16px_rgba(241,230,191,0.8)] md:block"
      />
      <motion.div
        style={{ left: springX, top: springY }}
        className="pointer-events-none fixed z-[119] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9d9d9]/60 md:block"
      />
    </>
  );
}
