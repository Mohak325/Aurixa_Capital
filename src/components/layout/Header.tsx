// src/components/layout/Header.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone } from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PHONES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MenuOverlay from "@/components/layout/MenuOverlay";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      // Solid header after 80px
      setScrolled(y > 80);

      // Hide on scroll down, show on scroll up
      if (y > 200) {
        if (delta > 5) {
          setHidden(true);
        } else if (delta < -5) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ScrollProgress />

      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          // Transparent → solid
          scrolled
            ? "bg-[#0B0907]/95 backdrop-blur-[16px] border-b border-[var(--hairline-strong)] shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            : "bg-transparent",
          // Hide / show on scroll direction
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
        style={{ height: "var(--header-h-mobile)" }}
      >
        <div
          className="container-au h-full flex items-center justify-between"
          style={{
            // Taller on larger screens
            height: "100%",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group flex-shrink-0"
            aria-label="Aurixa Capital — home"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* Shield SVG inline — no external dependency */}
            <svg
              width="32"
              height="38"
              viewBox="0 0 32 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-opacity duration-200 group-hover:opacity-80"
            >
              <path
                d="M16 1L2 7v12c0 8.284 5.716 16.02 14 18C24.284 35.02 30 27.284 30 19V7L16 1Z"
                stroke="#C9A24D"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path
                d="M16 8 L10 14 L14 18 L11 22 L16 28 L21 22 L18 18 L22 14 Z"
                stroke="#E6C98A"
                strokeWidth="1"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>

            {/* Wordmark — hidden on mobile, shown on sm+ */}
            <span className="hidden sm:block font-display font-light text-[1.125rem] text-[var(--color-ivory-50)] tracking-[0.08em] uppercase leading-none">
              Aurixa{" "}
              <span className="text-[var(--color-gold-300)]">Capital</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "font-body font-medium text-[0.8125rem] uppercase tracking-[0.14em]",
                  "text-[var(--color-ivory-200)] hover:text-[var(--color-gold-300)]",
                  "transition-colors duration-200",
                  "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
                  "after:bg-[var(--color-gold-300)] after:transition-all after:duration-300",
                  "hover:after:w-full"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── Right side: Phone + CTA ── */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone — only on xl+ */}
            <a
              href={PHONES[0].href}
              className="hidden xl:flex items-center gap-2 text-[var(--color-stone-400)] hover:text-[var(--color-gold-300)] transition-colors duration-200"
              aria-label="Call Aurixa Capital"
            >
              <Phone size={14} weight="light" aria-hidden="true" />
              <span className="font-body text-[0.8125rem] tracking-[0.04em]">
                {PHONES[0].number}
              </span>
            </a>

            <Button
              variant="primary"
              size="sm"
              as="button"
              onClick={() => handleNavClick("#contact")}
              id="header-cta"
            >
              Book a Consultation
            </Button>
          </div>

          {/* ── Hamburger (tablet + mobile) ── */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-[6px] group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-overlay"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span
              className={cn(
                "block w-6 h-px bg-[var(--color-ivory-50)] transition-all duration-300",
                menuOpen && "rotate-45 translate-y-[7px]"
              )}
            />
            <span
              className={cn(
                "block w-4 h-px bg-[var(--color-gold-300)] transition-all duration-300",
                menuOpen && "opacity-0 translate-x-2"
              )}
            />
            <span
              className={cn(
                "block w-6 h-px bg-[var(--color-ivory-50)] transition-all duration-300",
                menuOpen && "-rotate-45 -translate-y-[7px]"
              )}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile / Tablet Menu Overlay ── */}
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
}
