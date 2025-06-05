import supabase from "../utils/supabase";

class UserPreferencesServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserPreferencesServiceError";
  }
}

export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("selected_supermarkets")
    .eq("user_id", userId)
    .single();
  if (error) {
    throw new UserPreferencesServiceError(
      `Failed to fetch user preferences: ${error.message}`
    );
  }
  return data;
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
  if (error) {
    throw new UserPreferencesServiceError(
      `Failed to upsert user preferences: ${error.message}`
    );
  }
}
