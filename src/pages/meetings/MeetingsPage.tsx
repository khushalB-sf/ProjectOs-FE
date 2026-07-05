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
      <div className="flex min-h-[600px] items-center justify-center">
        <Loader2
          className="size-8 animate-spin text-indigo-600"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <p className="text-sm text-red-600">
          {getErrorMessage(error, MEETINGS_LABELS.STATE.ERROR)}
        </p>
      </div>
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
    <div className="flex min-h-[600px] items-start gap-4">
      <div className="sticky top-6 max-h-[calc(100vh-9rem)] overflow-y-auto">
        <MeetingList
          meetings={items}
          selectedId={activeId}
          isNewMode={isNewMode}
          onSelect={handleSelect}
          onNew={() => setIsNewMode(true)}
        />
      </div>
      {renderMainPanel()}
    </div>
  );
}

export default MeetingsPage;
