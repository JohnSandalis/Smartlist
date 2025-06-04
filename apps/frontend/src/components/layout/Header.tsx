import { IconButton } from "@mui/material";
import ShoppingListButton from "../list/ShoppingListButton";
import SearchButton from "../search/SearchButton";
import SearchCompact from "../search/SearchCompact";
import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="lg:sticky top-0 left-0 right-0 z-50 bg-white mb-2 mx-[-1rem] my-[-1rem] p-3 shadow-actions">
      <div className="container-default flex items-center justify-between gap-2">
        <Link href="/">
          <Image
            src="/images/smart-list-logo.png"
            alt="Smart list logo"
            width={144}
            height={35}
          />
        </Link>
        <SearchCompact className="hidden md:block" />

        <div className="flex items-center md:gap-2">
          <SearchButton className="md:hidden" />
          <Link href="/account">
            <IconButton>
              <UserCircleIcon
                className="text-black"
                width="32px"
                height="32px"
              />
            </IconButton>
          </Link>
          <ShoppingListButton />
        </div>
      </div>
    </header>
  );
}
