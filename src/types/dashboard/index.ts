import type { StatusTone } from "@/types/common";

/** A single stat card in the dashboard top row. */
export type StatCard = {
  id: string;
  label: string;
  /** Primary value displayed large (e.g. '74', '$218K'). */
  value: string;
  /** Optional trailing suffix rendered muted (e.g. '/100', 'tasks'). */
  suffix?: string;
  /** Optional status pill. */
  badge?: {
    tone: StatusTone;
    text: string;
  };
  /** Optional progress bar. */
  progress?: {
    value: number;
    fillClassName: string;
  };
  /** Optional muted caption below the value (e.g. 'of $485K'). */
  caption?: string;
  /** Optional alert line rendered in red. */
  alert?: string;
};

/** One point on the burndown chart. */
export type BurndownPoint = {
  label: string;
  ideal: number;
  actual: number | null;
};

/** One bar on the velocity chart. */
export type VelocityPoint = {
  label: string;
  points: number;
  color: string;
};

/** Display-ready project overview, mapped from the raw Project wire shape. */
export type ProjectOverviewView = {
  name: string;
  statusLabel: string;
  statusTone: StatusTone;
  client: string;
  description: string;
  createdLabel: string;
  budgetLabel: string;
  startLabel: string;
  endLabel: string;
  durationLabel: string;
  /** Caption under the schedule bar (days remaining / overdue / not scheduled). */
  scheduleCaption: string;
  /** Whether the project is past its target end date. */
  isOverdue: boolean;
  /** Elapsed proportion of the schedule (0–100), or null when not scheduled. */
  elapsedPercent: number | null;
};
