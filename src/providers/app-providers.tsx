"use client";

import { useEffect } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastContainer } from "@/components/ui/toast";
import { useAuthStore } from "@/store/auth.store";
import { useInactivity } from "@/hooks/use-inactivity";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  useInactivity();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthBootstrap>
          {children}
          <ToastContainer />
        </AuthBootstrap>
      </QueryProvider>
    </ThemeProvider>
  );
}
