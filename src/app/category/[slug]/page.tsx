// app/category/[slug]/page.tsx
import { createClient } from "@/utils/supabase/server";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = createClient();
  const category_id = params.slug;

  // Get category details
  const { data: categories } = await supabase.from("categories").select("*");

  const category = categories?.find((c) => c.id === category_id);

  // Get subcategories of this category
  const { data: subcategories } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", category_id);

  return (
    <CategoryPageClient
      category={category}
      subcategories={subcategories ?? []}
    />
  );
}
