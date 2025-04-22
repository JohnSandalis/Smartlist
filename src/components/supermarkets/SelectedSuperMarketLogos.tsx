import { Supermarket } from "@/lib/types/Supermarket";
import Image from "next/image";

type SupermarketMap = Record<string, Supermarket>;

interface Props {
  selected: number[];
  supermarkets: SupermarketMap;
}

export default function SelectedSuperMarketLogos({
  selected,
  supermarkets,
}: Props) {
  return selected.length > 5 ? (
    <>
      {/* Display first 5 logos */}
      {selected.slice(0, 5).map((storeId) => {
        const supermarket = supermarkets[storeId];
        if (!supermarket) return null;

        return (
          <div
            key={storeId}
            className="flex items-center justify-center w-12 h-12"
          >
            <Image
              src={supermarket.image}
              alt={supermarket.display_name}
              width={225}
              height={225}
              className="w-full h-full object-contain rounded-full  border brorder-gray-500"
            />
          </div>
        );
      })}

      {/* Show the count of additional supermarkets */}
      <div className="flex items-center justify-center w-12 h-12">
        <span className="text-sm font-semibold">+{selected.length - 5}</span>
      </div>
    </>
  ) : (
    // If 5 or fewer supermarkets, just show all logos
    selected.map((storeId) => {
      const supermarket = supermarkets[storeId];
      if (!supermarket) return null;

      return (
        <div
          key={storeId}
          className="flex items-center justify-center w-12 h-12"
        >
          <Image
            src={supermarket.image}
            alt={supermarket.display_name}
            width={225}
            height={225}
            className="w-full h-full object-contain rounded-full  border brorder-gray-500"
          />
        </div>
      );
    })
  );
}
