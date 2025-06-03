import { z } from "zod";

export const userPreferencesSchema = z.object({
  selected_supermarkets: z.array(z.number()),
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;
