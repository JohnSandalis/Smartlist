"use client";
import { useState } from "react";
import Search from "@/components/search/Search";
import { IconButton } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchButton({ className }: { className?: string }) {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <div className={className}>
      <Search open={searchOpen} setOpen={setSearchOpen} />

      <IconButton onClick={() => setSearchOpen(true)}>
        <MagnifyingGlassIcon
          className="text-black"
          width="28px"
          height="28px"
        />
      </IconButton>
    </div>
  );
}
