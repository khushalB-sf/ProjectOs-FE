import * as React from "react";

import { ProjectContext, type ProjectContextValue } from "./ProjectContext";

/** Access the current-project context. Throws if used outside ProjectProvider. */
function useProject(): ProjectContextValue {
  const context = React.useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

export { useProject };
