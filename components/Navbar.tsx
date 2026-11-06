// components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [jumlah, setJumlah] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hitung = () => {
      try {
        const k = JSON.parse(localStorage.getItem("keranjang") || "[]");
        setJumlah(k.reduce((a: number, b: { jumlah: number }) => a + b.jumlah, 0));
        const f: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");
        setFavCount(f.length);
      } catch {
        setJumlah(0);
        setFavCount(0);
      }
    };
    hitung();
    window.addEventListener("keranjang-berubah", hitung);
    window.addEventListener("favorit-berubah", hitung);
    window.addEventListener("storage", hitung);
    return () => {
      window.removeEventListener("keranjang-berubah", hitung);
      window.removeEventListener("favorit-berubah", hitung);
      window.removeEventListener("storage", hitung);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const linkBase = "px-4 py-1.5 rounded-full text- font-black transition-all flex items-center gap-1.5";

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-[#FFFBEB]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-zinc-900 text-[#FFFBEB] grid place-items-center font-black text-sm">K</div>
          <span className="font-black text- tracking-tight text-zinc-900">
            KantinKu<span className="text-orange-600">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 p-1 rounded-full bg-[#FFFEF7] border border-orange-100 shadow-sm">
          <Link href="/" className={`${linkBase} ${isActive("/") ? "bg-[#FFC837] border border-amber-300 text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>Beranda</Link>
          <Link href="/menu" className={`${linkBase} ${isActive("/menu") ? "bg-[#FFC837] border border-amber-300 text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>Menu</Link>
          <Link href="/favorit" className={`${linkBase} ${isActive("/favorit") ? "bg-[#FFC837] border border-amber-300 text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>
            Favorit {mounted && favCount > 0 && <span className="grid place-items-center min-w- h- px-1 rounded-full text- font-black bg-[#FFE4E6] border border-red-200 text-red-700">{favCount}</span>}
          </Link>
          <Link href="/keranjang" className={`${linkBase} ${isActive("/keranjang") ? "bg-[#FFC837] border border-amber-300 text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>
            Keranjang {mounted && jumlah > 0 && <span className="grid place-items-center min-w- h- px-1 rounded-full text- font-black bg-orange-400 border border-orange-500 text-zinc-900">{jumlah}</span>}
          </Link>
          <Link href="/riwayat" className={`${linkBase} ${isActive("/riwayat") ? "bg-[#FFC837] border border-amber-300 text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-[#FFFBEB]"}`}>Riwayat</Link>
        </div>
      </div>
    </nav>
  );
}