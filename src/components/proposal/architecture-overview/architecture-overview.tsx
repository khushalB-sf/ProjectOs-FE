import { LABELS } from "@/constants/labels";

import type { ArchitectureOverview as ArchitectureOverviewData } from "@/types/proposal";

const { ARCHITECTURE } = LABELS.PROPOSAL;

interface ArchitectureOverviewProps {
  architecture: ArchitectureOverviewData | null;
}

/** Proposed architecture: rationale paragraph plus a grid of its components. */
function ArchitectureOverview({ architecture }: ArchitectureOverviewProps) {
  if (!architecture) {
    return <p className="text-sm text-slate-500">{ARCHITECTURE.EMPTY}</p>;
  }

  return (
    <div className="space-y-4">
      {architecture.rationale && (
        <p className="leading-relaxed text-slate-700">
          {architecture.rationale}
        </p>
      )}
      {architecture.components.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {architecture.components.map((component) => (
            <div key={component.name} className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                {component.name}
              </p>
              {component.technology && (
                <p className="mt-0.5 text-xs font-medium text-indigo-600">
                  {component.technology}
                </p>
              )}
              {component.purpose && (
                <p className="mt-2 text-sm text-slate-600">
                  {component.purpose}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ArchitectureOverview };
