import { useQuery } from "@tanstack/react-query";

import { ASSISTANT_QUERY_KEYS } from "@/constants/queryKeys";
import { getChatHistory } from "@/services/assistant/assistantApi";

/**
 * Loads the caller's persisted chat thread for a project. Threads are per user,
 * per project, so the key is scoped by `projectId` — switching the active
 * project loads that project's own conversation.
 */
export function useChatHistory(projectId?: string) {
  return useQuery({
    queryKey: ASSISTANT_QUERY_KEYS.HISTORY(projectId ?? ""),
    queryFn: () => getChatHistory(projectId!),
    enabled: Boolean(projectId),
    // The thread is mutated locally as messages stream in; don't clobber the
    // in-flight conversation with a background refetch.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
