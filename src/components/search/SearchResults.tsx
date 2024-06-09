import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/lib/types/Product";

export const SearchResults = ({ results }: { results: Product[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {results.map((product, index) =>
        product.Prices && product.Prices.length > 0 ? <ProductCard key={`${product.id}-${index}`} product={product} /> : undefined
      )}
    </div>
  );
};
