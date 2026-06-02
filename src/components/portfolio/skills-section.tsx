"use client";

import { useSkills } from "@/hooks/queries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Card } from "@/components/ui/card";

export function SkillsSection() {
  const { data, isLoading, isError, refetch } = useSkills();
  const categories = data?.categories ?? [];

  return (
    <Section id="skills" title="Skills" subtitle="Technical expertise by category">
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && categories.length === 0 && (
        <EmptyState title="No skills listed" description="Skills will appear once configured." />
      )}
      {!isLoading && categories.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <h3 className="font-semibold text-foreground mb-4">{cat.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="rounded-md border border-border bg-background px-3 py-1 text-sm text-muted"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
