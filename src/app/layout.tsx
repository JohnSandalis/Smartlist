import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { SupermarketProvider } from "@/context/SupermarketProvider";
import { ShoppingListProvider } from "@/context/ShoppingListProvider";
import { ProductsWithPricesProvider } from "@/context/ProductsWithPricesProvider";

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
            <ShoppingListProvider>
              <ProductsWithPricesProvider>
                {children}
              </ProductsWithPricesProvider>
            </ShoppingListProvider>
          </SupermarketProvider>
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
