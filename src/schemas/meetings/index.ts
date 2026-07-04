import { z } from "zod";

import { LABELS } from "@/constants/labels";

const VALIDATION = LABELS.MEETINGS.NEW.VALIDATION;

export const meetingCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, VALIDATION.TITLE_REQUIRED)
    .max(255, VALIDATION.TITLE_MAX),
  raw_transcript: z.string().trim().min(1, VALIDATION.TRANSCRIPT_REQUIRED),
});

export type MeetingCreateFormValues = z.infer<typeof meetingCreateSchema>;
