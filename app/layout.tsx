import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jayasree Travels — Premium Car Booking",
  description:
    "Book premium private cars for your next journey. Seamless booking, verified fleet, and 24/7 support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col selection:bg-primary/20 selection:text-primary-dark">
        {children}
      </body>
    </html>
  );
}
