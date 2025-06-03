"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { type Supermarket, type Supermarkets } from "@smartlist/schemas";
import { useUser } from "./UserContext";
import { getApiBaseUrl } from "@/lib/api/getApiBaseUrl";
import { fetchSupermarkets } from "@/lib/api/supermarkets";
import {
  fetchUserPreferences,
  updateUserPreferences,
} from "@/lib/api/userPreferences";

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
    const getSupermarkets = async () => {
      try {
        const data = await fetchSupermarkets({
          cache: "force-cache",
        });

        const supermarketMap: SupermarketMap = {};
        data.forEach((sm) => {
          supermarketMap[sm.merchant_uuid] = sm;
        });
        setSupermarkets(supermarketMap);
      } catch (error) {
        console.error("Failed to fetch supermarkets:", error);
      }
    };

    getSupermarkets();
  }, []);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        let preferences: number[] = [];

        if (user) {
          const { selected_supermarkets } = await fetchUserPreferences({
            credentials: "include",
          });
          preferences = selected_supermarkets;
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
          await updateUserPreferences(ids, {
            credentials: "include",
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
