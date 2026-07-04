import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";

const DIALOG = LABELS.PROPOSAL.ASK_AI_DIALOG;

interface AskAiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * AskAiDialog — lets the user describe a change for AI to apply to the
 * proposal. No backend endpoint accepts this yet, so submitting just
 * acknowledges the request; wire it up once one exists.
 */
function AskAiDialog({ open, onOpenChange }: AskAiDialogProps) {
  const [description, setDescription] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setDescription("");
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    toast(DIALOG.UNAVAILABLE);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{DIALOG.TITLE}</DialogTitle>
        </DialogHeader>

        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={DIALOG.DESCRIPTION_PLACEHOLDER}
          className="min-h-32"
          autoFocus
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {DIALOG.CANCEL}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Sparkles aria-hidden="true" />
            {DIALOG.SUBMIT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AskAiDialog };
