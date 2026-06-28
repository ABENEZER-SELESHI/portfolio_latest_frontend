import { z } from "zod";

export const certificateFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  issuer: z.string().min(2, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  externalUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int("Sort order must be a whole number"),
});

export type CertificateFormValues = z.output<typeof certificateFormSchema>;
