import { FileText } from "lucide-react";

import { LABELS } from "@/constants/labels";

import type { ChatSource } from "@/types/assistant";

const MESSAGE = LABELS.ASSISTANT.MESSAGE;

interface ChatSourcesProps {
  sources: ChatSource[];
}

/** Best-effort display label for a citation across possible wire shapes. */
function sourceLabel(source: ChatSource, index: number): string {
  return (
    source.title ??
    source.doc_type ??
    source.doc_id ??
    `${MESSAGE.SOURCES_TITLE} ${index + 1}`
  );
}

/** Compact citation chips rendered beneath an assistant answer. */
function ChatSources({ sources }: ChatSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-1.5">
      <p className="mb-1 text-xs font-medium text-slate-400">
        {MESSAGE.SOURCES_TITLE}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => {
          const label = sourceLabel(source, index);
          const content = (
            <>
              <FileText className="size-3" aria-hidden="true" />
              <span className="max-w-40 truncate">{label}</span>
            </>
          );
          return (
            <li key={`${source.doc_id ?? label}-${index}`}>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  title={source.snippet ?? label}
                  className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                >
                  {content}
                </a>
              ) : (
                <span
                  title={source.snippet ?? label}
                  className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600"
                >
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { ChatSources };
