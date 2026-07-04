import { ActionItemsPanel } from "@/components/meetings/action-items-panel";
import { DecisionsPanel } from "@/components/meetings/decisions-panel";
import { MinutesPanel } from "@/components/meetings/minutes-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LABELS } from "@/constants/labels";
import { ACTION_ITEMS, DECISIONS, MEETINGS } from "@/constants/meetings/mock";

const MEETINGS_LABELS = LABELS.MEETINGS;

function TabBadge({ count }: { count: number }) {
  return (
    <span className="ml-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-semibold text-slate-600">
      {count}
    </span>
  );
}

function MeetingDetail() {
  const title = MEETINGS[0].title;

  return (
    <div className="flex-1 space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" variant="outline" size="sm">
              {MEETINGS_LABELS.ACTIONS.COPY_MOM}
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              {MEETINGS_LABELS.ACTIONS.EXPORT}
            </Button>
          </div>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          {MEETINGS_LABELS.DETAIL.PROCESSED_META}
        </p>
      </div>

      <Tabs defaultValue="minutes">
        <TabsList>
          <TabsTrigger value="minutes">
            {MEETINGS_LABELS.TABS.MINUTES}
          </TabsTrigger>
          <TabsTrigger value="actions">
            {MEETINGS_LABELS.TABS.ACTION_ITEMS}
            <TabBadge count={ACTION_ITEMS.length} />
          </TabsTrigger>
          <TabsTrigger value="decisions">
            {MEETINGS_LABELS.TABS.DECISIONS}
            <TabBadge count={DECISIONS.length} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="minutes" className="mt-2">
          <MinutesPanel />
        </TabsContent>
        <TabsContent value="actions" className="mt-2">
          <ActionItemsPanel />
        </TabsContent>
        <TabsContent value="decisions" className="mt-2">
          <DecisionsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { MeetingDetail };
