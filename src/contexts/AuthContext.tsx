import * as React from "react";

import { STORAGE_KEYS } from "@/constants/routes";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

function readInitialAuth(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === "true";
  } catch {
    return false;
  }
}

/**
 * AuthProvider — lightweight client-only auth for the prototype. Persists an
 * `isAuthenticated` flag in localStorage. No backend call in this pass.
 */
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] =
    React.useState<boolean>(readInitialAuth);

  const login = React.useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, "true");
    setIsAuthenticated(true);
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    setIsAuthenticated(false);
  }, []);

  const value = React.useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
export type { AuthContextValue };
