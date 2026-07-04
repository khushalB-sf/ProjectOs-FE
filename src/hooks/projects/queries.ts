import { useQuery } from "@tanstack/react-query";

import { projectsApi } from "@/services/projects/projectsApi";
import { STALE_TIME } from "@/constants/common";
import { PROJECTS_QUERY_KEYS } from "@/constants/queryKeys";

export function useProjects(enabled = true) {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEYS.LIST,
    queryFn: projectsApi.getProjects,
    enabled,
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
}

export function useProject(projectId?: string) {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEYS.DETAIL(projectId ?? ""),
    queryFn: () => projectsApi.getProject(projectId!),
    enabled: Boolean(projectId),
  });
}

export function useProjectDashboard(projectId?: string) {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEYS.DASHBOARD(projectId ?? ""),
    queryFn: () => projectsApi.getDashboard(projectId!),
    enabled: Boolean(projectId),
  });
}
