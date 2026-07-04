import { useState } from "react";
import { Loader2 } from "lucide-react";

import { MeetingDetail } from "@/components/meetings/meeting-detail";
import { MeetingList } from "@/components/meetings/meeting-list";
import { NewTranscriptForm } from "@/components/meetings/new-transcript-form";
import { LABELS } from "@/constants/labels";
import { useProject } from "@/contexts/useProject";
import { useMeetings } from "@/hooks/meetings/queries";
import { getErrorMessage } from "@/lib/utils";

const MEETINGS_LABELS = LABELS.MEETINGS;

function MeetingsPage() {
  const { projectId, isLoading: isProjectLoading } = useProject();
  const {
    data: meetings,
    isLoading: isMeetingsLoading,
    isError,
    error,
  } = useMeetings(projectId);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [isNewMode, setIsNewMode] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIsNewMode(false);
  };

  const handleExitNew = () => {
    setIsNewMode(false);
  };

  if (isProjectLoading || isMeetingsLoading) {
    return (
      <main className="flex min-h-[600px] items-center justify-center bg-slate-50 p-6">
        <Loader2
          className="size-8 animate-spin text-indigo-600"
          aria-hidden="true"
        />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[600px] items-center justify-center bg-slate-50 p-6">
        <p className="text-sm text-red-600">
          {getErrorMessage(error, MEETINGS_LABELS.STATE.ERROR)}
        </p>
      </main>
    );
  }

  const items = meetings ?? [];
  const activeId =
    selectedId && items.some((meeting) => meeting.id === selectedId)
      ? selectedId
      : items[0]?.id;
  const selectedMeeting = items.find((meeting) => meeting.id === activeId);

  const renderMainPanel = () => {
    if (isNewMode && projectId) {
      return (
        <NewTranscriptForm
          projectId={projectId}
          onCancel={handleExitNew}
          onProcessed={handleExitNew}
        />
      );
    }
    if (items.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {MEETINGS_LABELS.STATE.EMPTY_TITLE}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {MEETINGS_LABELS.STATE.EMPTY_BODY}
            </p>
          </div>
        </div>
      );
    }
    return <MeetingDetail meeting={selectedMeeting} />;
  };

  return (
    <main className="bg-slate-50 p-6">
      <div className="flex min-h-[600px] gap-4">
        <MeetingList
          meetings={items}
          selectedId={activeId}
          isNewMode={isNewMode}
          onSelect={handleSelect}
          onNew={() => setIsNewMode(true)}
        />
        {renderMainPanel()}
      </div>
    </main>
  );
}

export default MeetingsPage;
