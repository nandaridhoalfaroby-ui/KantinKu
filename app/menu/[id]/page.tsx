import { menu, rupiah } from "@/data/menu";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = menu.find(m => String(m.id) === id);
  if (!item) notFound();

  return (
    <div>
      <Link href="/menu" className="text-sm text-blue-600 underline">← Kembali</Link>
      <h1 className="text-3xl font-bold mt-4">{item.nama}</h1>
      <p>Kategori: {item.kategori}</p>
      <p>Harga: {rupiah(item.harga)}</p>
      <p className={item.stok === 0 ? "text-red-600 font-bold" : "font-semibold"}>
        {item.stok === 0 ? "Habis" : `Stok ${item.stok}`}
      </p>
    </div>
  );
}