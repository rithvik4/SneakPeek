"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
      smoothWheel: true
    });

    let raf = 0;

    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [enabled]);
}
