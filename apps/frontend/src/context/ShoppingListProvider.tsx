"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useUser } from "@/context/UserContext";
import { fetchProductsByBarcodes } from "@/lib/api/product";
import {
  type ShoppingCartItem,
  type ShoppingCartItems,
} from "@smartlist/schemas";
import { fetchShoppingList, saveShoppingList } from "@/lib/api/shoppingLists";

interface ShoppingListContextType {
  items: ShoppingCartItems;
  setItems: (items: ShoppingCartItems) => Promise<void>;
  addItem: (item: ShoppingCartItem) => Promise<void>;
  removeItem: (barcode: string) => Promise<void>;
  clearList: () => Promise<void>;
  increaseQuantity: (barcode: string) => Promise<void>;
  decreaseQuantity: (barcode: string) => Promise<void>;
  totalItems: number;
  totalPrice: number;
  currentListId: string | null;
  isLoading: boolean;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export function ShoppingListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [items, setItems] = useState<ShoppingCartItem[]>([]);
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadItemsFromDb = useCallback(
    async (itemsFromDb: { barcode: string; quantity: number }[]) => {
      if (!itemsFromDb.length) return setItems([]);

      const barcodes = itemsFromDb.map((item) => item.barcode);

      const products = await fetchProductsByBarcodes(barcodes, {
        cache: "no-store",
      });

      const loadedItems = products.map((product) => {
        const quantity =
          itemsFromDb.find((item) => item.barcode === product.barcode)
            ?.quantity || 1;

        return {
          ...product,
          quantity,
        };
      });

      setItems(loadedItems);
    },
    []
  );

  useEffect(() => {
    const loadShoppingList = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const data = await fetchShoppingList({
            credentials: "include",
          });
          if (data) {
            setCurrentListId(data.id);
            await loadItemsFromDb(data.items || []);
          }
        } else {
          const saved = localStorage.getItem("shoppingList");
          if (saved) {
            const parsed = JSON.parse(saved);
            await loadItemsFromDb(parsed.items || []);
          }
        }
      } catch (error) {
        console.error("Failed to load shopping list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShoppingList();
  }, [user, loadItemsFromDb]);

  const updateShoppingList = useCallback(
    async (itemsToSave: ShoppingCartItem[]) => {
      try {
        const payload = itemsToSave.map(({ barcode, quantity }) => ({
          barcode,
          quantity,
        }));

        if (user) {
          const data = await saveShoppingList(payload, currentListId, {
            credentials: "include",
          });
          if (data && data.id) setCurrentListId(data.id);
        } else {
          localStorage.setItem(
            "shoppingList",
            JSON.stringify({ items: payload })
          );
        }
      } catch (error) {
        console.error("Failed to save shopping list:", error);
      }
    },
    [user, currentListId]
  );

  const updateItems = useCallback(
    async (updater: (prev: ShoppingCartItem[]) => ShoppingCartItem[]) => {
      setItems((prev) => {
        const updated = updater(prev);
        updateShoppingList(updated);
        return updated;
      });
    },
    [updateShoppingList]
  );

  const addItem = useCallback(
    async (item: ShoppingCartItem) => {
      updateItems((prev) => {
        const exists = prev.find((i) => i.barcode === item.barcode);
        return exists
          ? prev.map((i) =>
              i.barcode === item.barcode
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...prev, { ...item, quantity: 1 }];
      });
    },
    [updateItems]
  );

  const removeItem = useCallback(
    async (barcode: string) => {
      updateItems((prev) => prev.filter((i) => i.barcode !== barcode));
    },
    [updateItems]
  );

  const clearList = useCallback(async () => {
    setItems([]);
    await saveShoppingList([], null);
  }, [saveShoppingList]);

  const increaseQuantity = useCallback(
    async (barcode: string) => {
      updateItems((prev) =>
        prev.map((item) =>
          item.barcode === barcode && item.quantity < 20
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    },
    [updateItems]
  );

  const decreaseQuantity = useCallback(
    async (barcode: string) => {
      updateItems((prev) => {
        const item = prev.find((i) => i.barcode === barcode);
        if (!item) return prev;

        return item.quantity > 1
          ? prev.map((i) =>
              i.barcode === barcode ? { ...i, quantity: i.quantity - 1 } : i
            )
          : prev.filter((i) => i.barcode !== barcode);
      });
    },
    [updateItems]
  );

  const setItemsPersist = useCallback(
    async (newItems: ShoppingCartItem[]) => {
      setItems(newItems);
      await saveShoppingList(newItems, null);
    },
    [saveShoppingList]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const min = Math.min(...item.prices.map((p) => p.price || 0));
    return sum + min * item.quantity;
  }, 0);

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        setItems: setItemsPersist,
        addItem,
        removeItem,
        clearList,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
        currentListId,
        isLoading,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingList must be used within a ShoppingListProvider"
    );
  }
  return context;
}
