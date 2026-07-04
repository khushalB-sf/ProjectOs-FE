import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type { ProposalResponse, ProposalUpdate } from "@/types/proposal";

export const proposalApi = {
  generateProposal: (projectId: string): Promise<unknown> =>
    api
      .post<unknown>(ENDPOINTS.PROPOSAL.GENERATE(projectId))
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
