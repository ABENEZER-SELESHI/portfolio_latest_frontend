import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No data yet",
  description = "Content will appear here once available.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted">
      <Inbox className="mb-4 h-10 w-10 opacity-50" aria-hidden />
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm">{description}</p>
    </div>
  );
}
