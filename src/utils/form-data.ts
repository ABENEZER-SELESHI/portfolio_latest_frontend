export function appendProjectFormData(
  fd: FormData,
  data: {
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category?: string;
    isFeatured?: boolean;
    completedAt?: string;
    sortOrder?: number;
  },
  screenshot?: File | null
) {
  fd.append("title", data.title);
  fd.append("description", data.description);
  data.technologies.forEach((tech) => fd.append("technologies", tech));
  if (data.liveUrl) fd.append("liveUrl", data.liveUrl);
  if (data.githubUrl) fd.append("githubUrl", data.githubUrl);
  if (data.category) fd.append("category", data.category);
  fd.append("isFeatured", String(data.isFeatured ?? false));
  if (data.completedAt) fd.append("completedAt", data.completedAt);
  fd.append("sortOrder", String(data.sortOrder ?? 0));
  if (screenshot) fd.append("screenshot", screenshot);
  return fd;
}

export function parseTechnologiesInput(input: string): string[] {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
