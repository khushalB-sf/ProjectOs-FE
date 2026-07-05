import { Bot, User } from "lucide-react";

import { LABELS } from "@/constants/labels";
import { cn } from "@/lib/utils";

import type { ChatMessage } from "@/types/assistant";
import { ChatSources } from "../chat-sources/chat-sources";

const MESSAGE = LABELS.ASSISTANT.MESSAGE;

interface ChatMessageItemProps {
  message: ChatMessage;
}

/**
 * A single chat turn. User turns align right with a filled bubble; assistant
 * turns align left. A streaming assistant turn with no content yet shows a
 * "thinking" placeholder, and a blinking caret while tokens arrive.
 */
function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const isPending = message.streaming && !message.content;

  return (
    <div
      className={cn(
        "flex w-full items-start gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
      aria-label={isUser ? MESSAGE.USER_ARIA : MESSAGE.ASSISTANT_ARIA}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </span>

      <div
        className={cn(
          "flex max-w-[80%] flex-col",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words",
            isUser ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-900",
          )}
        >
          {isPending ? (
            <span className="text-slate-500">{MESSAGE.THINKING}</span>
          ) : (
            <>
              {message.content}
              {message.streaming && (
                <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-current align-middle" />
              )}
            </>
          )}
        </div>
        {!isUser && message.sources && (
          <ChatSources sources={message.sources} />
        )}
      </div>
    </div>
  );
}

export { ChatMessageItem };
