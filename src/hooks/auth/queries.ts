import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/services/auth/authApi";
import { AUTH_QUERY_KEYS } from "@/constants/queryKeys";

export function useCurrentUser(enabled: boolean) {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.ME,
    queryFn: authApi.getCurrentUser,
    enabled,
  });
}
