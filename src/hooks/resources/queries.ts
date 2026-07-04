import { useQuery } from "@tanstack/react-query";

import { resourcesApi } from "@/services/resources/resourcesApi";
import { RESOURCES_QUERY_KEYS } from "@/constants/queryKeys";

export function useTeam(enabled = true) {
  return useQuery({
    queryKey: RESOURCES_QUERY_KEYS.TEAM,
    queryFn: resourcesApi.getTeam,
    enabled,
  });
}

export function useUtilization(enabled = true) {
  return useQuery({
    queryKey: RESOURCES_QUERY_KEYS.UTILIZATION,
    queryFn: resourcesApi.getUtilization,
    enabled,
  });
}
