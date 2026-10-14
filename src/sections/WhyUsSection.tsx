// src/sections/WhyUsSection.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// 12 Authentic Pillars from Brochure Page 8
const WHY_US_ITEMS = [
  {
    number: "01",
    title: "20+ Years of Industry Experience",
    description:
      "Deep cross-disciplinary expertise in real estate, corporate finance, and capital allocation across Indian and global markets.",
  },
  {
    number: "02",
    title: "End-to-End Investment Management",
    description:
      "Full lifecycle ownership — from initial property identification to acquisition, tenant leasing, maintenance, and exit.",
  },
  {
    number: "03",
    title: "Professional Asset Management",
    description:
      "Disciplined portfolio structuring that multiplies your capital while actively defending against market downside.",
  },
  {
    number: "04",
    title: "Transparent 10-Step Process",
    description:
      "Complete clarity at every stage with zero hidden costs, clear documentation, and direct developer pricing.",
  },
  {
    number: "05",
    title: "Legal & Compliance Assistance",
    description:
      "In-house statutory vetting, title search reports, regulatory compliance, and seamless deed registration support.",
  },
  {
    number: "06",
    title: "Verified Investment Opportunities",
    description:
      "100% litigation-free property verification before any asset is recommended to our client network.",
  },
  {
    number: "07",
    title: "Dedicated Relationship Managers",
    description:
      "Personalized advisory with direct single-point accountability, regular reviews, and responsive portfolio care.",
  },
  {
    number: "08",
    title: "Property Management Support",
    description:
      "You invest, we manage. Tenant onboarding, rental agreements, maintenance coordination, and government filings.",
  },
  {
    number: "09",
    title: "Guaranteed Rental Assistance",
    description:
      "Dedicated leasing specialists ensuring high occupancy, reliable corporate tenants, and consistent rental inflows.",
  },
  {
    number: "10",
    title: "Investment Exit Planning",
    description:
      "Planned liquidation strategies when valuations mature, maximizing capital gains and tax-efficient reinvestment.",
  },
  {
    number: "11",
    title: "National & International Solutions",
    description:
      "Seamless cross-border investment access across India, Dubai (UAE), Europe, Singapore, and Malaysia.",
  },
  {
    number: "12",
    title: "Personalized Wealth Creation Strategies",
    description:
      "Tailor-made portfolios designed specifically around your family goals, liquidity horizon, and risk appetite.",
  },
];

// 8 Core Promise Pillars from Brochure Page 9
const PROMISE_PILLARS = [
  "Expert Guidance",
  "Carefully Selected Opportunities",
  "Professional Asset Management",
  "End-to-End Support",
  "Wealth Creation",
  "Transparency & Integrity",
  "Dedicated Relationship Managers",
  "Global & Domestic Solutions",
];

export default function WhyUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="section-py bg-transparent relative"
    >
      <div className="container-au">
        <Divider type="diamond" className="mb-6 md:mb-8" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Our Commitment & Promise (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col gap-8">
            <SectionHeader
              eyebrow="Why Choose Aurixia Capital"
              eyebrowNumber="06"
              title={
                <>
                  Your Trust. Our Expertise.
                  <br />
                  <em className="text-[var(--color-gold-300)] not-italic">
                    Your Wealth. Our Commitment.
                  </em>
                </>
              }
              subtitle="At Aurixia Capital, every investment decision is guided by integrity, transparency, market expertise, and an unwavering commitment to helping our clients build lasting wealth."
            />

            {/* Architectural Prestige Card */}
            <div className="relative w-full h-44 rounded-sm overflow-hidden border border-[var(--color-gold-500)]/45 shadow-lg group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop")`,
                }}
                role="img"
                aria-label="Aurixia Capital Headquarters and Financial Centers"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-[#14110C]/35 to-transparent" />
              <div className="absolute top-2.5 left-3">
                <span className="font-mono text-[9px] text-[#F2DDA8] uppercase tracking-wider font-semibold bg-[#14110C]/90 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/50 backdrop-blur-sm">
                  AURIXA CAPITAL · 20+ YEARS PEDIGREE
                </span>
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#FAF7F2] font-medium">Fiduciary Mandate</span>
                <span className="text-emerald-400 font-semibold bg-[#0A0907]/80 px-2 py-0.5 rounded border border-emerald-400/40">
                  100% Client-Aligned
                </span>
              </div>
            </div>

            {/* Our Commitment Box (Brochure Page 9) */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/45 rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_16px_36px_-8px_rgba(0,0,0,0.9)] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] animate-pulse" aria-hidden="true" />
                <p className="font-body text-xs text-[#F2DDA8] uppercase tracking-[0.2em] font-semibold">
                  Our Corporate Commitment
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-[#D8D1C2] leading-relaxed">
                Whether generating monthly rental income, preserving capital, or expanding into global wealth corridors, our senior team guides you with absolute fiduciary integrity.
              </p>

              <div className="pt-2.5 border-t border-[var(--color-gold-500)]/30 flex items-center gap-2">
                <ShieldCheck size={16} weight="fill" className="text-[#F2DDA8] flex-shrink-0" />
                <span className="font-body text-xs text-[#FAF7F2] uppercase tracking-[0.14em] font-semibold">
                  Litigation-Free Verified Opportunities
                </span>
              </div>
            </div>

            {/* Our Promise: 8 Pillars (Brochure Page 9) */}
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-xs text-[#F2DDA8] uppercase tracking-[0.2em] font-semibold">
                Our Promise — 8 Pillars:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PROMISE_PILLARS.map((pillar) => (
                  <div
                    key={pillar}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#221B13] border border-[var(--color-gold-500)]/35 rounded-sm text-[11px] font-body text-[#FAF7F2] hover:border-[var(--color-gold-400)]/60 transition-colors shadow-sm"
                  >
                    <CheckCircle size={12} weight="fill" className="text-[#F2DDA8] flex-shrink-0" />
                    <span className="leading-tight font-medium truncate">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              as="button"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              id="why-us-cta"
              className="self-start text-xs py-2.5 px-5"
            >
              Book a Confidential Consultation
            </Button>
          </div>

          {/* Right Column: 12 Why Choose Aurixia Capital Grid (7 cols) */}
          <div className="lg:col-span-7">
            <div className="why-grid grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {WHY_US_ITEMS.map((item) => (
                <div
                  key={item.number}
                  className="why-card p-4 sm:p-4.5 rounded-sm bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/35 hover:border-[var(--color-gold-400)]/70 hover:bg-[#221B13] transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#F2DDA8]">
                        {item.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)]/40 group-hover:bg-[var(--color-gold-400)] transition-colors" />
                    </div>
                    <h3 className="font-display font-light text-base text-[#FAF7F2] leading-snug group-hover:text-[#F2DDA8] transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-[#D8D1C2] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner: Signature Closing Slogan with Architectural Backdrop */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-sm border border-[var(--color-gold-500)]/50 text-center relative overflow-hidden shadow-[inset_0_1px_0_rgba(245,230,196,0.18),0_20px_48px_-8px_rgba(0,0,0,0.95)]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-25"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80&auto=format&fit=crop")`,
            }}
            role="img"
            aria-label="Aurixia Capital Creed Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1912]/95 via-[#14100A]/90 to-[#1E1912]/95" />
          <div className="relative z-10">
            <div className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold-300)] to-transparent mb-3" />
            <p className="font-body text-xs text-[#F2DDA8] uppercase tracking-[0.28em] font-semibold mb-2">
              Aurixia Capital Creed
            </p>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7F2] tracking-tight mb-2.5">
              Invest Smart. Build Wealth.
              <br />
              <span className="text-[#F2DDA8]">Create Your Legacy with Aurixia Capital.</span>
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#DCD5C6] max-w-xl mx-auto mb-5 leading-relaxed">
              We believe investing should be transparent, secure, and rewarding. Partner with our dedicated fiduciary team to grow your investments with total confidence.
            </p>
            <Button
              variant="primary"
              as="button"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              id="creed-cta"
              className="text-xs py-2.5 px-6 mx-auto"
            >
              Start Your Investment Journey
            </Button>
          </div>
        </div>

        <Divider type="diamond" className="mt-8 md:mt-10" />
      </div>
    </section>
  );
}
