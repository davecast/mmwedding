"use client";

import Image from "next/image";
import { useState } from "react";

const slides = Array.from({ length: 8 }, (_, i) => `/images/timeline-slider-img${i + 1}.jpg`);

/** Fading photo slider for the 2019 stage. */
export function TimelineGallery() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);

  return (
    <div className="collage-tile bg-card p-2.5 sm:p-3">
      <div className="relative aspect-[1080/750] overflow-hidden" role="group" aria-roledescription="carousel" aria-label="Our vacations">
        {slides.map((src, n) => (
          <Image
            key={src}
            src={src}
            alt={`Our vacations, photo ${n + 1} of ${slides.length}`}
            fill
            sizes="(min-width: 896px) 520px, 90vw"
            aria-hidden={n !== i}
            className={`object-cover transition-opacity duration-500 ease-out ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <button onClick={() => go(-1)} aria-label="Previous photo" className="slider-btn left-3">‹</button>
        <button onClick={() => go(1)} aria-label="Next photo" className="slider-btn right-3">›</button>
      </div>
    </div>
  );
}
