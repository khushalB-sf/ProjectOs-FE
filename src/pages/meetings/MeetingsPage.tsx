import { useState } from "react";

import { MeetingDetail } from "@/components/meetings/meeting-detail";
import { MeetingList } from "@/components/meetings/meeting-list";
import { NewTranscriptForm } from "@/components/meetings/new-transcript-form";
import { MEETINGS } from "@/constants/meetings/mock";

function MeetingsPage() {
  const [selectedId, setSelectedId] = useState(MEETINGS[0].id);
  const [isNewMode, setIsNewMode] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIsNewMode(false);
  };

  const handleExitNew = () => {
    setIsNewMode(false);
  };

  return (
    <main className="bg-slate-50 p-6">
      <div className="flex min-h-[600px] gap-4">
        <MeetingList
          selectedId={selectedId}
          isNewMode={isNewMode}
          onSelect={handleSelect}
          onNew={() => setIsNewMode(true)}
        />
        {isNewMode ? (
          <NewTranscriptForm
            onCancel={handleExitNew}
            onProcessed={handleExitNew}
          />
        ) : (
          <MeetingDetail />
        )}
      </div>
    </main>
  );
}

export default MeetingsPage;
