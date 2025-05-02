import supabase from "../utils/supabase";

export const fetchCategories = async () => {
  const categoriesRes = await supabase.from("categories").select("*");

  if (categoriesRes.error) return null;

  return {
    categories: categoriesRes.data,
  };
};

export const fetchCategory = async (uuid: number) => {
  const categoryRes = await supabase
    .from("categories")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (categoryRes.error) return null;

  return {
    category: categoryRes.data,
  };
};
