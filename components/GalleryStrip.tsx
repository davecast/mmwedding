"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/lib/cloudinary";
import { photoUrl } from "@/lib/photo-url";

const samples = Array.from({ length: 10 }, (_, i) => i + 1);

/** Guest photos from Cloudinary, newest first. Shows the sample images until the first guest photo exists. */
export function GalleryStrip() {
  const [data, setData] = useState<{ cloudName: string; photos: Photo[] } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/photos", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ cloudName: string | null; photos: Photo[] }>)
      .then((d) => alive && d.cloudName && d.photos.length && setData({ cloudName: d.cloudName, photos: d.photos }))
      .catch(() => {
        /* keep the sample images */
      });
    return () => {
      alive = false;
    };
  }, []);

  const tile = "group relative block shrink-0 snap-start overflow-hidden";
  const img = "h-72 w-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-96";

  return (
    <div className="mt-12 flex snap-x gap-2 overflow-x-auto px-2 pb-4 [scrollbar-width:thin]">
      {data
        ? data.photos.map((p, n) => (
            <a key={p.id} href={photoUrl(data.cloudName, p.id, 2000)} target="_blank" rel="noreferrer" className={tile}>
              <Image
                loader={({ width }) => photoUrl(data.cloudName, p.id, width)}
                src={p.id}
                alt={`Foto de la boda ${n + 1}`}
                width={p.width}
                height={p.height}
                sizes="(min-width: 640px) 30vw, 70vw"
                className={img}
              />
            </a>
          ))
        : samples.map((n) => (
            <a key={n} href={`/images/gallery-img${n}.jpg`} target="_blank" rel="noreferrer" className={tile}>
              <Image src={`/images/gallery-thumb${n}.jpg`} alt={`Foto de la boda ${n}`} width={635} height={635} className={img} />
            </a>
          ))}
    </div>
  );
}
