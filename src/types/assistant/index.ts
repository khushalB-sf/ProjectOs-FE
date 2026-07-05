/** Domain types for the AI Assistant chat feature. */

/* -------------------------------------------------------------------------- */
/* UI view-models                                                             */
/* -------------------------------------------------------------------------- */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  /** Stable client-generated id used as a React key. */
  id: string;
  role: ChatRole;
  content: string;
  /** Citations attached to an assistant turn (arrive before the tokens). */
  sources?: ChatSource[];
  /** True while an assistant message is still receiving streamed tokens. */
  streaming?: boolean;
}

/* -------------------------------------------------------------------------- */
/* API contract (server wire shapes — snake_case, bare payloads)              */
/* -------------------------------------------------------------------------- */

/** A retrieved citation, emitted in the `sources` SSE event before the answer. */
export interface ChatSource {
  doc_id?: string;
  doc_type?: string;
  title?: string;
  snippet?: string;
  score?: number;
  url?: string;
}

/** One prior turn sent back for multi-turn context. */
export interface ChatHistoryItem {
  role: ChatRole;
  content: string;
}

/**
 * Request body for `POST /projects/{id}/chat/stream`. Retrieval is scoped to the
 * project in the path; `doc_types` filters which document kinds are searched.
 */
export interface StreamChatRequest {
  message: string;
  history: ChatHistoryItem[];
  doc_types: string[];
  top_k: number;
}

/** Callbacks invoked by the SSE stream as events arrive, in protocol order. */
export interface StreamChatHandlers {
  /** `sources` event — emitted once before any token. */
  onSources: (sources: ChatSource[]) => void;
  /** `token` event — emitted many times; concatenate text in arrival order. */
  onToken: (text: string) => void;
}
