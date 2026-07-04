import type { StatusTone } from "@/types/common";

/** Document file classification tile colour. */
export type DocumentTileTone = "red" | "blue" | "slate";

/** Processing lifecycle for an uploaded requirement document. */
export type DocumentStatus = "processed" | "processing";

/** A single uploaded requirement source document. */
export type RequirementDocument = {
  id: string;
  tileLabel: string;
  tileTone: DocumentTileTone;
  fileName: string;
  fileSize: string;
  type: string;
  uploadedAt: string;
  status: DocumentStatus;
  statusTone: StatusTone;
  statusLabel: string;
  actionLabel: string;
  actionDisabled: boolean;
};

/** A functional requirement extracted from the source documents. */
export type FunctionalRequirement = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  priorityTone: StatusTone;
  priorityLabel: string;
};

/** A non-functional requirement (performance, availability, etc.). */
export type NonFunctionalRequirement = {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  priorityTone: StatusTone;
  priorityLabel: string;
};

/** A single Given/When/Then acceptance-criteria line. */
export type GherkinStep = {
  keyword: string;
  text: string;
};

/** Gherkin-style acceptance criteria for a user story. */
export type Gherkin = {
  given: GherkinStep;
  when: GherkinStep;
  then: GherkinStep;
};

/** A user story with estimation and acceptance criteria. */
export type UserStory = {
  id: string;
  code: string;
  priorityTone: StatusTone;
  priorityLabel: string;
  points: string;
  title: string;
  gherkin: Gherkin;
};

/** Epic tile accent colour. */
export type EpicTone = "indigo" | "orange";

/** A grouping of user stories under a shared theme. */
export type Epic = {
  id: string;
  title: string;
  tone: EpicTone;
  summary: string;
  stories: UserStory[];
  statusTone?: StatusTone;
  statusLabel?: string;
  note?: string;
};
