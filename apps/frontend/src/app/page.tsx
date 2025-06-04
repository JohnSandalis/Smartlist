import CategoryCard from "@/components/categories/CategoryCard";
import { type Category } from "@smartlist/schemas";
import SelectedSuperMarkets from "@/components/supermarkets/SelectedSuperMarkets";
import { fetchCategories } from "@/lib/api/categories";

const Home = async () => {
  try {
    const categories = await fetchCategories({
      cache: "force-cache",
    });

    return (
      <>
        <SelectedSuperMarkets />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-20 container-default">
          {categories.map((category: Category) => (
            <CategoryCard key={category.uuid} category={category} />
          ))}
        </div>
      </>
    );
  } catch (err) {
    console.error("Failed to render Home:", err);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-center">
          Failed to load categories.
          <br />
          Please try again later.
        </p>
      </div>
    );
  }
};

export default Home;
