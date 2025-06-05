import { z } from "zod";

export const getCategorySchema = z.object({
  params: z.object({
    uuid: z
      .string()
      .transform(Number)
      .pipe(z.number().min(1, "Positive integer category id is required")),
  }),
});
