import {getProjects} from "@/lib/getProjects";
import {splitProjects} from "@/lib/projects";
import {ProjectCard} from "./ProjectCard";

export function Projects() {
  const {featured, more} = splitProjects(getProjects());

  return (
    <>
      <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-fg">
          Featured Projects
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section id="more-projects" className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="font-display text-2xl font-semibold text-fg">
          More Projects
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
