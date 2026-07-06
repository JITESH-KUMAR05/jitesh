import {profile} from "@/lib/data/profile";

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">Contact</h2>
      <p className="mt-4 max-w-xl text-fg-muted">
        Open to full-stack and backend engineering roles. Reach out directly — I
        read every email.
      </p>
      <div className="mt-6 flex flex-wrap gap-6 font-mono text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="text-accent hover:underline"
        >
          {profile.email}
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          GitHub
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          LinkedIn
        </a>
        <a
          href={profile.links.leetcode}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          LeetCode
        </a>
        <a
          href={profile.resumeUrl}
          download
          className="text-accent hover:underline"
        >
          Résumé
        </a>
      </div>
      <p className="mt-12 font-mono text-xs text-fg-muted">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
