import { Price } from "./Price";

export interface Product {
  barcode: string;
  name: string;
  image: string;
  category: string[];
  supplier: { name: string };
  prices: Price[];
}
