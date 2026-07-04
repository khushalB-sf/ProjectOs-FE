import type { StatusTone } from "@/types/common";

/* -------------------------------------------------------------------------- */
/* API contract (server wire shapes — snake_case, bare responses)             */
/* -------------------------------------------------------------------------- */

/** A computed risk snapshot (`GET /projects/{id}/risk/latest`). */
export interface RiskSnapshotResponse {
  id: string;
  project_id: string;
  sprint_id: string | null;
  risk_score: number;
  risk_level: string;
  risk_factors: Record<string, unknown>;
  recommendations: unknown[];
  llm_explanation: string | null;
  computed_at: string;
}

/** Risk trend over time (`GET /projects/{id}/risk/history`). */
export interface RiskHistoryResponse {
  snapshots: RiskSnapshotResponse[];
  trend: string;
  average_score: number;
}

/* -------------------------------------------------------------------------- */
/* UI view-models (component-facing shapes, mapped from the API contract)     */
/* -------------------------------------------------------------------------- */

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
