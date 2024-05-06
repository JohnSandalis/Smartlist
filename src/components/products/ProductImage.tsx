import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Price {
  price: number;
  store_name: string;
  imageUrl: string;
}

interface Product {
  id: string;
  title: string;
  brand: string;
  Prices: Price[];
}

export default function ProductImage({ product }: { product: Product }) {
  const handleImageError = (event: any, imageIndex: number) => {
    const nextIndex = imageIndex + 1;
    if (nextIndex < product.Prices.length) {
      event.target.src = product.Prices[nextIndex].imageUrl;
    }
  };

  return (
    <LazyLoadImage
      src={product.Prices[0].imageUrl}
      alt={product.title}
      onError={(event) => handleImageError(event, 0)}
      className="min-w-[80px] w-[80px] min-h-[80px] h-[80px]"
    />
  );
}
