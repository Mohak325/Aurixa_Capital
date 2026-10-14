// src/components/layout/FloatingCTA.tsx
"use client";

import { useEffect, useState } from "react";
import { Phone } from "@phosphor-icons/react";
import { PHONES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  // Show after scrolling past the hero (approx 90vh)
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        // Only on mobile/tablet — hidden on lg+
        "lg:hidden",
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-[var(--color-ink-950)] border-t border-[var(--hairline)]",
        "flex items-center justify-between gap-3 px-4 py-3",
        "transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      // Safe area inset for notched phones
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      aria-label="Quick contact actions"
      role="navigation"
    >
      {/* Call button */}
      <a
        href={PHONES[0].href}
        className={cn(
          "flex items-center justify-center gap-2",
          "h-[52px] px-5 rounded-full",
          "border border-[var(--hairline)]",
          "font-body font-medium text-[0.8125rem] uppercase tracking-[0.14em]",
          "text-[var(--color-ivory-200)]",
          "hover:border-[var(--hairline-strong)] hover:text-[var(--color-gold-300)]",
          "transition-all duration-200",
          "flex-shrink-0"
        )}
        aria-label={`Call ${PHONES[0].number}`}
      >
        <Phone size={16} weight="light" aria-hidden="true" />
        <span>Call</span>
      </a>

      {/* Book consultation */}
      <Button
        variant="primary"
        as="button"
        onClick={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex-1"
        id="floating-cta"
        showArrow={false}
      >
        Book a Consultation
      </Button>
    </div>
  );
}
