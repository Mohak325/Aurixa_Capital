// src/sections/AboutSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Globe,
  ChartLine,
  Handshake,
  CheckCircle,
  Buildings,
  Briefcase,
  Users,
  TrendUp,
  Sparkle,
  ArrowRight,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Numeric Counter ──────────────────────────────────────
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  label,
  sub,
  footnote,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  footnote?: string;
}) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const duration = 1600;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(ease * target);
        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(el);

    const fallbackTimer = setTimeout(() => {
      if (!animatedRef.current) {
        startAnimation();
      }
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [target]);

  return (
    <div
      ref={containerRef}
      className="group relative p-6 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)] rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_14px_32px_-8px_rgba(0,0,0,0.9)] transition-all duration-300 flex flex-col justify-between"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,77,0.14),_transparent_70%)]"
        aria-hidden="true"
      />

      <div>
        <div className="flex items-baseline justify-between mb-3 relative z-10">
          <span className="font-display font-light text-[var(--color-gold-300)] text-4xl sm:text-5xl tabular-nums leading-none tracking-tight">
            {prefix}
            {count}
            {suffix}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#F2DDA8] bg-[#262017] px-2 py-0.5 rounded border border-[var(--color-gold-500)]/45 font-semibold shadow-sm">
            VERIFIED
          </span>
        </div>
        <p className="font-body text-sm font-semibold text-[var(--color-ivory-50)] uppercase tracking-wider mb-1 relative z-10">
          {label}
        </p>
        <p className="font-body text-xs text-[#D8D1C2] leading-relaxed relative z-10">
          {sub}
        </p>
      </div>

      {footnote && (
        <div className="mt-4 pt-3 border-t border-[var(--color-gold-500)]/30 flex items-center gap-1.5 text-[10px] font-mono text-[#B8B09F] relative z-10 font-medium">
          <span className="text-[var(--color-gold-400)]">◆</span>
          <span>{footnote}</span>
        </div>
      )}
    </div>
  );
}

// ─── Data: 4 Core Pillars of Governance ───────────────────────────
interface Pillar {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  metricLabel: string;
  metricValue: string;
  image: string;
  icon: typeof ShieldCheck;
}

const PILLARS: Pillar[] = [
  {
    id: "preservation",
    tag: "PILLAR I · RISK ARCHITECTURE",
    title: "Capital Preservation First",
    headline: "Downside Protection via Forensic Clean-Title Mandates",
    description:
      "Every property and alternative asset undergoes forensic 6-point legal title verification, chain examination, and downside stress-testing before client capital is deployed.",
    deliverables: [
      "100% litigation-free title verification by senior legal counsel",
      "Senior-secured physical property backing with zero speculative exposure",
    ],
    metricLabel: "DILIGENCE CLEARANCE",
    metricValue: "100%",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
    icon: ShieldCheck,
  },
  {
    id: "corridors",
    tag: "PILLAR II · GLOBAL GATEWAYS",
    title: "Cross-Border Wealth",
    headline: "Dual-Jurisdiction Compliance Across India, UAE, Singapore & Europe",
    description:
      "Seamless cross-border tax optimization, FEMA compliance, NRE/NRO banking repatriation, and international Golden Visas across premier financial hubs.",
    deliverables: [
      "FEMA & RBI compliant repatriation frameworks for global NRIs",
      "Singapore VCC & Dubai freehold holding structures for 10-year Golden Visas",
    ],
    metricLabel: "GLOBAL HUBS ACTIVE",
    metricValue: "5 Nodes",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
    icon: Globe,
  },
  {
    id: "lifecycle",
    tag: "PILLAR III · 360° STEWARDSHIP",
    title: "Full Asset Lifecycle",
    headline: "From Sourcing & Underwriting to Tenant Leasing, Yield & Exit",
    description:
      "We act as your permanent fiduciary steward: managing turnkey furnishings, corporate leasing, automated rent escrow, and cycle-timed secondary exits.",
    deliverables: [
      "Grade-A corporate tenant onboarding with structured multi-year leases",
      "Active micro-market oversight to capture peak cycle valuations on exit",
    ],
    metricLabel: "ADVISORY PHASES",
    metricValue: "10 Steps",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
    icon: ChartLine,
  },
  {
    id: "fiduciary",
    tag: "PILLAR IV · ETHICAL ALIGNMENT",
    title: "Fiduciary Independence",
    headline: "Zero Developer Bias — 100% Client-Aligned Advisory",
    description:
      "We never accept developer kickbacks or marketing commissions. Our fee structure is transparent, written, and strictly aligned with your net realized returns.",
    deliverables: [
      "Flat, transparent fee structure agreed upon in writing with zero hidden charges",
      "Strict avoidance of proprietary quota pushes or developer marketing kickbacks",
    ],
    metricLabel: "CONFLICT TOLERANCE",
    metricValue: "0%",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop",
    icon: Handshake,
  },
];

// ─── Data: 6 Tailored Client Segments ─────────────────────────────
interface ClientSegment {
  title: string;
  category: string;
  focus: string;
  solution: string;
  iconCode: string;
  image: string;
}

const CLIENT_SEGMENTS: ClientSegment[] = [
  {
    title: "Individuals & Families",
    category: "GENERATIONAL WEALTH",
    focus: "Preserving family capital, minimizing probate delays & structuring passive cash flow",
    solution: "Bespoke family trust architectures, pre-leased commercial assets, and sovereign-backed private investments.",
    iconCode: "FAM",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "NRIs & Global Diaspora",
    category: "CROSS-BORDER WEALTH",
    focus: "FEMA compliance, NRE/NRO repatriation, and litigation-free remote property governance",
    solution: "End-to-end asset acquisition in India with full legal audit, corporate tenant onboarding, and overseas tax sync.",
    iconCode: "NRI",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Entrepreneurs & Founders",
    category: "POST-LIQUIDITY ALLOCATION",
    focus: "Shielding liquidity events from market swings and diversifying out of company equity",
    solution: "Ring-fenced family holding structures, high-yield private credit, and prime land-banking corridors.",
    iconCode: "FND",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "C-Suite & Top Professionals",
    category: "EXECUTIVE WEALTH",
    focus: "High-earning tax drag reduction and time-efficient passive asset generation",
    solution: "Managed commercial real estate fractional pools and institutional income syndicates.",
    iconCode: "EXE",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Family Offices & Institutions",
    category: "MULTI-FAMILY CO-INVESTMENT",
    focus: "Direct access to off-market Grade-A commercial developments and institutional funds",
    solution: "Singapore VCC setups, DIFC SPVs, and co-investment in prime logistics and data center real estate.",
    iconCode: "FO",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Corporate Treasuries",
    category: "SURPLUS CASH OPTIMIZATION",
    focus: "Capital preservation, quarterly liquidity buffers, and yield superior to bank deposits",
    solution: "Senior secured asset-backed paper, commercial paper structuring, and institutional liquidity reserves.",
    iconCode: "CORP",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&auto=format&fit=crop",
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activePillar, setActivePillar] = useState<string>("preservation");

  const imageRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      imageRefs.forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(100% 0 0 0)", y: 30 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
            },
            delay: i * 0.1,
          }
        );
      });

      gsap.fromTo(
        ".segment-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".segments-container",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const selectedPillar = PILLARS.find((p) => p.id === activePillar) || PILLARS[0];
  const SelectedPillarIcon = selectedPillar.icon;

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-10 md:py-14 bg-transparent relative overflow-hidden text-[var(--color-ivory-50)]"
      aria-label="About Aurixia Capital"
    >
      {/* Background Architectural Ambient Texture */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(201,162,77,0.08),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(30,41,59,0.18),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-au relative z-10">
        <Divider type="diamond" className="mb-6 md:mb-8" />

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
              <Eyebrow number="02">THE FIRM &amp; FIDUCIARY MANDATE</Eyebrow>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ivory-50)] leading-[1.12] tracking-tight">
              Architects of Generational Wealth.
              <br />
              <em className="text-[var(--color-gold-300)] not-italic font-light">
                Driven by Rigorous Fiduciary Intelligence.
              </em>
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right font-mono text-xs text-[#C5BDB0]">
            <p className="text-[var(--color-gold-400)] font-semibold uppercase tracking-wider mb-1">
              Bangalore HQ · Global Syndication
            </p>
            <p className="text-[11px] leading-relaxed text-[#A8A090]">
              Cross-border capital corridors linking India with Dubai, Singapore, Kuala Lumpur &amp; London.
            </p>
          </div>
        </div>

        {/* ── Main Editorial Story & Visual Collage ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Clear, High-Contrast Editorial Statement */}
            <p
              className="font-display font-light text-[var(--color-ivory-50)] leading-[1.28] tracking-tight"
              style={{
                fontSize: "clamp(1.35rem, 1rem + 1.6vw, 2.1rem)",
              }}
            >
              Aurixia Capital is a premier investment and asset management firm committed to helping individuals, families, professionals, NRIs, entrepreneurs, and businesses construct enduring wealth through disciplined, strategic real estate and alternative investments.
            </p>

            {/* Core Philosophy Paragraphs */}
            <div className="font-body text-sm sm:text-[15px] leading-relaxed text-[#D6CFBE] space-y-3.5 border-l-2 border-[var(--color-gold-500)]/40 pl-5 bg-[#14110C]/60 p-4 rounded-r-sm">
              <p>
                Backed by senior leadership with over 20 years of verifiable expertise in real estate, private finance, and institutional portfolio management, we operate as an end-to-end partner. We engineer the complete lifecycle — from uncovering undervalued opportunities to structuring, financing, corporate tenanting, and executing profitable secondary exits.
              </p>
              <p className="text-[var(--color-ivory-100)] font-medium">
                Our core thesis rejects speculative transactions in favor of cash-flow-generating, litigation-free tangible assets designed to withstand macroeconomic volatility and protect family capital across generations.
              </p>
            </div>

            {/* Fiduciary Quote Callout Banner */}
            <div className="p-6 bg-gradient-to-r from-[#17140F] via-[#1A1611] to-[#17140F] border border-[var(--color-gold-500)]/40 rounded-sm shadow-md relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold-500)]/10 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 mb-2.5">
                <span className="font-mono text-[9px] text-[var(--color-gold-400)] tracking-widest uppercase font-semibold">
                  AURIXA CORE CREED
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)]" />
              </div>
              <p className="font-display font-light text-[var(--color-ivory-50)] text-lg sm:text-xl leading-snug italic">
                &ldquo;We don&apos;t just help you invest — we help you engineer a sustainable, resilient portfolio that generates passive cash flow while safeguarding multi-generational wealth.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--hairline)]/40 flex items-center justify-between text-[11px] font-mono text-[#A8A090] uppercase tracking-wider">
                <span>The Aurixia Investment Mandate</span>
                <span className="text-[var(--color-gold-300)] font-semibold">100% Client-Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Asset Collage (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 relative">
              {/* Primary Tall Architectural Asset (7 cols) */}
              <div
                ref={imageRefs[0]}
                className="col-span-7 relative overflow-hidden rounded-sm border border-[var(--color-gold-500)]/30 group shadow-lg"
                style={{ aspectRatio: "4/5" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop")`,
                  }}
                  role="img"
                  aria-label="Prime private wealth estate and architectural assets"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907] via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0A0907]/90 border border-[var(--color-gold-500)]/40 font-mono text-[9px] text-[var(--color-gold-300)] tracking-wider">
                  PRIME ASSETS · 19.0760° N
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--color-ivory-200)]">
                  <span>Grade-A Real Estate</span>
                  <span className="text-[var(--color-gold-400)] font-bold">SECURED</span>
                </div>
              </div>

              {/* Stacked Secondary Assets (5 cols) */}
              <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                <div
                  ref={imageRefs[1]}
                  className="relative overflow-hidden rounded-sm border border-[var(--color-gold-500)]/30 group shadow-md"
                  style={{ aspectRatio: "1/1" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1518684079-3c830dcef090?w=700&q=80&auto=format&fit=crop")`,
                    }}
                    role="img"
                    aria-label="Modern commercial towers and institutional infrastructure"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[var(--color-gold-300)] tracking-wider font-semibold">
                    DIFC · DUBAI
                  </span>
                </div>

                <div
                  ref={imageRefs[2]}
                  className="relative overflow-hidden rounded-sm border border-[var(--color-gold-500)]/30 group shadow-md"
                  style={{ aspectRatio: "1/1" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80&auto=format&fit=crop")`,
                    }}
                    role="img"
                    aria-label="Global real estate capital corridors"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[var(--color-gold-300)] tracking-wider font-semibold">
                    SIN · VCC ASSETS
                  </span>
                </div>
              </div>
            </div>

            {/* Official Fiduciary Pledge Card */}
            <div className="p-5 bg-gradient-to-b from-[#181510] to-[#12100C] border border-[var(--color-gold-500)]/40 rounded-sm shadow-[inset_0_1px_0_rgba(242,221,168,0.1),0_10px_25px_-5px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-[var(--color-gold-400)] tracking-widest uppercase font-semibold">
                  OFFICIAL PLEDGE
                </span>
                <span className="font-mono text-[9px] text-[#A8A090] uppercase tracking-wider">
                  PAGE 8 · CHARTER
                </span>
              </div>
              <p className="font-display text-[var(--color-ivory-50)] text-lg sm:text-xl font-light leading-snug">
                &ldquo;Your Trust. Our Expertise. Your Wealth. Our Commitment.&rdquo;
              </p>
              <div className="mt-3 pt-2.5 border-t border-[var(--hairline)]/40 flex items-center justify-between text-xs font-mono text-[#C5BDB0]">
                <span>Aurixia Capital</span>
                <span className="text-[var(--color-gold-400)] font-medium">20+ Years Pedigree</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Kinetic Proof Metrics ── */}
        <div className="mb-14 lg:mb-18">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <AnimatedCounter
              target={20}
              suffix="+"
              label="Years Industry Pedigree"
              sub="Seasoned advisory across real estate & institutional finance."
              footnote="Leadership with 2 decades of asset underwriting"
            />
            <AnimatedCounter
              target={10}
              suffix="-Step"
              label="End-to-End Governance"
              sub="Structured roadmap from sourcing to yield and liquidation."
              footnote="Complete asset lifecycle stewardship"
            />
            <AnimatedCounter
              target={100}
              suffix="%"
              label="Litigation-Free Guarantee"
              sub="Uncompromising legal scrutiny & title due diligence."
              footnote="Zero tolerance for disputed or unverified land titles"
            />
            <AnimatedCounter
              target={5}
              label="Active Capital Desks"
              sub="India, Dubai, Singapore, Kuala Lumpur & London."
              footnote="Real-time multi-jurisdiction execution"
            />
          </div>
        </div>

        {/* ── Interactive 4 Pillars of Governance (Tabs / Interactive Switcher) ── */}
        <div className="mb-14 lg:mb-18 p-6 sm:p-8 bg-gradient-to-b from-[#18140F] to-[#100E09] border border-[var(--color-gold-500)]/45 rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_20px_48px_-10px_rgba(0,0,0,0.95)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div>
              <p className="font-mono text-xs text-[var(--color-gold-400)] tracking-widest uppercase mb-1 font-semibold">
                INSTITUTIONAL FOUNDATION
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory-50)]">
                The Four Pillars of Aurixia Stewardship
              </h3>
            </div>
            <p className="font-body text-xs text-[#D8D1C2] max-w-sm">
              Our investment governance model combines legal certainty, dual-currency structuring, and strict fiduciary independence.
            </p>
          </div>

          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
            {PILLARS.map((pillar) => {
              const isSelected = pillar.id === activePillar;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={cn(
                    "text-left p-4 rounded-sm border transition-all duration-300 relative cursor-pointer flex flex-col justify-between gap-2",
                    isSelected
                      ? "bg-[#282118] border-[var(--color-gold-400)] shadow-[0_4px_20px_rgba(201,162,77,0.25)]"
                      : "bg-[#16120D] border border-[var(--color-gold-500)]/30 hover:border-[var(--color-gold-400)]/60 hover:bg-[#201A13]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-gold-400)] font-semibold">
                      {pillar.tag.split("·")[0]}
                    </span>
                    <Icon size={16} className={isSelected ? "text-[var(--color-gold-300)]" : "text-[#B8B09F]"} />
                  </div>
                  <span
                    className={cn(
                      "font-display text-base block transition-colors leading-snug font-normal",
                      isSelected
                        ? "text-[var(--color-ivory-50)]"
                        : "text-[#D8D1C2]"
                    )}
                  >
                    {pillar.title}
                  </span>
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-gold-400)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pillar Deep Dive Showcase Panel */}
          <div className="p-6 sm:p-8 bg-[#18140E] border border-[var(--color-gold-500)]/40 rounded-sm relative overflow-hidden shadow-md">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Pillar Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--color-gold-400)] tracking-widest uppercase font-semibold">
                    {selectedPillar.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)]" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl text-[var(--color-ivory-50)] leading-snug font-normal">
                  {selectedPillar.headline}
                </h4>
                <p className="font-body text-sm text-[#D8D1C2] leading-relaxed">
                  {selectedPillar.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2 space-y-2">
                  {selectedPillar.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-[var(--color-gold-400)] text-xs mt-0.5 flex-shrink-0">◆</span>
                      <p className="font-body text-xs sm:text-sm text-[#FAF7F2]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillar Visual Asset & Quantitative Metric (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div
                  className="relative overflow-hidden rounded-sm border border-[var(--color-gold-500)]/40 group shadow-lg"
                  style={{ aspectRatio: "16/10" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url("${selectedPillar.image}")` }}
                    role="img"
                    aria-label={selectedPillar.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907] via-[#0A0907]/30 to-transparent" />
                  
                  {/* Metric Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 bg-[#14110C]/90 border border-[var(--color-gold-500)]/45 rounded-sm backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <SelectedPillarIcon size={18} className="text-[var(--color-gold-400)]" />
                      <span className="font-mono text-[10px] text-[#C5BDB0] uppercase tracking-wider font-semibold">
                        {selectedPillar.metricLabel}
                      </span>
                    </div>
                    <span className="font-display font-light text-xl text-[var(--color-gold-300)] leading-none">
                      {selectedPillar.metricValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Client Profiles: 6 Interactive Tailored Mandates ── */}
        <div className="mb-14 lg:mb-18">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)]" />
                <span className="font-mono text-xs text-[var(--color-gold-400)] tracking-widest uppercase font-semibold">
                  TAILORED MANDATES · BROCHURE PAGE 1
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory-50)]">
                Engineered for High-Consequence Wealth
              </h3>
            </div>
            <p className="font-body text-xs text-[#C5BDB0] max-w-sm">
              Customized structuring across regulatory, tax, and liquidity horizons.
            </p>
          </div>

          <div className="segments-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CLIENT_SEGMENTS.map((segment) => (
              <div
                key={segment.title}
                className="segment-card group relative bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)] rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_14px_32px_-8px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                {/* Visual Header Image Banner */}
                <div className="relative w-full h-28 overflow-hidden border-b border-[var(--color-gold-500)]/25">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url("${segment.image}")` }}
                    role="img"
                    aria-label={segment.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1711] via-[#1C1711]/40 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#F2DDA8] bg-[#14110C]/90 px-2.5 py-0.5 rounded border border-[var(--color-gold-500)]/50 font-semibold backdrop-blur-sm">
                      {segment.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--color-gold-300)] bg-[#14110C]/80 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/30 backdrop-blur-sm">
                      {segment.iconCode}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-lg sm:text-xl text-[var(--color-ivory-50)] group-hover:text-[var(--color-gold-200)] transition-colors mb-1.5 font-normal">
                      {segment.title}
                    </h4>

                    <p className="font-body text-xs text-[#D8D1C2] leading-relaxed mb-3">
                      {segment.focus}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[var(--color-gold-500)]/25">
                    <span className="font-mono text-[9px] text-[var(--color-gold-400)] uppercase tracking-wider block mb-0.5 font-semibold">
                      Aurixa Solution:
                    </span>
                    <p className="font-body text-xs text-[#FAF7F2] leading-relaxed line-clamp-2">
                      {segment.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vision & Mission Architectural Panels (Brochure Page 2) ── */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Our Vision Card */}
          <div className="p-7 sm:p-8 rounded-sm border border-[var(--color-gold-500)]/45 hover:border-[var(--color-gold-400)] shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_16px_36px_-8px_rgba(0,0,0,0.9)] relative group transition-all duration-300 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-35"
              style={{ backgroundImage: `url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format&fit=crop")` }}
              role="img"
              aria-label="Vision background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C1711]/95 via-[#14110C]/90 to-[#0A0806]/95" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[var(--color-gold-400)] uppercase tracking-widest font-semibold">
                  OUR VISION · CHARTER
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-gold-400)]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-[var(--color-ivory-50)] mb-2.5">
                India&apos;s Most Trusted Wealth Partner
              </h3>
              <p className="font-body text-sm text-[#D8D1C2] leading-relaxed">
                To build generational wealth through strategic, litigation-free real estate and institutional portfolio diversification.
              </p>
              <div className="mt-5 pt-3 border-t border-[var(--color-gold-500)]/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-[#B8B09F] uppercase tracking-wider font-medium">
                  Sustainable Long-Term Compounding
                </span>
              </div>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="p-7 sm:p-8 rounded-sm border border-[var(--color-gold-500)]/45 hover:border-[var(--color-gold-400)] shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_16px_36px_-8px_rgba(0,0,0,0.9)] relative group transition-all duration-300 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-35"
              style={{ backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop")` }}
              role="img"
              aria-label="Mission background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C1711]/95 via-[#14110C]/90 to-[#0A0806]/95" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[var(--color-gold-400)] uppercase tracking-widest font-semibold">
                  OUR MISSION · FIDUCIARY CHARTER
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-gold-400)]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-[var(--color-ivory-50)] mb-2.5">
                Capital Protection &amp; Maximized Net Yield
              </h3>
              <p className="font-body text-sm text-[#D8D1C2] leading-relaxed">
                To engineer secure, transparent investment opportunities that maximize yields while placing paramount priority on capital security.
              </p>
              <div className="mt-5 pt-3 border-t border-[var(--color-gold-500)]/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-[#B8B09F] uppercase tracking-wider font-medium">
                  Zero Compromise on Capital Security
                </span>
              </div>
            </div>
          </div>
        </div>

        <Divider type="diamond" className="mt-8 md:mt-10" />
      </div>
    </section>
  );
}
