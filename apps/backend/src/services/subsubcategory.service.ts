import supabase from "../utils/supabase";

export const fetchSubSubCategoryUuids = async (
  subCategoryId: string
): Promise<string[] | null> => {
  const subcategoriesRes = await supabase
    .from("sub_sub_categories")
    .select("uuid")
    .eq("sub_category_uuid", subCategoryId);

  if (subcategoriesRes.error) return null;

  return subcategoriesRes.data.map((item) => item.uuid.toString());
};
