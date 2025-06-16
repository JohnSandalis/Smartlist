import { type CombinationResult } from "@smartlist/schemas";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import SupermarketCombCard from "./SuperMarketCombCard";
import { useTranslations } from "next-intl";

type GroupedCombination = {
  noOfSupermarkets: number;
  combinations: CombinationResult[];
};

interface SuperMarketCombGroupListProps {
  group: GroupedCombination;
  groupIndex: number;
}

export default function SuperMarketCombGroupList({
  group,
  groupIndex,
}: SuperMarketCombGroupListProps): JSX.Element {
  const t = useTranslations("list");

  const minPrice = Math.min(...group.combinations.map((c) => c.total)).toFixed(
    2
  );

  return (
    <Accordion
      className="!rounded-lg !shadow-none before-hidden overflow-hidden
"
    >
      <AccordionSummary
        expandIcon={<ChevronDownIcon className="w-8 h-8 color-gray-900" />}
      >
        <div className="flex flex-col">
          <h2 className="font-medium">
            {t("upTo")} {group.noOfSupermarkets} Super Markets
          </h2>
          <p className="text-gray-500">
            {t("from")} €{minPrice}
          </p>
        </div>
      </AccordionSummary>
      <AccordionDetails className="p-0">
        {group.combinations.map((combination, comboIndex) => (
          <SupermarketCombCard
            key={`sm-card-${groupIndex}-${comboIndex}`}
            combination={combination}
            combinationIndex={comboIndex}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
