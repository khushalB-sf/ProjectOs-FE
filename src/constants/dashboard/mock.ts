import { LABELS } from "@/constants/labels";

import type {
  ActivityItem,
  BurndownPoint,
  Milestone,
  StatCard,
  VelocityPoint,
} from "@/types/dashboard";

const STATS = LABELS.DASHBOARD.STATS;

export const STAT_CARDS: StatCard[] = [
  {
    id: "risk-score",
    label: STATS.RISK_SCORE,
    value: STATS.RISK_VALUE,
    suffix: STATS.RISK_SUFFIX,
    badge: { tone: "high", text: STATS.RISK_BADGE },
  },
  {
    id: "sprint-progress",
    label: STATS.SPRINT_PROGRESS,
    value: STATS.SPRINT_VALUE,
    suffix: STATS.SPRINT_SUFFIX,
    progress: { value: 58, fillClassName: "bg-indigo-500" },
  },
  {
    id: "open-tasks",
    label: STATS.OPEN_TASKS,
    value: STATS.OPEN_TASKS_VALUE,
    suffix: STATS.OPEN_TASKS_SUFFIX,
    alert: STATS.OPEN_TASKS_ALERT,
  },
  {
    id: "budget-used",
    label: STATS.BUDGET_USED,
    value: STATS.BUDGET_VALUE,
    progress: { value: 45, fillClassName: "bg-emerald-500" },
    caption: STATS.BUDGET_CAPTION,
  },
];

const BURNDOWN_LABELS = [
  "Jun 10",
  "Jun 12",
  "Jun 14",
  "Jun 16",
  "Jun 18",
  "Jun 20",
  "Jun 22",
  "Jun 24",
  "Jun 26",
  "Jun 28",
];
const IDEAL = [38, 34, 30, 26, 22, 18, 14, 10, 6, 0];
const ACTUAL: (number | null)[] = [38, 38, 36, 33, 28, 25, 22, 20, null, null];

export const BURNDOWN_DATA: BurndownPoint[] = BURNDOWN_LABELS.map(
  (label, index) => ({
    label,
    ideal: IDEAL[index],
    actual: ACTUAL[index],
  }),
);

export const VELOCITY_DATA: VelocityPoint[] = [
  { label: "S1", points: 42, color: "#6366f1" },
  { label: "S2", points: 34, color: "#f59e0b" },
  { label: "S3 (est)", points: 26, color: "#e2e8f0" },
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "route-optimization",
    tone: "red",
    titleStrong: "Route Optimization task",
    titleRest: " has been blocked for 52 hours",
    subtitle: "Risk increased by 14 points",
    timestamp: "2h ago",
  },
  {
    id: "sarah-chen",
    tone: "amber",
    titleStrong: "Sarah Chen",
    titleRest: " is 115% allocated this sprint",
    subtitle: "Overallocation alert triggered",
    timestamp: "5h ago",
  },
  {
    id: "sprint-kickoff",
    tone: "indigo",
    titleStrong: "",
    titleRest: "Sprint 3 Kickoff meeting processed",
    subtitle: "3 action items, 2 decisions extracted",
    timestamp: "1d ago",
  },
  {
    id: "driver-app-ui",
    tone: "emerald",
    titleStrong: "Driver App UI",
    titleRest: " moved to Done",
    subtitle: "8 story points completed",
    timestamp: "1d ago",
  },
];

export const MILESTONES: Milestone[] = [
  {
    id: "alpha-release",
    label: "Alpha Release",
    badge: { tone: "low", text: "Done" },
    progress: { value: 100, fillClassName: "bg-emerald-500" },
    date: "Jun 15, 2026",
  },
  {
    id: "beta-release",
    label: "Beta Release",
    badge: { tone: "high", text: "At Risk" },
    progress: { value: 58, fillClassName: "bg-orange-500" },
    date: "Jun 30, 2026",
  },
  {
    id: "production-launch",
    label: "Production Launch",
    badge: { tone: "medium", text: "On Track" },
    progress: { value: 35, fillClassName: "bg-amber-500" },
    date: "Jul 31, 2026",
  },
  {
    id: "phase-2-kickoff",
    label: "Phase 2 Kickoff",
    badge: { tone: "low", text: "Planned" },
    progress: { value: 0, fillClassName: "bg-slate-300" },
    date: "Aug 15, 2026",
  },
];
