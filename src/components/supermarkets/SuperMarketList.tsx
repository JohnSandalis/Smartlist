import {
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  SlideProps
} from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { supermarkets } from "@/lib/data/supermarkets";
import SuperMarketCard from "./SuperMarketCard";
import { FC } from "react";

interface SuperMarketsListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SuperMarketsList: FC<SuperMarketsListProps> = ({ open, setOpen }) => {
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" } as SlideProps}
      fullScreen
      className="!bg-off-white"
      PaperProps={{
        style: { backgroundColor: "#f4f4f4" }
      }}
    >
      <DialogContent className="bg-off-white flex flex-col gap-2 overflow-y-auto !px-4 !py-6 sm:!px-6">
        <span className="text-xl text-center font-semibold mt-12 px-16">
          Διάλεξε Super Market
        </span>
        <p className="text-md text-center px-4">
          Επίλεξε τα super market που σε εξυπηρετούν καλύτερα.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.keys(supermarkets).map((key) => {
            const supermarket = supermarkets[key];
            return <SuperMarketCard key={key} supermarket={supermarket} />;
          })}
        </div>
      </DialogContent>
      <DialogActions className="w-full !rounded-t-lg bg-white !py-4 !px-2 !shadow-lg">
        <button onClick={() => setOpen(false)} className="w-full btn-primary">
          Αποθήκευση
        </button>
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

export default SuperMarketsList;
