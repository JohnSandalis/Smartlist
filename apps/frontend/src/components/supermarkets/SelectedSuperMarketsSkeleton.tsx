import React from "react";

const SelectedSuperMarketsSkeleton = () => {
  return (
    <>
      <div className="w-full bg-white rounded-md mb-2 p-3 flex items-center justify-between gap-2 animate-pulse">
        <div className="flex flex-col gap-2 text-start w-full">
          <div className="h-5 bg-gray-300 rounded w-1/2" />{" "}
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full"
              />
            ))}
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded" />{" "}
      </div>
    </>
  );
};

export default SelectedSuperMarketsSkeleton;
