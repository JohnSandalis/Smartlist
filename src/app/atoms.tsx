import { atom } from "jotai";
import { ShoppingCartItem } from "@/lib/types/ShoppingCartItem";

export const shoppingListAtom = atom<ShoppingCartItem[]>([]);
export const superMarketsListAtom = atom<string[]>([]);