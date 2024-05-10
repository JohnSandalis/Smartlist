'use client'
import getSupermarketSplit from "@/utils/supermarketSplit";
import { superMarketsListAtom, shoppingListAtom } from "@/app/page";
import { useAtom } from "jotai";
import SupermarketCombCard from "@/components/list/SuperMarketCombCard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Icon, IconButton } from "@mui/material";
import { useRouter } from 'next/navigation'

export default function List() {
  const [shoppingList] = useAtom(shoppingListAtom);
  const [superMarketsList] = useAtom(superMarketsListAtom);
  const router = useRouter()

  const combinations = getSupermarketSplit(shoppingList);
  const sortedCombinations = combinations.sort((a, b) => a.total - b.total);
  const filteredCombinations =
    sortedCombinations.filter((combination) =>
      combination.supermarkets.every((sm) => superMarketsList.includes(sm))
    ) || [];
  const excludedCombinations =
    sortedCombinations.filter((combination) =>
      combination.supermarkets.some((sm) => !superMarketsList.includes(sm))
    ) || [];

  return (
    <>
      <div className="w-full">
        <IconButton onClick={() => router.back()}><ArrowLeftIcon width="24px" height="24px" /></IconButton>
      </div>
      <h1 className="text-center page-title mb-4">Φθηνότερα Super Market</h1>
      <div className="grid grid-cols-1 gap-2">
        {filteredCombinations.map((combination, index) => (
          <SupermarketCombCard
            key={"sm-card-" + index}
            combination={combination}
            combinationIndex={index}
          />
        ))}
        {excludedCombinations && excludedCombinations.length > 0 && (
          <hr className="my-6" />
        )}
        {excludedCombinations.map((combination, index) => (
          <SupermarketCombCard
            key={"sm-card-" + index}
            combination={combination}
            combinationIndex={index}
          />
        ))}
      </div>
    </>
  );
}
