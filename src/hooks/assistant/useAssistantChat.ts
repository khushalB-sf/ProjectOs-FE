import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { ASSISTANT_CONFIG } from "@/constants/assistant";
import { LABELS } from "@/constants/labels";
import { getErrorMessage } from "@/lib/utils";
import { streamChat } from "@/services/assistant/assistantApi";

import type {
  ChatHistoryItem,
  ChatMessage,
  ChatSource,
} from "@/types/assistant";

const API = LABELS.ASSISTANT.API;

function createId(): string {
  return crypto.randomUUID();
}

/** Maps completed turns to the wire history shape, capped to the most recent ones. */
function toHistory(messages: ChatMessage[]): ChatHistoryItem[] {
  return messages
    .filter((message) => message.content && !message.streaming)
    .slice(-ASSISTANT_CONFIG.MAX_HISTORY_TURNS)
    .map((message) => ({ role: message.role, content: message.content }));
}

/**
 * Owns the assistant conversation state and drives the SSE request. Exposes the
 * message list plus `sendMessage`, `stop`, and `reset`. Sources land on the
 * assistant turn first; streamed tokens are then appended in place.
 */
export function useAssistantChat(projectId: string | undefined) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const patchMessage = useCallback(
    (id: string, patch: (message: ChatMessage) => ChatMessage) => {
      setMessages((prev) =>
        prev.map((message) => (message.id === id ? patch(message) : message)),
      );
    },
    [],
  );

  const finalize = useCallback(
    (id: string, error?: string) => {
      patchMessage(id, (message) => ({
        ...message,
        streaming: false,
        content: message.content || error || API.EMPTY_RESPONSE,
      }));
    },
    [patchMessage],
  );

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isStreaming || !projectId) return;

      const history = toHistory(messages);
      const assistantId = createId();
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "user", content: text },
        { id: assistantId, role: "assistant", content: "", streaming: true },
      ]);

      const controller = new AbortController();
      abortRef.current = controller;
      setIsStreaming(true);

      try {
        await streamChat({
          projectId,
          request: {
            message: text,
            history,
            doc_types: ASSISTANT_CONFIG.DEFAULT_DOC_TYPES,
            top_k: ASSISTANT_CONFIG.DEFAULT_TOP_K,
          },
          handlers: {
            onSources: (sources: ChatSource[]) =>
              patchMessage(assistantId, (message) => ({ ...message, sources })),
            onToken: (delta) =>
              patchMessage(assistantId, (message) => ({
                ...message,
                content: message.content + delta,
              })),
          },
          fallbackError: API.ERROR,
          signal: controller.signal,
        });
        finalize(assistantId);
      } catch (error) {
        if (controller.signal.aborted) {
          finalize(assistantId);
          return;
        }
        const detail = getErrorMessage(error as Error, API.ERROR);
        toast.error(detail);
        finalize(assistantId, detail);
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [finalize, isStreaming, messages, patchMessage, projectId],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
  }, []);

  return { messages, isStreaming, sendMessage, stop, reset };
}
