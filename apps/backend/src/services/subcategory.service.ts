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

export const fetchSubCategoryUuidsByCategory = async (
  categoryId: string
): Promise<string[] | null> => {
  const subcategoriesRes = await supabase
    .from("sub_categories")
    .select("uuid")
    .eq("category_uuid", categoryId);

  if (subcategoriesRes.error) return null;

  return subcategoriesRes.data.map((item) => item.uuid.toString());
};
