export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const UPLOADS_BASE_URL =
  process.env.NEXT_PUBLIC_UPLOADS_URL ||
  API_BASE_URL.replace(/\/api\/v1\/?$/, "") + "/uploads";

export const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

export const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const DEFAULT_SITE = {
  heroName: "Abenezer Seleshi",
  heroTitle: "Full-Stack Web Developer",
  heroIntro:
    "I build modern, scalable web applications with a focus on clean architecture, performance, and exceptional user experience across the full stack.",
  aboutBio: `Hello! I'm Abenezer Seleshi, a passionate Full-Stack Web Developer with expertise in building modern and scalable websites. With a strong foundation in both front-end and back-end technologies, I enjoy creating seamless user experiences and robust server-side solutions. My goal is to leverage my skills to develop innovative applications that solve real-world problems and enhance user engagement.`,
  profileImageUrl: null as string | null,
  linkedinUrl: "https://www.linkedin.com/in/abenezer-seleshi-66038a246/",
  githubUrl: "https://github.com/ABENEZER-SELESHI/",
  contactEmail: "ebenezerseleshi@gmail.com",
};

export const SITE_METADATA = {
  title: "Abenezer Seleshi | Full-Stack Web Developer",
  description:
    "Portfolio of Abenezer Seleshi — Full-Stack Web Developer specializing in React, Next.js, Node.js, and scalable web applications.",
  keywords: [
    "Abenezer Seleshi",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
};
