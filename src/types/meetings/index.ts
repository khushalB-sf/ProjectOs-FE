import { formatDate } from "@/lib/utils";
import { LABELS } from "@/constants/labels";

import type { StatusTone } from "@/types/common";

const L = LABELS.MEETINGS;

/* -------------------------------------------------------------------------- */
/* API contract (server wire shapes — snake_case, bare responses)             */
/* -------------------------------------------------------------------------- */

/**
 * A meeting as returned by the meetings endpoints. The `action_items`,
 * `decisions`, and `attendees` arrays are untyped in the OpenAPI spec
 * (`items: {}`), so they arrive as unknown entries and are normalised into
 * UI view-models by the mappers below.
 */
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
/* Mappers — API wire shapes → UI-facing shapes                               */
/* -------------------------------------------------------------------------- */

/** Status pill shown on a meeting. */
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

/** An extracted action item, mapped for the Action Items tab. */
export interface ActionItem {
  id: string;
  description: string;
  owner: string | null;
  due: string | null;
  /** Tailwind text-color class for the due date, keyed off priority urgency. */
  dueClassName: string;
  priorityTone: StatusTone;
  priorityLabel: string | null;
  done: boolean;
}

/** An extracted decision, mapped for the Decisions tab. */
export interface Decision {
  id: string;
  title: string;
  attribution: string | null;
  rationale: string | null;
}

/** Narrow an unknown value to a non-empty trimmed string, else null. */
function toText(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

/** Treat an unknown array entry as a keyed record for best-effort field lookup. */
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

const STATUS_TONE: Record<string, StatusTone> = {
  completed: "low",
  processed: "low",
  approved: "low",
  done: "low",
  failed: "critical",
  processing: "info",
  pending: "medium",
};

/** Maps a meeting status string from the API into a `StatusBadge` tone. */
export function statusToTone(status: string): StatusTone {
  return STATUS_TONE[status.toLowerCase()] ?? "neutral";
}

const STATUS_LABEL: Record<string, string> = {
  completed: L.STATUS.COMPLETED,
  processed: L.STATUS.COMPLETED,
  approved: L.STATUS.COMPLETED,
  done: L.STATUS.COMPLETED,
  failed: L.STATUS.FAILED,
  processing: L.STATUS.PROCESSING,
  pending: L.STATUS.PENDING,
};

/** Human-readable label for a meeting status, falling back to the raw value. */
export function statusToLabel(status: string): string {
  return STATUS_LABEL[status.toLowerCase()] ?? status;
}

const PRIORITY_TONE: Record<string, StatusTone> = {
  critical: "critical",
  high: "high",
  medium: "medium",
  low: "low",
};

const PRIORITY_LABEL: Record<string, string> = {
  critical: L.PRIORITY.CRITICAL,
  high: L.PRIORITY.HIGH,
  medium: L.PRIORITY.MEDIUM,
  low: L.PRIORITY.LOW,
};

/** Tailwind text-color for a due date: red for critical, amber for high/medium. */
const DUE_CLASS: Record<string, string> = {
  critical: "text-red-600",
  high: "text-amber-600",
  medium: "text-amber-600",
};

const DONE_STATUSES = new Set(["done", "completed", "resolved", "closed"]);

/** Whether the AI pipeline has finished processing this meeting. */
export function isMeetingProcessed(meeting: MeetingResponse): boolean {
  return Boolean(meeting.processed_at);
}

/** Maps a `MeetingResponse` into the summary row shown in the meeting list. */
export function toMeetingSummary(meeting: MeetingResponse): MeetingSummary {
  const date = formatDate(meeting.meeting_date);
  const status = isMeetingProcessed(meeting)
    ? L.DYNAMIC.ACTION_ITEMS_COUNT(meeting.action_items.length)
    : L.STATE.AWAITING_PROCESSING;

  return {
    id: meeting.id,
    title: meeting.title,
    badge: {
      tone: statusToTone(meeting.status),
      text: statusToLabel(meeting.status),
    },
    meta: date ? `${date} · ${status}` : status,
  };
}

/** Normalises a raw `action_items` entry into an `ActionItem`. */
export function toActionItem(raw: unknown, index: number): ActionItem {
  const plain = toText(raw);
  const record = asRecord(raw);
  const priority = (toText(record.priority) ?? "").toLowerCase();
  const status = (toText(record.status) ?? "").toLowerCase();

  return {
    id: toText(record.id) ?? String(index),
    description:
      plain ?? toText(record.description) ?? toText(record.title) ?? "",
    owner:
      toText(record.owner_name) ??
      toText(record.owner) ??
      toText(record.assignee),
    due: formatDate(toText(record.due_date) ?? toText(record.due)),
    dueClassName: DUE_CLASS[priority] ?? "text-slate-500",
    priorityTone: PRIORITY_TONE[priority] ?? "neutral",
    priorityLabel: PRIORITY_LABEL[priority] ?? toText(record.priority),
    done: DONE_STATUSES.has(status) || record.done === true,
  };
}

/** Normalises a raw `decisions` entry into a `Decision`. */
export function toDecision(raw: unknown, index: number): Decision {
  const plain = toText(raw);
  const record = asRecord(raw);
  const decidedBy =
    toText(record.decided_by) ??
    toText(record.made_by) ??
    toText(record.owner_name);
  const approvedBy = toText(record.approved_by) ?? toText(record.approver);

  const attributionParts: string[] = [];
  if (decidedBy)
    attributionParts.push(`${L.DECISIONS.DECIDED_BY_PREFIX} ${decidedBy}`);
  if (approvedBy)
    attributionParts.push(`${L.DECISIONS.APPROVED_BY_PREFIX} ${approvedBy}`);

  return {
    id: toText(record.id) ?? String(index),
    title:
      plain ??
      toText(record.description) ??
      toText(record.decision) ??
      toText(record.title) ??
      "",
    attribution:
      attributionParts.length > 0
        ? attributionParts.join(L.DECISIONS.SEPARATOR)
        : null,
    rationale: toText(record.rationale) ?? toText(record.reason),
  };
}

/** Normalises a raw `attendees` entry into a display name. */
export function toAttendeeName(raw: unknown): string {
  const plain = toText(raw);
  if (plain) return plain;
  const record = asRecord(raw);
  return (
    toText(record.name) ??
    toText(record.full_name) ??
    toText(record.owner_name) ??
    toText(record.email) ??
    ""
  );
}
