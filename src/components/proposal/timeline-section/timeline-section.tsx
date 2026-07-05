import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";

import type { TimelinePhase } from "@/types/proposal";

const { TIMELINE, EDIT } = LABELS.PROPOSAL;

const EMPTY_PHASE: TimelinePhase = {
  phase: "",
  durationWeeks: 0,
  deliverables: [],
};

interface TimelineSectionProps {
  readonly phases: TimelinePhase[];
  readonly isEditing?: boolean;
  readonly onChange?: (phases: TimelinePhase[]) => void;
}

/** Delivery timeline: one card per phase with its duration and deliverables. */
function TimelineSection({
  phases,
  isEditing = false,
  onChange,
}: TimelineSectionProps) {
  if (isEditing) {
    const updatePhase = (index: number, patch: Partial<TimelinePhase>) =>
      onChange?.(
        phases.map((phase, phaseIndex) =>
          phaseIndex === index ? { ...phase, ...patch } : phase,
        ),
      );

    const removePhase = (index: number) =>
      onChange?.(phases.filter((_, phaseIndex) => phaseIndex !== index));

    const addPhase = () => onChange?.([...phases, { ...EMPTY_PHASE }]);

    return (
      <div className="space-y-3">
        {phases.map((phase, index) => (
          <div key={index} className="space-y-2 rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-2">
              <Input
                value={phase.phase}
                onChange={(event) =>
                  updatePhase(index, { phase: event.target.value })
                }
                placeholder={EDIT.TIMELINE_PHASE_PLACEHOLDER}
                className="font-semibold"
              />
              <Input
                type="number"
                min={0}
                value={phase.durationWeeks}
                onChange={(event) =>
                  updatePhase(index, {
                    durationWeeks: Number(event.target.value),
                  })
                }
                placeholder={EDIT.TIMELINE_DURATION_PLACEHOLDER}
                className="w-24 shrink-0"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removePhase(index)}
                aria-label={EDIT.REMOVE_ROW_ARIA}
                className="shrink-0 text-slate-400 hover:text-red-600"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
            <Textarea
              value={phase.deliverables.join("\n")}
              onChange={(event) =>
                updatePhase(index, {
                  deliverables: event.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
              placeholder={EDIT.TIMELINE_DELIVERABLES_PLACEHOLDER}
              rows={3}
            />
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addPhase}>
          <Plus aria-hidden="true" />
          {EDIT.ADD_PHASE}
        </Button>
      </div>
    );
  }

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
