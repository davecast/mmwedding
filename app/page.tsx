import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Preloader } from "@/components/Preloader";
import { About } from "@/components/sections/About";
import { Story } from "@/components/sections/Story";
import { Invitation, Location, Party } from "@/components/sections/Wedding";
import { Gallery, Rsvp, Footer } from "@/components/sections/Final";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Header />
      <Hero />
      <About />
      <Story />
      <Invitation />
      <Location />
      <Party />
            <Gallery />
            <Rsvp />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
