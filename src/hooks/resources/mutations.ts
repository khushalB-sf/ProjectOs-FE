import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { resourcesApi } from "@/services/resources/resourcesApi";
import { LABELS } from "@/constants/labels";
import { getErrorMessage } from "@/lib/utils";

/** Triggers AI team suggestion for a project. */
export function useSuggestTeam() {
  return useMutation({
    mutationFn: (projectId: string) => resourcesApi.suggestTeam(projectId),
    onSuccess: () => {
      toast.success(LABELS.RESOURCES.API.SUGGEST_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.RESOURCES.API.SUGGEST_ERROR));
    },
  });
}
