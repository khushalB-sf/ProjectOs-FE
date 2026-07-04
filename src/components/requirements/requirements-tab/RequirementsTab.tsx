import { LABELS } from "@/constants/labels";
import {
  FUNCTIONAL_REQUIREMENTS,
  NON_FUNCTIONAL_REQUIREMENTS,
} from "@/constants/requirements/mock";

import { RequirementGroupCard } from "./RequirementGroupCard";
import { RequirementRow } from "./RequirementRow";
import { RequirementsToolbar } from "./RequirementsToolbar";

const L = LABELS.REQUIREMENTS.REQUIREMENTS;
const FR_CHIP = "bg-indigo-100 text-indigo-600";
const NFR_CHIP = "bg-purple-100 text-purple-600";

/** Requirements tab — toolbar plus functional & non-functional requirement groups. */
function RequirementsTab() {
  return (
    <div className="space-y-4">
      <RequirementsToolbar />
      <RequirementGroupCard
        title={L.FUNCTIONAL_TITLE}
        dotClassName="bg-indigo-500"
        showMoreLabel={L.SHOW_FUNCTIONAL_MORE}
      >
        {FUNCTIONAL_REQUIREMENTS.map((requirement) => (
          <RequirementRow
            key={requirement.id}
            code={requirement.code}
            title={requirement.title}
            subtitle={requirement.subtitle}
            priorityTone={requirement.priorityTone}
            priorityLabel={requirement.priorityLabel}
            chipClassName={FR_CHIP}
          />
        ))}
      </RequirementGroupCard>
      <RequirementGroupCard
        title={L.NON_FUNCTIONAL_TITLE}
        dotClassName="bg-purple-500"
        showMoreLabel={L.SHOW_NON_FUNCTIONAL_MORE}
      >
        {NON_FUNCTIONAL_REQUIREMENTS.map((requirement) => (
          <RequirementRow
            key={requirement.id}
            code={requirement.code}
            title={requirement.title}
            subtitle={requirement.subtitle}
            priorityTone={requirement.priorityTone}
            priorityLabel={requirement.priorityLabel}
            chipClassName={NFR_CHIP}
          />
        ))}
      </RequirementGroupCard>
    </div>
  );
}

export { RequirementsTab };
