// src/sections/ContactSection.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  CheckCircle,
  Phone,
  Warning,
  EnvelopeSimple,
  Globe,
  InstagramLogo,
  FacebookLogo,
  ShieldCheck,
  Briefcase,
  Buildings,
  ChartLine,
  Handshake,
  TrendUp,
  Users,
  CalendarCheck,
  Lock,
  ArrowRight,
  Sparkle,
  PhoneCall,
  Clock,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { PHONES, SITE, SOCIAL } from "@/lib/constants";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// ── Zod validation schema ──────────────────────────────────
const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  investorType: z.string().optional(),
  interest: z.string().min(1, "Please select an investment interest"),
  allocation: z.string().optional(),
  country: z.string().optional(),
  callTime: z.string().optional(),
  message: z.string().max(500, "Message must be under 500 characters").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm your consent to proceed" }),
  }),
  website: z.string().max(0).optional(), // Honeypot
});

type FormData = z.infer<typeof schema>;

// 10 Authentic Divisions from Brochure
const INTERESTS = [
  "Real Estate Investment Advisory",
  "Capital & Asset Management",
  "End-to-End Property Management",
  "Guaranteed Rental Assistance",
  "Litigation-Free Property Verification",
  "Property Buying & Selling",
  "Interior Design & Property Enhancement",
  "Mutual Fund Investment Solutions",
  "International Investments (Dubai, Europe, Singapore, Malaysia)",
  "Business & Corporate Commercial Investments",
  "General Wealth Advisory Enquiry",
];

const INVESTOR_TYPES = [
  { id: "hni", label: "Resident Indian (HNI)" },
  { id: "nri", label: "NRI / Overseas Citizen" },
  { id: "family-office", label: "Family Office" },
  { id: "corporate", label: "Corporate / Institutional" },
];

const ALLOCATION_RANGES = [
  "₹50 Lakhs – ₹1.5 Crores",
  "₹1.5 Crores – ₹5 Crores",
  "₹5 Crores – ₹15 Crores",
  "₹15 Crores+ / Sovereign Portfolio",
  "Systematic SIP Wealth Accumulation",
];

const CALL_TIMES = [
  "Morning (9:30 AM – 12:30 PM IST)",
  "Afternoon (12:30 PM – 4:30 PM IST)",
  "Evening (4:30 PM – 7:30 PM IST)",
  "Weekend Priority Advisory",
];

const PROMISE_PILLARS = [
  {
    icon: Briefcase,
    title: "Expert Guidance",
    desc: "Seasoned wealth and property advisors tailoring decisions to your specific financial goals.",
  },
  {
    icon: Buildings,
    title: "Carefully Selected Opportunities",
    desc: "Pre-screened, high-potential residential, commercial, and land investment opportunities.",
  },
  {
    icon: ChartLine,
    title: "Professional Asset Management",
    desc: "Full-lifecycle management protecting capital and maximizing consistent rental yields.",
  },
  {
    icon: Handshake,
    title: "End-to-End Support",
    desc: "From initial asset discovery and legal verification to tenant leasing and strategic exit.",
  },
  {
    icon: TrendUp,
    title: "Wealth Creation",
    desc: "Strategic wealth accumulation through compounding capital appreciation and cash flow.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency & Integrity",
    desc: "Zero hidden costs, strict 6-point legal verification, and complete operational clarity.",
  },
  {
    icon: Users,
    title: "Dedicated Relationship Managers",
    desc: "A single, highly responsive point of contact managing your multi-asset portfolio.",
  },
  {
    icon: Globe,
    title: "Global & Domestic Solutions",
    desc: "Seamless investment gateways across India, Dubai, Singapore, Malaysia, and Europe.",
  },
];

// ── Success State ─────────────────────────────────────────
function SuccessState() {
  return (
    <div className="flex flex-col items-start gap-6 p-8 sm:p-10 bg-[var(--color-ink-850)] border border-[var(--color-gold-400)]/60 rounded-sm shadow-2xl">
      <div className="w-14 h-14 rounded-full bg-[var(--color-gold-400)]/10 border border-[var(--color-gold-400)]/40 flex items-center justify-center text-[var(--color-gold-300)]">
        <CheckCircle size={32} weight="fill" />
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] font-semibold">
          CONFIDENTIAL ENQUIRY REGISTERED
        </span>
        <h3 className="font-display font-light text-2xl sm:text-3xl text-[var(--color-ivory-50)] mt-1 mb-2">
          Thank you for trusting Aurixa Capital.
        </h3>
        <p className="font-body text-sm text-[var(--color-ivory-200)] leading-relaxed max-w-lg">
          Your details have been received by our senior wealth desk. A dedicated relationship director will review your profile and reach out within one business day.
        </p>
      </div>

      <div className="pt-5 border-t border-[var(--hairline)]/60 w-full space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-stone-400)]">
          Need Urgent Assistance? Call Our Advisory Desks Directly:
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {PHONES.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="flex items-center gap-2.5 p-3 rounded bg-[var(--color-ink-950)] border border-[var(--hairline)] hover:border-[var(--color-gold-500)]/50 transition-colors"
            >
              <Phone size={14} className="text-[var(--color-gold-400)] flex-shrink-0" />
              <div className="min-w-0">
                <span className="font-mono text-xs text-[var(--color-ivory-100)] block font-medium">
                  {phone.number}
                </span>
                <span className="font-mono text-[9px] text-[var(--color-stone-500)] block">
                  {phone.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("hni");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      investorType: "Resident Indian (HNI)",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          result.error || "Unable to dispatch enquiry. Please call our advisory desk directly."
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please contact us directly via phone or WhatsApp."
      );
    }
  };

  return (
    <section
      id="contact"
      className="section-py bg-transparent relative text-[var(--color-ivory-50)]"
      aria-label="Contact Aurixa Capital"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-10 left-1/3 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(201,162,77,0.06),transparent_70%)] blur-3xl"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(30,41,59,0.18),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="container-au relative z-10">
        <Divider type="diamond" className="mb-6 md:mb-8" />

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
              <Eyebrow number="08">DIRECT FIDUCIARY ADVISORY DESK</Eyebrow>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ivory-50)] leading-[1.12] tracking-tight">
              Invest Smart. Build Wealth.
              <br />
              <em className="text-[var(--color-gold-300)] not-italic font-light">
                Create Your Legacy With Aurixa Capital.
              </em>
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--color-stone-400)] max-w-sm">
            <span className="text-[var(--color-gold-400)] block mb-1 font-medium tracking-widest uppercase">
              Confidential Advisory & Due Diligence
            </span>
            <p className="text-[11px] leading-relaxed">
              Every investment decision is guided by integrity, transparency, market intelligence, and an unwavering commitment to compounding your wealth.
            </p>
          </div>
        </div>

        {/* ── Main Workspace: Left Dossier + Right Bespoke Form ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16 lg:mb-20">
          {/* ── Left Column: Fiduciary Dossier & Direct Access (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Advisory Desk Status Card */}
            <div className="p-6 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/45 rounded-sm relative overflow-hidden shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_20px_44px_-8px_rgba(0,0,0,0.95)]">
              <div
                className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(201,162,77,0.15),transparent_70%)]"
                aria-hidden="true"
              />

              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                  SENIOR ADVISORY DESKS ACTIVE
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl text-[var(--color-ivory-50)] font-light leading-snug mb-2">
                Direct Access to Senior Wealth Partners
              </h3>
              <p className="font-body text-xs text-[#D8D1C2] leading-relaxed mb-5">
                Whether deploying domestic capital in tier-1 Indian metros or expanding internationally into Dubai, London, or Singapore, our experienced partners work with you at every stage.
              </p>

              {/* Direct Partner Lines */}
              <div className="space-y-2.5 mb-5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-gold-400)] block font-semibold">
                  Official Advisory Hotlines:
                </span>
                {PHONES.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="flex items-center justify-between p-3.5 rounded bg-[#221B13] border border-[var(--color-gold-500)]/35 hover:border-[var(--color-gold-400)]/70 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2E261C] border border-[var(--color-gold-500)]/45 flex items-center justify-center text-[var(--color-gold-300)] group-hover:text-[var(--color-gold-100)] transition-colors">
                        <Phone size={13} />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[#FAF7F2] block font-medium group-hover:text-[var(--color-gold-300)] transition-colors">
                          {phone.number}
                        </span>
                        <span className="font-mono text-[9px] text-[#B8B09F] block font-medium">
                          {phone.label}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-[var(--color-gold-400)] group-hover:translate-x-0.5 transition-transform font-semibold">
                      Call ↗
                    </span>
                  </a>
                ))}
              </div>

              <div className="text-[10px] font-mono text-[#C5BDB0] flex items-center gap-2 pt-3 border-t border-[var(--color-gold-500)]/20">
                <Clock size={12} className="text-[var(--color-gold-400)]" />
                <span>Operating Hours: Mon – Sat · 9:30 AM – 7:00 PM IST</span>
              </div>
            </div>

            {/* Institutional Advisory Photography & Fiduciary Assurances */}
            <div className="rounded-sm border border-[var(--color-gold-500)]/40 overflow-hidden relative shadow-lg group">
              <div className="relative w-full h-44 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop")`,
                  }}
                  role="img"
                  aria-label="Aurixia Capital Private Wealth Consultation Room"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-[#14110C]/40 to-transparent" />
                <div className="absolute top-2.5 left-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#F2DDA8] bg-[#14110C]/90 px-2 py-0.5 rounded border border-[var(--color-gold-500)]/50 backdrop-blur-sm font-semibold">
                    PRIVATE WEALTH BRIEFING SUITE
                  </span>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-b from-[#1C1711] to-[#120F0A] space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 p-2 rounded bg-[#221B13] border border-[var(--color-gold-500)]/30">
                    <ShieldCheck size={14} className="text-[#F2DDA8] flex-shrink-0" />
                    <span className="font-body text-[#FAF7F2] text-[11px] font-medium truncate">100% Litigation-Free</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-[#221B13] border border-[var(--color-gold-500)]/30">
                    <ShieldCheck size={14} className="text-[#F2DDA8] flex-shrink-0" />
                    <span className="font-body text-[#FAF7F2] text-[11px] font-medium truncate">Strict NDA & Fiduciary</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-gold-500)]/20 flex items-center justify-between text-[11px] font-mono text-[#D8D1C2]">
                  <span>Fiduciary Standard</span>
                  <span className="text-[var(--color-gold-300)] font-semibold">Zero Developer Kickbacks</span>
                </div>
              </div>
            </div>

            {/* Social & Digital Presence */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--color-ink-900)] border border-[var(--hairline)] font-mono text-[10px] text-[var(--color-stone-300)] hover:text-[var(--color-gold-300)] hover:border-[var(--color-gold-500)]/40 transition-colors"
              >
                <InstagramLogo size={13} className="text-[var(--color-gold-400)]" />
                <span>Instagram</span>
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--color-ink-900)] border border-[var(--hairline)] font-mono text-[10px] text-[var(--color-stone-300)] hover:text-[var(--color-gold-300)] hover:border-[var(--color-gold-500)]/40 transition-colors"
              >
                <FacebookLogo size={13} className="text-[var(--color-gold-400)]" />
                <span>Facebook</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--color-ink-900)] border border-[var(--hairline)] font-mono text-[10px] text-[var(--color-stone-300)] hover:text-[var(--color-gold-300)] hover:border-[var(--color-gold-500)]/40 transition-colors"
              >
                <EnvelopeSimple size={13} className="text-[var(--color-gold-400)]" />
                <span>{SITE.email}</span>
              </a>
            </div>
          </div>

          {/* ── Right Column: Bespoke Advisory Consultation Form (7 cols) ── */}
          <div className="lg:col-span-7">
            {submitted ? (
              <SuccessState />
            ) : (
              <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#1C1711] to-[#120F0A] border border-[var(--color-gold-500)]/45 rounded-sm shadow-[inset_0_1px_0_rgba(245,230,196,0.16),0_24px_52px_-10px_rgba(0,0,0,0.95)] relative overflow-hidden">
                <div
                  className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(201,162,77,0.12),transparent_70%)]"
                  aria-hidden="true"
                />

                <div className="mb-8 pb-5 border-b border-[var(--color-gold-500)]/25 relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)]" />
                    <span className="font-mono text-[10px] text-[var(--color-gold-400)] uppercase tracking-widest font-semibold">
                      CONFIDENTIAL ADVISORY REQUEST
                    </span>
                  </div>
                  <h3 className="font-display font-light text-2xl sm:text-3xl text-[var(--color-ivory-50)] leading-tight">
                    Schedule a Private Consultation
                  </h3>
                  <p className="font-body text-xs text-[#D8D1C2] mt-1">
                    Connect directly with a dedicated relationship director. All consultations are 100% confidential and non-binding.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 relative z-10">
                  {/* Honeypot */}
                  <input
                    type="text"
                    {...register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                  />

                  {/* Investor Type Profile Switcher */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] block font-semibold">
                      Investor Profile Category:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {INVESTOR_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setSelectedType(type.id);
                            setValue("investorType", type.label);
                          }}
                          className={cn(
                            "px-2.5 py-2 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all text-center border leading-tight cursor-pointer",
                            selectedType === type.id
                              ? "bg-[var(--color-gold-400)] text-[#060504] border-[var(--color-gold-400)] font-bold shadow-[0_2px_10px_rgba(201,162,77,0.35)]"
                              : "bg-[#221B13] text-[#D8D1C2] border border-[var(--color-gold-500)]/35 hover:border-[var(--color-gold-400)]/60 hover:text-[#FAF7F2] hover:bg-[#282017]"
                          )}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column Inputs Grid */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] flex items-center justify-between font-semibold">
                        <span>Full Legal Name <span className="text-[var(--color-gold-400)]">*</span></span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#221B13] border rounded-sm font-body text-xs text-[#FAF7F2] placeholder-[#A0937C] outline-none transition-colors shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]",
                          errors.fullName
                            ? "border-red-500 focus:border-red-500"
                            : "border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)]"
                        )}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-400 font-mono block">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] flex items-center justify-between font-semibold">
                        <span>Contact Number / WhatsApp <span className="text-[var(--color-gold-400)]">*</span></span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#221B13] border rounded-sm font-body text-xs text-[#FAF7F2] placeholder-[#A0937C] outline-none transition-colors shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]",
                          errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)]"
                        )}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-400 font-mono block">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] flex items-center justify-between font-semibold">
                        <span>Corporate / Personal Email <span className="text-[var(--color-gold-400)]">*</span></span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@domain.com"
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#221B13] border rounded-sm font-body text-xs text-[#FAF7F2] placeholder-[#A0937C] outline-none transition-colors shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]",
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)]"
                        )}
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 font-mono block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Primary Interest Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="interest" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] flex items-center justify-between font-semibold">
                        <span>Primary Investment Division <span className="text-[var(--color-gold-400)]">*</span></span>
                      </label>
                      <select
                        id="interest"
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#221B13] border rounded-sm font-body text-xs text-[#FAF7F2] outline-none transition-colors cursor-pointer shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]",
                          errors.interest
                            ? "border-red-500 focus:border-red-500"
                            : "border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)]"
                        )}
                        {...register("interest")}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#1C1711] text-stone-400">
                          Select Investment Division
                        </option>
                        {INTERESTS.map((item) => (
                          <option key={item} value={item} className="bg-[#1C1711] text-[#FAF7F2]">
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.interest && (
                        <span className="text-[10px] text-red-400 font-mono block">
                          {errors.interest.message}
                        </span>
                      )}
                    </div>

                    {/* Target Allocation Range */}
                    <div className="space-y-1.5">
                      <label htmlFor="allocation" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] block font-semibold">
                        Target Capital Allocation:
                      </label>
                      <select
                        id="allocation"
                        className="w-full px-3.5 py-2.5 bg-[#221B13] border border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)] rounded-sm font-body text-xs text-[#FAF7F2] outline-none transition-colors cursor-pointer shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
                        {...register("allocation")}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#1C1711] text-stone-400">
                          Select Allocation Range
                        </option>
                        {ALLOCATION_RANGES.map((r) => (
                          <option key={r} value={r} className="bg-[#1C1711] text-[#FAF7F2]">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Call Time */}
                    <div className="space-y-1.5">
                      <label htmlFor="callTime" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] block font-semibold">
                        Preferred Call Window:
                      </label>
                      <select
                        id="callTime"
                        className="w-full px-3.5 py-2.5 bg-[#221B13] border border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)] rounded-sm font-body text-xs text-[#FAF7F2] outline-none transition-colors cursor-pointer shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
                        {...register("callTime")}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#1C1711] text-stone-400">
                          Select Preferred Time
                        </option>
                        {CALL_TIMES.map((t) => (
                          <option key={t} value={t} className="bg-[#1C1711] text-[#FAF7F2]">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message / Brief Criteria */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-wider text-[#D8D1C2] flex items-center justify-between font-semibold">
                      <span>Specific Criteria or Investment Goals (Optional):</span>
                      <span className="text-[9px] text-[#B8B09F]">Max 500 chars</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="e.g. Exploring commercial pre-launch in Bengaluru with 8%+ rental yield, or Dubai 10-year Golden Visa acquisition."
                      className="w-full px-3.5 py-2.5 bg-[#221B13] border border-[var(--color-gold-500)]/35 focus:border-[var(--color-gold-400)] rounded-sm font-body text-xs text-[#FAF7F2] placeholder-[#A0937C] outline-none resize-none transition-colors shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
                      {...register("message")}
                    />
                  </div>

                  {/* Fiduciary Consent Checkbox */}
                  <div className="space-y-1">
                    <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        id="consent"
                        className="mt-0.5 w-4 h-4 rounded-none border border-[var(--hairline)] bg-[var(--color-ink-950)] accent-[var(--color-gold-400)] flex-shrink-0 cursor-pointer"
                        {...register("consent")}
                      />
                      <span className="font-body text-[11px] text-[var(--color-stone-400)] leading-relaxed group-hover:text-[var(--color-ivory-200)] transition-colors">
                        I authorize Aurixa Capital senior relationship directors to contact me regarding my enquiry. I understand all conversations and portfolio data remain strictly confidential under NDA.
                      </span>
                    </label>
                    {errors.consent && (
                      <span className="text-[10px] text-red-400 font-mono block pl-6">
                        {errors.consent.message}
                      </span>
                    )}
                  </div>

                    {/* Error Banner */}
                    {submitError && (
                      <div className="p-3 bg-red-950/60 border border-red-500/50 rounded text-red-200 text-xs flex items-center gap-2">
                        <Warning size={16} className="text-red-400 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button & Security Reassurances */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <Button
                        variant="primary"
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      id="contact-submit-btn"
                      className="text-xs py-3.5 px-7 justify-center"
                    >
                      <span>{isSubmitting ? "Securing Session…" : "Confirm Advisory Consultation"}</span>
                      <ArrowRight size={14} weight="bold" />
                    </Button>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--color-stone-500)]">
                      <span className="flex items-center gap-1">
                        <Lock size={12} className="text-emerald-400" />
                        <span>256-Bit Encrypted</span>
                      </span>
                      <span>·</span>
                      <span>Zero Broker Spam</span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* ── Below Form: The 8 Official Promise Pillars (Brochure Page 9) ── */}
        <div className="p-6 sm:p-8 md:p-10 bg-[var(--color-ink-900)] border border-[var(--hairline)] rounded-sm relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] font-semibold">
                OUR PROMISE · 8 CORE PILLARS
              </span>
            </div>
            <h3 className="font-display font-light text-2xl sm:text-3xl text-[var(--color-ivory-50)] mb-2">
              We Believe Investing Should Be Simple, Secure &amp; Rewarding.
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--color-stone-300)] leading-relaxed">
              With Aurixa Capital as your fiduciary partner, you gain access to institutional market intelligence, carefully verified assets, and hands-off stewardship designed to grow your wealth with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMISE_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 bg-[var(--color-ink-950)] border border-[var(--hairline)] rounded-sm hover:border-[var(--color-gold-400)]/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-sm bg-[var(--color-ink-900)] border border-[var(--hairline)] flex items-center justify-center text-[var(--color-gold-400)] group-hover:text-[var(--color-gold-300)] group-hover:border-[var(--color-gold-400)] transition-colors">
                        <Icon size={18} weight="light" />
                      </div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-600)]">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="font-display text-base text-[var(--color-ivory-50)] group-hover:text-[var(--color-gold-200)] transition-colors mb-1.5 font-normal">
                      {pillar.title}
                    </h4>
                    <p className="font-body text-[11px] text-[var(--color-stone-400)] leading-relaxed">
                      {pillar.desc}
                    </p>
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
