export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors: string[];
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SiteSettings {
  heroName: string;
  heroTitle: string;
  heroIntro: string;
  aboutBio: string;
  profileImageUrl: string | null;
  linkedinUrl: string;
  githubUrl: string;
  contactEmail: string;
  resumeUrl?: string | null;
  resumeFilename?: string | null;
}

export interface Skill {
  id: string;
  name: string;
  sortOrder: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  sortOrder: number;
  skills: Skill[];
}

export interface SkillsResponse {
  categories: SkillCategory[];
}

export interface TechStackItem {
  id: string;
  name: string;
  logoUrl: string | null;
  proficiency: number | null;
  sortOrder: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  screenshotUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  category: string | null;
  isFeatured: boolean;
  completedAt: string | null;
  sortOrder: number;
  technologies: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  fileUrl: string | null;
  fileType: "image" | "pdf" | null;
  externalUrl: string | null;
  sortOrder: number;
}

export interface ResumeInfo {
  filename: string | null;
  downloadUrl: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalCertificates: number;
  totalSkills: number;
  unreadMessages: number;
  lastUpdated: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  submittedAt: string;
}
