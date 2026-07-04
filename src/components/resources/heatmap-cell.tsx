import { getHeatmapCellStyle } from "@/components/resources/heatmap-cell-style";
import { cn } from "@/lib/utils";

import type { HeatmapCellValue } from "@/types/resources";

function HeatmapCell({ value }: { value: HeatmapCellValue }) {
  const { background, text, display } = getHeatmapCellStyle(value);
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded text-xs font-semibold",
        background,
        text,
      )}
    >
      {display}
    </div>
  );
}

export { HeatmapCell };
