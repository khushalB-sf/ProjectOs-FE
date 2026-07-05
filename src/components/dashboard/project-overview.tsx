import { ProgressBar } from "@/components/common/progress-bar/progress-bar";
import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { LABELS } from "@/constants/labels";
import { cn } from "@/lib/utils";

import type { ProjectOverviewView } from "@/types/dashboard";

const OVERVIEW = LABELS.DASHBOARD.OVERVIEW;

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

interface ProjectOverviewProps {
  readonly overview: ProjectOverviewView;
}

/**
 * ProjectOverview — the dashboard hero. Surfaces the project's identity, a
 * schedule progress bar (elapsed proportion of start → target-end), and the
 * key facts (budget, duration, dates) drawn straight from the project record.
 */
function ProjectOverview({ overview }: ProjectOverviewProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="truncate text-xl font-bold text-slate-900">
          {overview.name}
        </h2>
        <StatusBadge tone={overview.statusTone}>
          {overview.statusLabel}
        </StatusBadge>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        {overview.client} · {OVERVIEW.CREATED_PREFIX} {overview.createdLabel}
      </p>
      <p className="mt-3 text-sm text-slate-600">{overview.description}</p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">
            {OVERVIEW.TIMELINE}
          </span>
          <span
            className={cn(
              "font-medium",
              overview.isOverdue ? "text-red-500" : "text-slate-500",
            )}
          >
            {overview.scheduleCaption}
          </span>
        </div>
        {overview.elapsedPercent !== null ? (
          <ProgressBar
            value={overview.elapsedPercent}
            fillClassName={overview.isOverdue ? "bg-red-500" : "bg-indigo-500"}
          />
        ) : null}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-4">
        <Fact label={OVERVIEW.BUDGET} value={overview.budgetLabel} />
        <Fact label={OVERVIEW.DURATION} value={overview.durationLabel} />
        <Fact label={OVERVIEW.START} value={overview.startLabel} />
        <Fact label={OVERVIEW.TARGET_END} value={overview.endLabel} />
      </dl>
    </section>
  );
}

export { ProjectOverview };
