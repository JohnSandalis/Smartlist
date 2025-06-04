"use client";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  type SubCategory,
  type Product,
  type Category,
} from "@smartlist/schemas";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 20;

interface Props {
  products: Product[];
  subcategories: SubCategory[];
  selectedSubCategory: number | null;
  handleSubcategorySelect: (uuid: number | null) => void;
  category: Category;
  loading: boolean;
  lastProductElementRef: any;
}

export default function ProductList({
  products,
  subcategories,
  selectedSubCategory,
  handleSubcategorySelect,
  category,
  loading,
  lastProductElementRef,
}: Props) {
  return (
    <div className="flex gap-4 lg:mt-4 container-default">
      <div className="min-w-[300px] hidden lg:block bg-white p-4 rounded-lg shadow-actions sticky top-[90px] h-fit">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black flex items-center gap-2 text-hover-transition"
        >
          <ArrowLeftIcon width="16px" height="16px" /> Όλες οι κατηγορίες
        </Link>
        <h2 className="text-md font-medium mb-2 mt-4">{category.name}</h2>

        <ul className="flex flex-col gap-2 list-disc pl-4">
          <li
            onClick={() => handleSubcategorySelect(null)}
            className={`text-sm text-gray-500 hover:text-black cursor-pointer text-hover-transition ${
              selectedSubCategory === null ? "!text-black font-medium" : ""
            }`}
          >
            Όλα τα προϊόντα
          </li>
          {subcategories.map((subcategory) => (
            <li
              key={subcategory.uuid}
              onClick={() => handleSubcategorySelect(subcategory.uuid)}
              className={`text-sm text-gray-500 hover:text-black cursor-pointer text-hover-transition ${
                selectedSubCategory === subcategory.uuid
                  ? "!text-black font-medium"
                  : ""
              }`}
            >
              {subcategory.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-20 container-default lg:mx-0 lg:max-w-none">
        <h2 className="text-md font-medium mb-2 col-span-2 hidden lg:block">
          {selectedSubCategory
            ? subcategories.find(
                (subcategory) => subcategory.uuid === selectedSubCategory
              )?.name
            : category.name}
        </h2>

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

        {loading &&
          Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}

        {!loading && products.length === 0 && (
          <h2 className="text-lg text-center mt-4 col-span-full">
            Δεν βρέθηκε κάποιο προϊόν
          </h2>
        )}
      </div>
    </div>
  );
}
