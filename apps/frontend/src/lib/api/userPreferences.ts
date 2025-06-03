import baseAPI from "@/lib/api/baseAPI";
import {
  userPreferencesSchema,
  type UserPreferences,
} from "@smartlist/schemas";

export async function fetchUserPreferences(
  options?: RequestInit
): Promise<UserPreferences> {
  return baseAPI<UserPreferences>(
    `/user-preferences`,
    userPreferencesSchema
  ).get(options);
}

export async function updateUserPreferences(
  selectedSupermarkets: number[],
  options?: RequestInit
): Promise<void> {
  return baseAPI<void>(`/user-preferences`).put(
    { selected_supermarkets: selectedSupermarkets },
    options
  );
}
