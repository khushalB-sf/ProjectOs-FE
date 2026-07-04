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
