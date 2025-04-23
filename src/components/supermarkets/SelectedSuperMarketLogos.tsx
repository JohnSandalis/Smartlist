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
  const sortedSelected = selected
    .map((storeId) => supermarkets[storeId])
    .filter(Boolean)
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  return sortedSelected.length > 4 ? (
    <>
      {/* Display first 4 logos */}
      {sortedSelected.slice(0, 4).map((supermarket) => (
        <div
          key={supermarket.merchant_uuid}
          className="flex items-center justify-center w-12 h-12"
        >
          <Image
            src={supermarket.image}
            alt={supermarket.display_name}
            width={225}
            height={225}
            className="w-full h-full object-contain rounded-full border border-gray-200"
          />
        </div>
      ))}

      {/* Show the count of additional supermarkets */}
      <div className="flex items-center justify-center w-8 h-12">
        <span className="text-md font-normal">
          +{sortedSelected.length - 4}
        </span>
      </div>
    </>
  ) : (
    sortedSelected.map((supermarket) => (
      <div
        key={supermarket.merchant_uuid}
        className="flex items-center justify-center w-12 h-12"
      >
        <Image
          src={supermarket.image}
          alt={supermarket.display_name}
          width={225}
          height={225}
          className="w-full h-full object-contain rounded-full border border-gray-200"
        />
      </div>
    ))
  );
}
