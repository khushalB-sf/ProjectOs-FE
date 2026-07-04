import { LABELS } from "@/constants/labels";

import type { TimelinePhase } from "@/types/proposal";

const { TIMELINE } = LABELS.PROPOSAL;

interface TimelineSectionProps {
  phases: TimelinePhase[];
}

/** Delivery timeline: one card per phase with its duration and deliverables. */
function TimelineSection({ phases }: TimelineSectionProps) {
  if (phases.length === 0) {
    return <p className="text-sm text-slate-500">{TIMELINE.EMPTY}</p>;
  }

  return (
    <div className="space-y-3">
      {phases.map((phase) => (
        <div key={phase.phase} className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">
              {phase.phase}
            </p>
            <span className="shrink-0 text-xs font-medium text-indigo-600">
              {TIMELINE.DURATION_VALUE(phase.durationWeeks)}
            </span>
          </div>
          {phase.deliverables.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {phase.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export { TimelineSection };
