import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Experience } from "@/components/experience/Experience";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { Leadership } from "@/components/leadership/Leadership";
import { Achievements } from "@/components/achievements/Achievements";
import { Education } from "@/components/education/Education";
import { Certifications } from "@/components/certifications/Certifications";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Leadership />
        </Reveal>
        <Reveal>
          <Achievements />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <Certifications />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
