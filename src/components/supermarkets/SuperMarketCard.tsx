import { useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import ListItem from "@mui/joy/ListItem";
import { useAtom } from "jotai";
import { superMarketsListAtom } from "@/app/atoms";
import Image from "next/image";

interface SuperMarket {
  id: string;
  store_name: string;
  image_url: string;
  image_base64: string;
}

interface SuperMarketCardProps {
  supermarket: SuperMarket;
}

const SuperMarketCard: React.FC<SuperMarketCardProps> = ({ supermarket }) => {
  const [superMarketsList, setSuperMarketsList]: [string[], (newList: string[]) => void] = useAtom(superMarketsListAtom);

  const [checked, setChecked] = useState<boolean>(
    superMarketsList.includes(supermarket.id)
  );

  const handleCheck = (): void => {
    if (checked) {
      setSuperMarketsList(superMarketsList.filter((s) => s !== supermarket.id));
    } else {
      setSuperMarketsList([...superMarketsList, supermarket.id]);
    }
    setChecked((prev) => !prev);
  };

  return (
    <ListItem
      className={`supermarket-checkbox relative !rounded-md !p-3 flex flex-col items-center justify-center bg-white ${checked ? "supermarket-checkbox--checked" : ""
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
          src={supermarket.image_url}
          alt={supermarket.store_name}
          width="225"
          height="225"
          className="supermarket-checkbox__image w-24 h-24 object-cover"
        />
      </div>
      <div className="mt-4 pb-2 text-center">
        <h3 className="text-lg font-medium text-gray-900 leading-tight">
          {supermarket.store_name}
        </h3>
      </div>
    </ListItem>
  );
};

export default SuperMarketCard;
