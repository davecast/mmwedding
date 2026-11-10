import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Story } from "@/components/sections/Story";
import { Invitation, Location, Party, Registry } from "@/components/sections/Wedding";
import { Gallery, Blog, Rsvp, Footer } from "@/components/sections/Final";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Story />
      <Invitation />
      <Location />
      <Party />
      <Registry />
      <Gallery />
      <Blog />
      <Rsvp />
      <Footer />
    </main>
  );
}
