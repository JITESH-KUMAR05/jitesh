import fs from "node:fs";
import path from "node:path";
import {profile} from "@/lib/data/profile";

const hasPhoto = fs.existsSync(
  path.join(process.cwd(), "public", "images", "profile.jpg")
);

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-20 sm:flex-row sm:items-center sm:justify-between sm:pt-28"
    >
      <div className="flex flex-col gap-6">
        <p className="font-mono text-sm text-accent">Hi, I'm</p>
        <h1 className="font-display text-4xl font-semibold text-fg sm:text-5xl">
          {profile.name}
        </h1>
        <h2 className="text-xl text-fg-muted sm:text-2xl">{profile.role}</h2>
        <p className="max-w-2xl text-fg-muted">{profile.tagline}</p>
        <div className="flex flex-wrap gap-4 font-mono text-sm">
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
            href={`mailto:${profile.email}`}
            className="text-accent hover:underline"
          >
            Email
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-border px-4 py-1.5 text-fg hover:border-accent"
          >
            Download Résumé
          </a>
        </div>
      </div>
      {hasPhoto && (
        <img
          src="/images/profile.jpg"
          alt={profile.name}
          className="h-40 w-40 shrink-0 self-start rounded-full border border-border object-cover sm:h-48 sm:w-48"
        />
      )}
    </section>
  );
}
