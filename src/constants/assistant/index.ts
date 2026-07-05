/** Tunable request defaults for the AI Assistant chat. */
export const ASSISTANT_CONFIG = {
  /**
   * Document kinds the retriever may search. Empty means "no filter" (search
   * all). A future multi-select in the composer will let users pick specific
   * types; that selection replaces this default per-request.
   */
  DEFAULT_DOC_TYPES: [] as string[],
  /** Number of chunks to retrieve for context. */
  DEFAULT_TOP_K: 8,
  /** Cap on prior turns sent as history to keep requests bounded. */
  MAX_HISTORY_TURNS: 10,
} as const;
