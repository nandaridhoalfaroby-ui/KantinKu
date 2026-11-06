// app/favorit/page.tsx
"use client";
import { useEffect, useState } from "react";
import { menu, Menu } from "@/data/menu";
import KartuMenu from "@/components/KartuMenu";
import Link from "next/link";

export default function FavoritPage(){
  const [data, setData] = useState<Menu[] | null>(null);

  useEffect(() => {
    // LANGSUNG dari data lokal, gak fetch /api/menu lagi
    try {
      const fav: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");
      const filtered = menu.filter(m => fav.includes(m.id));
      setData(filtered);
    } catch {
      setData([]);
    }
  }, []);

  if (data === null) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="h- rounded-2xl bg-[#FFFBEB] border border-orange-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded- bg-[#FFFBEB] border border-orange-100 p-12 text-center">
        <p className="text-5xl">♡</p>
        <h2 className="mt-4 font-black text-xl text-zinc-900">Belum ada favorit</h2>
        <p className="text-sm font-medium text-zinc-600 mt-1">Tap hati di detail menu buat simpan</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">
          Cari Menu Enak
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900">
          Favorit Kamu <span className="text-orange-600">♥</span>
        </h1>
        <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text-xs font-black text-zinc-800">
          {data.length} menu
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(m => <KartuMenu key={m.id} m={m} />)}
      </div>
    </div>
  );
}