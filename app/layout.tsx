import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerraCarbon | Personal Carbon Footprint Tracker",
  description: "Monitor your carbon allowance, track green habits, and forecast ecological savings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#2D3748] dark:bg-[#0A0F0D] dark:text-[#E2E8F0]">
        <Navbar />
        <main className="flex-1 flex flex-col pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
