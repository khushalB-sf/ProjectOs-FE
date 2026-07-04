export const RISK_LABELS = {
  API: {
    COMPUTE_SUCCESS: "Risk computation started.",
    COMPUTE_ERROR: "Failed to start risk computation.",
  },
  GAUGE: {
    CAPTION: "Current Risk Score",
    VALUE: "74",
    SUFFIX: "/100",
    BADGE: "HIGH RISK",
    COMPUTED: "Computed Jun 25, 2026 · 09:15",
  },
  FACTORS: {
    TITLE: "Risk Factor Breakdown",
    RECOMPUTE: "Recompute Now",
    TOTAL_LABEL: "Total",
    TOTAL_SCORE: "74/100",
    OVERALLOCATION: "Overallocation — Sarah at 115%",
    OVERALLOCATION_SCORE: "20/20",
    VELOCITY_DROP: "Velocity Drop — 34 vs 42 pts last sprint",
    VELOCITY_DROP_SCORE: "18/25",
    BLOCKED_TASK: "Blocked Task — HERE Maps API (52h)",
    BLOCKED_TASK_SCORE: "20/20",
    MILESTONE_DRIFT: "Milestone Drift — Beta at risk",
    MILESTONE_DRIFT_SCORE: "16/20",
    SCOPE_CREEP: "Scope Creep — 0 open change requests",
    SCOPE_CREEP_SCORE: "0/15",
  },
  ANALYSIS: {
    TITLE: "AI Risk Analysis",
    LEAD_BOLD: "Sprint 3 is at significant delivery risk.",
    PARAGRAPH_ONE:
      " The primary driver is Sarah Chen’s overallocation at 115% — she owns both the GPS Tracking WebSocket (in progress) and is expected to pair on Route Optimization. If Route Optimization doesn’t start by Monday, the 13-point story will almost certainly spill into Sprint 4, directly threatening the Jun 30 Beta milestone.",
    PARAGRAPH_TWO:
      "The HERE Maps API block (52h) compounds the problem — it’s the exact dependency that caused Sprint 2 to spill 8 points. Raj is blocked and idle on that ticket. This risk pattern repeats from Sprint 2 and indicates a structural dependency management gap.",
    PARAGRAPH_THREE:
      "Without intervention by Jun 26, this project has a 73% probability of missing the Jun 30 Beta milestone.",
  },
  ACTIONS: {
    TITLE: "Recommended Actions",
    ONE_TITLE: "Escalate HERE Maps API key immediately",
    ONE_DETAIL:
      "Contact HERE enterprise support directly, not through regular ticket. Ask Priya to loop in TechFlow account manager.",
    TWO_TITLE: "Redistribute Sarah’s sprint load",
    TWO_DETAIL:
      "Move Rate Card UI (3pts) from Amy to Mike. Defer Load Balancer check to Sprint 4. Brings Sarah to 95%.",
    THREE_TITLE: "Notify client of potential Beta slip",
    THREE_DETAIL:
      "Proactively communicate a possible 3–5 day delay to the Jun 30 Beta. Offer Jul 3 as revised target.",
  },
  HISTORY: {
    TITLE: "Risk History",
    SUBTITLE: "Score trend over last 14 days",
  },
} as const;
