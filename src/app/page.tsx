'use client'
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import CategoryCard from "@/components/categories/CategoryCard";
import SuperMarketsList from "@/components/supermarkets/SuperMarketList";
import { supermarkets } from "@/lib/data/supermarkets";
import { categories } from "@/lib/data/categories";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SearchButton from "@/components/search/SearchButton";
import { IconButton } from "@mui/material";
import { ShoppingCartItem } from "@/lib/types/ShoppingCartItem";
import { Category } from "@/lib/types/Category";

export const shoppingListAtom = atom<ShoppingCartItem[]>([]);
export const superMarketsListAtom = atom<string[]>([]);

const Home: React.FC = () => {
  const [superMarketsList] = useAtom(superMarketsListAtom);
  const [superMarketsListOpen, setSuperMarketsListOpen] = useState<boolean>(
    superMarketsList.length === 0
  );

  return (
    <>
      <header>
        <div className="flex items-center justify-between gap-2">
          <IconButton
          >
            <UserCircleIcon className="text-black" width="32px" height="32px" />
          </IconButton>
          <SearchButton />
        </div>
      </header>
      <button
        className="w-full bg-white rounded-md mb-2 p-3 flex items-center justify-between gap-2"
        onClick={() => setSuperMarketsListOpen(true)}
      >
        <div className="flex flex-col gap-2 text-start">
          <h2 className="text-md font-medium text-gray-900 leading-tight">
            Επιλεγμένα Super Markets
          </h2>
          <div className="flex items-center gap-2">
            {superMarketsList.map((supermarket) => (
              <div
                key={supermarket}
                className="flex items-center justify-center w-9 h-9"
              >
                <Image
                  src={supermarkets[supermarket].image_url}
                  alt={supermarkets[supermarket].store_name}
                  width="225"
                  height="225"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))}
          </div>
          {superMarketsList.length === 0 && (
            <p className="text-sm text-gray-600">
              Επίλεξε τα super market που σε εξυπηρετούν καλύτερα.
            </p>
          )}
        </div>
        <ChevronDownIcon className="w-6 h-6" />
      </button>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <SuperMarketsList
        open={superMarketsListOpen}
        setOpen={setSuperMarketsListOpen}
      />
    </>
  );
};

export default Home;
