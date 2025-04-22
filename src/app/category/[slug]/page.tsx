// app/category/[slug]/page.tsx
import { createClient } from "@/utils/supabase/server";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = createClient();
  const category_uuid = parseInt(params.slug);

  const [categoryData, subcategoriesData] = await Promise.all([
    supabase.from("categories").select("*").eq("uuid", category_uuid).single(),
    supabase.from("sub_categories").select("*"),
  ]);

  if (!categoryData.data || !subcategoriesData.data) {
    throw new Error("Failed to fetch category data");
  }

  return (
    <CategoryPageClient
      category={categoryData.data}
      subcategories={subcategoriesData.data ?? []}
    />
  );
}
