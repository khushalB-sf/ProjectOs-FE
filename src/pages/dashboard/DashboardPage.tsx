import { BurndownChart } from "@/components/dashboard/burndown-chart";
import { MilestoneTracker } from "@/components/dashboard/milestone-tracker";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatCards } from "@/components/dashboard/stat-cards";
import { VelocityChart } from "@/components/dashboard/velocity-chart";

function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatCards />
      <div className="grid grid-cols-3 gap-4">
        <BurndownChart />
        <VelocityChart />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <RecentActivity />
        <MilestoneTracker />
      </div>
    </div>
  );
}

export default DashboardPage;
