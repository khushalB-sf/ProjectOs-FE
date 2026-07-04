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
