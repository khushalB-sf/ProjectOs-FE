import { ProgressBar } from "@/components/common/progress-bar/progress-bar";
import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { MILESTONES } from "@/constants/dashboard/mock";
import { LABELS } from "@/constants/labels";

import type { Milestone } from "@/types/dashboard";

const MILESTONE_LABELS = LABELS.DASHBOARD.MILESTONES;

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  return (
    <li>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-700">
          {milestone.label}
        </span>
        <StatusBadge tone={milestone.badge.tone}>
          {milestone.badge.text}
        </StatusBadge>
      </div>
      <ProgressBar
        value={milestone.progress.value}
        fillClassName={milestone.progress.fillClassName}
      />
      <p className="mt-1.5 text-xs text-slate-400">{milestone.date}</p>
    </li>
  );
}

function MilestoneTracker() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        {MILESTONE_LABELS.TITLE}
      </h3>
      <ul className="space-y-4">
        {MILESTONES.map((milestone) => (
          <MilestoneRow key={milestone.id} milestone={milestone} />
        ))}
      </ul>
    </div>
  );
}

export { MilestoneTracker };
