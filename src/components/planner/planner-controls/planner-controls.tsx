import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LABELS } from "@/constants/labels";
import { SPRINT_OPTIONS } from "@/constants/planner/mock";
import { cn } from "@/lib/utils";

import type { PlannerView } from "@/types/planner";

const CONTROLS = LABELS.PLANNER.CONTROLS;
const VIEW = LABELS.PLANNER.VIEW;

interface PlannerControlsProps {
  view: PlannerView;
  onViewChange: (view: PlannerView) => void;
  onGenerate: () => void;
}

/**
 * PlannerControls — the top controls row: Kanban/Gantt view toggle on the left,
 * sprint selector plus New Task and Generate Sprint Plan actions on the right.
 */
function PlannerControls({
  view,
  onViewChange,
  onGenerate,
}: PlannerControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className="flex gap-1 rounded-lg bg-slate-200 p-1"
        role="tablist"
        aria-label={CONTROLS.VIEW_TOGGLE_ARIA}
      >
        <button
          type="button"
          role="tab"
          aria-selected={view === "kanban"}
          onClick={() => onViewChange("kanban")}
          className={cn(
            "rounded-md px-3 py-1 text-sm font-medium transition-colors",
            view === "kanban"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500",
          )}
        >
          {VIEW.KANBAN}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "gantt"}
          onClick={() => onViewChange("gantt")}
          className={cn(
            "rounded-md px-3 py-1 text-sm font-medium transition-colors",
            view === "gantt"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500",
          )}
        >
          {VIEW.GANTT}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex overflow-hidden rounded-lg border border-slate-200"
          role="group"
          aria-label={CONTROLS.SPRINT_GROUP_ARIA}
        >
          {SPRINT_OPTIONS.map((sprint) => (
            <button
              key={sprint.id}
              type="button"
              aria-pressed={sprint.active}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                sprint.active && "bg-indigo-600 text-white",
                sprint.done && "text-slate-400",
                !sprint.active && !sprint.done && "text-slate-600",
              )}
            >
              {sprint.label}
            </button>
          ))}
        </div>

        <Button variant="outline">{CONTROLS.NEW_TASK}</Button>

        <Button
          onClick={onGenerate}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Zap aria-hidden="true" />
          {CONTROLS.GENERATE_PLAN}
        </Button>
      </div>
    </div>
  );
}

export { PlannerControls };
