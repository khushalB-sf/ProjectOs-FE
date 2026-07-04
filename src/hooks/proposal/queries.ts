import { useQuery } from "@tanstack/react-query";

import { proposalApi } from "@/services/proposal/proposalApi";
import { PROPOSAL_QUERY_KEYS } from "@/constants/queryKeys";

export function useProposal(projectId?: string) {
  return useQuery({
    queryKey: PROPOSAL_QUERY_KEYS.DETAIL(projectId ?? ""),
    queryFn: () => proposalApi.getProposal(projectId!),
    enabled: Boolean(projectId),
  });
}
