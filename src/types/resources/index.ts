import type { StatusTone } from "@/types/common";

/** Tailwind background utility for a team-member avatar circle. */
export type AvatarTone =
  "bg-purple-500" | "bg-blue-500" | "bg-pink-500" | "bg-emerald-500";

/** A single team member row in the Team Members table. */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  ratePerDay: string;
  avatarTone: AvatarTone;
  /** Progress-bar fill value, 0–100. */
  utilizationValue: number;
  /** Tailwind background utility for the progress fill. */
  utilizationFill: string;
  /** Display text for the utilization percentage. */
  utilizationLabel: string;
  /** Tailwind text-color utility for the utilization label. */
  utilizationLabelClass: string;
  status: {
    tone: StatusTone;
    label: string;
  };
}

/** A single heatmap cell value: a numeric utilization %, on-leave, or empty. */
export type HeatmapCellValue = number | null | "Leave";

/** A row in the cross-sprint utilization heatmap. */
export interface HeatmapRow {
  id: string;
  member: string;
  /** One cell per week (Week 1..Week 6). */
  cells: HeatmapCellValue[];
}
