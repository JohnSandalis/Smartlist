import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-full h-full pt-12">
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
  );
}
