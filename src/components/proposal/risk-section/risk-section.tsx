import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { LABELS } from "@/constants/labels";
import { severityToTone, type ProposalRisk } from "@/types/proposal";

const { RISKS } = LABELS.PROPOSAL;

interface RiskSectionProps {
  risks: ProposalRisk[];
}

/** Identified risks: description, impact/probability badges, and mitigation. */
function RiskSection({ risks }: RiskSectionProps) {
  if (risks.length === 0) {
    return <p className="text-sm text-slate-500">{RISKS.EMPTY}</p>;
  }

  return (
    <div className="space-y-3">
      {risks.map((risk, index) => (
        <div
          key={`${risk.risk}-${index}`}
          className="rounded-xl bg-slate-50 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-slate-900">{risk.risk}</p>
            <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
              {risk.impact && (
                <StatusBadge tone={severityToTone(risk.impact)}>
                  {risk.impact} {RISKS.IMPACT_LABEL}
                </StatusBadge>
              )}
              {risk.probability && (
                <StatusBadge tone="neutral">
                  {risk.probability} {RISKS.PROBABILITY_LABEL}
                </StatusBadge>
              )}
            </div>
          </div>
          {risk.mitigation && (
            <p className="mt-2 text-sm text-slate-600">{risk.mitigation}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export { RiskSection };
