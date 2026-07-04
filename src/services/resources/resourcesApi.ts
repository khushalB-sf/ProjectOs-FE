import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

/**
 * The resources endpoints return unstructured payloads in the OpenAPI spec,
 * so responses are typed as `unknown` until a concrete contract is published.
 */
export const resourcesApi = {
  getTeam: (): Promise<unknown> =>
    api.get<unknown>(ENDPOINTS.RESOURCES.TEAM).then((r) => r.data),

  getUtilization: (): Promise<unknown> =>
    api.get<unknown>(ENDPOINTS.RESOURCES.UTILIZATION).then((r) => r.data),

  suggestTeam: (projectId: string): Promise<unknown> =>
    api
      .post<unknown>(ENDPOINTS.RESOURCES.SUGGEST(projectId))
      .then((r) => r.data),
};
