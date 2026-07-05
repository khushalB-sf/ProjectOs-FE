import { useQuery } from "@tanstack/react-query";

import { requirementsApi } from "@/services/requirements/requirementsApi";
import { REQUIREMENTS_QUERY_KEYS } from "@/constants/queryKeys";
import { pollWhileAnyStatusPending } from "@/lib/query-polling";

const TASK_POLL_INTERVAL_MS = 4_000;

export function useDocuments(projectId?: string) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.DOCUMENTS(projectId ?? ""),
    queryFn: () => requirementsApi.getDocuments(projectId!),
    enabled: Boolean(projectId),
    refetchInterval: pollWhileAnyStatusPending,
  });
}

/**
 * Fetches the clarification questions for a document. Enable it only once the
 * document-analysis task has completed (i.e. `status: awaiting_clarification`).
 */
export function useClarifications(
  projectId?: string,
  documentId?: string,
  enabled = true,
) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.CLARIFICATIONS(
      projectId ?? "",
      documentId ?? "",
    ),
    queryFn: () => requirementsApi.getClarifications(projectId!, documentId!),
    enabled: Boolean(projectId) && Boolean(documentId) && enabled,
  });
}

/**
 * Polls `GET /tasks/{task_id}` for an async document task, refetching every 4s
 * until it settles. Declarative (query, not mutation) so it survives StrictMode
 * remounts — the caller derives UI state from `data.status`.
 */
export function useTaskStatus(taskId?: string, enabled = true) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.TASK_STATUS(taskId ?? ""),
    queryFn: () => requirementsApi.getTaskStatus(taskId!),
    enabled: Boolean(taskId) && enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "completed" || status === "failed"
        ? false
        : TASK_POLL_INTERVAL_MS;
    },
  });
}

export function useRequirements(projectId?: string, type?: string) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.LIST(projectId ?? "", type),
    queryFn: () => requirementsApi.getRequirements(projectId!, type),
    enabled: Boolean(projectId),
  });
}

export function useStories(projectId?: string) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.STORIES(projectId ?? ""),
    queryFn: () => requirementsApi.getStories(projectId!),
    enabled: Boolean(projectId),
  });
}
