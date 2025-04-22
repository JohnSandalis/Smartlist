"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Supermarket } from "@/lib/types/Supermarket";
import { createClient } from "@/utils/supabase/client";

type SupermarketMap = Record<string, Supermarket>;

interface SupermarketContextType {
  supermarkets: SupermarketMap;
  selected: number[];
  setSelected: (ids: number[]) => void;
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
  const [supermarkets, setSupermarkets] = useState<SupermarketMap>({});
  const [selected, setSelected] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    try {
      const fetchSupermarkets = async () => {
        const { data, error } = await supabase.from("supermarkets").select("*");
        if (error) {
          console.error("Failed to fetch supermarkets:", error);
          return;
        }

        const supermarketMap: SupermarketMap = {};
        data.forEach((sm) => {
          supermarketMap[sm.merchant_uuid] = sm;
        });

        setSupermarkets(supermarketMap);
      };

      fetchSupermarkets();
      const saved = localStorage.getItem("selectedSupermarkets");
      if (saved) {
        setSelected(JSON.parse(saved));
      }
    } catch {
      setSelected([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (selected.length > 0) {
      localStorage.setItem("selectedSupermarkets", JSON.stringify(selected));
    } else {
      localStorage.removeItem("selectedSupermarkets");
    }
  }, [selected]);

  return (
    <SupermarketContext.Provider
      value={{ supermarkets, selected, setSelected, isLoaded }}
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
