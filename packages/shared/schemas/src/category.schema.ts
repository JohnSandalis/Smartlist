import { z } from "zod";

export const categorySchema = z.object({
  uuid: z.number().int(),
  name: z.string().max(255).min(1),
  image: z.string().url(),
});
export const categoriesSchema = z.array(categorySchema);

export const subCategorySchema = z.object({
  uuid: z.number().int(),
  name: z.string().max(255).min(1),
  category_uuid: z.number().int(),
});
export const subCategoriesSchema = z.array(subCategorySchema);

export const subSubCategorySchema = z.object({
  uuid: z.number().int(),
  name: z.string().max(255).min(1),
  sub_category_uuid: z.number().int(),
});
export const subSubCategoriesSchema = z.array(subSubCategorySchema);

export type Category = z.infer<typeof categorySchema>;
export type Categories = z.infer<typeof categoriesSchema>;

export type SubCategory = z.infer<typeof subCategorySchema>;
export type SubCategories = z.infer<typeof subCategoriesSchema>;

export type SubSubCategory = z.infer<typeof subSubCategorySchema>;
export type SubSubCategories = z.infer<typeof subSubCategoriesSchema>;
