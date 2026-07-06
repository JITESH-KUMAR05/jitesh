import {certifications} from "@/lib/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">
        Certifications
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {certifications.map(cert => (
          <li key={cert.title} className="rounded-lg border border-border p-5">
            <p className="font-display text-base font-semibold text-fg">
              {cert.title}
            </p>
            <p className="font-mono text-xs text-fg-muted">{cert.issuer}</p>
            {cert.files && (
              <div className="mt-3 flex flex-wrap gap-3 font-mono text-xs">
                {cert.files.map(f => (
                  <a
                    key={f.href}
                    href={f.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    {f.label} →
                  </a>
                ))}
              </div>
            )}
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block font-mono text-xs text-accent hover:underline"
              >
                Verify →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
