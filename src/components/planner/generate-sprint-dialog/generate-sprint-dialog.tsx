import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LABELS } from "@/constants/labels";
import { AI_STEPS } from "@/constants/planner/mock";
import { cn } from "@/lib/utils";

import type { AiStep } from "@/types/planner";

const DIALOG = LABELS.PLANNER.DIALOG;

interface GenerateSprintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function StepRow({ step }: { step: AiStep }) {
  return (
    <li className="flex items-center gap-3">
      {step.status === "done" && (
        <CheckCircle2
          className="h-5 w-5 shrink-0 text-emerald-500"
          aria-hidden="true"
        />
      )}
      {step.status === "active" && (
        <span
          className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-indigo-500"
          aria-hidden="true"
        />
      )}
      {step.status === "pending" && (
        <span
          className="h-3 w-3 shrink-0 rounded-full bg-slate-300"
          aria-hidden="true"
        />
      )}
      <span
        className={cn(
          "text-sm",
          step.status === "pending" ? "text-slate-400" : "text-slate-700",
        )}
      >
        {step.label}
      </span>
    </li>
  );
}

/**
 * GenerateSprintDialog — AI sprint-plan generation modal showing a spinning
 * loader header and a checklist of generation steps. Manual close only.
 */
function GenerateSprintDialog({
  open,
  onOpenChange,
}: GenerateSprintDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <Loader2
                className="h-5 w-5 animate-spin text-indigo-600"
                aria-hidden="true"
              />
            </span>
            <div>
              <DialogTitle>{DIALOG.TITLE}</DialogTitle>
              <p className="text-sm text-slate-500">{DIALOG.SUBTITLE}</p>
            </div>
          </div>
        </DialogHeader>

        <ul className="space-y-3 py-2">
          {AI_STEPS.map((step) => (
            <StepRow key={step.id} step={step} />
          ))}
        </ul>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">{DIALOG.CANCEL}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { GenerateSprintDialog };
