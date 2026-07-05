import { differenceInCalendarDays, isValid, parseISO } from "date-fns";

import {
  getProjectStatusTone,
  humanizeProjectStatus,
} from "@/components/projects/projects-table/projectStatusTone";
import { LABELS } from "@/constants/labels";
import { formatDate } from "@/lib/utils";

import type { ProjectOverviewView } from "@/types/dashboard";
import type { Project } from "@/types/projects";

const OVERVIEW = LABELS.DASHBOARD.OVERVIEW;

/** Parses a date-only or ISO timestamp, returning null when absent or invalid. */
function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const parsed = parseISO(value.split("T")[0]);
  return isValid(parsed) ? parsed : null;
}

/** Formats a USD amount as "$80,000", or a dash when unavailable. */
function formatBudget(amount: number | null): string {
  if (amount === null) return OVERVIEW.NOT_AVAILABLE;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

interface Schedule {
  durationLabel: string;
  scheduleCaption: string;
  isOverdue: boolean;
  elapsedPercent: number | null;
}

/** Derives duration, elapsed progress, and a remaining/overdue caption. */
function buildSchedule(start: Date | null, end: Date | null): Schedule {
  if (!start || !end || end < start) {
    return {
      durationLabel: OVERVIEW.NOT_AVAILABLE,
      scheduleCaption: OVERVIEW.NOT_SCHEDULED,
      isOverdue: false,
      elapsedPercent: null,
    };
  }

  const totalDays = differenceInCalendarDays(end, start);
  const today = new Date();
  const remaining = differenceInCalendarDays(end, today);
  const elapsedPercent = clampPercent(
    (differenceInCalendarDays(today, start) / (totalDays || 1)) * 100,
  );

  let scheduleCaption: string = OVERVIEW.DUE_TODAY;
  if (remaining > 0) {
    scheduleCaption = OVERVIEW.DAYS_REMAINING_TEMPLATE.replace(
      "{days}",
      String(remaining),
    );
  } else if (remaining < 0) {
    scheduleCaption = OVERVIEW.OVERDUE_TEMPLATE.replace(
      "{days}",
      String(-remaining),
    );
  }

  return {
    durationLabel: OVERVIEW.DURATION_TEMPLATE.replace(
      "{days}",
      String(totalDays),
    ),
    scheduleCaption,
    isOverdue: remaining < 0,
    elapsedPercent,
  };
}

/** Maps the raw project record into the display-ready overview view-model. */
export function mapProjectToOverview(project: Project): ProjectOverviewView {
  const start = parseDate(project.start_date);
  const end = parseDate(project.target_end_date);
  const schedule = buildSchedule(start, end);

  return {
    name: project.name,
    statusLabel: humanizeProjectStatus(project.status),
    statusTone: getProjectStatusTone(project.status),
    client: project.client_name ?? OVERVIEW.NO_CLIENT,
    description: project.description ?? OVERVIEW.NO_DESCRIPTION,
    createdLabel: formatDate(project.created_at) ?? OVERVIEW.NOT_AVAILABLE,
    budgetLabel: formatBudget(project.budget_usd),
    startLabel: formatDate(project.start_date) ?? OVERVIEW.NOT_AVAILABLE,
    endLabel: formatDate(project.target_end_date) ?? OVERVIEW.NOT_AVAILABLE,
    durationLabel: schedule.durationLabel,
    scheduleCaption: schedule.scheduleCaption,
    isOverdue: schedule.isOverdue,
    elapsedPercent: schedule.elapsedPercent,
  };
}
