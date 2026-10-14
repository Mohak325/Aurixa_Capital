// src/components/ui/Button.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "text" | "icon";
type ButtonSize = "default" | "sm" | "lg";
type ButtonAs = "button" | "a" | "link";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: ButtonAs;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  id?: string;
  "aria-label"?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "relative overflow-hidden",
    "inline-flex items-center justify-center gap-3",
    "bg-[var(--color-gold-300)] text-[var(--color-ink-950)]",
    "font-body font-medium text-[0.8125rem] uppercase tracking-[0.14em]",
    "rounded-full px-8 h-[52px]",
    "transition-all duration-[400ms]",
    "hover:bg-[var(--color-gold-100)] hover:shadow-[0_0_48px_rgba(201,162,77,0.20)]",
    "active:bg-[var(--color-gold-600)]",
    "disabled:bg-[var(--color-ink-800)] disabled:text-[var(--color-gold-800)] disabled:cursor-not-allowed",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-500)] focus-visible:outline-offset-3",
    "group",
  ].join(" "),

  secondary: [
    "inline-flex items-center justify-center gap-3",
    "bg-transparent text-[var(--color-ivory-50)]",
    "font-body font-medium text-[0.8125rem] uppercase tracking-[0.14em]",
    "rounded-full px-8 h-[52px]",
    "border border-[var(--hairline)]",
    "transition-all duration-[400ms]",
    "hover:border-[var(--hairline-strong)] hover:text-[var(--color-gold-300)]",
    "active:border-[var(--color-gold-600)]",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-500)] focus-visible:outline-offset-3",
    "group",
  ].join(" "),

  text: [
    "inline-flex items-center gap-2",
    "text-[var(--color-gold-300)] font-body font-medium text-[0.8125rem] uppercase tracking-[0.14em]",
    "bg-transparent",
    "transition-colors duration-[200ms]",
    "hover:text-[var(--color-gold-100)]",
    "underline-offset-4",
    "group",
  ].join(" "),

  icon: [
    "inline-flex items-center justify-center",
    "w-12 h-12 rounded-full",
    "border border-[var(--hairline)]",
    "text-[var(--color-gold-500)]",
    "transition-all duration-[200ms]",
    "hover:border-[var(--hairline-strong)] hover:text-[var(--color-gold-300)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-500)] focus-visible:outline-offset-3",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-[44px] px-6 text-[0.75rem]",
  default: "",
  lg: "h-[60px] px-10",
};

export default function Button({
  variant = "primary",
  size = "default",
  as = "button",
  href,
  loading = false,
  disabled = false,
  icon,
  showArrow = true,
  className,
  children,
  onClick,
  type = "button",
  id,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  // Magnetic effect on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 80;
    if (dist < radius) {
      const strength = 8;
      const tx = (dx / radius) * strength;
      const ty = (dy / radius) * strength;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    }
  };
  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "";
      btnRef.current.style.transition = "transform 400ms var(--ease-out)";
    }
  };

  const classes = cn(
    variantStyles[variant],
    size !== "default" && sizeStyles[size],
    className
  );

  const content = (
    <>
      {/* Primary shimmer sweep */}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] bg-white/15 pointer-events-none"
        />
      )}

      {loading ? (
        <CircleNotch
          size={16}
          weight="bold"
          className="animate-spin"
          aria-hidden="true"
        />
      ) : (
        <>
          {children}
          {variant === "primary" && showArrow && (
            <ArrowRight
              size={14}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-[200ms] group-hover:translate-x-1"
            />
          )}
          {variant === "text" && (
            <ArrowRight
              size={14}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-[200ms] group-hover:translate-x-1"
            />
          )}
          {icon && variant === "icon" && icon}
        </>
      )}
    </>
  );

  const sharedProps = {
    id,
    "aria-label": ariaLabel,
    className: classes,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transition: "transform 200ms var(--ease-out), background-color 400ms, border-color 400ms, color 200ms" },
  };

  if (as === "link" && href) {
    return (
      <Link
        href={href}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        {...sharedProps}
        aria-disabled={disabled}
      >
        {content}
      </Link>
    );
  }

  if (as === "a" && href) {
    return (
      <a
        href={href}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        {...sharedProps}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...sharedProps}
    >
      {content}
    </button>
  );
}
