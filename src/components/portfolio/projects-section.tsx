"use client";

import Image from "next/image";
import { Code, ExternalLink } from "lucide-react";
import { useProjects } from "@/hooks/queries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Card } from "@/components/ui/card";
import { resolveAssetUrl, formatDate } from "@/utils/format";

export function ProjectsSection() {
  const { data, isLoading, isError, refetch } = useProjects();
  const projects = data ?? [];

  return (
    <Section id="projects" title="Projects" subtitle="Selected work and applications">
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && projects.length === 0 && (
        <EmptyState title="No projects yet" description="Projects will appear once published." />
      )}
      {!isLoading && projects.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const screenshot = resolveAssetUrl(project.screenshotUrl);
            return (
              <Card key={project.id} className="overflow-hidden p-0 flex flex-col">
                {screenshot ? (
                  <div className="relative h-48 w-full border-b border-border">
                    <Image
                      src={screenshot}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center border-b border-border bg-background text-muted text-sm">
                    No preview
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    {project.isFeatured && (
                      <span className="shrink-0 rounded border border-accent/40 px-2 py-0.5 text-xs text-accent">
                        Featured
                      </span>
                    )}
                  </div>
                  {project.category && (
                    <p className="mt-1 text-xs text-muted">{project.category}</p>
                  )}
                  <p className="mt-3 text-sm text-muted line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border px-2 py-0.5 text-xs text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent"
                          aria-label="Live demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent"
                          aria-label="GitHub"
                        >
                          <Code className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    {project.completedAt && (
                      <span className="text-xs text-muted">
                        {formatDate(project.completedAt)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Section>
  );
}
