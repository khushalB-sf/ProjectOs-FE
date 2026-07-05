import { eachDayOfInterval, format, isValid, parseISO } from "date-fns";

import { LABELS } from "@/constants/labels";

import type { BurndownPoint, VelocityPoint } from "@/types/dashboard";
import type { SprintResponse } from "@/types/planner";

const BURNDOWN = LABELS.DASHBOARD.BURNDOWN;

/** Bar colours keyed off sprint status — completed vs. active vs. upcoming. */
const VELOCITY_COLORS = {
  completed: "#6366f1",
  active: "#f59e0b",
  default: "#e2e8f0",
} as const;

function velocityColor(status: string): string {
  if (status === "completed") return VELOCITY_COLORS.completed;
  if (status === "active") return VELOCITY_COLORS.active;
  return VELOCITY_COLORS.default;
}

/** Parses an ISO date string, returning null when absent or invalid. */
function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : null;
}

/** Maps sprints to velocity bars — completed points per sprint, ordered by number. */
export function mapSprintsToVelocity(
  sprints: SprintResponse[],
): VelocityPoint[] {
  return [...sprints]
    .sort((a, b) => a.sprint_number - b.sprint_number)
    .map((sprint) => ({
      label: `S${sprint.sprint_number}`,
      points: sprint.completed_points,
      color: velocityColor(sprint.status),
    }));
}

/** The current sprint used to seed the burndown, if one is active. */
export function findActiveSprint(
  sprints: SprintResponse[],
): SprintResponse | undefined {
  return sprints.find((sprint) => sprint.status === "active");
}

/**
 * Derives an ideal burndown line from a sprint's committed points across its
 * date range. Actual-remaining is only known at day 0 (nothing burned yet);
 * the rest stays null until the backend exposes daily remaining-point snapshots.
 */
export function deriveBurndown(
  sprint: SprintResponse | undefined,
): BurndownPoint[] {
  if (!sprint) return [];
  const start = toDate(sprint.start_date);
  const end = toDate(sprint.end_date);
  if (!start || !end || end < start) return [];

  const days = eachDayOfInterval({ start, end });
  const committed = sprint.committed_points;
  const lastIndex = days.length - 1;

  return days.map((day, index) => ({
    label: format(day, "MMM d"),
    ideal:
      lastIndex === 0
        ? committed
        : Math.round(committed * (1 - index / lastIndex)),
    actual: index === 0 ? committed : null,
  }));
}

/** Burndown card title — appends the active sprint name when available. */
export function burndownTitle(sprint: SprintResponse | undefined): string {
  return sprint ? `${BURNDOWN.TITLE} — ${sprint.name}` : BURNDOWN.TITLE;
}

/** Burndown card subtitle — the sprint's date range, or a generic fallback. */
export function burndownSubtitle(sprint: SprintResponse | undefined): string {
  const start = toDate(sprint?.start_date);
  const end = toDate(sprint?.end_date);
  if (start && end)
    return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
  return BURNDOWN.SUBTITLE;
}
