import { Price } from "./Price";

export interface Product {
  barcode: string;
  name: string;
  image_url: string;
  subcategory_id: string;
  prices: Price[];
}
