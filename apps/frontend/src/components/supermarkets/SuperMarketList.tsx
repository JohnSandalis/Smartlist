import {
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  SlideProps,
} from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import SuperMarketCard from "./SuperMarketCard";
import { FC } from "react";
import { type Supermarket } from "@smartlist/schemas";
import { useTranslations } from "next-intl";

type SupermarketMap = Record<string, Supermarket>;

interface SuperMarketsListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  supermarkets: SupermarketMap;
}

const SuperMarketsList: FC<SuperMarketsListProps> = ({
  open,
  setOpen,
  supermarkets,
}) => {
  const t = useTranslations("selectedSupermarkets");
  const handleClose = (): void => {
    setOpen(false);
  };

  const sortedSupermarkets = Object.values(supermarkets).sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" } as SlideProps}
      fullScreen
      className="!bg-off-white"
      PaperProps={{
        style: { backgroundColor: "#f4f4f4" },
      }}
    >
      <DialogContent className="bg-off-white flex flex-col gap-2 overflow-y-auto !px-4 !py-6 sm:!px-6 w-full container-default">
        <span className="text-xl text-center font-semibold mt-8 px-16">
          {t("title")}
        </span>
        <p className="text-md text-center px-4">{t("subtitle")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-min gap-2 mt-4">
          {sortedSupermarkets.map((supermarket) => (
            <SuperMarketCard
              key={supermarket.merchant_uuid}
              supermarket={supermarket}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions className="w-full !rounded-t-lg bg-white !py-4 !px-2 !shadow-lg container-default">
        <button onClick={() => setOpen(false)} className="w-full btn-primary">
          {t("button")}
        </button>
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
};

export default SuperMarketsList;
