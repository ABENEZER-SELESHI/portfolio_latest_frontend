import { z } from "zod";

export const techFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  proficiency: z.coerce.number().int().min(0).max(100).optional(),
  sortOrder: z.coerce.number().int("Sort order must be a whole number"),
});

export type TechFormValues = z.infer<typeof techFormSchema>;
