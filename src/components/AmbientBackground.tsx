// src/components/AmbientBackground.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const astrolabeTopRef = useRef<SVGSVGElement>(null);
  const compassMidRef = useRef<SVGSVGElement>(null);
  const geometryBotRef = useRef<SVGSVGElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);

  const [visibleOpacity, setVisibleOpacity] = useState(0);
  const prefersReduced = useReducedMotion();

  // 1. Reliable scroll-based visibility controller (fades in as user scrolls out of Hero)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.45;
      const fullThreshold = window.innerHeight * 0.85;

      if (scrollY <= heroThreshold) {
        setVisibleOpacity(0);
      } else if (scrollY >= fullThreshold) {
        setVisibleOpacity(1);
      } else {
        const progress = (scrollY - heroThreshold) / (fullThreshold - heroThreshold);
        setVisibleOpacity(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. GSAP Scroll-Triggered Parallax, Rotations & Orbital Drifts
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Astrolabe Top (Clocks & About) — 360° Clockwise Rotation + Downward Parallax
      if (astrolabeTopRef.current) {
        gsap.to(astrolabeTopRef.current, {
          rotation: 360,
          y: 450,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      }

      // Compass Mid (Services, International, Process) — Counter-Clockwise Rotation + Parallax
      if (compassMidRef.current) {
        gsap.to(compassMidRef.current, {
          rotation: -280,
          y: 350,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }

      // Geometry Bottom (Why Us, FAQ, Contact) — Subtle expansion & continuous drift
      if (geometryBotRef.current) {
        gsap.to(geometryBotRef.current, {
          rotation: 180,
          y: -200,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
      }

      // Glowing Ambient Orbs — Organic Scroll-Linked Drifts
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: "-=22vw",
          y: "+=140vh",
          scale: 1.35,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: "+=26vw",
          y: "-=90vh",
          scale: 1.25,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2.4,
          },
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          y: "+=110vh",
          x: "+=18vw",
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
          },
        });
      }

      if (orb4Ref.current) {
        gsap.to(orb4Ref.current, {
          y: "-=120vh",
          x: "-=15vw",
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // 3. High-Definition Luminous Constellation Canvas (Clear & Visible)
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool with visible radiant stars
    const count = Math.min(65, Math.floor(width / 24));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.08,
      radius: Math.random() * 1.5 + 1.1, // 1.1px to 2.6px (sharp, visible)
      baseAlpha: Math.random() * 0.45 + 0.35, // 0.35 to 0.80 opacity
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.002 + 0.0015,
    }));

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const render = (time: number) => {
      // Parallax response to scroll velocity
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      scrollVelocity = scrollVelocity * 0.88 + deltaScroll * 0.12;
      lastScrollY = currentScrollY;

      ctx.clearRect(0, 0, width, height);

      // Render glowing constellation strands & stars
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy - scrollVelocity * 0.06;

        // Wrap around viewport edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Sinusoidal gentle twinkle
        const alpha = Math.min(1, Math.max(0.15, p.baseAlpha + Math.sin(time * p.pulseSpeed + p.phase) * 0.2));

        // Outer stardust glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 201, 138, ${alpha * 0.25})`;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 196, ${alpha})`;
        ctx.fill();

        // Connect nearby stars with luminous gold strands
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const lineAlpha = (1 - dist / 135) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 95, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden transition-opacity duration-700 ease-out will-change-transform"
      style={{ opacity: visibleOpacity }}
      aria-hidden="true"
    >
      {/* ══════════════════════════════════════════════════════════════
          LAYER 1: Radiant Floating Ambient Beacons (Gold + Sapphire + Emerald)
      ══════════════════════════════════════════════════════════════ */}
      {/* Beacon 1: Imperial Gold Radiant Beacon (Top Right) */}
      <div
        ref={orb1Ref}
        className="absolute -top-20 right-[-8vw] w-[65vw] max-w-[850px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(212,175,95,0.22)_0%,rgba(180,135,45,0.10)_40%,transparent_70%)] blur-[75px] will-change-transform"
      />

      {/* Beacon 2: Deep Royal Sapphire & Midnight Indigo (Center-Left) */}
      <div
        ref={orb2Ref}
        className="absolute top-[35vh] left-[-12vw] w-[70vw] max-w-[950px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,rgba(30,41,59,0.16)_45%,transparent_70%)] blur-[90px] will-change-transform"
      />

      {/* Beacon 3: Champagne Gold Warm Glow (Lower-Right) */}
      <div
        ref={orb3Ref}
        className="absolute top-[65vh] right-[10vw] w-[55vw] max-w-[700px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(230,201,138,0.16)_0%,rgba(201,162,77,0.08)_40%,transparent_70%)] blur-[65px] will-change-transform"
      />

      {/* Beacon 4: Emerald Wealth Accent (Bottom-Left) */}
      <div
        ref={orb4Ref}
        className="absolute bottom-[-10vh] left-[20vw] w-[45vw] max-w-[600px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.09)_0%,rgba(5,150,105,0.04)_40%,transparent_70%)] blur-[75px] will-change-transform"
      />

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2: Visible Celestial Astrolabes & Compass Geometry
      ══════════════════════════════════════════════════════════════ */}
      {/* Element A: Upper Astrolabe (ClockStrip / About Section) */}
      <div className="absolute top-[8vh] right-[-15vw] sm:right-[-6vw] lg:right-[1vw] w-[600px] sm:w-[750px] lg:w-[920px] aspect-square opacity-25 will-change-transform pointer-events-none">
        <svg
          ref={astrolabeTopRef}
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(201,162,77,0.35)]"
        >
          {/* Outer Astrolabe Degree Ring */}
          <circle cx="500" cy="500" r="485" stroke="#C9A24D" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="500" cy="500" r="460" stroke="#E6C98A" strokeWidth="1" />
          <circle cx="500" cy="500" r="435" stroke="#D4AF5F" strokeWidth="0.75" strokeDasharray="2 10" />

          {/* Golden Ratio Nested Inscribed Rings */}
          <circle cx="500" cy="500" r="340" stroke="#E6C98A" strokeWidth="1.2" />
          <circle cx="500" cy="500" r="250" stroke="#C9A24D" strokeWidth="0.8" strokeDasharray="6 8" />
          <circle cx="500" cy="500" r="160" stroke="#E6C98A" strokeWidth="1" />
          <circle cx="500" cy="500" r="70" stroke="#F5E6C4" strokeWidth="1.5" />

          {/* Coordinate Crosshairs & Cardinal Degree Guides */}
          <line x1="15" y1="500" x2="985" y2="500" stroke="#E6C98A" strokeWidth="1" strokeDasharray="10 10" />
          <line x1="500" y1="15" x2="500" y2="985" stroke="#E6C98A" strokeWidth="1" strokeDasharray="10 10" />
          <line x1="155" y1="155" x2="845" y2="845" stroke="#C9A24D" strokeWidth="0.75" strokeDasharray="5 15" />
          <line x1="845" y1="155" x2="155" y2="845" stroke="#C9A24D" strokeWidth="0.75" strokeDasharray="5 15" />

          {/* Elliptical Orbital Projections */}
          <ellipse cx="500" cy="500" rx="460" ry="190" stroke="#E6C98A" strokeWidth="1.2" strokeDasharray="8 6" />
          <ellipse cx="500" cy="500" rx="190" ry="460" stroke="#E6C98A" strokeWidth="1.2" strokeDasharray="8 6" />
          <ellipse cx="500" cy="500" rx="460" ry="290" stroke="#D4AF5F" strokeWidth="0.8" transform="rotate(35 500 500)" />
          <ellipse cx="500" cy="500" rx="460" ry="290" stroke="#D4AF5F" strokeWidth="0.8" transform="rotate(-35 500 500)" />

          {/* Astrolabe Pointer & Horizon Indicators */}
          <polygon points="500,40 515,90 485,90" fill="#E6C98A" />
          <polygon points="500,960 515,910 485,910" fill="#E6C98A" />
          <polygon points="40,500 90,485 90,515" fill="#E6C98A" />
          <polygon points="960,500 910,485 910,515" fill="#E6C98A" />
        </svg>
      </div>

      {/* Element B: Mid-Page Celestial Compass & Wealth Spiral (Services / International / Process) */}
      <div className="absolute top-[48vh] left-[-15vw] sm:left-[-8vw] lg:left-[2vw] w-[550px] sm:w-[700px] lg:w-[850px] aspect-square opacity-22 will-change-transform pointer-events-none">
        <svg
          ref={compassMidRef}
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_18px_rgba(230,201,138,0.3)]"
        >
          {/* Compass Rings */}
          <circle cx="450" cy="450" r="420" stroke="#C9A24D" strokeWidth="1.2" />
          <circle cx="450" cy="450" r="390" stroke="#E6C98A" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="450" cy="450" r="280" stroke="#D4AF5F" strokeWidth="1" />
          <circle cx="450" cy="450" r="180" stroke="#E6C98A" strokeWidth="1.2" strokeDasharray="2 8" />
          <circle cx="450" cy="450" r="80" stroke="#F5E6C4" strokeWidth="1.5" />

          {/* 16-Point Compass Rose Star Rays */}
          <polygon points="450,70 465,435 450,450 435,435" fill="rgba(230,201,138,0.4)" />
          <polygon points="450,830 465,465 450,450 435,465" fill="rgba(230,201,138,0.4)" />
          <polygon points="70,450 435,435 450,450 435,465" fill="rgba(230,201,138,0.4)" />
          <polygon points="830,450 465,435 450,450 465,465" fill="rgba(230,201,138,0.4)" />

          {/* Diagonal secondary rays */}
          <line x1="180" y1="180" x2="720" y2="720" stroke="#C9A24D" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="720" y1="180" x2="180" y2="720" stroke="#C9A24D" strokeWidth="1" strokeDasharray="8 8" />

          {/* Meridian arcs */}
          <ellipse cx="450" cy="450" rx="380" ry="160" stroke="#E6C98A" strokeWidth="0.8" transform="rotate(45 450 450)" />
          <ellipse cx="450" cy="450" rx="380" ry="160" stroke="#E6C98A" strokeWidth="0.8" transform="rotate(-45 450 450)" />
        </svg>
      </div>

      {/* Element C: Lower Geometric Lattice Node (Why Us / FAQ / Contact) */}
      <div className="absolute top-[75vh] right-[-5vw] lg:right-[15vw] w-[500px] sm:w-[650px] aspect-square opacity-20 will-change-transform pointer-events-none">
        <svg
          ref={geometryBotRef}
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(201,162,77,0.25)]"
        >
          {/* Concentric Hexagons / Sacred Cube */}
          <polygon points="400,100 660,250 660,550 400,700 140,550 140,250" stroke="#E6C98A" strokeWidth="1.2" strokeDasharray="6 6" />
          <polygon points="400,180 590,290 590,510 400,620 210,510 210,290" stroke="#C9A24D" strokeWidth="1" />
          <polygon points="400,260 520,330 520,470 400,540 280,470 280,330" stroke="#E6C98A" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle cx="400" cy="400" r="220" stroke="#D4AF5F" strokeWidth="1" />
          <circle cx="400" cy="400" r="100" stroke="#F5E6C4" strokeWidth="1.2" />

          {/* Internal diagonal lattice axes */}
          <line x1="400" y1="100" x2="400" y2="700" stroke="#E6C98A" strokeWidth="0.8" strokeDasharray="8 8" />
          <line x1="140" y1="250" x2="660" y2="550" stroke="#E6C98A" strokeWidth="0.8" strokeDasharray="8 8" />
          <line x1="140" y1="550" x2="660" y2="250" stroke="#E6C98A" strokeWidth="0.8" strokeDasharray="8 8" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3: Vertical Golden Meridian Coordinates & Hairlines
      ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex justify-between px-[6vw] lg:px-[10vw] opacity-15 pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold-400)] to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold-400)] to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 4: Interactive Shimmering Constellation Canvas
      ══════════════════════════════════════════════════════════════ */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
