import Image from "next/image";
import { Reveal } from "../Reveal";

const people = [
  { name: "Andrew Miller", role: "The Groom", img: "/images/groom.jpg", side: "left" },
  { name: "Isabella Walker", role: "The Bride", img: "/images/bride.jpg", side: "right" },
] as const;

const quote =
  "Someone once told me that “when you meet the right person, you’ll know.” Well, I just knew. Right away, we connected in a way that left me feeling complete.";

export function About() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal from="fade" delay={0.1}>
          <h2 className="section-title text-sage-deep">He asked her &amp; she said yes!</h2>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm">
            Aenean aliquam augue turpis, in tempor elit condimentum sit amet. Phasellus a sapien tincidunt nunc dapibus mollis.
            Etiam ultricies bibendum sodales. Nulla libero tortor, auctor at elit ut, pharetra placerat libero.
          </p>
        </Reveal>

        <div className="mt-16 space-y-10">
          {people.map((p) => (
            <Reveal key={p.name} from={p.side === "left" ? "right" : "left"}>
              <div className={`flex flex-col items-stretch md:items-center ${p.side === "right" ? "md:flex-row-reverse" : "md:flex-row"}`}>
                <Image src={p.img} alt={`${p.name}, ${p.role}`} width={600} height={600} className="aspect-square w-full object-cover md:w-72" />
                <div className={`framed z-10 -mt-6 p-8 text-center md:mt-0 md:w-[24rem] ${p.side === "left" ? "md:-ml-8" : "md:-mr-8"}`}>
                  <h3 className="text-2xl text-sage-deep">{p.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-sage">{p.role}</p>
                  <p className="mt-4 text-sm">{quote}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
