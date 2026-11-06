// components/KartuMenu.tsx
import { Menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function KartuMenu({ m }: { m: Menu }) {
  return (
    <Link href={`/menu/${m.id}`} className="block border rounded-xl p-4 hover:shadow bg-white">
      <h3 className="font-bold">{m.nama}</h3>
      <p className="text-sm text-gray-500">{m.kategori}</p>
      <p className="text-sm mt-1">{rupiah(m.harga)}</p>
      <p className={`text-sm font-semibold mt-2 ${m.stok === 0 ? "text-red-600" : "text-green-600"}`}>
        {m.stok === 0 ? "Habis" : `Stok ${m.stok}`}
      </p>
    </Link>
  );
}