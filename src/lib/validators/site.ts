import { z } from "zod";

export const siteFormSchema = z.object({
  heroName: z.string().min(2, "Name is required"),
  heroTitle: z.string().min(2, "Title is required"),
  heroIntro: z.string().min(10, "Intro must be at least 10 characters"),
  aboutBio: z.string().min(10, "Bio must be at least 10 characters"),
  linkedinUrl: z.string().url("Enter a valid LinkedIn URL"),
  githubUrl: z.string().url("Enter a valid GitHub URL"),
  contactEmail: z.string().email("Enter a valid contact email"),
});

export type SiteFormValues = z.infer<typeof siteFormSchema>;
