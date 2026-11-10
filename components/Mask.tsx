/**
 * Draws an SVG as a colour-able shape: the file's alpha becomes a mask over
 * `currentColor`, so ornaments and leaves follow the active theme via a text-* class.
 */
export function Mask({ src, w, h, className = "" }: { src: string; w: number; h: number; className?: string }) {
  const url = `url(${src})`;
  return (
    <span
      aria-hidden
      className={`block bg-current ${className}`}
      style={{
        aspectRatio: `${w} / ${h}`,
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
