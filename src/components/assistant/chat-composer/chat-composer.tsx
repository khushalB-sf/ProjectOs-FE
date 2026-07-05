import { useState } from "react";
import { Send, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LABELS } from "@/constants/labels";

const COMPOSER = LABELS.ASSISTANT.COMPOSER;

interface ChatComposerProps {
  isStreaming: boolean;
  /** False when no project is selected — input and send are disabled. */
  canSend: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
}

/**
 * Message input. Enter submits, Shift+Enter inserts a newline. While a response
 * streams, the send button becomes a stop button that aborts the request.
 */
function ChatComposer({
  isStreaming,
  canSend,
  onSend,
  onStop,
}: ChatComposerProps) {
  const [value, setValue] = useState("");
  const canSubmit = value.trim().length > 0 && !isStreaming && canSend;

  const submit = () => {
    if (!canSubmit) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-slate-200 p-3">
      <div className="flex items-end gap-2">
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            canSend ? COMPOSER.PLACEHOLDER : COMPOSER.NO_PROJECT_PLACEHOLDER
          }
          rows={1}
          disabled={!canSend}
          className="max-h-32 min-h-10 flex-1 resize-none"
          aria-label={COMPOSER.PLACEHOLDER}
        />
        {isStreaming ? (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={onStop}
            aria-label={COMPOSER.STOP_ARIA}
          >
            <Square aria-hidden="true" />
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            onClick={submit}
            disabled={!canSubmit}
            aria-label={COMPOSER.SEND_ARIA}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Send aria-hidden="true" />
          </Button>
        )}
      </div>
      <p className="mt-1.5 text-center text-xs text-slate-400">
        {COMPOSER.HINT}
      </p>
    </div>
  );
}

export { ChatComposer };
