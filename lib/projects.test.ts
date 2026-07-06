import { describe, it, expect } from "vitest";
import { splitProjects } from "./projects";
import type { Project } from "./types";

function makeProject(overrides: Partial<Project>): Project {
  return {
    slug: "test",
    title: "Test",
    description: "desc",
    tags: [],
    highlighted: false,
    order: 0,
    ...overrides,
  };
}

describe("splitProjects", () => {
  it("separates highlighted from non-highlighted projects, sorted by order", () => {
    const projects = [
      makeProject({ slug: "a", highlighted: true, order: 2 }),
      makeProject({ slug: "b", highlighted: false, order: 1 }),
      makeProject({ slug: "c", highlighted: true, order: 1 }),
    ];

    const { featured, more } = splitProjects(projects);

    expect(featured.map((p) => p.slug)).toEqual(["c", "a"]);
    expect(more.map((p) => p.slug)).toEqual(["b"]);
  });

  it("returns empty arrays when given no projects", () => {
    expect(splitProjects([])).toEqual({ featured: [], more: [] });
  });
});
