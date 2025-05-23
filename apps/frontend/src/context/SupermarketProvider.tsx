"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Supermarket } from "@smartlist/types";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "./UserContext";

type SupermarketMap = Record<string, Supermarket>;

interface SupermarketContextType {
  supermarkets: SupermarketMap;
  selected: number[];
  setSelected: (ids: number[]) => Promise<void>;
  isLoaded: boolean;
}

const SupermarketContext = createContext<SupermarketContextType | undefined>(
  undefined
);

export function SupermarketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [supermarkets, setSupermarkets] = useState<SupermarketMap>({});
  const [selected, setSelected] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/supermarkets`,
          {
            cache: "force-cache",
          }
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch supermarkets: ${res.statusText}`);
        }
        const data: Supermarket[] = await res.json();

        const supermarketMap: SupermarketMap = {};
        data.forEach((sm) => {
          supermarketMap[sm.merchant_uuid] = sm;
        });
        setSupermarkets(supermarketMap);
      } catch (error) {
        console.error("Failed to fetch supermarkets:", error);
      }
    };

    fetchSupermarkets();
  }, []);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        let preferences: number[] = [];

        if (user) {
          const { data, error } = await supabase
            .from("user_preferences")
            .select("selected_supermarkets")
            .eq("user_id", user.id)
            .single();

          if (!error && data?.selected_supermarkets) {
            preferences = data.selected_supermarkets;
          } else if (error && error.code !== "PGRST116") {
            // Ignore "No rows found" error
            console.error("Supabase fetch error:", error);
          }
        } else {
          // Fallback to localStorage for anonymous users
          const saved = localStorage.getItem("selectedSupermarkets");
          if (saved) {
            preferences = JSON.parse(saved);
          }
        }

        setSelected(preferences);
      } catch (error) {
        console.error("Failed to load preferences:", error);
        setSelected([]);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, [user, supabase]);

  const savePreferences = useCallback(
    async (ids: number[]) => {
      try {
        if (user) {
          const { error } = await supabase.from("user_preferences").upsert(
            {
              user_id: user.id,
              selected_supermarkets: ids,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: "user_id",
            }
          );

          if (error) throw error;
        } else {
          if (ids.length > 0) {
            localStorage.setItem("selectedSupermarkets", JSON.stringify(ids));
          } else {
            localStorage.removeItem("selectedSupermarkets");
          }
        }
      } catch (error) {
        console.error("Failed to save preferences:", error);
      }
    },
    [user, supabase]
  );

  const handleSetSelected = useCallback(
    async (ids: number[]) => {
      setSelected(ids);
      await savePreferences(ids);
    },
    [savePreferences]
  );

  return (
    <SupermarketContext.Provider
      value={{
        supermarkets,
        selected,
        setSelected: handleSetSelected,
        isLoaded,
      }}
    >
      {children}
    </SupermarketContext.Provider>
  );
}

export function useSupermarkets() {
  const ctx = useContext(SupermarketContext);
  if (!ctx)
    throw new Error(
      "useSupermarkets must be used within a SupermarketProvider"
    );
  return ctx.supermarkets;
}

export function useSelectedSupermarkets() {
  const ctx = useContext(SupermarketContext);
  if (!ctx)
    throw new Error(
      "useSelectedSupermarkets must be used within a SupermarketProvider"
    );
  return { selected: ctx.selected, setSelected: ctx.setSelected };
}

export function useSupermarketState() {
  const ctx = useContext(SupermarketContext);
  if (!ctx)
    throw new Error(
      "useSupermarketState must be used within a SupermarketProvider"
    );
  return ctx;
}
