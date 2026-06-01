export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function resolveAssetUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base =
    process.env.NEXT_PUBLIC_UPLOADS_URL ||
    (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace(
      /\/api\/v1\/?$/,
      ""
    ) + "/uploads";
  return `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const res = (error as { response?: { data?: { message?: string; errors?: string[] } } })
      .response?.data;
    if (res?.errors?.length) return res.errors.join(", ");
    if (res?.message) return res.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
