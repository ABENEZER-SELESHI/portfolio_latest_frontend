import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-20 scroll-mt-20", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
          <div className="mt-4 h-px w-16 bg-accent" />
        </div>
        {children}
      </div>
    </section>
  );
}
