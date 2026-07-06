import { achievements } from "@/lib/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">Achievements</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {achievements.map((a) => (
          <li key={a.title} className="rounded-lg border border-border p-6">
            <p className="font-display text-lg font-semibold text-fg">{a.title}</p>
            <p className="mt-2 text-sm text-fg-muted">{a.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
