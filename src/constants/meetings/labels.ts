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
  },
  LIST: {
    ARIA_LABEL: "Meeting list",
  },
  DETAIL: {
    PROCESSED_PREFIX: "Processed",
    NOT_PROCESSED: "Not processed yet",
    NO_SELECTION_TITLE: "No meeting selected",
    NO_SELECTION_BODY:
      "Select a meeting from the list to view its minutes, action items, and decisions.",
    COPY_MOM_SUCCESS: "Minutes copied to clipboard.",
    COPY_MOM_EMPTY: "No minutes available to copy yet.",
    PROCESSING_TITLE: "Processing transcript…",
    PROCESSING_BODY:
      "AI is generating the minutes, action items, and decisions. This updates automatically.",
    FAILED_TITLE: "Processing failed",
    FAILED_BODY:
      "We couldn't process this transcript. Try reprocessing the meeting.",
  },
  TABS: {
    MINUTES: "Minutes of Meeting",
    ACTION_ITEMS: "Action Items",
    DECISIONS: "Decisions",
  },
  MINUTES: {
    ATTENDEES_TITLE: "Attendees",
    EMPTY: "Minutes of meeting will appear here once processing completes.",
  },
  ACTION_ITEMS: {
    OWNER_PREFIX: "Owner:",
    DUE_PREFIX: "Due:",
    LINK_TO_TASK: "Link to Task",
    DONE: "✓ Done",
    TOGGLE_ARIA: "Toggle action item",
    EMPTY: "No action items extracted yet.",
  },
  DECISIONS: {
    DECIDED_BY_PREFIX: "Decision by:",
    APPROVED_BY_PREFIX: "Approved by:",
    RATIONALE_PREFIX: "Rationale:",
    SEPARATOR: " · ",
    EMPTY: "No decisions extracted yet.",
  },
  PRIORITY: {
    CRITICAL: "Critical",
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  },
  STATE: {
    LOADING: "Loading meetings…",
    ERROR: "Failed to load meetings.",
    EMPTY_TITLE: "No meetings yet",
    EMPTY_BODY: "Process a transcript to create your first meeting record.",
    AWAITING_PROCESSING: "Awaiting processing",
  },
  STATUS: {
    COMPLETED: "Done",
    PENDING: "Pending",
    PROCESSING: "Processing",
    FAILED: "Failed",
  },
  DYNAMIC: {
    ACTION_ITEMS_COUNT: (count: number) =>
      `${count} action item${count === 1 ? "" : "s"}`,
  },
  NEW: {
    TITLE: "Process New Transcript",
    SUBTITLE:
      "Paste your meeting transcript and AI will extract MOM, action items, and decisions.",
    TITLE_PLACEHOLDER: "Meeting title (e.g. Sprint 4 Planning)",
    TRANSCRIPT_PLACEHOLDER: "Paste raw transcript here…",
    VALIDATION: {
      TITLE_REQUIRED: "Meeting title is required.",
      TITLE_MAX: "Meeting title must be at most 255 characters.",
      TRANSCRIPT_REQUIRED: "Transcript is required.",
    },
  },
  PROCESSING: {
    TITLE: "AI Processing Transcript…",
    SUBTITLE: "Extracting action items, decisions, and generating MOM",
  },
} as const;
