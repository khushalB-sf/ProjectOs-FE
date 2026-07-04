import { CheckCircle2 } from "lucide-react";

import { LABELS } from "@/constants/labels";
import { toDecision, type Decision } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <CheckCircle2 className="size-4" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-900">{decision.title}</p>
          {decision.attribution && (
            <p className="text-xs text-slate-500">{decision.attribution}</p>
          )}
          {decision.rationale && (
            <p className="text-xs text-slate-500">
              {MEETINGS_LABELS.DECISIONS.RATIONALE_PREFIX} {decision.rationale}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface DecisionsPanelProps {
  decisions: unknown[];
}

function DecisionsPanel({ decisions }: DecisionsPanelProps) {
  if (decisions.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        {MEETINGS_LABELS.DECISIONS.EMPTY}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {decisions.map((raw, index) => {
        const decision = toDecision(raw, index);
        return <DecisionCard key={decision.id} decision={decision} />;
      })}
    </div>
  );
}

export { DecisionsPanel };
