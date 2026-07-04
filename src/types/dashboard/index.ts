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

/** Semantic color for a recent-activity item icon. */
export type ActivityTone = "red" | "amber" | "indigo" | "emerald";

/** One recent-activity list item. */
export type ActivityItem = {
  id: string;
  tone: ActivityTone;
  /** Leading bold fragment of the title. */
  titleStrong: string;
  /** Remaining title text after the bold fragment. */
  titleRest: string;
  subtitle: string;
  timestamp: string;
};

/** One milestone tracker row. */
export type Milestone = {
  id: string;
  label: string;
  badge: {
    tone: StatusTone;
    text: string;
  };
  progress: {
    value: number;
    fillClassName: string;
  };
  date: string;
};
