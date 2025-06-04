"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { type Category, type SubCategory } from "@smartlist/schemas";
import { useParams } from "next/navigation";
import { useSelectedSupermarkets } from "@/context/SupermarketProvider";
import SubcategoryDrawer from "./components/SubcategoryDrawer";
import SubcategoryTabs from "./components/SubcategoryTabs";
import ProductList from "./components/ProductList";
import { fetchProducts, fetchProductsByCategory } from "@/lib/api/product";

interface Props {
  category: Category;
  subcategories: SubCategory[];
}

export default function CategoryPageClient({ category, subcategories }: Props) {
  const params = useParams();
  const { selected: selectedSupermarkets } = useSelectedSupermarkets();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  const PRODUCTS_PER_PAGE = 20;

  const subcategoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const category_uuid = useMemo(
    () => parseInt(Array.isArray(params?.slug) ? params.slug[0] : params?.slug),
    [params?.slug]
  );

  const subcategoryList = useMemo(
    () => subcategories.filter((sub) => sub.category_uuid === category_uuid),
    [subcategories, category_uuid]
  );

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsLargeScreen(isLg);
      if (!isLg && !selectedSubCategory) {
        setDrawerOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedSubCategory && subcategoryRefs.current[selectedSubCategory]) {
      window.scrollTo({ top: 0 });
      subcategoryRefs.current[selectedSubCategory]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedSubCategory]);

  const fetchProductsData = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const key = selectedSubCategory
        ? selectedSubCategory.toString()
        : "category";
      const currentOffset = offsets[key] || 0;
      const endOffset = currentOffset + PRODUCTS_PER_PAGE - 1;

      let fetchedProducts;
      if (selectedSubCategory) {
        fetchedProducts = await fetchProducts(
          {
            subCategoryId: selectedSubCategory,
            start: currentOffset,
            end: endOffset,
          },
          { cache: "no-store" }
        );
      } else if (isLargeScreen) {
        fetchedProducts = await fetchProductsByCategory(
          {
            categoryId: category_uuid,
            start: currentOffset,
            end: endOffset,
          },
          { cache: "no-store" }
        );
      } else {
        return;
      }

      const filtered = fetchedProducts.filter((product) =>
        product.prices?.some((price) =>
          selectedSupermarkets.includes(price.merchant_uuid)
        )
      );

      setProducts((prev) => [...prev, ...filtered]);
      setHasMore(filtered.length === PRODUCTS_PER_PAGE);
      setOffsets((prev) => ({
        ...prev,
        [key]: currentOffset + filtered.length,
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [
    selectedSubCategory,
    isLargeScreen,
    category_uuid,
    selectedSupermarkets,
    loading,
    offsets,
  ]);

  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    setOffsets({});
    fetchProductsData();
  }, [selectedSubCategory, isLargeScreen]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProductsData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchProductsData]
  );

  const handleSubcategorySelect = (subcategoryId: number | null) => {
    setSelectedSubCategory(subcategoryId);
    setDrawerOpen(false);
    setOffsets((prev) => ({
      ...prev,
      [subcategoryId?.toString() || "category"]: 0,
    }));
  };

  return (
    <>
      <SubcategoryDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        subcategoryList={subcategoryList}
        handleSubcategorySelect={handleSubcategorySelect}
      />

      <div className="sticky top-0 left-0 w-full bg-off-white z-10 lg:hidden">
        <div className="flex items-center pt-4 gap-2 container-default">
          <Link href="/" className="max-w-10 w-10">
            <IconButton sx={{ zIndex: 1000 }}>
              <ArrowLeftIcon width="24px" height="24px" />
            </IconButton>
          </Link>
          <h1 className="text-md text-center font-medium w-full">
            {category.name}
          </h1>
          <div className="w-10"></div>
        </div>

        <SubcategoryTabs
          subcategoryList={subcategoryList}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          subcategoryRefs={subcategoryRefs}
        />
      </div>

      <ProductList
        products={products}
        subcategories={subcategoryList}
        selectedSubCategory={selectedSubCategory}
        handleSubcategorySelect={handleSubcategorySelect}
        category={category}
        loading={loading}
        lastProductElementRef={lastProductElementRef}
      />
    </>
  );
}
