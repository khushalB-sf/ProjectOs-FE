import type { Gherkin } from "@/types/requirements";

interface GherkinBlockProps {
  gherkin: Gherkin;
}

/** Given / When / Then acceptance-criteria block, colour-coded per keyword. */
function GherkinBlock({ gherkin }: GherkinBlockProps) {
  return (
    <div className="space-y-1 rounded bg-slate-50 p-3 font-mono text-xs">
      <p>
        <span className="font-semibold text-emerald-600">
          {gherkin.given.keyword}
        </span>{" "}
        {gherkin.given.text}
      </p>
      <p>
        <span className="font-semibold text-amber-600">
          {gherkin.when.keyword}
        </span>{" "}
        {gherkin.when.text}
      </p>
      <p>
        <span className="font-semibold text-blue-600">
          {gherkin.then.keyword}
        </span>{" "}
        {gherkin.then.text}
      </p>
    </div>
  );
}

export { GherkinBlock };
