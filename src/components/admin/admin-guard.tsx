"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (isAuthenticated && isLoginPage) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, isHydrated, isLoginPage, router]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <Skeleton className="h-8 w-48" />
      </div>
    );
  }

  if (!isAuthenticated && !isLoginPage) return null;
  if (isAuthenticated && isLoginPage) return null;

  return <>{children}</>;
}
