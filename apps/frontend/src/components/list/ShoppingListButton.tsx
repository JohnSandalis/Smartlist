"use client";
import { useShoppingList } from "@/context/ShoppingListProvider";
import ShoppingList from "./ShoppingList";
import { useState } from "react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ShoppingListButton() {
  const t = useTranslations("listPreview");
  const { isLoading, totalItems, totalPrice } = useShoppingList();
  const [listOpen, setListOpen] = useState(false);
  const pathname = usePathname();

  const hiddenPaths = ["/list", "/account", "/login", "/register"];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <div className="hidden md:block">
          <div className="bg-gray-300 text-gray-500 cursor-not-allowed p-3 rounded-xl flex justify-between items-center gap-4 animate-pulse">
            <div className="w-6 h-6 bg-gray-400 rounded" />
            <div className="w-12 h-4 bg-gray-400 rounded" />
            <div className="ml-1">
              <div className="flex items-center justify-center bg-gray-200 text-gray-500 rounded w-6 h-6" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <button
              onClick={() => totalItems > 0 && setListOpen(true)}
              className={`${
                totalItems > 0
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } w-[156px] p-3 rounded-xl flex justify-between items-center gap-4`}
            >
              <ClipboardDocumentListIcon className="w-6 h-6" />
              <span className="text-md font-medium">{t("buttonOpen")}</span>
              <div className="ml-1">
                <span
                  className={`flex items-center justify-center ${
                    totalItems > 0
                      ? "bg-white text-black"
                      : "bg-gray-200 text-gray-500"
                  } rounded w-6 h-6`}
                >
                  {totalItems}
                </span>
              </div>
            </button>
          </div>

          {totalItems > 0 && (
            <>
              <div className="md:hidden">
                <div className="fixed bottom-0 left-[50%] transform -translate-x-1/2 w-full rounded-t-lg bg-white py-4 px-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full container-default">
                  <button
                    onClick={() => setListOpen(true)}
                    className="w-full bg-primary text-white p-4 rounded-xl flex justify-between items-center"
                  >
                    <div className="w-1/3">
                      <span className="flex items-center justify-center bg-white rounded w-6 h-6 text-black">
                        {totalItems}
                      </span>
                    </div>
                    <span className="w-1/3 text-md font-medium">
                      {t("buttonOpen")}
                    </span>
                    <span className="w-1/3 text-right text-sm font-medium">
                      {totalPrice.toFixed(2)}€
                    </span>
                  </button>
                </div>
              </div>

              <ShoppingList open={listOpen} setOpen={setListOpen} />
            </>
          )}
        </>
      )}
    </>
  );
}
