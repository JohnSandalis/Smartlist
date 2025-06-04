import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@mui/material";

export default function Loading() {
  return (
    <>
      <div className="absolute top-0 left-0 bg-white w-full h-[100vh] pt-12 lg:hidden">
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: {
              xs: "20px",
              lg: `max(20px, calc((100vw - 1400px) / 2 + 20px))`,
            },
            zIndex: 1000,
          }}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </IconButton>

        <div className="w-full flex flex-col gap-4 container-default px-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={`loading-${index}`}
              className="h-6 bg-gray-200 rounded animate-pulse w-[80%] max-w-[300px]"
            />
          ))}
        </div>
      </div>
      <div className="hidden lg:flex gap-4 lg:mt-4 container-default">
        <div className="min-w-[300px] bg-white p-4 rounded-lg shadow-actions sticky top-[90px] h-fit">
          <div className="flex items-center gap-2">
            <ArrowLeftIcon width="16px" height="16px" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>

          <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mt-4 mb-2" />

          <ul className="flex flex-col gap-2 pl-4">
            {[...Array(4)].map((_, i) => (
              <li
                key={i}
                className="h-4 bg-gray-200 rounded animate-pulse w-40"
              />
            ))}
          </ul>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 pb-20 container-default lg:mx-0 lg:max-w-none">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mb-2 col-span-2 xl:col-span-3" />

          {Array.from({ length: 20 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    </>
  );
}
