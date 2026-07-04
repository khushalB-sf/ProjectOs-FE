import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequirementGroupCardProps {
  title: string;
  dotClassName: string;
  showMoreLabel: string;
  children: React.ReactNode;
}

/** Wrapper card for a labelled group of requirements with a "show more" footer link. */
function RequirementGroupCard({
  title,
  dotClassName,
  showMoreLabel,
  children,
}: RequirementGroupCardProps) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b px-5 py-4">
        <CardTitle className="flex items-center gap-2 text-sm text-slate-800">
          <span
            className={cn("size-2 rounded-full", dotClassName)}
            aria-hidden="true"
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-1">
        {children}
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 py-3 text-sm text-indigo-600"
        >
          {showMoreLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export { RequirementGroupCard };
