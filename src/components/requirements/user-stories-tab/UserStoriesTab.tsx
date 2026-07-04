import { EPICS } from "@/constants/requirements/mock";

import { EpicCard } from "./EpicCard";

/** User Stories tab — epics with their nested story cards. */
function UserStoriesTab() {
  return (
    <div className="space-y-4">
      {EPICS.map((epic) => (
        <EpicCard key={epic.id} epic={epic} />
      ))}
    </div>
  );
}

export { UserStoriesTab };
