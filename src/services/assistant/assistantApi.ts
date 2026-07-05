import { ENDPOINTS } from "@/constants/endpoints";
import { ENV } from "@/lib/env";
import { tokenStorage } from "@/lib/token-storage";

import type {
  ChatSource,
  StreamChatHandlers,
  StreamChatRequest,
} from "@/types/assistant";

/**
 * Streaming chat lives outside the shared Axios instance because browser Axios
 * cannot expose an incremental response body. This is still the sole HTTP layer
 * for the assistant module — components/hooks call through here only.
 *
 * The endpoint speaks Server-Sent Events: one `sources` event, many `token`
 * events, then a `done` (or `error`) event. Because it's a POST with a body we
 * parse the stream manually rather than using the GET-only `EventSource` API.
 */

interface SseEvent {
  event: string;
  data: string;
}

/** Splits an accumulated buffer into complete SSE frames, keeping the remainder. */
function drainEvents(buffer: string): { events: SseEvent[]; rest: string } {
  const normalized = buffer.replace(/\r\n/g, "\n");
  const chunks = normalized.split("\n\n");
  const rest = chunks.pop() ?? "";
  const events = chunks
    .map(parseFrame)
    .filter((event): event is SseEvent => event !== null);
  return { events, rest };
}

/** Parses a single SSE frame into its event name and concatenated data payload. */
function parseFrame(frame: string): SseEvent | null {
  let event = "message";
  const dataLines: string[] = [];
  for (const line of frame.split("\n")) {
    if (!line || line.startsWith(":")) continue;
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data:"))
      dataLines.push(line.slice(5).replace(/^ /, ""));
  }
  if (dataLines.length === 0) return { event, data: "" };
  return { event, data: dataLines.join("\n") };
}

/** Dispatches one parsed frame. Returns true when the stream is complete. */
function handleEvent(
  event: SseEvent,
  handlers: StreamChatHandlers,
  fallbackError: string,
): boolean {
  switch (event.event) {
    case "sources": {
      const payload = JSON.parse(event.data) as { sources?: ChatSource[] };
      handlers.onSources(payload.sources ?? []);
      return false;
    }
    case "token": {
      const payload = JSON.parse(event.data) as { text?: string };
      if (payload.text) handlers.onToken(payload.text);
      return false;
    }
    case "error": {
      const payload = JSON.parse(event.data) as { message?: string };
      throw new Error(payload.message || fallbackError);
    }
    case "done":
      return true;
    default:
      return false;
  }
}

interface StreamChatParams {
  projectId: string;
  request: StreamChatRequest;
  handlers: StreamChatHandlers;
  /** Message used if an `error` event carries no message of its own. */
  fallbackError: string;
  /** Abort signal to cancel an in-flight stream. */
  signal?: AbortSignal;
}

/**
 * POSTs a message to a project's chat stream and invokes `handlers` as SSE
 * events arrive. Resolves when the `done` event is received or the stream
 * closes; rejects on a non-OK status, a network error, or an `error` event.
 */
export async function streamChat({
  projectId,
  request,
  handlers,
  fallbackError,
  signal,
}: StreamChatParams): Promise<void> {
  const accessToken = tokenStorage.getAccessToken();
  const response = await fetch(
    `${ENV.API_BASE_URL}${ENDPOINTS.ASSISTANT.CHAT_STREAM(projectId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(request),
      signal,
    },
  );

  if (!response.ok || !response.body) {
    throw new Error(`Assistant request failed with status ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const { events, rest } = drainEvents(buffer);
    buffer = rest;

    for (const event of events) {
      if (handleEvent(event, handlers, fallbackError)) return;
    }
  }
}
