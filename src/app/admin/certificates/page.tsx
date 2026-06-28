"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminLayout } from "@/layouts/admin-layout";
import { queryKeys } from "@/hooks/queries";
import { adminService } from "@/services/admin.service";
import { certificateFormSchema, type CertificateFormValues } from "@/lib/validators/certificate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage, formatDate } from "@/utils/format";
import type { Certificate } from "@/types";

export default function AdminCertificatesPage() {
  const toast = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: certs = [], isLoading } = useQuery({
    queryKey: queryKeys.certificates,
    queryFn: () => adminService.getCertificates(),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: { sortOrder: 0 },
  });

  const openCreate = () => {
    setEditing(null);
    setFile(null);
    reset({ name: "", issuer: "", issueDate: "", externalUrl: "", sortOrder: 0 });
    setShowForm(true);
  };

  const openEdit = (c: Certificate) => {
    setEditing(c);
    setFile(null);
    reset({
      name: c.name,
      issuer: c.issuer,
      issueDate: c.issueDate.slice(0, 10),
      externalUrl: c.externalUrl ?? "",
      sortOrder: c.sortOrder,
    });
    setShowForm(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (values: CertificateFormValues) => {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("issuer", values.issuer);
      fd.append("issueDate", values.issueDate);
      if (values.externalUrl) fd.append("externalUrl", values.externalUrl);
      fd.append("sortOrder", String(values.sortOrder));
      if (file) fd.append("file", file);
      if (editing) return adminService.updateCertificate(editing.id, fd);
      return adminService.createCertificate(fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.certificates });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success(editing ? "Certificate updated" : "Certificate created");
      setShowForm(false);
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteCertificate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.certificates });
      toast.success("Certificate deleted");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  return (
    <AdminLayout title="Certificates">
      <div className="mb-6 flex justify-end">
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add certificate</Button>
      </div>
      {showForm && (
        <Card className="mb-8 max-w-lg">
          <form onSubmit={handleSubmit((v) => saveMutation.mutate(v))} className="space-y-4" noValidate>
            <Input id="name" label="Name" error={errors.name?.message} {...register("name")} />
            <Input id="issuer" label="Issuer" error={errors.issuer?.message} {...register("issuer")} />
            <Input id="issueDate" label="Issue date" type="date" error={errors.issueDate?.message} {...register("issueDate")} />
            <Input id="externalUrl" label="External URL" {...register("externalUrl")} />
            <Input
              id="sortOrder"
              label="Sort order"
              type="number"
              min={0}
              step={1}
              error={errors.sortOrder?.message}
              {...register("sortOrder")}
            />
            <div>
              <label className="text-sm font-medium">File (image or PDF)</label>
              <input type="file" accept="image/*,.pdf" className="mt-1 block w-full text-sm" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" isLoading={isSubmitting || saveMutation.isPending}>Save</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}
      {isLoading && <Skeleton className="h-40" />}
      {!isLoading && certs.length === 0 && <EmptyState />}
      <div className="space-y-3">
        {certs.map((c) => (
          <Card key={c.id} className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{c.name}</h3>
              <p className="text-sm text-muted">{c.issuer} — {formatDate(c.issueDate)}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="danger" size="sm" onClick={() => confirm("Delete?") && deleteMutation.mutate(c.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
