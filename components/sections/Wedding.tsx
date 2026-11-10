import Image from "next/image";
import { ChampagneIcon, ChurchIcon } from "../Icons";
import { ParallaxSection } from "../ParallaxSection";
import { Testimonials } from "../Testimonials";
import { Reveal } from "../Reveal";
import { Mask } from "../Mask";

export function Invitation() {
  return (
    <ParallaxSection
      id="the-wedding"
      src="/images/invitation-background.jpg"
      overlay="bg-deep/65"
      className="edge-both px-5 pb-64 pt-44 text-on-deep"
    >
      <h2 className="text-center font-serif text-[clamp(2rem,3.6vw,3rem)]">Invitation</h2>
      <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-4 w-[189px] text-line-deep" />

      <Reveal from="right" className="mx-auto mt-16 max-w-[880px]">
        <div className="invite relative flex flex-col text-center md:flex-row">
          {/* Two offset white frames, crossing like the template's */}
          <span aria-hidden className="pointer-events-none absolute -top-2.5 bottom-0 left-2.5 right-px border border-on-deep" />
          <span aria-hidden className="pointer-events-none absolute -bottom-2.5 left-0 -right-2.5 top-0 border border-on-deep" />

          <div className="relative flex items-center justify-center overflow-hidden px-5 py-8 md:w-[48%]">
            <div className="relative px-10 py-20 font-serif text-[clamp(4.5rem,9vw,7.5rem)] leading-[0.85] md:px-14 md:py-24">
              <Mask src="/images/invite-sprig.svg" w={173} h={154} className="pointer-events-none absolute right-2 top-4 w-24 max-w-none md:w-28 text-line-deep" />
              <Mask src="/images/invite-sprig.svg" w={173} h={154} className="pointer-events-none absolute bottom-0 left-0 w-24 max-w-none rotate-180 md:w-28 text-line-deep" />
              <span className="relative block">Save</span>
              <small className="relative block py-2 font-serif text-[1.35rem] uppercase leading-none tracking-normal">the</small>
              <span className="relative block">Date</span>
            </div>
          </div>

          <div className="flex flex-col bg-accent/85 px-8 py-10 text-on-accent md:w-[52%]">
            <h3 className="font-serif text-[clamp(1.9rem,3.2vw,2.5rem)] text-on-accent">
              María <small className="text-[0.55em] italic">&amp;</small> Malguin
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-[13px] uppercase leading-relaxed">Request the honor of your presence on their wedding day</p>

            <div className="relative my-5 py-10 font-serif">
              <Mask src="/images/separatostop.svg" w={126} h={17} className="absolute left-1/2 top-0 w-32 -translate-x-1/2 text-on-accent" />
              <p className="text-[clamp(1.5rem,2.6vw,2rem)] font-medium">September 24, 2027</p>
              <p className="text-xl">at 3:00 pm</p>
              <Mask src="/images/separatostop.svg" w={126} h={17} className="absolute bottom-0 left-1/2 w-32 -translate-x-1/2 -scale-y-100 text-on-accent" />
            </div>

            <p className="text-[13px] uppercase leading-relaxed">At Birchwood Church<br />4181 Birchwood Ave Seal Beach, CA</p>
            <p className="mt-3 font-serif text-xl">Reception to follow</p>
          </div>
        </div>
      </Reveal>
    </ParallaxSection>
  );
}

const events = [
  { title: "Ceremony", time: "3:00pm", Icon: ChurchIcon, place: "Birchwood Church", addr: "4181 Birchwood Ave Seal Beach, CA", coords: "33.776825, -118.059113" },
  { title: "Reception", time: "5:30pm", Icon: ChampagneIcon, place: "Old Ranch Country Club", addr: "29033 West Lake Drive, Agoura Hills, CA", coords: "33.776025, -118.065314" },
];

export function Location() {
  return (
    <section id="location" className="bg-paper px-5 pb-28 pt-24">
      <h2 className="text-center font-serif text-[clamp(2.25rem,4.4vw,3.5rem)] text-heading">Location</h2>
      <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-4 w-[189px] text-line" />

      <div className="mx-auto mt-16 flex max-w-6xl flex-col md:flex-row md:items-start">
        <Reveal from="right" className="relative z-10 md:mt-[3.4%] md:w-[36.5%]">
          <div className="accent-panel panel-double relative px-8 py-12 text-center sm:px-12">
            {events.map((e, i) => (
              <div key={e.title}>
                {i > 0 && <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto my-9 w-36 text-on-accent/70" />}
                <div className="flex items-center justify-center gap-5">
                  <e.Icon className="size-14 shrink-0 text-on-accent/60" />
                  <div className="text-left">
                    <h3 className="text-[clamp(2rem,3.2vw,2.75rem)] leading-none">{e.title}</h3>
                    <p className="mt-1 font-serif text-2xl">{e.time}</p>
                  </div>
                </div>
                <p className="mt-6 text-xl">{e.place}</p>
                <p className="mt-1 text-[15px] italic leading-relaxed">{e.addr}<br />{e.coords}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal from="left" delay={0.1} className="mt-8 md:-ml-[14.7%] md:mt-0 md:flex md:w-[78%] md:flex-col md:self-stretch">
          {/* Static map: pointer events off so it never captures scroll or drag */}
          <iframe
            title="Map of Birchwood Church, Seal Beach"
            tabIndex={-1}
            className="pointer-events-none aspect-[1338/797] w-full border-0 grayscale-[0.6] sepia-[0.15]"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-118.08%2C33.76%2C-118.04%2C33.79&layer=mapnik&marker=33.776825%2C-118.059113"
          />
          {/* Line from the map's bottom edge down to the RSVP button (page centre = 36.2% of this column) */}
          <span aria-hidden className="relative hidden flex-1 md:block">
            <span className="absolute inset-y-0 left-[36.15%] w-px bg-line" />
          </span>
        </Reveal>
      </div>

      <Reveal className="flex flex-col items-center">
        <span aria-hidden className="h-16 w-px bg-line md:h-12" />
        <a href="#rsvp" className="btn mt-2">RSVP</a>
      </Reveal>
    </section>
  );
}

type Member = { img: string; name: string; role: string };

const bridesmaids: Member[] = [
  { img: "bridesmaids-img1", name: "Emily Garcia", role: "Maid of honour" },
  { img: "bridesmaids-img2", name: "Rachel Harris", role: "Bridesmaid" },
  { img: "bridesmaids-img3", name: "Sarah Williams", role: "Bridesmaid" },
  { img: "bridesmaids-img1", name: "Olivia Martin", role: "Bridesmaid" },
  { img: "bridesmaids-img2", name: "Sophia Clark", role: "Bridesmaid" },
  { img: "bridesmaids-img3", name: "Grace Turner", role: "Bridesmaid" },
];

const groomsmen: Member[] = [
  { img: "groomsmen-img1", name: "Michael Scott", role: "Best man" },
  { img: "groomsmen-img2", name: "Daniel Wright", role: "Groomsman" },
  { img: "groomsmen-img3", name: "Ryan Anderson", role: "Groomsman" },
  { img: "groomsmen-img1", name: "Lucas Bennett", role: "Groomsman" },
];

function Heading({ children }: { children: string }) {
  return (
    <>
      <h2 className="text-center font-serif text-[clamp(2rem,3.6vw,3rem)]">{children}</h2>
      <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-4 w-[189px] text-line-deep" />
    </>
  );
}

function Grid({ people, cols }: { people: Member[]; cols: string }) {
  return (
    <div className={`mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 ${cols}`}>
      {people.map((m, i) => (
        <Reveal key={m.name} from="down" delay={(i % 3) * 0.1}>
          <figure tabIndex={0} className="group relative overflow-hidden outline-offset-4">
            <Image
              src={`/images/${m.img}.jpg`}
              alt={`${m.name}, ${m.role}`}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />

            {/* Touch and small screens: a plain caption over the photo */}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-5 pt-16 text-center md:hidden">
              <h3 className="text-xl">{m.name}</h3>
              <p className="text-[11px] uppercase tracking-[0.25em] text-on-deep/80">{m.role}</p>
            </figcaption>

            {/* Desktop hover or keyboard focus: a frosted card with the person's name and role */}
            <div
              className="member-card absolute inset-0 hidden flex-col items-center justify-center bg-card/85 text-center opacity-0 backdrop-blur-md transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 md:flex"
              aria-hidden
            >
              <p className="font-serif text-[clamp(1.6rem,2.5vw,2.25rem)] leading-tight text-heading">{m.name}</p>
              <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-ink">{m.role}</p>
            </div>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

/** Bridesmaids (6), a quote band, then groomsmen (4). */
export function Party() {
  return (
    <>
      <ParallaxSection
        id="bridesmaids"
        src="/images/bridesmaids-background.jpg"
        overlay="bg-deep/60"
        className="px-5 pb-24 pt-24 text-on-deep"
      >
        <Heading>Bridesmaids</Heading>
        <Grid people={bridesmaids} cols="lg:grid-cols-3" />
      </ParallaxSection>

      <Testimonials />

      <ParallaxSection
        id="groomsmen"
        src="/images/groomsmen-background.jpg"
        overlay="bg-deep/60"
        className="px-5 pb-24 pt-24 text-on-deep"
      >
        <Heading>Groomsmen</Heading>
        <Grid people={groomsmen} cols="lg:grid-cols-4" />
      </ParallaxSection>
    </>
  );
}
