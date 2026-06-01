import { AlertCircle } from "lucide-react";
import { Button } from "./button";

export function ErrorState({
  message = "Failed to load data.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="mb-4 h-10 w-10 text-destructive" aria-hidden />
      <p className="text-sm text-muted max-w-md">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
