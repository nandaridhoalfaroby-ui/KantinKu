// app/menu/[id]/page.tsx
"use client";
import { menu, rupiah } from "@/data/menu";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import Link from "next/link";

type Keranjang = { id: number; jumlah: number };

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const item = menu.find((m) => m.id === id);

  const [jml, setJml] = useState(1);
  const [pesan, setPesan] = useState("");
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const f: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");
    setFav(f.includes(id));
  }, [id]);

  const toggleFav = () => {
    const f: number[] = JSON.parse(localStorage.getItem("favorit") || "[]");
    const baru = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
    localStorage.setItem("favorit", JSON.stringify(baru));
    setFav(!fav);
    window.dispatchEvent(new Event("favorit-berubah"));
  };

  if (!item) notFound();
  if (item.stok === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded- bg-[#FFFBEB] border border-orange-100 p-10 text-center">
        <p className="text-4xl">😥</p>
        <h1 className="mt-3 text-xl font-black text-zinc-900">{item.nama} lagi habis</h1>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-[#FFC837] border border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900">Balik ke Menu</Link>
      </div>
    );
  }

  const handleTambah = () => {
    setPesan("");
    if (jml < 1) return setPesan("Jumlah minimal 1");
    const keranjang: Keranjang[] = JSON.parse(localStorage.getItem("keranjang") || "[]");
    const ada = keranjang.find((k) => k.id === id);
    const totalMau = (ada?.jumlah || 0) + jml;
    if (totalMau > item.stok) return setPesan(`Stok gak cukup. Sisa ${item.stok}`);
    const baru = ada ? keranjang.map((k) => (k.id === id ? { ...k, jumlah: totalMau } : k)) : [...keranjang, { id, jumlah: jml }];
    localStorage.setItem("keranjang", JSON.stringify(baru));
    window.dispatchEvent(new Event("keranjang-berubah"));
    setPesan("Ditambahkan ke keranjang ✓");
  };

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-8">
        <span className="inline-block rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-bold text-zinc-700">{item.kategori}</span>
        <h1 className="mt-4 text-4xl font-black text-zinc-900">{item.nama}</h1>
        <p className="mt-8 text-3xl font-black text-zinc-900">{rupiah(item.harga)}</p>
      </div>
      <div className="rounded- bg-[#FFFEF7] border border-orange-100 p-8">
        <div className="flex gap-3">
          <button onClick={toggleFav} className={`flex-1 rounded-full py-4 text-sm font-black border-2 ${fav ? "bg-[#FFE4E6] border-red-200 text-red-700" : "bg-[#FFFEF7] border-orange-100 text-zinc-900"}`}>{fav ? "♥ Favorit" : "♡ Favorit"}</button>
          <button onClick={handleTambah} className="flex-[1.5] rounded-full bg-[#FFC837] border-2 border-amber-400 py-4 text-sm font-black text-zinc-900">+ Keranjang</button>
        </div>
        {pesan && <div className="mt-4 rounded-xl bg-[#DCFCE7] border border-emerald-200 px-4 py-3 text-sm font-bold text-zinc-900">{pesan}</div>}
      </div>
    </div>
  );
}