// components/KatalogMenu.tsx
"use client";
import { useState } from "react";
import { menu } from "@/data/menu";
import KartuMenu from "./KartuMenu";

export default function KatalogMenu() {
  const [cari, setCari] = useState("");
  const [kat, setKat] = useState("Semua");
  const [urut, setUrut] = useState("awal");

  let hasil = menu.filter(b => {
    const q = cari.toLowerCase();
    const matchCari = b.nama.toLowerCase().includes(q);
    const matchKat = kat === "Semua" || b.kategori === kat;
    return matchCari && matchKat;
  });

  hasil = [...hasil].sort((a,b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.nama.localeCompare(b.nama);
    return a.id - b.id;
  });

  return (
    <div className="space-y-6">
      {/* Filter Bar - udah gak putih polos */}
      <div className="flex flex-wrap gap-3 p-3 rounded- bg-[#FFFBEB] border border-orange-100 shadow-sm">
        <div className="relative flex-1 min-w-">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">⌕</span>
          <input 
            value={cari} 
            onChange={e=>setCari(e.target.value)} 
            placeholder="Cari menu enak..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-orange-100 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition-all"
          />
        </div>
        
        <select 
          value={kat} 
          onChange={e=>setKat(e.target.value)} 
          className="px-4 py-2.5 rounded-xl bg-white border border-orange-100 text-sm font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-200 cursor-pointer"
        >
          <option>Semua</option>
          <option>Makanan</option>
          <option>Minuman</option>
          <option>Camilan</option>
        </select>

        <select 
          value={urut} 
          onChange={e=>setUrut(e.target.value)} 
          className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer"
        >
          <option value="awal">Urutan awal</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      {/* Hasil */}
      {hasil.length === 0 ? (
        <div className="text-center py-16 rounded- bg-[#FFFBEB] border border-dashed border-orange-200">
          <p className="text-4xl mb-2">🍽️</p>
          <p className="font-bold text-zinc-700">Menu tidak ditemukan.</p>
          <p className="text-sm text-zinc-500">Coba kata kunci lain bro</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasil.map(m => <KartuMenu key={m.id} m={m} />)}
        </div>
      )}
    </div>
  );
}