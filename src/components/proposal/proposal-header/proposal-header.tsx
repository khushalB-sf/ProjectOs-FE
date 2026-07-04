import { useState } from "react";
import { Download, Loader2, Sparkles } from "lucide-react";

import { AskAiDialog } from "@/components/proposal/ask-ai-dialog/ask-ai-dialog";
import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { Button } from "@/components/ui/button";
import { LABELS } from "@/constants/labels";

import type { StatusTone } from "@/types/common";

const { HEADER } = LABELS.PROPOSAL;

interface ProposalHeaderProps {
  hasProposal: boolean;
  statusLabel?: string;
  statusTone?: StatusTone;
  isGenerating: boolean;
  onGenerate: () => void;
  isExporting: boolean;
  onExport: () => void;
}

/** Top action row: generation status plus edit / export / generate controls. */
function ProposalHeader({
  hasProposal,
  statusLabel,
  statusTone,
  isGenerating,
  onGenerate,
  isExporting,
  onExport,
}: ProposalHeaderProps) {
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {statusLabel && statusTone && (
          <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={!hasProposal}
          onClick={() => setIsAskAiOpen(true)}
        >
          {HEADER.EDIT}
        </Button>
        <Button
          variant="outline"
          disabled={!hasProposal || isExporting}
          onClick={onExport}
        >
          {isExporting ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : (
            <Download aria-hidden="true" />
          )}
          {isExporting ? HEADER.EXPORTING : HEADER.EXPORT}
        </Button>
        {!hasProposal && (
          <Button
            className="bg-slate-900 text-white hover:bg-slate-800"
            disabled={isGenerating}
            onClick={onGenerate}
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles aria-hidden="true" />
            )}
            {isGenerating ? HEADER.GENERATING : HEADER.GENERATE}
          </Button>
        )}
      </div>

      <AskAiDialog open={isAskAiOpen} onOpenChange={setIsAskAiOpen} />
    </div>
  );
}

export { ProposalHeader };
