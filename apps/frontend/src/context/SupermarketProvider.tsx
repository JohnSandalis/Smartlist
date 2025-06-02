"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Supermarket } from "@smartlist/types";
import { useUser } from "./UserContext";
import { getApiBaseUrl } from "@/lib/api/getApiBaseUrl";

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
  const [supermarkets, setSupermarkets] = useState<SupermarketMap>({});
  const [selected, setSelected] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/supermarkets`, {
          cache: "force-cache",
        });
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
          const res = await fetch(`${getApiBaseUrl()}/user-preferences`, {
            credentials: "include",
          });
          const { selected_supermarkets } = await res.json();

          if (res.ok && selected_supermarkets) {
            preferences = selected_supermarkets;
          }
        } else {
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
  }, [user]);

  const savePreferences = useCallback(
    async (ids: number[]) => {
      try {
        if (user) {
          await fetch(`${getApiBaseUrl()}/user-preferences`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ selected_supermarkets: ids }),
          });
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
    [user]
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
