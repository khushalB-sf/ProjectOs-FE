/**
 * Client-side route paths. Never hardcode a path in a component — reference
 * ROUTES.* so the single source of truth lives here.
 */
export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REQUIREMENTS: "/requirements",
  PROPOSAL: "/proposal",
  PLANNER: "/planner",
  MEETINGS: "/meetings",
  RISK: "/risk",
  RESOURCES: "/resources",
} as const;

export const STORAGE_KEYS = {
  IS_AUTHENTICATED: "projectos.isAuthenticated",
} as const;
