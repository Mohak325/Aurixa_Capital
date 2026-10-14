// src/components/providers/SmoothScrollProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // Sync Lenis RAF with GSAP ticker
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    // Sync ScrollTrigger updates with Lenis scroll events
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current?.lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [prefersReduced]);

  // Skip Lenis for users who prefer reduced motion
  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        syncTouch: false, // Keep native touch momentum
        autoRaf: false,   // We manually call raf in the GSAP ticker
      }}
    >
      {children}
    </ReactLenis>
  );
}
