import baseAPI from "@/lib/api/baseAPI";
import { shoppingListSchema, type ShoppingList } from "@smartlist/schemas";

export async function fetchShoppingList(
  options?: RequestInit
): Promise<ShoppingList> {
  return baseAPI<ShoppingList>(`/shopping-lists`, shoppingListSchema).get(
    options
  );
}

export async function saveShoppingList(
  items: ShoppingList["items"],
  listId: string | null,
  options?: RequestInit
): Promise<{ id?: string }> {
  return baseAPI<{ id?: string }>(`/shopping-lists`).post(
    { items, listId },
    options
  );
}
