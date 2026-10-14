// src/components/ui/Divider.tsx
"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  type?: "hairline" | "diamond";
  className?: string;
}

export function Divider({ type = "hairline", className }: DividerProps) {
  if (type === "diamond") {
    return (
      <div className={cn("divider-diamond", className)} aria-hidden="true">
        <span className="diamond-gem" />
      </div>
    );
  }

  return (
    <hr
      className={cn("divider-hairline border-none", className)}
      aria-hidden="true"
    />
  );
}

export default Divider;
