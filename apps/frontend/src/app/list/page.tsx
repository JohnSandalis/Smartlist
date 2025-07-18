"use client";
import getSupermarketSplit from "@/utils/supermarketSplit";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelectedSupermarkets } from "@/context/SupermarketProvider";
import { type CombinationResult } from "@smartlist/schemas";
import SuperMarketCombGroupList from "@/components/list/SuperMarketCombGroupList";
import { useShoppingList } from "@/context/ShoppingListProvider";
import { useTranslations } from "next-intl";

type GroupedCombination = {
  noOfSupermarkets: number;
  combinations: CombinationResult[];
};

export default function List() {
  const t = useTranslations("list");
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
      <h1 className="text-center page-title mb-2 mt-8">{t("title")}</h1>
      <p className="text-md text-center mb-6 text-gray-700 max-w-[600px] mx-auto">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-1 gap-4 max-w-[600px] mx-auto">
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
              {t("nonSelectedSubtitle")}
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
