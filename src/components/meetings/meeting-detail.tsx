import { toast } from "sonner";

import { ActionItemsPanel } from "@/components/meetings/action-items-panel";
import { DecisionsPanel } from "@/components/meetings/decisions-panel";
import { MinutesPanel } from "@/components/meetings/minutes-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LABELS } from "@/constants/labels";
import { formatDate } from "@/lib/utils";

import type { MeetingResponse } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

function TabBadge({ count }: { count: number }) {
  return (
    <span className="ml-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-semibold text-slate-600">
      {count}
    </span>
  );
}

interface MeetingDetailProps {
  meeting: MeetingResponse | undefined;
}

function MeetingDetail({ meeting }: MeetingDetailProps) {
  if (!meeting) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {MEETINGS_LABELS.DETAIL.NO_SELECTION_TITLE}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {MEETINGS_LABELS.DETAIL.NO_SELECTION_BODY}
          </p>
        </div>
      </div>
    );
  }

  const processedMeta = formatDate(meeting.processed_at);

  const handleCopyMom = () => {
    if (!meeting.mom) {
      toast.error(MEETINGS_LABELS.DETAIL.COPY_MOM_EMPTY);
      return;
    }
    void navigator.clipboard.writeText(meeting.mom).then(() => {
      toast.success(MEETINGS_LABELS.DETAIL.COPY_MOM_SUCCESS);
    });
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {meeting.title}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyMom}
            >
              {MEETINGS_LABELS.ACTIONS.COPY_MOM}
            </Button>
            {/* <Button
              type="button"
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              {MEETINGS_LABELS.ACTIONS.EXPORT}
            </Button> */}
          </div>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          {processedMeta
            ? `${MEETINGS_LABELS.DETAIL.PROCESSED_PREFIX} ${processedMeta}`
            : MEETINGS_LABELS.DETAIL.NOT_PROCESSED}
        </p>
      </div>

      <Tabs defaultValue="minutes">
        <TabsList>
          <TabsTrigger value="minutes">
            {MEETINGS_LABELS.TABS.MINUTES}
          </TabsTrigger>
          <TabsTrigger value="actions">
            {MEETINGS_LABELS.TABS.ACTION_ITEMS}
            <TabBadge count={meeting.action_items.length} />
          </TabsTrigger>
          <TabsTrigger value="decisions">
            {MEETINGS_LABELS.TABS.DECISIONS}
            <TabBadge count={meeting.decisions.length} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="minutes" className="mt-2">
          <MinutesPanel mom={meeting.mom} attendees={meeting.attendees} />
        </TabsContent>
        <TabsContent value="actions" className="mt-2">
          <ActionItemsPanel items={meeting.action_items} />
        </TabsContent>
        <TabsContent value="decisions" className="mt-2">
          <DecisionsPanel decisions={meeting.decisions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { MeetingDetail };
