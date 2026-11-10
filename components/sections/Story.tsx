import Image from "next/image";
import { Reveal } from "../Reveal";

function Year({ children }: { children: string }) {
  return (
    <Reveal from="down" className="my-12 flex justify-center">
      <span className="framed px-8 py-1 font-serif text-xl text-sage-deep">{children}</span>
    </Reveal>
  );
}

function Card({ title, children }: { title: string; children: string }) {
  return (
    <div className="sage-panel relative p-8 text-center">
      <h4 className="text-xl">{title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-white/90">{children}</p>
    </div>
  );
}

function DateTag({ children }: { children: string }) {
  return <span className="sage-panel relative inline-block px-6 py-2 font-serif text-lg">{children}</span>;
}

export function Story() {
  return (
    <>
      <section id="our-story-title" className="edge-both relative -mb-16 bg-slate px-5 pb-28 pt-40 text-center text-white">
        <h2 className="section-title !text-white">Our love story</h2>
      </section>

      <section id="loveline" className="bg-white px-5 pb-24 pt-24">
        <div className="relative mx-auto max-w-3xl">
          <div aria-hidden className="absolute left-1/2 top-0 h-full w-px bg-sage/40" />

          <div className="relative">
            <Year>2018</Year>
            <div className="grid items-start gap-6 md:grid-cols-2">
              <Reveal from="right"><Image src="/images/timeline-first-date.jpg" alt="Isabella and Andrew walking on the beach" width={600} height={600} className="w-full object-cover" /></Reveal>
              <Reveal from="left" delay={0.1} className="space-y-4 md:pt-12">
                <DateTag>22 September</DateTag>
                <Image src="/images/timeline-first-kiss.jpg" alt="Their first kiss" width={600} height={818} className="w-full object-cover" />
              </Reveal>
            </div>
            <Reveal className="mx-auto -mt-10 max-w-sm md:-mt-24 md:mr-auto md:ml-8">
              <Card title="Our first date & kiss">
                Andrew was extremely nervous. He was afraid to expose his feelings to Isabella, but didn’t want to risk staying in the friend zone. So it was now or never!
              </Card>
            </Reveal>
          </div>

          <div className="relative">
            <Year>2019</Year>
            <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
              <Reveal from="right"><Image src="/images/timeline-slider-img1.jpg" alt="Our vacations" width={1080} height={750} className="w-full object-cover" /></Reveal>
              <Reveal delay={0.1}>
                <Card title="Some of our most memorable moments">
                  They had taken overnight trips before, but this was their first huge vacation outside the USA, travelling through the Baltic region together.
                </Card>
              </Reveal>
            </div>
          </div>

          <div className="relative">
            <Year>2021</Year>
            <div className="grid items-start gap-6 md:grid-cols-2">
              <Reveal from="right"><Image src="/images/timeline-proposal-img1.jpg" alt="The proposal" width={600} height={818} className="w-full object-cover" /></Reveal>
              <Reveal from="left" delay={0.1} className="space-y-4">
                <DateTag>15 July</DateTag>
                <Image src="/images/timeline-proposal-img2.jpg" alt="The ring" width={600} height={800} className="w-full object-cover" />
              </Reveal>
            </div>
            <Reveal className="mx-auto -mt-10 max-w-sm">
              <Card title="She said Yes!">
                On a cruise off the shore of the Cayman Islands, Andrew’s nerves got the best of him, and he pulled Isabella back to the room and straight onto the balcony to ask the question.
              </Card>
            </Reveal>
          </div>

          <Reveal className="relative mt-20 bg-white py-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em]">This is where our</p>
            <p className="font-serif text-5xl uppercase tracking-wide text-sage sm:text-6xl">Forever<br />begins!</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
