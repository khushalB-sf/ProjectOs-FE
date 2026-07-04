/** UI copy for the Proposal module. All user-visible strings live here. */
export const PROPOSAL_LABELS = {
  API: {
    GENERATE_SUCCESS: "Proposal generation started.",
    GENERATE_ERROR: "Failed to start proposal generation.",
    UPDATE_SUCCESS: "Proposal updated successfully.",
    UPDATE_ERROR: "Failed to update proposal.",
  },
  HEADER: {
    GENERATED_BADGE: "Generated Jun 22, 2026",
    REVISION_META: "v1.2 — reviewed by Alex",
    EDIT: "Edit Proposal",
    EXPORT: "Export PDF",
  },
  DOCUMENT: {
    EYEBROW: "Technical Proposal",
    TITLE: "TechFlow Smart Logistics Platform",
    SUBTITLE: "Prepared by Simform Solutions · June 22, 2026",
  },
  EXECUTIVE_SUMMARY: {
    TITLE: "Executive Summary",
    PARAGRAPH_ONE:
      "TechFlow Logistics operates a fleet of 450 vehicles supporting B2B and B2C last-mile delivery across 12 metropolitan areas, generating $45M in annual revenue. The current manual dispatch system is a bottleneck — average route planning takes 45 minutes per dispatcher shift, and the lack of real-time visibility leads to a 12% on-time delivery failure rate.",
    PARAGRAPH_TWO:
      "Simform proposes a cloud-native logistics platform featuring AI-powered route optimization, real-time GPS tracking, a driver mobile app, and a business intelligence dashboard. The solution will reduce route planning time by 80% and improve on-time delivery to above 96%.",
  },
  ARCHITECTURE: {
    TITLE: "Proposed Architecture",
  },
  TECH_STACK: {
    TITLE: "Recommended Technology Stack",
  },
  COST_ESTIMATE: {
    TITLE: "Effort & Cost Estimate",
    COLUMN_ROLE: "Role",
    COLUMN_PEOPLE: "People",
    COLUMN_DAYS: "Days",
    COLUMN_RATE: "Rate / Day",
    COLUMN_TOTAL: "Total",
    TOTAL_ROW_LABEL: "Total Engagement Cost",
    TOTAL_ROW_VALUE: "$485,000",
    FOOTNOTE:
      "* Includes 10% buffer for scope changes. AWS infrastructure costs estimated separately at $8–12K/month.",
  },
} as const;
