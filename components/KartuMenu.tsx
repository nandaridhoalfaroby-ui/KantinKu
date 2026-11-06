// components/KartuMenu.tsx
"use client";
import { useState, useEffect } from "react";
import { Menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function KartuMenu({ m }: { m: Menu }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    const f: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");
    setFav(f.includes(m.id));
  }, [m.id]);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    const f: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");
    const baru = f.includes(m.id) ? f.filter(x=>x!==m.id) : [...f, m.id];
    localStorage.setItem("favorit", JSON.stringify(baru));
    setFav(!fav);
    window.dispatchEvent(new Event("favorit-berubah"));
  };

  const habis = m.stok === 0;

  return (
    <div className={`relative rounded-2xl border p-4 transition-all
      ${habis 
        ? "bg-[#F3EEE2] border-orange-100 opacity-80" 
        : "bg-[#FFFEF7] border-orange-100 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      <button 
        onClick={toggleFav} 
        className={`absolute top-2.5 right-2.5 h-8 w-8 grid place-items-center rounded-full border text- font-black transition
          ${fav 
            ? "bg-[#FFE4E6] border-red-200 text-red-600" 
            : "bg-[#FFFBEB] border-orange-100 text-zinc-500 hover:text-red-500"
          }`}
      >
        {fav ? "♥" : "♡"}
      </button>

      <Link href={`/menu/${m.id}`} className={habis ? "pointer-events-none" : ""}>
        <h3 className="font-black text- text-zinc-900 pr-8 leading-tight">{m.nama}</h3>
        <p className="mt-1 inline-block rounded-full bg-[#FFFBEB] border border-orange-100 px-2 py-0.5 text- font-bold tracking-wider text-zinc-700">
          {m.kategori}
        </p>
        <p className="text-sm font-black mt-3 text-zinc-900">{rupiah(m.harga)}</p>
        <p className={`text-xs font-bold mt-2 ${habis ? "text-zinc-500" : "text-emerald-700"}`}>
          {habis ? "Habis" : `Stok ${m.stok}`}
        </p>
      </Link>

      {habis && (
        <button disabled className="mt-3 w-full rounded-full bg-[#E9E2CE] border border-orange-100 py-2 text-xs font-black text-zinc-500 cursor-not-allowed">
          Habis
        </button>
      )}
    </div>
  );
}