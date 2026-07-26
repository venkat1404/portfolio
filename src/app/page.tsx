import { site, seo } from "@/data/site";
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Data Engineer",
  email: `mailto:${site.email}`,
  url: seo.siteUrl,
  sameAs: [site.linkedinUrl, site.githubUrl],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Maryland, Robert H. Smith School of Business",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Manipal Institute of Technology",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "College Park",
    addressRegion: "MD",
    addressCountry: "US",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
