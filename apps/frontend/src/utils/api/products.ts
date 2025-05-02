import { createClient } from "../supabase/client";

export const fetchSubSubCategoryUuids = async (
  supabase: ReturnType<typeof createClient>,
  subCategoryId: string
): Promise<string[]> => {
  const { data, error } = await supabase
    .from("sub_sub_categories")
    .select("uuid")
    .eq("sub_category_uuid", subCategoryId);

  if (error) {
    console.error("Failed to fetch sub-sub-categories", error);
    return [];
  }

  return data?.map((item) => item.uuid.toString()) || [];
};

export const fetchProducts = async (
  supabase: ReturnType<typeof createClient>,
  subSubCategoryUuids: string[],
  start: number,
  end: number
) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        barcode,
        name,
        image,
        category,
        supplier:suppliers (name),
        prices (
          merchant_uuid,
          price,
          price_normalized,
          date,
          unit
        )
      `
    )
    .overlaps("category", subSubCategoryUuids)
    .order("barcode")
    .range(start, end);

  if (error) {
    console.error("Failed to fetch products", error);
    return [];
  }

  return data || [];
};
