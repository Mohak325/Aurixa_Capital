// src/app/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import HeroSection from "@/sections/HeroSection";
import ClockStrip from "@/sections/ClockStrip";
import AmbientBackground from "@/components/AmbientBackground";
import Preloader from "@/components/Preloader";

// Lazy-load below-fold sections
const AboutSection = dynamic(() => import("@/sections/AboutSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/sections/ServicesSection"), { ssr: false });
const InternationalSection = dynamic(() => import("@/sections/InternationalSection"), { ssr: false });
const ProcessSection = dynamic(() => import("@/sections/ProcessSection"), { ssr: false });
const WhyUsSection = dynamic(() => import("@/sections/WhyUsSection"), { ssr: false });
const FAQSection = dynamic(() => import("@/sections/FAQSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/sections/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });
const FloatingCTA = dynamic(() => import("@/components/layout/FloatingCTA"), { ssr: false });

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  // Safety fallback: guaranteed to reveal site within 2.2s even if animation interrupted
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-[var(--color-gold-300)] focus:text-[var(--color-ink-950)] focus:px-4 focus:py-2 focus:rounded focus:font-body focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Preloader — visible until animation completes */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global header */}
      <Header />

      {/* Ambient Living Background with scroll-triggered animations */}
      <AmbientBackground />

      {/* Main content */}
      <main id="main-content" className="relative z-[2]">
        {/* 01 · Hero */}
        <HeroSection entranceReady={preloaderDone} />

        {/* Live clock strip */}
        <ClockStrip />

        {/* 02 · About */}
        <AboutSection />

        {/* 03 · Services */}
        <ServicesSection />

        {/* 04 · International */}
        <InternationalSection />

        {/* 05 · Process */}
        <ProcessSection />

        {/* 06 · Why Us */}
        <WhyUsSection />

        {/* 07 · FAQ */}
        <FAQSection />

        {/* 08 · Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA bar (mobile only) */}
      <FloatingCTA />
    </>
  );
}
