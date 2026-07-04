import { cn } from "@/lib/utils";

import type { NavBadge } from "@/constants/nav";

const CHIP_CLASSES: Record<NavBadge["tone"], string> = {
  primary: "bg-indigo-600 text-white",
  low: "bg-badge-green-bg text-badge-green-text",
  medium: "bg-amber-500 text-white",
  high: "bg-badge-orange-bg text-badge-orange-text",
  critical: "bg-red-500 text-white",
  info: "bg-badge-blue-bg text-badge-blue-text",
  neutral: "bg-slate-200 text-slate-600",
};

/** Small count/status chip rendered at the right edge of a nav item. */
function NavBadgeChip({ badge }: { badge: NavBadge }) {
  return (
    <span
      className={cn(
        "ml-auto rounded-full px-1.5 py-0.5 text-xs",
        CHIP_CLASSES[badge.tone],
      )}
    >
      {badge.label}
    </span>
  );
}

export { NavBadgeChip };
