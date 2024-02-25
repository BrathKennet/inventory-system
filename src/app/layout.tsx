import type { Metadata } from "next";
import { Crete_Round } from "next/font/google";
import "./globals.css";

const crete = Crete_Round({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Inventory System",
  description: "Inventory System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crete.className} bg-background text-primary`}>
        {children}
      </body>
    </html>
  );
}
