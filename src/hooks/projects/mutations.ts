import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { projectsApi } from "@/services/projects/projectsApi";
import { LABELS } from "@/constants/labels";
import { PROJECTS_QUERY_KEYS } from "@/constants/queryKeys";
import { getErrorMessage } from "@/lib/utils";

import type { CreateProjectDto, UpdateProjectDto } from "@/types/projects";

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectsApi.createProject(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEYS.LIST,
      });
      toast.success(LABELS.PROJECTS.API.CREATE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.PROJECTS.API.CREATE_ERROR));
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: UpdateProjectDto;
    }) => projectsApi.updateProject(projectId, data),
    onSuccess: (_result, { projectId }) => {
      void queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEYS.LIST,
      });
      void queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEYS.DETAIL(projectId),
      });
      toast.success(LABELS.PROJECTS.API.UPDATE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.PROJECTS.API.UPDATE_ERROR));
    },
  });
}
