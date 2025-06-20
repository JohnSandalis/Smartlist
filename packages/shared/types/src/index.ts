export interface Category {
  uuid: number;
  name: string;
  image: string;
}

export interface CombinationResult {
  supermarkets: number[];
  total: number;
  [key: number]: any;
}

export interface Price {
  barcode?: string;
  merchant_uuid: number;
  price: number;
  price_normalized: number;
  date: string;
  unit: string;
}

export interface Product {
  barcode: string;
  name: string;
  image: string;
  category: string[];
  supplier: { name: string };
  prices: Price[];
}

export interface ShoppingCartItem {
  barcode: string;
  name: string;
  image: string;
  category: string[];
  supplier: { name: string };
  quantity: number;
  prices: Price[];
}

export interface SubCategory {
  uuid: number;
  name: string;
  category_uuid: number;
}

export interface SubCategories {
  [key: string]: SubCategory[];
}

export interface SubSubCategory {
  uuid: number;
  name: string;
  sub_category_uuid: number;
}

export interface Supermarket {
  merchant_uuid: number;
  image: string;
  name: string;
  display_name: string;
}

export interface Supermarkets {
  [key: string]: Supermarket;
}
