import { leadership } from "@/lib/data/leadership";

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">Leadership & Roles</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {leadership.map((entry) => (
          <div key={entry.role} className="rounded-lg border border-border p-6">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-fg">{entry.role}</h3>
              <span className="font-mono text-xs text-fg-muted">{entry.date}</span>
            </div>
            <p className="font-mono text-xs text-fg-muted">{entry.org}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-fg-muted">
              {entry.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
