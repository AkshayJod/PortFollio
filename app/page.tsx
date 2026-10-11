import Chrome from "@/components/Chrome";
import Experience from "@/components/Experience";
import { Bring, Contact, Footer, Hero, Mission, Pillars, Stats, Story, Work } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Chrome />
      <main id="main">
        <Hero />
        <Stats />
        <Mission />
        <Pillars />
        <Story />
        <Bring />
        <Work />
        <Contact />
      </main>
      <Footer />
      <Experience />
    </>
  );
}
