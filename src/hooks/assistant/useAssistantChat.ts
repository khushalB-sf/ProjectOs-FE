import { useCallback, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ASSISTANT_CONFIG } from "@/constants/assistant";
import { LABELS } from "@/constants/labels";
import { ASSISTANT_QUERY_KEYS } from "@/constants/queryKeys";
import { getErrorMessage } from "@/lib/utils";
import {
  clearChatHistory,
  streamChat,
} from "@/services/assistant/assistantApi";
import { useChatHistory } from "@/hooks/assistant/queries";

import {
  toChatMessage,
  type ChatHistoryItem,
  type ChatMessage,
  type ChatSource,
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
 * Owns the assistant conversation for the active project. The persisted thread
 * (`GET /chat/history`) is the base; turns created this session are held in a
 * local overlay and rendered after it. The displayed list is *derived* from the
 * two — no effect syncs server data into local state — so switching projects
 * simply re-derives from that project's cached history. Reset clears the thread
 * server-side (`DELETE /chat/history`).
 */
export function useAssistantChat(projectId: string | undefined) {
  const queryClient = useQueryClient();
  const { data: history, isLoading: isLoadingHistory } =
    useChatHistory(projectId);

  /** Turns added during this session, keyed by project so switching is clean. */
  const [sessionTurns, setSessionTurns] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [isStreaming, setIsStreaming] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const messages = useMemo<ChatMessage[]>(() => {
    const persisted = history?.messages.map(toChatMessage) ?? [];
    const localTurns = projectId ? (sessionTurns[projectId] ?? []) : [];
    return [...persisted, ...localTurns];
  }, [history, projectId, sessionTurns]);

  const setLocalTurns = useCallback(
    (project: string, update: (prev: ChatMessage[]) => ChatMessage[]) => {
      setSessionTurns((prev) => ({
        ...prev,
        [project]: update(prev[project] ?? []),
      }));
    },
    [],
  );

  const patchMessage = useCallback(
    (project: string, id: string, patch: (m: ChatMessage) => ChatMessage) => {
      setLocalTurns(project, (turns) =>
        turns.map((message) => (message.id === id ? patch(message) : message)),
      );
    },
    [setLocalTurns],
  );

  const finalize = useCallback(
    (project: string, id: string, error?: string) => {
      patchMessage(project, id, (message) => ({
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

      const priorHistory = toHistory(messages);
      const assistantId = createId();
      setLocalTurns(projectId, (turns) => [
        ...turns,
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
            history: priorHistory,
            doc_types: ASSISTANT_CONFIG.DEFAULT_DOC_TYPES,
            top_k: ASSISTANT_CONFIG.DEFAULT_TOP_K,
          },
          handlers: {
            onSources: (sources: ChatSource[]) =>
              patchMessage(projectId, assistantId, (message) => ({
                ...message,
                sources,
              })),
            onToken: (delta) =>
              patchMessage(projectId, assistantId, (message) => ({
                ...message,
                content: message.content + delta,
              })),
          },
          fallbackError: API.ERROR,
          signal: controller.signal,
        });
        finalize(projectId, assistantId);
      } catch (error) {
        if (controller.signal.aborted) {
          finalize(projectId, assistantId);
          return;
        }
        const detail = getErrorMessage(error as Error, API.ERROR);
        toast.error(detail);
        finalize(projectId, assistantId, detail);
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [finalize, isStreaming, messages, patchMessage, projectId, setLocalTurns],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(async () => {
    if (!projectId || isClearing) return;
    abortRef.current?.abort();
    setIsClearing(true);
    try {
      await clearChatHistory(projectId);
      setLocalTurns(projectId, () => []);
      queryClient.setQueryData(ASSISTANT_QUERY_KEYS.HISTORY(projectId), {
        project_id: projectId,
        messages: [],
      });
    } catch (error) {
      toast.error(getErrorMessage(error as Error, API.CLEAR_ERROR));
    } finally {
      setIsStreaming(false);
      setIsClearing(false);
    }
  }, [isClearing, projectId, queryClient, setLocalTurns]);

  return {
    messages,
    isStreaming,
    isLoadingHistory,
    isClearing,
    sendMessage,
    stop,
    reset,
  };
}
