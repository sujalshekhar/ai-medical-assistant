import { z } from "zod";

export const LabTestSchema = z.object({
  testName: z.string(),
  value: z.union([z.string(), z.number()]),
  unit: z.string().optional(),
  referenceRange: z.string().optional(),
  status: z.enum(["Normal", "High", "Low", "Critical", "Unknown"]),
});

export const LabReportSchema = z.object({
  tests: z.array(LabTestSchema),
});
