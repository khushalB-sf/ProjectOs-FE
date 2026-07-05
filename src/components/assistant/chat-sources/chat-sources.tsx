import { FileText } from "lucide-react";

import { LABELS } from "@/constants/labels";

import type { ChatSource } from "@/types/assistant";

const MESSAGE = LABELS.ASSISTANT.MESSAGE;
const DOC_TYPE = LABELS.ASSISTANT.DOC_TYPE;

interface ChatSourcesProps {
  readonly sources: ChatSource[];
}

/** Best-effort display label for a citation across possible wire shapes. */
function sourceLabel(source: ChatSource, index: number): string {
  const docTypeLabel = source.doc_type ? DOC_TYPE[source.doc_type] : undefined;
  return (
    source.title ??
    docTypeLabel ??
    source.doc_type ??
    `${MESSAGE.SOURCES_TITLE} ${index + 1}`
  );
}

/** Compact, numbered citation chips rendered beneath an assistant answer. */
function ChatSources({ sources }: ChatSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-2">
      <p className="mb-1 text-xs font-medium text-slate-400">
        {MESSAGE.SOURCES_TITLE}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => {
          const label = sourceLabel(source, index);
          return (
            <li
              key={`${source.entity_id ?? label}-${source.chunk_index ?? index}`}
            >
              <span
                title={source.snippet ?? label}
                className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600"
              >
                <span className="font-medium text-indigo-600">{index + 1}</span>
                <FileText
                  className="size-3 text-slate-400"
                  aria-hidden="true"
                />
                <span className="max-w-40 truncate">{label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { ChatSources };
