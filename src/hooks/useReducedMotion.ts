// src/hooks/useReducedMotion.ts
"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user prefers reduced motion.
 * Used to conditionally disable Lenis, GSAP animations, globe rotation, etc.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
