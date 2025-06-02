import { z } from "zod";
import { pricesSchema } from "./price.schema";

export const productSchema = z.object({
  barcode: z.string(),
  name: z.string().max(255).min(1),
  image: z
    .string()
    .refine(
      (val) =>
        val === "/images/default_kalathi.png" || /^https?:\/\/.+\..+/.test(val),
      {
        message: "Must be a valid image URL or default image path",
      }
    ),
  category: z.array(z.string()),
  supplier: z.object({
    name: z.string().max(255).min(1),
  }),
  prices: pricesSchema,
});
export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
export type Products = z.infer<typeof productsSchema>;
