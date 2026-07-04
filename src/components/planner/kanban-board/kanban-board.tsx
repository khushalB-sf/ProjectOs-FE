import { KANBAN_COLUMNS } from "@/constants/planner/mock";

import { KanbanColumn } from "@/components/planner/kanban-column/kanban-column";

/**
 * KanbanBoard — horizontal, scrollable row of kanban columns fed by mock data.
 */
function KanbanBoard() {
  return (
    <div className="flex min-h-[420px] gap-3 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  );
}

export { KanbanBoard };
