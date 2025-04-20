// app/category/[slug]/page.tsx
import { createClient } from "@/utils/supabase/server";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = createClient();
  const category_uuid = parseInt(params.slug);

  // Get category details
  const { data: categories } = await supabase.from("categories").select("*");

  const category = categories?.find((c) => c.uuid === category_uuid);

  // Get subcategories of this category
  const { data: subcategories } = await supabase
    .from("sub_categories")
    .select("*")
    .eq("category_uuid", category_uuid);

  return (
    <CategoryPageClient
      category={category}
      subcategories={subcategories ?? []}
    />
  );
}
