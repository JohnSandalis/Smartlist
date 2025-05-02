import ProductCard from "@/components/products/ProductCard";
import { Product } from "@smartlist/types";

export const SearchResults = ({ results }: { results: Product[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {results.map((product, index) =>
        product.prices && product.prices.length > 0 ? (
          <ProductCard key={`${product.barcode}-${index}`} product={product} />
        ) : undefined
      )}
    </div>
  );
};
