import { apiClient, unwrap } from "./api-client";
import type {
  Certificate,
  ContactMessage,
  DashboardStats,
  Project,
  SiteSettings,
  SkillsResponse,
  TechStackItem,
} from "@/types";

export const adminService = {
  getDashboard: () => unwrap<DashboardStats>(apiClient.get("/admin/dashboard")),
  updateSite: (formData: FormData) =>
    unwrap<SiteSettings>(
      apiClient.patch("/admin/site", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  uploadResume: (formData: FormData) =>
    unwrap<SiteSettings>(
      apiClient.post("/admin/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  deleteResume: () => unwrap<null>(apiClient.delete("/admin/resume")),

  getProjects: () => unwrap<Project[]>(apiClient.get("/projects")),
  createProject: (formData: FormData) =>
    unwrap<Project>(
      apiClient.post("/admin/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  updateProject: (id: string, formData: FormData) =>
    unwrap<Project>(
      apiClient.patch(`/admin/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  deleteProject: (id: string) => unwrap<null>(apiClient.delete(`/admin/projects/${id}`)),

  getCertificates: () => unwrap<Certificate[]>(apiClient.get("/certificates")),
  createCertificate: (formData: FormData) =>
    unwrap<Certificate>(
      apiClient.post("/admin/certificates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  updateCertificate: (id: string, formData: FormData) =>
    unwrap<Certificate>(
      apiClient.patch(`/admin/certificates/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  deleteCertificate: (id: string) =>
    unwrap<null>(apiClient.delete(`/admin/certificates/${id}`)),

  getSkills: () => unwrap<SkillsResponse>(apiClient.get("/admin/skills")),
  createCategory: (data: { name: string; sortOrder?: number }) =>
    unwrap(apiClient.post("/admin/skills/categories", data)),
  updateCategory: (id: string, data: { name?: string; sortOrder?: number }) =>
    unwrap(apiClient.patch(`/admin/skills/categories/${id}`, data)),
  deleteCategory: (id: string) =>
    unwrap<null>(apiClient.delete(`/admin/skills/categories/${id}`)),
  createSkill: (data: { categoryId: string; name: string; sortOrder?: number }) =>
    unwrap(apiClient.post("/admin/skills", data)),
  updateSkill: (id: string, data: { name?: string; sortOrder?: number; categoryId?: string }) =>
    unwrap(apiClient.patch(`/admin/skills/${id}`, data)),
  deleteSkill: (id: string) => unwrap<null>(apiClient.delete(`/admin/skills/${id}`)),

  getTechStack: () => unwrap<TechStackItem[]>(apiClient.get("/tech-stack")),
  createTech: (formData: FormData) =>
    unwrap<TechStackItem>(
      apiClient.post("/admin/tech-stack", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  updateTech: (id: string, formData: FormData) =>
    unwrap<TechStackItem>(
      apiClient.patch(`/admin/tech-stack/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  deleteTech: (id: string) => unwrap<null>(apiClient.delete(`/admin/tech-stack/${id}`)),

  getMessages: () => unwrap<ContactMessage[]>(apiClient.get("/admin/contact-messages")),
  markMessageRead: (id: string) =>
    unwrap<ContactMessage>(apiClient.patch(`/admin/contact-messages/${id}/read`)),
  deleteMessage: (id: string) =>
    unwrap<null>(apiClient.delete(`/admin/contact-messages/${id}`)),
};
