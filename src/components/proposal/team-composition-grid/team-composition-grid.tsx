import { LABELS } from "@/constants/labels";

import type { TeamMember } from "@/types/proposal";

const { TEAM_COMPOSITION } = LABELS.PROPOSAL;

interface TeamCompositionGridProps {
  team: TeamMember[];
}

/** Grid of proposed team roles: headcount, skills, and staffing rationale. */
function TeamCompositionGrid({ team }: TeamCompositionGridProps) {
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
