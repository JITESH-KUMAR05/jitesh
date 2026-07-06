import {experience} from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">
        Experience
      </h2>
      <div className="mt-8 flex flex-col gap-10">
        {experience.map(entry => (
          <div key={entry.company} className="flex flex-col gap-3">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-display text-xl font-semibold text-fg">
                {entry.role} · {entry.company}
              </h3>
              <span className="font-mono text-sm text-fg-muted">
                {entry.date}
              </span>
            </div>
            <p className="font-mono text-xs text-fg-muted">{entry.location}</p>
            <ul className="mt-2 flex flex-col gap-2 text-fg-muted">
              {entry.bullets.map(bullet => (
                <li key={bullet} className="pl-4 -indent-4">
                  – {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
