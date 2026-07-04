import { useQuery } from "@tanstack/react-query";

import { requirementsApi } from "@/services/requirements/requirementsApi";
import { REQUIREMENTS_QUERY_KEYS } from "@/constants/queryKeys";

export function useDocuments(projectId?: string) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.DOCUMENTS(projectId ?? ""),
    queryFn: () => requirementsApi.getDocuments(projectId!),
    enabled: Boolean(projectId),
  });
}

export function useRequirements(projectId?: string, type?: string) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.LIST(projectId ?? "", type),
    queryFn: () => requirementsApi.getRequirements(projectId!, type),
    enabled: Boolean(projectId),
  });
}

export function useStories(projectId?: string) {
  return useQuery({
    queryKey: REQUIREMENTS_QUERY_KEYS.STORIES(projectId ?? ""),
    queryFn: () => requirementsApi.getStories(projectId!),
    enabled: Boolean(projectId),
  });
}
