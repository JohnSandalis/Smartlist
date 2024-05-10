import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
} from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProductCheckbox from "@/components/list/ProductCheckbox";
import { supermarkets, Supermarkets } from "@/lib/data/supermarkets";
import { CombinationResult } from "@/utils/supermarketSplit";
import Image from "next/image";

export default function ProductListComb({
  combination,
  combinationIndex,
  open,
  setOpen,
}: {
  combination: CombinationResult;
  combinationIndex: number;
  open: boolean;
  setOpen: (open: boolean) => void;

}) {
  // Explicitly close the dialog only via the close button
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
        {combination.supermarkets.map((supermarket, index) => {
          const supermarketImage = supermarkets[supermarket]?.image_url;
          const supermarketName = supermarkets[supermarket]?.store_name;

          return (
            <div
              key={`sm-comb-${combinationIndex}-${index}`}
              className="flex flex-col items-center justify-center mb-4 gap-2"
            >
              <div className="w-full flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 mb-2">
                  <Image
                    src={supermarketImage}
                    alt={supermarket}
                    width="225"
                    height="225"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h2 className="text-xl font-medium capitalize">
                  {supermarketName}
                </h2>
              </div>
              {combination[supermarket].map((product: any) => (
                <ProductCheckbox
                  key={`product-${product.id}`}
                  product={product}
                  supermarket={supermarket}
                />
              ))}
            </div>
          );
        })}
      </DialogContent>
      <DialogActions className="w-full !rounded-t-lg bg-white !py-4 !px-2 !shadow-lg">
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
