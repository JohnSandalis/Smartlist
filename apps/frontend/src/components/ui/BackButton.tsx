"use client";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();

  const handleBackClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <IconButton type="button" onClick={handleBackClick}>
      <ArrowLeftIcon width="24px" height="24px" />
    </IconButton>
  );
}
