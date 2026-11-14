import { connection } from "next/server";
import { listBlessings } from "@/lib/store";


export async function GET() {
  // Always read fresh answers at request time, never a prerendered copy
  await connection();
  try {
    const blessings = await listBlessings(30);
    return Response.json({ blessings }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[blessings] could not read", err);
    return Response.json({ blessings: [] }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}
