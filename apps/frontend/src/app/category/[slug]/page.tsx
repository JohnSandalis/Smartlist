import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";
import { type Category } from "@smartlist/schemas";
import {
  fetchCategories,
  fetchCategory,
  fetchSubcategories,
} from "@/lib/api/categories";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = await fetchCategories();

  return categories.map((category: Category) => ({
    slug: category.uuid.toString(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const category_uuid = Number(params.slug);
    if (isNaN(category_uuid)) return notFound();

    const [category, subcategories] = await Promise.all([
      fetchCategory(category_uuid, {
        cache: "force-cache",
      }),
      fetchSubcategories({
        cache: "force-cache",
      }),
    ]);

    return (
      <CategoryPageClient
        category={category}
        subcategories={subcategories ?? []}
      />
    );
  } catch (err) {
    console.error("Failed to render CategoryPage:", err);
    return notFound();
  }
}
