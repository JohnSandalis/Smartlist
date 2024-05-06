'use client'
import { useState } from "react";
import ProductListComb from "./ProductListComb";
import { supermarkets } from "@/lib/data/supermarkets";
import { CombinationResult } from "@/lib/helper/supermarketSplit";
import Image from "next/image";

export default function SupermarketCombCard({ combination, combinationIndex }: {
  combination: CombinationResult;
  combinationIndex: number;
}) {
  const [listOpen, setListOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setListOpen((prev) => !prev)}
        className="rounded-md p-4 flex items-center justify-start bg-white self-stretch gap-4"
      >
        {combination.supermarkets.map((supermarket, index) => {
          const supermarketImage = supermarkets[supermarket]?.image_url;
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
                className="w-full h-full object-cover rounded-full"
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
