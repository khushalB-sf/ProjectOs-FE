import { LABELS } from "@/constants/labels";

import type {
  AiStep,
  KanbanColumn,
  SprintOption,
  SprintSummary,
} from "@/types/planner";

const PLANNER = LABELS.PLANNER;

export const SPRINT_OPTIONS: SprintOption[] = [
  { id: "sprint-1", label: PLANNER.CONTROLS.SPRINT_1, done: true },
  { id: "sprint-2", label: PLANNER.CONTROLS.SPRINT_2, done: true },
  { id: "sprint-3", label: PLANNER.CONTROLS.SPRINT_3, active: true },
];

export const SPRINT_SUMMARY: SprintSummary = {
  name: PLANNER.SUMMARY.NAME,
  dateRange: PLANNER.SUMMARY.DATE_RANGE,
  committed: PLANNER.SUMMARY.COMMITTED_VALUE,
  completed: PLANNER.SUMMARY.COMPLETED_VALUE,
  remaining: PLANNER.SUMMARY.REMAINING_VALUE,
  progress: 58,
  status: { tone: "high", text: PLANNER.SUMMARY.STATUS },
};

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: "todo",
    label: PLANNER.COLUMNS.TODO,
    dotTone: "slate",
    tasks: [
      {
        id: "route-optimization",
        title: PLANNER.TASKS.ROUTE_OPTIMIZATION,
        meta: PLANNER.META.ROUTE_OPTIMIZATION,
        badge: { tone: "critical", text: PLANNER.BADGES.CRITICAL },
      },
      {
        id: "analytics-dashboard",
        title: PLANNER.TASKS.ANALYTICS_DASHBOARD,
        meta: PLANNER.META.ANALYTICS_DASHBOARD,
        badge: { tone: "medium", text: PLANNER.BADGES.MEDIUM },
      },
      {
        id: "geofence-alert",
        title: PLANNER.TASKS.GEOFENCE_ALERT,
        meta: PLANNER.META.GEOFENCE_ALERT,
        badge: { tone: "medium", text: PLANNER.BADGES.MEDIUM },
      },
      {
        id: "rate-card",
        title: PLANNER.TASKS.RATE_CARD,
        meta: PLANNER.META.RATE_CARD,
        badge: { tone: "low", text: PLANNER.BADGES.LOW },
      },
      {
        id: "load-balancer",
        title: PLANNER.TASKS.LOAD_BALANCER,
        meta: PLANNER.META.LOAD_BALANCER,
        badge: { tone: "low", text: PLANNER.BADGES.LOW },
      },
    ],
  },
  {
    id: "in-progress",
    label: PLANNER.COLUMNS.IN_PROGRESS,
    dotTone: "blue",
    dotPulse: true,
    tasks: [
      {
        id: "gps-tracking",
        title: PLANNER.TASKS.GPS_TRACKING,
        meta: PLANNER.META.GPS_TRACKING,
        badge: { tone: "high", text: PLANNER.BADGES.HIGH },
        progress: 70,
        progressCaption: PLANNER.META.GPS_TRACKING_PROGRESS,
      },
      {
        id: "driver-app-flow",
        title: PLANNER.TASKS.DRIVER_APP_FLOW,
        meta: PLANNER.META.DRIVER_APP_FLOW,
        badge: { tone: "medium", text: PLANNER.BADGES.MEDIUM },
        progress: 45,
        progressCaption: PLANNER.META.DRIVER_APP_FLOW_PROGRESS,
      },
    ],
  },
  {
    id: "in-review",
    label: PLANNER.COLUMNS.IN_REVIEW,
    dotTone: "purple",
    tasks: [],
  },
  {
    id: "done",
    label: PLANNER.COLUMNS.DONE,
    dotTone: "emerald",
    doneStyle: true,
    tasks: [
      {
        id: "driver-app-ui",
        title: PLANNER.TASKS.DRIVER_APP_UI,
        meta: PLANNER.META.DRIVER_APP_UI,
      },
      {
        id: "db-migration",
        title: PLANNER.TASKS.DB_MIGRATION,
        meta: PLANNER.META.DB_MIGRATION,
      },
      {
        id: "auth-jwt",
        title: PLANNER.TASKS.AUTH_JWT,
        meta: PLANNER.META.AUTH_JWT,
      },
    ],
  },
  {
    id: "blocked",
    label: PLANNER.COLUMNS.BLOCKED,
    dotTone: "red",
    variant: "blocked",
    tasks: [
      {
        id: "here-maps",
        title: PLANNER.TASKS.HERE_MAPS,
        meta: PLANNER.META.HERE_MAPS,
        badge: { tone: "critical", text: PLANNER.BADGES.CRITICAL },
        blockedInfo: {
          duration: PLANNER.BLOCKED.LABEL,
          reason: PLANNER.TASKS.HERE_MAPS_REASON,
        },
      },
    ],
  },
];

export const AI_STEPS: AiStep[] = [
  { id: "analyze", label: PLANNER.DIALOG.STEP_1, status: "done" },
  { id: "decompose", label: PLANNER.DIALOG.STEP_2, status: "done" },
  { id: "assign-sprints", label: PLANNER.DIALOG.STEP_3, status: "active" },
  { id: "assign-people", label: PLANNER.DIALOG.STEP_4, status: "pending" },
];
