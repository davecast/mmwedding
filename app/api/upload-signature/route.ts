import { cloudinaryConfig, sign } from "@/lib/cloudinary";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 30;
}

/** Signs one upload so the browser can send a photo straight to Cloudinary without ever seeing the secret. */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return Response.json({ ok: false, message: "Demasiados intentos. Espera un minuto." }, { status: 429 });

  const c = cloudinaryConfig();
  if (!c) return Response.json({ ok: false, message: "La subida de fotos no está configurada." }, { status: 503 });

  const params = { allowed_formats: "jpg,jpeg,png,webp,heic,heif,gif", tags: c.tag, timestamp: Math.round(Date.now() / 1000) };
  return Response.json({
    ok: true,
    cloudName: c.cloudName,
    apiKey: c.apiKey,
    ...params,
    signature: sign(params, c.apiSecret),
  });
}
