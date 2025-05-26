"use client";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { Product } from "@smartlist/types";

interface Props {
  products: Product[];
  loading: boolean;
  lastProductElementRef: any;
}

export default function ProductList({
  products,
  loading,
  lastProductElementRef,
}: Props) {
  if (products.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-2 pb-20">
        {products.map((product, index) =>
          product.prices && product.prices.length > 0 ? (
            <div
              key={`${product.barcode}-${index}`}
              ref={index === products.length - 1 ? lastProductElementRef : null}
            >
              <ProductCard product={product} showRemoveItemButton={false} />
            </div>
          ) : null
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <h2 className="text-lg text-center mt-4">Δεν βρέθηκε κάποιο προϊόν</h2>
  );
}
