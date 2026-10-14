// src/hooks/useInView.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook.
 * Returns [ref, isInView] — attach ref to the element you want to observe.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView] as const;
}
