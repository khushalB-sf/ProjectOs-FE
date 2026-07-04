import { LABELS } from "@/constants/labels";
import { cn } from "@/lib/utils";

import { TaskCard } from "@/components/planner/task-card/task-card";

import type {
  KanbanColumn as KanbanColumnType,
  KanbanDotTone,
} from "@/types/planner";

interface KanbanColumnProps {
  column: KanbanColumnType;
}

const DOT_TONE_CLASSES: Record<KanbanDotTone, string> = {
  slate: "bg-slate-400",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  red: "bg-red-500",
};

/**
 * KanbanColumn — a single board column: colored dot + uppercase label + count
 * chip, followed by its task cards or a centered empty state.
 */
function KanbanColumn({ column }: KanbanColumnProps) {
  const isBlockedVariant = column.variant === "blocked";

  return (
    <div
      className={cn(
        "flex min-w-48 flex-1 flex-col rounded-xl bg-slate-50 p-3",
        isBlockedVariant && "border border-red-200 bg-red-50",
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            DOT_TONE_CLASSES[column.dotTone],
            column.dotPulse && "animate-pulse",
          )}
          aria-hidden="true"
        />
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {column.label}
        </span>
        <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
          {column.tasks.length}
        </span>
      </div>

      {column.tasks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8 text-sm text-slate-300">
          {LABELS.PLANNER.EMPTY.NO_TASKS}
        </div>
      ) : (
        <div className="space-y-2">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} doneStyle={column.doneStyle} />
          ))}
        </div>
      )}
    </div>
  );
}

export { KanbanColumn };
