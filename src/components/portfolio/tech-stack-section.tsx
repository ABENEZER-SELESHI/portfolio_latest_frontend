"use client";

import Image from "next/image";
import { useTechStack } from "@/hooks/queries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { resolveAssetUrl } from "@/utils/format";

export function TechStackSection() {
  const { data, isLoading, isError, refetch } = useTechStack();
  const items = data ?? [];

  return (
    <Section id="tech-stack" title="Tech Stack" subtitle="Tools and technologies I work with">
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && items.length === 0 && (
        <EmptyState title="No tech stack items" />
      )}
      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => {
            const logo = resolveAssetUrl(item.logoUrl);
            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-4 text-center"
              >
                {logo ? (
                  <Image src={logo} alt={item.name} width={40} height={40} className="mb-2" />
                ) : (
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-background text-xs font-bold text-muted">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                {item.proficiency != null && (
                  <span className="mt-1 text-xs text-muted">{item.proficiency}%</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
