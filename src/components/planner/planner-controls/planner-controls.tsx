import { Loader2, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LABELS } from "@/constants/labels";
import { cn } from "@/lib/utils";

import type { SprintOption } from "@/types/planner";

const CONTROLS = LABELS.PLANNER.CONTROLS;

interface PlannerControlsProps {
  readonly sprintOptions: SprintOption[];
  /** True while an AI sprint-plan generation is in flight (kickoff + polling window). */
  readonly isGenerating: boolean;
  readonly onSelectSprint: (sprintId: string) => void;
  readonly onNewTask: () => void;
  readonly onGenerate: () => void;
}

/**
 * PlannerControls — the top controls row: sprint selector plus New Task and
 * Generate Sprint Plan actions.
 */
function PlannerControls({
  sprintOptions,
  isGenerating,
  onSelectSprint,
  onNewTask,
  onGenerate,
}: PlannerControlsProps) {
  return (
    <div className="flex items-center justify-end gap-4">
      <div className="flex items-center gap-3">
        <div
          className="flex overflow-hidden rounded-lg border border-slate-200"
          role="group"
          aria-label={CONTROLS.SPRINT_GROUP_ARIA}
        >
          {sprintOptions.length === 0 ? (
            <span className="px-3 py-1.5 text-sm text-slate-400">
              {CONTROLS.NO_SPRINTS}
            </span>
          ) : (
            sprintOptions.map((sprint) => (
              <button
                key={sprint.id}
                type="button"
                aria-pressed={sprint.active}
                onClick={() => onSelectSprint(sprint.id)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium transition-colors",
                  sprint.active && "bg-indigo-600 text-white",
                  sprint.done && !sprint.active && "text-slate-400",
                  !sprint.active && !sprint.done && "text-slate-600",
                )}
              >
                {sprint.label}
              </button>
            ))
          )}
        </div>

        <Button variant="outline" onClick={onNewTask}>
          {CONTROLS.NEW_TASK}
        </Button>

        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isGenerating ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : (
            <Zap aria-hidden="true" />
          )}
          {isGenerating ? CONTROLS.GENERATING : CONTROLS.GENERATE_PLAN}
        </Button>
      </div>
    </div>
  );
}

export { PlannerControls };
