import { Product } from "@smartlist/types";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductImage({ product }: { product: Product }) {
  return (
    <LazyLoadImage
      src={product.image}
      alt={product.name}
      className="min-w-[80px] w-[80px] min-h-[80px] h-[80px] object-contain"
    />
  );
}
