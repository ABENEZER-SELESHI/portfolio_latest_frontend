"use client";

import { DEFAULT_SITE } from "@/constants";
import { useSite } from "@/hooks/queries";

export function Footer() {
  const { data } = useSite();
  const name = data?.heroName ?? DEFAULT_SITE.heroName;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>
          {year} {name}. All rights reserved.
        </p>
        <p>Full-Stack Web Developer Portfolio</p>
      </div>
    </footer>
  );
}
