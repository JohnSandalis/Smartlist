"use client";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton({
  href,
  noOffset,
}: {
  href?: string;
  noOffset?: boolean;
}) {
  const router = useRouter();

  const handleBackClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <IconButton
      type="button"
      onClick={handleBackClick}
      sx={{
        zIndex: 1000,
        position: "absolute",
        top: "20px",
        left: {
          xs: "20px",
          lg: noOffset
            ? `max(20px, calc((100vw - 1400px) / 2))`
            : `max(20px, calc((100vw - 1400px) / 2 + 20px))`,
        },
      }}
    >
      <ArrowLeftIcon width="24px" height="24px" />
    </IconButton>
  );
}
