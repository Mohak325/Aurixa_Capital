// src/sections/FAQSection.tsx
"use client";

import { useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Plus,
  Minus,
  MagnifyingGlass,
  Sparkle,
  PhoneCall,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, FAQ_CATEGORIES, FAQItem } from "@/data/faq";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border transition-all duration-300 overflow-hidden",
        isOpen
          ? "bg-gradient-to-br from-[#241D14] to-[#14100A] border-[var(--color-gold-400)] shadow-[inset_0_1px_0_rgba(245,230,196,0.2),0_18px_36px_-6px_rgba(0,0,0,0.95)]"
          : "bg-gradient-to-b from-[#18140E] to-[#110E09] border border-[var(--color-gold-500)]/35 hover:bg-[#201A13] hover:border-[var(--color-gold-400)]/60 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.7)]"
      )}
    >
      <button
        id={`faq-btn-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
        onClick={onToggle}
        className={cn(
          "w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left transition-colors duration-200 select-none cursor-pointer group",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-500)]"
        )}
      >
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Item index */}
          <span
            className={cn(
              "font-mono text-xs font-bold flex-shrink-0 mt-0.5 transition-colors",
              isOpen ? "text-[#F2DDA8]" : "text-[#B8B09F] group-hover:text-[#F2DDA8]"
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            {/* Category tag */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#F2DDA8] bg-[#262017] px-2.5 py-0.5 rounded border border-[var(--color-gold-500)]/45 font-semibold shadow-sm">
                {item.categoryLabel}
              </span>
            </div>

            {/* Question */}
            <h3
              className={cn(
                "font-display font-light text-base sm:text-lg lg:text-xl leading-snug transition-colors",
                isOpen
                  ? "text-[#FAF7F2] font-normal"
                  : "text-[#E5DFD3] group-hover:text-[#FAF7F2]"
              )}
            >
              {item.question}
            </h3>
          </div>
        </div>

        {/* Plus / Minus indicator button */}
        <span
          className={cn(
            "flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-1",
            isOpen
              ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] rotate-90 shadow-[0_0_12px_rgba(201,162,77,0.7)] font-bold"
              : "border border-[var(--color-gold-500)]/40 bg-[#221B13] text-[#FAF7F2] group-hover:border-[var(--color-gold-400)] group-hover:text-[#F2DDA8]"
          )}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={13} weight="bold" /> : <Plus size={13} weight="bold" />}
        </span>
      </button>

      {/* Answer panel using grid animation */}
      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 flex flex-col gap-4 border-t border-[var(--color-gold-500)]/20 mt-1">
            {/* Executive Takeaway Bar */}
            <div className="p-3.5 rounded bg-[#241D15] border border-[var(--color-gold-500)]/35 flex items-start gap-2.5 shadow-[inset_0_1px_0_rgba(245,230,196,0.1),0_4px_14px_rgba(0,0,0,0.6)]">
              <Sparkle size={15} className="text-[#F2DDA8] flex-shrink-0 mt-0.5" />
              <div className="font-body text-xs text-[#FAF7F2] font-medium leading-relaxed">
                <span className="font-mono text-[10px] text-[#F2DDA8] uppercase tracking-wider block mb-0.5 font-semibold">
                  Fiduciary Takeaway:
                </span>
                {item.takeaway}
              </div>
            </div>

            {/* In-depth Answer Paragraph */}
            <p className="font-body text-xs sm:text-sm text-[#D8D1C2] leading-relaxed">
              {item.answer}
            </p>

            {/* Key Deliverables / Highlights chips */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-gold-500)]/15">
              <div className="flex flex-wrap items-center gap-1.5">
                {item.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#221B13] border border-[var(--color-gold-500)]/30 font-mono text-[10px] text-[#FAF7F2] font-medium shadow-sm"
                  >
                    <CheckCircle size={11} weight="fill" className="text-[#F2DDA8]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-mono text-xs text-[#F2DDA8] hover:text-[#FAF7F2] flex items-center gap-1 transition-colors group/cta font-medium"
              >
                <span>Discuss with an Advisor</span>
                <ArrowRight size={12} className="group-hover/cta:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.takeaway.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-accordion-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [activeCategory, searchQuery] }
  );

  return (
    <section
      ref={containerRef}
      id="faq"
      className="section-py bg-transparent relative text-[var(--color-ivory-50)]"
      aria-label="Frequently Asked Questions"
    >
      {/* Background ambient lighting — overflow isolated to prevent breaking sticky */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,162,77,0.08),transparent_70%)] blur-3xl"
        />
        <div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(30,41,59,0.2),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="container-au relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
              <Eyebrow number="07">KNOWLEDGE BASE & FIDUCIARY ASSURANCE</Eyebrow>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-[1.12] tracking-tight">
              Direct Answers to Critical
              <br />
              <em className="text-[#F2DDA8] not-italic font-light">
                Investor Governance Questions.
              </em>
            </h2>
          </div>
          <div className="p-4 rounded-sm bg-gradient-to-b from-[#181510] to-[#12100C] border border-[var(--color-gold-500)]/25 shadow-[inset_0_1px_0_rgba(242,221,168,0.08)] max-w-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-[#F2DDA8] font-semibold tracking-wider uppercase">
                100% Fee & Legal Transparency
              </span>
            </div>
            <p className="font-body text-xs text-[#DCD5C6] leading-relaxed">
              Clear guidelines on 6-point title verification, FEMA cross-border compliance, passive rental escrow, and structured exit planning.
            </p>
          </div>
        </div>

        {/* ── Search & Category Filter Ribbon ── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--color-gold-500)]/20">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap border flex-shrink-0 cursor-pointer",
                  activeCategory === cat.id
                    ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] font-bold shadow-[0_2px_10px_rgba(201,162,77,0.35)]"
                    : "bg-[#18140E] text-[#D8D1C2] border border-[var(--color-gold-500)]/30 hover:border-[var(--color-gold-400)]/60 hover:text-[#FAF7F2] hover:bg-[#201A13]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[260px] md:w-80">
            <MagnifyingGlass
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F2DDA8]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(0);
              }}
              placeholder="Search topics (e.g. NRI, Dubai, fees)..."
              className="w-full pl-9 pr-8 py-2.5 bg-[#1C1711] border border-[var(--color-gold-500)]/40 rounded-sm font-body text-xs text-[#FAF7F2] placeholder-[#A0937C] focus:outline-none focus:border-[var(--color-gold-400)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#F2DDA8] hover:text-[#FAF7F2] p-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Main Layout: Sticky Concierge + Accordion List ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 relative">
          {/* ── Sticky Left Concierge Card (4 cols) ── */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-24 flex flex-col gap-5">
              <div className="p-5 sm:p-6 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/45 rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_20px_44px_-8px_rgba(0,0,0,0.95)] relative overflow-hidden">
                <div
                  className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(201,162,77,0.15),transparent_70%)]"
                  aria-hidden="true"
                />

                {/* Live Advisor Availability */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                    SENIOR ADVISORY DESK ACTIVE
                  </span>
                </div>

                <h4 className="font-display text-xl sm:text-2xl text-[#FAF7F2] font-light leading-snug mb-2">
                  Have a Complex Scenario or Unique Portfolio Question?
                </h4>
                <p className="font-body text-xs text-[#D8D1C2] leading-relaxed mb-5">
                  Every wealth scenario is unique. Speak directly with our senior relationship directors for personalized guidance on tax, cross-border remittance, and portfolio allocation.
                </p>

                {/* Direct Hotlines */}
                <div className="p-4 rounded bg-[#221B13] border border-[var(--color-gold-500)]/35 space-y-2.5 mb-5 shadow-[inset_0_1px_0_rgba(245,230,196,0.08),0_4px_16px_rgba(0,0,0,0.6)]">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#F2DDA8] flex items-center gap-1.5 font-semibold">
                    <PhoneCall size={13} />
                    <span>Direct Advisory Hotlines</span>
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs font-mono text-[#FAF7F2]">
                    <a href="tel:+919916077741" className="hover:text-[#F2DDA8] transition-colors font-medium">
                      +91 99160 77741
                    </a>
                    <a href="tel:+919538997811" className="hover:text-[#F2DDA8] transition-colors font-medium">
                      +91 95389 97811
                    </a>
                    <a href="tel:+916290777944" className="hover:text-[#F2DDA8] transition-colors font-medium">
                      +91 62907 77944
                    </a>
                  </div>
                  <span className="font-mono text-[10px] text-[#C5BDB0] block pt-2 border-t border-[var(--color-gold-500)]/15">
                    Mon – Sat · 9:30 AM – 7:00 PM IST
                  </span>
                </div>

                {/* Book Call Button */}
                <Button
                  variant="primary"
                  as="button"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full justify-center text-xs py-3"
                >
                  <CalendarCheck size={14} weight="bold" />
                  <span>Book 30-Min Strategy Call</span>
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-[#C5BDB0]">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Confidential · NDA Protection</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Accordion List (8 cols) ── */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            {filteredItems.length === 0 ? (
              <div className="p-8 rounded bg-[#13110D] border border-[var(--color-gold-500)]/30 text-center flex flex-col items-center gap-3">
                <p className="font-body text-sm text-[#DCD5C6]">
                  No questions found matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="font-mono text-xs text-[#F2DDA8] hover:underline cursor-pointer"
                >
                  Clear search and show all questions
                </button>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div key={item.id} className="faq-accordion-item">
                  <AccordionItem
                    item={item}
                    isOpen={openIndex === idx}
                    onToggle={() => toggle(idx)}
                    index={idx}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
