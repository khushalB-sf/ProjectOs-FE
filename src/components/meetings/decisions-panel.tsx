import { CheckCircle2 } from "lucide-react";

import { DECISIONS } from "@/constants/meetings/mock";

import type { Decision } from "@/types/meetings";

function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <CheckCircle2 className="size-4" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-900">{decision.title}</p>
          <p className="text-xs text-slate-500">{decision.attribution}</p>
          <p className="text-xs text-slate-500">{decision.rationale}</p>
        </div>
      </div>
    </div>
  );
}

function DecisionsPanel() {
  return (
    <div className="space-y-3">
      {DECISIONS.map((decision) => (
        <DecisionCard key={decision.id} decision={decision} />
      ))}
    </div>
  );
}

export { DecisionsPanel };
