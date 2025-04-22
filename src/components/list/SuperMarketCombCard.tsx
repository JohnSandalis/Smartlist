"use client";
import { useState } from "react";
import ProductListComb from "./ProductListComb";
import { CombinationResult } from "@/lib/types/CombinationResult";
import Image from "next/image";
import { useSupermarkets } from "@/context/SupermarketProvider";
import { PlusIcon } from "@heroicons/react/24/outline";

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
        className="p-4 flex items-center justify-start bg-white self-stretch w-full border-t border-gray-100"
      >
        {combination.supermarkets.map((supermarket, index) => {
          const supermarketImage = supermarkets[supermarket].image;

          return (
            <div
              key={`sm-comb-${combinationIndex}-${index}`}
              className="flex items-center justify-center"
            >
              <>
                <Image
                  src={supermarketImage}
                  alt={supermarkets[supermarket]?.name}
                  width="225"
                  height="225"
                  className="w-10 h-10 object-contain rounded-full"
                />
                {combination.supermarkets.length !== 1 &&
                index !== combination.supermarkets.length - 1 ? (
                  <PlusIcon className="w-4 h-4 mx-4" />
                ) : (
                  ""
                )}
              </>
            </div>
          );
        })}
        <span className="text-md font-medium ml-auto">
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
