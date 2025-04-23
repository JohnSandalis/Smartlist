"use client";
import getSupermarketSplit from "@/utils/supermarketSplit";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelectedSupermarkets } from "@/context/SupermarketProvider";
import { CombinationResult } from "@/lib/types/CombinationResult";
import SuperMarketCombGroupList from "@/components/list/SuperMarketCombGroupList";
import { useShoppingList } from "@/context/ShoppingListProvider";

type GroupedCombination = {
  noOfSupermarkets: number;
  combinations: CombinationResult[];
};

export default function List() {
  const { items: shoppingList } = useShoppingList();
  const { selected: selectedSupermarkets } = useSelectedSupermarkets();
  const router = useRouter();

  const combinations = getSupermarketSplit(shoppingList);
  const sortedCombinations = combinations.sort((a, b) => a.total - b.total);

  const filteredCombinations =
    sortedCombinations.filter((combination) =>
      combination.supermarkets.every((sm) => selectedSupermarkets.includes(sm))
    ) || [];

  const excludedCombinations =
    sortedCombinations.filter((combination) =>
      combination.supermarkets.some((sm) => !selectedSupermarkets.includes(sm))
    ) || [];

  const grouped = groupCombinations(filteredCombinations);
  const excludedGrouped = groupCombinations(excludedCombinations);

  return (
    <>
      <div className="w-full">
        <IconButton onClick={() => router.back()}>
          <ArrowLeftIcon width="24px" height="24px" />
        </IconButton>
      </div>
      <h1 className="text-center page-title mb-2">Φθηνότεροι Συνδιασμοί</h1>
      <p className="text-md text-center mb-4 text-gray-700">
        Παρακάτω θα βρείτε από ποια super market συμφέρει να αγοράσετε τα
        προϊόντα της λίστας σας.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {grouped.map((group, groupIndex) => (
          <SuperMarketCombGroupList
            key={`sm-group-${groupIndex}`}
            group={group}
            groupIndex={groupIndex}
          />
        ))}

        {excludedGrouped.length > 0 && (
          <>
            <hr className="my-6" />
            <h2 className="text-center text-gray-600 text-md mb-2">
              Συνδιασμοί από μη επιλεγμένα Super Market
            </h2>
            <div className="opacity-50 grid grid-cols-1 gap-4">
              {excludedGrouped.map((group, groupIndex) => (
                <SuperMarketCombGroupList
                  key={`excluded-sm-group-${groupIndex}`}
                  group={group}
                  groupIndex={groupIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function groupCombinations(
  combinations: CombinationResult[]
): GroupedCombination[] {
  return combinations
    .reduce<GroupedCombination[]>((acc, combo) => {
      const noOfSupermarkets = combo.supermarkets.length;

      if (noOfSupermarkets > 3) return acc;

      const existingGroup = acc.find(
        (group) => group.noOfSupermarkets === noOfSupermarkets
      );

      if (existingGroup) {
        existingGroup.combinations.push(combo);
      } else {
        acc.push({
          noOfSupermarkets,
          combinations: [combo],
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.noOfSupermarkets - b.noOfSupermarkets);
}
