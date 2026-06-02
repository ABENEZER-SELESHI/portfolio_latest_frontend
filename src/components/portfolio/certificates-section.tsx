"use client";

import { Award, ExternalLink } from "lucide-react";
import { useCertificates } from "@/hooks/queries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/format";
import { API_BASE_URL } from "@/constants";

export function CertificatesSection() {
  const { data, isLoading, isError, refetch } = useCertificates();
  const certs = data ?? [];

  return (
    <Section id="certificates" title="Certificates" subtitle="Professional credentials and achievements">
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && certs.length === 0 && (
        <EmptyState title="No certificates" />
      )}
      {!isLoading && certs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {certs.map((cert) => {
            const fileHref = cert.fileUrl
              ? cert.fileUrl.startsWith("http")
                ? cert.fileUrl
                : `${API_BASE_URL.replace(/\/api\/v1\/?$/, "")}/uploads/${cert.fileUrl.replace(/^\//, "")}`
              : null;
            const link = cert.externalUrl || fileHref;
            return (
              <Card key={cert.id} className="flex gap-4">
                <Award className="h-8 w-8 shrink-0 text-accent" aria-hidden />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted">{cert.issuer}</p>
                  <p className="mt-1 text-xs text-muted">{formatDate(cert.issueDate)}</p>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Section>
  );
}
