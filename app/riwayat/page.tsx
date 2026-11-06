// app/riwayat/page.tsx
"use client";
import { useEffect, useState } from "react";
import { rupiah } from "@/data/menu";
import Link from "next/link";

type R = { nama: string; jumlahMenu: number; total: number; waktu: string; detail: string };

export default function RiwayatPage(){
  const [list, setList] = useState<R[]>([]);

  useEffect(()=> {
    setList(JSON.parse(localStorage.getItem("riwayat") || "[]"))
  }, []);

  const hapusRiwayat = () => {
    if (confirm("Yakin hapus semua riwayat?")) {
      localStorage.removeItem("riwayat");
      setList([]);
    }
  };

  if (list.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded- bg-[#FFFBEB] border border-orange-100 p-12 text-center">
        <p className="text-5xl">🧾</p>
        <h2 className="mt-4 font-black text-xl text-zinc-900">Belum ada pesanan</h2>
        <p className="text-sm font-medium text-zinc-600 mt-1">Pesanan lo bakal muncul di sini</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">
          Pesan Sekarang
        </Link>
      </div>
    );
  }

  const totalBelanja = list.reduce((a,b)=>a+b.total,0);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header + Tombol Hapus - TANPA TULISAN PUTIH */}
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900">Riwayat Pesanan</h1>
            <p className="mt-1 text-sm font-medium text-zinc-600">
              <span className="font-black text-zinc-900">{list.length} pesanan</span> • Total {rupiah(totalBelanja)}
            </p>
          </div>
          <button 
            onClick={hapusRiwayat} 
            className="rounded-full bg-[#FFE4E6] border-2 border-red-200 px-4 py-2 text-xs font-black text-red-700 hover:bg-red-100 transition"
          >
            Hapus riwayat
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((r,i)=>(
          <div key={i} className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-full bg-[#FFFBEB] border border-orange-100 px-3 text- font-black text-zinc-800">
                  {r.waktu}
                </span>
                <span className="text-sm font-black text-zinc-900">{r.nama}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-600">{r.jumlahMenu} menu</span>
                <span className="rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text-xs font-black text-zinc-900">
                  {rupiah(r.total)}
                </span>
              </div>
            </div>
            
            <div className="mt-3 rounded-xl bg-[#FFFBEB] border border-dashed border-orange-200 p-3">
              <pre className="whitespace-pre-line text- leading-relaxed font-mono font-bold text-zinc-800">
                {r.detail}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}