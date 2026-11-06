// app/keranjang/page.tsx
"use client";
import { useState, useEffect } from "react";
import { menu, rupiah } from "@/data/menu";
import Link from "next/link";

type Keranjang = { id: number; jumlah: number };
type Riwayat = { id: string; tanggal: string; struk: string; total: number };

export default function KeranjangPage() {
  const [keranjang, setKeranjang] = useState<Keranjang[]>([]);
  const [kode, setKode] = useState("");
  const [diskon, setDiskon] = useState(0);
  const [pesanPromo, setPesanPromo] = useState("");
  const [cara, setCara] = useState<"ambil" | "antar">("ambil");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [struk, setStruk] = useState("");

  const load = () => setKeranjang(JSON.parse(localStorage.getItem("keranjang") || "[]"));
  useEffect(() => { load(); }, []);

  const simpan = (baru: Keranjang[]) => {
    localStorage.setItem("keranjang", JSON.stringify(baru));
    setKeranjang(baru);
    window.dispatchEvent(new Event("keranjang-berubah"));
  };

  const subtotal = keranjang.reduce((s, k) => {
    const m = menu.find((x) => x.id === k.id);
    return s + (m ? m.harga * k.jumlah : 0);
  }, 0);

  useEffect(() => {
    if (diskon > 0 && subtotal < 20000) {
      setDiskon(0);
      setPesanPromo("Promo HEMAT10 gak berlaku lagi, belanja di bawah Rp 20.000");
    }
  }, [subtotal, diskon]);

  const handlePromo = () => {
    if (kode.toLowerCase() !== "hemat10") return setPesanPromo("Kode promo tidak dikenal.");
    if (subtotal < 20000) return setPesanPromo("Butuh belanja minimal Rp 20.000 buat HEMAT10");
    const d = Math.round(subtotal * 0.1);
    setDiskon(d);
    setPesanPromo("Mantap! Promo HEMAT10 diskon 10% kepakai");
  };

  const ongkir = cara === "antar" ? 2000 : 0;
  const total = subtotal - diskon + ongkir;

  const handlePesan = () => {
    if (nama.trim().length < 3) return alert("Nama pemesan minimal 3 huruf");
    if (cara === "antar" && kelas.trim().length < 3) return alert("Kelas wajib minimal 3 karakter");

    let teks = `Terima kasih, ${nama}!\n`;
    keranjang.forEach((k) => {
      const m = menu.find((x) => x.id === k.id)!;
      teks += `${m.nama} x${k.jumlah} = ${rupiah(m.harga * k.jumlah)}\n`;
    });
    teks += `Subtotal: ${rupiah(subtotal)}\n`;
    if (diskon > 0) teks += `Diskon: -${rupiah(diskon)}\n`;
    teks += cara === "antar" ? `Ongkir antar ke kelas ${kelas}: ${rupiah(ongkir)}\n` : `Diambil sendiri di kantin\n`;
    teks += `Total bayar: ${rupiah(total)}`;

    setStruk(teks);
    const riwayat: Riwayat[] = JSON.parse(localStorage.getItem("riwayat") || "[]");
    riwayat.unshift({ id: Date.now().toString(), tanggal: new Date().toISOString(), struk: teks, total });
    localStorage.setItem("riwayat", JSON.stringify(riwayat));
    simpan([]);
    setKode(""); setDiskon(0);
  };

  if (keranjang.length === 0 && !struk) {
    return (
      <div className="mx-auto max-w-xl rounded- bg-[#FFFBEB] border border-orange-100 p-12 text-center">
        <p className="text-5xl">🛒</p>
        <h2 className="mt-4 font-black text-xl text-zinc-900">Keranjang masih kosong</h2>
        <p className="text-sm text-zinc-500 mt-1">Yuk isi dulu sebelum lapar</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-zinc-900 text-white px-6 py-2.5 text-sm font-bold">Lihat Menu</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
      {/* KIRI */}
      <div className="space-y-4">
        {struk ? (
          <div className="rounded- bg-emerald-50 border border-emerald-100 p-6">
            <div className="h-10 w-10 rounded-full bg-emerald-500 text-white grid place-items-center font-black">✓</div>
            <h2 className="mt-3 text-xl font-black text-zinc-900">Pesanan Berhasil!</h2>
            <pre className="mt-4 whitespace-pre-line rounded-xl bg-white border border-emerald-100 p-4 text-sm leading-relaxed text-zinc-700 font-mono">
              {struk}
            </pre>
            <Link href="/riwayat" className="mt-4 inline-block text-sm font-bold text-emerald-700 hover:underline">Lihat di riwayat →</Link>
          </div>
        ) : (
          keranjang.map((k) => {
            const m = menu.find((x) => x.id === k.id)!;
            return (
              <div key={k.id} className="flex items-center justify-between rounded-2xl bg-white border border-orange-100 p-4 shadow-sm">
                <div>
                  <p className="font-bold text-zinc-900">{m.nama}</p>
                  <p className="text-xs text-zinc-500">{rupiah(m.harga)} • Stok {m.stok}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-full bg-[#FFFBEB] border border-orange-100 p-1">
                    <button onClick={() => { if (k.jumlah > 1) simpan(keranjang.map(x => x.id === k.id ? { ...x, jumlah: x.jumlah - 1 } : x)) }} className="h-7 w-7 rounded-full bg-white border border-orange-100 grid place-items-center font-bold">−</button>
                    <span className="w-6 text-center text-sm font-bold">{k.jumlah}</span>
                    <button onClick={() => { if (k.jumlah < m.stok) simpan(keranjang.map(x => x.id === k.id ? { ...x, jumlah: x.jumlah + 1 } : x)) }} className="h-7 w-7 rounded-full bg-white border border-orange-100 grid place-items-center font-bold">+</button>
                  </div>
                  <span className="w- text-right text-sm font-black">{rupiah(m.harga * k.jumlah)}</span>
                  <button onClick={() => simpan(keranjang.filter(x => x.id !== k.id))} className="text-zinc-400 hover:text-red-600 text-sm ml-2">✕</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* KANAN - SUMMARY */}
      {!struk && (
        <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 sticky top-24">
          <h3 className="font-black text-zinc-900">Ringkasan Pesanan</h3>
          
          <div className="mt-4 flex gap-2">
            <input value={kode} onChange={e=>setKode(e.target.value)} placeholder="HEMAT10" className="flex-1 rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"/>
            <button onClick={handlePromo} className="rounded-full bg-zinc-900 text-white px-5 text-sm font-bold hover:bg-black transition">Pakai</button>
          </div>
          {pesanPromo && <p className={`mt-2 text-xs font-semibold px-1 ${pesanPromo.includes("Mantap") ? "text-emerald-600" : "text-red-500"}`}>{pesanPromo}</p>}

          <div className="mt-6 rounded-2xl bg-white border border-orange-100 p-1 flex">
            <button onClick={()=>setCara("ambil")} className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${cara==="ambil" ? "bg-zinc-900 text-white shadow" : "text-zinc-500"}`}>Ambil Sendiri</button>
            <button onClick={()=>setCara("antar")} className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${cara==="antar" ? "bg-zinc-900 text-white shadow" : "text-zinc-500"}`}>Diantar +2k</button>
          </div>
          
          {cara==="antar" && <input value={kelas} onChange={e=>setKelas(e.target.value)} placeholder="Tulis kelas lo, contoh: XII RPL 2" className="mt-3 w-full rounded-xl bg-white border border-orange-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"/>}

          <div className="mt-6 space-y-2 text-sm border-t border-orange-100 pt-4">
            <div className="flex justify-between text-zinc-600"><span>Subtotal</span><span>{rupiah(subtotal)}</span></div>
            {diskon>0 && <div className="flex justify-between text-emerald-600 font-semibold"><span>Diskon HEMAT10</span><span>-{rupiah(diskon)}</span></div>}
            {cara==="antar" && <div className="flex justify-between text-zinc-600"><span>Ongkir</span><span>{rupiah(ongkir)}</span></div>}
            <div className="flex justify-between font-black text-base text-zinc-900 pt-2"><span>Total</span><span>{rupiah(total)}</span></div>
          </div>

          <input value={nama} onChange={e=>setNama(e.target.value)} placeholder="Nama pemesan (min 3 huruf)" className="mt-6 w-full rounded-xl bg-white border border-orange-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"/>
          <button onClick={handlePesan} className="mt-3 w-full rounded-full bg-zinc-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-zinc-900/20 hover:bg-black hover:-translate-y-0.5 transition-all">
            Pesan Sekarang • {rupiah(total)}
          </button>
        </div>
      )}
    </div>
  );
}