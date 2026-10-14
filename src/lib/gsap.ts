// src/lib/gsap.ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

  // Disable lag smoothing — Lenis controls timing
  gsap.ticker.lagSmoothing(0);

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    start: "top 85%",
    toggleActions: "play none none none",
  });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
