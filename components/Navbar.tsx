// components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [jumlah, setJumlah] = useState(0);

  const hitung = () => {
    try {
      const k = JSON.parse(localStorage.getItem("keranjang") || "[]");
      const total = k.reduce((a: number, b: { jumlah: number }) => a + b.jumlah, 0);
      setJumlah(total);
    } catch {
      setJumlah(0);
    }
  };

  useEffect(() => {
    hitung();
    window.addEventListener("keranjang-berubah", hitung);
    window.addEventListener("storage", hitung); // biar sinkron antar tab
    return () => {
      window.removeEventListener("keranjang-berubah", hitung);
      window.removeEventListener("storage", hitung);
    };
  }, [pathname]); // re-hitung pas pindah halaman juga

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-[#FFFBEB]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-zinc-900 text-[#FFFBEB] grid place-items-center font-black text-sm">
            K
          </div>
          <span className="font-black text- tracking-tight text-zinc-900">
            KantinKu<span className="text-orange-600">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-orange-100 shadow-sm">
          <Link href="/" className={`px-4 py-1.5 rounded-full text- font-semibold transition-all ${isActive("/") ? "bg-zinc-900 text-white shadow" : "text-zinc-500 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>
            Beranda
          </Link>
          <Link href="/menu" className={`px-4 py-1.5 rounded-full text- font-semibold transition-all ${isActive("/menu") ? "bg-zinc-900 text-white shadow" : "text-zinc-500 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>
            Menu
          </Link>
          <Link href="/keranjang" className={`relative px-4 py-1.5 rounded-full text- font-semibold transition-all flex items-center gap-1.5 ${isActive("/keranjang") ? "bg-zinc-900 text-white shadow" : "text-zinc-500 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>
            Keranjang
            {jumlah > 0 && (
              <span className={`grid place-items-center min-w- h- px-1 rounded-full text- font-black leading-none ${isActive("/keranjang") ? "bg-white text-zinc-900" : "bg-orange-500 text-white"}`}>
                {jumlah}
              </span>
            )}
          </Link>
          <Link href="/riwayat" className={`px-4 py-1.5 rounded-full text- font-semibold transition-all ${isActive("/riwayat") ? "bg-zinc-900 text-white shadow" : "text-zinc-500 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>
            Riwayat
          </Link>
        </div>
      </div>
    </nav>
  );
}