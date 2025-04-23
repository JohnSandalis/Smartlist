import { Price } from "./Price";

export interface ShoppingCartItem {
  barcode: string;
  name: string;
  image: string;
  category: string[];
  supplier: { name: string };
  quantity: number;
  prices: Price[];
}
