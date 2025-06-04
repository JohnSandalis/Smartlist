import baseAPI from "@/lib/api/baseAPI";
import { productsSchema, type Products } from "@smartlist/schemas";

type FetchProductsByCategoryParams = {
  categoryId: number;
  start: number;
  end: number;
};

type FetchProductsParams = {
  subCategoryId: number;
  start: number;
  end: number;
};

export async function fetchProductsByCategory(
  { categoryId, start, end }: FetchProductsByCategoryParams,
  options?: RequestInit
): Promise<Products> {
  const query = new URLSearchParams({
    categoryId: String(categoryId),
    start: String(start),
    end: String(end),
  }).toString();

  const url = `/products/by-category?${query}`;

  return baseAPI<Products>(url, productsSchema).get(options);
}

export async function fetchProducts(
  { subCategoryId, start, end }: FetchProductsParams,
  options?: RequestInit
): Promise<Products> {
  const query = new URLSearchParams({
    subCategoryId: String(subCategoryId),
    start: String(start),
    end: String(end),
  }).toString();

  const url = `/products?${query}`;

  return baseAPI<Products>(url, productsSchema).get(options);
}

export async function searchProducts(query: string): Promise<Products> {
  const url = `/products/search?query=${encodeURIComponent(query)}`;
  return baseAPI<Products>(url, productsSchema).get();
}

export async function fetchProductsByBarcodes(
  barcodes: string[],
  options?: RequestInit
): Promise<Products> {
  const url = `/products/by-barcodes`;
  return baseAPI<Products>(url, productsSchema).post({ barcodes }, options);
}
