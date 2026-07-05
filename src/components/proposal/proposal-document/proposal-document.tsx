import { ArchitectureOverview } from "@/components/proposal/architecture-overview/architecture-overview";
import { CostBreakdownSection } from "@/components/proposal/cost-breakdown-section/cost-breakdown-section";
import { RiskSection } from "@/components/proposal/risk-section/risk-section";
import { TeamCompositionGrid } from "@/components/proposal/team-composition-grid/team-composition-grid";
import { TimelineSection } from "@/components/proposal/timeline-section/timeline-section";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";

import type { Proposal } from "@/types/proposal";
import type { ProposalDraft } from "@/types/proposal/draft";

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
  readonly proposal: Proposal;
  readonly projectName?: string;
  /** When set, the document renders in edit mode and reads/writes this draft. */
  readonly draft?: ProposalDraft;
  readonly onDraftChange?: (draft: ProposalDraft) => void;
}

/** Renders one free-text section as either a static paragraph list or a textarea. */
function TextSection({
  title,
  emptyLabel,
  paragraphs,
  draftValue,
  onDraftValueChange,
}: {
  readonly title: string;
  readonly emptyLabel: string;
  readonly paragraphs: string[];
  readonly draftValue?: string;
  readonly onDraftValueChange?: (value: string) => void;
}) {
  const isReadOnly = draftValue === undefined;
  return (
    <section className="mb-8">
      <h3 className={sectionTitleClass}>{title}</h3>
      {isReadOnly ? (
        renderParagraphs(paragraphs, emptyLabel)
      ) : (
        <Textarea
          value={draftValue}
          onChange={(event) => onDraftValueChange?.(event.target.value)}
          rows={8}
        />
      )}
    </section>
  );
}

function renderParagraphs(paragraphs: string[], emptyLabel: string) {
  if (paragraphs.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }
  return paragraphs.map((paragraph, index) => (
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
  ));
}

/**
 * The full proposal document card. In read-only mode it renders from
 * `proposal`; when `draft`/`onDraftChange` are supplied, every section becomes
 * editable in place and mutates the shared draft object instead.
 */
function ProposalDocument({
  proposal,
  projectName,
  draft,
  onDraftChange,
}: ProposalDocumentProps) {
  const isEditing = draft !== undefined;
  const patchDraft = (patch: Partial<ProposalDraft>) => {
    if (!draft || !onDraftChange) return;
    onDraftChange({ ...draft, ...patch });
  };

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

      <TextSection
        title={EXECUTIVE_SUMMARY.TITLE}
        emptyLabel={EXECUTIVE_SUMMARY.EMPTY}
        paragraphs={proposal.executiveSummaryParagraphs}
        draftValue={draft?.executiveSummary}
        onDraftValueChange={(executiveSummary) =>
          patchDraft({ executiveSummary })
        }
      />

      <TextSection
        title={TECHNICAL_APPROACH.TITLE}
        emptyLabel={TECHNICAL_APPROACH.EMPTY}
        paragraphs={proposal.technicalApproachParagraphs}
        draftValue={draft?.technicalApproach}
        onDraftValueChange={(technicalApproach) =>
          patchDraft({ technicalApproach })
        }
      />

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{ARCHITECTURE.TITLE}</h3>
        <ArchitectureOverview
          architecture={draft?.architecture ?? proposal.architecture}
          isEditing={isEditing}
          onChange={(architecture) => patchDraft({ architecture })}
        />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{TEAM_COMPOSITION.TITLE}</h3>
        <TeamCompositionGrid
          team={draft?.teamComposition ?? proposal.teamComposition}
          isEditing={isEditing}
          onChange={(teamComposition) => patchDraft({ teamComposition })}
        />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{TIMELINE.TITLE}</h3>
        <TimelineSection
          phases={draft?.timeline ?? proposal.timeline}
          isEditing={isEditing}
          onChange={(timeline) => patchDraft({ timeline })}
        />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{COST_BREAKDOWN.TITLE}</h3>
        <CostBreakdownSection
          entries={draft?.costBreakdown ?? proposal.costBreakdown}
          totalCostLabel={proposal.totalCostLabel}
          totalDaysLabel={proposal.totalDaysLabel}
          isEditing={isEditing}
          onChange={(costBreakdown) => patchDraft({ costBreakdown })}
        />
      </section>

      <section>
        <h3 className={sectionTitleClass}>{RISKS.TITLE}</h3>
        <RiskSection
          risks={draft?.risks ?? proposal.risks}
          isEditing={isEditing}
          onChange={(risks) => patchDraft({ risks })}
        />
      </section>
    </Card>
  );
}

export { ProposalDocument };
