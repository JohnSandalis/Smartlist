import dynamic from "next/dynamic";
import CategoryCard from "@/components/categories/CategoryCard";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SearchButton from "@/components/search/SearchButton";
import { IconButton } from "@mui/material";
import { Category } from "@smartlist/types";
import SelectedSuperMarkets from "@/components/supermarkets/SelectedSuperMarkets";
import Link from "next/link";
import Image from "next/image";

const ShoppingListButton = dynamic(
  () => import("@/components/list/ShoppingListButton"),
  { ssr: false }
);

const Home = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        cache: "force-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories: Category[] = await res.json();

    return (
      <>
        <header className="flex items-center justify-between gap-2 mb-2">
          <Link href="/account">
            <IconButton>
              <UserCircleIcon
                className="text-black"
                width="32px"
                height="32px"
              />
            </IconButton>
          </Link>
          <Image
            src="/images/smart-list-logo.png"
            alt="Smart list logo"
            width={144}
            height={35}
          />
          <SearchButton />
        </header>
        <SelectedSuperMarkets />
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category: Category) => (
            <CategoryCard key={category.uuid} category={category} />
          ))}
        </div>

        <ShoppingListButton />
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
