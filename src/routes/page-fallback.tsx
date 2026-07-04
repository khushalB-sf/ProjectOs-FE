import { Skeleton } from "@/components/ui/skeleton";

/** Suspense fallback shown while a lazy page chunk loads. */
function PageFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export { PageFallback };
