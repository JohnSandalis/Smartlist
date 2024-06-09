'use client'
import { useEffect, useState, useRef, useCallback } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { categories } from "@/lib/data/categories";
import { subCategories } from "@/lib/data/subCategories";
import { createClient } from "@/utils/supabase/client";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { shoppingListAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import ShoppingList from "@/components/list/ShoppingList";
import Search from "@/components/search/Search";
import { Category } from "@/lib/types/Category";
import { SubCategory } from "@/lib/types/SubCategory";

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage: NextPage<CategoryPageProps> = ({ params }) => {
  const category_id = params.slug;
  const category = categories.find((c: Category) => c.id === category_id);
  const subcategoryList = subCategories[category_id] as SubCategory[];

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const productsPerPage = 10;

  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const subcategoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [listOpen, setListOpen] = useState<boolean>(false);
  const [shoppingList] = useAtom(shoppingListAtom);

  const [searchOpen, setSearchOpen] = useState(false);

  const listTotalQuantity = shoppingList.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const listTotalPrice = shoppingList.reduce((acc, item) => {
    const minPrice = item.Prices.reduce(
      (min, priceObj) => (priceObj.price < min ? priceObj.price : min),
      item.Prices[0].price
    );

    return acc + item.quantity * minPrice;
  }, 0);

  useEffect(() => {
    if (selectedSubCategory && subcategoryRefs.current[selectedSubCategory]) {
      window.scrollTo({ top: 0 });
      // @ts-ignore
      subcategoryRefs.current[selectedSubCategory].scrollIntoView({
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
    const { data } = await supabase
      .from("Products")
      .select("id, title, brand, category, Prices(price, store_name, imageUrl)", {
        count: "exact",
      })
      .eq("category", selectedSubCategory)
      .order("id")
      .range(start, end);

    if (data) {
      setProducts(prevProducts => [...prevProducts, ...data]);
      setHasMore(data.length === productsPerPage);
      setOffsets(prevOffsets => ({
        ...prevOffsets,
        [selectedSubCategory]: start + data.length,
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

  const observer = useRef<IntersectionObserver>();
  const lastProductElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          getProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, getProducts]
  );

  function handleSubcategorySelect(subcategoryName: string) {
    setSelectedSubCategory(subcategoryName);
    setDrawerOpen(false);
    setOffsets(prevOffsets => ({
      ...prevOffsets,
      [subcategoryName]: 0,
    }));
  }

  console.log(JSON.stringify(products))

  return (
    <>
      <Search open={searchOpen} setOpen={setSearchOpen} />
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Link href="/">
          <IconButton sx={{ position: "absolute", top: 8, left: 8, zIndex: 1000 }}>
            <ArrowLeftIcon className="h-5 w-5" />
          </IconButton>
        </Link>
        <List className="w-full" style={{ width: "100vw", height: "100vh", paddingTop: "3rem" }}>
          {subcategoryList.map(subcategory => (
            <ListItem key={subcategory.id} disablePadding>
              <ListItemButton onClick={() => handleSubcategorySelect(subcategory.name)}>
                <span className="text-md font-medium leading-6 text-gray-900">
                  {subcategory.greek_name}
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
            {category?.greek_name}
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
          {subcategoryList.map((subcategory, index) => (
            <button
              key={subcategory.id}
              // @ts-ignore
              ref={(el) => (subcategoryRefs.current[subcategory.name] = el)}
              onClick={() => setSelectedSubCategory(subcategory.name)}
              className={`inline-block px-2 py-1 m-1 ${selectedSubCategory === subcategory.name
                ? "bg-primary text-white"
                : "bg-white text-black"
                } rounded`}
            >
              {subcategory.greek_name}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-2">
          {products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
          {loading &&
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {products.map((product, index) => (
            product.Prices && product.Prices.length > 0 ? <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              ref={
                index === products.length - 1 ? lastProductElementRef : null
              }
            /> : undefined
          ))}
        </div>
      ) : (
        <h2 className="text-lg text-center">Δεν βρέθηκε κάποιο προϊόν</h2>
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
};

export default CategoryPage;
