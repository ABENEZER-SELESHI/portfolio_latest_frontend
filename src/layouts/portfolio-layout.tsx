"use client";

import { Navbar } from "@/components/portfolio/navbar";
import { AdminFab } from "@/components/portfolio/admin-fab";
import { DEFAULT_SITE } from "@/constants";
import { useSite } from "@/hooks/queries";

export function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSite();
  const name = data?.heroName ?? DEFAULT_SITE.heroName;

  return (
    <>
      <Navbar name={name} />
      <main>{children}</main>
      <AdminFab />
    </>
  );
}
