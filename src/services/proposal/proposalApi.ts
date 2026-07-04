import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type { Proposal, UpdateProposalDto } from "@/types/proposal";
import type { ApiResponse } from "@/types/common";

export const proposalApi = {
  generateProposal: (projectId: string): Promise<Proposal> =>
    api
      .post<ApiResponse<Proposal>>(ENDPOINTS.PROPOSAL.GENERATE(projectId))
      .then((r) => r.data.data),

  getProposal: (projectId: string): Promise<Proposal> =>
    api
      .get<ApiResponse<Proposal>>(ENDPOINTS.PROPOSAL.DETAIL(projectId))
      .then((r) => r.data.data),

  updateProposal: (
    projectId: string,
    data: UpdateProposalDto,
  ): Promise<Proposal> =>
    api
      .put<ApiResponse<Proposal>>(ENDPOINTS.PROPOSAL.DETAIL(projectId), data)
      .then((r) => r.data.data),
};
