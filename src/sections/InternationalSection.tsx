// src/sections/InternationalSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MapPin, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { DESTINATIONS } from "@/data/destinations";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the interactive 3D Globe
const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full aspect-square bg-[var(--color-ink-850)] flex items-center justify-center border border-[var(--hairline)]"
      aria-label="Loading 3D globe..."
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-3 h-3 rounded-full border border-[var(--color-gold-500)] animate-ping" />
        <span className="font-mono text-[10px] text-[var(--color-stone-500)] uppercase tracking-widest">
          Initialising Globe
        </span>
      </div>
    </div>
  ),
});

export default function InternationalSection() {
  const [activeDestination, setActiveDestination] = useState(0);
  const [prevDest, setPrevDest] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const briefingRef = useRef<HTMLDivElement>(null);

  const activeDest = DESTINATIONS[activeDestination];

  const handleDestinationChange = (i: number) => {
    if (i === activeDestination) return;
    setPrevDest(activeDestination);
    setActiveDestination(i);
  };

  // Animate briefing card on destination change
  useEffect(() => {
    if (!briefingRef.current) return;
    gsap.fromTo(
      briefingRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [activeDestination]);

  // Section entrance animations
  useGSAP(
    () => {
      gsap.fromTo(
        ".intl-dest-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intl-dest-list",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".intl-globe-col",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intl-globe-col",
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".intl-stat-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".intl-stats-row",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="international"
      className="section-py bg-transparent relative text-[var(--color-ivory-50)]"
      aria-label="International Investment Corridors"
    >
      {/* Background ambient — isolated overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/4 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(201,162,77,0.08),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="container-au relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
              <Eyebrow number="04">GLOBAL INVESTMENT CORRIDORS · 5 STRATEGIC HUBS</Eyebrow>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-[1.12] tracking-tight">
              Expand Your Capital Footprint
              <br />
              <em className="text-[#F2DDA8] not-italic font-light">
                Across Premier Global Markets.
              </em>
            </h2>
          </div>
          <div className="p-4 rounded-sm bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 shadow-[inset_0_1px_0_rgba(245,230,196,0.15),0_10px_24px_rgba(0,0,0,0.8)] max-w-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-[#F2DDA8] font-semibold tracking-wider uppercase">
                FEMA · RBI · DTAA Compliant
              </span>
            </div>
            <p className="font-body text-xs text-[#D8D1C2] leading-relaxed">
              Cross-border asset advisory across India, Middle East, Europe, and Southeast Asia with dual-jurisdiction tax optimization.
            </p>
          </div>
        </div>

        {/* ── Key Corridor Stats ── */}
        <div className="intl-stats-row grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { value: "5", label: "Active Corridors", sub: "Mumbai → London corridor" },
            { value: "0%", label: "Capital Gains Tax", sub: "Dubai freehold investment" },
            { value: "AAA", label: "Singapore Sovereign", sub: "World's #1 wealth haven" },
            { value: "10yr", label: "UAE Golden Visa", sub: "AED 2M+ asset qualification" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="intl-stat-card p-4 sm:p-5 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)] rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_12px_28px_-8px_rgba(0,0,0,0.85)] transition-all duration-300"
            >
              <span className="font-display text-2xl sm:text-3xl text-[#F2DDA8] font-light leading-none block mb-1.5">
                {stat.value}
              </span>
              <p className="font-body text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="font-mono text-[11px] text-[#B8B09F] mt-1 font-medium">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main Grid: Destination List + Globe ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 relative">

          {/* ── Left: Interactive Destination Selector (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[var(--color-gold-500)]/20">
              <span className="font-mono text-[11px] text-[#F2DDA8] uppercase tracking-widest font-medium">
                SELECT A CAPITAL HUB TO INSPECT:
              </span>
              <span className="font-mono text-[10px] text-[#F2DDA8] bg-[#262017] px-2.5 py-0.5 rounded border border-[var(--color-gold-500)]/45 font-semibold shadow-sm">
                {activeDestination + 1} / {DESTINATIONS.length} ACTIVE HUBS
              </span>
            </div>

            <ol className="intl-dest-list flex flex-col space-y-3" role="list">
              {DESTINATIONS.map((dest, i) => {
                const isSelected = activeDestination === i;
                return (
                  <li key={dest.id} className="intl-dest-row" style={{ opacity: 0 }}>
                    <button
                      className={cn(
                        "w-full text-left p-4 sm:p-5 rounded-sm transition-all duration-300 group cursor-pointer border",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-500)]",
                        isSelected
                          ? "bg-gradient-to-br from-[#241D14] to-[#14100A] border-[var(--color-gold-400)] shadow-[inset_0_1px_0_rgba(245,230,196,0.2),0_16px_36px_-6px_rgba(0,0,0,0.95)]"
                          : "bg-gradient-to-b from-[#18140E] to-[#110E09] border border-[var(--color-gold-500)]/35 hover:bg-[#201A13] hover:border-[var(--color-gold-400)]/60 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.7)]"
                      )}
                      onClick={() => handleDestinationChange(i)}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start gap-3 sm:gap-5">
                        {/* Number */}
                        <span
                          className={cn(
                            "font-display font-light leading-none transition-colors duration-300 flex-shrink-0 mt-0.5 w-8 sm:w-10",
                            isSelected
                              ? "text-[#F2DDA8]"
                              : "text-[#8E7E62] group-hover:text-[#F2DDA8]",
                            "text-xl sm:text-2xl"
                          )}
                        >
                          {dest.number}
                        </span>

                        <div className="flex-1 min-w-0">
                          {/* City + Country header */}
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3
                                className={cn(
                                  "font-display font-light leading-tight transition-colors duration-300",
                                  "text-lg sm:text-2xl",
                                  isSelected
                                    ? "text-[#FAF7F2] font-normal"
                                    : "text-[#E5DFD3] group-hover:text-[#FAF7F2]"
                                )}
                              >
                                {dest.city}
                              </h3>
                              <MapPin
                                size={15}
                                weight="fill"
                                className={cn(
                                  "flex-shrink-0 mt-0.5 transition-colors",
                                  isSelected ? "text-[#F2DDA8]" : "text-[#8E7E62] group-hover:text-[#F2DDA8]"
                                )}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-[#F2DDA8] bg-[#262017] px-2.5 py-0.5 rounded border border-[var(--color-gold-500)]/45 uppercase tracking-wider flex-shrink-0 mt-0.5 font-semibold shadow-sm">
                              {dest.country}
                            </span>
                          </div>

                          {/* Tagline & Quick Skyline Thumbnail */}
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-mono text-xs text-[#E6C98A] uppercase tracking-wide font-medium">
                              {dest.description}
                            </p>
                            {!isSelected && (
                              <div className="w-16 h-10 rounded-sm overflow-hidden border border-[var(--color-gold-500)]/35 flex-shrink-0 relative hidden sm:block shadow-sm">
                                <div
                                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                  style={{ backgroundImage: `url("${dest.image}")` }}
                                  role="img"
                                  aria-label={`${dest.city} preview`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              </div>
                            )}
                          </div>

                          {/* Expanded panel for active */}
                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-500",
                              isSelected ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                            )}
                          >
                            <div className="pt-4 border-t border-[var(--color-gold-500)]/20 grid sm:grid-cols-2 gap-4">
                              {/* Description */}
                              <div>
                                <p className="font-body text-xs sm:text-sm text-[#DCD5C6] leading-relaxed mb-3">
                                  {dest.detail}
                                </p>
                                <div className="space-y-2">
                                  {dest.highlights.map((h) => (
                                    <div key={h} className="flex items-start gap-2">
                                      <span className="text-[#F2DDA8] text-[11px] mt-0.5 flex-shrink-0">◆</span>
                                      <span className="font-body text-xs text-[#FAF7F2] leading-snug">{h}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Image + Portfolio scope */}
                              <div className="flex flex-col gap-3">
                                <div
                                  className="relative overflow-hidden rounded-sm border border-[var(--color-gold-500)]/30 aspect-video shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
                                >
                                  <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url("${dest.image}")` }}
                                    role="img"
                                    aria-label={`${dest.city} skyline`}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907]/90 via-[#0A0907]/30 to-transparent" />
                                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-[#F2DDA8] font-medium">
                                      {dest.region}
                                    </span>
                                    <div className="flex items-center gap-1.5 bg-[#0A0907]/80 px-2 py-0.5 rounded border border-emerald-400/40">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                      <span className="font-mono text-[9px] text-emerald-400 font-semibold tracking-wider">ACTIVE</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                  {dest.guidance.map((g) => (
                                    <span
                                      key={g}
                                      className="px-2 py-1 bg-[#221B13] border border-[var(--color-gold-500)]/35 rounded-sm font-mono text-[10px] text-[#FAF7F2] uppercase tracking-wide font-medium shadow-sm"
                                    >
                                      {g}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Active indicator chevron */}
                        <div
                          className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 border mt-0.5",
                            isSelected
                              ? "bg-[var(--color-gold-400)] text-[#0A0907] border-[var(--color-gold-400)] shadow-[0_2px_8px_rgba(201,162,77,0.4)]"
                              : "bg-[#181510] text-[#8E7E62] border-[#2A241A] group-hover:border-[var(--color-gold-500)]/40 group-hover:text-[#F2DDA8]"
                          )}
                        >
                          <ArrowRight
                            size={14}
                            weight="bold"
                            className={cn(
                              "transition-transform duration-300",
                              isSelected ? "translate-x-0.5" : "group-hover:translate-x-0.5"
                            )}
                          />
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── Right: Interactive 3D Globe + Briefing Card (5 cols) ── */}
          <div className="lg:col-span-5 relative">
            <div className="intl-globe-col lg:sticky lg:top-24 flex flex-col gap-4">
              {/* Globe canvas container */}
              <div className="relative rounded-sm overflow-hidden border border-[var(--color-gold-500)]/30 bg-[#0A0907] shadow-[inset_0_1px_0_rgba(242,221,168,0.1),0_20px_50px_-15px_rgba(0,0,0,0.95)]">
                {/* Top overlay label */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-[#0A0907]/90 via-[#0A0907]/60 to-transparent pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-[#F2DDA8] uppercase tracking-widest font-semibold">
                      AURIXA CAPITAL · LIVE CORRIDOR MAP
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#FAF7F2] bg-[#181510]/80 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/30">
                    5 NODES ACTIVE
                  </span>
                </div>

                <Globe
                  activeIndex={activeDestination}
                  onDestinationClick={handleDestinationChange}
                />
              </div>

              {/* Briefing Card — updates per selected destination */}
              <div
                ref={briefingRef}
                className="p-5 sm:p-6 bg-gradient-to-b from-[#181510] to-[#12100C] border border-[var(--color-gold-500)]/35 rounded-sm relative overflow-hidden shadow-[inset_0_1px_0_rgba(242,221,168,0.12),0_16px_36px_-8px_rgba(0,0,0,0.9)]"
              >
                <div
                  className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(201,162,77,0.15),transparent_70%)]"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-[10px] text-[#F2DDA8] uppercase tracking-widest mb-1 font-semibold">
                      SELECTED CORRIDOR · {activeDest.number} / 0{DESTINATIONS.length}
                    </p>
                    <h4 className="font-display text-xl sm:text-2xl text-[#FAF7F2] font-light">
                      {activeDest.city}
                    </h4>
                    <p className="font-mono text-xs text-[#C5BDB0] mt-0.5">
                      {activeDest.region}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0907] border border-emerald-400/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider font-semibold">ACTIVE HUB</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#F2DDA8] mb-3 tracking-wide">
                  {activeDest.description}
                </div>

                {/* Miniature highlights */}
                <div className="space-y-2 mb-4">
                  {activeDest.highlights.slice(0, 3).map((h) => (
                    <div key={h} className="flex items-start gap-2">
                      <span className="text-[#F2DDA8] text-[10px] mt-0.5 flex-shrink-0">◆</span>
                      <span className="font-body text-xs text-[#FAF7F2] leading-snug">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--color-gold-500)]/20 flex flex-wrap gap-1.5">
                  {activeDest.guidance.slice(0, 2).map((g) => (
                    <span
                      key={g}
                      className="px-2.5 py-1 bg-[#221B13] border border-[var(--color-gold-500)]/35 font-mono text-[9px] text-[#FAF7F2] rounded-sm uppercase tracking-wide font-medium shadow-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick destination switcher pills */}
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS.map((dest, i) => (
                  <button
                    key={dest.id}
                    onClick={() => handleDestinationChange(i)}
                    className={cn(
                      "px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all duration-250 cursor-pointer border",
                      i === activeDestination
                        ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] font-bold shadow-[0_2px_10px_rgba(201,162,77,0.35)]"
                        : "bg-[#18140E] text-[#D8D1C2] border border-[var(--color-gold-500)]/35 hover:border-[var(--color-gold-400)]/60 hover:text-[#FAF7F2] hover:bg-[#201A13]"
                    )}
                  >
                    {dest.city.split(" ·")[0].split(" &")[0].split(",")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Cross-Border Corporate Banner ── */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#1E1912] via-[#14100A] to-[#1E1912] border border-[var(--color-gold-500)]/45 rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_20px_48px_-8px_rgba(0,0,0,0.95)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold-400)]" />
              <span className="font-mono text-xs text-[#F2DDA8] uppercase tracking-widest font-semibold">
                CROSS-BORDER CORPORATE & ENTERPRISE INVESTMENTS
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#D8D1C2] max-w-2xl leading-relaxed">
              We also facilitate cross-border transactions in operational commercial assets — including hotels &amp; resorts, Grade-A commercial buildings, logistics warehouses, restaurant chains, and full enterprise acquisitions across both Indian and international corridors.
            </p>
          </div>

          <Button
            variant="primary"
            as="button"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            id="international-cta"
            className="flex-shrink-0"
          >
            Inquire for Global Advisory
          </Button>
        </div>

        <Divider type="diamond" className="mt-8 md:mt-10" />
      </div>
    </section>
  );
}
