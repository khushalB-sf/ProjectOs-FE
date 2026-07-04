export interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  status: string;
  startDate: string;
  targetEndDate: string;
  budgetUsd: number;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  targetEndDate: string;
  budgetUsd: number;
}

export type UpdateProjectDto = Partial<
  Pick<CreateProjectDto, "description">
> & {
  status?: string;
};

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  badgeTone?: string;
  badgeText?: string;
  progressValue?: number;
  caption?: string;
  alert?: string;
}

export interface DashboardChartPoint {
  label: string;
  ideal: number;
  actual: number | null;
}

export interface DashboardVelocityPoint {
  label: string;
  points: number;
}

export interface DashboardActivityItem {
  id: string;
  tone: "red" | "amber" | "indigo" | "emerald";
  titleStrong: string;
  titleRest: string;
  subtitle: string;
  timestamp: string;
}

export interface DashboardMilestone {
  id: string;
  label: string;
  badgeTone: string;
  badgeText: string;
  progressValue: number;
  date: string;
}

export interface ProjectDashboard {
  stats: DashboardStat[];
  burndown: DashboardChartPoint[];
  velocity: DashboardVelocityPoint[];
  recentActivity: DashboardActivityItem[];
  milestones: DashboardMilestone[];
}
