// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl mt-10 rounded- bg-[#FFFBEB] border border-orange-100 p-12 flex flex-col items-center justify-center text-center">
      <div className="h-20 w-20 rounded-full bg-[#FFFEF7] border border-orange-100 grid place-items-center shadow-sm">
        <span className="text-4xl font-black text-zinc-900">?</span>
      </div>

      <h1 className="mt-6 text-6xl font-black tracking-tight text-zinc-900">404</h1>
      <p className="mt-2 text-sm font-bold text-zinc-600">
        Yah, halaman yang kamu cari gak ada.
      </p>
      <p className="mt-1 text-xs font-medium text-zinc-500">
        Mungkin salah ketik atau menunya udah habis
      </p>

      <Link 
        href="/" 
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFC837] border-2 border-amber-300 px-7 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all"
      >
        ← Kembali ke beranda
      </Link>

      <div className="mt-8 flex items-center gap-2 text- font-bold tracking-wider text-zinc-500">
        <span className="h-px w-6 bg-orange-200" />
        KANTINKU • 404
        <span className="h-px w-6 bg-orange-200" />
      </div>
    </div>
  );
}