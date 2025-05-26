"use client";
import { useShoppingList } from "@/context/ShoppingListProvider";
import ShoppingList from "./ShoppingList";
import { useState } from "react";

export default function ShoppingListButton() {
  const { totalItems, totalPrice } = useShoppingList();
  const [listOpen, setListOpen] = useState(false);

  return totalItems > 0 ? (
    <>
      <div className="fixed bottom-0 left-0 w-full rounded-t-lg bg-white py-4 px-2 shadow-lg">
        <button
          onClick={() => setListOpen(true)}
          className="w-full bg-primary text-white p-4 rounded-xl flex justify-between items-center"
        >
          <div className="w-1/3">
            <span className="flex items-center justify-center bg-white rounded w-6 h-6 text-black">
              {totalItems}
            </span>
          </div>
          <span className="w-1/3 text-md font-medium">Λίστα</span>
          <span className="w-1/3 text-right text-sm font-medium">
            {totalPrice.toFixed(2)}€
          </span>
        </button>
      </div>

      <ShoppingList open={listOpen} setOpen={setListOpen} />
    </>
  ) : null;
}
