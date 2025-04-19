"use client";
import { useState } from "react";
import ProductListComb from "./ProductListComb";
import { CombinationResult } from "@/lib/types/CombinationResult";
import Image from "next/image";
import { useSupermarkets } from "@/context/SupermarketProvider";

export default function SupermarketCombCard({
  combination,
  combinationIndex,
}: {
  combination: CombinationResult;
  combinationIndex: number;
}) {
  const [listOpen, setListOpen] = useState(false);
  const supermarkets = useSupermarkets();

  return (
    <>
      <button
        onClick={() => setListOpen((prev) => !prev)}
        className="rounded-md p-4 flex items-center justify-start bg-white self-stretch gap-4"
      >
        {combination.supermarkets.map((supermarket, index) => {
          const supermarketImage = supermarkets[supermarket].logo_url;

          return (
            <div
              key={`sm-comb-${combinationIndex}-${index}`}
              className="flex items-center justify-center w-8 h-8"
            >
              <Image
                src={supermarketImage}
                alt={supermarket}
                width="225"
                height="225"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          );
        })}
        <span className="text-sm font-medium ml-auto">
          €{combination.total}
        </span>
      </button>
      <ProductListComb
        combination={combination}
        combinationIndex={combinationIndex}
        open={listOpen}
        setOpen={setListOpen}
      />
    </>
  );
}
