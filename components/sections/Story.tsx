import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import { StoryTitle } from "../StoryTitle";
import { Depth, Stage } from "../Stage";
import { TimelineGallery } from "../TimelineGallery";
import { Mask } from "../Mask";

/** Year in a double, offset frame with a stem running down into the collage. */
function Year({ children, first }: { children: string; first?: boolean }) {
  return (
    <Reveal from="down" className={`relative flex justify-center ${first ? "" : "mt-16"}`}>
      {!first && <span aria-hidden className="absolute bottom-full left-1/2 -z-10 h-[6.5rem] w-px bg-line" />}
      <div className="year-box relative">
        <span className="block px-10 py-1.5 font-serif text-3xl text-heading">{children}</span>
      </div>
    </Reveal>
  );
}

/** White-bordered photo. Lifts slightly on hover (hover-capable devices only). */
function Photo({ src, alt, w, h, className = "", priority }: { src: string; alt: string; w: number; h: number; className?: string; priority?: boolean }) {
  return (
    <div className={`collage-tile bg-card p-2.5 sm:p-3 ${className}`}>
      <Image src={src} alt={alt} width={w} height={h} priority={priority} className="block h-auto w-full object-cover" />
    </div>
  );
}

function DateTag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`collage-tile bg-card p-2.5 sm:p-3 ${className}`}>
      <div className="accent-panel panel-double relative px-4 py-5 text-center font-serif text-xl sm:text-2xl">{children}</div>
    </div>
  );
}

function Card({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`collage-tile bg-card p-2.5 sm:p-3 ${className}`}>
      <div className="accent-panel panel-double relative px-8 py-10 text-center sm:px-10">
        <h4 className="text-2xl sm:text-[1.7rem]">{title}</h4>
        <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto my-4 w-32 text-on-accent/70" />
        <p className="text-sm leading-relaxed text-on-accent/95">{children}</p>
      </div>
    </div>
  );
}

/** Diamond ring with sparkle rays, drawn to match the template's icon. */
function RingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M32 2v6M16 10l4 4M48 10l-4 4M6 24h6M52 24h6" />
      <path d="M23 21h18l4 7-13 8-13-8z" />
      <path d="M19 28l13 8 13-8" />
      <circle cx="32" cy="58" r="17" />
      <circle cx="32" cy="58" r="10" />
    </svg>
  );
}

function Leaf({ which, className }: { which: 1 | 2; className: string }) {
  return which === 1 ? (
    <Mask src="/images/detailsleaf.svg" w={857} h={585} className={`pointer-events-none absolute hidden max-w-none select-none text-line opacity-40 md:block ${className}`} />
  ) : (
    <Mask src="/images/detailsleaf2.svg" w={424} h={398} className={`pointer-events-none absolute hidden max-w-none select-none text-line opacity-40 md:block ${className}`} />
  );
}


export function Story() {
  return (
    <>
      <StoryTitle />

      <section id="loveline" className="relative isolate overflow-hidden bg-paper px-5 pb-36 pt-20">
        <div className="mx-auto max-w-4xl">
          {/* 2018 */}
          <Year first>2018</Year>
          <Stage className="relative mt-16 flex flex-col gap-4 md:block md:aspect-[1132/920]">
            <Leaf which={1} className="-right-40 -top-12 w-[34rem]" />
            <Leaf which={2} className="-bottom-10 -left-52 w-[26rem]" />
            <Reveal from="right" className="relative md:absolute md:left-0 md:top-0 md:w-[54.5%]">
              <Depth d={-4}><Photo src="/images/timeline-first-date.jpg" alt="Marguin y María en la playa" w={600} h={600} /></Depth>
            </Reveal>
            <Reveal from="left" delay={0.1} className="relative md:absolute md:left-[49.6%] md:top-[15.8%] md:w-[50.4%]">
              <Depth d={6}><Photo src="/images/timeline-first-kiss.jpg" alt="Su primer beso" w={600} h={818} /></Depth>
            </Reveal>
            <Reveal from="fade" delay={0.25} className="relative z-10 self-start md:absolute md:left-[52%] md:top-[6%] md:w-[28.5%]">
              <Depth d={3}><DateTag>22 de septiembre</DateTag></Depth>
            </Reveal>
            <Reveal delay={0.15} className="relative z-10 md:absolute md:left-[6%] md:top-[53%] md:w-[49%]">
              <Depth d={-6}><Card title="Nuestra primera cita y nuestro primer beso">
                Marguin estaba muy nervioso. Temía mostrar sus sentimientos a María, pero no quería quedarse en la zona de amigos.
                ¡Era ahora o nunca! Después de todo, María era la indicada. «¡Ya era hora!», dijo ella. Fue… ¡PERFECTO!
              </Card></Depth>
            </Reveal>
          </Stage>

          {/* 2019 */}
          <div>
            <Year>2019</Year>
            <Stage className="relative mt-16 flex flex-col gap-4 md:block md:aspect-[100/50.8]">
              <Leaf which={2} className="-left-56 top-0 w-[22rem] -scale-x-100" />
              <Reveal from="right" className="relative md:absolute md:left-0 md:top-0 md:w-[58%]">
                <Depth d={-3}><TimelineGallery /></Depth>
              </Reveal>
              <Reveal delay={0.15} className="relative z-10 md:absolute md:left-[50%] md:top-[13%] md:w-[48%]">
                <Depth d={5}><Card title="Algunos de nuestros momentos más memorables">
                  Ya habían hecho escapadas de una noche, pero estas fueron sus primeras grandes vacaciones fuera de Estados Unidos. María y Marguin
                  recorrieron la región del Báltico y visitaron varios países, entre ellos Islandia, Finlandia, Dinamarca, Polonia y Alemania.
                </Card></Depth>
              </Reveal>
            </Stage>
          </div>

          {/* 2021 */}
          <div>
            <Year>2021</Year>
            <Stage className="relative mt-16 flex flex-col gap-4 md:block md:aspect-[100/101]">
              <Leaf which={1} className="-right-44 top-[40%] w-[30rem]" />
              <Reveal from="right" className="relative md:absolute md:left-0 md:top-[25%] md:w-[52%]">
                <Depth d={-2}><Photo src="/images/timeline-proposal-img2.jpg" alt="La propuesta" w={600} h={800} /></Depth>
              </Reveal>
              <Reveal from="left" delay={0.1} className="relative md:absolute md:left-[50%] md:top-[3%] md:w-[50%]">
                <Depth d={4}><Photo src="/images/timeline-proposal-img1.jpg" alt="El anillo" w={600} h={818} /></Depth>
              </Reveal>
              <Reveal from="fade" delay={0.25} className="relative z-10 self-start md:absolute md:left-[58%] md:top-0 md:w-[30%]">
                <Depth d={3}><DateTag>15 de julio</DateTag></Depth>
              </Reveal>
              <Reveal delay={0.15} className="relative z-10 md:absolute md:left-[36%] md:top-[60%] md:w-[55%]">
                <Depth d={-5}><Card title="¡Dijo que sí!">
                  En un crucero frente a las costas de las Islas Caimán, los nervios le ganaron a Marguin. Llevó a María de vuelta al camarote y
                  directo al balcón, y le hizo la pregunta. (¡SÍ!)
                </Card></Depth>
              </Reveal>
            </Stage>
          </div>

          <Reveal className="relative mt-24 flex flex-col items-center text-center">
            <span aria-hidden className="absolute bottom-full left-1/2 -z-10 h-[12.5rem] w-px bg-line" />
            <RingIcon className="mt-5 w-14 text-line/60" />
            <p className="mt-3 font-serif text-[clamp(1.2rem,2.4vw,1.75rem)] uppercase leading-none text-gold-ink">Aquí comienza nuestro</p>
            <p className="mt-3 font-serif text-[clamp(3.25rem,8.5vw,5.5rem)] font-bold uppercase leading-[0.92] text-gold-ink">
              Para<br />siempre
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
