import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** Fill percentage, 0–100. */
  value: number;
  /** Tailwind background utility for the fill (e.g. 'bg-indigo-500'). */
  fillClassName?: string;
  /** Track height utility (defaults to h-2). */
  className?: string;
}

/**
 * ProgressBar — a rounded track with a colored fill. Mirrors the prototype's
 * .progress-bar / .progress-fill. Width is applied inline as a percentage.
 */
function ProgressBar({
  value,
  fillClassName = "bg-indigo-500",
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full bg-slate-200", className)}
    >
      <div
        className={cn("h-full rounded-full transition-all", fillClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { ProgressBar };
