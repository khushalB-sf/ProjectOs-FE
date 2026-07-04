import type { StatusTone } from "@/types/common";

/** A single scored contributor to the overall risk score. */
export type RiskFactor = {
  id: string;
  label: string;
  score: string;
  scoreTone: "orange" | "red" | "amber" | "emerald";
  progressValue: number;
  fillClassName: string;
};

/** A prioritised mitigation the team should take. */
export type RecommendedAction = {
  id: string;
  order: number;
  title: string;
  detail: string;
  circleClassName: string;
  boxClassName: string;
};

/** A single point on the risk-score-over-time trend. */
export type RiskHistoryPoint = {
  label: string;
  score: number;
};

/** Threshold boundaries for the semicircular risk gauge. */
export type RiskGaugeConfig = {
  value: number;
  max: number;
  tone: StatusTone;
};
