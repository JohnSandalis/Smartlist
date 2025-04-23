"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/context/UserContext";
import { ShoppingCartItem } from "@/lib/types/ShoppingCartItem";

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
  const supabase = createClient();
  const { user } = useUser();
  const [items, setItems] = useState<ShoppingCartItem[]>([]);
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [user]);

  const loadItemsFromDb = useCallback(
    async (itemsFromDb: { barcode: string; quantity: number }[]) => {
      if (!itemsFromDb || itemsFromDb.length === 0) {
        setItems([]);
        return;
      }

      const barcodes = itemsFromDb.map((item) => item.barcode);

      const { data: products, error } = await supabase
        .from("products")
        .select(
          `
          barcode,
          name,
          image,
          category,
          supplier:suppliers(name),
          prices(barcode, merchant_uuid, price, price_normalized, date, unit)
        `
        )
        .in("barcode", barcodes);

      if (error) {
        console.error("Failed to load products:", error);
        return;
      }

      const loadedItems: ShoppingCartItem[] = products.map((product) => {
        const quantity =
          itemsFromDb.find((item) => item.barcode === product.barcode)
            ?.quantity || 1;

        const supplier = Array.isArray(product.supplier)
          ? product.supplier[0] || { name: "Unknown" }
          : product.supplier || { name: "Unknown" };

        return {
          ...product,
          supplier,
          quantity,
        };
      });

      setItems(loadedItems);
    },
    []
  );

  const saveShoppingList = useCallback(
    async (itemsToSave: ShoppingCartItem[]) => {
      try {
        const payload = itemsToSave.map((item) => ({
          barcode: item.barcode,
          quantity: item.quantity,
        }));

        if (user) {
          if (currentListId) {
            const { error } = await supabase
              .from("shopping_lists")
              .update({
                items: payload,
                updated_at: new Date().toISOString(),
              })
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
    [user, currentListId]
  );

  const addItem = useCallback(
    async (item: ShoppingCartItem) => {
      setItems((prev) => {
        const exists = prev.find((i) => i.barcode === item.barcode);
        const newItems = exists
          ? prev.map((i) =>
              i.barcode === item.barcode
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...prev, { ...item, quantity: 1 }];

        saveShoppingList(newItems);
        return newItems;
      });
    },
    [saveShoppingList]
  );

  const removeItem = useCallback(
    async (barcode: string) => {
      setItems((prev) => {
        const newItems = prev.filter((i) => i.barcode !== barcode);
        saveShoppingList(newItems);
        return newItems;
      });
    },
    [saveShoppingList]
  );

  const clearList = useCallback(async () => {
    setItems([]);
    await saveShoppingList([]);
  }, [saveShoppingList]);

  const increaseQuantity = useCallback(
    async (barcode: string) => {
      setItems((prev) => {
        const newItems = prev.map((item) =>
          item.barcode === barcode && item.quantity < 20
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        saveShoppingList(newItems);
        return newItems;
      });
    },
    [saveShoppingList]
  );

  const decreaseQuantity = useCallback(
    async (barcode: string) => {
      setItems((prev) => {
        const item = prev.find((i) => i.barcode === barcode);
        if (!item) return prev;

        const newItems =
          item.quantity > 1
            ? prev.map((i) =>
                i.barcode === barcode ? { ...i, quantity: i.quantity - 1 } : i
              )
            : prev.filter((i) => i.barcode !== barcode);

        saveShoppingList(newItems);
        return newItems;
      });
    },
    [saveShoppingList]
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
