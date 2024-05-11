import { Product } from "./Product";

export interface ShoppingCartItem extends Product {
  quantity: number;
}