import { z } from "zod";
import { pricesSchema } from "./price.schema";

export const shoppingCartItemSchema = z.object({
  barcode: z.string(),
  name: z.string(),
  image: z.string(),
  category: z.array(z.string()),
  supplier: z.object({
    name: z.string(),
  }),
  quantity: z.number(),
  prices: pricesSchema,
});
export const shoppingCartItemsSchema = z.array(shoppingCartItemSchema);

export type ShoppingCartItem = z.infer<typeof shoppingCartItemSchema>;
export type ShoppingCartItems = z.infer<typeof shoppingCartItemsSchema>;

export const shoppingListSchema = z.object({
  id: z.string(),
  items: z.array(
    z.object({
      barcode: z.string(),
      quantity: z.number(),
    })
  ),
});

export type ShoppingList = z.infer<typeof shoppingListSchema>;
