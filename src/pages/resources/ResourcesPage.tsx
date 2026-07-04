import { TeamMembersTable } from "@/components/resources/team-members-table";
import { UtilizationHeatmap } from "@/components/resources/utilization-heatmap";

function ResourcesPage() {
  return (
    <div className="space-y-5">
      <TeamMembersTable />
      <UtilizationHeatmap />
    </div>
  );
}

export default ResourcesPage;
