import { AlertTriangle } from "lucide-react";

import { ProgressBar } from "@/components/common/progress-bar/progress-bar";
import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { cn } from "@/lib/utils";

import type { KanbanTask } from "@/types/planner";

interface TaskCardProps {
  task: KanbanTask;
  /** Render the compact, dimmed "done" style (line-through title). */
  doneStyle?: boolean;
  columnId?: string;
  onDragStart?: (taskId: string, columnId: string) => void;
  onDragEnd?: () => void;
  onDragOverCard?: () => void;
}

/**
 * TaskCard — a single kanban card with drag support. Adapts its layout for todo, in-progress,
 * done and blocked tasks based on the fields present on the task.
 */
function TaskCard({
  task,
  doneStyle,
  columnId,
  onDragStart,
  onDragEnd,
  onDragOverCard,
}: TaskCardProps) {
  const isBlocked = Boolean(task.blockedInfo);

  const handleDragStart = (_e: React.DragEvent<HTMLDivElement>) => {
    if (columnId && onDragStart) {
      onDragStart(task.id, columnId);
    }
  };

  const handleDragEnd = () => {
    if (onDragEnd) {
      onDragEnd();
    }
  };

  const handleDragOver = (_e: React.DragEvent<HTMLDivElement>) => {
    if (onDragOverCard) {
      onDragOverCard();
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-3 shadow-sm cursor-move transition-all hover:shadow-md",
        task.progress !== undefined && "border-l-4 border-l-blue-400",
        doneStyle && "opacity-70",
        isBlocked && "border border-red-300",
      )}
    >
      {task.blockedInfo && (
        <div className="mb-1 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{task.blockedInfo.duration}</span>
        </div>
      )}

      <p
        className={cn(
          "text-sm font-medium text-slate-800",
          doneStyle && "line-through",
        )}
      >
        {task.title}
      </p>

      {task.blockedInfo && (
        <p className="mt-1 text-xs text-slate-500">{task.blockedInfo.reason}</p>
      )}

      <div
        className={cn(
          "mt-2 flex items-center justify-between gap-2",
          doneStyle && "mt-1",
        )}
      >
        <span className="text-xs text-slate-500">{task.meta}</span>
        {task.badge && (
          <StatusBadge tone={task.badge.tone}>{task.badge.text}</StatusBadge>
        )}
      </div>

      {task.progress !== undefined && (
        <div className="mt-2 space-y-1">
          <ProgressBar value={task.progress} />
          {task.progressCaption && (
            <p className="text-xs text-slate-500">{task.progressCaption}</p>
          )}
        </div>
      )}
    </div>
  );
}

export { TaskCard };
