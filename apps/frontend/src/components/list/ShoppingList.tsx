import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
} from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { useShoppingList } from "@/context/ShoppingListProvider";
import { useMemo } from "react";

export default function ShoppingList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { items: shoppingList } = useShoppingList();

  const latestPriceDate = useMemo(() => {
    const allDates = shoppingList
      .flatMap((item) => item.prices?.map((price) => price.date) || [])
      .filter(Boolean)
      .map((date) => new Date(date));

    if (allDates.length === 0) return null;

    return new Date(Math.max(...allDates.map((d) => d.getTime())));
  }, [shoppingList]);

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
      <DialogTitle className="bg-off-white text-center !p-6 page-title">
        Λίστα
      </DialogTitle>
      <DialogContent className="bg-off-white grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto !px-4 !py-6 sm:!px-6 auto-rows-min container-default w-full">
        {shoppingList.map((item) => {
          const product = shoppingList.find((p) => p.barcode === item.barcode);

          return product ? (
            <ProductCard key={item.barcode} product={product} />
          ) : null;
        })}
        {latestPriceDate && (
          <h2 className="text-center mt-4 md:col-span-2">
            Η τιμή των προϊόντων που αναγράφεται αφορά την{" "}
            {latestPriceDate.toLocaleDateString("en-GB")}
          </h2>
        )}
      </DialogContent>
      <DialogActions className="w-full !rounded-t-lg bg-white !py-4 !px-2 shadow-actions container-default">
        <Link
          href="/list"
          className="w-full bg-primary text-white p-4 rounded-xl text-center font-semibold"
        >
          Επόμενο
        </Link>
        <IconButton
          onClick={handleClose}
          sx={{
            zIndex: 1000,
            position: "absolute",
            top: "20px",
            left: {
              xs: "20px",
              lg: `max(20px, calc((100vw - 1400px) / 2 + 20px))`,
            },
          }}
        >
          <ArrowLeftIcon width="24px" height="24px" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
