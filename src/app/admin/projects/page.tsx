"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminLayout } from "@/layouts/admin-layout";
import { queryKeys } from "@/hooks/queries";
import { adminService } from "@/services/admin.service";
import { projectFormSchema, type ProjectFormValues } from "@/lib/validators/project";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage, formatDate } from "@/utils/format";
import { appendProjectFormData, parseTechnologiesInput } from "@/utils/form-data";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  const toast = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Project | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: queryKeys.projects(),
    queryFn: () => adminService.getProjects(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { isFeatured: false, sortOrder: 0, technologies: "" },
  });

  const openCreate = () => {
    setEditing(null);
    setScreenshot(null);
    reset({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      category: "",
      isFeatured: false,
      sortOrder: 0,
    });
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setScreenshot(null);
    reset({
      title: p.title,
      description: p.description,
      technologies: p.technologies.join(", "),
      liveUrl: p.liveUrl ?? "",
      githubUrl: p.githubUrl ?? "",
      category: p.category ?? "",
      isFeatured: p.isFeatured,
      completedAt: p.completedAt?.slice(0, 10) ?? "",
      sortOrder: p.sortOrder,
    });
    setShowForm(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      const fd = new FormData();
      appendProjectFormData(
        fd,
        {
          title: values.title,
          description: values.description,
          technologies: parseTechnologiesInput(values.technologies),
          liveUrl: values.liveUrl || undefined,
          githubUrl: values.githubUrl || undefined,
          category: values.category,
          isFeatured: values.isFeatured,
          completedAt: values.completedAt,
          sortOrder: values.sortOrder,
        },
        screenshot
      );
      if (editing) return adminService.updateProject(editing.id, fd);
      return adminService.createProject(fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects() });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success(editing ? "Project updated" : "Project created");
      setShowForm(false);
      setEditing(null);
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects() });
      toast.success("Project deleted");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  return (
    <AdminLayout title="Projects">
      <div className="mb-6 flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add project
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8 max-w-2xl">
          <h2 className="font-semibold mb-4">{editing ? "Edit project" : "New project"}</h2>
          <form onSubmit={handleSubmit((v) => saveMutation.mutate(v))} className="space-y-4" noValidate>
            <Input id="title" label="Title" error={errors.title?.message} {...register("title")} />
            <Textarea id="description" label="Description" error={errors.description?.message} {...register("description")} />
            <Input id="technologies" label="Technologies (comma-separated)" error={errors.technologies?.message} {...register("technologies")} />
            <Input id="category" label="Category" {...register("category")} />
            <Input id="liveUrl" label="Live URL" {...register("liveUrl")} />
            <Input id="githubUrl" label="GitHub URL" {...register("githubUrl")} />
            <Input id="completedAt" label="Completed date" type="date" {...register("completedAt")} />
            <Input
              id="sortOrder"
              label="Sort order"
              type="number"
              min={0}
              step={1}
              error={errors.sortOrder?.message}
              {...register("sortOrder", { valueAsNumber: true })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("isFeatured")} />
              Featured
            </label>
            <div>
              <label className="text-sm font-medium">Screenshot</label>
              <input type="file" accept="image/*" className="mt-1 block w-full text-sm" onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" isLoading={isSubmitting || saveMutation.isPending}>Save</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {isLoading && <Skeleton className="h-40 w-full" />}
      {!isLoading && projects.length === 0 && <EmptyState />}
      <div className="space-y-3">
        {projects.map((p) => (
          <Card key={p.id} className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-foreground">{p.title}</h3>
              <p className="text-sm text-muted line-clamp-1">{p.description}</p>
              {p.completedAt && <p className="text-xs text-muted mt-1">{formatDate(p.completedAt)}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => openEdit(p)} aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  if (confirm("Delete this project?")) deleteMutation.mutate(p.id);
                }}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
