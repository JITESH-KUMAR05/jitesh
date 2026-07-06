import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {Project} from "./types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".md"));

  return files.map(file => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const {data} = matter(raw);

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      description: data.description,
      tags: data.tags ?? [],
      github: data.github || undefined,
      live: data.live || undefined,
      image: data.image || undefined,
      highlighted: Boolean(data.highlighted),
      order: Number(data.order ?? 0)
    };
  });
}
