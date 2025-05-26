import supabase from "../utils/supabase";

export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("selected_supermarkets")
    .eq("user_id", userId)
    .single();
  return { data, error };
}

export async function upsertUserPreferences(
  userId: string,
  selectedSupermarkets: number[]
) {
  const { error } = await supabase.from("user_preferences").upsert(
    {
      user_id: userId,
      selected_supermarkets: selectedSupermarkets,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );
  return { error };
}
