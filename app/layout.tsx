import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "KantinKu",
  description: "Pesan makanan favoritmu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#FFFBEB] min-h-screen antialiased">
        <Suspense fallback={<div className="h- border-b border-orange-100 bg-[#FFFBEB]" />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto max-w-6xl px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}