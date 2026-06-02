"use client";

import { AdminLayout } from "@/layouts/admin-layout";
import { useDashboard } from "@/hooks/queries";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { formatDate } from "@/utils/format";

export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboard();

  return (
    <AdminLayout title="Dashboard">
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Projects", value: data.totalProjects },
              { label: "Certificates", value: data.totalCertificates },
              { label: "Skills", value: data.totalSkills },
              { label: "Unread Messages", value: data.unreadMessages },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Last updated: {formatDate(data.lastUpdated)}
          </p>
        </>
      )}
    </AdminLayout>
  );
}
