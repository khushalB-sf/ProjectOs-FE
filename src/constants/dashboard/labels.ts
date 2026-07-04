export const DASHBOARD_LABELS = {
  STATS: {
    RISK_SCORE: "Risk Score",
    RISK_VALUE: "74",
    RISK_SUFFIX: "/100",
    RISK_BADGE: "HIGH",
    SPRINT_PROGRESS: "Sprint Progress",
    SPRINT_VALUE: "22",
    SPRINT_SUFFIX: "/ 38 pts",
    OPEN_TASKS: "Open Tasks",
    OPEN_TASKS_VALUE: "8",
    OPEN_TASKS_SUFFIX: "tasks",
    OPEN_TASKS_ALERT: "⚠ 1 blocked >48h",
    BUDGET_USED: "Budget Used",
    BUDGET_VALUE: "$218K",
    BUDGET_CAPTION: "of $485K",
  },
  BURNDOWN: {
    TITLE: "Sprint Burndown — Sprint 3",
    SUBTITLE: "Jun 10 – Jun 28, 2026",
    BADGE: "Behind",
    IDEAL: "Ideal Burndown",
    ACTUAL: "Actual Remaining",
  },
  VELOCITY: {
    TITLE: "Velocity Trend",
    SUBTITLE: "Points completed per sprint",
  },
  ACTIVITY: {
    TITLE: "Recent Activity",
  },
  MILESTONES: {
    TITLE: "Milestones",
  },
} as const;
