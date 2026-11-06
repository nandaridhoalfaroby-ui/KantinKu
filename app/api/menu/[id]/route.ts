// app/api/menu/[id]/route.ts - INI FILE BARU
import { menu } from "@/data/menu";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = menu.find((m) => String(m.id) === id);
  if (!item) {
    return Response.json({ pesan: "Menu tidak ditemukan" }, { status: 404 });
  }
  return Response.json(item);
}