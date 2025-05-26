import supabase from "../utils/supabase";
import { Category } from "@smartlist/types";

export const fetchCategories = async (): Promise<{
  categories: Category[];
} | null> => {
  const categoriesRes = await supabase.from("categories").select("*");

  if (categoriesRes.error) return null;

  return {
    categories: categoriesRes.data as Category[],
  };
};

export const fetchCategory = async (
  uuid: number
): Promise<{ category: Category } | null> => {
  const categoryRes = await supabase
    .from("categories")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (categoryRes.error) return null;

  return {
    category: categoryRes.data as Category,
  };
};
