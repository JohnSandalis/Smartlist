"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Supermarket } from "@/lib/types/Supermarket";
import { createClient } from "@/utils/supabase/client";

type SupermarketMap = Record<string, Supermarket>;

interface SupermarketContextType {
  supermarkets: SupermarketMap;
  selected: string[];
  setSelected: (ids: string[]) => void;
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
  const [selected, setSelected] = useState<string[]>([]);
  const supabase = createClient();

  // Fetch supermarkets
  useEffect(() => {
    const fetchSupermarkets = async () => {
      const { data, error } = await supabase
        .from("supermarkets")
        .select("store_id, name, logo_url");
      if (error) {
        console.error("Failed to fetch supermarkets:", error);
        return;
      }

      const map: SupermarketMap = {};
      data.forEach((sm) => {
        map[sm.store_id] = sm;
      });

      // sort keys alphabetically
      const sortedKeys = Object.keys(map).sort();
      const sortedMap: SupermarketMap = {};
      sortedKeys.forEach((key) => {
        sortedMap[key] = map[key];
      });

      setSupermarkets(sortedMap);
    };

    fetchSupermarkets();
  }, []);

  return (
    <SupermarketContext.Provider
      value={{ supermarkets, selected, setSelected }}
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
