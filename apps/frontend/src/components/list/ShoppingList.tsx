"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  SlideProps,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { useShoppingList } from "@/context/ShoppingListProvider";
import { useMediaQuery } from "@mui/material";

export default function ShoppingList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { items: shoppingList } = useShoppingList();
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const handleClose = () => {
    setOpen(false);
  };

  const latestPriceDate = shoppingList.reduce((latest, item) => {
    const itemDate = item.prices?.[0]?.date
      ? new Date(item.prices[0].date)
      : null;
    return itemDate && (!latest || itemDate > latest) ? itemDate : latest;
  }, null as Date | null);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: isMdUp ? "left" : "up" } as SlideProps}
      fullScreen={!isMdUp}
      className="!bg-transparent"
      sx={{
        "& .MuiDialog-container": {
          bgcolor: "transparent",
        },
        "& .MuiBackdrop-root": {
          bgcolor: "rgba(0, 0, 0, 0.5)",
        },
        "& .MuiPaper-root": {
          display: "flex",
          flexDirection: "column",
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: "#f4f4f4",
          ...(isMdUp && {
            position: "fixed",
            right: 0,
            left: "auto",
            minHeight: "100vh",
            maxWidth: "600px",
            margin: 0,
            borderRadius: 0,
          }),
        },
      }}
    >
      <DialogTitle className="bg-off-white text-center !p-6 page-title">
        Λίστα
      </DialogTitle>
      <DialogContent className="bg-off-white flex-1 grid grid-cols-1 gap-2 overflow-y-auto !px-4 !py-6 sm:!px-6 auto-rows-min container-default w-full">
        {shoppingList.map((item) => {
          const product = shoppingList.find((p) => p.barcode === item.barcode);

          return product ? (
            <ProductCard key={item.barcode} product={product} />
          ) : null;
        })}
        {latestPriceDate && (
          <h2 className="text-center mt-4">
            Η τιμή των προϊόντων που αναγράφεται αφορά την{" "}
            {latestPriceDate.toLocaleDateString("en-GB")}
          </h2>
        )}
      </DialogContent>
      <DialogActions className="w-full !m-0 !p-2 !rounded-t-lg bg-white shadow-actions container-default">
        <Link
          href="/list"
          onClick={handleClose}
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
              lg: `20px`,
            },
          }}
        >
          <ArrowLeftIcon width="24px" height="24px" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
