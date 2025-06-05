import supabase from "../utils/supabase";
import { SubCategory } from "@smartlist/types";

class SubcategoryServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SubcategoryServiceError";
  }
}

export const fetchSubcategories = async (): Promise<{
  subcategories: SubCategory[];
} | null> => {
  const subcategoriesRes = await supabase.from("sub_categories").select("*");

  if (subcategoriesRes.error) {
    throw new SubcategoryServiceError(
      `Failed to fetch subcategories: ${subcategoriesRes.error.message}`
    );
  }

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

  if (subcategoriesRes.error) {
    throw new SubcategoryServiceError(
      `Failed to fetch subcategories: ${subcategoriesRes.error.message}`
    );
  }

  return subcategoriesRes.data.map((item) => item.uuid.toString());
};
