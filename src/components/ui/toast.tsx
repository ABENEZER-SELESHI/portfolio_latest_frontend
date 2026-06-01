"use client";

import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToastStore } from "@/store/toast.store";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  if (!toasts.length) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-lg",
              t.type === "error" && "border-destructive/50",
              t.type === "success" && "border-accent/30"
            )}
            role="alert"
          >
            <Icon
              className={cn(
                "h-5 w-5 shrink-0 mt-0.5",
                t.type === "success" && "text-accent",
                t.type === "error" && "text-destructive",
                t.type === "info" && "text-muted"
              )}
            />
            <p className="flex-1 text-sm text-foreground">{t.message}</p>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="text-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
