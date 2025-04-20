import CategoryCard from "@/components/categories/CategoryCard";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SearchButton from "@/components/search/SearchButton";
import { IconButton } from "@mui/material";
import { Category } from "@/lib/types/Category";
import SelectedSuperMarkets from "@/components/supermarkets/SelectedSuperMarkets";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const Home: React.FC = async () => {
  const supabase = createClient();

  let { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (!categories) return <h1>Error fetching categories</h1>;
  return (
    <>
      <header className="flex items-center justify-between gap-2 mb-2">
        <Link href="/account">
          <IconButton>
            <UserCircleIcon className="text-black" width="32px" height="32px" />
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
    </>
  );
};

export default Home;
