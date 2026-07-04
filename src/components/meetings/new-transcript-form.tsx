import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";

const MEETINGS_LABELS = LABELS.MEETINGS;

const PROCESSING_DELAY_MS = 3000;
const SHIMMER_WIDTHS = ["w-full", "w-5/6", "w-4/6"];

interface NewTranscriptFormProps {
  onCancel: () => void;
  onProcessed: () => void;
}

function ProcessingState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <Loader2
        className="size-8 animate-spin text-indigo-600"
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold text-slate-900">
          {MEETINGS_LABELS.PROCESSING.TITLE}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {MEETINGS_LABELS.PROCESSING.SUBTITLE}
        </p>
      </div>
      <div className="w-full max-w-sm space-y-2">
        {SHIMMER_WIDTHS.map((width) => (
          <div
            key={width}
            className={`h-4 animate-pulse rounded bg-slate-200 ${width}`}
          />
        ))}
      </div>
    </div>
  );
}

function NewTranscriptForm({ onCancel, onProcessed }: NewTranscriptFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    window.setTimeout(() => {
      setIsProcessing(false);
      onProcessed();
    }, PROCESSING_DELAY_MS);
  };

  if (isProcessing) {
    return (
      <div className="flex-1">
        <ProcessingState />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          {MEETINGS_LABELS.NEW.TITLE}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {MEETINGS_LABELS.NEW.SUBTITLE}
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Input placeholder={MEETINGS_LABELS.NEW.TITLE_PLACEHOLDER} />
        <Textarea
          rows={10}
          placeholder={MEETINGS_LABELS.NEW.TRANSCRIPT_PLACEHOLDER}
        />
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {MEETINGS_LABELS.ACTIONS.CANCEL}
          </Button>
          <Button
            type="button"
            onClick={handleProcess}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Zap className="size-4" aria-hidden="true" />
            {MEETINGS_LABELS.ACTIONS.PROCESS_WITH_AI}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { NewTranscriptForm };
