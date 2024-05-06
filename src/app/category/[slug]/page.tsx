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
import { categories, Category } from "@/lib/data/categories";
import { subCategories, SubCategory } from "@/lib/data/subCategories";
import { supabase } from "@/lib/helper/supabaseClient";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { useAtom } from "jotai";

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

  return (
    <>
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
          <div className="max-w-10 w-10"></div>
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
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              ref={
                index === products.length - 1 ? lastProductElementRef : null
              }
            />
          ))}
        </div>
      ) : (
        <h2 className="text-lg text-center">Δεν βρέθηκε κάποιο προϊόν</h2>
      )}
    </>
  );
};

export default CategoryPage;
