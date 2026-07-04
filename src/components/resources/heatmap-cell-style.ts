import { LABELS } from "@/constants/labels";

import type { HeatmapCellValue } from "@/types/resources";

const HEATMAP_LABELS = LABELS.RESOURCES.HEATMAP;

export interface HeatmapCellStyle {
  background: string;
  text: string;
  display: string;
}

/**
 * Maps a heatmap cell value to its display text and Tailwind color classes.
 * Green <80%, amber 80–100%, red >100%. Empty / on-leave / zero cells render
 * on a neutral slate background.
 */
export function getHeatmapCellStyle(value: HeatmapCellValue): HeatmapCellStyle {
  if (value === null) {
    return {
      background: "bg-slate-100",
      text: "text-slate-400",
      display: HEATMAP_LABELS.EMPTY_CELL,
    };
  }
  if (value === "Leave") {
    return {
      background: "bg-slate-100",
      text: "text-slate-400",
      display: HEATMAP_LABELS.LEAVE_CELL,
    };
  }
  if (value === 0) {
    return {
      background: "bg-slate-100",
      text: "text-slate-400",
      display: "0%",
    };
  }

  const display = `${value}%`;
  if (value < 80) {
    return { background: "bg-emerald-100", text: "text-emerald-700", display };
  }
  if (value <= 100) {
    const background = value >= 95 ? "bg-amber-200" : "bg-amber-100";
    return { background, text: "text-amber-700", display };
  }
  const background = value >= 120 ? "bg-red-300" : "bg-red-200";
  return { background, text: "text-red-700", display };
}
