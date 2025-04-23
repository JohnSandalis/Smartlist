import React, { forwardRef } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import ProductImage from "./ProductImage";
import Image from "next/image";
import { Product } from "@/lib/types/Product";
import {
  useSelectedSupermarkets,
  useSupermarkets,
} from "@/context/SupermarketProvider";
import { useShoppingList } from "@/context/ShoppingListProvider";

interface SupermarketImageProps {
  src: string;
  alt: string;
}

const SupermarketImage = React.memo(({ src, alt }: SupermarketImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={24}
    height={24}
    className="w-6 h-6 object-contain rounded-full"
  />
));
SupermarketImage.displayName = "SupermarketImage";
interface ProductCardProps {
  product: Product;
  showRemoveItemButton?: boolean;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, showRemoveItemButton = true }, ref) => {
    const supermarkets = useSupermarkets();
    const { selected: selectedSupermarkets } = useSelectedSupermarkets();

    const {
      items: shoppingList,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
    } = useShoppingList();

    const addToList = () => {
      addItem({
        ...product,
        quantity: 1,
      });
    };

    const handleIncrease = () => {
      increaseQuantity(product.barcode);
    };

    const handleDecrease = () => {
      decreaseQuantity(product.barcode);
    };

    const handleRemove = () => {
      removeItem(product.barcode);
    };

    return (
      <div
        ref={ref}
        className="rounded-md p-4 flex flex-col items-start justify-start bg-white self-stretch gap-2"
      >
        <div className="w-full flex gap-2">
          <div className="flex items-center justify-center">
            <ProductImage product={product} />
          </div>
          <div className="w-full text-left flex flex-col items-left justify-between gap-2">
            <h3 className="text-[14px] font-normal text-gray-800">
              <span className="text-gray-900">{product.supplier.name}</span>{" "}
              <span className="capitalize">
                {product.name
                  .replace(product.supplier.name + " ", "")
                  .toLocaleLowerCase()}
              </span>
            </h3>
            {shoppingList.find((item) => item.barcode === product.barcode)
              ?.quantity ?? 0 > 0 ? (
              <div className="flex items-center">
                <button
                  onClick={handleDecrease}
                  className="flex items-center justify-center text-xs bg-gray-200 px-2 py-1 rounded-md h-[28px] w-[28px]"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center px-2 h-[28px] w-8">
                  {shoppingList.find((item) => item.barcode === product.barcode)
                    ?.quantity || 0}
                </div>
                <button
                  onClick={handleIncrease}
                  className="flex items-center justify-center text-xs bg-gray-200 px-2 py-1 rounded-md h-[28px] w-[28px]"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>

                {showRemoveItemButton ? (
                  <button
                    onClick={handleRemove}
                    className="flex items-center justify-center text-xs bg-red-200 px-2 py-1 rounded-md h-[28px] w-[28px] ml-3"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            ) : (
              <button
                onClick={addToList}
                className="text-sm bg-gray-200 px-2 py-1 rounded-md w-max"
              >
                Προσθήκη
              </button>
            )}
          </div>
        </div>
        <ul className="flex gap-2 min-w-[68px] text-left w-full overflow-auto">
          {product.prices
            .sort((a, b) => a.price - b.price)
            .filter((priceObj) =>
              selectedSupermarkets.includes(priceObj.merchant_uuid)
            )
            .map((priceObj, index) => {
              const supermarket = supermarkets[priceObj.merchant_uuid];
              const supermarketImage = supermarket?.image;
              const supermarketName = supermarket?.name;

              return (
                <li
                  key={"price-li-" + index}
                  className="flex gap-1 items-center"
                >
                  <div className="flex items-center justify-center min-w-6 min-h-6">
                    <SupermarketImage
                      src={supermarketImage}
                      alt={supermarketName}
                    />
                  </div>
                  <p className="text-sm font-normal">
                    {priceObj.price?.toFixed(2)}€
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
);
ProductCard.displayName = "ProductCard";

export default ProductCard;
