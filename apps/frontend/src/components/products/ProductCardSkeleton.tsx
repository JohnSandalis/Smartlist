import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="rounded-md p-4 flex flex-col items-start justify-start bg-white self-stretch gap-2 animate-pulse">
      <div className="w-full flex gap-2">
        <div className="flex items-center justify-center">
          <div className="min-w-[80px] w-[80px] min-h-[80px] h-[80px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-full text-left flex flex-col items-left justify-between gap-2">
          <div className="text-[12px] w-full font-normal text-gray-900">
            <div className="h-4 bg-gray-300 w-full rounded"></div>
            <div className="h-4 bg-gray-300 w-1/2 rounded mt-2"></div>
          </div>
          <button className="w-[134px]">
            <div className="h-6 bg-gray-300 w-full rounded"></div>
          </button>
        </div>
      </div>
      <ul className="flex gap-2 min-w-[68px] text-left">
        <li className="flex gap-1 items-center">
          <div className="min-w-6 min-h-6 bg-gray-300 rounded-full"></div>
          <div className="text-sm font-normal bg-gray-300 w-14 h-4 rounded"></div>
        </li>
        <li className="flex gap-1 items-center">
          <div className="min-w-6 min-h-6 bg-gray-300 rounded-full"></div>
          <div className="text-sm font-normal bg-gray-300 w-14 h-4 rounded"></div>
        </li>
      </ul>
    </div>
  );
};

export default ProductCardSkeleton;
