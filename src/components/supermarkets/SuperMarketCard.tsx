"use client";

import Checkbox from "@mui/joy/Checkbox";
import ListItem from "@mui/joy/ListItem";
import Image from "next/image";
import { Supermarket } from "@/lib/types/Supermarket";
import { useSelectedSupermarkets } from "@/context/SupermarketProvider";

interface SuperMarketCardProps {
  supermarket: Supermarket;
}

const SuperMarketCard: React.FC<SuperMarketCardProps> = ({ supermarket }) => {
  const { selected, setSelected } = useSelectedSupermarkets();
  const checked = selected.includes(supermarket.store_id);

  const handleCheck = () => {
    if (checked) {
      setSelected(selected.filter((s) => s !== supermarket.store_id));
    } else {
      setSelected([...selected, supermarket.store_id]);
    }
  };

  return (
    <ListItem
      className={`supermarket-checkbox relative !rounded-md !p-3 flex flex-col items-center justify-center bg-white ${
        checked ? "supermarket-checkbox--checked" : ""
      }`}
    >
      <Checkbox
        overlay
        checked={checked}
        onChange={handleCheck}
        className="ml-auto"
      />
      <div className="flex items-center justify-center">
        <Image
          src={supermarket.logo_url}
          alt={supermarket.name}
          width="225"
          height="225"
          className="supermarket-checkbox__image w-24 h-24 object-cover"
        />
      </div>
      <div className="mt-4 pb-2 text-center">
        <h3 className="text-lg font-medium text-gray-900 leading-tight">
          {supermarket.name}
        </h3>
      </div>
    </ListItem>
  );
};

export default SuperMarketCard;
