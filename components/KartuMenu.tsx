// components/KartuMenu.tsx
import { Menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function KartuMenu({ m }: { m: Menu }) {
  return (
    <Link 
      href={`/menu/${m.id}`} 
      className="group block rounded-2xl p-5 border border-orange-100 bg-[#FFFBEB] hover:bg-[#FFF3C4] hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-zinc-800 group-hover:text-orange-900 text-lg leading-tight">
            {m.nama}
          </h3>
          <p className="text-xs mt-1 px-2 py-1 rounded-full bg-orange-900/10 text-orange-800 inline-block">
            {m.kategori}
          </p>
        </div>
        <p className="text- font-bold tracking-wider px-2.5 py-1 rounded-full bg-white border border-orange-100 shadow-sm">
          <span className={m.stok === 0 ? "text-red-600" : "text-emerald-600"}>
            {m.stok === 0 ? "Habis" : `Stok ${m.stok}`}
          </span>
        </p>
      </div>

      <p className="text-base font-extrabold mt-4 text-zinc-900">
        {rupiah(m.harga)}
      </p>
    </Link>
  );
}