import type { Priority, StatusTone } from "@/types/common";

/* -------------------------------------------------------------------------- */
/* API DTOs (server response / request shapes)                                */
/* -------------------------------------------------------------------------- */

/** Requirement classification returned by the API. */
export type RequirementType = "functional" | "non_functional";

/** Raw document record as returned by the documents endpoints. */
export type RequirementDocumentDto = {
  id: string;
  filename: string;
  fileType: string;
  sizeBytes?: number;
  sizeLabel?: string;
  uploadedAt: string;
  status: DocumentStatus;
};

/** Raw requirement record returned by the requirements endpoints. */
export type RequirementDto = {
  id: string;
  code: string;
  title: string;
  description: string;
  priority: Priority;
  status: string;
  type: RequirementType;
};

/** Body for updating a single requirement. */
export type UpdateRequirementDto = {
  title: string;
  description: string;
  priority: Priority;
  status: string;
};

/** Raw user-story record returned by the stories endpoint. */
export type UserStoryDto = {
  id: string;
  code?: string;
  title: string;
  storyPoints: number;
  priority: Priority;
  status: string;
  acceptanceCriteria: string;
  epicId?: string;
  epicName?: string;
};

/** Body for updating a single user story (snake_case per API contract). */
export type UpdateUserStoryDto = {
  story_points: number;
  priority: Priority;
  status: string;
  acceptance_criteria: string;
};

/** Document file classification tile colour. */
export type DocumentTileTone = "red" | "blue" | "slate";

/** Processing lifecycle for an uploaded requirement document. */
export type DocumentStatus = "processed" | "processing" | "failed";

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
