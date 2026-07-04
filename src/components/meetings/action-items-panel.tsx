import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { LABELS } from "@/constants/labels";
import { ACTION_ITEMS } from "@/constants/meetings/mock";
import { cn } from "@/lib/utils";

import type { ActionItem } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

function ActionItemCard({ item }: { item: ActionItem }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Checkbox
          defaultChecked={item.done}
          aria-label={`${MEETINGS_LABELS.ACTION_ITEMS.TOGGLE_ARIA}: ${item.title}`}
          className="mt-0.5"
        />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-slate-900">{item.title}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>
              {MEETINGS_LABELS.ACTION_ITEMS.OWNER_PREFIX} {item.owner}
            </span>
            <span>
              {MEETINGS_LABELS.ACTION_ITEMS.DUE_PREFIX}{" "}
              <span className={cn("font-medium", item.dueClassName)}>
                {item.due}
              </span>
            </span>
            <StatusBadge tone={item.priority.tone}>
              {item.priority.text}
            </StatusBadge>
          </div>
        </div>
        <button
          type="button"
          className={cn(
            "shrink-0 text-xs font-medium",
            item.done
              ? "text-green-600"
              : "text-indigo-600 hover:text-indigo-700",
          )}
        >
          {item.linkText}
        </button>
      </div>
    </div>
  );
}

function ActionItemsPanel() {
  return (
    <div className="space-y-3">
      {ACTION_ITEMS.map((item) => (
        <ActionItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export { ActionItemsPanel };
