import type { StatusTone } from "@/types/common";

/* -------------------------------------------------------------------------- */
/* API contract (server wire shapes — snake_case, bare responses)             */
/* -------------------------------------------------------------------------- */

/** A meeting as returned by the meetings endpoints. */
export interface MeetingResponse {
  id: string;
  project_id: string;
  title: string;
  meeting_date: string | null;
  raw_transcript: string;
  mom: string | null;
  action_items: unknown[];
  decisions: unknown[];
  attendees: unknown[];
  status: string;
  processed_at: string | null;
  created_at: string;
}

/**
 * Body for creating a meeting (`POST /projects/{id}/meetings`, multipart).
 * Provide either `raw_transcript` or `transcript_file` (.txt/.pdf/.docx).
 */
export interface CreateMeetingDto {
  title: string;
  meeting_date?: string | null;
  raw_transcript?: string | null;
  transcript_file?: File | null;
}

/** Body for updating a meeting (`PUT /meetings/{id}`). */
export interface MeetingUpdate {
  title?: string | null;
  mom?: string | null;
  action_items?: unknown[] | null;
  decisions?: unknown[] | null;
}

/* -------------------------------------------------------------------------- */
/* UI view-models (component-facing shapes, mapped from the API contract)     */
/* -------------------------------------------------------------------------- */

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
