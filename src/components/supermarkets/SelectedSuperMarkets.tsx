'use client';
import Image from "next/image";
import { useAtom } from "jotai";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { supermarkets } from "@/lib/data/supermarkets";
import SuperMarketsList from "@/components/supermarkets/SuperMarketList";
import { superMarketsListAtom } from "@/app/atoms";

export default function SelectedSuperMarkets() {
  const [superMarketsList] = useAtom(superMarketsListAtom);
  const [superMarketsListOpen, setSuperMarketsListOpen] = useState<boolean>(
    superMarketsList.length === 0
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
      <SuperMarketsList
        open={superMarketsListOpen}
        setOpen={setSuperMarketsListOpen}
      /></>
  );
}