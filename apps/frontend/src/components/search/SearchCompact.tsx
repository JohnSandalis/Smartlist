"use client";
import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { type Product } from "@smartlist/schemas";

export default function SearchCompact({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={`${className} relative`}>
      <SearchBar
        setLoading={setLoading}
        setResults={(products) => {
          setResults(products);
          if (!open) setOpen(true);
        }}
        className="w-full relative z-[60]"
      />

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[50]"
          onClick={() => {
            setOpen(false);
            setResults(null);
          }}
        />
      )}

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-off-white rounded-lg shadow-lg mt-2 z-[55] max-h-[80vh] overflow-y-auto min-w-[600px]">
          <div className="p-4">
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-min gap-2 w-full container-default">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            )}
            {results && results.length > 0 && (
              <SearchResults results={results} />
            )}
            {results && results.length === 0 && (
              <span className="text-center block">
                Δεν βρέθηκε κανένα προϊόν
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
