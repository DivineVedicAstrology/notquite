import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <Hero />
      <ProjectGrid />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
