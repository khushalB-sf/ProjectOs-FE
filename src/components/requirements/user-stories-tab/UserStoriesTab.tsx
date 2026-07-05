import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { LABELS } from "@/constants/labels";
import { REQUIREMENTS_QUERY_KEYS } from "@/constants/queryKeys";
import { useProject } from "@/contexts/useProject";
import { useStories, useTaskStatus } from "@/hooks/requirements/queries";
import { useGenerateStories } from "@/hooks/requirements/mutations";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { EpicCard } from "./EpicCard";
import { StoryEditDialog } from "./StoryEditDialog";

import {
  groupStoriesIntoEpics,
  type UserStoryResponse,
} from "@/types/requirements";

const L = LABELS.REQUIREMENTS.REQUIREMENTS;
const STATE_L = LABELS.REQUIREMENTS.STATE;

interface GenerateStoriesButtonProps {
  readonly onGenerate: () => void;
  readonly isGenerating: boolean;
}

function GenerateStoriesButton({
  onGenerate,
  isGenerating,
}: GenerateStoriesButtonProps) {
  return (
    <Button
      type="button"
      className="bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={onGenerate}
      disabled={isGenerating}
    >
      {isGenerating && (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      )}
      {L.GENERATE_STORIES}
    </Button>
  );
}

/** User Stories tab — epics with their nested story cards. */
function UserStoriesTab() {
  const { projectId } = useProject();
  const queryClient = useQueryClient();
  const [generationTaskId, setGenerationTaskId] = useState<string | undefined>(
    undefined,
  );
  const { data: stories, isLoading, isError, error } = useStories(projectId);
  const { mutate: generateStories, isPending: isTriggeringGeneration } =
    useGenerateStories(projectId ?? "");
  const { data: generationTask } = useTaskStatus(
    generationTaskId,
    Boolean(generationTaskId),
  );
  const [editingStoryId, setEditingStoryId] = useState<string | undefined>(
    undefined,
  );

  const epics = useMemo(() => groupStoriesIntoEpics(stories ?? []), [stories]);
  const editingStory = stories?.find(
    (story: UserStoryResponse) => story.id === editingStoryId,
  );

  const isTaskSettled =
    generationTask?.status === "completed" ||
    generationTask?.status === "failed";
  const isGeneratingStories =
    isTriggeringGeneration || (Boolean(generationTaskId) && !isTaskSettled);

  const handleGenerateStories = () => {
    generateStories(undefined, {
      onSuccess: (task) => setGenerationTaskId(task.task_id),
    });
  };

  // Refresh stories / notify once generation settles — guarded so it fires once per task.
  const notifiedTaskIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!generationTask || !isTaskSettled) return;
    if (notifiedTaskIdRef.current === generationTask.task_id) return;
    notifiedTaskIdRef.current = generationTask.task_id;

    if (generationTask.status === "completed") {
      void queryClient.invalidateQueries({
        queryKey: REQUIREMENTS_QUERY_KEYS.STORIES(projectId ?? ""),
      });
      toast.success(LABELS.REQUIREMENTS.API.GENERATE_STORIES_SUCCESS);
    } else {
      toast.error(
        generationTask.error ?? LABELS.REQUIREMENTS.API.GENERATE_STORIES_ERROR,
      );
    }
  }, [generationTask, isTaskSettled, projectId, queryClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-10">
        <Loader2
          className="size-5 animate-spin text-slate-400"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-10">
        <p className="text-sm font-medium text-red-500">
          {getErrorMessage(error, STATE_L.STORIES_ERROR)}
        </p>
      </div>
    );
  }

  if (epics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white py-10">
        <p className="text-sm text-slate-500">{STATE_L.STORIES_EMPTY}</p>
        <GenerateStoriesButton
          onGenerate={handleGenerateStories}
          isGenerating={isGeneratingStories}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <GenerateStoriesButton
          onGenerate={handleGenerateStories}
          isGenerating={isGeneratingStories}
        />
      </div>

      <div className="max-h-[calc(100vh-18rem)] space-y-4 overflow-y-auto">
        {epics.map((epic) => (
          <EpicCard key={epic.id} epic={epic} onEditStory={setEditingStoryId} />
        ))}
      </div>

      <StoryEditDialog
        story={editingStory}
        projectId={projectId}
        onOpenChange={(open) => {
          if (!open) setEditingStoryId(undefined);
        }}
      />
    </div>
  );
}

export { UserStoriesTab };
