import { z } from "zod";

export const techFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  proficiency: z.number().int().min(0).max(100).optional(),
  sortOrder: z.number().int(),
});

export type TechFormValues = z.infer<typeof techFormSchema>;
