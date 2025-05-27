import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";

interface SubcategoryDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  subcategoryList: { uuid: number; name: string }[];
  handleSubcategorySelect: (uuid: number) => void;
}

export default function SubcategoryDrawer({
  drawerOpen,
  setDrawerOpen,
  subcategoryList,
  handleSubcategorySelect,
}: SubcategoryDrawerProps) {
  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Link href="/">
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: {
              xs: "20px",
              lg: `max(20px, calc((100vw - 1400px) / 2 + 20px))`,
            },
            zIndex: 1000,
          }}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </IconButton>
      </Link>
      <List
        className="w-full container-default px-4"
        style={{ width: "100vw", height: "100vh", paddingTop: "3rem" }}
      >
        {subcategoryList.map((subcategory) => (
          <ListItem key={subcategory.uuid} disablePadding>
            <ListItemButton
              onClick={() => handleSubcategorySelect(subcategory.uuid)}
            >
              <span className="text-md font-medium leading-6 text-gray-900">
                {subcategory.name}
              </span>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
