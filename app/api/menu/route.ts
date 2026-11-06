// app/api/menu/route.ts - INI YANG BENER, TIMPA YANG LAMA
import { menu } from "@/data/menu";

export async function GET() {
  return Response.json(menu);
}