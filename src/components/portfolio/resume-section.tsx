"use client";

import { Download, FileText } from "lucide-react";
import { useResume } from "@/hooks/queries";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants";

export function ResumeSection() {
  const { data, isLoading, isError } = useResume();
  const downloadUrl =
    data?.downloadUrl ?? `${API_BASE_URL}/resume/download`;

  return (
    <Section id="resume" title="Resume" subtitle="Download my latest CV">
      {isLoading && <Skeleton className="h-32 w-full max-w-lg" />}
      {!isLoading && (
        <Card className="max-w-lg flex items-start gap-4">
          <FileText className="h-10 w-10 shrink-0 text-accent" aria-hidden />
          <div>
            {isError ? (
              <p className="text-sm text-muted mb-4">
                Resume is not available at the moment. Please check back later or use the contact
                form.
              </p>
            ) : (
              <>
                <p className="text-sm text-muted mb-1">Current document</p>
                <p className="font-medium text-foreground mb-4">
                  {data?.filename ?? "Resume.pdf"}
                </p>
              </>
            )}
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button disabled={isError}>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </div>
        </Card>
      )}
    </Section>
  );
}
