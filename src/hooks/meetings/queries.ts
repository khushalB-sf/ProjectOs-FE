import { useQuery } from "@tanstack/react-query";

import { meetingsApi } from "@/services/meetings/meetingsApi";
import { MEETINGS_QUERY_KEYS } from "@/constants/queryKeys";

export function useMeetings(projectId?: string) {
  return useQuery({
    queryKey: MEETINGS_QUERY_KEYS.LIST(projectId ?? ""),
    queryFn: () => meetingsApi.getMeetings(projectId!),
    enabled: Boolean(projectId),
  });
}

export function useMeeting(meetingId?: string) {
  return useQuery({
    queryKey: MEETINGS_QUERY_KEYS.DETAIL(meetingId ?? ""),
    queryFn: () => meetingsApi.getMeeting(meetingId!),
    enabled: Boolean(meetingId),
  });
}
