import { ParallaxSection } from "./ParallaxSection";
import { Mask } from "./Mask";

/** "Our love story" banner: wedge-shaped section with a parallax photo. */
export function StoryTitle() {
  return (
    <ParallaxSection
      id="our-story-title"
      src="/images/table.jpg"
      overlay="bg-deep/70"
      flip
      position="top"
      className="edge-wedge px-5 pb-40 pt-44 text-center text-on-deep"
    >
      <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)]">Nuestra historia de amor</h2>
      <Mask src="/images/ourstory.svg" w={189} h={26} className="mx-auto mt-4 w-[189px] text-line-deep" />
    </ParallaxSection>
  );
}
