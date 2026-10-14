// src/components/Preloader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<SVGPathElement>(null);
  const shieldDetailRef = useRef<SVGPathElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // If already shown in session or user prefers reduced motion
    const shown =
      typeof window !== "undefined"
        ? sessionStorage.getItem("aurixa_preloader_shown")
        : null;

    const overlay = overlayRef.current;

    const finish = () => {
      try {
        sessionStorage.setItem("aurixa_preloader_shown", "1");
      } catch {}
      if (overlay) {
        overlay.style.pointerEvents = "none";
        overlay.style.display = "none";
      }
      setIsFinished(true);
      onComplete();
    };

    if (shown || prefersReduced) {
      finish();
      return;
    }

    const shield = shieldRef.current;
    const detail = shieldDetailRef.current;
    const wordmark = wordmarkRef.current;

    if (!shield || !overlay || !detail || !wordmark) {
      finish();
      return;
    }

    // Measure stroke lengths safely
    let shieldLen = 120;
    let detailLen = 80;
    try {
      shieldLen = shield.getTotalLength() || 120;
      detailLen = detail.getTotalLength() || 80;
    } catch {}

    // Initial stroke states
    gsap.set(shield, {
      strokeDasharray: shieldLen,
      strokeDashoffset: shieldLen,
    });
    gsap.set(detail, {
      strokeDasharray: detailLen,
      strokeDashoffset: detailLen,
    });
    gsap.set(wordmark, { opacity: 0, y: 10 });

    const tl = gsap.timeline({
      onComplete: finish,
    });

    // 1. Draw shield outline
    tl.to(shield, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // 2. Draw inner detail
    tl.to(
      detail,
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // 3. Wordmark fades in
    tl.to(
      wordmark,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // 4. Brief hold
    tl.to({}, { duration: 0.25 });

    // 5. Lift overlay up (clip-path)
    tl.to(overlay, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.75,
      ease: "power4.inOut",
      onStart: () => {
        if (overlay) overlay.style.pointerEvents = "none";
      },
      onComplete: finish,
    });

    // Hard fallback: never stay stuck past 1.6s
    const forceTimer = setTimeout(finish, 1600);

    return () => {
      clearTimeout(forceTimer);
      tl.kill();
    };
  }, [onComplete, prefersReduced]);

  if (isFinished) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[var(--color-ink-950)] flex flex-col items-center justify-center gap-6 cursor-pointer select-none"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-label="Loading Aurixa Capital (Click to skip)"
      role="status"
      onClick={() => {
        try {
          sessionStorage.setItem("aurixa_preloader_shown", "1");
        } catch {}
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
          overlayRef.current.style.display = "none";
        }
        setIsFinished(true);
        onComplete();
      }}
    >
      {/* Shield logo */}
      <svg
        width="72"
        height="84"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={shieldRef}
          d="M16 1L2 7v12c0 8.284 5.716 16.02 14 18C24.284 35.02 30 27.284 30 19V7L16 1Z"
          stroke="#C9A24D"
          strokeWidth="0.8"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          ref={shieldDetailRef}
          d="M16 8 L10 14 L14 18 L11 22 L16 28 L21 22 L18 18 L22 14 Z"
          stroke="#E6C98A"
          strokeWidth="0.6"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      <span
        ref={wordmarkRef}
        className="font-display font-light text-[1.25rem] text-[var(--color-ivory-50)] tracking-[0.2em] uppercase"
      >
        Aurixa{" "}
        <span className="text-[var(--color-gold-300)]">Capital</span>
      </span>

      <span className="text-[0.6rem] text-[var(--color-stone-600)] uppercase tracking-[0.2em] opacity-60 mt-2">
        Click anywhere to enter
      </span>
    </div>
  );
}
