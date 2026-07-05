import { Loader2 } from "lucide-react";

import { BurndownChart } from "@/components/dashboard/burndown-chart";
import { ProjectOverview } from "@/components/dashboard/project-overview";
import { StatCards } from "@/components/dashboard/stat-cards";
import { VelocityChart } from "@/components/dashboard/velocity-chart";
import { LABELS } from "@/constants/labels";
import { useProject } from "@/contexts/useProject";
import { useSprints } from "@/hooks/planner/queries";
import { useProjectDashboard } from "@/hooks/projects/queries";
import { getErrorMessage } from "@/lib/utils";

import { mapDashboardToStatCards } from "./mapDashboardToStatCards";
import { mapProjectToOverview } from "./mapProjectToOverview";
import {
  burndownSubtitle,
  burndownTitle,
  deriveBurndown,
  findActiveSprint,
  mapSprintsToVelocity,
} from "./mapSprintsToCharts";

/** Shared framed box for the loading and error states of a dashboard section. */
function StatusBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-10">
      {children}
    </div>
  );
}

function DashboardSummary() {
  const { projectId } = useProject();
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
  } = useProjectDashboard(projectId);

  if (isLoading) {
    return (
      <StatusBox>
        <Loader2
          className="h-5 w-5 animate-spin text-slate-400"
          aria-hidden="true"
        />
      </StatusBox>
    );
  }

  if (isError) {
    return (
      <StatusBox>
        <p className="text-sm font-medium text-red-500">
          {getErrorMessage(error, LABELS.PROJECTS.LIST.LOAD_ERROR)}
        </p>
      </StatusBox>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <>
      <ProjectOverview overview={mapProjectToOverview(dashboard.project)} />
      <StatCards cards={mapDashboardToStatCards(dashboard)} />
    </>
  );
}

function DashboardCharts() {
  const { projectId } = useProject();
  const { data: sprints, isLoading, isError, error } = useSprints(projectId);

  if (isLoading) {
    return (
      <StatusBox>
        <Loader2
          className="h-5 w-5 animate-spin text-slate-400"
          aria-hidden="true"
        />
      </StatusBox>
    );
  }

  if (isError) {
    return (
      <StatusBox>
        <p className="text-sm font-medium text-red-500">
          {getErrorMessage(error, LABELS.PROJECTS.LIST.LOAD_ERROR)}
        </p>
      </StatusBox>
    );
  }

  if (!sprints || sprints.length === 0) {
    return null;
  }

  const activeSprint = findActiveSprint(sprints);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <BurndownChart
        data={deriveBurndown(activeSprint)}
        title={burndownTitle(activeSprint)}
        subtitle={burndownSubtitle(activeSprint)}
      />
      <VelocityChart data={mapSprintsToVelocity(sprints)} />
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardSummary />
      <DashboardCharts />
    </div>
  );
}

export default DashboardPage;
