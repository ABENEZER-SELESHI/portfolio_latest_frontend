"use client";

import { DEFAULT_SITE } from "@/constants";
import { useSite } from "@/hooks/queries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";

export function AboutSection() {
  const { data, isLoading, isError, refetch } = useSite();
  const bio = data?.aboutBio ?? DEFAULT_SITE.aboutBio;

  return (
    <Section id="about" title="About" subtitle="Background and professional focus">
      {isLoading && (
        <div className="space-y-3 max-w-3xl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}
      {isError && !data && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && (
        <p className="max-w-3xl text-base leading-relaxed text-muted whitespace-pre-line">
          {bio}
        </p>
      )}
    </Section>
  );
}
