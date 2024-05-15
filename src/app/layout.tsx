import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

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
      <body className="bg-off-white px-4 py-4"><main>{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
