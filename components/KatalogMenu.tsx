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
    return a.id - b.id; // urutan awal
  });

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input value={cari} onChange={e=>setCari(e.target.value)} placeholder="Cari menu..." className="border p-2 rounded"/>
        <select value={kat} onChange={e=>setKat(e.target.value)} className="border p-2 rounded">
          <option>Semua</option>
          <option>Makanan</option>
          <option>Minuman</option>
          <option>Camilan</option>
        </select>
        <select value={urut} onChange={e=>setUrut(e.target.value)} className="border p-2 rounded">
          <option value="awal">Urutan awal</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      {hasil.length === 0 ? <p>Menu tidak ditemukan.</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasil.map(m => <KartuMenu key={m.id} m={m} />)}
        </div>
      )}
    </div>
  );
}