import { LABELS } from "@/constants/labels";
import { RECOMMENDED_ACTIONS } from "@/constants/risk/mock";
import { cn } from "@/lib/utils";

const ACTIONS = LABELS.RISK.ACTIONS;

/** RecommendedActions — prioritised mitigation steps in tinted, bordered boxes. */
function RecommendedActions() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        {ACTIONS.TITLE}
      </h3>
      <div className="space-y-3">
        {RECOMMENDED_ACTIONS.map((action) => (
          <div
            key={action.id}
            className={cn(
              "flex gap-3 rounded-lg border p-3",
              action.boxClassName,
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                action.circleClassName,
              )}
            >
              {action.order}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {action.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{action.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { RecommendedActions };
