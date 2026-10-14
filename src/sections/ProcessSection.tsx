// src/sections/ProcessSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Target,
  TreeStructure,
  MagnifyingGlass,
  ShieldCheck,
  Handshake,
  FileText,
  PaintBrush,
  Key,
  ChartLine,
  TrendUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkle,
  Shield,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { PROCESS_STEPS, PROCESS_PHASES, ProcessPhase } from "@/data/process";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ReactNode> = {
  Target: <Target size={22} weight="light" />,
  TreeStructure: <TreeStructure size={22} weight="light" />,
  MagnifyingGlass: <MagnifyingGlass size={22} weight="light" />,
  ShieldCheck: <ShieldCheck size={22} weight="light" />,
  Handshake: <Handshake size={22} weight="light" />,
  FileText: <FileText size={22} weight="light" />,
  PaintBrush: <PaintBrush size={22} weight="light" />,
  Key: <Key size={22} weight="light" />,
  ChartLine: <ChartLine size={22} weight="light" />,
  TrendUp: <TrendUp size={22} weight="light" />,
};

const PROCESS_BENEFITS = [
  {
    title: "100% Litigation-Free Guarantee",
    desc: "Rigorous 6-point title scrutiny by in-house legal counsel before any capital commit.",
  },
  {
    title: "20+ Years Direct Sourcing Edge",
    desc: "First-look access to tier-1 developer pre-launches and off-market inventory.",
  },
  {
    title: "Dedicated Portfolio Director",
    desc: "Single point of contact managing acquisition, compliance, and wealth growth.",
  },
  {
    title: "Turnkey Property & Rental Stewardship",
    desc: "Corporate tenant placement, automated rent escrow, and property maintenance.",
  },
];

const PHASE_IMAGES: Record<string, string> = {
  advisory: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&auto=format&fit=crop",
  acquisition: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80&auto=format&fit=crop",
  management: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80&auto=format&fit=crop",
  exit: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80&auto=format&fit=crop",
};

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsListRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedPhase, setSelectedPhase] = useState<string>("all");

  // Filter steps if a specific phase is chosen
  const displayedSteps =
    selectedPhase === "all"
      ? PROCESS_STEPS
      : PROCESS_STEPS.filter((step) => step.phaseId === selectedPhase);

  // GSAP Animations
  useGSAP(
    () => {
      const stepElements = containerRef.current?.querySelectorAll(".process-step-item");
      if (!stepElements?.length) return;

      // Animate each step on scroll
      stepElements.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              onEnter: () => setActiveStepIndex(idx),
              onEnterBack: () => setActiveStepIndex(idx),
            },
          }
        );
      });

      // Animate sticky sidebar card
      gsap.fromTo(
        ".process-sticky-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [selectedPhase] }
  );

  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];
  const progressPercent = Math.round(((activeStepIndex + 1) / PROCESS_STEPS.length) * 100);

  const scrollToPhase = (phaseId: string) => {
    setSelectedPhase(phaseId);
    if (phaseId !== "all") {
      const targetEl = document.getElementById(`phase-${phaseId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="process"
      className="section-py bg-transparent relative text-[var(--color-ivory-50)]"
      aria-label="Our 10-Step Investment Process"
    >
      {/* Background ambient lighting — overflow isolated to prevent breaking sticky */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,162,77,0.08),transparent_70%)] blur-3xl"
        />
        <div
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(30,41,59,0.22),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="container-au relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
              <Eyebrow number="05">THE 10-STEP PROPRIETARY LIFECYCLE</Eyebrow>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-[1.12] tracking-tight">
              You Invest.
              <br />
              <em className="text-[#F2DDA8] not-italic font-light">
                We Manage Every Single Detail.
              </em>
            </h2>
          </div>
          <div className="p-4 rounded-sm bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_10px_24px_rgba(0,0,0,0.8)] max-w-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-[#F2DDA8] font-semibold tracking-wider uppercase">
                End-to-End Fiduciary Stewardship
              </span>
            </div>
            <p className="font-body text-xs text-[#D8D1C2] leading-relaxed">
              From strategic capital allocation and litigation-free title verification to turnkey leasing and cyclical exit realization.
            </p>
          </div>
        </div>

        {/* ── Phase Filter & Navigation Ribbon ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-[var(--color-gold-500)]/20">
          <span className="font-mono text-[11px] text-[#F2DDA8] uppercase tracking-wider mr-2 flex-shrink-0 font-medium">
            Lifecycle Filter:
          </span>
          <button
            onClick={() => scrollToPhase("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 border",
              selectedPhase === "all"
                ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] font-bold shadow-[0_2px_10px_rgba(201,162,77,0.35)]"
                : "bg-[#18140E] text-[#D8D1C2] border border-[var(--color-gold-500)]/30 hover:border-[var(--color-gold-400)]/60 hover:text-[#FAF7F2] hover:bg-[#201A13]"
            )}
          >
            All 10 Steps
          </button>
          {PROCESS_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => scrollToPhase(phase.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 border flex items-center gap-1.5",
                selectedPhase === phase.id
                  ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] font-bold shadow-[0_2px_10px_rgba(201,162,77,0.35)]"
                  : "bg-[#18140E] text-[#D8D1C2] border border-[var(--color-gold-500)]/30 hover:border-[var(--color-gold-400)]/60 hover:text-[#FAF7F2] hover:bg-[#201A13]"
              )}
            >
              <span className="font-serif italic font-semibold">{phase.roman} ·</span>
              <span>{phase.title.split("&")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* ── Main Layout: Sticky Sidebar + Interactive Timeline ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 relative">
          {/* ── Sticky Left Dossier (4 cols on Desktop) ── */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-24 flex flex-col gap-5">
              {/* Live Progress Card */}
              <div className="process-sticky-card p-5 sm:p-6 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/45 rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_20px_44px_-8px_rgba(0,0,0,0.95)] relative overflow-hidden">
                <div
                  className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(201,162,77,0.15),transparent_70%)]"
                  aria-hidden="true"
                />

              {/* Live Status indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F2DDA8] font-semibold">
                    ACTIVE LIFECYCLE MONITOR
                  </span>
                </div>
                <span className="font-mono text-xs text-[#F2DDA8] font-bold bg-[#262017] px-2.5 py-0.5 rounded border border-[var(--color-gold-500)]/45 shadow-sm">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-1.5 bg-[#262017] rounded-full overflow-hidden mb-5 border border-[var(--color-gold-500)]/30">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-gold-600)] via-[var(--color-gold-400)] to-[var(--color-gold-200)] transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(230,201,138,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Current Active Step Callout */}
              <div className="p-4 rounded bg-[#221B13] border border-[var(--color-gold-500)]/35 mb-5 shadow-[inset_0_1px_0_rgba(245,230,196,0.08),0_4px_16px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D8D1C2] mb-1 font-medium">
                  <span>{activeStep.phaseRoman}</span>
                  <span className="text-[#F2DDA8] font-bold">STEP {activeStep.number} OF 10</span>
                </div>
                <h4 className="font-display text-base text-[#FAF7F2] font-normal line-clamp-1">
                  {activeStep.title}
                </h4>
                <p className="font-mono text-[11px] text-[#E6C98A] mt-0.5 uppercase tracking-wide font-medium">
                  {activeStep.tagline}
                </p>
              </div>

              {/* Dynamic Phase Photographic Preview */}
              <div className="relative w-full h-36 rounded-sm overflow-hidden border border-[var(--color-gold-500)]/40 mb-4 shadow-md group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${PHASE_IMAGES[activeStep.phaseId] || PHASE_IMAGES.advisory}")`,
                  }}
                  role="img"
                  aria-label={`${activeStep.phaseRoman} execution`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-[#14110C]/35 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#F2DDA8] uppercase tracking-wider font-semibold">
                    {activeStep.phaseRoman} EXECUTION
                  </span>
                  <span className="text-emerald-400 bg-[#0A0907]/80 px-2 py-0.5 rounded border border-emerald-400/40 font-semibold">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Fiduciary Standard Highlights */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 p-2 rounded bg-[#221B13] border border-[var(--color-gold-500)]/30 text-xs">
                  <CheckCircle size={14} weight="fill" className="text-[#F2DDA8] flex-shrink-0" />
                  <span className="font-body text-[#FAF7F2] font-medium text-[11px]">
                    100% Litigation-Free Title Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-[#221B13] border border-[var(--color-gold-500)]/30 text-xs">
                  <CheckCircle size={14} weight="fill" className="text-[#F2DDA8] flex-shrink-0" />
                  <span className="font-body text-[#FAF7F2] font-medium text-[11px]">
                    Dedicated Single-Point Portfolio Director
                  </span>
                </div>
              </div>

              {/* Quote from Brochure */}
              <div className="pt-4 border-t border-[var(--color-gold-500)]/20 mb-5">
                <blockquote className="font-display font-light text-xs text-[#FAF7F2] italic leading-relaxed">
                  &ldquo;Your Trust. Our Expertise. Your Wealth. Our Commitment.&rdquo;
                </blockquote>
                <p className="font-mono text-[9px] text-[#F2DDA8] tracking-widest uppercase mt-1 font-semibold">
                  — Aurixia Capital Company Brochure
                </p>
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                as="button"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                id="process-cta"
                className="w-full justify-center text-xs py-3"
              >
                <span>Schedule Discovery Session</span>
                <ArrowRight size={14} weight="bold" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive 10-Step Timeline (8 cols) ── */}
          <div ref={stepsListRef} className="lg:col-span-8 flex flex-col gap-8">
            {PROCESS_PHASES.map((phase) => {
              // Steps belonging to this phase that should be rendered
              const phaseSteps = displayedSteps.filter((s) => s.phaseId === phase.id);
              if (phaseSteps.length === 0) return null;

              return (
                <div
                  key={phase.id}
                  id={`phase-${phase.id}`}
                  className="scroll-mt-28 flex flex-col gap-5"
                >
                  {/* ── Phase Header Banner ── */}
                  <div className="relative p-5 rounded-sm bg-gradient-to-r from-[#1A1611] via-[#14120E] to-[#1A1611] border-l-2 border-l-[var(--color-gold-400)] border-y border-r border-[var(--color-gold-500)]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[inset_0_1px_0_rgba(242,221,168,0.1),0_10px_24px_-6px_rgba(0,0,0,0.7)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-[#F2DDA8] uppercase tracking-widest font-semibold">
                          {phase.roman} · {phase.stepRange}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[var(--color-gold-500)]/50" />
                        <span className="font-mono text-[10px] text-[#C5BDB0]">
                          {phase.tagline}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-[#FAF7F2] font-light">
                        {phase.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[#DCD5C6] mt-1 max-w-xl leading-relaxed">
                        {phase.scope}
                      </p>
                    </div>

                    <div className="flex-shrink-0 self-start sm:self-center">
                      <span className="px-3 py-1 rounded bg-[#0A0907] border border-[var(--color-gold-500)]/30 font-mono text-[10px] text-[#F2DDA8] font-semibold">
                        {phaseSteps.length} {phaseSteps.length === 1 ? "Step" : "Steps"}
                      </span>
                    </div>
                  </div>

                  {/* ── Steps in this Phase ── */}
                  <div className="relative pl-6 sm:pl-8 space-y-4">
                    {/* Vertical connecting spine line */}
                    <div
                      className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--color-gold-400)]/70 via-[var(--color-gold-500)]/35 to-transparent"
                      aria-hidden="true"
                    />

                    {phaseSteps.map((step) => {
                      const globalIndex = PROCESS_STEPS.findIndex((s) => s.number === step.number);
                      const isCurrentActive = globalIndex === activeStepIndex;

                      return (
                        <div
                          key={step.number}
                          className={cn(
                            "process-step-item group relative rounded-sm p-5 sm:p-6 transition-all duration-300 border",
                            isCurrentActive
                              ? "bg-gradient-to-br from-[#241D14] to-[#14100A] border-[var(--color-gold-400)] shadow-[inset_0_1px_0_rgba(245,230,196,0.2),0_18px_36px_-6px_rgba(0,0,0,0.95)]"
                              : "bg-gradient-to-b from-[#18140E] to-[#110E09] border border-[var(--color-gold-500)]/35 hover:bg-[#201A13] hover:border-[var(--color-gold-400)]/60 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.7)]"
                          )}
                          onMouseEnter={() => setActiveStepIndex(globalIndex)}
                        >
                          {/* Timeline node dot on the spine */}
                          <div
                            className={cn(
                              "absolute -left-[29px] sm:-left-[37px] top-6 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                              isCurrentActive
                                ? "bg-[var(--color-gold-400)] text-[#060504] shadow-[0_0_12px_rgba(201,162,77,0.8)] scale-110 font-bold"
                                : "bg-[#262017] border border-[var(--color-gold-500)]/60 text-[#F2DDA8]"
                            )}
                          >
                            <span className="font-mono text-[9px] font-bold">
                              {step.number}
                            </span>
                          </div>

                          {/* Step Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                                  isCurrentActive
                                    ? "bg-[var(--color-gold-400)] text-[#060504] shadow-[0_2px_10px_rgba(201,162,77,0.4)]"
                                    : "bg-[#221B13] text-[#F2DDA8] border border-[var(--color-gold-500)]/40 shadow-sm"
                                )}
                              >
                                {ICONS[step.icon]}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono text-xs text-[#E6C98A] uppercase tracking-wider font-semibold">
                                    {step.tagline}
                                  </span>
                                </div>
                                <h4 className="font-display text-lg sm:text-xl text-[#FAF7F2] font-normal group-hover:text-[#F2DDA8] transition-colors">
                                  {step.title}
                                </h4>
                              </div>
                            </div>

                            {/* Timeframe & Metric pills */}
                            <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 self-start">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#241D15] border border-[var(--color-gold-500)]/35 font-mono text-[10px] text-[#FAF7F2] whitespace-nowrap font-medium shadow-sm">
                                <Clock size={11} className="text-[#F2DDA8]" />
                                <span>{step.timeframe}</span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-400/50 font-mono text-[10px] text-emerald-300 whitespace-nowrap font-semibold shadow-sm">
                                <Sparkle size={11} />
                                <span>{step.metric}</span>
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="font-body text-xs sm:text-sm text-[#D8D1C2] leading-relaxed mb-4">
                            {step.description}
                          </p>

                          {/* Deliverables Tray */}
                          <div className="pt-3 border-t border-[var(--color-gold-500)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[10px] text-[#C5BDB0] uppercase tracking-widest mr-1 font-semibold">
                                Deliverables:
                              </span>
                              {step.deliverables.map((item) => (
                                <span
                                  key={item}
                                  className="px-2.5 py-1 rounded bg-[#241D15] border border-[var(--color-gold-500)]/30 font-body text-xs text-[#FAF7F2] font-medium group-hover:border-[var(--color-gold-500)]/50 transition-colors shadow-sm"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="font-mono text-xs text-[#F2DDA8] hover:text-[#FAF7F2] flex items-center gap-1 self-start sm:self-auto transition-colors group/btn font-medium"
                            >
                              <span>Consult on Step</span>
                              <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
