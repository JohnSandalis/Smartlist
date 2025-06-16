import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { SupermarketProvider } from "@/context/SupermarketProvider";
import { ShoppingListProvider } from "@/context/ShoppingListProvider";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Super Markets  | Βρες τα Φθηνότερα Ψώνια",
  description: "Βρες τα Φθηνότερα Ψώνια από τα Super Markets της Ελλάδας",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang="en">
      <body className="bg-off-white px-4 py-4">
        <NextIntlClientProvider>
          <main>
            <UserProvider>
              <SupermarketProvider>
                <ShoppingListProvider>
                  <Header />
                  {children}
                </ShoppingListProvider>
              </SupermarketProvider>
            </UserProvider>
          </main>
          <Toaster richColors position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
