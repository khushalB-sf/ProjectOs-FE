import type { HeatmapRow, TeamMember } from "@/types/resources";

/** Number of sprint weeks shown in the utilization heatmap. */
export const HEATMAP_WEEK_COUNT = 6;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Tech Lead",
    skills: ["Python", "Maps API", "WebSocket"],
    ratePerDay: "$650",
    avatarTone: "bg-purple-500",
    utilizationValue: 100,
    utilizationFill: "bg-red-500",
    utilizationLabel: "115%",
    utilizationLabelClass: "text-red-500",
    status: { tone: "critical", label: "Overloaded" },
  },
  {
    id: "raj-mehta",
    name: "Raj Mehta",
    role: "Backend Engineer",
    skills: ["FastAPI", "PostgreSQL"],
    ratePerDay: "$500",
    avatarTone: "bg-blue-500",
    utilizationValue: 100,
    utilizationFill: "bg-red-400",
    utilizationLabel: "0% (Blocked)",
    utilizationLabelClass: "text-amber-500",
    status: { tone: "high", label: "Blocked" },
  },
  {
    id: "amy-kim",
    name: "Amy Kim",
    role: "Frontend Engineer",
    skills: ["React", "React Native"],
    ratePerDay: "$450",
    avatarTone: "bg-pink-500",
    utilizationValue: 88,
    utilizationFill: "bg-amber-400",
    utilizationLabel: "88%",
    utilizationLabelClass: "text-amber-500",
    status: { tone: "medium", label: "On Leave Jun 30" },
  },
  {
    id: "mike-torres",
    name: "Mike Torres",
    role: "Backend Engineer",
    skills: ["FastAPI", "Redis"],
    ratePerDay: "$500",
    avatarTone: "bg-emerald-500",
    utilizationValue: 55,
    utilizationFill: "bg-emerald-400",
    utilizationLabel: "55%",
    utilizationLabelClass: "text-emerald-500",
    status: { tone: "low", label: "Available" },
  },
];

export const HEATMAP_ROWS: HeatmapRow[] = [
  {
    id: "sarah-chen",
    member: "Sarah Chen",
    cells: [78, 92, 98, 115, 120, null],
  },
  {
    id: "raj-mehta",
    member: "Raj Mehta",
    cells: [65, 80, 90, 0, 0, null],
  },
  {
    id: "amy-kim",
    member: "Amy Kim",
    cells: [70, 75, 88, 95, "Leave", "Leave"],
  },
  {
    id: "mike-torres",
    member: "Mike Torres",
    cells: [50, 60, 55, 55, 60, null],
  },
];
