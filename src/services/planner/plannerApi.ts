import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  SprintCreate,
  SprintResponse,
  TaskCreate,
  TaskResponse,
  TaskStatus,
  TaskUpdate,
} from "@/types/planner";

export const plannerApi = {
  /* Sprints */
  getSprints: (projectId: string): Promise<SprintResponse[]> =>
    api
      .get<SprintResponse[]>(ENDPOINTS.PLANNER.SPRINTS(projectId))
      .then((r) => r.data),

  createSprint: (
    projectId: string,
    data: SprintCreate,
  ): Promise<SprintResponse> =>
    api
      .post<SprintResponse>(ENDPOINTS.PLANNER.SPRINTS(projectId), data)
      .then((r) => r.data),

  generateSprints: (projectId: string): Promise<unknown> =>
    api
      .post<unknown>(ENDPOINTS.PLANNER.GENERATE_SPRINTS(projectId))
      .then((r) => r.data),

  /* Tasks */
  getTasks: (projectId: string, sprintId?: string): Promise<TaskResponse[]> =>
    api
      .get<TaskResponse[]>(ENDPOINTS.PLANNER.TASKS(projectId), {
        params: sprintId ? { sprint_id: sprintId } : undefined,
      })
      .then((r) => r.data),

  createTask: (projectId: string, data: TaskCreate): Promise<TaskResponse> =>
    api
      .post<TaskResponse>(ENDPOINTS.PLANNER.TASKS(projectId), data)
      .then((r) => r.data),

  updateTask: (taskId: string, data: TaskUpdate): Promise<TaskResponse> =>
    api
      .put<TaskResponse>(ENDPOINTS.PLANNER.TASK_DETAIL(taskId), data)
      .then((r) => r.data),

  /** Poll an async AI task by id (`GET /tasks/{task_id}`). */
  getTaskStatus: (taskId: string): Promise<TaskStatus> =>
    api
      .get<TaskStatus>(ENDPOINTS.PLANNER.TASK_DETAIL(taskId))
      .then((r) => r.data),
};
