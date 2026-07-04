import { LABELS } from "@/constants/labels";

import type {
  RecommendedAction,
  RiskFactor,
  RiskGaugeConfig,
  RiskHistoryPoint,
} from "@/types/risk";

const FACTORS = LABELS.RISK.FACTORS;
const ACTIONS = LABELS.RISK.ACTIONS;

export const RISK_GAUGE: RiskGaugeConfig = {
  value: 74,
  max: 100,
  tone: "high",
};

export const RISK_FACTORS: RiskFactor[] = [
  {
    id: "overallocation",
    label: FACTORS.OVERALLOCATION,
    score: FACTORS.OVERALLOCATION_SCORE,
    scoreTone: "orange",
    progressValue: 100,
    fillClassName: "bg-orange-500",
  },
  {
    id: "velocity-drop",
    label: FACTORS.VELOCITY_DROP,
    score: FACTORS.VELOCITY_DROP_SCORE,
    scoreTone: "orange",
    progressValue: 72,
    fillClassName: "bg-orange-400",
  },
  {
    id: "blocked-task",
    label: FACTORS.BLOCKED_TASK,
    score: FACTORS.BLOCKED_TASK_SCORE,
    scoreTone: "red",
    progressValue: 100,
    fillClassName: "bg-red-500",
  },
  {
    id: "milestone-drift",
    label: FACTORS.MILESTONE_DRIFT,
    score: FACTORS.MILESTONE_DRIFT_SCORE,
    scoreTone: "amber",
    progressValue: 80,
    fillClassName: "bg-amber-400",
  },
  {
    id: "scope-creep",
    label: FACTORS.SCOPE_CREEP,
    score: FACTORS.SCOPE_CREEP_SCORE,
    scoreTone: "emerald",
    progressValue: 0,
    fillClassName: "bg-emerald-400",
  },
];

export const RECOMMENDED_ACTIONS: RecommendedAction[] = [
  {
    id: "escalate-here-maps",
    order: 1,
    title: ACTIONS.ONE_TITLE,
    detail: ACTIONS.ONE_DETAIL,
    circleClassName: "bg-red-500",
    boxClassName: "border-red-100 bg-red-50",
  },
  {
    id: "redistribute-load",
    order: 2,
    title: ACTIONS.TWO_TITLE,
    detail: ACTIONS.TWO_DETAIL,
    circleClassName: "bg-orange-500",
    boxClassName: "border-orange-100 bg-orange-50",
  },
  {
    id: "notify-client",
    order: 3,
    title: ACTIONS.THREE_TITLE,
    detail: ACTIONS.THREE_DETAIL,
    circleClassName: "bg-amber-500",
    boxClassName: "border-amber-100 bg-amber-50",
  },
];

export const RISK_HISTORY: RiskHistoryPoint[] = [
  { label: "Jun 11", score: 28 },
  { label: "Jun 13", score: 30 },
  { label: "Jun 15", score: 35 },
  { label: "Jun 17", score: 42 },
  { label: "Jun 19", score: 55 },
  { label: "Jun 21", score: 62 },
  { label: "Jun 23", score: 68 },
  { label: "Jun 25", score: 74 },
];
