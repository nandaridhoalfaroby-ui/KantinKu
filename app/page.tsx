import Link from "next/link";

export default function Home(){
  return (
    <div className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 px-6 py-12 md:px-10 md:py-20">
      {/* hiasan background biar gak flat */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-100 px-3 py-1 text- font-bold tracking-wider text-zinc-600 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
          BUKA HARI INI • 07.00 - 21.00 WIB
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[0.9] text-zinc-900">
          Lapar?
          <br />
          Pesan di <span className="text-orange-600">KantinKu</span> aja.
        </h1>

        <p className="mt-4 max-w-xl text- md:text-lg leading-relaxed text-zinc-600">
          Gak perlu ngantri panjang. Pilih menu favoritmu, cek stok real-time, 
          dan pesanan langsung siap diambil. Cepat, hangat, dan enak.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link 
            href="/menu" 
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-zinc-900/20 hover:bg-black hover:-translate-y-0.5 transition-all"
          >
            Lihat Menu →
          </Link>
          <Link 
            href="/riwayat" 
            className="inline-flex items-center justify-center rounded-full bg-white border border-orange-100 px-7 py-3.5 text-sm font-bold text-zinc-700 hover:bg-orange-50 transition-all"
          >
            Cek Pesanan
          </Link>
        </div>

        {/* social proof kecil biar gak kosong */}
        <div className="mt-10 flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full bg-orange-300 border-2 border-[#FFFBEB]" />
            <div className="h-8 w-8 rounded-full bg-zinc-800 border-2 border-[#FFFBEB]" />
            <div className="h-8 w-8 rounded-full bg-amber-200 border-2 border-[#FFFBEB]" />
          </div>
          <p className="text-xs font-medium text-zinc-500">
            <span className="font-bold text-zinc-900">200+</span> mahasiswa jajan hari ini
          </p>
        </div>
      </div>
    </div>
  )
}