import { z } from "zod";

const shoppingListItemSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const saveShoppingListSchema = z.object({
  body: z.object({
    listId: z.string().uuid("Invalid list ID format").nullish(),
    items: z
      .array(shoppingListItemSchema)
      .min(1, "At least one item is required"),
  }),
});

export type ShoppingListItem = z.infer<typeof shoppingListItemSchema>;
