import { Price } from './Price';

export interface Product {
  id: string;
  title: string;
  brand: string;
  Prices: Price[];
}