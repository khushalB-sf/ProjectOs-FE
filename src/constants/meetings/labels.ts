export const MEETINGS_LABELS = {
  API: {
    CREATE_SUCCESS: "Meeting created successfully.",
    CREATE_ERROR: "Failed to create meeting.",
    UPDATE_SUCCESS: "Meeting updated successfully.",
    UPDATE_ERROR: "Failed to update meeting.",
    REPROCESS_SUCCESS: "Meeting reprocessing started.",
    REPROCESS_ERROR: "Failed to reprocess meeting.",
  },
  ACTIONS: {
    PROCESS_NEW: "Process New Transcript",
    COPY_MOM: "Copy MOM",
    EXPORT: "Export",
    CANCEL: "Cancel",
    PROCESS_WITH_AI: "Process with AI",
    LINK_TO_TASK: "Link to Task",
    DONE: "✓ Done",
  },
  LIST: {
    ARIA_LABEL: "Meeting list",
  },
  DETAIL: {
    PROCESSED_META: "Jun 10, 2026 · 14:00 · Processed by AI",
  },
  TABS: {
    MINUTES: "Minutes of Meeting",
    ACTION_ITEMS: "Action Items",
    DECISIONS: "Decisions",
  },
  MINUTES: {
    ATTENDEES_TITLE: "Attendees",
  },
  ACTION_ITEMS: {
    OWNER_PREFIX: "Owner:",
    DUE_PREFIX: "Due:",
    TOGGLE_ARIA: "Toggle action item",
  },
  NEW: {
    TITLE: "Process New Transcript",
    SUBTITLE:
      "Paste your meeting transcript and AI will extract MOM, action items, and decisions.",
    TITLE_PLACEHOLDER: "Meeting title (e.g. Sprint 4 Planning)",
    TRANSCRIPT_PLACEHOLDER: "Paste raw transcript here…",
  },
  PROCESSING: {
    TITLE: "AI Processing Transcript…",
    SUBTITLE: "Extracting action items, decisions, and generating MOM",
  },
} as const;
