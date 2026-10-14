// src/sections/ClockStrip.tsx
"use client";

import { useEffect, useState, useRef, useId } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface CorridorDesk {
  city: string;
  country: string;
  code: string;
  timezone: string;
  abbr: string;
  offset: string;
  coordinates: string;
  mandate: string;
  coreAsset: string;
  marketOpenHour: number;
  marketCloseHour: number;
}

const GLOBAL_DESKS: CorridorDesk[] = [
  {
    city: "Mumbai",
    country: "India",
    code: "BOM",
    timezone: "Asia/Kolkata",
    abbr: "IST",
    offset: "UTC +5:30",
    coordinates: "19.0760° N · 72.8777° E",
    mandate: "Private Wealth & Syndicated Debt",
    coreAsset: "Pre-IPO & Grade-A Commercial RE",
    marketOpenHour: 9,
    marketCloseHour: 17.5,
  },
  {
    city: "Dubai",
    country: "UAE",
    code: "DXB",
    timezone: "Asia/Dubai",
    abbr: "GST",
    offset: "UTC +4:00",
    coordinates: "25.2048° N · 55.2708° E",
    mandate: "DIFC Inflows & Family Office Structuring",
    coreAsset: "Golden Visa & Prime Offshore Holdings",
    marketOpenHour: 9,
    marketCloseHour: 18,
  },
  {
    city: "Singapore",
    country: "Singapore",
    code: "SIN",
    timezone: "Asia/Singapore",
    abbr: "SGT",
    offset: "UTC +8:00",
    coordinates: "1.3521° N · 103.8198° E",
    mandate: "VCC Funds & Cross-Border Tax Treaty",
    coreAsset: "Southeast Asian Liquid Trusts",
    marketOpenHour: 9,
    marketCloseHour: 17,
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    code: "KUL",
    timezone: "Asia/Kuala_Lumpur",
    abbr: "MYT",
    offset: "UTC +8:00",
    coordinates: "3.1390° N · 101.6869° E",
    mandate: "ASEAN Industrial Corridors & REITs",
    coreAsset: "High-Yield Logistics & Land Banks",
    marketOpenHour: 9,
    marketCloseHour: 17,
  },
  {
    city: "London",
    country: "United Kingdom",
    code: "LHR",
    timezone: "Europe/London",
    abbr: "GMT",
    offset: "UTC +0:00",
    coordinates: "51.5074° N · 0.1278° W",
    mandate: "UK-India DTAA & Prime Estate Advisory",
    coreAsset: "Mayfair/City Portfolios & Trust Structuring",
    marketOpenHour: 8,
    marketCloseHour: 16.5,
  },
];

interface ClockState {
  hours: string;
  minutes: string;
  seconds: string;
  dayDate: string;
  hourNum: number;
  minNum: number;
  secNum: number;
}

function getDeskTime(timezone: string): ClockState {
  const now = new Date();

  const timeStr = now.toLocaleTimeString("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [hours, minutes, seconds] = timeStr.split(":");
  const hourNum = parseInt(hours, 10);
  const minNum = parseInt(minutes, 10);
  const secNum = parseInt(seconds, 10);

  const dayDate = now.toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return {
    hours,
    minutes,
    seconds,
    dayDate,
    hourNum,
    minNum,
    secNum,
  };
}

/**
 * Swiss-inspired Analog Micro-Dial
 * Displays live hour, minute, and second sweep in a crisp 42px horological dial
 */
function SwissMicroDial({
  hourNum,
  minNum,
  secNum,
  isMarketOpen,
}: {
  hourNum: number;
  minNum: number;
  secNum: number;
  isMarketOpen: boolean;
}) {
  const hourAngle = ((hourNum % 12) + minNum / 60) * 30;
  const minuteAngle = (minNum + secNum / 60) * 6;
  const secondAngle = secNum * 6;

  return (
    <div className="relative w-11 h-11 flex-shrink-0" aria-hidden="true">
      <svg
        viewBox="0 0 44 44"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      >
        {/* Outer Bezel */}
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="rgba(11, 10, 8, 0.85)"
          stroke="rgba(201, 162, 77, 0.3)"
          strokeWidth="1"
        />

        {/* Inner concentric hairline */}
        <circle
          cx="22"
          cy="22"
          r="16.5"
          fill="none"
          stroke="rgba(201, 162, 77, 0.12)"
          strokeWidth="0.75"
          strokeDasharray="1 3"
        />

        {/* Cardinal Hour Ticks (12, 3, 6, 9) */}
        <line x1="22" y1="3" x2="22" y2="7.5" stroke="#e6c98a" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="41" y1="22" x2="36.5" y2="22" stroke="#e6c98a" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="22" y1="41" x2="22" y2="36.5" stroke="#e6c98a" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="3" y1="22" x2="7.5" y2="22" stroke="#e6c98a" strokeWidth="1.25" strokeLinecap="round" />

        {/* Hour Hand */}
        <line
          x1="22"
          y1="22"
          x2="22"
          y2="11.5"
          stroke="#f4efe4"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 22 22)`}
          className="transition-transform duration-300 ease-out"
        />

        {/* Minute Hand */}
        <line
          x1="22"
          y1="22"
          x2="22"
          y2="7"
          stroke="#e6c98a"
          strokeWidth="1.1"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 22 22)`}
          className="transition-transform duration-300 ease-out"
        />

        {/* Second Hand with Counterweight */}
        <line
          x1="22"
          y1="26"
          x2="22"
          y2="5.5"
          stroke={isMarketOpen ? "#34d399" : "#c9a24d"}
          strokeWidth="0.8"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 22 22)`}
          className="transition-transform duration-200 ease-linear"
        />

        {/* Center Jewel Pip */}
        <circle cx="22" cy="22" r="2.2" fill="#e6c98a" />
        <circle cx="22" cy="22" r="0.9" fill="#0b0a08" />
      </svg>
    </div>
  );
}

function DeskCard({ desk }: { desk: CorridorDesk }) {
  const [clock, setClock] = useState<ClockState | null>(null);

  useEffect(() => {
    setClock(getDeskTime(desk.timezone));
    const interval = setInterval(() => {
      setClock(getDeskTime(desk.timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [desk.timezone]);

  // Fallback while mounting
  const timeDisplay = clock || {
    hours: "--",
    minutes: "--",
    seconds: "--",
    dayDate: desk.abbr,
    hourNum: 12,
    minNum: 0,
    secNum: 0,
  };

  const hourDecimal = timeDisplay.hourNum + timeDisplay.minNum / 60;
  const isMarketOpen =
    hourDecimal >= desk.marketOpenHour && hourDecimal < desk.marketCloseHour;
  const isExtendedSession =
    hourDecimal >= desk.marketCloseHour && hourDecimal < desk.marketCloseHour + 4;

  const statusLabel = isMarketOpen
    ? "TRADING DESK ACTIVE"
    : isExtendedSession
    ? "SETTLEMENT & REPORTING"
    : "OVERNIGHT SYNDICATION";

  const statusDotClass = isMarketOpen
    ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
    : isExtendedSession
    ? "bg-[var(--color-gold-300)] shadow-[0_0_8px_rgba(230,201,138,0.6)]"
    : "bg-[var(--color-stone-600)]";

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 lg:p-5 xl:p-6 rounded-sm",
        "bg-gradient-to-b from-[#1C1711] via-[#16120D] to-[#110E09]",
        "border border-[var(--color-gold-500)]/40 hover:border-[var(--color-gold-400)]",
        "shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_14px_32px_-6px_rgba(0,0,0,0.85)]",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(245,230,196,0.25),0_18px_40px_-8px_rgba(0,0,0,0.95),0_0_20px_rgba(201,162,77,0.15)]"
      )}
    >
      {/* Ambient hover flare */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,77,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Top golden hairline accent on hover */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold-300)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
        aria-hidden="true"
      />

      {/* Card Header: City Code & Status */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold tracking-wider text-[var(--color-gold-300)] bg-[#262017] px-2 py-0.5 rounded-sm border border-[var(--color-gold-500)]/45 shadow-sm">
            {desk.code}
          </span>
          <span className="font-body text-[11px] text-[#C5BDB0] tracking-wider uppercase font-medium">
            {desk.offset}
          </span>
        </div>

        {/* Live Market Status Pill */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#201A13] border border-[var(--color-gold-500)]/40">
          <span className={cn("w-1.5 h-1.5 rounded-full transition-colors", statusDotClass)} />
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#D8D1C2] font-semibold">
            {isMarketOpen ? "OPEN" : isExtendedSession ? "EXTENDED" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* City & Country */}
      <div className="mt-4 mb-2 relative z-10">
        <h3 className="font-display text-xl sm:text-2xl text-[var(--color-ivory-50)] group-hover:text-[var(--color-gold-100)] transition-colors flex items-baseline gap-2">
          {desk.city}
          <span className="font-body text-[11px] text-[#C5BDB0] tracking-widest uppercase font-light">
            {desk.country}
          </span>
        </h3>
        <p className="font-mono text-[9.5px] text-[#A89E8D] tracking-widest mt-0.5">
          {desk.coordinates}
        </p>
      </div>

      {/* Main Horological Display: Micro-Dial + Big Cormorant Numerals */}
      <div className="my-4 py-3 border-y border-[var(--hairline)]/25 flex items-center justify-between gap-3 relative z-10">
        {/* Digital Clock */}
        <div>
          <div
            className="font-display font-light text-[var(--color-ivory-50)] leading-none tabular-nums flex items-baseline"
            style={{ fontSize: "clamp(2rem, 1.8vw + 1rem, 2.75rem)" }}
            aria-live="polite"
            aria-label={`${desk.city} time: ${timeDisplay.hours}:${timeDisplay.minutes}`}
          >
            <span>{timeDisplay.hours}</span>
            <span className="text-[var(--color-gold-300)] animate-pulse mx-0.5">:</span>
            <span>{timeDisplay.minutes}</span>
            <span className="font-mono text-xs sm:text-sm text-[var(--color-gold-500)] ml-1 tracking-wider opacity-85">
              .{timeDisplay.seconds}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-mono text-[10px] text-[var(--color-stone-400)] uppercase tracking-wider">
              {timeDisplay.dayDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--hairline)]" />
            <span className="font-mono text-[10px] text-[var(--color-gold-300)] font-medium">
              {desk.abbr}
            </span>
          </div>
        </div>

        {/* Live Swiss Analog Chronometer */}
        <SwissMicroDial
          hourNum={timeDisplay.hourNum}
          minNum={timeDisplay.minNum}
          secNum={timeDisplay.secNum}
          isMarketOpen={isMarketOpen}
        />
      </div>

      {/* Footer Content: Investment Mandate & Focus */}
      <div className="space-y-1.5 relative z-10 text-left">
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider">
          <span className="text-[var(--color-gold-500)]">Corridor Mandate</span>
          <span className="text-[var(--color-stone-500)] text-[9px]">{statusLabel}</span>
        </div>
        <p className="font-body text-xs text-[var(--color-ivory-200)] line-clamp-1 group-hover:text-[var(--color-ivory-50)] transition-colors">
          {desk.mandate}
        </p>
        <div className="pt-1 flex items-center gap-1.5">
          <span className="text-[var(--color-gold-300)] text-[10px]">↳</span>
          <p className="font-body text-[11px] text-[var(--color-stone-400)] truncate">
            {desk.coreAsset}
          </p>
        </div>
      </div>
    </div>
  );
}

const TICKER_ITEMS = [
  "AURIXA SYNDICATION DESK",
  "DUBAI ⇄ MUMBAI CAPITAL BRIDGE: REAL-TIME ADVISORY ACTIVE",
  "SINGAPORE VCC & MULTI-FAMILY TRUST STRUCTURING: Q4 ALLOCATION OPEN",
  "LONDON OFFSHORE WEALTH & PRIME MAYFAIR/BELGRAVIA REAL ESTATE",
  "KUALA LUMPUR REGIONAL LOGISTICS & INDUSTRIAL ASSET ALLOCATION",
  "ZERO THIRD-PARTY COMMISSIONS // 100% INDEPENDENT FIDUCIARY ADVOCACY",
  "DUAL-JURISDICTION COMPLIANCE · FEMA & DTAA OPTIMIZATION",
  "PRIVATE CREDIT & SENIOR SECURED CAPITAL PRESERVATION MANDATES",
];

export default function ClockStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate top and bottom dividers
      gsap.fromTo(
        ".clock-divider-line",
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Animate header metadata
      gsap.fromTo(
        ".clock-header-item",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Animate Desk Cards staggered
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clock-strip"
      ref={sectionRef}
      className="bg-transparent relative overflow-hidden"
      aria-label="Active Global Desks & Investment Corridors"
    >
      {/* Top Hairline Divider */}
      <div className="clock-divider-line w-full h-px bg-[var(--hairline)]" />

      {/* Atmospheric Ambient Glow behind grid */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-[radial-gradient(ellipse_at_center,rgba(201,162,77,0.08),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Section Header: Luxury Institutional Title & Global Coverage Bar */}
      <div className="container-au py-6 sm:py-7">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--hairline)]/30 pb-5">
          {/* Left: Eyebrow and Headline */}
          <div>
            <div className="clock-header-item flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-body text-[11px] font-medium tracking-[0.22em] text-[var(--color-gold-300)] uppercase">
                Active Global Desks · 24/7 Cross-Border Execution
              </span>
            </div>
            <h2 className="clock-header-item font-display text-2xl sm:text-3xl text-[var(--color-ivory-50)] tracking-tight">
              Synchronized Wealth Architecture Across 5 Capital Hubs
            </h2>
          </div>

          {/* Right: Operational Summary */}
          <div className="clock-header-item flex items-center gap-4 text-left md:text-right font-mono text-[11px] text-[var(--color-stone-400)]">
            <div className="hidden sm:block">
              <span className="text-[var(--color-gold-300)] font-semibold">5 Corridors Active</span>
              <span className="mx-2 text-[var(--hairline)]">|</span>
              <span>UTC +00:00 to +08:00</span>
            </div>
            <div className="px-3 py-1 rounded bg-[#1C1711] border border-[var(--color-gold-500)]/45 text-[10px] text-[#FAF7F2] flex items-center gap-2 shadow-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYNDICATION ENGINE LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Column Global Desk Grid */}
      <div className="container-au pb-8">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-3 xl:gap-4"
        >
          {GLOBAL_DESKS.map((desk) => (
            <DeskCard key={desk.city} desk={desk} />
          ))}
        </div>
      </div>

      {/* Continuous Velocity Institutional Ticker Ribbon */}
      <div className="relative border-t border-[var(--hairline)]/40 bg-[var(--color-ink-900)] py-3 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase text-[var(--color-stone-400)]">
          {TICKER_ITEMS.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-8 flex-shrink-0">
              <span className="hover:text-[var(--color-gold-300)] transition-colors cursor-default">
                {item}
              </span>
              <span className="text-[var(--color-gold-500)] opacity-60 text-[9px]">◆</span>
            </div>
          ))}
          {TICKER_ITEMS.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-8 flex-shrink-0">
              <span className="hover:text-[var(--color-gold-300)] transition-colors cursor-default">
                {item}
              </span>
              <span className="text-[var(--color-gold-500)] opacity-60 text-[9px]">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hairline Divider */}
      <div className="clock-divider-line w-full h-px bg-[var(--hairline)]" />
    </section>
  );
}
