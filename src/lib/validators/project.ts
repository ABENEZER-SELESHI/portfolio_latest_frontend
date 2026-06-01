import { z } from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(2, "Title is required").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.string().min(1, "Add at least one technology"),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  isFeatured: z.boolean(),
  completedAt: z.string().optional(),
  sortOrder: z.number().int(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
