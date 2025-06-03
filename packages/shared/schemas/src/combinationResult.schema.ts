import { z } from "zod";

export const combinationResultSchema = z.record(z.any()).and(
  z.object({
    supermarkets: z.array(z.number()),
    total: z.number(),
  })
);

export type CombinationResult = z.infer<typeof combinationResultSchema>;
