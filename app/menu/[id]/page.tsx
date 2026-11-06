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
      <div className="mx-auto max-w-2xl rounded- bg-[#FFFBEB] border border-orange-100 p-12 text-center shadow-sm">
        <div className="mx-auto h-16 w-16 rounded-full bg-[#FFFEF7] border border-orange-100 grid place-items-center text-3xl">😥</div>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-zinc-900">{item.nama} lagi habis</h1>
        <p className="mt-1 text-sm font-medium text-zinc-600">Coba cek menu lain dulu ya</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-7 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">Balik ke Menu</Link>
      </div>
    );
  }

  const handleTambah = () => {
    setPesan("");
    if (jml < 1) return setPesan("Jumlah minimal 1");
    const keranjang: Keranjang[] = JSON.parse(localStorage.getItem("keranjang") || "[]");
    const ada = keranjang.find((k) => k.id === id);
    const totalMau = (ada?.jumlah || 0) + jml;
    if (totalMau > item.stok) return setPesan(`Stok gak cukup. Sisa ${item.stok}, di keranjang udah ada ${ada?.jumlah || 0}`);
    const baru = ada ? keranjang.map((k) => (k.id === id ? { ...k, jumlah: totalMau } : k)) : [...keranjang, { id, jumlah: jml }];
    localStorage.setItem("keranjang", JSON.stringify(baru));
    window.dispatchEvent(new Event("keranjang-berubah"));
    setPesan("Ditambahkan ke keranjang ✓");
  };

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      {/* KIRI - INFO */}
      <div className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 flex flex-col min-h-">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-black tracking-wider text-zinc-700 shadow-sm">{item.kategori}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] border border-emerald-200 px-3 py-1 text- font-black text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> STOK {item.stok}
            </span>
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight leading-[0.9] text-zinc-900">{item.nama}</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed font-medium text-zinc-600">
            Dibuat fresh setiap hari, porsi pas buat anak kost tapi rasa bintang lima. 
            Pesan sekarang, tinggal ambil di kantin.
          </p>
        </div>

        <div className="relative mt-auto pt-10">
          <p className="text- font-bold tracking-widest text-zinc-500">HARGA SATUAN</p>
          <p className="mt-1 text-4xl font-black text-zinc-900">{rupiah(item.harga)}</p>
          <p className="mt-2 text-xs font-bold text-zinc-600">Total <span className="font-black text-zinc-900">{rupiah(item.harga * jml)}</span> untuk {jml} porsi</p>
        </div>
      </div>

      {/* KANAN - ACTION */}
      <div className="rounded- bg-[#FFFEF7] border border-orange-100 p-7 md:p-8 shadow-sm flex flex-col">
        <p className="text- font-bold tracking-widest text-zinc-500">ATUR PESANAN</p>

        <div className="mt-4 flex items-center gap-3 rounded-full bg-[#FFFBEB] border border-orange-100 p-1.5">
          <button onClick={() => setJml(v => Math.max(1, v-1))} className="h-11 w-11 rounded-full bg-[#FFFEF7] border border-orange-100 grid place-items-center font-black text-zinc-900 hover:bg-white transition">−</button>
          <div className="flex-1 text-center">
            <span className="text-lg font-black text-zinc-900">{jml}</span>
            <span className="ml-1 text-xs font-bold text-zinc-600">porsi</span>
          </div>
          <button onClick={() => setJml(v => Math.min(item.stok, v+1))} className="h-11 w-11 rounded-full bg-[#FFFEF7] border border-orange-100 grid place-items-center font-black text-zinc-900 hover:bg-white transition">+</button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={toggleFav} className={`rounded-full py-4 text-sm font-black border-2 transition flex items-center justify-center gap-1.5 ${fav ? "bg-[#FFE4E6] border-red-200 text-red-700 shadow-sm" : "bg-[#FFFBEB] border-orange-100 text-zinc-900 hover:bg-orange-100"}`}>
            {fav ? "♥ Favorit" : "♡ Favorit"}
          </button>
          <button onClick={handleTambah} className="rounded-full bg-[#FFC837] border-2 border-amber-400 py-4 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 active:translate-y-0 transition-all">
            + Keranjang
          </button>
        </div>

        {pesan && (
          <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-bold ${pesan.includes("✓") ? "bg-[#DCFCE7] border-emerald-200 text-zinc-900" : "bg-[#FFE4E6] border-red-200 text-red-700"}`}>
            {pesan}
          </div>
        )}

        <div className="mt-auto pt-10 space-y-3">
          <div className="rounded-2xl bg-[#FFFBEB] border border-orange-100 p-4">
            <p className="text-xs font-bold text-zinc-700">Tips jajan hemat:</p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-zinc-600">Pakai kode <span className="font-black text-zinc-900 bg-[#FFC837] border border-amber-300 rounded-full px-2 py-0.5">HEMAT10</span> di keranjang buat diskon 10% min. 20k</p>
          </div>
          <div className="flex gap-2">
            <Link href="/menu" className="flex-1 text-center rounded-full bg-[#FFFBEB] border border-orange-100 py-3 text-sm font-black text-zinc-900 hover:bg-orange-100 transition">Lanjut Belanja</Link>
            <Link href="/keranjang" className="flex-1 text-center rounded-full bg-[#FFFEF7] border border-zinc-200 py-3 text-sm font-black text-zinc-900 hover:bg-zinc-50 transition">Keranjang</Link>
          </div>
        </div>
      </div>
    </div>
  );
}