import axios from "axios";

import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  RiskComputeTaskResponse,
  RiskHistoryResponse,
  RiskSnapshotResponse,
  RiskTaskStatusResponse,
} from "@/types/risk";

export const riskApi = {
  computeRisk: (projectId: string): Promise<RiskComputeTaskResponse> =>
    api
      .post<RiskComputeTaskResponse>(ENDPOINTS.RISK.COMPUTE(projectId))
      .then((r) => r.data),

  getTaskStatus: (taskId: string): Promise<RiskTaskStatusResponse> =>
    api
      .get<RiskTaskStatusResponse>(ENDPOINTS.RISK.TASK(taskId))
      .then((r) => r.data),

  /** Returns `null` when no snapshot has been computed yet (404). */
  getLatestRisk: (projectId: string): Promise<RiskSnapshotResponse | null> =>
    api
      .get<RiskSnapshotResponse>(ENDPOINTS.RISK.LATEST(projectId))
      .then((r) => r.data)
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null;
        }
        throw error;
      }),

  getRiskHistory: (projectId: string): Promise<RiskHistoryResponse> =>
    api
      .get<RiskHistoryResponse>(ENDPOINTS.RISK.HISTORY(projectId))
      .then((r) => r.data),
};
