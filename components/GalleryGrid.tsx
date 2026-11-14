"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Photo } from "@/lib/cloudinary";
import { photoDownloadUrl, photoUrl } from "@/lib/photo-url";
import { type GalleryItem, Lightbox } from "./Lightbox";

const FIRST = 12; // tiles shown before "Ver todas"
const samples: GalleryItem[] = Array.from({ length: 10 }, (_, i) => i + 1).map((n) => ({
  id: `sample-${n}`,
  alt: `Foto de la boda ${n}`,
  width: 635,
  height: 635,
  src: (w) => (w > 700 ? `/images/gallery-img${n}.jpg` : `/images/gallery-thumb${n}.jpg`),
  download: `/images/gallery-img${n}.jpg`,
}));

/** Guest photos from Cloudinary as a grid; tap one to open the viewer. Samples show until the first real photo exists. */
export function GalleryGrid() {
  const [data, setData] = useState<{ cloudName: string; photos: Photo[] } | "loading" | "empty">("loading");
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/photos", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ cloudName: string | null; photos: Photo[] }>)
      .then((d) => alive && setData(d.cloudName && d.photos.length ? { cloudName: d.cloudName, photos: d.photos } : "empty"))
      .catch(() => alive && setData("empty"));
    return () => {
      alive = false;
    };
  }, []);

  const items = useMemo<GalleryItem[]>(() => {
    if (data === "loading") return [];
    if (data === "empty") return samples;
    return data.photos.map((p, n) => ({
      id: p.id,
      alt: `Foto de la boda ${n + 1}`,
      width: p.width,
      height: p.height,
      src: (w: number) => photoUrl(data.cloudName, p.id, w),
      download: photoDownloadUrl(data.cloudName, p.id),
    }));
  }, [data]);

  const shown = all ? items : items.slice(0, FIRST);

  return (
    <div className="mx-auto mt-12 max-w-6xl px-2 sm:px-4">
      <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4">
        {data === "loading"
          ? Array.from({ length: 8 }, (_, i) => <li key={i} aria-hidden className="aspect-square animate-pulse bg-card" />)
          : shown.map((it, n) => (
              <li key={it.id}>
                <button
                  onClick={() => setOpen(n)}
                  aria-label={`Abrir ${it.alt.toLowerCase()}`}
                  className="group relative block aspect-square w-full cursor-pointer overflow-hidden bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
                >
                  <Image
                    loader={({ width }) => it.src(width)}
                    src={it.id}
                    alt={it.alt}
                    width={600}
                    height={600}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    loading={n < 4 ? "eager" : "lazy"}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-deep/0 transition-colors duration-300 group-hover:bg-deep/15" />
                </button>
              </li>
            ))}
      </ul>

      {items.length > FIRST && (
        <div className="mt-8 text-center">
          <button onClick={() => setAll((v) => !v)} className="btn cursor-pointer" aria-expanded={all}>
            {all ? "Ver menos fotos" : `Ver todas las fotos (${items.length})`}
          </button>
        </div>
      )}

      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </div>
  );
}
