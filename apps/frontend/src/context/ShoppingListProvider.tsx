"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/context/UserContext";
import { Product, ShoppingCartItem } from "@smartlist/types";

interface ShoppingListContextType {
  items: ShoppingCartItem[];
  setItems: (items: ShoppingCartItem[]) => Promise<void>;
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
  const supabase = useMemo(() => createClient(), []);
  const { user } = useUser();
  const [items, setItems] = useState<ShoppingCartItem[]>([]);
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadItemsFromDb = useCallback(
    async (itemsFromDb: { barcode: string; quantity: number }[]) => {
      if (!itemsFromDb.length) return setItems([]);

      const barcodes = itemsFromDb.map((item) => item.barcode);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/by-barcodes`,
        {
          cache: "no-store",
          body: JSON.stringify({ barcodes }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const products: Product[] = await res.json();

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
    [supabase]
  );

  useEffect(() => {
    const loadShoppingList = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const { data, error } = await supabase
            .from("shopping_lists")
            .select("id, items")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false })
            .limit(1)
            .single();

          if (error) throw error;

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
  }, [user, loadItemsFromDb, supabase]);

  const saveShoppingList = useCallback(
    async (itemsToSave: ShoppingCartItem[]) => {
      try {
        const payload = itemsToSave.map(({ barcode, quantity }) => ({
          barcode,
          quantity,
        }));

        if (user) {
          if (currentListId) {
            const { error } = await supabase
              .from("shopping_lists")
              .update({ items: payload, updated_at: new Date().toISOString() })
              .eq("id", currentListId);

            if (error) throw error;
          } else {
            const { data, error } = await supabase
              .from("shopping_lists")
              .insert({
                user_id: user.id,
                name: "My Shopping List",
                items: payload,
              })
              .select()
              .single();

            if (error) throw error;
            setCurrentListId(data.id);
          }
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
    [user, currentListId, supabase]
  );

  const updateItems = useCallback(
    async (updater: (prev: ShoppingCartItem[]) => ShoppingCartItem[]) => {
      setItems((prev) => {
        const updated = updater(prev);
        saveShoppingList(updated);
        return updated;
      });
    },
    [saveShoppingList]
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
    await saveShoppingList([]);
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
      await saveShoppingList(newItems);
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
