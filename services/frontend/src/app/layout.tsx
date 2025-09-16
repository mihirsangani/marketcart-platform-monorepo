import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketCart - Your Trusted Shopping Partner",
  description: "Discover amazing products with fast delivery and great prices. Shop from thousands of authentic products with quality guarantee.",
  keywords: "ecommerce, shopping, online store, products, deals, MarketCart",
  authors: [{ name: "MarketCart Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
