/** Centralised environment/config access — never read import.meta.env elsewhere. */
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  IS_DEV: import.meta.env.DEV,
} as const;
