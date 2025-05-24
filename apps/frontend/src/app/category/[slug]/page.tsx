import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";
import { Category } from "@smartlist/types";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories for static generation");
  }

  const categories = await res.json();

  return categories.map((category: Category) => ({
    slug: category.uuid.toString(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const category_uuid = Number(params.slug);
    if (isNaN(category_uuid)) return notFound();

    const [categoryRes, subcategoriesRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category_uuid}`,
        {
          cache: "force-cache",
        }
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`, {
        cache: "force-cache",
      }),
    ]);

    if (!categoryRes.ok) throw new Error("Failed to fetch category");
    if (!subcategoriesRes.ok) throw new Error("Failed to fetch subcategories");

    const category = await categoryRes.json();
    const subcategories = await subcategoriesRes.json();

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
