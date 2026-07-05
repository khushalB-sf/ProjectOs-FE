import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  ProposalGenerationTask,
  ProposalResponse,
  ProposalTaskStatus,
  ProposalUpdate,
} from "@/types/proposal";

export const proposalApi = {
  generateProposal: (projectId: string): Promise<ProposalGenerationTask> =>
    api
      .post<ProposalGenerationTask>(ENDPOINTS.PROPOSAL.GENERATE(projectId))
      .then((r) => r.data),

  getTaskStatus: (taskId: string): Promise<ProposalTaskStatus> =>
    api
      .get<ProposalTaskStatus>(ENDPOINTS.PROPOSAL.TASK_STATUS(taskId))
      .then((r) => r.data),

  getProposal: (projectId: string): Promise<ProposalResponse> =>
    api
      .get<ProposalResponse>(ENDPOINTS.PROPOSAL.DETAIL(projectId))
      .then((r) => r.data),

  updateProposal: (
    projectId: string,
    data: ProposalUpdate,
  ): Promise<ProposalResponse> =>
    api
      .put<ProposalResponse>(ENDPOINTS.PROPOSAL.DETAIL(projectId), data)
      .then((r) => r.data),
};
