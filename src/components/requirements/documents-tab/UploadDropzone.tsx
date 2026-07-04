import { UploadCloud } from "lucide-react";

import { LABELS } from "@/constants/labels";
import { Button } from "@/components/ui/button";

const L = LABELS.REQUIREMENTS.UPLOAD;

/** RFP / requirement document upload dropzone (static mock — no upload wiring). */
function UploadDropzone() {
  return (
    <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-8 text-center">
      <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        <UploadCloud className="size-7" aria-hidden="true" />
      </span>
      <p className="text-sm font-medium text-slate-800">{L.HEADLINE}</p>
      <p className="mt-1 text-xs text-slate-500">{L.HINT}</p>
      <Button
        type="button"
        className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700"
      >
        {L.BROWSE}
      </Button>
    </div>
  );
}

export { UploadDropzone };
