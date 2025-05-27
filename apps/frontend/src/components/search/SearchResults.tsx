import ProductCard from "@/components/products/ProductCard";
import { Product } from "@smartlist/types";

export const SearchResults = ({ results }: { results: Product[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full grid-rows-min gap-2 container-default">
      {results.map((product, index) =>
        product.prices && product.prices.length > 0 ? (
          <ProductCard key={`${product.barcode}-${index}`} product={product} />
        ) : undefined
      )}
    </div>
  );
};
