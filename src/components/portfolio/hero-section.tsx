"use client";

import Image from "next/image";
import { Code, Globe, Mail } from "lucide-react";
import { DEFAULT_SITE } from "@/constants";
import { useSite } from "@/hooks/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveAssetUrl } from "@/utils/format";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { data, isLoading, isError } = useSite();
  const site = data ?? DEFAULT_SITE;
  const imageUrl = resolveAssetUrl(site.profileImageUrl);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section id="hero" className="min-h-[85vh] flex items-center py-20 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-80 w-full max-w-md mx-auto rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-[85vh] flex items-center py-20 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-accent mb-2">Portfolio</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {site.heroName}
            </h1>
            <p className="mt-3 text-xl text-muted">{site.heroTitle}</p>
            <p className="mt-6 text-base leading-relaxed text-muted max-w-xl">
              {site.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollTo("projects")}>View Projects</Button>
              <Button variant="secondary" onClick={() => scrollTo("contact")}>
                Contact Me
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Code className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-muted hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {imageUrl ? (
              <div className="relative h-72 w-72 sm:h-80 sm:w-80 overflow-hidden rounded-lg border border-border">
                <Image
                  src={imageUrl}
                  alt={site.heroName}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            ) : (
              <div className="flex h-72 w-72 sm:h-80 sm:w-80 items-center justify-center rounded-lg border border-border bg-card text-6xl font-bold text-muted">
                {site.heroName.charAt(0)}
              </div>
            )}
          </div>
        </div>
        {isError && (
          <p className="mt-4 text-xs text-muted">Showing cached profile content.</p>
        )}
      </div>
    </section>
  );
}
