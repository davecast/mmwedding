import { connection } from "next/server";
import { cloudinaryConfig, listPhotos } from "@/lib/cloudinary";

export async function GET() {
  await connection();
  const c = cloudinaryConfig();
  if (!c) return Response.json({ cloudName: null, photos: [] });
  try {
    const photos = await listPhotos();
    return Response.json({ cloudName: c.cloudName, photos }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } });
  } catch (err) {
    console.error("[photos] could not read", err);
    return Response.json({ cloudName: c.cloudName, photos: [] });
  }
}
