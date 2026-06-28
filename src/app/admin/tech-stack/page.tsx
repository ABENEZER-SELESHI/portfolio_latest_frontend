"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { AdminLayout } from "@/layouts/admin-layout";
import { queryKeys } from "@/hooks/queries";
import { adminService } from "@/services/admin.service";
import { techFormSchema, type TechFormValues } from "@/lib/validators/tech";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/format";

export default function AdminTechStackPage() {
  const toast = useToast();
  const qc = useQueryClient();
  const [logo, setLogo] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: queryKeys.techStack,
    queryFn: () => adminService.getTechStack(),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TechFormValues>({
    resolver: zodResolver(techFormSchema),
    defaultValues: { sortOrder: 0, proficiency: 80 },
  });

  const createMutation = useMutation({
    mutationFn: async (values: TechFormValues) => {
      const fd = new FormData();
      fd.append("name", values.name);
      if (values.proficiency != null) fd.append("proficiency", String(values.proficiency));
      fd.append("sortOrder", String(values.sortOrder));
      if (logo) fd.append("logo", logo);
      return adminService.createTech(fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.techStack });
      toast.success("Tech item added");
      setShowForm(false);
      reset();
      setLogo(null);
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteTech,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.techStack });
      toast.success("Removed");
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  return (
    <AdminLayout title="Skills">
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4" /> Add skill</Button>
      </div>
      {showForm && (
        <Card className="mb-6 max-w-md">
          <form onSubmit={handleSubmit((v) => createMutation.mutate(v))} className="space-y-4">
            <Input label="Name" error={errors.name?.message} {...register("name")} />
            <Input label="Proficiency %" type="number" min={0} max={100} {...register("proficiency")} />
            <Input label="Sort order" type="number" {...register("sortOrder")} />
            <div>
              <label className="text-sm font-medium">Logo</label>
              <input type="file" accept="image/*" className="mt-1 block w-full text-sm" onChange={(e) => setLogo(e.target.files?.[0] ?? null)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" isLoading={isSubmitting || createMutation.isPending}>Save</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}
      {isLoading && <Skeleton className="h-32" />}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              {item.proficiency != null && <p className="text-sm text-muted">{item.proficiency}%</p>}
            </div>
            <Button variant="danger" size="sm" onClick={() => confirm("Delete?") && deleteMutation.mutate(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
