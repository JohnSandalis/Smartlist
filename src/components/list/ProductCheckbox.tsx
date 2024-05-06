import { useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import ListItem from "@mui/joy/ListItem";
import ProductImage from "@/components/products/ProductImage";
import { ShoppingCartItem } from "@/app/page";

interface ProductCheckboxProps {
  product: ShoppingCartItem;
  supermarket: string;
}

export default function ProductCheckbox({ product, supermarket }: ProductCheckboxProps) {
  const [checked, setChecked] = useState(false);
  const priceObj = product.Prices.find(
    (price) => price.store_name === supermarket
  );

  return (
    <ListItem
      className={`relative flex items-center w-full !rounded-md !p-4
      bg-white gap-2${checked ? " checked-overlay" : ""}`}
    >
      <div className="flex items-center justify-center">
        <ProductImage product={product} />
      </div>

      <div className="h-full px-4 flex flex-col justify-between gap-2">
        <p
          className={`text-[14px] font-normal text-gray-900${checked ? " line-through	" : ""
            }`}
        >
          <span className="uppercase">{product.brand}</span> {product.title}
        </p>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center text-xs bg-gray-200 px-2 py-1 rounded-md h-[28px] w-[28px]">
            {product.quantity}
          </span>
          <span className="text-sm font-medium">
            {priceObj && `${priceObj.price.toFixed(2)}€`}
          </span>
        </div>
      </div>
      <Checkbox
        overlay
        color="neutral"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
        className="ml-auto"
      />
    </ListItem>
  );
}
