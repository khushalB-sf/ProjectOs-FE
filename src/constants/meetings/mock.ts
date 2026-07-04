import type {
  ActionItem,
  Decision,
  MeetingMinutes,
  MeetingSummary,
} from "@/types/meetings";

export const MEETINGS: MeetingSummary[] = [
  {
    id: "sprint-3-kickoff",
    title: "Sprint 3 Kickoff",
    badge: { tone: "low", text: "Done" },
    meta: "Jun 10, 2026 · 3 action items",
  },
  {
    id: "sprint-2-retro",
    title: "Sprint 2 Retrospective",
    badge: { tone: "low", text: "Done" },
    meta: "Jun 8, 2026 · 5 action items",
  },
  {
    id: "client-check-in",
    title: "Client Check-in",
    badge: { tone: "medium", text: "Pending" },
    meta: "Jun 24, 2026 · Awaiting processing",
  },
];

export const MEETING_MINUTES: MeetingMinutes = {
  attendees:
    "Sarah Chen (Tech Lead), Raj Mehta (BE), Amy Kim (FE), Marcus Lee (BA), Priya Sharma (PM)",
  reviewTitle: "Sprint 2 Review",
  reviewBody:
    "Sprint 2 closed at 34 of 42 points. 8 points spilled due to a breaking change in the HERE Maps API v3 → v4 migration that blocked the route integration work for 3 days. Team velocity has dropped from 42 to 34 points over the past two sprints.",
  planningTitle: "Sprint 3 Planning Decisions",
  planningBullets: [
    "Analytics dashboard scope reduced from 13 to 5 story points for this sprint",
    "Amy Kim to front-load her deliverables before maternity leave (starts Jun 30)",
    "AWS budget increase of $8K/month approved for ElastiCache cluster upgrade",
    "Sarah and Raj to pair on Route Optimization starting Monday to unblock HERE Maps work",
  ],
  riskTitle: "Key Risk Flagged",
  riskBody:
    "Route optimization has not started. It carries 13 story points and is on the critical path for the Jun 30 Beta milestone. If not started by Monday, the team will need to push the Beta deadline by at least 5 days.",
};

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: "ai-1",
    title: "Sarah to start Route Optimization pairing with Raj on Monday",
    owner: "Sarah Chen",
    due: "Jun 13, 2026",
    dueClassName: "text-red-600",
    priority: { tone: "critical", text: "Critical" },
    linkText: "Link to Task",
    done: false,
  },
  {
    id: "ai-2",
    title: "Amy to complete Driver App delivery flow screens before Jun 28",
    owner: "Amy Kim",
    due: "Jun 28, 2026",
    dueClassName: "text-amber-600",
    priority: { tone: "high", text: "High" },
    linkText: "Link to Task",
    done: false,
  },
  {
    id: "ai-3",
    title: "Priya to raise AWS budget change request with finance by EOD",
    owner: "Priya Sharma",
    due: "Jun 11, 2026",
    dueClassName: "text-amber-600",
    priority: { tone: "medium", text: "Medium" },
    linkText: "✓ Done",
    done: true,
  },
];

export const DECISIONS: Decision[] = [
  {
    id: "dec-1",
    title: "Analytics dashboard descoped from Sprint 3 to Sprint 4",
    attribution: "Decision by: Priya Sharma (PM) · Approved by: Sarah Chen",
    rationale:
      "Rationale: Unblocks Amy to focus on delivery flow before leave; analytics is non-critical for Beta",
  },
  {
    id: "dec-2",
    title: "AWS ElastiCache cluster upgrade approved ($8K/month increase)",
    attribution: "Decision by: Priya Sharma · Budget approved by Finance",
    rationale:
      "Rationale: Required to support 10K concurrent WebSocket connections for fleet tracking",
  },
];
