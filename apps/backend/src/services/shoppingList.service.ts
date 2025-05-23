import supabase from "../utils/supabase";

export async function fetchLatestShoppingList(userId: string) {
  return await supabase
    .from("shopping_lists")
    .select("id, items")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();
}

export async function updateShoppingList(listId: string, items: any[]) {
  return await supabase
    .from("shopping_lists")
    .update({ items, updated_at: new Date().toISOString() })
    .eq("id", listId);
}

export async function createShoppingList(userId: string, items: any[]) {
  return await supabase
    .from("shopping_lists")
    .insert({
      user_id: userId,
      name: "My Shopping List",
      items,
    })
    .select()
    .single();
}
