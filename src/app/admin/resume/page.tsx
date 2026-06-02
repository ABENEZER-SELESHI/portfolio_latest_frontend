"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/layouts/admin-layout";
import { useResume, queryKeys } from "@/hooks/queries";
import { adminService } from "@/services/admin.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/format";
import { API_BASE_URL } from "@/constants";

export default function AdminResumePage() {
  const toast = useToast();
  const qc = useQueryClient();
  const { data, isError } = useResume();
  const [file, setFile] = useState<File | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Select a PDF file");
      const fd = new FormData();
      fd.append("resume", file);
      return adminService.uploadResume(fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.resume });
      toast.success("Resume uploaded");
      setFile(null);
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminService.deleteResume(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.resume });
      toast.success("Resume removed");
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const downloadUrl = data?.downloadUrl ?? `${API_BASE_URL}/resume/download`;

  return (
    <AdminLayout title="Resume">
      <Card className="max-w-lg">
        {isError ? (
          <p className="text-sm text-muted mb-4">No resume uploaded yet.</p>
        ) : (
          <p className="text-sm text-muted mb-4">
            Current file: <span className="text-foreground font-medium">{data?.filename ?? "—"}</span>
          </p>
        )}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Upload PDF</label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              className="mt-1 block w-full text-sm text-muted"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => uploadMutation.mutate()} isLoading={uploadMutation.isPending} disabled={!file}>
              Upload
            </Button>
            {!isError && (
              <Button variant="danger" onClick={() => confirm("Remove resume?") && deleteMutation.mutate()} isLoading={deleteMutation.isPending}>
                Remove
              </Button>
            )}
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">Preview / Download</Button>
            </a>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
}
