import { ArchitectureDiagram } from "@/components/proposal/architecture-diagram/architecture-diagram";
import { CostEstimateTable } from "@/components/proposal/cost-estimate-table/cost-estimate-table";
import { TechStackGrid } from "@/components/proposal/tech-stack-grid/tech-stack-grid";
import { Card } from "@/components/ui/card";
import { LABELS } from "@/constants/labels";

const { DOCUMENT, EXECUTIVE_SUMMARY, ARCHITECTURE, TECH_STACK, COST_ESTIMATE } =
  LABELS.PROPOSAL;

const sectionTitleClass =
  "mb-3 text-sm font-semibold tracking-wider text-slate-500 uppercase";

/** The full proposal document card: header, summary, architecture, stack, cost. */
function ProposalDocument() {
  return (
    <Card className="p-8">
      <header className="mb-6 border-b border-slate-200 pb-6 text-center">
        <p className="text-xs tracking-widest text-slate-400 uppercase">
          {DOCUMENT.EYEBROW}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          {DOCUMENT.TITLE}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{DOCUMENT.SUBTITLE}</p>
      </header>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{EXECUTIVE_SUMMARY.TITLE}</h3>
        <p className="leading-relaxed text-slate-700">
          {EXECUTIVE_SUMMARY.PARAGRAPH_ONE}
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          {EXECUTIVE_SUMMARY.PARAGRAPH_TWO}
        </p>
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{ARCHITECTURE.TITLE}</h3>
        <ArchitectureDiagram />
      </section>

      <section className="mb-8">
        <h3 className={sectionTitleClass}>{TECH_STACK.TITLE}</h3>
        <TechStackGrid />
      </section>

      <section>
        <h3 className={sectionTitleClass}>{COST_ESTIMATE.TITLE}</h3>
        <CostEstimateTable />
      </section>
    </Card>
  );
}

export { ProposalDocument };
