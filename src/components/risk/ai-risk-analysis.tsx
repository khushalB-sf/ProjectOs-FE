import { Zap } from "lucide-react";

import { LABELS } from "@/constants/labels";

const ANALYSIS = LABELS.RISK.ANALYSIS;

/** AiRiskAnalysis — narrative summary of the current risk posture. */
function AiRiskAnalysis() {
  return (
    <div className="rounded-xl border border-slate-200 border-l-4 border-l-orange-400 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Zap className="h-4 w-4 text-indigo-600" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-slate-900">
          {ANALYSIS.TITLE}
        </h3>
      </div>
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-slate-700">
          <span className="font-semibold">{ANALYSIS.LEAD_BOLD}</span>
          {ANALYSIS.PARAGRAPH_ONE}
        </p>
        <p className="text-sm leading-relaxed text-slate-700">
          {ANALYSIS.PARAGRAPH_TWO}
        </p>
        <p className="text-sm leading-relaxed text-slate-400 italic">
          {ANALYSIS.PARAGRAPH_THREE}
        </p>
      </div>
    </div>
  );
}

export { AiRiskAnalysis };
