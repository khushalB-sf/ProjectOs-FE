import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";
import { severityToTone, type ProposalRisk } from "@/types/proposal";

const { RISKS, EDIT } = LABELS.PROPOSAL;

const EMPTY_RISK: ProposalRisk = {
  risk: "",
  impact: "",
  probability: "",
  mitigation: "",
};

interface RiskSectionProps {
  readonly risks: ProposalRisk[];
  readonly isEditing?: boolean;
  readonly onChange?: (risks: ProposalRisk[]) => void;
}

/** Identified risks: description, impact/probability badges, and mitigation. */
function RiskSection({ risks, isEditing = false, onChange }: RiskSectionProps) {
  if (isEditing) {
    const updateRisk = (index: number, patch: Partial<ProposalRisk>) =>
      onChange?.(
        risks.map((risk, riskIndex) =>
          riskIndex === index ? { ...risk, ...patch } : risk,
        ),
      );

    const removeRisk = (index: number) =>
      onChange?.(risks.filter((_, riskIndex) => riskIndex !== index));

    const addRisk = () => onChange?.([...risks, { ...EMPTY_RISK }]);

    return (
      <div className="space-y-3">
        {risks.map((risk, index) => (
          <div key={index} className="space-y-2 rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-2">
              <Textarea
                value={risk.risk}
                onChange={(event) =>
                  updateRisk(index, { risk: event.target.value })
                }
                placeholder={EDIT.RISK_DESCRIPTION_PLACEHOLDER}
                rows={2}
                className="flex-1 font-medium"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeRisk(index)}
                aria-label={EDIT.REMOVE_ROW_ARIA}
                className="shrink-0 text-slate-400 hover:text-red-600"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={risk.impact}
                onChange={(event) =>
                  updateRisk(index, { impact: event.target.value })
                }
                placeholder={EDIT.RISK_IMPACT_PLACEHOLDER}
              />
              <Input
                value={risk.probability}
                onChange={(event) =>
                  updateRisk(index, { probability: event.target.value })
                }
                placeholder={EDIT.RISK_PROBABILITY_PLACEHOLDER}
              />
            </div>
            <Textarea
              value={risk.mitigation}
              onChange={(event) =>
                updateRisk(index, { mitigation: event.target.value })
              }
              placeholder={EDIT.RISK_MITIGATION_PLACEHOLDER}
              rows={2}
            />
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addRisk}>
          <Plus aria-hidden="true" />
          {EDIT.ADD_RISK}
        </Button>
      </div>
    );
  }

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
