import Image from "next/image";
import { Reveal } from "../Reveal";

export function Gallery() {
  return (
    <section id="gallery" className="bg-white pt-24">
      <h2 className="section-title">Wedding Gallery</h2>
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

const posts = [
  ["post1", "July 20, 2021", "Wedding trends to obsess over this year"],
  ["post2", "August 2, 2021", "The ultimate guide to plan your wedding"],
  ["post3", "June 30, 2021", "Boho New Zealand beach wedding inspiration"],
];

export function Blog() {
  return (
    <section id="blog" className="bg-mist px-5 py-24">
      <h2 className="section-title">Wedding Blog</h2>
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
        {posts.map(([img, date, title], i) => (
          <Reveal key={title} from="down" delay={i * 0.12}>
            <article className="group">
              <div className="overflow-hidden"><Image src={`/images/${img}.jpg`} alt="" width={793} height={494} className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" /></div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-sage">{date}</p>
              <h3 className="mt-1 text-xl text-sage-deep">{title}</h3>
              <p className="mt-2 text-sm">If you’ve always dreamt of carrying a bouquet of old-fashioned garden roses down the aisle, but your budget doesn’t quite match up to the dream, try this!</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const field = "w-full border-b border-sage/50 bg-transparent px-1 py-3 text-sm outline-none transition-colors focus:border-sage-deep";

export function Rsvp() {
  return (
    <section id="rsvp" className="bg-mist px-5 pb-28 pt-12">
      <Reveal from="down" className="mx-auto max-w-xl">
        <form className="framed space-y-6 p-8 sm:p-12" action="#" method="get">
          <h2 className="section-title">Will you attend?</h2>
          <input className={field} name="name" placeholder="Your name*" required />
          <input className={field} name="email" type="email" placeholder="E-mail*" required />
          <fieldset className="flex flex-wrap gap-6 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="attend" value="yes" className="accent-sage-deep" required /> Yes, I will attend.</label>
            <label className="flex items-center gap-2"><input type="radio" name="attend" value="no" className="accent-sage-deep" /> Sorry, I can’t come.</label>
          </fieldset>
          <label className="block text-xs uppercase tracking-[0.2em]">Number of guests
            <select name="guests" className={`${field} mt-1 normal-case tracking-normal`}>{[0,1,2,3,4,5,6,7].map((n) => <option key={n}>{n}</option>)}</select>
          </label>
          <fieldset className="grid grid-cols-2 gap-2 text-sm">
            <legend className="mb-2 text-xs uppercase tracking-[0.2em]">Meal preferences</legend>
            {["Meat", "Fish", "Vegetarian", "Gluten free"].map((m) => (
              <label key={m} className="flex items-center gap-2"><input type="checkbox" className="accent-sage-deep" /> {m}</label>
            ))}
          </fieldset>
          <textarea className={field} name="message" rows={3} placeholder="Message" />
          <div className="text-center"><button type="submit" className="btn cursor-pointer">Send</button></div>
        </form>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate px-5 pt-16 text-center text-sm text-white/80">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3">
        <p className="md:text-left">Saturday, 24 September 2027 at 03:00 pm<br />4181 Birchwood Ave, Seal Beach, CA</p>
        <p className="font-serif text-3xl leading-tight text-white">Isabella<br /><small className="text-lg italic text-sage">&amp;</small><br />Andrew</p>
        <p className="md:text-right">Tel.: +0012 345 678 910<br />isabella.andrew@example.com</p>
      </div>
      <p className="mt-12 border-t border-white/15 py-5 text-xs">Template design: Neela by WiselyThemes. UI prototype.</p>
    </footer>
  );
}
