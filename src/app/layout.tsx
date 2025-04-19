import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { SupermarketProvider } from "@/context/SupermarketProvider";
import { ShoppingListProvider } from "@/context/ShoppingListProvider";

export const metadata: Metadata = {
  title: "Super Markets  | Βρες τα Φθηνότερα Ψώνια",
  description: "Βρες τα Φθηνότερα Ψώνια από τα Super Markets της Ελλάδας",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-off-white px-4 py-4">
        <main>
          <SupermarketProvider>
            <ShoppingListProvider>{children}</ShoppingListProvider>
          </SupermarketProvider>
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
