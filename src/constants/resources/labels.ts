/** All user-visible copy for the Resources module. */
export const RESOURCES_LABELS = {
  API: {
    SUGGEST_SUCCESS: "Team suggestion started.",
    SUGGEST_ERROR: "Failed to start team suggestion.",
  },
  TEAM_MEMBERS: {
    TITLE: "Team Members",
    AI_SUGGEST: "AI Suggest Team →",
    COLUMN_NAME: "Name",
    COLUMN_ROLE: "Role",
    COLUMN_SKILLS: "Skills",
    COLUMN_RATE: "Rate/Day",
    COLUMN_UTILIZATION: "Utilization",
    COLUMN_STATUS: "Status",
  },
  HEATMAP: {
    TITLE: "Cross-Sprint Utilization Heatmap",
    LEGEND: "Green <80% · Amber 80–100% · Red >100%",
    COLUMN_MEMBER: "Team Member",
    WEEK_PREFIX: "Week",
    EMPTY_CELL: "–",
    LEAVE_CELL: "Leave",
  },
} as const;
