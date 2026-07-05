import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge/status-badge";

import { StoryCard } from "./StoryCard";

import type { Epic, EpicTone } from "@/types/requirements";

const EPIC_TONE_CLASSES: Record<EpicTone, string> = {
  indigo: "bg-indigo-500",
  orange: "bg-orange-500",
};

interface EpicCardProps {
  epic: Epic;
  onEditStory: (storyId: string) => void;
}

/** An epic grouping — collapsible header with accent tile plus its child story cards or a note. */
function EpicCard({ epic, onEditStory }: EpicCardProps) {
  return (
    <Card className="gap-0 py-0">
      <Accordion type="single" collapsible defaultValue={epic.id}>
        <AccordionItem value={epic.id} className="border-b-0">
          <AccordionTrigger className="px-5 py-4 hover:no-underline data-[state=open]:border-b [&>svg]:size-5 [&>svg]:text-slate-400">
            <span className="flex flex-1 items-center gap-3">
              <span
                className={cn(
                  "size-8 shrink-0 rounded-md",
                  EPIC_TONE_CLASSES[epic.tone],
                )}
                aria-hidden="true"
              />
              <span className="text-left">
                <span className="block text-sm font-semibold text-slate-800">
                  {epic.title}
                </span>
                <span className="block text-xs text-slate-500">
                  {epic.summary}
                </span>
              </span>
            </span>
            {epic.statusTone && epic.statusLabel ? (
              <StatusBadge tone={epic.statusTone}>
                {epic.statusLabel}
              </StatusBadge>
            ) : null}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 px-5 py-4">
            {epic.stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onEdit={() => onEditStory(story.id)}
              />
            ))}
            {epic.note ? (
              <p className="text-sm text-slate-500">{epic.note}</p>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export { EpicCard };
