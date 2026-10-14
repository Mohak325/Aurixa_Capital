// src/components/layout/MenuOverlay.tsx
"use client";

import { useEffect, useRef } from "react";
import { Phone, InstagramLogo, FacebookLogo, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PHONES, SOCIAL } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (href: string) => void;
}

export default function MenuOverlay({
  isOpen,
  onClose,
  onNavClick,
}: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Focus first element
    setTimeout(() => firstFocusRef.current?.focus(), 100);

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="menu-overlay"
      ref={overlayRef}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
      className={cn(
        "fixed inset-0 z-[100] bg-[var(--color-ink-950)]",
        "flex flex-col",
        "transition-[clip-path] duration-[700ms]",
        "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        isOpen
          ? "[clip-path:circle(150%_at_calc(100%-40px)_40px)]"
          : "[clip-path:circle(0%_at_calc(100%-40px)_40px)]",
        "pointer-events-none",
        isOpen && "pointer-events-auto"
      )}
    >
      {/* Close button */}
      <div className="flex justify-end px-6 pt-5 pb-0">
        <button
          ref={firstFocusRef}
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center text-[var(--color-ivory-200)] hover:text-[var(--color-gold-300)] transition-colors duration-200"
          aria-label="Close menu"
        >
          <X size={22} weight="light" />
        </button>
      </div>

      {/* Nav Links */}
      <nav
        className="flex-1 flex flex-col justify-center px-8 gap-2"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => onNavClick(link.href)}
            className={cn(
              "group flex items-baseline gap-4 py-4",
              "border-b border-[var(--hairline)]",
              "text-left w-full",
              "transition-all duration-300",
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: isOpen ? `${i * 60 + 150}ms` : "0ms" }}
          >
            <span className="font-body text-[0.75rem] text-[var(--color-gold-500)] tracking-[0.14em] uppercase w-6 flex-shrink-0">
              0{i + 1}
            </span>
            <span className="font-display font-light text-[2rem] sm:text-[2.5rem] text-[var(--color-ivory-50)] leading-none group-hover:text-[var(--color-gold-300)] transition-colors duration-200">
              {link.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Footer: phones + social + CTA */}
      <div
        className={cn(
          "px-8 pb-safe-bottom pb-10 flex flex-col gap-6",
          "transition-all duration-500",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: isOpen ? "500ms" : "0ms", paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
      >
        {/* Phone numbers */}
        <div className="flex flex-col gap-3">
          {PHONES.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="flex items-center gap-3 text-[var(--color-stone-400)] hover:text-[var(--color-gold-300)] transition-colors duration-200 group"
            >
              <Phone size={14} weight="light" aria-hidden="true" className="text-[var(--color-gold-500)]" />
              <span className="font-body text-[0.875rem]">{phone.number}</span>
              <span className="font-body text-[0.75rem] text-[var(--color-stone-600)]">
                — {phone.label}
              </span>
            </a>
          ))}
        </div>

        {/* Social + CTA row */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[var(--hairline)] rounded-full text-[var(--color-stone-400)] hover:text-[var(--color-gold-300)] hover:border-[var(--hairline-strong)] transition-all duration-200"
              aria-label="Aurixa Capital on Instagram"
            >
              <InstagramLogo size={16} weight="light" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[var(--hairline)] rounded-full text-[var(--color-stone-400)] hover:text-[var(--color-gold-300)] hover:border-[var(--hairline-strong)] transition-all duration-200"
              aria-label="Aurixa Capital on Facebook"
            >
              <FacebookLogo size={16} weight="light" />
            </a>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavClick("#contact")}
            id="mobile-menu-cta"
          >
            Book a Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
