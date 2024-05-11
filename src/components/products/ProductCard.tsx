import React, { forwardRef, ReactElement } from "react";
import { useAtom } from "jotai";
import { shoppingListAtom } from "@/app/atoms";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { supermarkets } from "@/lib/data/supermarkets";
import ProductImage from "./ProductImage";
import Image from "next/image";

interface SupermarketImageProps {
  src: string;
  alt: string;
}

const SupermarketImage = React.memo(({ src, alt }: SupermarketImageProps) => (
  <Image src={src} alt={alt} width={24} height={24} className="w-6 h-6 object-cover rounded-full" />
));
SupermarketImage.displayName = 'SupermarketImage';

interface Price {
  price: number;
  store_name: string;
  imageUrl: string;
}

interface Product {
  id: string;
  title: string;
  brand: string;
  Prices: Price[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => {
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);

  const addToList = () => {
    setShoppingList((list) => [...list, { ...product, quantity: 1 }]);
  };

  const decreaseQuantity = () => {
    const currentItem = shoppingList.find((item) => item.id === product.id);
    const currentQuantity = currentItem?.quantity ?? 0;

    if (currentQuantity > 1) {
      setShoppingList((list) => {
        const existingProductIndex = list.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
          const newList = [...list];
          newList[existingProductIndex].quantity--;
          return newList;
        }
        return list;
      });
    } else {
      setShoppingList((list) => list.filter((item) => item.id !== product.id));
    }
  };


  const increaseQuantity = () => {
    const itemIndex = shoppingList.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      if ((shoppingList[itemIndex].quantity ?? 0) < 20) {
        setShoppingList(currentItems => {
          const newItems = [...currentItems];
          newItems[itemIndex].quantity++;
          return newItems;
        });
      }
    } else {
      setShoppingList(currentItems => [...currentItems, { ...product, quantity: 1 }]);
    }
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
          <h3 className="text-[14px] font-normal text-gray-900">
            <span className="uppercase">{product.brand}</span> {product.title}
          </h3>
          {shoppingList.find((item) => item.id === product.id)?.quantity ?? 0 > 0 ? (
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="flex items-center justify-center text-xs bg-gray-200 px-2 py-1 rounded-md h-[28px] w-[28px]"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center px-2 h-[28px] w-8">
                {shoppingList.find((item) => item.id === product.id)?.quantity || 0}
              </div>
              <button
                onClick={increaseQuantity}
                className="flex items-center justify-center text-xs bg-gray-200 px-2 py-1 rounded-md h-[28px] w-[28px]"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
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
      <ul className="flex gap-2 min-w-[68px] text-left">
        {product.Prices.map((priceObj, index) => {
          const supermarketImage = supermarkets[priceObj.store_name]?.image_base64;
          return (
            <li key={"price-li-" + index} className="flex gap-1 items-center">
              <div className="flex items-center justify-center min-w-6 min-h-6">
                <SupermarketImage
                  src={supermarketImage}
                  alt={priceObj.store_name}
                />
              </div>
              <p key={index} className="text-sm font-normal">
                {priceObj.price && priceObj.price.toFixed(2)}€
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
ProductCard.displayName = 'ProductCard';

export default ProductCard;
