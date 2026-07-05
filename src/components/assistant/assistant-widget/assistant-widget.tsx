import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { LABELS } from "@/constants/labels";
import { cn } from "@/lib/utils";
import { useProject } from "@/contexts/useProject";
import { useAssistantChat } from "@/hooks/assistant/useAssistantChat";

import { ChatWindow } from "../chat-window/chat-window";

const LAUNCHER = LABELS.ASSISTANT.LAUNCHER;

/**
 * AssistantWidget — the always-mounted entry point for the AI assistant. Renders
 * a floating launcher bubble at the bottom-right; clicking it toggles the chat
 * window. Chat state is owned by `useAssistantChat` so it survives close/reopen.
 * Retrieval is scoped to the active project, so sending is disabled until one is
 * selected.
 */
function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const { projectId } = useProject();
  const { messages, isStreaming, sendMessage, stop, reset } =
    useAssistantChat(projectId);

  return (
    <>
      {open && (
        <ChatWindow
          messages={messages}
          isStreaming={isStreaming}
          canSend={Boolean(projectId)}
          onSend={(message) => void sendMessage(message)}
          onStop={stop}
          onReset={reset}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? LAUNCHER.CLOSE_ARIA : LAUNCHER.OPEN_ARIA}
        aria-expanded={open}
        className={cn(
          "fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:outline-none",
          "bg-indigo-600 hover:bg-indigo-700",
        )}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </>
  );
}

export { AssistantWidget };
