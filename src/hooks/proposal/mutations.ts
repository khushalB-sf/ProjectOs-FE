import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { proposalApi } from "@/services/proposal/proposalApi";
import { LABELS } from "@/constants/labels";
import { PROPOSAL_QUERY_KEYS } from "@/constants/queryKeys";
import { getErrorMessage } from "@/lib/utils";

import type { ProposalUpdate } from "@/types/proposal";

/** Triggers async AI proposal generation; poll task status separately. */
export function useGenerateProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => proposalApi.generateProposal(projectId),
    onSuccess: (_result, projectId) => {
      void queryClient.invalidateQueries({
        queryKey: PROPOSAL_QUERY_KEYS.DETAIL(projectId),
      });
      toast.success(LABELS.PROPOSAL.API.GENERATE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.PROPOSAL.API.GENERATE_ERROR));
    },
  });
}

export function useUpdateProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: ProposalUpdate;
    }) => proposalApi.updateProposal(projectId, data),
    onSuccess: (_result, { projectId }) => {
      void queryClient.invalidateQueries({
        queryKey: PROPOSAL_QUERY_KEYS.DETAIL(projectId),
      });
      toast.success(LABELS.PROPOSAL.API.UPDATE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.PROPOSAL.API.UPDATE_ERROR));
    },
  });
}
