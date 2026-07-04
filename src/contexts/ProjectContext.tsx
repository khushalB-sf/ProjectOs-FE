import * as React from "react";

import { useProjects } from "@/hooks/projects/queries";
import { useAuth } from "@/contexts/useAuth";

import type { Project } from "@/types/projects";

interface ProjectContextValue {
  currentProject: Project | undefined;
  projectId: string | undefined;
  projects: Project[];
  isLoading: boolean;
}

const ProjectContext = React.createContext<ProjectContextValue | undefined>(
  undefined,
);

/**
 * ProjectContext — fetches the org's projects and exposes the first one as the
 * "current project" for the whole app, since there is no project-switcher UI yet.
 */
function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { data: projects, isLoading } = useProjects(isAuthenticated);

  const currentProject = projects?.[0];

  const value = React.useMemo(
    () => ({
      currentProject,
      projectId: currentProject?.id,
      projects: projects ?? [],
      isLoading,
    }),
    [currentProject, projects, isLoading],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export { ProjectContext, ProjectProvider };
export type { ProjectContextValue };
