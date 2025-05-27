"use client";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SuperMarketsList from "@/components/supermarkets/SuperMarketList";
import {
  useSelectedSupermarkets,
  useSupermarketState,
} from "@/context/SupermarketProvider";
import SelectedSuperMarketsSkeleton from "./SelectedSuperMarketsSkeleton";
import SelectedSuperMarketLogos from "./SelectedSuperMarketLogos";

export default function SelectedSuperMarkets() {
  const { supermarkets, isLoaded } = useSupermarketState();
  const { selected } = useSelectedSupermarkets();
  const [superMarketsListOpen, setSuperMarketsListOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (isLoaded && selected.length === 0) {
      setSuperMarketsListOpen(true);
    }
  }, [isLoaded, selected]);

  if (!isLoaded) return <SelectedSuperMarketsSkeleton />;

  return (
    <>
      <button
        className="w-full bg-white rounded-md mb-2 p-3 flex items-center justify-between gap-2 hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 ease-in-out container-default"
        onClick={() => setSuperMarketsListOpen(true)}
      >
        <div className="flex flex-col gap-2 text-start">
          <h2 className="text-md font-medium text-gray-900 leading-tight">
            Επιλεγμένα Super Markets
          </h2>
          <div
            className={`flex items-center gap-2 ${
              selected.length > 0 ? "min-h-12" : ""
            }`}
          >
            <SelectedSuperMarketLogos
              selected={selected}
              supermarkets={supermarkets}
            />
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
