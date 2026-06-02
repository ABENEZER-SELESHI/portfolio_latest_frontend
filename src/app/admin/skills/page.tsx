"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { AdminLayout } from "@/layouts/admin-layout";
import { useAdminSkills, queryKeys } from "@/hooks/queries";
import { adminService } from "@/services/admin.service";
import { categoryFormSchema, skillFormSchema, type CategoryFormValues, type SkillFormValues } from "@/lib/validators/skill";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/format";

export default function AdminSkillsPage() {
  const toast = useToast();
  const qc = useQueryClient();
  const { data, isLoading } = useAdminSkills();
  const categories = data?.categories ?? [];
  const [showCategory, setShowCategory] = useState(false);
  const [showSkill, setShowSkill] = useState(false);

  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { sortOrder: 0 },
  });

  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: { sortOrder: 0 },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: queryKeys.adminSkills });
    qc.invalidateQueries({ queryKey: queryKeys.skills });
    qc.invalidateQueries({ queryKey: queryKeys.dashboard });
  };

  const createCategory = useMutation({
    mutationFn: adminService.createCategory,
    onSuccess: () => { invalidate(); toast.success("Category created"); setShowCategory(false); categoryForm.reset(); },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const createSkill = useMutation({
    mutationFn: adminService.createSkill,
    onSuccess: () => { invalidate(); toast.success("Skill created"); setShowSkill(false); skillForm.reset(); },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const deleteCategory = useMutation({
    mutationFn: adminService.deleteCategory,
    onSuccess: () => { invalidate(); toast.success("Category deleted"); },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  const deleteSkill = useMutation({
    mutationFn: adminService.deleteSkill,
    onSuccess: () => { invalidate(); toast.success("Skill deleted"); },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  });

  return (
    <AdminLayout title="Skills">
      <div className="mb-6 flex flex-wrap gap-2">
        <Button onClick={() => setShowCategory(true)}><Plus className="h-4 w-4" /> Category</Button>
        <Button variant="secondary" onClick={() => setShowSkill(true)}><Plus className="h-4 w-4" /> Skill</Button>
      </div>

      {showCategory && (
        <Card className="mb-6 max-w-md">
          <form onSubmit={categoryForm.handleSubmit((v) => createCategory.mutate(v))} className="space-y-3">
            <Input label="Category name" error={categoryForm.formState.errors.name?.message} {...categoryForm.register("name")} />
            <Input label="Sort order" type="number" {...categoryForm.register("sortOrder")} />
            <div className="flex gap-2">
              <Button type="submit" isLoading={createCategory.isPending}>Save</Button>
              <Button type="button" variant="secondary" onClick={() => setShowCategory(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {showSkill && (
        <Card className="mb-6 max-w-md">
          <form onSubmit={skillForm.handleSubmit((v) => createSkill.mutate(v))} className="space-y-3">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm" {...skillForm.register("categoryId")}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {skillForm.formState.errors.categoryId && (
                <p className="text-xs text-destructive mt-1">{skillForm.formState.errors.categoryId.message}</p>
              )}
            </div>
            <Input label="Skill name" error={skillForm.formState.errors.name?.message} {...skillForm.register("name")} />
            <Input label="Sort order" type="number" {...skillForm.register("sortOrder")} />
            <div className="flex gap-2">
              <Button type="submit" isLoading={createSkill.isPending}>Save</Button>
              <Button type="button" variant="secondary" onClick={() => setShowSkill(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {isLoading && <Skeleton className="h-48" />}
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">{cat.name}</h3>
              <Button variant="danger" size="sm" onClick={() => confirm("Delete category and skills?") && deleteCategory.mutate(cat.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-1">
              {cat.skills.map((s) => (
                <li key={s.id} className="flex justify-between text-sm text-muted">
                  <span>{s.name}</span>
                  <button type="button" className="text-destructive hover:underline" onClick={() => deleteSkill.mutate(s.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
