"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { publicService } from "@/services/public.service";
import { adminService } from "@/services/admin.service";

export const queryKeys = {
  site: ["site"] as const,
  skills: ["skills"] as const,
  techStack: ["tech-stack"] as const,
  projects: (params?: object) => ["projects", params] as const,
  certificates: ["certificates"] as const,
  resume: ["resume"] as const,
  dashboard: ["admin", "dashboard"] as const,
  adminSkills: ["admin", "skills"] as const,
  messages: ["admin", "messages"] as const,
};

export function useSite() {
  return useQuery({
    queryKey: queryKeys.site,
    queryFn: () => publicService.getSite(),
    staleTime: 5 * 60_000,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: queryKeys.skills,
    queryFn: () => publicService.getSkills(),
    staleTime: 5 * 60_000,
  });
}

export function useTechStack() {
  return useQuery({
    queryKey: queryKeys.techStack,
    queryFn: () => publicService.getTechStack(),
    staleTime: 5 * 60_000,
  });
}

export function useProjects(params?: {
  category?: string;
  technology?: string;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.projects(params),
    queryFn: () => publicService.getProjects(params),
    staleTime: 5 * 60_000,
  });
}

export function useCertificates() {
  return useQuery({
    queryKey: queryKeys.certificates,
    queryFn: () => publicService.getCertificates(),
    staleTime: 5 * 60_000,
  });
}

export function useResume() {
  return useQuery({
    queryKey: queryKeys.resume,
    queryFn: () => publicService.getResume(),
    staleTime: 5 * 60_000,
    retry: false,
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => adminService.getDashboard(),
  });
}

export function useAdminSkills() {
  return useQuery({
    queryKey: queryKeys.adminSkills,
    queryFn: () => adminService.getSkills(),
  });
}

export function useMessages() {
  return useQuery({
    queryKey: queryKeys.messages,
    queryFn: () => adminService.getMessages(),
  });
}

export function useContactMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: publicService.submitContact,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.dashboard }),
  });
}
