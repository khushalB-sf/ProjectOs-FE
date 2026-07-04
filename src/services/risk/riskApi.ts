import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type { RiskHistoryResponse, RiskSnapshotResponse } from "@/types/risk";

export const riskApi = {
  computeRisk: (projectId: string): Promise<unknown> =>
    api.post<unknown>(ENDPOINTS.RISK.COMPUTE(projectId)).then((r) => r.data),

  getLatestRisk: (projectId: string): Promise<RiskSnapshotResponse> =>
    api
      .get<RiskSnapshotResponse>(ENDPOINTS.RISK.LATEST(projectId))
      .then((r) => r.data),

  getRiskHistory: (projectId: string): Promise<RiskHistoryResponse> =>
    api
      .get<RiskHistoryResponse>(ENDPOINTS.RISK.HISTORY(projectId))
      .then((r) => r.data),
};
