import Image from "next/image";
import { Mask } from "../Mask";
import { Reveal } from "../Reveal";
import { RsvpForm } from "../RsvpForm";

export function Gallery() {
  return (
    <section id="gallery" className="bg-paper pt-24">
      <h2 className="text-center font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-heading">Galería de la boda</h2>
      <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-4 w-[189px] text-line" />
      <div className="mt-12 flex snap-x gap-2 overflow-x-auto px-2 pb-4 [scrollbar-width:thin]">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <a key={n} href={`/images/gallery-img${n}.jpg`} target="_blank" rel="noreferrer" className="group relative block shrink-0 snap-start overflow-hidden">
            <Image src={`/images/gallery-thumb${n}.jpg`} alt={`Foto de la boda ${n}`} width={635} height={635} className="h-72 w-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-96" />
          </a>
        ))}
      </div>
    </section>
  );
}

export function Rsvp() {
  return (
    <section id="rsvp" className="bg-paper-alt px-5 pb-28 pt-12">
      <Reveal from="down" className="mx-auto max-w-xl">
        <div className="framed space-y-6 p-8 sm:p-12">
          <div>
            <h2 className="text-center font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-heading">¿Nos acompañarás?</h2>
            <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-3 w-[189px] text-line" />
          </div>
          <RsvpForm />
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep px-5 pt-16 text-center text-sm text-on-deep/80">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3">
        <p className="md:text-left">Viernes, 18 de diciembre de 2026, 3:00 p. m.<br />4181 Birchwood Ave, Seal Beach, CA</p>
        <p className="font-serif text-3xl leading-tight text-on-deep">Marguin<br /><small className="text-lg italic text-line-deep">&amp;</small><br />María</p>
        <p className="md:text-right">Tel.: <a href="tel:+584143607801" className="underline decoration-line-deep/60 underline-offset-4 transition-colors hover:text-on-deep">+58 414 360 7801</a><br /><a href="mailto:losbracciobodas@gmail.com" className="underline decoration-line-deep/60 underline-offset-4 transition-colors hover:text-on-deep">losbracciobodas@gmail.com</a></p>
      </div>
      <p className="mt-12 border-t border-on-deep/15 py-5 text-xs">Desarrollado por{" "}
        <a href="https://www.instagram.com/davecast" target="_blank" rel="noopener noreferrer" className="underline decoration-line-deep/60 underline-offset-4 transition-colors hover:text-on-deep">davecast</a></p>
    </footer>
  );
}
