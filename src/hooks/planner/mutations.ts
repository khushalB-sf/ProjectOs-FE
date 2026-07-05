import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { plannerApi } from "@/services/planner/plannerApi";
import { LABELS } from "@/constants/labels";
import { PLANNER_QUERY_KEYS } from "@/constants/queryKeys";
import { getErrorMessage } from "@/lib/utils";

import type { SprintCreate, TaskCreate, TaskUpdate } from "@/types/planner";

export function useCreateSprint(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SprintCreate) =>
      plannerApi.createSprint(projectId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PLANNER_QUERY_KEYS.SPRINTS(projectId),
      });
      toast.success(LABELS.PLANNER.API.CREATE_SPRINT_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(
        getErrorMessage(error, LABELS.PLANNER.API.CREATE_SPRINT_ERROR),
      );
    },
  });
}

export function useGenerateSprints(projectId: string) {
  return useMutation({
    mutationFn: () => plannerApi.generateSprints(projectId),
    onError: (error: Error) => {
      toast.error(
        getErrorMessage(error, LABELS.PLANNER.API.GENERATE_SPRINTS_ERROR),
      );
    },
  });
}

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskCreate) => plannerApi.createTask(projectId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PLANNER_QUERY_KEYS.TASKS(projectId),
      });
      toast.success(LABELS.PLANNER.API.CREATE_TASK_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.PLANNER.API.CREATE_TASK_ERROR));
    },
  });
}

export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: TaskUpdate }) =>
      plannerApi.updateTask(taskId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PLANNER_QUERY_KEYS.TASKS(projectId),
      });
      toast.success(LABELS.PLANNER.API.UPDATE_TASK_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.PLANNER.API.UPDATE_TASK_ERROR));
    },
  });
}
