import { ProposalDocument } from "@/components/proposal/proposal-document/proposal-document";
import { ProposalHeader } from "@/components/proposal/proposal-header/proposal-header";

/** Proposal module route page — renders the generated technical proposal. */
function ProposalPage() {
  return (
    <main className="bg-slate-50 p-6">
      <div className="space-y-5">
        <ProposalHeader />
        <ProposalDocument />
      </div>
    </main>
  );
}

export default ProposalPage;
