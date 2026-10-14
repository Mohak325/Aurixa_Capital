// src/components/ui/Eyebrow.tsx
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  number?: string; // e.g. "03"
  className?: string;
}

export function Eyebrow({ children, number, className }: EyebrowProps) {
  return (
    <p className={cn("eyebrow", className)}>
      {number && (
        <span
          className="text-[var(--color-gold-500)] font-display text-[0.875rem] not-italic normal-case tracking-normal mr-1"
          aria-hidden="true"
        >
          {number}
        </span>
      )}
      {children}
    </p>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowNumber?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowNumber,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Eyebrow number={eyebrowNumber}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "section-title text-balance",
          align === "center" && "max-ch-22 mx-auto",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-[length:var(--text-body-lg)] text-[var(--color-ivory-200)] max-ch-62 leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Eyebrow;
