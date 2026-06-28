"use client";

import { PortfolioLayout } from "@/layouts/portfolio-layout";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { CertificatesSection } from "@/components/portfolio/certificates-section";
import { ResumeSection } from "@/components/portfolio/resume-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";

export default function HomePage() {
  return (
    <PortfolioLayout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </PortfolioLayout>
  );
}
