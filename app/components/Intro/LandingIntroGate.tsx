"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

// ─── Shoe pool ────────────────────────────────────────────────────────────────
// Six unique premium sneaker product images with transparent backgrounds.
// All shoes are the same size for visual consistency.

const SHOE_POOL = [
  { src: "/images/shoedrop1.png", alt: "Sneaker 1", baseSize: 120 },
  { src: "/images/shoedrop5.png", alt: "Sneaker 5", baseSize: 300 },
  { src: "/images/shoedrop3.png", alt: "Sneaker 3", baseSize: 120 },
  { src: "/images/shoedrop2.png", alt: "Sneaker 2", baseSize: 120 },
  { src: "/images/shoedrop6.png", alt: "Sneaker 6", baseSize: 300 },
  { src: "/images/shoedrop4.png", alt: "Sneaker 4", baseSize: 120 },
] as const;

const SHOE_COUNT = SHOE_POOL.length;

// ─── Types ────────────────────────────────────────────────────────────────────

type ShoeConfig = {
  src: string;
  alt: string;
  /** Horizontal center of this shoe as a fraction of viewport width (0–1). */
  xFraction: number;
  /** Y position of the "ground" line for this shoe as a fraction of viewport height. */
  floorFraction: number;
  /** Extra delay (seconds) before this shoe starts falling. */
  dropDelay: number;
  /** Rotation while falling (degrees). */
  fallRotate: number;
  /** Rotation while resting on ground (degrees). */
  landRotate: number;
  /** Which way the shoe scatters. */
  scatterDir: -1 | 1;
  /** Rendered px width. */
  size: number;
  /** Horizontal velocity during fall (pixels per second). */
  vx: number;
};

// ─── Config builder ───────────────────────────────────────────────────────────

function buildShoeConfigs(): ShoeConfig[] {
  // Drop zone: 250–350px wide, centered near top of viewport.
  // Shoes spawn sequentially from left to right across this zone.
  const dropZoneCenterFraction = 0.5;
  const dropZoneWidthVw = 0.22; // ~250–350px on typical viewport

  return SHOE_POOL.map((shoe, i) => {
    // Sequential X positions across the drop zone (left to right).
    // Shoe 0 starts left, Shoe N starts right.
    const positionInZone = i / (SHOE_POOL.length - 1);
    const xFraction = dropZoneCenterFraction - dropZoneWidthVw / 2 + positionInZone * dropZoneWidthVw;

    // Sequential spawn timing: 120–180ms between each shoe.
    // Base delay increases by ~150ms per shoe, with ±30ms variation.
    const baseDelay = i * 0.15;
    const dropDelay = baseDelay + (Math.random() - 0.5) * 0.06;

    // Horizontal velocity during fall (pixels per second).
    // Creates natural left-right separation while shoes fall.
    const vx = (Math.random() - 0.5) * 180;

    // Random rotation: −20° to +20°.
    const fallRotate = (Math.random() - 0.5) * 40;

    // Scatter direction: randomly left or right after settling.
    const scatterDir: -1 | 1 = Math.random() < 0.5 ? -1 : 1;

    return {
      src: shoe.src,
      alt: shoe.alt,
      xFraction,
      floorFraction: 0.48,
      dropDelay,
      fallRotate,
      landRotate: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 6),
      scatterDir,
      size: shoe.baseSize,
      vx,
    };
  });
}

// ─── Impact sound (Web Audio API) ─────────────────────────────────────────────

let _audioCtx: AudioContext | null = null;

function playImpact(intensity = 1) {
  if (typeof window === "undefined") return;
  const AC =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  if (!_audioCtx) _audioCtx = new AC();
  const ctx = _audioCtx;

  const fire = () => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(88 * intensity, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.22);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12 * intensity, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.28);
  };

  if (ctx.state === "suspended") {
    void ctx.resume().then(fire).catch(() => undefined);
    return;
  }
  fire();
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LandingIntroGate({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isComplete, setIsComplete] = useState(false);
  const showIntro = !prefersReducedMotion && !isComplete;

  // Configs are randomised once at component mount and stay stable.
  // Lazy useState ensures buildShoeConfigs() runs only once and is safe during render.
  const [configs] = useState<ShoeConfig[]>(() => buildShoeConfigs());

  // DOM refs for each animated element.
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const welcomeRef = useRef<HTMLDivElement | null>(null);
  const shoeRefs = useRef<Array<HTMLDivElement | null>>(Array.from({ length: SHOE_COUNT }, () => null));
  const shadowRefs = useRef<Array<HTMLDivElement | null>>(Array.from({ length: SHOE_COUNT }, () => null));

  useEffect(() => {
    if (prefersReducedMotion || isComplete) return;

    // ── Lock scrolling ───────────────────────────────────────────────────────
    const { documentElement: html, body } = document;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevTouchAction = body.style.touchAction;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";

    let alreadyUnlocked = false;
    const unlock = () => {
      if (alreadyUnlocked) return;
      alreadyUnlocked = true;
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevTouchAction;
    };

    // ── GSAP context (scopes all animations, enables clean revert) ───────────
    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // ── Phase 0: initial state ─────────────────────────────────────────────
      configs.forEach((cfg, i) => {
        const shoe = shoeRefs.current[i];
        const shadow = shadowRefs.current[i];
        if (!shoe || !shadow) return;

        // Shoe starts well above the viewport.
        // The shoe container's natural position (GSAP y=0) is at the floor line.
        // We offset upward by (floor position + shoe height + 150px safety gap).
        const aboveScreen = -(vh * cfg.floorFraction + cfg.size + 150);
        gsap.set(shoe, {
          y: aboveScreen,
          rotation: cfg.fallRotate * 0.45,
          filter: "blur(12px)",
          scale: 1,
        });

        gsap.set(shadow, {
          scaleX: 0.18,
          scaleY: 0.16,
          opacity: 0,
        });
      });

      gsap.set(welcomeRef.current, { opacity: 0, y: 18, scale: 0.95 });

      // ── Phase 1: drops + bounces (per-shoe, overlapping) ─────────────────
      let latestSettleAt = 0;

      configs.forEach((cfg, i) => {
        const shoe = shoeRefs.current[i];
        const shadow = shadowRefs.current[i];
        if (!shoe || !shadow) return;

        const FALL_DUR = 0.78 + Math.random() * 0.08;
        const DROP_AT = 0.2 + cfg.dropDelay;
        const LAND_AT = DROP_AT + FALL_DUR;

        // Floor y inside the shoe wrapper (shoe bottom touches floor at y=0).
        // We want shoe bottom at floor, so shoe top is at −size.
        // The wrapper's CSS top is at floorFraction*vh, and the shoe img is inside,
        // so GSAP y=0 means shoe top at wrapper top = floor line.
        // We land at y = -cfg.size so the bottom of the shoe image is exactly at the floor.
        const floorY = -cfg.size;
        const b1h = Math.max(50, vh * 0.095);
        const b2h = Math.max(19, vh * 0.038);

        // Fall: vertical drop + horizontal drift for natural separation
        gsap.to(shoe, {
          y: floorY,
          x: cfg.vx * FALL_DUR,
          rotation: cfg.fallRotate,
          filter: "blur(0px)",
          duration: FALL_DUR,
          ease: "power3.in",
          delay: DROP_AT,
        });
        gsap.to(shadow, {
          scaleX: 0.88,
          scaleY: 0.82,
          opacity: 0.22,
          duration: FALL_DUR,
          ease: "power2.in",
          delay: DROP_AT,
        });

        // Impact squash + sound
        gsap.to(shoe, {
          scaleX: 1.06,
          scaleY: 0.93,
          duration: 0.07,
          ease: "none",
          delay: LAND_AT,
          onStart: () => playImpact(0.62 + Math.random() * 0.46),
        });
        gsap.to(shadow, {
          scaleX: 1.24,
          scaleY: 0.88,
          opacity: 0.3,
          duration: 0.07,
          ease: "none",
          delay: LAND_AT,
        });

        // Bounce 1 up
        const t1 = LAND_AT + 0.07;
        gsap.to(shoe, {
          y: floorY - b1h,
          scaleX: 1,
          scaleY: 1,
          rotation: cfg.landRotate * 0.6,
          duration: 0.26,
          ease: "power2.out",
          delay: t1,
        });
        gsap.to(shadow, {
          scaleX: 0.52,
          scaleY: 0.48,
          opacity: 0.1,
          duration: 0.26,
          ease: "power2.out",
          delay: t1,
        });

        // Bounce 1 down
        const t2 = t1 + 0.26;
        gsap.to(shoe, {
          y: floorY,
          rotation: cfg.landRotate,
          scaleX: 1.03,
          scaleY: 0.97,
          duration: 0.2,
          ease: "power2.in",
          delay: t2,
        });
        gsap.to(shadow, {
          scaleX: 0.94,
          scaleY: 0.88,
          opacity: 0.24,
          duration: 0.2,
          ease: "power2.in",
          delay: t2,
        });

        // Bounce 2 up
        const t3 = t2 + 0.2;
        gsap.to(shoe, {
          y: floorY - b2h,
          scaleX: 1,
          scaleY: 1,
          duration: 0.14,
          ease: "power2.out",
          delay: t3,
        });
        gsap.to(shadow, {
          scaleX: 0.7,
          scaleY: 0.66,
          opacity: 0.14,
          duration: 0.14,
          ease: "power2.out",
          delay: t3,
        });

        // Final settle
        const t4 = t3 + 0.14;
        gsap.to(shoe, {
          y: floorY,
          scaleX: 1,
          scaleY: 1,
          duration: 0.11,
          ease: "power1.in",
          delay: t4,
        });
        gsap.to(shadow, {
          scaleX: 0.84,
          scaleY: 0.78,
          opacity: 0.19,
          duration: 0.11,
          ease: "power1.in",
          delay: t4,
        });

        latestSettleAt = Math.max(latestSettleAt, t4 + 0.11);
      });

      // ── Camera shake on the first shoe's impact ───────────────────────────
      const firstImpact = 0.2 + configs[0].dropDelay + 0.78;
      const shakeFrames = [
        { d: firstImpact + 0.01, x: 4 },
        { d: firstImpact + 0.05, x: -3 },
        { d: firstImpact + 0.09, x: 1.5 },
        { d: firstImpact + 0.13, x: 0 },
      ];
      shakeFrames.forEach(({ d, x }) =>
        gsap.to(overlayRef.current, { x, duration: 0.04, ease: "none", delay: d })
      );

      // ── Phase 2: scatter ──────────────────────────────────────────────────
      const SCATTER_START = latestSettleAt + 0.3;

      configs.forEach((cfg, i) => {
        const shoe = shoeRefs.current[i];
        const shadow = shadowRefs.current[i];
        if (!shoe || !shadow) return;

        // Scatter intensity: some shoes exit far off-screen, others settle partway
        const scatterIntensity = 0.4 + Math.random() * 0.6; // 0.4–1.0
        const exitX = cfg.scatterDir * (vw * scatterIntensity + 280);
        const scatterAt = SCATTER_START + i * 0.042;
        const scatterDur = 0.56 + Math.random() * 0.14;
        const slideRot = cfg.scatterDir * (15 + Math.random() * 11);

        gsap.to(shoe, {
          x: exitX,
          y: -cfg.size - 28,
          rotation: cfg.landRotate + slideRot,
          filter: "blur(9px)",
          duration: scatterDur,
          ease: "power2.in",
          delay: scatterAt,
        });
        gsap.to(shadow, {
          x: exitX * 0.87,
          opacity: 0,
          scaleX: 0.26,
          scaleY: 0.26,
          duration: scatterDur,
          ease: "power2.in",
          delay: scatterAt,
        });
      });

      // ── Phase 3: welcome text ─────────────────────────────────────────────
      const WELCOME_AT = SCATTER_START + 0.18;

      gsap.to(welcomeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.52,
        ease: "power2.out",
        delay: WELCOME_AT,
      });
      gsap.to(welcomeRef.current, {
        opacity: 0,
        duration: 0.38,
        ease: "power2.in",
        delay: WELCOME_AT + 0.72,
      });

      // ── Phase 4: homepage reveal ──────────────────────────────────────────
      const REVEAL_AT = WELCOME_AT + 0.68;

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.44,
        ease: "power2.inOut",
        delay: REVEAL_AT,
        onComplete: () => {
          unlock();
          setIsComplete(true);
        },
      });
    });

    return () => {
      ctx.revert();
      unlock();
    };
  }, [configs, isComplete, prefersReducedMotion]);

  return (
    <div className="relative">
      {/* ── Homepage content ────────────────────────────────────────────────── */}
      {/* Hidden during intro; CSS transition provides the "come into focus" reveal. */}
      <div
        aria-hidden={showIntro ? true : undefined}
        style={{
          opacity: isComplete ? 1 : 0,
          filter: isComplete ? "blur(0px)" : "blur(5px)",
          transform: isComplete ? "translateY(0px)" : "translateY(18px)",
          transition: isComplete
            ? "opacity 0.92s cubic-bezier(0.22,1,0.36,1), filter 0.92s cubic-bezier(0.22,1,0.36,1), transform 0.92s cubic-bezier(0.22,1,0.36,1)"
            : "none",
          pointerEvents: showIntro ? "none" : "auto",
          userSelect: showIntro ? "none" : "auto",
        }}
      >
        {children}
      </div>

      {/* ── Intro overlay ────────────────────────────────────────────────────── */}
      {showIntro && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[120] overflow-hidden bg-[var(--background)]"
          aria-hidden="true"
        >
          {/* Ambient gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_22%_14%,rgba(255,255,255,0.52),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_78%_82%,rgba(17,17,17,0.055),transparent)]" />
          </div>

          {/* Subtle floor rule */}
          <div className="pointer-events-none absolute inset-x-0 top-[52%] h-px bg-black/[0.04]" />

          {/* Six shoes */}
          {configs.map((cfg, i) => {
            const shadowWidth = cfg.size * 0.68;

            return (
              <div key={i} className="pointer-events-none absolute inset-0">
                {/* Ground shadow */}
                <div
                  ref={el => {
                    shadowRefs.current[i] = el;
                  }}
                  style={{
                    position: "absolute",
                    left: `${cfg.xFraction * 100}%`,
                    top: `${cfg.floorFraction * 100}%`,
                    width: `${shadowWidth}px`,
                    height: "18px",
                    marginLeft: `-${shadowWidth / 2}px`,
                    marginTop: "4px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.22)",
                    filter: "blur(8px)",
                    transformOrigin: "center center",
                  }}
                />

                {/* Shoe wrapper — floor-anchored; GSAP y moves shoe above/at floor */}
                <div
                  ref={el => {
                    shoeRefs.current[i] = el;
                  }}
                  style={{
                    position: "absolute",
                    left: `${cfg.xFraction * 100}%`,
                    top: `${cfg.floorFraction * 100}%`,
                    width: `${cfg.size}px`,
                    marginLeft: `-${cfg.size / 2}px`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <Image
                    src={cfg.src}
                    alt={cfg.alt}
                    width={cfg.size * 2}
                    height={cfg.size * 2}
                    priority
                    sizes={`${cfg.size * 2}px`}
                    className="h-auto w-full object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.28)]"
                  />
                </div>
              </div>
            );
          })}

          {/* Welcome message */}
          <div
            ref={welcomeRef}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: 0 }}
          >
            <div className="text-center">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.44em] text-black/36 sm:text-[11px]">
                A Luxury Sneaker Archive
              </p>
              <h2
                className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#111] sm:text-5xl lg:text-[3.4rem]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Welcome to SneakPeek
              </h2>
              <p className="mt-3 text-sm text-black/38 sm:text-[0.95rem]">
                Step into your collection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
