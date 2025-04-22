"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import ShoppingList from "@/components/list/ShoppingList";
import Search from "@/components/search/Search";
import { Category } from "@/lib/types/Category";
import { SubCategory } from "@/lib/types/SubCategory";
import { useParams } from "next/navigation";
import { useSelectedSupermarkets } from "@/context/SupermarketProvider";
import { useShoppingList } from "@/context/ShoppingListProvider";
import { fetchProducts, fetchSubSubCategoryUuids } from "@/utils/api/products";
import SubcategoryDrawer from "./components/SubcategoryDrawer";
import SubcategoryTabs from "./components/SubcategoryTabs";
import ProductList from "./components/ProductList";

interface Props {
  category: Category;
  subcategories: SubCategory[];
}

export default function CategoryPageClient({ category, subcategories }: Props) {
  const params = useParams();
  const { selected: selectedSupermarkets } = useSelectedSupermarkets();
  const { items: shoppingList, totalItems, totalPrice } = useShoppingList();

  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const [listOpen, setListOpen] = useState<boolean>(false);

  const PRODUCTS_PER_PAGE = 10;

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
    if (selectedSubCategory && subcategoryRefs.current[selectedSubCategory]) {
      window.scrollTo({ top: 0 });
      subcategoryRefs.current[selectedSubCategory]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedSubCategory]);

  const getProducts = useCallback(async () => {
    if (loading || !selectedSubCategory) return;

    setLoading(true);
    const supabase = createClient();

    const currentOffset = offsets[selectedSubCategory] || 0;
    const endOffset = currentOffset + PRODUCTS_PER_PAGE - 1;

    try {
      const subSubCategoryUuids = await fetchSubSubCategoryUuids(
        supabase,
        selectedSubCategory
      );

      if (subSubCategoryUuids.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const fetchedProducts = await fetchProducts(
        supabase,
        subSubCategoryUuids,
        currentOffset,
        endOffset
      );

      const filtered = fetchedProducts.filter((product) =>
        product.prices?.some((price) =>
          selectedSupermarkets.includes(price.merchant_uuid)
        )
      );

      setProducts((prev) => [...prev, ...filtered]);
      setHasMore(filtered.length === PRODUCTS_PER_PAGE);
      setOffsets((prev) => ({
        ...prev,
        [selectedSubCategory]: currentOffset + filtered.length,
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, selectedSubCategory, offsets, selectedSupermarkets]);

  useEffect(() => {
    if (selectedSubCategory) {
      setProducts([]);
      setHasMore(true);
      setOffsets({});
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubCategory]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, getProducts]
  );

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubCategory(subcategoryId);
    setDrawerOpen(false);
    setOffsets((prev) => ({ ...prev, [subcategoryId]: 0 }));
  };

  return (
    <>
      <Search open={searchOpen} setOpen={setSearchOpen} />

      <SubcategoryDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        subcategoryList={subcategoryList}
        handleSubcategorySelect={handleSubcategorySelect}
      />

      <div className="sticky top-0 left-0 w-full bg-off-white z-10">
        <div className="flex items-center pt-4 gap-2">
          <Link href="/" className="max-w-10 w-10">
            <IconButton sx={{ zIndex: 1000 }}>
              <ArrowLeftIcon width="24px" height="24px" />
            </IconButton>
          </Link>
          <h1 className="text-md text-center font-medium w-full">
            {category?.name}
          </h1>
          <div className="w-10">
            <IconButton
              onClick={() => setSearchOpen(true)}
              sx={{ zIndex: 1000 }}
            >
              <MagnifyingGlassIcon width="24px" height="24px" />
            </IconButton>
          </div>
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
        loading={loading}
        lastProductElementRef={lastProductElementRef}
      />

      <div className="fixed bottom-0 left-0 w-full rounded-t-lg bg-white py-4 px-2 shadow-lg">
        <button
          onClick={() => setListOpen((prev) => !prev)}
          className="w-full bg-primary text-white p-4 rounded-xl flex justify-between items-center"
        >
          <div className="w-1/3">
            <span className="flex items-center justify-center bg-white rounded w-6 h-6 text-black">
              {totalItems}
            </span>
          </div>
          <span className="w-1/3 text-md font-medium">Λίστα</span>
          <span className="w-1/3 text-right text-sm font-medium">
            {totalPrice.toFixed(2)}€
          </span>
        </button>
      </div>

      <ShoppingList open={listOpen} setOpen={setListOpen} />
    </>
  );
}
