import { StatusBadge } from "@/components/common/status-badge/status-badge";
// import { Checkbox } from "@/components/ui/checkbox";
import { LABELS } from "@/constants/labels";
import { cn } from "@/lib/utils";
import { toActionItem, type ActionItem } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

function ActionItemCard({ item }: { item: ActionItem }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Temporarily hidden until task-linking is wired up.
        <Checkbox
          defaultChecked={item.done}
          aria-label={`${MEETINGS_LABELS.ACTION_ITEMS.TOGGLE_ARIA}: ${item.description}`}
          className="mt-0.5"
        /> */}
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-slate-900">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {item.owner && (
              <span>
                {MEETINGS_LABELS.ACTION_ITEMS.OWNER_PREFIX} {item.owner}
              </span>
            )}
            {item.due && (
              <span>
                {MEETINGS_LABELS.ACTION_ITEMS.DUE_PREFIX}{" "}
                <span className={cn("font-medium", item.dueClassName)}>
                  {item.due}
                </span>
              </span>
            )}
            {item.priorityLabel && (
              <StatusBadge tone={item.priorityTone}>
                {item.priorityLabel}
              </StatusBadge>
            )}
          </div>
        </div>
        {/* Temporarily hidden until task-linking is wired up.
        <button
          type="button"
          className={cn(
            "shrink-0 text-xs font-medium",
            item.done
              ? "text-green-600"
              : "text-indigo-600 hover:text-indigo-700",
          )}
        >
          {item.done
            ? MEETINGS_LABELS.ACTION_ITEMS.DONE
            : MEETINGS_LABELS.ACTION_ITEMS.LINK_TO_TASK}
        </button> */}
      </div>
    </div>
  );
}

interface ActionItemsPanelProps {
  items: unknown[];
}

function ActionItemsPanel({ items }: ActionItemsPanelProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        {MEETINGS_LABELS.ACTION_ITEMS.EMPTY}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((raw, index) => {
        const item = toActionItem(raw, index);
        return <ActionItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}

export { ActionItemsPanel };
