import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { Product } from "@/app/page";

export default function Search({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [results, setResults] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      // @ts-ignore
      TransitionProps={{ direction: "up" }}
      fullScreen
      className="!bg-off-white"
      PaperProps={{
        style: { backgroundColor: "#f4f4f4" },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ zIndex: 1000, position: "absolute", top: "24px", left: "20px" }}
      >
        <ArrowLeftIcon width="24px" height="24px" />
      </IconButton>
      <DialogTitle className="bg-off-white text-center !p-6 page-title">
        <SearchBar setLoading={setLoading} setResults={setResults} />
      </DialogTitle>
      <DialogContent className="bg-off-white flex flex-col gap-2 overflow-y-auto !px-4 !pb-6 sm:!px-6">
        {loading && (
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        )}
        {results && results.length > 0 && <SearchResults results={results} />}
        {results && results.length === 0 && (
          <span className="text-center">Δεν βρέθηκε κανένα προϊόν</span>
        )}
      </DialogContent>
    </Dialog>
  );
}
