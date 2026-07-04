import { TECH_STACK_GROUPS } from "@/constants/proposal/mock";

/** Three-column grid of recommended technology stack groups. */
function TechStackGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TECH_STACK_GROUPS.map((group) => (
        <div key={group.id} className="rounded-xl bg-slate-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">
            {group.title}
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export { TechStackGrid };
