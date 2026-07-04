import api from "@/services/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  CreateMeetingDto,
  MeetingResponse,
  MeetingUpdate,
} from "@/types/meetings";

export const meetingsApi = {
  getMeetings: (projectId: string): Promise<MeetingResponse[]> =>
    api
      .get<MeetingResponse[]>(ENDPOINTS.MEETINGS.LIST(projectId))
      .then((r) => r.data),

  getMeeting: (meetingId: string): Promise<MeetingResponse> =>
    api
      .get<MeetingResponse>(ENDPOINTS.MEETINGS.DETAIL(meetingId))
      .then((r) => r.data),

  createMeeting: (
    projectId: string,
    data: CreateMeetingDto,
  ): Promise<MeetingResponse> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.meeting_date) formData.append("meeting_date", data.meeting_date);
    if (data.raw_transcript)
      formData.append("raw_transcript", data.raw_transcript);
    if (data.transcript_file)
      formData.append("transcript_file", data.transcript_file);
    return api
      .post<MeetingResponse>(ENDPOINTS.MEETINGS.LIST(projectId), formData)
      .then((r) => r.data);
  },

  updateMeeting: (
    meetingId: string,
    data: MeetingUpdate,
  ): Promise<MeetingResponse> =>
    api
      .put<MeetingResponse>(ENDPOINTS.MEETINGS.DETAIL(meetingId), data)
      .then((r) => r.data),

  reprocessMeeting: (meetingId: string): Promise<unknown> =>
    api
      .post<unknown>(ENDPOINTS.MEETINGS.PROCESS(meetingId))
      .then((r) => r.data),
};
