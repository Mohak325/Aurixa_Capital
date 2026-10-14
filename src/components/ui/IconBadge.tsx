// src/components/ui/IconBadge.tsx
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

const sizes = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

export function IconBadge({ icon, size = "md", className, "aria-label": ariaLabel }: IconBadgeProps) {
  return (
    <div
      className={cn("icon-badge", sizes[size], className)}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {icon}
    </div>
  );
}

export default IconBadge;
