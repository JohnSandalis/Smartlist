import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { slug: string };
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
