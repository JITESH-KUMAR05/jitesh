"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const sections = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-semibold text-fg">
          {profile.name}
        </a>
        <nav className="hidden items-center gap-6 font-mono text-sm md:flex">
          {sections.map((s) => (
            <a key={s.href} href={s.href} className="text-fg-muted hover:text-fg">
              {s.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
        <button
          type="button"
          aria-label="Toggle menu"
          className="font-mono text-sm text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-4 font-mono text-sm md:hidden">
          {sections.map((s) => (
            <a key={s.href} href={s.href} onClick={() => setOpen(false)} className="text-fg-muted hover:text-fg">
              {s.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      )}
    </header>
  );
}
