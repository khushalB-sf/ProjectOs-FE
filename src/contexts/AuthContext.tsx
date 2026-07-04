import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { setUnauthorizedHandler } from "@/services/api";
import { tokenStorage } from "@/lib/token-storage";

import type { AuthTokens } from "@/types/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

/**
 * AuthProvider — persists Bearer tokens via tokenStorage and registers the 401
 * handler that the Axios instance calls to force a logout.
 */
function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() =>
    Boolean(tokenStorage.getAccessToken()),
  );

  const logout = React.useCallback(() => {
    tokenStorage.clear();
    setIsAuthenticated(false);
    queryClient.clear();
  }, [queryClient]);

  const login = React.useCallback((tokens: AuthTokens) => {
    tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
    setIsAuthenticated(true);
  }, []);

  React.useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  const value = React.useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
export type { AuthContextValue };
