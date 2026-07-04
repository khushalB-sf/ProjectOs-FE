import { useState } from "react";

import { GenerateSprintDialog } from "@/components/planner/generate-sprint-dialog/generate-sprint-dialog";
import { KanbanBoard } from "@/components/planner/kanban-board/kanban-board";
import { PlannerControls } from "@/components/planner/planner-controls/planner-controls";
import { SprintSummaryBar } from "@/components/planner/sprint-summary-bar/sprint-summary-bar";
import { LABELS } from "@/constants/labels";

import type { PlannerView } from "@/types/planner";

/**
 * PlannerPage — the sprint planner route. Renders the controls row, sprint
 * summary bar and (for the Kanban view) the kanban board, plus the AI
 * sprint-plan generation dialog.
 */
function PlannerPage() {
  const [view, setView] = useState<PlannerView>("kanban");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <PlannerControls
        view={view}
        onViewChange={setView}
        onGenerate={() => setIsDialogOpen(true)}
      />
      <SprintSummaryBar />

      {view === "kanban" ? (
        <KanbanBoard />
      ) : (
        <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-400">
          {LABELS.PLANNER.VIEW.GANTT_COMING_SOON}
        </div>
      )}

      <GenerateSprintDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}

export default PlannerPage;
