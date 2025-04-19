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

export default function ShoppingList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { items: shoppingList } = useShoppingList();

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
      <DialogContent className="bg-off-white flex flex-col gap-2 overflow-y-auto !px-4 !py-6 sm:!px-6">
        {shoppingList.map((product) => (
          <ProductCard key={product.barcode} product={product} />
        ))}
      </DialogContent>
      <DialogActions className="w-full !rounded-t-lg bg-white !py-4 !px-2 !shadow-lg">
        <Link
          href="/list"
          className="w-full bg-primary text-white p-4 rounded-xl text-center font-semibold"
        >
          Επόμενο
        </Link>
        <IconButton
          onClick={handleClose}
          sx={{ zIndex: 1000, position: "absolute", top: "20px", left: "20px" }}
        >
          <ArrowLeftIcon width="24px" height="24px" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
