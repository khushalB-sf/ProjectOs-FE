import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";

import type { TeamMember } from "@/types/proposal";

const { TEAM_COMPOSITION, EDIT } = LABELS.PROPOSAL;

const EMPTY_MEMBER: TeamMember = {
  role: "",
  count: undefined,
  skills: [],
  rationale: "",
};

interface TeamCompositionGridProps {
  readonly team: TeamMember[];
  readonly isEditing?: boolean;
  readonly onChange?: (team: TeamMember[]) => void;
}

/** Grid of proposed team roles: headcount, skills, and staffing rationale. */
function TeamCompositionGrid({
  team,
  isEditing = false,
  onChange,
}: TeamCompositionGridProps) {
  if (isEditing) {
    const updateMember = (index: number, patch: Partial<TeamMember>) =>
      onChange?.(
        team.map((member, memberIndex) =>
          memberIndex === index ? { ...member, ...patch } : member,
        ),
      );

    const removeMember = (index: number) =>
      onChange?.(team.filter((_, memberIndex) => memberIndex !== index));

    const addMember = () => onChange?.([...team, { ...EMPTY_MEMBER }]);

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="space-y-2 rounded-xl bg-slate-50 p-4">
              <div className="flex items-start gap-2">
                <Input
                  value={member.role}
                  onChange={(event) =>
                    updateMember(index, { role: event.target.value })
                  }
                  placeholder={EDIT.TEAM_ROLE_PLACEHOLDER}
                  className="font-semibold"
                />
                <Input
                  type="number"
                  min={0}
                  value={member.count ?? ""}
                  onChange={(event) =>
                    updateMember(index, {
                      count: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    })
                  }
                  placeholder={EDIT.TEAM_COUNT_PLACEHOLDER}
                  className="w-20 shrink-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeMember(index)}
                  aria-label={EDIT.REMOVE_ROW_ARIA}
                  className="shrink-0 text-slate-400 hover:text-red-600"
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </div>
              <Input
                value={member.skills.join(", ")}
                onChange={(event) =>
                  updateMember(index, {
                    skills: event.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean),
                  })
                }
                placeholder={EDIT.TEAM_SKILLS_PLACEHOLDER}
              />
              <Textarea
                value={member.rationale ?? ""}
                onChange={(event) =>
                  updateMember(index, { rationale: event.target.value })
                }
                placeholder={EDIT.TEAM_RATIONALE_PLACEHOLDER}
                rows={2}
              />
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addMember}>
          <Plus aria-hidden="true" />
          {EDIT.ADD_MEMBER}
        </Button>
      </div>
    );
  }

  if (team.length === 0) {
    return <p className="text-sm text-slate-500">{TEAM_COMPOSITION.EMPTY}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <div key={member.role} className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            {member.role}
            {member.count !== undefined && (
              <span className="ml-1 font-normal text-slate-500">
                × {member.count}
              </span>
            )}
          </p>
          {member.skills.length > 0 && (
            <p className="mt-2 text-sm text-slate-600">
              {member.skills.join(", ")}
            </p>
          )}
          {member.rationale && (
            <p className="mt-2 text-xs text-slate-500">{member.rationale}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export { TeamCompositionGrid };
