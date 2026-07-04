import { Plus } from "lucide-react";

import { StatusBadge } from "@/components/common/status-badge/status-badge";
import { Button } from "@/components/ui/button";
import { LABELS } from "@/constants/labels";
import { MEETINGS } from "@/constants/meetings/mock";
import { cn } from "@/lib/utils";

import type { MeetingSummary } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

interface MeetingListProps {
  selectedId: string;
  isNewMode: boolean;
  onSelect: (id: string) => void;
  onNew: () => void;
}

function MeetingListItem({
  meeting,
  isActive,
  onSelect,
}: {
  meeting: MeetingSummary;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(meeting.id)}
      className={cn(
        "flex w-full flex-col gap-1 border-b border-slate-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-slate-50",
        isActive && "bg-indigo-50 hover:bg-indigo-50",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-900">
          {meeting.title}
        </span>
        <StatusBadge tone={meeting.badge.tone}>
          {meeting.badge.text}
        </StatusBadge>
      </div>
      <span className="text-xs text-slate-400">{meeting.meta}</span>
    </button>
  );
}

function MeetingList({
  selectedId,
  isNewMode,
  onSelect,
  onNew,
}: MeetingListProps) {
  return (
    <div className="w-72 shrink-0 space-y-2">
      <Button
        type="button"
        onClick={onNew}
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >
        <Plus className="size-4" aria-hidden="true" />
        {MEETINGS_LABELS.ACTIONS.PROCESS_NEW}
      </Button>
      <nav
        aria-label={MEETINGS_LABELS.LIST.ARIA_LABEL}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        {MEETINGS.map((meeting) => (
          <MeetingListItem
            key={meeting.id}
            meeting={meeting}
            isActive={!isNewMode && meeting.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </div>
  );
}

export { MeetingList };
