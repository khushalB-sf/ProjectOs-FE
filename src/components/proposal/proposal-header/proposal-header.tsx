import { Download } from "lucide-react";

import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { Button } from "@/components/ui/button";
import { LABELS } from "@/constants/labels";

const { HEADER } = LABELS.PROPOSAL;

/** Top action row: generation status + edit / export controls. */
function ProposalHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <StatusBadge tone="low">{HEADER.GENERATED_BADGE}</StatusBadge>
        <span className="text-sm text-slate-500">{HEADER.REVISION_META}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">{HEADER.EDIT}</Button>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">
          <Download aria-hidden="true" />
          {HEADER.EXPORT}
        </Button>
      </div>
    </div>
  );
}

export { ProposalHeader };
