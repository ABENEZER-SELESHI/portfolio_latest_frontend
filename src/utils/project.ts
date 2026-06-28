import type { Project } from "@/types";

/** API returns nested technology rows; UI expects string labels */
export type ProjectTechnologyInput =
  | string
  | { id?: string; projectId?: string; technology: string };

export function normalizeProjectTechnologies(
  technologies: ProjectTechnologyInput[] | undefined
): string[] {
  if (!technologies?.length) return [];
  return technologies.map((item) =>
    typeof item === "string" ? item : item.technology
  );
}

export function normalizeProject<T extends { technologies: ProjectTechnologyInput[] }>(
  project: T
): Project {
  return {
    ...project,
    technologies: normalizeProjectTechnologies(project.technologies),
  } as Project;
}

export function normalizeProjects<T extends { technologies: ProjectTechnologyInput[] }>(
  projects: T[]
): Project[] {
  return projects.map(normalizeProject);
}
