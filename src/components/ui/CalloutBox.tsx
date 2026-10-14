// src/components/ui/CalloutBox.tsx
import { cn } from "@/lib/utils";

interface CalloutBoxProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function CalloutBox({ icon, children, className }: CalloutBoxProps) {
  return (
    <div className={cn("callout-box", className)}>
      {icon && (
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--hairline)] flex items-center justify-center text-[var(--color-gold-500)]"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <p className="text-[length:var(--text-small)] text-[var(--color-ivory-50)] leading-relaxed">
        {children}
      </p>
    </div>
  );
}

export default CalloutBox;
