"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SuperMarketsList from "@/components/supermarkets/SuperMarketList";
import {
  useSupermarkets,
  useSelectedSupermarkets,
} from "@/context/SupermarketProvider";

export default function SelectedSuperMarkets() {
  const supermarkets = useSupermarkets();
  const { selected } = useSelectedSupermarkets();
  const [superMarketsListOpen, setSuperMarketsListOpen] = useState<boolean>(
    selected.length === 0
  );

  return (
    <>
      <button
        className="w-full bg-white rounded-md mb-2 p-3 flex items-center justify-between gap-2"
        onClick={() => setSuperMarketsListOpen(true)}
      >
        <div className="flex flex-col gap-2 text-start">
          <h2 className="text-md font-medium text-gray-900 leading-tight">
            Επιλεγμένα Super Markets
          </h2>
          <div className="flex items-center gap-2">
            {selected.map((storeId) => {
              const supermarket = supermarkets[storeId];
              if (!supermarket) return null;

              return (
                <div
                  key={storeId}
                  className="flex items-center justify-center w-9 h-9"
                >
                  <Image
                    src={supermarket.logo_url}
                    alt={supermarket.name}
                    width={225}
                    height={225}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              );
            })}
          </div>
          {selected.length === 0 && (
            <p className="text-sm text-gray-600">
              Επίλεξε τα super market που σε εξυπηρετούν καλύτερα.
            </p>
          )}
        </div>
        <ChevronDownIcon className="w-6 h-6" />
      </button>

      <SuperMarketsList
        open={superMarketsListOpen}
        setOpen={setSuperMarketsListOpen}
        supermarkets={supermarkets}
      />
    </>
  );
}
