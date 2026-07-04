import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";
import { ROUTES } from "@/constants/routes";

/** RequireAuth — redirects unauthenticated users to the login route. */
function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
}

export { RequireAuth };
