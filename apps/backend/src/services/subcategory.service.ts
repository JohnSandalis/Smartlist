import supabase from "../utils/supabase";

export const fetchSubcategories = async () => {
  const subcategoriesRes = await supabase.from("sub_categories").select("*");

  if (subcategoriesRes.error) return null;

  return {
    subcategories: subcategoriesRes.data,
  };
};
