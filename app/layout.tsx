import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ReactNode } from "react";
import StoreProvider from "@/lib/store/StoreProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zytravo Trvls — Premium Car Booking",
  description:
    "Experience comfort, safety, and ultimate reliability with Zytravo Trvls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col selection:bg-primary/20 selection:text-primary-dark">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
