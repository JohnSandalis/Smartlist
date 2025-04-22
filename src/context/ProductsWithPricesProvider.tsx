"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/types/Product";

interface ProductsWithPricesContextType {
  productsWithPrices: Product[];
  setProductsWithPrices: (products: Product[]) => void;
}

const ProductsWithPricesContext = createContext<
  ProductsWithPricesContextType | undefined
>(undefined);

export function ProductsWithPricesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productsWithPrices, setProductsWithPrices] = useState<Product[]>([]);

  return (
    <ProductsWithPricesContext.Provider
      value={{
        productsWithPrices,
        setProductsWithPrices,
      }}
    >
      {children}
    </ProductsWithPricesContext.Provider>
  );
}

export function useProductsWithPrices() {
  const context = useContext(ProductsWithPricesContext);
  if (!context)
    throw new Error(
      "useProductsWithPrices must be used within a ProductsWithPricesProvider"
    );
  return context;
}
