import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { proposalApi } from "@/services/proposal/proposalApi";
import { PROPOSAL_QUERY_KEYS } from "@/constants/queryKeys";

/**
 * 4xx responses (e.g. 404 "no proposal generated yet" / "project not found") are
 * terminal — retrying the same request won't change the outcome. Only retry once
 * for network/server errors, which may be transient.
 */
function shouldRetry(failureCount: number, error: Error): boolean {
  if (isAxiosError(error) && error.response && error.response.status < 500) {
    return false;
  }
  return failureCount < 1;
}

/**
 * The sidebar keeps a `useProposal` observer mounted app-wide, so by the time a
 * user navigates to `/proposal` the query is already cached. `refetchOnMount:
 * false` reuses that cache instead of re-fetching on every visit — including
 * when the cached result is an error (e.g. "no proposal yet"), which React
 * Query otherwise always treats as stale on mount. Explicit refetches (e.g.
 * `invalidateQueries` after generating) are unaffected.
 */
export function useProposal(projectId?: string) {
  return useQuery({
    queryKey: PROPOSAL_QUERY_KEYS.DETAIL(projectId ?? ""),
    queryFn: () => proposalApi.getProposal(projectId!),
    enabled: Boolean(projectId),
    retry: shouldRetry,
    refetchOnMount: false,
  });
}
