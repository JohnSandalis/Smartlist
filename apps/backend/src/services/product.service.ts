import supabase from "../utils/supabase";
import { Product } from "@smartlist/types";

class ProductServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProductServiceError";
  }
}

export const fetchProducts = async (
  subSubCategoryUuids: string[],
  start: number,
  end: number
): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
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

    if (error) {
      throw new ProductServiceError(
        `Failed to fetch products: ${error.message}`
      );
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((p) => ({
      ...p,
      supplier: Array.isArray(p.supplier) ? p.supplier[0] : p.supplier,
    })) as Product[];
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError(
      "An unexpected error occurred while fetching products"
    );
  }
};

export const fetchProductsByBarcodes = async (
  barcodes: string[]
): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
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

    if (error) {
      throw new ProductServiceError(
        `Failed to fetch products by barcodes: ${error.message}`
      );
    }

    if (!data || data.length === 0) {
      throw new ProductServiceError("No products found for the given barcodes");
    }

    return data.map((p) => ({
      ...p,
      supplier: Array.isArray(p.supplier) ? p.supplier[0] : p.supplier,
    })) as Product[];
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError(
      "An unexpected error occurred while fetching products by barcodes"
    );
  }
};

export const searchProductsService = async (
  query: string
): Promise<Product[]> => {
  try {
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
      .ilike("name", `%${query}%`)
      .limit(10);

    if (error) {
      throw new ProductServiceError(
        `Failed to search products: ${error.message}`
      );
    }

    if (!data) {
      return [];
    }

    return data.map((p) => ({
      ...p,
      supplier: Array.isArray(p.supplier) ? p.supplier[0] : p.supplier,
    })) as Product[];
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError(
      "An unexpected error occurred while searching products"
    );
  }
};

export const fetchProductByBarcode = async (
  barcode: string
): Promise<Product> => {
  try {
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
        )`
      )
      .eq("barcode", barcode)
      .single();

    if (error) {
      throw new ProductServiceError(
        `Failed to fetch product by barcode: ${error.message}`
      );
    }

    if (!data) {
      throw new ProductServiceError("No product found for the given barcode");
    }

    return {
      ...data,
      supplier: Array.isArray(data.supplier) ? data.supplier[0] : data.supplier,
    } as Product;
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError(
      "An unexpected error occurred while fetching product by barcode"
    );
  }
};
