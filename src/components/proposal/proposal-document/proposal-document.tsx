import { ArchitectureOverview } from "@/components/proposal/architecture-overview/architecture-overview";
import { CostBreakdownSection } from "@/components/proposal/cost-breakdown-section/cost-breakdown-section";
import { RiskSection } from "@/components/proposal/risk-section/risk-section";
import { TeamCompositionGrid } from "@/components/proposal/team-composition-grid/team-composition-grid";
import { TimelineSection } from "@/components/proposal/timeline-section/timeline-section";
import { Card } from "@/components/ui/card";
import { LABELS } from "@/constants/labels";

import type { Proposal } from "@/types/proposal";

const {
  DOCUMENT,
  EXECUTIVE_SUMMARY,
  TECHNICAL_APPROACH,
  ARCHITECTURE,
  TEAM_COMPOSITION,
  TIMELINE,
  COST_BREAKDOWN,
  RISKS,
} = LABELS.PROPOSAL;

const sectionTitleClass =
  "mb-3 text-sm font-semibold tracking-wider text-slate-500 uppercase";

interface ProposalDocumentProps {
  proposal: Proposal;
  projectName?: string;
}

/** The full proposal document card, rendered from the generated proposal data. */
function ProposalDocument({ proposal, projectName }: ProposalDocumentProps) {
  return (
    <Card className="p-8">
      <header className="mb-6 border-b border-slate-200 pb-6 text-center">
        <p className="text-xs tracking-widest text-slate-400 uppercase">
          {DOCUMENT.EYEBROW}
        </p>
        {projectName && (
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {projectName}
          </h2>
        )}
        <p className="mt-1 text-sm text-slate-500">
          {DOCUMENT.SUBTITLE_PREPARED_BY}
        </p>
      </header>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{EXECUTIVE_SUMMARY.TITLE}</h3>
        {proposal.executiveSummaryParagraphs.length > 0 ? (
          proposal.executiveSummaryParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "leading-relaxed text-slate-700"
                  : "mt-3 leading-relaxed text-slate-700"
              }
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-sm text-slate-500">{EXECUTIVE_SUMMARY.EMPTY}</p>
        )}
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{TECHNICAL_APPROACH.TITLE}</h3>
        {proposal.technicalApproachParagraphs.length > 0 ? (
          proposal.technicalApproachParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "leading-relaxed text-slate-700"
                  : "mt-3 leading-relaxed text-slate-700"
              }
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-sm text-slate-500">{TECHNICAL_APPROACH.EMPTY}</p>
        )}
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{ARCHITECTURE.TITLE}</h3>
        <ArchitectureOverview architecture={proposal.architecture} />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{TEAM_COMPOSITION.TITLE}</h3>
        <TeamCompositionGrid team={proposal.teamComposition} />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{TIMELINE.TITLE}</h3>
        <TimelineSection phases={proposal.timeline} />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{COST_BREAKDOWN.TITLE}</h3>
        <CostBreakdownSection
          entries={proposal.costBreakdown}
          totalCostLabel={proposal.totalCostLabel}
          totalDaysLabel={proposal.totalDaysLabel}
        />
      </section>

      <section>
        <h3 className={sectionTitleClass}>{RISKS.TITLE}</h3>
        <RiskSection risks={proposal.risks} />
      </section>
    </Card>
  );
}

export { ProposalDocument };
