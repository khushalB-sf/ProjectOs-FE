import * as React from "react";

import { AuthContext, type AuthContextValue } from "./AuthContext";

/** Access the auth context. Throws if used outside AuthProvider. */
function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth };
