// src/sections/HeroSection.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

// ─── Data ──────────────────────────────────────────────────
interface HeroSectionProps {
  entranceReady?: boolean;
  onEntranceComplete?: () => void;
}

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&auto=format&fit=crop",
    alt: "Dubai UAE illuminated skyscraper skyline at night",
    label: "Dubai (UAE)",
  },
  {
    url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80&auto=format&fit=crop",
    alt: "Singapore Marina Bay financial district skyline at night",
    label: "Singapore",
  },
  {
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80&auto=format&fit=crop",
    alt: "Europe illuminated architectural skyline at night",
    label: "Europe",
  },
];

const KPIS = [
  { value: "20+", label: "Years Industry Expertise", sub: "EXP" },
  { value: "10-Step", label: "End-to-End Advisory Process", sub: "PROCESS" },
  { value: "100%", label: "Litigation-Free Due Diligence", sub: "VERIFY" },
  { value: "4+", label: "Global Corridors & India", sub: "GLOBAL" },
];

gsap.registerPlugin(ScrollTrigger);

// ─── Utility: split text into word spans ───────────────────
function splitWords(text: string, className?: string): { __html: string } {
  const words = text.split(" ");
  const html = words
    .map(
      (w, i) =>
        `<span class="word-mask" style="display:inline-block;overflow:hidden;vertical-align:bottom;perspective:600px;"><span class="word-inner ${className ?? ""}" style="display:inline-block;transform:translateY(120%) rotateX(35deg);opacity:0;filter:blur(8px);transform-origin:bottom left;will-change:transform,opacity,filter;">${w}</span></span>${i < words.length - 1 ? "&nbsp;" : ""}`
    )
    .join("");
  return { __html: html };
}

// ─── Slide indicator (image count + progress bar) ─────────
function SlideIndicator({
  current,
  total,
  labels,
}: {
  current: number;
  total: number;
  labels: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5" aria-label={`Slide ${current + 1} of ${total}`}>
      {/* Counter */}
      <div className="flex items-center gap-2">
        <span className="font-body text-[0.65rem] text-[var(--color-ivory-50)] tabular-nums tracking-[0.12em]">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="h-px transition-all duration-700"
              style={{
                width: i === current ? "20px" : "8px",
                background: i === current
                  ? "var(--color-gold-300)"
                  : "rgba(201,162,77,0.3)",
              }}
            />
          ))}
        </div>
        <span className="font-body text-[0.65rem] text-[rgba(244,239,228,0.4)] tabular-nums tracking-[0.12em]">
          {String(total).padStart(2, "0")}
        </span>
      </div>
      {/* Current label */}
      <p className="font-body text-[0.6rem] text-[var(--color-gold-500)] uppercase tracking-[0.2em]">
        {labels[current]}
      </p>
    </div>
  );
}

// ─── Main Hero ─────────────────────────────────────────────
export default function HeroSection({
  entranceReady = false,
  onEntranceComplete,
}: HeroSectionProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const slidesWrapRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustMetaRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [slideReady, setSlideReady] = useState(false);

  // ── Live clock ──
  useEffect(() => {
    const tick = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Image slideshow ──
  useEffect(() => {
    if (!slideReady) return;
    const DURATION = 6000;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, DURATION);
    return () => clearInterval(id);
  }, [slideReady]);

  // Crossfade slides with GSAP when activeSlide changes
  useEffect(() => {
    if (!slideReady || prefersReduced) return;
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeSlide) {
        gsap.to(el, { opacity: 1, scale: 1.04, duration: 1.2, ease: "power2.out" });
        // Slow ken-burns zoom
        gsap.to(el, { scale: 1, duration: 6, ease: "none" });
      } else {
        gsap.to(el, { opacity: 0, duration: 1.0, ease: "power2.inOut" });
      }
    });
  }, [activeSlide, slideReady, prefersReduced]);

  // ── Mouse parallax ──
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let running = true;
    const tick = () => {
      if (!running) return;
      const { x, y } = mouseRef.current;
      const dx = (x - 0.5) * 2;   // –1 … +1
      const dy = (y - 0.5) * 2;

      // Layer 1: image — slow, opposite
      if (slidesWrapRef.current) {
        gsap.to(slidesWrapRef.current, {
          xPercent: dx * -1.5,
          yPercent: dy * -1.2,
          duration: 2.8,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
      // Layer 2: content — subtle same direction
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: dx * 6,
          y: dy * 4,
          duration: 2.0,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
      // Layer 3: KPI cards — opposite, faster
      if (kpiRef.current) {
        gsap.to(kpiRef.current, {
          x: dx * -10,
          y: dy * -8,
          duration: 1.6,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReduced, handleMouseMove]);

  // ── Entrance choreography ──
  useEffect(() => {
    if (!entranceReady) return;
    setSlideReady(true);

    if (prefersReduced) {
      if (slideRefs.current[0]) gsap.set(slideRefs.current[0], { opacity: 1, scale: 1 });
      if (chapterRef.current) gsap.set(chapterRef.current, { opacity: 1 });
      if (ruleRef.current) gsap.set(ruleRef.current, { scaleX: 1, opacity: 1 });
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll<HTMLElement>(".hero-title-line");
        gsap.set(lines, { yPercent: 0, opacity: 1 });
      }
      if (sublineRef.current) {
        const sublines = sublineRef.current.querySelectorAll<HTMLElement>(".hero-subline-item");
        gsap.set(sublines, { yPercent: 0, opacity: 1 });
      }
      if (buttonsRef.current?.children) gsap.set(Array.from(buttonsRef.current.children), { opacity: 1, y: 0 });
      if (trustMetaRef.current) gsap.set(trustMetaRef.current, { opacity: 1, y: 0 });
      if (kpiRef.current?.children) gsap.set(Array.from(kpiRef.current.children), { opacity: 1, x: 0 });
      if (bottomBarRef.current) gsap.set(bottomBarRef.current, { opacity: 1, y: 0 });
      if (scrollCueRef.current) gsap.set(scrollCueRef.current, { opacity: 1 });
      onEntranceComplete?.();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: onEntranceComplete,
    });

    // 0. Initial states
    const validSlides = slideRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (validSlides[0]) {
      gsap.set(validSlides[0], { opacity: 0, scale: 1.15 });
    }
    if (validSlides.length > 1) {
      gsap.set(validSlides.slice(1), { opacity: 0 });
    }

    // 1. Background image slides in + scale-down
    if (validSlides[0]) {
      tl.to(validSlides[0], {
        opacity: 1,
        scale: 1,
        duration: 2.6,
        ease: "power2.out",
      }, 0);
    }

    // 2. Chapter label
    if (chapterRef.current) {
      tl.fromTo(
        chapterRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.3
      );
    }

    // 3. Eyebrow badge
    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        0.35
      );
    }

    // 4. Gold flourish rule draws L→R
    if (ruleRef.current) {
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.0, ease: "power3.inOut", transformOrigin: "left" },
        0.42
      );
    }

    // 5. Header Line (H1): 3 lines cascade up
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll<HTMLElement>(".hero-title-line");
      tl.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        },
        0.5
      );
    }

    // 6. Subheader: The 3 sentences cascade up
    if (sublineRef.current) {
      const sublines = sublineRef.current.querySelectorAll<HTMLElement>(".hero-subline-item");
      tl.fromTo(
        sublines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.85
      );
    }

    // 7. CTA Buttons
    if (buttonsRef.current?.children) {
      tl.fromTo(
        Array.from(buttonsRef.current.children),
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        1.1
      );
    }

    // 8. Trust meta strip
    if (trustMetaRef.current) {
      tl.fromTo(
        trustMetaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        1.25
      );
    }

    // 10. KPI cards cascade from right
    if (kpiRef.current?.children) {
      tl.fromTo(
        Array.from(kpiRef.current.children),
        { opacity: 0, x: 45 },
        { opacity: 1, x: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" },
        1.15
      );
    }

    // 11. Bottom bar
    if (bottomBarRef.current) {
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.5
      );
    }

    // 12. Scroll cue
    if (scrollCueRef.current) {
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.65
      );
    }

    return () => { tl.kill(); };
  }, [entranceReady, prefersReduced, onEntranceComplete]);

  // ── Scroll-based parallax exit ──
  useGSAP(() => {
    if (!containerRef.current || !contentRef.current || !slidesWrapRef.current) return;

    // Image parallax on scroll
    gsap.to(slidesWrapRef.current, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Content floats up on scroll
    gsap.to(contentRef.current, {
      yPercent: -8,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "10% top",
        end: "60% top",
        scrub: 1.2,
      },
    });
  }, { scope: containerRef });

  const scrollToNext = () => {
    document
      .getElementById("clock-strip")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[var(--color-ink-950)]"
      aria-label="Aurixa Capital"
    >
      {/* ═══════════════════════════════════════
          LAYER 1 — Crossfade image slides
      ═══════════════════════════════════════ */}
      <div
        ref={slidesWrapRef}
        className="absolute inset-[-4%] will-change-transform"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.url}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url("${slide.url}")`,
              opacity: 0,
              zIndex: i === activeSlide ? 1 : 0,
            }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          LAYER 2 — Multi-stop scrim
      ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(to top,
              rgba(8,7,6,0.97) 0%,
              rgba(8,7,6,0.72) 30%,
              rgba(8,7,6,0.28) 60%,
              rgba(8,7,6,0.50) 100%
            )
          `,
        }}
      />

      {/* ═══════════════════════════════════════
          LAYER 3 — All-corner ticks (expanded)
      ═══════════════════════════════════════ */}
      <div className="absolute inset-5 sm:inset-8 z-[3] pointer-events-none" aria-hidden="true">
        {/* TL */}
        <span className="absolute top-0 left-0 block w-5 h-5 border-t border-l border-[var(--color-gold-500)]" />
        {/* TR */}
        <span className="absolute top-0 right-0 block w-5 h-5 border-t border-r border-[var(--color-gold-500)]" />
        {/* BL */}
        <span className="absolute bottom-0 left-0 block w-5 h-5 border-b border-l border-[var(--color-gold-500)]" />
        {/* BR */}
        <span className="absolute bottom-0 right-0 block w-5 h-5 border-b border-r border-[var(--color-gold-500)]" />
      </div>

      {/* ═══════════════════════════════════════
          LAYER 4 — Chapter label (vertical left)
      ═══════════════════════════════════════ */}
      <div
        ref={chapterRef}
        className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-[10] hidden lg:flex flex-col items-center gap-4 opacity-0"
        aria-hidden="true"
      >
        <div className="h-16 w-px bg-[var(--hairline)]" />
        <p
          className="font-body text-[0.6rem] text-[var(--color-gold-500)] uppercase tracking-[0.28em]"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.28em" }}
        >
          01 / Home
        </p>
        <div className="h-16 w-px bg-[var(--hairline)]" />
      </div>

      {/* ═══════════════════════════════════════
          LAYER 5 — KPI Cards (right side, desktop)
      ═══════════════════════════════════════ */}
      <div
        ref={kpiRef}
        className="absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 z-[10] hidden lg:flex flex-col gap-3 will-change-transform"
      >
        {KPIS.map((kpi, i) => (
          <div
            key={kpi.sub}
            className={cn(
              "group relative flex flex-col gap-0.5 px-4 py-3 rounded-sm",
              "bg-gradient-to-b from-[#1C1711]/95 to-[#120F0A]/95 backdrop-blur-md",
              "border border-[var(--color-gold-500)]/45",
              "shadow-[inset_0_1px_0_rgba(245,230,196,0.18),0_12px_28px_rgba(0,0,0,0.85)]",
              "transition-all duration-300 cursor-default",
              "hover:border-[var(--color-gold-400)] hover:bg-[#221B13]",
              "hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(245,230,196,0.25),0_16px_36px_rgba(0,0,0,0.95),0_0_20px_rgba(201,162,77,0.15)]",
            )}
            style={{ opacity: 0 }} // animated in by GSAP
          >
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 h-px w-0 bg-[var(--color-gold-500)] transition-all duration-500 group-hover:w-full" />
            <p
              className="font-display font-light text-[var(--color-gold-300)] leading-none"
              style={{ fontSize: "clamp(1.5rem, 2vw, 2.25rem)" }}
            >
              {kpi.value}
            </p>
            <p className="font-body text-[0.625rem] text-[#D8D1C2] uppercase tracking-[0.16em] leading-tight max-w-[130px] font-medium">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          LAYER 6 — Main content (Centered, ~50% area coverage)
      ═══════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="relative z-[8] flex flex-col justify-center flex-1 min-h-[100svh] pt-24 sm:pt-28 lg:pt-24 pb-20 sm:pb-24 lg:pb-16 will-change-transform"
      >
        <div className="container-au w-full">
          {/* Text block commanding the hero space */}
          <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">

            {/* Eyebrow badge */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[var(--color-gold-500)]/45 bg-[#1C1711]/90 backdrop-blur-md mb-5 sm:mb-6 shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_4px_24px_rgba(0,0,0,0.6)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-300)] shadow-[0_0_8px_var(--color-gold-300)]" aria-hidden="true" />
              <span className="font-body text-[0.6875rem] uppercase tracking-[0.28em] text-[var(--color-gold-300)] font-semibold">
                Premier Investment &amp; Asset Management
              </span>
              <span className="hidden sm:inline-block h-3 w-px bg-[var(--color-gold-500)]/50" aria-hidden="true" />
              <span className="hidden sm:inline-block font-body text-[0.6875rem] uppercase tracking-[0.18em] text-[#D8D1C2] font-medium">
                20+ Years Experience
              </span>
            </div>

            {/* Gold rule — draws on entrance */}
            <div
              ref={ruleRef}
              className="mb-6 sm:mb-7 h-px bg-gradient-to-r from-[var(--color-gold-300)] via-[var(--color-gold-500)] to-transparent origin-left"
              style={{ width: "min(320px, 70%)" }}
              aria-hidden="true"
            />

            {/* H1 — Header Line in the middle of hero */}
            <h1
              ref={headlineRef}
              className="font-display font-light text-[var(--color-ivory-50)] leading-[1.08] sm:leading-[1.12] tracking-[-0.025em] mb-6 sm:mb-8"
              style={{ fontSize: "clamp(2.6rem, 1.75rem + 4vw, 5.85rem)" }}
            >
              <span className="block overflow-hidden pb-[0.24em] pt-[0.05em] -mb-[0.14em]">
                <span className="hero-title-line block">Building Wealth.</span>
              </span>
              <span className="block overflow-hidden pb-[0.24em] pt-[0.05em] -mb-[0.14em]">
                <span className="hero-title-line block text-gold-foil">Creating Assets.</span>
              </span>
              <span className="block overflow-hidden pb-[0.24em] pt-[0.05em] -mb-[0.14em]">
                <span className="hero-title-line block">Securing Your Future.</span>
              </span>
            </h1>

            {/* Subheader: The Three Sentences + CTA Buttons Row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-8 sm:mb-9">

              {/* The Three Sentences */}
              <div
                ref={sublineRef}
                className="flex flex-col gap-1.5 lg:max-w-[55%]"
              >
                {[
                  "Strategic Investments.",
                  "Smarter Decisions.",
                  "Stronger Futures.",
                ].map((line) => (
                  <div key={line} className="overflow-hidden pb-1 pt-0.5 -mb-0.5">
                    <p
                      className="hero-subline-item font-body font-semibold text-[var(--color-ivory-50)] leading-tight tracking-[-0.02em]"
                      style={{ fontSize: "clamp(1.3rem, 0.95rem + 1.1vw, 2.25rem)" }}
                    >
                      {line}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: CTA Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-wrap items-center gap-4 flex-shrink-0 lg:pb-1"
              >
                <Button
                  variant="primary"
                  as="button"
                  id="hero-primary-cta"
                  size="lg"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Book a Consultation
                </Button>
                <Button
                  variant="secondary"
                  as="button"
                  id="hero-secondary-cta"
                  size="lg"
                  onClick={() =>
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Trust / Accreditation Strip */}
            <div
              ref={trustMetaRef}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] sm:text-[0.72rem] tracking-[0.14em] text-[#D8D1C2] uppercase font-body"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-[#FAF7F2] font-medium">Advisory Desk Active</span>
              </div>
              <span className="text-[var(--color-gold-500)]/40" aria-hidden="true">|</span>
              <span className="text-[#D8D1C2]">End-to-End Asset Management</span>
              <span className="text-[var(--color-gold-500)]/40" aria-hidden="true">|</span>
              <span className="text-[#D8D1C2]">Litigation-Free Due Diligence</span>
              <span className="text-[var(--color-gold-500)]/40" aria-hidden="true">|</span>
              <span className="text-[#D8D1C2]">Dedicated Relationship Managers</span>
            </div>
          </div>

          {/* Mobile KPIs (2×2 grid, visible below lg) */}
          <div className="lg:hidden grid grid-cols-2 gap-2 mt-8">
            {KPIS.map((kpi) => (
              <div
                key={kpi.sub}
                className="flex flex-col gap-0.5 px-3.5 py-3 rounded-sm bg-gradient-to-b from-[#1C1711]/95 to-[#120F0A]/95 border border-[var(--color-gold-500)]/45 shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_8px_20px_rgba(0,0,0,0.85)]"
              >
                <p
                  className="font-display font-light text-[var(--color-gold-300)] leading-none"
                  style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}
                >
                  {kpi.value}
                </p>
                <p className="font-body text-[0.6rem] text-[#D8D1C2] uppercase tracking-[0.12em] leading-tight font-medium">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LAYER 7 — Bottom info bar
      ═══════════════════════════════════════ */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 right-0 z-[10] opacity-0"
      >
        {/* hairline */}
        <div className="h-px mx-5 sm:mx-8 bg-[var(--hairline)]" aria-hidden="true" />

        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 lg:py-4">
          {/* Left: slide indicator */}
          <SlideIndicator
            current={activeSlide}
            total={SLIDES.length}
            labels={SLIDES.map((s) => s.label)}
          />

          {/* Centre: tagline (desktop) */}
          <p className="hidden md:block font-body text-[0.65rem] text-[var(--color-stone-500)] uppercase tracking-[0.22em]">
            Your Trust. Our Expertise. Your Wealth. Our Commitment.
          </p>

          {/* Right: Mumbai time */}
          <div className="flex items-center gap-2 text-right">
            <div className="flex flex-col items-end gap-0.5">
              <p className="font-body text-[0.6rem] text-[var(--color-gold-500)] uppercase tracking-[0.14em]">
                Mumbai
              </p>
              <p
                className="font-display font-light text-[var(--color-ivory-200)] tabular-nums leading-none"
                style={{ fontSize: "1.05rem" }}
                aria-live="polite"
                aria-label={`Mumbai time: ${currentTime}`}
              >
                {currentTime}
              </p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)] animate-pulse" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LAYER 8 — Scroll cue (animated line + dot)
      ═══════════════════════════════════════ */}
      <div
        ref={scrollCueRef}
        className="absolute right-7 sm:right-10 bottom-20 z-[10] opacity-0 hidden sm:flex flex-col items-center gap-1"
      >
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-500)]"
          aria-label="Scroll to next section"
        >
          {/* Animated line */}
          <div className="relative h-14 w-px overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-[var(--color-gold-500)]"
              style={{
                height: "100%",
                animation: "scrollLineDown 2s cubic-bezier(0.22,1,0.36,1) infinite",
              }}
            />
          </div>
          {/* Scroll label */}
          <p
            className="font-body text-[0.55rem] text-[var(--color-stone-600)] uppercase tracking-[0.24em] group-hover:text-[var(--color-gold-500)] transition-colors duration-200"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </p>
        </button>
      </div>
    </section>
  );
}
