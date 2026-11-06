"use client";
import { menu, rupiah } from "@/data/menu";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type Keranjang = { id: number; jumlah: number };

export default function DetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const item = menu.find((m) => m.id === id);

  const [jml, setJml] = useState(1);
  const [pesan, setPesan] = useState("");

  if (!item) notFound();

  const isHabis = item.stok === 0;
  const sisaDiKeranjang = () => {
    try {
      const k: Keranjang[] = JSON.parse(localStorage.getItem("keranjang") || "[]");
      return k.find((x) => x.id === id)?.jumlah || 0;
    } catch { return 0 }
  };

  const handleTambah = () => {
    setPesan("");
    if (jml < 1) return setPesan("Jumlah minimal 1");

    const keranjang: Keranjang[] = JSON.parse(localStorage.getItem("keranjang") || "[]");
    const ada = keranjang.find((k) => k.id === id);
    const totalMau = (ada?.jumlah || 0) + jml;

    if (totalMau > item.stok) {
      return setPesan(`Stok gak cukup. Sisa ${item.stok}, di keranjang udah ada ${ada?.jumlah || 0}`);
    }

    const baru = ada
      ? keranjang.map((k) => (k.id === id ? { ...k, jumlah: totalMau } : k))
      : [...keranjang, { id, jumlah: jml }];

    localStorage.setItem("keranjang", JSON.stringify(baru));
    window.dispatchEvent(new Event("keranjang-berubah"));
    setPesan("Ditambahkan ke keranjang ✓");
  };

  if (isHabis) {
    return (
      <div className="mx-auto max-w-2xl rounded- bg-[#FFFBEB] border border-orange-100 p-10 text-center">
        <p className="text-4xl">😥</p>
        <h1 className="mt-3 text-xl font-black text-zinc-900">{item.nama} lagi habis</h1>
        <p className="text-sm text-zinc-500 mt-1">Coba cek menu lain dulu ya</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-zinc-900 text-white px-6 py-2.5 text-sm font-bold">Balik ke Menu</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
      {/* Kiri - Visual */}
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 flex flex-col justify-between min-h-">
        <div>
          <span className="inline-block rounded-full bg-white border border-orange-100 px-3 py-1 text- font-bold tracking-wider text-zinc-600 shadow-sm">
            {item.kategori}
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 leading-[0.9]">
            {item.nama}
          </h1>
          <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
            Dibuat fresh setiap hari. Porsi pas buat anak kost tapi rasa bintang lima.
          </p>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold tracking-widest text-zinc-400">HARGA</p>
          <p className="text-3xl font-black text-zinc-900">{rupiah(item.harga)}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white border border-orange-100 px-3 py-1.5 text-xs font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Stok tersedia: {item.stok} {sisaDiKeranjang() > 0 && `• di keranjang ${sisaDiKeranjang()}`}
          </div>
        </div>
      </div>

      {/* Kanan - Action */}
      <div className="rounded- bg-white border border-orange-100 p-6 md:p-8 shadow-sm flex flex-col">
        <p className="text-xs font-bold tracking-widest text-zinc-400">ATUR JUMLAH</p>
        
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setJml((v) => Math.max(1, v - 1))}
            className="h-11 w-11 rounded-full bg-[#FFFBEB] border border-orange-100 font-bold text-zinc-700 hover:bg-orange-100 transition"
          >
            −
          </button>
          <input
            type="number"
            value={jml}
            onChange={(e) => setJml(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-20 rounded-full bg-zinc-900 text-white text-center font-bold focus:outline-none focus:ring-2 focus:ring-orange-300"
            min={1}
            max={item.stok}
          />
          <button
            onClick={() => setJml((v) => Math.min(item.stok, v + 1))}
            className="h-11 w-11 rounded-full bg-[#FFFBEB] border border-orange-100 font-bold text-zinc-700 hover:bg-orange-100 transition"
          >
            +
          </button>
          <p className="ml-auto text-sm font-medium text-zinc-500">
            Total <span className="font-black text-zinc-900">{rupiah(item.harga * jml)}</span>
          </p>
        </div>

        <button
          onClick={handleTambah}
          className="mt-6 w-full rounded-full bg-zinc-900 py-4 text-sm font-bold text-white shadow-lg shadow-zinc-900/20 hover:bg-black hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          Tambah ke Keranjang
        </button>

        {pesan && (
          <div className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold border ${pesan.includes("✓") ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-600"}`}>
            {pesan}
          </div>
        )}

        <div className="mt-auto pt-8 flex gap-2">
          <Link href="/menu" className="flex-1 text-center rounded-full bg-[#FFFBEB] border border-orange-100 py-3 text-sm font-bold text-zinc-700 hover:bg-orange-100 transition">
            Lanjut Belanja
          </Link>
          <Link href="/keranjang" className="flex-1 text-center rounded-full bg-white border border-zinc-200 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition">
            Lihat Keranjang
          </Link>
        </div>
      </div>
    </div>
  );
}