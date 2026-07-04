import type { StatusTone } from "@/types/common";

/** Which board view is currently active. */
export type PlannerView = "kanban" | "gantt";

/** Optional escalation/blocking context attached to a blocked task. */
export interface BlockedInfo {
  /** Short blocked-duration label (e.g. "52h"). */
  duration: string;
  /** Free-text reason / escalation note. */
  reason: string;
}

/** A single kanban task card. */
export interface KanbanTask {
  id: string;
  title: string;
  /** Combined points + assignee/date meta line (e.g. "13 pts · Sarah C."). */
  meta: string;
  /** Semantic tone + text for the status badge (absent for done cards). */
  badge?: { tone: StatusTone; text: string };
  /** In-progress completion percentage, 0–100. */
  progress?: number;
  /** Muted caption shown under an in-progress progress bar. */
  progressCaption?: string;
  /** Escalation context for blocked cards. */
  blockedInfo?: BlockedInfo;
}

/** Visual style variants a column can adopt. */
export type KanbanColumnVariant = "default" | "blocked";

/** Accent color applied to a column's header dot. */
export type KanbanDotTone = "slate" | "blue" | "purple" | "emerald" | "red";

/** A kanban board column with its tasks. */
export interface KanbanColumn {
  id: string;
  label: string;
  dotTone: KanbanDotTone;
  /** Whether the header dot pulses (used for In Progress). */
  dotPulse?: boolean;
  variant?: KanbanColumnVariant;
  /** Whether cards render in the compact "done" style (line-through + dimmed). */
  doneStyle?: boolean;
  tasks: KanbanTask[];
}

/** Header summary metrics for the active sprint. */
export interface SprintSummary {
  name: string;
  dateRange: string;
  committed: string;
  completed: string;
  remaining: string;
  progress: number;
  status: { tone: StatusTone; text: string };
}

/** A sprint option in the sprint selector group. */
export interface SprintOption {
  id: string;
  label: string;
  /** Whether the sprint is completed (shows a check + muted style). */
  done?: boolean;
  /** Whether the sprint is the active selection (indigo). */
  active?: boolean;
}

/** Progress state of an AI generation step. */
export type AiStepStatus = "done" | "active" | "pending";

/** A single step in the AI sprint-generation checklist. */
export interface AiStep {
  id: string;
  label: string;
  status: AiStepStatus;
}
