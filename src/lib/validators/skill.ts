import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name is required"),
  sortOrder: z.number().int(),
});

export const skillFormSchema = z.object({
  categoryId: z.string().uuid("Select a category"),
  name: z.string().min(1, "Skill name is required"),
  sortOrder: z.number().int(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
export type SkillFormValues = z.infer<typeof skillFormSchema>;
