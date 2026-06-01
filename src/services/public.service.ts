import { apiClient, unwrap } from "./api-client";
import type {
  Certificate,
  ContactPayload,
  Project,
  ResumeInfo,
  SiteSettings,
  SkillsResponse,
  TechStackItem,
} from "@/types";

export const publicService = {
  getSite: () => unwrap<SiteSettings>(apiClient.get("/site")),
  getSkills: () => unwrap<SkillsResponse>(apiClient.get("/skills")),
  getTechStack: () => unwrap<TechStackItem[]>(apiClient.get("/tech-stack")),
  getProjects: (params?: {
    category?: string;
    technology?: string;
    featured?: boolean;
  }) =>
    unwrap<Project[]>(
      apiClient.get("/projects", {
        params: {
          ...params,
          featured: params?.featured === undefined ? undefined : String(params.featured),
        },
      })
    ),
  getProject: (id: string) => unwrap<Project>(apiClient.get(`/projects/${id}`)),
  getCertificates: () => unwrap<Certificate[]>(apiClient.get("/certificates")),
  getResume: () => unwrap<ResumeInfo>(apiClient.get("/resume")),
  submitContact: (payload: ContactPayload) =>
    unwrap<null>(apiClient.post("/contact", payload)),
};
