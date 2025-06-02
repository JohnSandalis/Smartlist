import { z } from "zod";

export const supermarketSchema = z.object({
  merchant_uuid: z.number().int(),
  image: z.string().url(),
  name: z.string().max(255).min(1),
  display_name: z.string().max(255).min(1),
});
export const supermarketsSchema = z.array(supermarketSchema);

export type Supermarket = z.infer<typeof supermarketSchema>;
export type Supermarkets = z.infer<typeof supermarketsSchema>;
