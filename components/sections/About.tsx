import Image from "next/image";
import { Reveal } from "../Reveal";
import { Mask } from "../Mask";

const people = [
  { name: "Marguin", role: "El novio", img: "/images/groom.jpg", side: "left" },
  { name: "María", role: "La novia", img: "/images/bride.jpg", side: "right" },
] as const;

const quote =
  "Alguien me dijo una vez que «cuando conoces a la persona indicada, lo sabes». Pues yo simplemente lo supe: desde el primer momento conectamos de una forma que me hizo sentir plenitud.";

export function About() {
  return (
    <section className="relative overflow-hidden bg-paper px-5 py-24">
      <Mask src="/images/detailsleaf.svg" w={857} h={585} className="pointer-events-none absolute -right-20 top-24 hidden w-[32rem] max-w-none select-none opacity-35 md:block text-line" />
      <Mask src="/images/detailsleaf2.svg" w={424} h={398} className="pointer-events-none absolute -left-16 bottom-16 hidden w-72 max-w-none select-none opacity-35 md:block text-line" />

      <div className="relative mx-auto max-w-5xl">
        <Reveal from="fade" delay={0.1}>
          <h2 className="text-center font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-heading">¡Él se lo pidió y ella dijo que sí!</h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm">
            Aenean aliquam augue turpis, in tempor elit condimentum sit amet. Phasellus a sapien tincidunt nunc dapibus mollis.
            Etiam ultricies bibendum sodales. Nulla libero tortor, auctor at elit ut, pharetra placerat libero. Aenean gravida
            in libero sed tincidunt. Nulla non mattis nisl, in imperdiet justo. Proin metus mauris, gravida vel ante et, ornare
            laoreet libero sed ut quam vitae.
          </p>
        </Reveal>

        <div className="mt-20 space-y-16 md:space-y-20">
          {people.map((p) => {
            const left = p.side === "left";
            return (
              <Reveal key={p.name} from={left ? "right" : "left"}>
                <div className={`flex flex-col md:w-[94%] md:items-start ${left ? "md:mr-auto md:flex-row" : "md:ml-auto md:flex-row-reverse"}`}>
                  <Image
                    src={p.img}
                    alt={`${p.name}, ${p.role}`}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover md:aspect-[5/6] md:w-[42%]"
                  />
                  <div
                    className={`framed framed-double relative z-10 -mt-8 px-8 py-14 text-center md:mt-14 md:w-[60%] md:px-14 md:py-16 ${
                      left ? "md:-ml-12" : "md:-mr-12"
                    }`}
                  >
                    <h3 className="text-4xl text-heading">{p.name}</h3>
                    <p className="mt-1 text-sm uppercase italic tracking-wide text-heading">{p.role}</p>
                    <p className="mx-auto mt-6 max-w-sm text-[15px]">{quote}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
