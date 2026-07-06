import type {Project} from "@/lib/types";

export function ProjectCard({project}: {project: Project}) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="aspect-video w-full rounded-md object-cover"
        />
      )}
      <h3 className="font-display text-xl font-semibold text-fg">
        {project.title}
      </h3>
      <p className="text-sm text-fg-muted">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <li
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-fg-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 pt-2 font-mono text-sm">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            GitHub →
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Live →
          </a>
        )}
      </div>
    </article>
  );
}
