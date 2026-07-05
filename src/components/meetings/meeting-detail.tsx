import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { ActionItemsPanel } from "@/components/meetings/action-items-panel";
import { DecisionsPanel } from "@/components/meetings/decisions-panel";
import { MinutesPanel } from "@/components/meetings/minutes-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LABELS } from "@/constants/labels";
import { formatDate } from "@/lib/utils";

import { isMeetingProcessed, type MeetingResponse } from "@/types/meetings";

const MEETINGS_LABELS = LABELS.MEETINGS;

const FAILURE_STATUSES = new Set(["failed", "error"]);

function TabBadge({ count }: { readonly count: number }) {
  return (
    <span className="ml-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-semibold text-slate-600">
      {count}
    </span>
  );
}

interface MeetingDetailProps {
  readonly meeting: MeetingResponse | undefined;
}

/** Centered status card shown while a meeting is processing or has failed. */
function DetailStateCard({
  icon,
  title,
  body,
}: {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly body: string;
}) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="flex flex-col items-center">
        {icon}
        <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 max-w-sm text-sm text-slate-400">{body}</p>
      </div>
    </div>
  );
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

  const hasFailed = FAILURE_STATUSES.has(meeting.status.toLowerCase());

  if (hasFailed) {
    return (
      <DetailStateCard
        icon={
          <AlertTriangle className="size-8 text-red-500" aria-hidden="true" />
        }
        title={MEETINGS_LABELS.DETAIL.FAILED_TITLE}
        body={MEETINGS_LABELS.DETAIL.FAILED_BODY}
      />
    );
  }

  // Still running through the AI pipeline — the list query keeps polling, so this
  // resolves to the full detail view automatically once processing completes.
  if (!isMeetingProcessed(meeting)) {
    return (
      <DetailStateCard
        icon={
          <Loader2
            className="size-8 animate-spin text-indigo-600"
            aria-hidden="true"
          />
        }
        title={MEETINGS_LABELS.DETAIL.PROCESSING_TITLE}
        body={MEETINGS_LABELS.DETAIL.PROCESSING_BODY}
      />
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
