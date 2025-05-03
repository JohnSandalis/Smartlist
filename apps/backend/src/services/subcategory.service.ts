import supabase from "../utils/supabase";
import { SubCategory } from "@smartlist/types";

export const fetchSubcategories = async (): Promise<{
  subcategories: SubCategory[];
} | null> => {
  const subcategoriesRes = await supabase.from("sub_categories").select("*");

  if (subcategoriesRes.error) return null;

  return {
    subcategories: subcategoriesRes.data as SubCategory[],
  };
};
