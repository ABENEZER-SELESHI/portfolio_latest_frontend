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

type ProjectInput = Omit<Project, "technologies"> & {
  technologies: ProjectTechnologyInput[];
};

export function normalizeProject(project: ProjectInput): Project {
  return {
    ...project,
    technologies: normalizeProjectTechnologies(project.technologies),
  };
}

export function normalizeProjects(projects: ProjectInput[]): Project[] {
  return projects.map(normalizeProject);
}
