import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  CreateProjectDto,
  Project,
  ProjectDashboard,
  UpdateProjectDto,
} from "@/types/projects";
import type { ApiResponse } from "@/types/common";

export const projectsApi = {
  getProjects: (): Promise<Project[]> =>
    api
      .get<ApiResponse<Project[]>>(ENDPOINTS.PROJECTS.LIST)
      .then((r) => r.data.data),

  getProject: (projectId: string): Promise<Project> =>
    api
      .get<ApiResponse<Project>>(ENDPOINTS.PROJECTS.DETAIL(projectId))
      .then((r) => r.data.data),

  createProject: (data: CreateProjectDto): Promise<Project> =>
    api
      .post<ApiResponse<Project>>(ENDPOINTS.PROJECTS.LIST, data)
      .then((r) => r.data.data),

  updateProject: (
    projectId: string,
    data: UpdateProjectDto,
  ): Promise<Project> =>
    api
      .put<ApiResponse<Project>>(ENDPOINTS.PROJECTS.DETAIL(projectId), data)
      .then((r) => r.data.data),

  getDashboard: (projectId: string): Promise<ProjectDashboard> =>
    api
      .get<ApiResponse<ProjectDashboard>>(
        ENDPOINTS.PROJECTS.DASHBOARD(projectId),
      )
      .then((r) => r.data.data),
};
