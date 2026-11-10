import Image from "next/image";
import { Mask } from "../Mask";
import { Reveal } from "../Reveal";

export function Gallery() {
  return (
    <section id="gallery" className="bg-paper pt-24">
      <h2 className="text-center font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-heading">Wedding Gallery</h2>
      <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-4 w-[189px] text-line" />
      <div className="mt-12 flex snap-x gap-2 overflow-x-auto px-2 pb-4 [scrollbar-width:thin]">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <a key={n} href={`/images/gallery-img${n}.jpg`} target="_blank" rel="noreferrer" className="group relative block shrink-0 snap-start overflow-hidden">
            <Image src={`/images/gallery-thumb${n}.jpg`} alt={`Wedding photo ${n}`} width={635} height={635} className="h-72 w-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-96" />
          </a>
        ))}
      </div>
    </section>
  );
}

const field = "w-full border-b border-line/50 bg-transparent px-1 py-3 text-sm outline-none placeholder:text-ink/65 transition-colors focus:border-heading";

export function Rsvp() {
  return (
    <section id="rsvp" className="bg-paper-alt px-5 pb-28 pt-12">
      <Reveal from="down" className="mx-auto max-w-xl">
        <form className="framed space-y-6 p-8 sm:p-12" action="#" method="get">
          <div>
            <h2 className="text-center font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-heading">Will you attend?</h2>
            <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-3 w-[189px] text-line" />
          </div>
          <input className={field} name="name" placeholder="Your name*" required />
          <fieldset className="flex flex-wrap gap-6 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="attend" value="yes" className="accent-heading" required /> Yes, I will attend.</label>
            <label className="flex items-center gap-2"><input type="radio" name="attend" value="no" className="accent-heading" /> Sorry, I can’t come.</label>
          </fieldset>
          <textarea className={field} name="blessing" rows={4} placeholder="Words of blessing" aria-label="Words of blessing" />
          <div className="text-center"><button type="submit" className="btn cursor-pointer">Send</button></div>
        </form>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep px-5 pt-16 text-center text-sm text-on-deep/80">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3">
        <p className="md:text-left">Saturday, 24 September 2027 at 3:00 pm<br />4181 Birchwood Ave, Seal Beach, CA</p>
        <p className="font-serif text-3xl leading-tight text-on-deep">María<br /><small className="text-lg italic text-line-deep">&amp;</small><br />Malguin</p>
        <p className="md:text-right">Tel.: +0012 345 678 910<br />isabella.andrew@example.com</p>
      </div>
      <p className="mt-12 border-t border-on-deep/15 py-5 text-xs">Developed by{" "}
        <a href="https://www.instagram.com/davecast" target="_blank" rel="noopener noreferrer" className="underline decoration-line-deep/60 underline-offset-4 transition-colors hover:text-on-deep">davecast</a></p>
    </footer>
  );
}
