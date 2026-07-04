import { ProgressBar } from "@/components/common/progress-bar/progress-bar";
import { LABELS } from "@/constants/labels";
import { RISK_FACTORS } from "@/constants/risk/mock";
import { cn } from "@/lib/utils";

import type { RiskFactor } from "@/types/risk";

const FACTORS = LABELS.RISK.FACTORS;

const SCORE_TONE_CLASSES: Record<RiskFactor["scoreTone"], string> = {
  orange: "text-orange-500",
  red: "text-red-500",
  amber: "text-amber-500",
  emerald: "text-emerald-500",
};

/** RiskFactorBreakdown — scored contributors to the overall risk with a total row. */
function RiskFactorBreakdown() {
  return (
    <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          {FACTORS.TITLE}
        </h3>
        <button
          type="button"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
        >
          {FACTORS.RECOMPUTE}
        </button>
      </div>
      <div className="space-y-3">
        {RISK_FACTORS.map((factor) => (
          <div key={factor.id}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-700">{factor.label}</span>
              <span
                className={cn(
                  "font-semibold",
                  SCORE_TONE_CLASSES[factor.scoreTone],
                )}
              >
                {factor.score}
              </span>
            </div>
            <ProgressBar
              value={factor.progressValue}
              fillClassName={factor.fillClassName}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
        <span className="text-sm font-semibold text-slate-900">
          {FACTORS.TOTAL_LABEL}
        </span>
        <span className="text-lg font-bold text-orange-500">
          {FACTORS.TOTAL_SCORE}
        </span>
      </div>
    </div>
  );
}

export { RiskFactorBreakdown };
