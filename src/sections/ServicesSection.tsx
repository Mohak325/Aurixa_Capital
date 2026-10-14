// src/sections/ServicesSection.tsx
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Buildings,
  ChartLine,
  Key,
  Handshake,
  Globe,
  Briefcase,
  Coins,
  ShieldCheck,
  PaintBrush,
  Scales,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SERVICES, type Service } from "@/data/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Buildings: <Buildings size={22} weight="light" />,
  ChartLine: <ChartLine size={22} weight="light" />,
  Key: <Key size={22} weight="light" />,
  Handshake: <Handshake size={22} weight="light" />,
  ShieldCheck: <ShieldCheck size={22} weight="light" />,
  Scales: <Scales size={22} weight="light" />,
  PaintBrush: <PaintBrush size={22} weight="light" />,
  Coins: <Coins size={22} weight="light" />,
  Globe: <Globe size={22} weight="light" />,
  Briefcase: <Briefcase size={22} weight="light" />,
};

type CategoryFilter = "ALL" | "REAL_ESTATE" | "CAPITAL_YIELD" | "GLOBAL_ENTERPRISE";

const CATEGORY_MAP: Record<string, CategoryFilter> = {
  "real-estate": "REAL_ESTATE",
  "capital-management": "CAPITAL_YIELD",
  "property-management": "REAL_ESTATE",
  "rental-assistance": "CAPITAL_YIELD",
  "litigation-free-verification": "REAL_ESTATE",
  "buying-selling": "REAL_ESTATE",
  "interior-design": "REAL_ESTATE",
  "mutual-funds": "CAPITAL_YIELD",
  international: "GLOBAL_ENTERPRISE",
  corporate: "GLOBAL_ENTERPRISE",
};

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("ALL");
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const filteredServices = useMemo(() => {
    if (selectedFilter === "ALL") return SERVICES;
    return SERVICES.filter((s) => CATEGORY_MAP[s.id] === selectedFilter);
  }, [selectedFilter]);

  // Keep activeIdx valid when filter changes
  useEffect(() => {
    const currentService = SERVICES[activeIdx];
    const newIdx = filteredServices.findIndex((s) => s.id === currentService.id);
    if (newIdx === -1) {
      const firstMatch = SERVICES.findIndex((s) => s.id === filteredServices[0]?.id);
      if (firstMatch !== -1) setActiveIdx(firstMatch);
    }
  }, [selectedFilter, filteredServices, activeIdx]);

  const activeService = SERVICES[activeIdx] || SERVICES[0];

  // Smooth stage transition animation
  const handleSelectService = (idx: number) => {
    if (idx === activeIdx || !stageRef.current) return;

    gsap.to(stageRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setActiveIdx(idx);
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      },
    });
  };

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + SERVICES.length) % SERVICES.length;
    handleSelectService(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % SERVICES.length;
    handleSelectService(nextIdx);
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!railRef.current) return;
    const activeEl = railRef.current.querySelector(`[data-rail-idx="${activeIdx}"]`) as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIdx]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-10 md:py-14 bg-transparent relative overflow-hidden text-[var(--color-ivory-50)]"
      aria-label="Our Services"
    >
      {/* Background Architectural Glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(201,162,77,0.06),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(30,41,59,0.16),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-au relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
              <Eyebrow number="03">CAPITAL ARCHITECTURE &amp; VERTICALS</Eyebrow>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ivory-50)] leading-[1.12] tracking-tight">
              Complete End-to-End Investment Solutions.
              <br />
              <em className="text-[var(--color-gold-300)] not-italic font-light">
                Engineered from Inception to Liquidation.
              </em>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-1.5 font-mono text-xs">
            <span className="text-[var(--color-gold-400)] tracking-widest uppercase font-semibold">
              10 SPECIALIZED DIVISIONS · 0% CONFLICT
            </span>
            <p className="text-[#C5BDB0] max-w-sm text-left lg:text-right text-[11px] leading-relaxed">
              From forensic legal title checks to cross-border holding companies and guaranteed corporate leasing.
            </p>
          </div>
        </div>

        {/* ── Category Filter Bar ── */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-7 pb-3.5 border-b border-[var(--color-gold-500)]/25">
          <span className="font-mono text-[10px] text-[#B8B09F] uppercase tracking-wider mr-2 hidden sm:inline font-semibold">
            Filter Verticals:
          </span>
          {[
            { id: "ALL", label: "All 10 Verticals" },
            { id: "REAL_ESTATE", label: "Real Estate & Acquisition" },
            { id: "CAPITAL_YIELD", label: "Capital & Yield Advisory" },
            { id: "GLOBAL_ENTERPRISE", label: "Global Corridors & Corporate" },
          ].map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as CategoryFilter)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all duration-300 cursor-pointer border",
                  isSelected
                    ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] font-bold shadow-[0_2px_14px_rgba(201,162,77,0.35)]"
                    : "bg-[#18140E] text-[#D8D1C2] border border-[var(--color-gold-500)]/35 hover:border-[var(--color-gold-400)]/70 hover:text-[var(--color-ivory-50)] hover:bg-[#201A13]"
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* ── Active Service Showcase Stage (Cinema Dossier) ── */}
        <div
          ref={stageRef}
          className="relative bg-gradient-to-b from-[#1C1711] via-[#16120D] to-[#110E09] border border-[var(--color-gold-500)]/45 rounded-sm p-6 sm:p-8 lg:p-9 mb-7 overflow-hidden shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_20px_48px_-10px_rgba(0,0,0,0.95)]"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="pointer-events-none absolute top-0 left-1/3 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(201,162,77,0.12),_transparent_70%)]"
            aria-hidden="true"
          />

          {/* Outline Numeral Watermark in Background */}
          <div
            className="pointer-events-none absolute -bottom-10 right-4 font-display text-[12rem] lg:text-[15rem] font-bold text-[var(--color-gold-500)]/5 leading-none select-none"
            aria-hidden="true"
          >
            {activeService.number}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column: Narrative, Scope, and Institutional Callout (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-5">
              {/* Header Badges */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-[#262017] border border-[var(--color-gold-500)]/45 flex items-center justify-center text-[var(--color-gold-300)] shadow-sm">
                      {SERVICE_ICONS[activeService.icon]}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold-400)] font-semibold">
                      VERTICAL {activeService.number} / 10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#C5BDB0] uppercase tracking-wider font-semibold">
                      {activeIdx + 1} OF 10
                    </span>
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous Service"
                        className="w-7 h-7 rounded border border-[var(--color-gold-500)]/40 bg-[#262017] text-[#D8D1C2] hover:text-[var(--color-gold-300)] hover:border-[var(--color-gold-400)] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                      >
                        <ArrowLeft size={13} />
                      </button>
                      <button
                        onClick={handleNext}
                        aria-label="Next Service"
                        className="w-7 h-7 rounded border border-[var(--color-gold-500)]/40 bg-[#262017] text-[#D8D1C2] hover:text-[var(--color-gold-300)] hover:border-[var(--color-gold-400)] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                      >
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--color-ivory-50)] leading-tight tracking-tight font-normal">
                  {activeService.title}
                </h3>
                {activeService.subtitle && (
                  <p className="font-body text-xs sm:text-sm text-[var(--color-gold-300)] mt-1 font-normal">
                    {activeService.subtitle}
                  </p>
                )}
              </div>

              {/* Primary Narrative */}
              <p className="font-body text-sm sm:text-[15px] text-[#DCD5C6] leading-relaxed">
                {activeService.description}
              </p>

              {/* Scope of Services Grid */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#221B13] border border-[var(--color-gold-500)]/35 space-y-2.5 shadow-[inset_0_1px_0_rgba(245,230,196,0.08),0_4px_16px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between border-b border-[var(--color-gold-500)]/25 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] font-semibold flex items-center gap-1.5">
                    <Sparkle size={12} className="text-[var(--color-gold-400)]" />
                    <span>Core Operational Deliverables</span>
                  </span>
                  <span className="font-mono text-[9px] text-[#C5BDB0] uppercase font-semibold">
                    {activeService.subServices.length} Key Capabilities
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                  {activeService.subServices.map((sub, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-gold-400)] text-xs mt-0.5 flex-shrink-0">
                        ◆
                      </span>
                      <span className="font-body text-xs text-[#FAF7F2] leading-snug">
                        {sub.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentic Brochure Quote Banner */}
              <div className="relative pl-4 py-2 border-l-2 border-[var(--color-gold-400)] bg-[#241D15] rounded-r-sm border-t border-r border-b border-[var(--color-gold-500)]/25">
                <p className="font-display italic text-sm sm:text-base text-[#FAF7F2] leading-snug">
                  &ldquo;{activeService.callout}&rdquo;
                </p>
                <p className="font-mono text-[9px] text-[var(--color-gold-400)] uppercase tracking-wider mt-1 font-semibold">
                  Aurixia Capital · Fiduciary Standard
                </p>
              </div>

              {/* Bottom Consultation Link */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Button
                  variant="primary"
                  as="button"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  id={`cta-service-${activeService.id}`}
                  className="text-xs py-2.5 px-5"
                >
                  Consult on {activeService.title}
                </Button>
                <span className="font-mono text-[10px] text-[#A8A090]">
                  FEMA · RBI · RERA · DTAA Compliant Execution
                </span>
              </div>
            </div>

            {/* Right Column: Architectural Photography & Quality Seal (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <div
                className="relative overflow-hidden rounded-sm border border-[var(--color-gold-500)]/35 group shadow-lg"
                style={{ aspectRatio: "4/3" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${activeService.image}")` }}
                  role="img"
                  aria-label={activeService.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907] via-[#0A0907]/20 to-transparent" />

                {/* Corner CAD Crosshairs */}
                <span className="absolute top-2 left-2 font-mono text-[10px] text-[var(--color-gold-400)] opacity-80">
                  +
                </span>
                <span className="absolute top-2 right-2 font-mono text-[10px] text-[var(--color-gold-400)] opacity-80">
                  +
                </span>
                <span className="absolute bottom-2 left-2 font-mono text-[10px] text-[var(--color-gold-400)] opacity-80">
                  +
                </span>
                <span className="absolute bottom-2 right-2 font-mono text-[10px] text-[var(--color-gold-400)] opacity-80">
                  +
                </span>

                {/* Top Floating Badge */}
                {activeService.stat && (
                  <div className="absolute top-3.5 right-3.5 bg-[#1C1711]/95 border border-[var(--color-gold-500)]/60 px-3 py-1 rounded-sm backdrop-blur-md shadow-md">
                    <p className="font-mono text-[10px] text-[var(--color-gold-300)] uppercase tracking-wider font-semibold">
                      {activeService.stat}
                    </p>
                  </div>
                )}

                {/* Bottom Image Stamp */}
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-[var(--color-ivory-100)]">
                  <span>AURIXA ASSET CORRIDOR</span>
                  <span className="text-[var(--color-gold-400)] font-bold">INSTITUTIONAL GRADE</span>
                </div>
              </div>

              {/* Verified Governance Card */}
              <div className="p-4 rounded-sm bg-[#221B13] border border-[var(--color-gold-500)]/40 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ivory-50)] font-semibold">
                      Advisory Mandate Active
                    </p>
                    <p className="font-body text-[11px] text-[#D8D1C2]">
                      Dedicated senior fiduciary advisor assigned to every portfolio
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[9px] text-[#F2DDA8] bg-[#2E261C] px-2 py-0.5 rounded border border-[var(--color-gold-500)]/45 font-semibold flex-shrink-0 shadow-sm">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Interactive 10-Service Horizontal Rail (Thumbnail Carousel) ── */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-[10px] text-[var(--color-gold-400)] uppercase tracking-widest font-semibold">
              SELECT ANY OF THE 10 VERTICALS TO INSPECT:
            </span>
            <span className="font-mono text-[10px] text-[#A8A090]">
              ← Scroll to explore all divisions →
            </span>
          </div>

          <div
            ref={railRef}
            className="flex gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar select-none"
            role="tablist"
            aria-label="All 10 services"
          >
            {SERVICES.map((service, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={service.id}
                  data-rail-idx={idx}
                  onClick={() => handleSelectService(idx)}
                  className={cn(
                    "flex-shrink-0 w-64 rounded-sm border text-left transition-all duration-300 relative cursor-pointer group shadow-sm overflow-hidden flex flex-col",
                    isSelected
                      ? "bg-gradient-to-b from-[#262017] to-[#18140E] border-[var(--color-gold-400)] shadow-[0_8px_24px_rgba(201,162,77,0.3)] -translate-y-1"
                      : "bg-[#18140E] border border-[var(--color-gold-500)]/30 hover:border-[var(--color-gold-400)]/60 hover:bg-[#201A13]"
                  )}
                  role="tab"
                  aria-selected={isSelected}
                  id={`tab-rail-${service.id}`}
                >
                  {/* Photo Header Thumbnail */}
                  <div className="relative w-full h-24 overflow-hidden border-b border-[var(--color-gold-500)]/20">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url("${service.image}")` }}
                      role="img"
                      aria-label={service.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18140E] via-[#18140E]/40 to-transparent" />
                    <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold text-[var(--color-gold-300)] bg-[#14110C]/90 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/50 backdrop-blur-sm">
                        {service.number}
                      </span>
                      <span className="text-[var(--color-gold-300)] bg-[#14110C]/90 p-1 rounded border border-[var(--color-gold-500)]/40 backdrop-blur-sm">
                        {SERVICE_ICONS[service.icon]}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <h4
                      className={cn(
                        "font-display text-sm font-normal leading-snug line-clamp-1 transition-colors",
                        isSelected
                          ? "text-[var(--color-ivory-50)]"
                          : "text-[#DCD5C6] group-hover:text-[var(--color-ivory-50)]"
                      )}
                    >
                      {service.title}
                    </h4>

                    <p className="font-body text-[11px] text-[var(--color-gold-400)] mt-1 truncate font-medium">
                      {service.stat || "End-to-End Solution"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3-Stage Wealth Lifecycle Architecture ── */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#16130F] to-[#100E0A] border border-[var(--color-gold-500)]/30 rounded-sm shadow-xl mb-10">
          <div className="text-center max-w-2xl mx-auto mb-7">
            <span className="font-mono text-xs text-[var(--color-gold-400)] uppercase tracking-widest block mb-1.5 font-semibold">
              INTEGRATED ASSET STEWARDSHIP
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory-50)]">
              How Our 10 Verticals Converge Into One Seamless Mandate
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Stage 1 */}
            <div className="bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)] rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_12px_28px_-8px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-32 overflow-hidden border-b border-[var(--color-gold-500)]/20">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format&fit=crop")` }}
                  role="img"
                  aria-label="Acquisition & Due Diligence"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1711] via-[#1C1711]/40 to-transparent" />
                <div className="absolute top-2.5 left-3">
                  <span className="font-mono text-[9px] text-[var(--color-gold-400)] uppercase tracking-widest font-semibold bg-[#14110C]/90 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/50 backdrop-blur-sm">
                    STAGE 01 · ACQUISITION
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-lg text-[var(--color-ivory-50)] mb-1.5 font-normal">
                    Underwrite &amp; Title Diligence
                  </h4>
                  <p className="font-body text-xs text-[#D8D1C2] leading-relaxed mb-4">
                    Identifying high-growth residential, commercial, and land assets with forensic legal verification.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--color-gold-500)]/25 font-mono text-[10px] text-[var(--color-gold-400)] font-semibold">
                  SERVICES 01 · 05 · 06
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)] rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_12px_28px_-8px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-32 overflow-hidden border-b border-[var(--color-gold-500)]/20">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&auto=format&fit=crop")` }}
                  role="img"
                  aria-label="Yield & Management"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1711] via-[#1C1711]/40 to-transparent" />
                <div className="absolute top-2.5 left-3">
                  <span className="font-mono text-[9px] text-[var(--color-gold-400)] uppercase tracking-widest font-semibold bg-[#14110C]/90 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/50 backdrop-blur-sm">
                    STAGE 02 · YIELD &amp; LEASING
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-lg text-[var(--color-ivory-50)] mb-1.5 font-normal">
                    Turnkey Staging &amp; Tenant Leasing
                  </h4>
                  <p className="font-body text-xs text-[#D8D1C2] leading-relaxed mb-4">
                    Furnishing, corporate tenant placement, automated rental escrow, and comprehensive property care.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--color-gold-500)]/25 font-mono text-[10px] text-[var(--color-gold-400)] font-semibold">
                  SERVICES 03 · 04 · 07 · 08
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)] rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_12px_28px_-8px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-32 overflow-hidden border-b border-[var(--color-gold-500)]/20">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&auto=format&fit=crop")` }}
                  role="img"
                  aria-label="Global Expansion & Exit"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1711] via-[#1C1711]/40 to-transparent" />
                <div className="absolute top-2.5 left-3">
                  <span className="font-mono text-[9px] text-[var(--color-gold-400)] uppercase tracking-widest font-semibold bg-[#14110C]/90 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/50 backdrop-blur-sm">
                    STAGE 03 · GLOBAL EXIT
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-lg text-[var(--color-ivory-50)] mb-1.5 font-normal">
                    Corridor Redeployment &amp; Liquidation
                  </h4>
                  <p className="font-body text-xs text-[#D8D1C2] leading-relaxed mb-4">
                    Planned liquidation upon valuation maturity, tax-efficient reinvestment, and offshore diversification.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--color-gold-500)]/25 font-mono text-[10px] text-[var(--color-gold-400)] font-semibold">
                  SERVICES 02 · 09 · 10
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Section CTA ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--hairline)]/40">
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#C5BDB0]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fiduciary Mandate: Zero undisclosed commissions · 100% Client-Aligned</span>
          </div>

          <Button
            variant="secondary"
            as="button"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            id="services-bottom-cta"
            className="text-xs py-2.5 px-5"
          >
            Schedule Strategy Consultation
          </Button>
        </div>

        <Divider type="diamond" className="mt-8 md:mt-10" />
      </div>
    </section>
  );
}
