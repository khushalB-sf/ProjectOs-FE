/** Priority / severity levels shared across modules. */
export type Priority = "low" | "medium" | "high" | "critical";

/** Generic status label used by status pills. */
export type StatusTone =
  "low" | "medium" | "high" | "critical" | "info" | "neutral";

export type SortOrder = "asc" | "desc";

/** Standard envelope every API response is wrapped in. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
}
