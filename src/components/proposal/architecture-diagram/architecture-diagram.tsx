import { ARCHITECTURE_DIAGRAM } from "@/constants/proposal/mock";

/** Dark code block rendering the ASCII system architecture diagram. */
function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-xs text-slate-300">
      <pre>{ARCHITECTURE_DIAGRAM}</pre>
    </div>
  );
}

export { ArchitectureDiagram };
