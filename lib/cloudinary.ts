import { createHash } from "node:crypto";

/** Env values pasted into dashboards often carry quotes or spaces; strip them. */
const env = (name: string) => process.env[name]?.trim().replace(/^["']+|["']+$/g, "").trim() || undefined;

export type Photo = { id: string; width: number; height: number };

export function cloudinaryConfig() {
  const cloudName = env("CLOUDINARY_CLOUD_NAME");
  const apiKey = env("CLOUDINARY_API_KEY");
  const apiSecret = env("CLOUDINARY_API_SECRET");
  // Photos are tagged with this name; use a different one locally (e.g. "boda-test") to keep tests off the live gallery.
  const tag = env("CLOUDINARY_FOLDER") ?? "boda";
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret, tag };
}

/** Cloudinary signature: sha1 of the sorted "key=value" params followed by the API secret. */
export function sign(params: Record<string, string | number>, secret: string) {
  const base = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(base + secret).digest("hex");
}

let cache: { at: number; tag: string; photos: Photo[] } | null = null;

/** Newest photos with the wedding tag. Cached briefly: the Admin API has an hourly request limit. */
export async function listPhotos(limit = 60): Promise<Photo[]> {
  const c = cloudinaryConfig();
  if (!c) return [];
  if (cache && cache.tag === c.tag && Date.now() - cache.at < 30_000) return cache.photos;

  const res = await fetch(`https://api.cloudinary.com/v1_1/${c.cloudName}/resources/search`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${c.apiKey}:${c.apiSecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expression: `resource_type:image AND tags=${c.tag}`, sort_by: [{ created_at: "desc" }], max_results: limit }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Cloudinary search ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { resources?: { public_id: string; width: number; height: number }[] };
  const photos = (data.resources ?? []).map((r) => ({ id: r.public_id, width: r.width, height: r.height }));
  cache = { at: Date.now(), tag: c.tag, photos };
  return photos;
}
