import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { LABELS } from "@/constants/labels";
import { PROPOSAL_QUERY_KEYS } from "@/constants/queryKeys";

import { useGenerateProposal } from "./mutations";
import { useProposalTask } from "./queries";

interface UseProposalGenerationResult {
  /** Kicks off async generation for the given project. */
  generate: () => void;
  /** True while the job is being triggered or its task is still running. */
  isGenerating: boolean;
}

/**
 * Orchestrates async proposal generation: triggers the job, polls its task
 * (`GET /tasks/{id}`), and — only once the task reports `completed` — refetches
 * the proposal via `invalidateQueries`. Toasts on completion / failure. The
 * per-task ref guards the effect so it notifies once per generation.
 */
export function useProposalGeneration(
  projectId: string,
): UseProposalGenerationResult {
  const queryClient = useQueryClient();
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const generateProposal = useGenerateProposal();

  const { data: task } = useProposalTask(taskId, Boolean(taskId));
  const isSettled = task?.status === "completed" || task?.status === "failed";
  const isPolling = Boolean(taskId) && !isSettled;

  const notifiedTaskIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!task || !isSettled) return;
    if (notifiedTaskIdRef.current === task.task_id) return;
    notifiedTaskIdRef.current = task.task_id;

    if (task.status === "completed") {
      void queryClient.invalidateQueries({
        queryKey: PROPOSAL_QUERY_KEYS.DETAIL(projectId),
      });
      toast.success(LABELS.PROPOSAL.API.GENERATE_COMPLETE);
    } else {
      toast.error(task.error ?? LABELS.PROPOSAL.API.GENERATE_FAILED);
    }
  }, [task, isSettled, projectId, queryClient]);

  const generate = () => {
    generateProposal.mutate(projectId, {
      onSuccess: (result) => setTaskId(result.task_id),
    });
  };

  return {
    generate,
    isGenerating: generateProposal.isPending || isPolling,
  };
}
