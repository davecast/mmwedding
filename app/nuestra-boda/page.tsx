import type { Metadata } from "next";
import Link from "next/link";
import { Mask } from "@/components/Mask";
import { PhotoUpload } from "@/components/PhotoUpload";

export const metadata: Metadata = {
  title: "Comparte tus fotos — Marguin & María",
  description: "Sube tus fotos de la boda de Marguin y María para que aparezcan en nuestra galería.",
  robots: { index: false, follow: false }, // reached by QR code only
};

export default function OurWedding() {
  return (
    <main className="min-h-svh bg-paper-alt px-5 py-16">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-xs uppercase tracking-[0.25em] text-heading hover:underline">← Volver a la invitación</Link>
        <div className="framed mt-8 space-y-8 p-8 sm:p-12">
          <div className="text-center">
            <h1 className="font-serif text-[clamp(1.9rem,5vw,2.6rem)] text-heading">Comparte tus fotos</h1>
            <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-3 w-[189px] text-line" />
            <p className="mx-auto mt-5 max-w-sm text-sm">
              Ayúdanos a guardar los mejores momentos de nuestra boda. Las fotos que subas aparecerán en la galería de nuestra página.
            </p>
          </div>
          <PhotoUpload />
        </div>
      </div>
    </main>
  );
}
