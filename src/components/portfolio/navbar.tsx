"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS } from "@/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

export function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
        >
          {name}
        </button>

        <div className="hidden md:flex items-center gap-6">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {s.label}
            </button>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "md:hidden border-t border-border bg-background",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 p-4">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className="rounded-md px-3 py-2 text-left text-sm text-muted hover:bg-card hover:text-foreground"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
