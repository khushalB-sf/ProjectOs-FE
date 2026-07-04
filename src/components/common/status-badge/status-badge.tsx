import { cn } from "@/lib/utils";

import type { StatusTone } from "@/types/common";

interface StatusBadgeProps {
  tone: StatusTone;
  children: React.ReactNode;
  className?: string;
}

const TONE_CLASSES: Record<StatusTone, string> = {
  low: "bg-badge-green-bg text-badge-green-text",
  medium: "bg-badge-amber-bg text-badge-amber-text",
  high: "bg-badge-orange-bg text-badge-orange-text",
  critical: "bg-badge-rose-bg text-badge-rose-text",
  info: "bg-badge-blue-bg text-badge-blue-text",
  neutral: "bg-badge-secondary-bg text-badge-secondary-text",
};

/**
 * StatusBadge — a small pill mapping a semantic tone to the design-system badge
 * color tokens. Mirrors the prototype's .badge-low / -medium / -high / -critical.
 */
function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { StatusBadge };
