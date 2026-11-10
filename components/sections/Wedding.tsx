import Image from "next/image";
import { Reveal } from "../Reveal";

const details = [
  { title: "Ceremony", time: "03:00 PM – 04:00 PM", place: "Birchwood Church", addr: "4181 Birchwood Ave, Seal Beach, CA" },
  { title: "Photoshoot", time: "05:00 PM – 06:30 PM", place: "Old Ranch Country Club", addr: "29033 West Lake Drive, Agoura Hills, CA" },
  { title: "Reception", time: "07:00 PM – 01:00 AM", place: "Old Ranch Country Club", addr: "29033 West Lake Drive, Agoura Hills, CA" },
];

export function Invitation() {
  return (
    <section id="the-wedding" className="edge-both relative bg-slate px-5 pb-40 pt-40 text-white">
      <h2 className="section-title !text-white">Invitation</h2>
      <Reveal from="right" className="mx-auto mt-14 max-w-3xl">
        <div className="framed grid overflow-hidden text-center md:grid-cols-[1fr_1.4fr]">
          <div className="grid place-items-center bg-sage px-6 py-12 font-serif text-5xl leading-none text-white">
            <span>Save<small className="block py-1 text-sm italic opacity-80">the</small>Date</span>
          </div>
          <div className="space-y-3 p-8 text-ink">
            <h3 className="text-3xl text-sage-deep">Isabella <small className="text-lg italic text-sage">&amp;</small> Andrew</h3>
            <p className="text-[11px] uppercase tracking-[0.2em]">Request the honor of your presence on their wedding day</p>
            <p className="font-serif text-xl text-sage-deep">September 24, 2027<small className="block text-xs">at 03:00 pm</small></p>
            <p className="text-[11px] uppercase tracking-[0.2em]">At Birchwood Church<br />4181 Birchwood Ave, Seal Beach, CA</p>
            <p className="font-serif italic text-sage-deep">Reception to follow</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Location() {
  return (
    <section id="location" className="bg-white pt-24">
      <h2 className="section-title">Location</h2>
      <iframe
        title="Map of Birchwood Church, Seal Beach"
        className="mt-12 h-[420px] w-full border-0 grayscale-[0.6] sepia-[0.15]"
        loading="lazy"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-118.08%2C33.76%2C-118.04%2C33.79&layer=mapnik&marker=33.776825%2C-118.059113"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-3">
        {details.map((d, i) => (
          <Reveal key={d.title} delay={i * 0.12} className="text-center">
            <div aria-hidden className="mx-auto mb-4 grid size-14 place-items-center rounded-full border border-sage text-sage">♥</div>
            <h4 className="text-2xl text-sage-deep">{d.title}<small className="block font-sans text-xs tracking-[0.2em] text-sage">{d.time}</small></h4>
            <p className="mt-3 text-xs uppercase leading-loose tracking-[0.15em]">{d.place}<br />{d.addr}</p>
            <a href="#rsvp" className="btn mt-6">More details</a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const party = [
  ["bridesmaids-img1", "Emily Garcia", "Maid of honour"],
  ["bridesmaids-img2", "Rachel Harris", "Bridesmaid"],
  ["bridesmaids-img3", "Sarah Williams", "Bridesmaid"],
  ["groomsmen-img1", "Michael Scott", "Best man"],
  ["groomsmen-img2", "Daniel Wright", "Groomsman"],
  ["groomsmen-img3", "Ryan Anderson", "Groomsman"],
];

export function Party() {
  return (
    <section id="bmiadsgmen" className="bg-slate px-5 py-24 text-white">
      <h2 className="section-title !text-white">Bridesmaids &amp; Groomsmen</h2>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {party.map(([img, name, role], i) => (
          <Reveal key={name} from="down" delay={(i % 3) * 0.1}>
            <figure className="group relative overflow-hidden">
              <Image src={`/images/${img}.jpg`} alt={`${name}, ${role}`} width={600} height={600} className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate/90 to-transparent p-5 pt-16 text-center opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                <h3 className="text-xl">{name}</h3>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">{role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const progress = [
  ["Decoration", 55], ["Location", 100], ["Catering", 72], ["Photography", 38], ["Honeymoon", 24],
] as const;

export function Registry() {
  return (
    <section id="progress" className="bg-white px-5 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2">
        <Reveal from="right" className="text-center">
          <h2 className="text-3xl leading-snug text-sage-deep sm:text-4xl">Help us plan our dream wedding day.</h2>
          <p className="mt-6 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius ante libero, ac sollicitudin elit malesuada et. Nulla facilisi. Pellentesque magna diam, mattis gravida eget, lobortis ut velit.</p>
          <Image src="/images/signature-2.png" alt="Andrew and Isabella" width={301} height={61} className="mx-auto mt-8" />
        </Reveal>
        <Reveal from="left" className="space-y-6">
          {progress.map(([label, v]) => (
            <div key={label}>
              <div className="flex justify-between font-serif text-sage-deep"><span>{label}</span><small className="font-sans text-xs">{v}%</small></div>
              <div className="mt-2 h-1.5 bg-mist"><div className="h-full origin-left bg-sage" style={{ width: `${v}%` }} /></div>
            </div>
          ))}
          <div className="pt-4 text-center"><a href="#rsvp" className="btn">Contact us</a></div>
        </Reveal>
      </div>
    </section>
  );
}
