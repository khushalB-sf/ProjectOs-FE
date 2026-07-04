import type { StatusTone } from "@/types/common";

/** Status pill shown on a meeting or action item. */
export interface MeetingBadge {
  tone: StatusTone;
  text: string;
}

/** Summary shown in the left-pane meeting list. */
export interface MeetingSummary {
  id: string;
  title: string;
  badge: MeetingBadge;
  meta: string;
}

/** A single extracted action item. */
export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  /** Tailwind text color class for the due date. */
  dueClassName: string;
  priority: MeetingBadge;
  linkText: string;
  done: boolean;
}

/** A single extracted decision. */
export interface Decision {
  id: string;
  title: string;
  attribution: string;
  rationale: string;
}

/** Minutes-of-meeting section for a meeting. */
export interface MeetingMinutes {
  attendees: string;
  reviewTitle: string;
  reviewBody: string;
  planningTitle: string;
  planningBullets: string[];
  riskTitle: string;
  riskBody: string;
}
