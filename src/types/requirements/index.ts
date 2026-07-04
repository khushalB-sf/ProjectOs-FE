import type { StatusTone } from "@/types/common";

/* -------------------------------------------------------------------------- */
/* API contract (server wire shapes — snake_case, bare responses)             */
/* -------------------------------------------------------------------------- */

/** Requirement classification (e.g. "functional" | "non_functional"). */
export type RequirementType = string;

/** A requirement as returned by `GET /projects/{id}/requirements`. */
export interface RequirementResponse {
  id: string;
  type: RequirementType;
  title: string;
  description: string;
  priority: string;
  status: string;
}

/** Body for updating a requirement (`PUT /requirements/{id}`). */
export interface RequirementUpdate {
  title?: string | null;
  description?: string | null;
  priority?: string | null;
  status?: string | null;
  type?: string | null;
}

/** A user story as returned by `GET /projects/{id}/stories`. */
export interface UserStoryResponse {
  id: string;
  epic: string;
  feature: string;
  story: string;
  acceptance_criteria: string;
  story_points: number;
  priority: string;
  status: string;
}

/** Body for updating a user story (`PUT /stories/{id}`). */
export interface UserStoryUpdate {
  story?: string | null;
  acceptance_criteria?: string | null;
  story_points?: number | null;
  priority?: string | null;
  status?: string | null;
  epic?: string | null;
  feature?: string | null;
}

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
