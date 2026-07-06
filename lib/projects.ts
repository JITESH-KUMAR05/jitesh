import type { Project } from "./types";

export function splitProjects(projects: Project[]): { featured: Project[]; more: Project[] } {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  return {
    featured: sorted.filter((p) => p.highlighted),
    more: sorted.filter((p) => !p.highlighted),
  };
}
