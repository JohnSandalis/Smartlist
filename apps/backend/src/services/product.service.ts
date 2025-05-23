import supabase from "../utils/supabase";
import { Product } from "@smartlist/types";

export const fetchProducts = async (
  subSubCategoryUuids: string[],
  start: number,
  end: number
): Promise<{
  products: Product[];
} | null> => {
  const productsRes = await supabase
    .from("products")
    .select(
      `
      barcode,
      name,
      image,
      category,
      supplier:suppliers!products_supplier_fkey (
        name
      ),
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
    .range(start, end);

  if (productsRes.error || !productsRes.data) return null;

  return {
    products: productsRes.data.map((p) => ({
      ...p,
      supplier: Array.isArray(p.supplier) ? p.supplier[0] : p.supplier,
    })) as Product[],
  };
};

export const fetchProductsByBarcodes = async (
  barcodes: string[]
): Promise<{
  products: Product[];
} | null> => {
  const productsRes = await supabase
    .from("products")
    .select(
      `
      barcode,
      name,
      image,
      category,
      supplier:suppliers (
        name
      ),
      prices (
        barcode,
        merchant_uuid,
        price,
        price_normalized,
        date,
        unit
      )
    `
    )
    .in("barcode", barcodes);

  if (productsRes.error || !productsRes.data) return null;

  return {
    products: productsRes.data.map((p) => ({
      ...p,
      supplier: Array.isArray(p.supplier) ? p.supplier[0] : p.supplier,
    })) as Product[],
  };
};
