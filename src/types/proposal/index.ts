/** A single named technology group in the recommended stack (e.g. Frontend). */
export interface TechStackGroup {
  id: string;
  title: string;
  items: string[];
}

/** A single row in the effort & cost estimate table. */
export interface CostRow {
  id: string;
  role: string;
  people: number;
  days: number;
  ratePerDay: string;
  total: string;
}

/** Approval lifecycle state of a proposal document. */
export type ProposalStatus = "draft" | "approved";

/** A generated technical proposal document for a project. */
export interface Proposal {
  id: string;
  projectId: string;
  /** Ordered executive-summary paragraphs. */
  executiveSummary: string[];
  /** ASCII architecture diagram rendered inside the dark code block. */
  architectureDiagram: string;
  techStack: TechStackGroup[];
  costRows: CostRow[];
  totalCost: string;
  status: ProposalStatus;
  version: string;
  generatedAt: string;
  reviewedBy?: string;
}

/** Partial update payload for a proposal (executive summary and/or status). */
export interface UpdateProposalDto {
  executiveSummary?: string[];
  status?: ProposalStatus;
}

/* -------------------------------------------------------------------------- */
/* API contract (server wire shapes — snake_case, bare responses)             */
/* -------------------------------------------------------------------------- */

/** A generated proposal as returned by `GET /projects/{id}/proposal`. */
export interface ProposalResponse {
  id: string;
  project_id: string;
  executive_summary: string | null;
  technical_approach: string | null;
  architecture: Record<string, unknown>;
  team_composition: unknown[];
  timeline: unknown[];
  cost_breakdown: unknown[];
  risks: unknown[];
  total_cost_usd: number | null;
  total_days: number | null;
  status: string;
}

/** Body for updating a proposal (`PUT /projects/{id}/proposal`). */
export interface ProposalUpdate {
  executive_summary?: string | null;
  technical_approach?: string | null;
  architecture?: Record<string, unknown> | null;
  team_composition?: unknown[] | null;
  timeline?: unknown[] | null;
  cost_breakdown?: unknown[] | null;
  risks?: unknown[] | null;
  status?: string | null;
}
