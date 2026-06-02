"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Trash2 } from "lucide-react";
import { AdminLayout } from "@/layouts/admin-layout";
import { useMessages, queryKeys } from "@/hooks/queries";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage, formatDate } from "@/utils/format";
import { cn } from "@/lib/cn";

export default function AdminMessagesPage() {
  const toast = useToast();
  const qc = useQueryClient();
  const { data: messages = [], isLoading } = useMessages();

  const markRead = useMutation({
    mutationFn: adminService.markMessageRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.messages });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const deleteMsg = useMutation({
    mutationFn: adminService.deleteMessage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.messages });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Message deleted");
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  return (
    <AdminLayout title="Messages">
      {isLoading && <Skeleton className="h-48" />}
      {!isLoading && messages.length === 0 && (
        <EmptyState title="No messages" description="Contact form submissions will appear here." />
      )}
      <div className="space-y-4 max-w-3xl">
        {messages.map((msg) => (
          <Card
            key={msg.id}
            className={cn(!msg.isRead && "border-accent/40")}
          >
            <div className="flex justify-between gap-4">
              <div className="flex gap-3 min-w-0">
                <Mail className={cn("h-5 w-5 shrink-0", msg.isRead ? "text-muted" : "text-accent")} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-foreground">{msg.subject}</h3>
                    {!msg.isRead && (
                      <span className="text-xs rounded border border-accent/50 px-1.5 py-0.5 text-accent">Unread</span>
                    )}
                  </div>
                  <p className="text-sm text-muted">
                    {msg.name} &lt;{msg.email}&gt; — {formatDate(msg.submittedAt)}
                  </p>
                  <p className="mt-3 text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                {!msg.isRead && (
                  <Button size="sm" variant="secondary" onClick={() => markRead.mutate(msg.id)}>
                    Mark read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => confirm("Delete message?") && deleteMsg.mutate(msg.id)}
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
