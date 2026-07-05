import type { StatusTone } from "@/types/common";

const STATUS_TONE_MAP: Record<string, StatusTone> = {
  active: "info",
  in_progress: "info",
  on_track: "low",
  completed: "low",
  done: "low",
  at_risk: "medium",
  delayed: "medium",
  blocked: "high",
  critical: "critical",
  cancelled: "neutral",
};

/** Maps a free-text project status to a StatusBadge tone, defaulting to neutral. */
export function getProjectStatusTone(status: string): StatusTone {
  return STATUS_TONE_MAP[status.toLowerCase().trim()] ?? "neutral";
}

/** Turns a raw status token (e.g. "on_hold") into a display label ("On Hold"). */
export function humanizeProjectStatus(status: string): string {
  return status
    .trim()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
