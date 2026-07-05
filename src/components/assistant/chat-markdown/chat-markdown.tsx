import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMarkdownProps {
  readonly content: string;
}

/**
 * Renders an assistant answer as formatted Markdown (headings, lists, tables,
 * inline code, links). Styling is scoped locally rather than pulling in a
 * typography plugin so the bubble stays compact.
 */
function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <div className="space-y-2 text-sm leading-relaxed break-words [&_a]:text-indigo-600 [&_a]:underline [&_code]:rounded [&_code]:bg-slate-200/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-sm [&_h2]:font-semibold [&_h3]:font-semibold [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-3 [&_pre]:text-xs [&_pre]:text-slate-100 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-slate-100 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:border [&_td]:border-slate-200 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-slate-200 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-5">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}

export { ChatMarkdown };
