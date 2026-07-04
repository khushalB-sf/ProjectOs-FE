import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { meetingsApi } from "@/services/meetings/meetingsApi";
import { LABELS } from "@/constants/labels";
import { MEETINGS_QUERY_KEYS } from "@/constants/queryKeys";
import { getErrorMessage } from "@/lib/utils";

import type { CreateMeetingDto, MeetingUpdate } from "@/types/meetings";

export function useCreateMeeting(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMeetingDto) =>
      meetingsApi.createMeeting(projectId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: MEETINGS_QUERY_KEYS.LIST(projectId),
      });
      toast.success(LABELS.MEETINGS.API.CREATE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.MEETINGS.API.CREATE_ERROR));
    },
  });
}

export function useUpdateMeeting(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      meetingId,
      data,
    }: {
      meetingId: string;
      data: MeetingUpdate;
    }) => meetingsApi.updateMeeting(meetingId, data),
    onSuccess: (_result, { meetingId }) => {
      void queryClient.invalidateQueries({
        queryKey: MEETINGS_QUERY_KEYS.LIST(projectId),
      });
      void queryClient.invalidateQueries({
        queryKey: MEETINGS_QUERY_KEYS.DETAIL(meetingId),
      });
      toast.success(LABELS.MEETINGS.API.UPDATE_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.MEETINGS.API.UPDATE_ERROR));
    },
  });
}

export function useReprocessMeeting(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingId: string) => meetingsApi.reprocessMeeting(meetingId),
    onSuccess: (_result, meetingId) => {
      void queryClient.invalidateQueries({
        queryKey: MEETINGS_QUERY_KEYS.LIST(projectId),
      });
      void queryClient.invalidateQueries({
        queryKey: MEETINGS_QUERY_KEYS.DETAIL(meetingId),
      });
      toast.success(LABELS.MEETINGS.API.REPROCESS_SUCCESS);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error, LABELS.MEETINGS.API.REPROCESS_ERROR));
    },
  });
}
