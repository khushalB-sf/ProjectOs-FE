import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { riskApi } from "@/services/risk/riskApi";
import { LABELS } from "@/constants/labels";
import { RISK_QUERY_KEYS } from "@/constants/queryKeys";
import { getErrorMessage } from "@/lib/utils";

/** Triggers async risk recomputation; poll task status separately. */
export function useComputeRisk(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => riskApi.computeRisk(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: RISK_QUERY_KEYS.LATEST(projectId),
      });
      void queryClient.invalidateQueries({
        queryKey: RISK_QUERY_KEYS.HISTORY(projectId),
      });
      toast.success(LABELS.RISK.API.COMPUTE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.RISK.API.COMPUTE_ERROR));
    },
  });
}
