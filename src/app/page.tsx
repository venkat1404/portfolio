import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { SkillsGrid } from "@/components/home/SkillsGrid";
import { Certifications } from "@/components/home/Certifications";
import { CurrentlyExploring } from "@/components/home/CurrentlyExploring";
import { EducationBlock } from "@/components/home/EducationBlock";
import { ContactCta } from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FeaturedProjects />
        <ExperienceTimeline />
        <SkillsGrid />
        <Certifications />
        <CurrentlyExploring />
        <EducationBlock />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
