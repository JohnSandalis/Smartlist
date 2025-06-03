import baseAPI from "@/lib/api/baseAPI";
import {
  categorySchema,
  type Category,
  categoriesSchema,
  type Categories,
  subCategorySchema,
  type SubCategory,
  subCategoriesSchema,
  type SubCategories,
} from "@smartlist/schemas";

export async function fetchCategories(
  options?: RequestInit
): Promise<Categories> {
  return baseAPI<Categories>(`/categories`, categoriesSchema).get(options);
}

export async function fetchCategory(
  category_uuid: number,
  options?: RequestInit
): Promise<Category> {
  return baseAPI<Category>(`/categories/${category_uuid}`, categorySchema).get(
    options
  );
}

export async function fetchSubcategories(
  options?: RequestInit
): Promise<SubCategories> {
  return baseAPI<SubCategories>(`/subcategories`, subCategoriesSchema).get(
    options
  );
}
