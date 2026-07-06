import {education} from "@/lib/data/education";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">Education</h2>
      <div className="mt-8 flex flex-col gap-6">
        {education.map(entry => (
          <div
            key={entry.school}
            className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline"
          >
            <div>
              <h3 className="font-display text-lg font-semibold text-fg">
                {entry.school}
              </h3>
              <p className="text-sm text-fg-muted">{entry.detail}</p>
            </div>
            <div className="text-left font-mono text-sm text-fg-muted sm:text-right">
              <p>{entry.score}</p>
              <p>{entry.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
