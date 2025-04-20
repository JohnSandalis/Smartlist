"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import ShoppingList from "@/components/list/ShoppingList";
import Search from "@/components/search/Search";
import { Category } from "@/lib/types/Category";
import { SubCategory } from "@/lib/types/SubCategory";
import { useParams } from "next/navigation";
import { useSelectedSupermarkets } from "@/context/SupermarketProvider";
import { useShoppingList } from "@/context/ShoppingListProvider";

interface Props {
  category: Category;
  subcategories: SubCategory[];
}

export default function CategoryPageClient({ category, subcategories }: Props) {
  const params = useParams();
  const category_uuid = parseInt(
    Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  );

  const subcategoryList = subcategories.filter(
    (sub) => sub.category_uuid === category_uuid
  );

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const productsPerPage = 10;

  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const subcategoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [listOpen, setListOpen] = useState<boolean>(false);

  const { items: shoppingList } = useShoppingList();

  const [searchOpen, setSearchOpen] = useState(false);

  const listTotalQuantity = shoppingList.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const listTotalPrice = shoppingList.reduce((acc, item) => {
    const minPrice = item.prices.reduce(
      (min, priceObj) => (priceObj.price < min ? priceObj.price : min),
      item.prices[0].price
    );

    return acc + item.quantity * minPrice;
  }, 0);

  const { selected: selectedSupermarkets } = useSelectedSupermarkets();

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

    const start = offsets[selectedSubCategory] || 0;
    const end = start + productsPerPage - 1;

    const supabase = createClient();
    const { data: subSubCategories } = await supabase
      .from("sub_sub_categories")
      .select("uuid")
      .eq("sub_category_uuid", selectedSubCategory);

    if (!subSubCategories || subSubCategories.length === 0) {
      return { data: [] };
    }

    const subSubCategoryUuids = subSubCategories.map((item) =>
      item.uuid.toString()
    );

    const { data } = await supabase
      .from("products")
      .select(
        `
      barcode,
      name,
      image,
      category,
      supplier,
      prices (
        merchant_uuid,
        price,
        price_normalized,
        date,
        unit
      )
    `
      )
      .overlaps("category", subSubCategoryUuids)
      .order("barcode")
      .range(start, end);

    if (data) {
      const filteredProducts = data.filter((product) =>
        product.prices.some((price) =>
          selectedSupermarkets.includes(price.merchant_uuid)
        )
      );

      setProducts((prevProducts) => [...prevProducts, ...filteredProducts]);
      setHasMore(filteredProducts.length === productsPerPage);
      setOffsets((prevOffsets) => ({
        ...prevOffsets,
        [selectedSubCategory]: start + filteredProducts.length,
      }));
    }

    setLoading(false);
  }, [loading, selectedSubCategory, offsets]);

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

  function handleSubcategorySelect(subcategoryId: string) {
    setSelectedSubCategory(subcategoryId);
    setDrawerOpen(false);
    setOffsets((prevOffsets) => ({
      ...prevOffsets,
      [subcategoryId]: 0,
    }));
  }

  return (
    <>
      <Search open={searchOpen} setOpen={setSearchOpen} />

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Link href="/">
          <IconButton
            sx={{ position: "absolute", top: 8, left: 8, zIndex: 1000 }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </IconButton>
        </Link>
        <List
          className="w-full"
          style={{ width: "100vw", height: "100vh", paddingTop: "3rem" }}
        >
          {subcategoryList.map((subcategory) => (
            <ListItem key={subcategory.uuid} disablePadding>
              <ListItemButton
                onClick={() => handleSubcategorySelect(subcategory.uuid)}
              >
                <span className="text-md font-medium leading-6 text-gray-900">
                  {subcategory.name}
                </span>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

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
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide mb-2 py-2">
          {subcategoryList.map((subcategory) => (
            <button
              key={subcategory.uuid}
              // @ts-ignore
              ref={(el) => (subcategoryRefs.current[subcategory.name] = el)}
              onClick={() => setSelectedSubCategory(subcategory.uuid)}
              className={`inline-block px-2 py-1 m-1 ${
                selectedSubCategory === subcategory.uuid
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              } rounded`}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 pb-20">
          {products.map((product, index) =>
            product.prices && product.prices.length > 0 ? (
              <div
                key={`${product.id}-${index}`}
                ref={
                  index === products.length - 1 ? lastProductElementRef : null
                }
              >
                <ProductCard product={product} />
              </div>
            ) : null
          )}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <h2 className="text-lg text-center mt-4">Δεν βρέθηκε κάποιο προϊόν</h2>
      )}

      <div className="fixed bottom-0 left-0 w-full rounded-t-lg bg-white py-4 px-2 shadow-lg">
        <button
          onClick={() => setListOpen((prev) => !prev)}
          className="w-full bg-primary text-white p-4 rounded-xl flex justify-between items-center"
        >
          <div className="w-1/3">
            <span className="flex items-center justify-center bg-white rounded w-6 h-6 text-black">
              {listTotalQuantity}
            </span>
          </div>
          <span className="w-1/3 text-md font-medium">Λίστα</span>
          <span className="w-1/3 text-right text-sm font-medium">
            {listTotalPrice.toFixed(2)}€
          </span>
        </button>
      </div>

      <ShoppingList open={listOpen} setOpen={setListOpen} />
    </>
  );
}
