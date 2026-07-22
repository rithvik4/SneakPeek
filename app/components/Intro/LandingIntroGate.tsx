"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie, FrameEvent } from "@lottiefiles/dotlottie-web";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

// ─── Component ────────────────────────────────────────────────────────────────

export function LandingIntroGate({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isComplete, setIsComplete] = useState(false);
  
  // showIntro is true only when animation not complete AND no reduced motion preference
  const showIntro = !prefersReducedMotion && !isComplete;

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const welcomeRef = useRef<HTMLDivElement | null>(null);
  const frameTrimmedRef = useRef(false);

  // Called when the animation completes
  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const dotLottieRef = useRef<DotLottie | null>(null);

  // Store the DotLottie instance
  const dotLottieRefCallback = useCallback((dotLottie: DotLottie | null) => {
    dotLottieRef.current = dotLottie;
  }, []);

  // Set up animation trimming to 347 frames (~5.78 seconds)
  useEffect(() => {
    if (!dotLottieRef.current) return;

    const TRIM_FRAME = 347;
    
    // Handle frame event - stop at 347 frames
    const handleFrame = (event: FrameEvent) => {
      if (event.currentFrame >= TRIM_FRAME && !frameTrimmedRef.current) {
        frameTrimmedRef.current = true;
        console.log(`⏹ Animation trimmed at frame ${TRIM_FRAME}`);
        dotLottieRef.current?.pause();
        handleComplete();
      }
    };

    dotLottieRef.current.addEventListener("frame", handleFrame);

    // Fallback: Calculate expected duration and trigger completion
    // 347 frames ÷ 60fps ≈ 5.78s + 2s for welcome sequence ≈ 7.78s
    const timer = setTimeout(() => {
      if (!frameTrimmedRef.current) {
        console.log("✅ Animation timeout triggered (fallback)");
        handleComplete();
      }
    }, 7800);

    return () => {
      clearTimeout(timer);
      dotLottieRef.current?.removeEventListener("frame", handleFrame);
    };
  }, [handleComplete]);

  useEffect(() => {
    console.log("LandingIntroGate mounted", {
      prefersReducedMotion,
      isComplete,
      showIntro,
    });
  }, [prefersReducedMotion, isComplete, showIntro]);

  useEffect(() => {
    const { documentElement: html, body } = document;

    if (showIntro) {
      // Lock scrolling during intro
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      // Release scroll lock after intro
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }
  }, [showIntro]);

  return (
    <div className="relative">
      {/* Homepage content */}
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

      {/* Intro overlay */}
      {showIntro && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[var(--background)]"
          aria-hidden="true"
        >
          {/* Ambient gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_22%_14%,rgba(255,255,255,0.52),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_78%_82%,rgba(17,17,17,0.055),transparent)]" />
          </div>

          {/* Lottie animation */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <DotLottieReact
              src="/animations/vjAAK1e7fa.lottie"
              autoplay
              loop={false}
              dotLottieRefCallback={dotLottieRefCallback}
              className="h-full w-full"
            />
          </div>

          {/* Welcome message - hidden until lottie completes */}
          <div
            ref={welcomeRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: 0, transform: "translateY(18px) scale(0.95)" }}
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
