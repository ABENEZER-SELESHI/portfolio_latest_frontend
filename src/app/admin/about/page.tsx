"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/layouts/admin-layout";
import { useSite, queryKeys } from "@/hooks/queries";
import { siteFormSchema, type SiteFormValues } from "@/lib/validators/site";
import { adminService } from "@/services/admin.service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/format";
import { DEFAULT_SITE } from "@/constants";

export default function AdminAboutPage() {
  const { data, isLoading } = useSite();
  const toast = useToast();
  const qc = useQueryClient();
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SiteFormValues>({
    resolver: zodResolver(siteFormSchema),
  });

  useEffect(() => {
    const site = data ?? DEFAULT_SITE;
    reset({
      heroName: site.heroName,
      heroTitle: site.heroTitle,
      heroIntro: site.heroIntro,
      aboutBio: site.aboutBio,
      linkedinUrl: site.linkedinUrl,
      githubUrl: site.githubUrl,
      contactEmail: site.contactEmail,
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (values: SiteFormValues) => {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v));
      if (profileFile) fd.append("profileImage", profileFile);
      return adminService.updateSite(fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.site });
      toast.success("Site settings updated");
      setProfileFile(null);
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  if (isLoading) {
    return (
      <AdminLayout title="About / Site">
        <Skeleton className="h-96 w-full max-w-2xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="About / Site">
      <form
        onSubmit={handleSubmit((v) => mutation.mutate(v))}
        className="max-w-2xl space-y-4"
        noValidate
      >
        <Input id="heroName" label="Name" error={errors.heroName?.message} {...register("heroName")} />
        <Input id="heroTitle" label="Title" error={errors.heroTitle?.message} {...register("heroTitle")} />
        <Textarea id="heroIntro" label="Hero intro" error={errors.heroIntro?.message} {...register("heroIntro")} />
        <Textarea id="aboutBio" label="About bio" error={errors.aboutBio?.message} {...register("aboutBio")} />
        <Input id="linkedinUrl" label="LinkedIn URL" error={errors.linkedinUrl?.message} {...register("linkedinUrl")} />
        <Input id="githubUrl" label="GitHub URL" error={errors.githubUrl?.message} {...register("githubUrl")} />
        <Input id="contactEmail" label="Contact email" type="email" error={errors.contactEmail?.message} {...register("contactEmail")} />
        <div>
          <label className="text-sm font-medium text-foreground">Profile image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm text-muted"
            onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <Button type="submit" isLoading={isSubmitting || mutation.isPending}>
          Save changes
        </Button>
      </form>
    </AdminLayout>
  );
}
