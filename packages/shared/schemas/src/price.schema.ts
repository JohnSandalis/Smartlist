import { z } from "zod";

export const priceSchema = z.object({
  barcode: z.string().optional(),
  merchant_uuid: z.number().int(),
  price: z.number().positive(),
  price_normalized: z.number(),
  date: z.string(),
  unit: z.string().max(255).min(1),
});
export const pricesSchema = z.array(priceSchema);

export type Price = z.infer<typeof priceSchema>;
export type Prices = z.infer<typeof pricesSchema>;
