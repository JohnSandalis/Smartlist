"use client";

import { createContext, useContext, useState } from "react";
import { ShoppingCartItem } from "@/lib/types/ShoppingCartItem";

interface ShoppingListContextType {
  items: ShoppingCartItem[];
  setItems: (items: ShoppingCartItem[]) => void;
  addItem: (item: ShoppingCartItem) => void;
  removeItem: (barcode: string) => void;
  clearList: () => void;
  increaseQuantity: (barcode: string) => void;
  decreaseQuantity: (barcode: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export function ShoppingListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<ShoppingCartItem[]>([]);

  const addItem = (item: ShoppingCartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.barcode === item.barcode);
      return exists ? prev : [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (barcode: string) => {
    setItems((prev) => prev.filter((item) => item.barcode !== barcode));
  };

  const clearList = () => {
    setItems([]);
  };

  const increaseQuantity = (barcode: string) => {
    setItems((prev) => {
      const newItems = [...prev];
      const index = newItems.findIndex((i) => i.barcode === barcode);
      if (index !== -1 && (newItems[index].quantity ?? 0) < 20) {
        newItems[index].quantity = (newItems[index].quantity ?? 1) + 1;
      }
      return newItems;
    });
  };

  const decreaseQuantity = (barcode: string) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.barcode === barcode);
      if (index !== -1) {
        const current = [...prev];
        const currentQty = current[index].quantity ?? 1;

        if (currentQty > 1) {
          current[index].quantity = currentQty - 1;
          return current;
        } else {
          return current.filter((item) => item.barcode !== barcode);
        }
      }
      return prev;
    });
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        setItems,
        addItem,
        removeItem,
        clearList,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context)
    throw new Error(
      "useShoppingList must be used within a ShoppingListProvider"
    );
  return context;
}
