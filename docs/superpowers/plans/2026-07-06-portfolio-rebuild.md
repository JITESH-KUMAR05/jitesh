# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current CRA-based "Personal-Portfolio" template site with a custom-coded Next.js 14 portfolio for Jitesh Kumar, content aligned to his resume, fully responsive, with a light/dark theme and a git-backed CMS for projects.

**Architecture:** Single scrolling one-page Next.js (App Router) site. Static resume content (experience, skills, education, leadership, achievements, certifications) lives in typed TS data modules under `lib/data/`. Projects are the one content type that changes often, so they live as Markdown files with frontmatter under `content/projects/`, edited through a TinaCMS admin UI at `/admin` that commits directly to the repo. A pure `splitProjects()` function divides projects into "Featured" (resume headline projects) and "More" based on a `highlighted` flag set in the CMS. Theming via `next-themes` (class-based, light/dark, OS-default). Deploy target: Vercel, domain `jitesh.codes`.

**Tech Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + next-themes + Framer Motion + TinaCMS (git-backed) + gray-matter + Vitest + React Testing Library.

## Global Constraints

- Next.js 14 App Router + TypeScript + Tailwind CSS; deploy on Vercel; domain `jitesh.codes` (DNS cutover is a manual step for Jitesh after launch — not part of this plan).
- Single scrolling page with anchor-linked sections. No multi-page routing.
- Both light and dark mode via `next-themes`: class-based (`darkMode: "class"`), defaults to OS preference, persists user choice.
- Light mode = minimal/editorial (whitespace-heavy, single accent color). Dark mode = technical/terminal-inspired (monospace labels/tags). Same layout skeleton in both.
- TinaCMS (git-backed) manages **only** the projects collection. All other content (experience, skills, education, leadership, achievements, certifications) stays in code (`lib/data/`), not admin-editable.
- Projects have a `highlighted: boolean` field. Featured Projects section = `highlighted: true`; More Projects section = `highlighted: false`. Both render from the same collection via one `splitProjects()` function.
- Framer Motion used only for restrained scroll-reveal transitions. No splash screen, no lottie.
- No runtime GitHub API calls, no build-time GitHub-fetch script.
- Contact: email `jiteshtechwork@gmail.com` + GitHub/LinkedIn/LeetCode links only. No contact form. No phone number shown.
- Resume PDF served from the site's own domain (`public/resume/jitesh-resume.pdf`), not an external link.
- Fully responsive: every section uses mobile-first Tailwind breakpoints (`sm:`, `md:`, `lg:`) — no fixed-width layouts, no horizontal overflow at any width from ~360px up.
- Positioning: "Full-Stack / Backend Software Engineer" (not "AI/ML Engineer").
- The existing CRA app (`src/**`, `public/index.html`, `fetch.js`, `Dockerfile`, `.github/workflows/deploy.yml`) is removed entirely — this is a full rebuild in the same repo.

---

### Task 1: Remove legacy CRA app, scaffold Next.js + TypeScript + Tailwind

**Files:**

- Delete: `src/` (entire directory), `public/index.html`, `public/manifest.json`, `public/browserconfig.xml`, `fetch.js`, `Dockerfile`, `.github/workflows/deploy.yml`
- Keep as-is: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-384x384.png`, `public/mstile-150x150.png`, `public/safari-pinned-tab.svg`, `public/robots.txt`
- Create: `package.json` (rewrite), `next.config.mjs`, `tsconfig.json`, `next-env.d.ts`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Test: none (pure scaffolding, verified by build)

**Interfaces:**

- Consumes: nothing (first task)
- Produces: a bootable Next.js app at `app/page.tsx` rendering placeholder content; `@/*` import alias resolving to repo root; Tailwind available via `@tailwind base/components/utilities` in `app/globals.css`

- [ ] **Step 1: Delete the CRA app and its build tooling**

```bash
cd "d:\D\WebDev\jitesh"
git rm -r src public/index.html public/manifest.json public/browserconfig.xml fetch.js Dockerfile .github/workflows/deploy.yml
```

- [ ] **Step 2: Rewrite `package.json`**

```json
{
  "name": "jitesh-kumar-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --write \"./**/*.{ts,tsx,json,css,md}\"",
    "check-format": "prettier -c \"./**/*.{ts,tsx,json,css,md}\""
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-themes": "^0.3.0",
    "framer-motion": "^11.0.0",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vitest": "^1.5.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "jsdom": "^24.0.0",
    "prettier": "^3.2.0"
  },
  "browserslist": {
    "production": [">0.3%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- [ ] **Step 3: Add `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Add `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "baseUrl": ".",
    "paths": {"@/*": ["./*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Add `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 6: Add `tailwind.config.ts`**

```ts
import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: []
};

export default config;
```

- [ ] **Step 7: Add `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

- [ ] **Step 8: Add `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 9: Add placeholder `app/layout.tsx` and `app/page.tsx`**

```tsx
// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Jitesh Kumar"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
export default function Home() {
  return <main>Portfolio rebuild in progress.</main>;
}
```

- [ ] **Step 10: Install dependencies and verify the build**

```bash
npm install
npm run build
```

Expected: build completes with `✓ Compiled successfully` and no TypeScript errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: remove legacy CRA app, scaffold Next.js + TypeScript + Tailwind"
```

---

### Task 2: Project data model, split logic, and test infrastructure

**Files:**

- Create: `lib/types.ts`, `lib/projects.ts`, `lib/projects.test.ts`, `vitest.config.ts`, `vitest.setup.ts`

**Interfaces:**

- Consumes: nothing new
- Produces: `Project` interface (`slug: string; title: string; description: string; tags: string[]; github?: string; live?: string; image?: string; highlighted: boolean; order: number;`) from `lib/types.ts`; `splitProjects(projects: Project[]): { featured: Project[]; more: Project[] }` from `lib/projects.ts`, used by Task 8's `Projects` component

- [ ] **Step 1: Add Vitest config**

```ts
// vitest.config.ts
import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  }
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 2: Add the `Project` type**

```ts
// lib/types.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  image?: string;
  highlighted: boolean;
  order: number;
}
```

- [ ] **Step 3: Write the failing test for `splitProjects`**

```ts
// lib/projects.test.ts
import {describe, it, expect} from "vitest";
import {splitProjects} from "./projects";
import type {Project} from "./types";

function makeProject(overrides: Partial<Project>): Project {
  return {
    slug: "test",
    title: "Test",
    description: "desc",
    tags: [],
    highlighted: false,
    order: 0,
    ...overrides
  };
}

describe("splitProjects", () => {
  it("separates highlighted from non-highlighted projects, sorted by order", () => {
    const projects = [
      makeProject({slug: "a", highlighted: true, order: 2}),
      makeProject({slug: "b", highlighted: false, order: 1}),
      makeProject({slug: "c", highlighted: true, order: 1})
    ];

    const {featured, more} = splitProjects(projects);

    expect(featured.map(p => p.slug)).toEqual(["c", "a"]);
    expect(more.map(p => p.slug)).toEqual(["b"]);
  });

  it("returns empty arrays when given no projects", () => {
    expect(splitProjects([])).toEqual({featured: [], more: []});
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

```bash
npx vitest run lib/projects.test.ts
```

Expected: FAIL — `Cannot find module './projects'` (file doesn't exist yet).

- [ ] **Step 5: Implement `splitProjects`**

```ts
// lib/projects.ts
import type {Project} from "./types";

export function splitProjects(projects: Project[]): {
  featured: Project[];
  more: Project[];
} {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  return {
    featured: sorted.filter(p => p.highlighted),
    more: sorted.filter(p => !p.highlighted)
  };
}
```

- [ ] **Step 6: Run the test to verify it passes**

```bash
npx vitest run lib/projects.test.ts
```

Expected: PASS — 2 tests passed.

- [ ] **Step 7: Commit**

```bash
git add lib/types.ts lib/projects.ts lib/projects.test.ts vitest.config.ts vitest.setup.ts package.json
git commit -m "feat: add project data model and highlighted/more split logic"
```

---

### Task 3: Design tokens — fonts, color system, light/dark CSS variables

**Files:**

- Modify: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`

**Interfaces:**

- Consumes: nothing new
- Produces: Tailwind color utilities `bg-bg`, `bg-surface`, `text-fg`, `text-fg-muted`, `text-accent`, `border-border` (mapped to CSS vars, swap value under `.dark`); `font-display` and `font-mono` Tailwind font utilities (mapped to `--font-display` / `--font-mono` CSS vars set by `next/font` in `app/layout.tsx`). Every later component task uses these tokens instead of raw Tailwind colors.

- [ ] **Step 1: Add CSS variables for light and dark palettes**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #fbfaf8;
  --surface: #ffffff;
  --fg: #1a1a1a;
  --fg-muted: #5c5c5c;
  --accent: #b45309;
  --border: #e5e1da;
}

.dark {
  --bg: #0b0d0f;
  --surface: #121417;
  --fg: #e8e6e1;
  --fg-muted: #9a9a94;
  --accent: #f0b429;
  --border: #23262b;
}

body {
  background-color: var(--bg);
  color: var(--fg);
}
```

- [ ] **Step 2: Map the CSS variables into Tailwind's theme**

```ts
// tailwind.config.ts
import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        accent: "var(--accent)",
        border: "var(--border)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"]
      }
    }
  },
  plugins: []
};

export default config;
```

- [ ] **Step 3: Load self-hosted variable fonts via `next/font/google` and apply to `<html>`**

`next/font/google` downloads and self-hosts the font files at build time — no runtime request to Google, satisfies "self-hosted fonts" without sourcing font binaries manually.

```tsx
// app/layout.tsx
import {Fraunces, JetBrains_Mono} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata = {
  title: "Jitesh Kumar"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat: add light/dark design tokens and self-hosted fonts"
```

---

### Task 4: Theme system — ThemeProvider + ThemeToggle

**Files:**

- Create: `components/theme/ThemeProvider.tsx`, `components/theme/ThemeToggle.tsx`, `components/theme/ThemeToggle.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**

- Consumes: Tailwind tokens from Task 3 (`border-border`, `text-fg`)
- Produces: `<ThemeProvider>` wraps `{children}` in `app/layout.tsx`; `<ThemeToggle />` used by Task 5's `Nav` component

- [ ] **Step 1: Write the failing test for `ThemeToggle`**

```tsx
// components/theme/ThemeToggle.test.tsx
import {describe, it, expect} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {ThemeProvider} from "next-themes";
import {ThemeToggle} from "./ThemeToggle";

function renderWithTheme() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  it("toggles the html element's dark class on click", () => {
    renderWithTheme();
    const button = screen.getByRole("button", {name: /toggle theme/i});

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run components/theme/ThemeToggle.test.tsx
```

Expected: FAIL — `Cannot find module './ThemeToggle'`.

- [ ] **Step 3: Implement `ThemeProvider`**

```tsx
// components/theme/ThemeProvider.tsx
"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import type {ReactNode} from "react";

export function ThemeProvider({children}: {children: ReactNode}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 4: Implement `ThemeToggle`**

```tsx
// components/theme/ThemeToggle.tsx
"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export function ThemeToggle() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border font-mono text-sm text-fg"
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
npx vitest run components/theme/ThemeToggle.test.tsx
```

Expected: PASS — 1 test passed.

- [ ] **Step 6: Wire `ThemeProvider` into the root layout**

```tsx
// app/layout.tsx
import {Fraunces, JetBrains_Mono} from "next/font/google";
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata = {
  title: "Jitesh Kumar"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg font-sans text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add components/theme app/layout.tsx
git commit -m "feat: add light/dark theme provider and toggle"
```

---

### Task 5: Nav component

**Files:**

- Create: `components/nav/Nav.tsx`, `components/nav/Nav.test.tsx`, `lib/data/profile.ts`

**Interfaces:**

- Consumes: `<ThemeToggle />` from Task 4
- Produces: `profile` object from `lib/data/profile.ts` (`{ name, role, tagline, email, links: { github, linkedin, leetcode }, resumeUrl }`) — reused by Task 6 (Hero) and Task 12 (Footer); `<Nav />` used by Task 13's `app/page.tsx`

- [ ] **Step 1: Add the profile data module**

```ts
// lib/data/profile.ts
export const profile = {
  name: "Jitesh Kumar",
  role: "Full-Stack / Backend Software Engineer",
  tagline:
    "Building production backends and AI-integrated systems — from database-level access control to real-time streaming pipelines.",
  email: "jiteshtechwork@gmail.com",
  links: {
    github: "https://github.com/JITESH-KUMAR05",
    linkedin: "https://www.linkedin.com/in/jiteshkumar05/",
    leetcode: "https://leetcode.com/u/jitesh_kumar05"
  },
  resumeUrl: "/resume/jitesh-resume.pdf"
};
```

- [ ] **Step 2: Write the failing test for `Nav`**

```tsx
// components/nav/Nav.test.tsx
import {describe, it, expect} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {ThemeProvider} from "next-themes";
import {Nav} from "./Nav";

function renderNav() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Nav />
    </ThemeProvider>
  );
}

describe("Nav", () => {
  it("renders the site name and all section links", () => {
    renderNav();
    expect(screen.getAllByText("Jitesh Kumar").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", {name: "Experience"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Projects"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Contact"})).toBeInTheDocument();
  });

  it("opens and closes the mobile menu on toggle click", () => {
    renderNav();
    const toggle = screen.getByRole("button", {name: /toggle menu/i});

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", {name: /toggle menu/i})
    ).toHaveTextContent("Close");

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", {name: /toggle menu/i})
    ).toHaveTextContent("Menu");
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
npx vitest run components/nav/Nav.test.tsx
```

Expected: FAIL — `Cannot find module './Nav'`.

- [ ] **Step 4: Implement `Nav`**

```tsx
// components/nav/Nav.tsx
"use client";

import {useState} from "react";
import {profile} from "@/lib/data/profile";
import {ThemeToggle} from "@/components/theme/ThemeToggle";

const sections = [
  {href: "#experience", label: "Experience"},
  {href: "#projects", label: "Projects"},
  {href: "#skills", label: "Skills"},
  {href: "#education", label: "Education"},
  {href: "#contact", label: "Contact"}
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
          {sections.map(s => (
            <a
              key={s.href}
              href={s.href}
              className="text-fg-muted hover:text-fg"
            >
              {s.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
        <button
          type="button"
          aria-label="Toggle menu"
          className="font-mono text-sm text-fg md:hidden"
          onClick={() => setOpen(v => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-4 font-mono text-sm md:hidden">
          {sections.map(s => (
            <a
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="text-fg-muted hover:text-fg"
            >
              {s.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
npx vitest run components/nav/Nav.test.tsx
```

Expected: PASS — 2 tests passed.

- [ ] **Step 6: Commit**

```bash
git add components/nav lib/data/profile.ts
git commit -m "feat: add responsive nav with theme toggle and mobile menu"
```

---

### Task 6: Hero section

**Files:**

- Create: `components/hero/Hero.tsx`

**Interfaces:**

- Consumes: `profile` from `lib/data/profile.ts` (Task 5)
- Produces: `<Hero />` used by Task 13's `app/page.tsx`

- [ ] **Step 1: Implement `Hero` with a photo slot**

Checks for `public/images/profile.jpg` at build time via `fs.existsSync` and renders it beside the text if present — Jitesh hasn't supplied the headshot yet, so the layout must work correctly both with and without it. To add the photo later: drop the file at `public/images/profile.jpg` and rebuild.

```tsx
// components/hero/Hero.tsx
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
```

- [ ] **Step 2: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add components/hero
git commit -m "feat: add hero section"
```

---

### Task 7: Experience section

**Files:**

- Create: `components/experience/Experience.tsx`, `lib/data/experience.ts`

**Interfaces:**

- Consumes: nothing new
- Produces: `ExperienceEntry` type and `experience: ExperienceEntry[]` from `lib/data/experience.ts`; `<Experience />` used by Task 13

- [ ] **Step 1: Add the experience data module**

```ts
// lib/data/experience.ts
export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Engineer Intern",
    company: "USJ Technologies (OPC) Private Limited",
    location: "Dehradun, India (Hybrid)",
    date: "May 2026 – Present",
    bullets: [
      "Built and shipped usjtechnologies.com, a full-stack B2B e-commerce platform (React 19, Supabase/PostgreSQL) with a 100+ SKU catalogue, PostgreSQL full-text search, and a multi-item quote-request workflow with automated email via serverless Deno edge functions.",
      "Designed a 16-table PostgreSQL schema secured with database-level Row-Level Security and 3-tier Role-Based Access Control (admin/manager/staff); identified and patched a privilege-escalation vulnerability with a BEFORE UPDATE trigger, enforcing authorization at the database layer.",
      "Architected the chalokumbh.com low-latency live-streaming pipeline (MediaMTX, HLS/WebRTC, ONVIF PTZ), broadcasting real-time temple ceremonies to YouTube and a custom app for the Kumbh Mela 2027.",
      "Drove end-to-end delivery and stakeholder onboarding for chalokumbh.com — turning requirements gathered directly from temple administrators into technical architecture and onboarding 3+ partner temples onto the platform."
    ]
  }
];
```

- [ ] **Step 2: Implement `Experience`**

```tsx
// components/experience/Experience.tsx
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
```

- [ ] **Step 3: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add components/experience lib/data/experience.ts
git commit -m "feat: add experience section"
```

---

### Task 8: TinaCMS setup, seed project content, Projects components

**Files:**

- Create: `tina/config.ts`, `content/projects/voiceflow.md`, `content/projects/reachinbox.md`, `content/projects/amebot.md`, `content/projects/travel-together.md`, `content/projects/heritage-hues.md`, `content/projects/student-performance.md`, `lib/getProjects.ts`, `lib/getProjects.test.ts`, `components/projects/ProjectCard.tsx`, `components/projects/Projects.tsx`
- Modify: `package.json` (build script, new deps)

**Interfaces:**

- Consumes: `Project` type and `splitProjects()` from Task 2
- Produces: `getProjects(): Project[]` from `lib/getProjects.ts`; `<Projects />` used by Task 13

**Manual prerequisite (not automatable in this plan):** TinaCMS's production admin UI needs a free Tina Cloud project connected to this GitHub repo, which provides `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`. Jitesh signs up at tina.io, connects the repo, and adds those two as env vars in `.env.local` (local) and in the Vercel project settings (production) — same category of manual step as the `jitesh.codes` DNS cutover. Without them, `/admin` still runs in local-only dev mode (`tinacms dev`) but won't work on the deployed site.

- [ ] **Step 1: Install TinaCMS**

```bash
npm install tinacms
npm install --save-dev @tinacms/cli
```

- [ ] **Step 2: Add the Tina schema config**

```ts
// tina/config.ts
import {defineConfig} from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "md",
        ui: {
          router: () => null
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {component: "textarea"},
            required: true
          },
          {type: "string", name: "tags", label: "Tags", list: true},
          {type: "string", name: "github", label: "GitHub URL"},
          {type: "string", name: "live", label: "Live URL"},
          {type: "image", name: "image", label: "Screenshot"},
          {
            type: "boolean",
            name: "highlighted",
            label: "Highlighted (show in Featured Projects)"
          },
          {type: "number", name: "order", label: "Sort order"}
        ]
      }
    ]
  }
});
```

- [ ] **Step 3: Seed the six project content files**

```md
<!-- content/projects/voiceflow.md -->

---

title: "VoiceFlow"
description: "Low-latency AI voice agent integrating Salesforce Agentforce for live CRM automation during voice sessions. Cut end-to-end backend latency 70% (under 2s) via Python multithreading and async WebSocket streams for concurrent audio pipelines. 1st Rank (All India), Murf AI Coding Challenge 5."
tags: ["React.js", "FastAPI", "Python", "WebSocket", "Salesforce Agentforce"]
github: "https://github.com/JITESH-KUMAR05/VoiceFlowAI"
live: ""
highlighted: true
order: 1
---
```

```md
<!-- content/projects/reachinbox.md -->

---

title: "ReachInbox"
description: "Distributed email scheduling backend processing thousands of queued jobs via BullMQ and Redis, horizontally scaled across 5 concurrent workers, with atomic rate limiting and zero data loss across restarts."
tags: ["Node.js", "TypeScript", "Express.js", "PostgreSQL", "BullMQ", "Redis"]
github: "https://github.com/JITESH-KUMAR05/EmailScheduler"
live: "https://zealous-mushroom-0aa6fa00f.1.azurestaticapps.net/"
highlighted: true
order: 2
---
```

```md
<!-- content/projects/amebot.md -->

---

title: "AmeBot"
description: "Retrieval-Augmented Generation support pipeline deployed on Azure App Service with a 3-layer hallucination-prevention system for context-grounded production responses."
tags: ["FastAPI", "Azure OpenAI", "FAISS", "RAG"]
github: "https://github.com/JITESH-KUMAR05/AmeBot"
live: "https://amenify-support-bot-faagfdfwdhbggae7.canadacentral-01.azurewebsites.net/"
highlighted: true
order: 3
---
```

```md
<!-- content/projects/travel-together.md -->

---

title: "Travel Together"
description: "AI-driven travel application offering personalized itineraries based on user preferences and travel styles, with secure authentication and an interactive admin dashboard."
tags: ["React", "Node.js", "Firebase"]
github: "https://github.com/BhanuPrakashChintal/TravelTogether"
live: ""
highlighted: false
order: 4
---
```

```md
<!-- content/projects/heritage-hues.md -->

---

title: "Heritage Hues"
description: "Cross-platform tourism app showcasing Indian heritage, built with FlutterFlow and Supabase. Aggregates geolocation-based heritage data with a searchable market module."
tags: ["FlutterFlow", "Supabase"]
github: "https://github.com/JITESH-KUMAR05/Heritage-Hues"
live: ""
highlighted: false
order: 5
---
```

```md
<!-- content/projects/student-performance.md -->

---

title: "Student Performance Prediction"
description: "Full-stack ML web app predicting student math scores (88%+ accuracy) using Flask and scikit-learn with a responsive UI. Explored Azure and AWS for containerized ML deployment."
tags: ["Flask", "scikit-learn", "Python"]
github: "https://github.com/JITESH-KUMAR05/studentperformance"
live: "https://studentperformancejk-e7czefbcg3g8axgx.centralus-01.azurewebsites.net/"
highlighted: false
order: 6
---
```

- [ ] **Step 4: Write the failing test for `getProjects`**

```ts
// lib/getProjects.test.ts
import {describe, it, expect} from "vitest";
import {getProjects} from "./getProjects";

describe("getProjects", () => {
  it("loads all seeded project files with a valid shape", () => {
    const projects = getProjects();
    expect(projects.length).toBe(6);
    for (const p of projects) {
      expect(typeof p.title).toBe("string");
      expect(typeof p.description).toBe("string");
      expect(Array.isArray(p.tags)).toBe(true);
      expect(typeof p.highlighted).toBe("boolean");
    }
  });

  it("marks exactly the three resume-headline projects as highlighted", () => {
    const projects = getProjects();
    const highlightedTitles = projects
      .filter(p => p.highlighted)
      .map(p => p.title)
      .sort();
    expect(highlightedTitles).toEqual(["AmeBot", "ReachInbox", "VoiceFlow"]);
  });
});
```

- [ ] **Step 5: Run the test to verify it fails**

```bash
npx vitest run lib/getProjects.test.ts
```

Expected: FAIL — `Cannot find module './getProjects'`.

- [ ] **Step 6: Implement `getProjects`**

```ts
// lib/getProjects.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {Project} from "./types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".md"));

  return files.map(file => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const {data} = matter(raw);

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      description: data.description,
      tags: data.tags ?? [],
      github: data.github || undefined,
      live: data.live || undefined,
      image: data.image || undefined,
      highlighted: Boolean(data.highlighted),
      order: Number(data.order ?? 0)
    };
  });
}
```

- [ ] **Step 7: Run the test to verify it passes**

```bash
npx vitest run lib/getProjects.test.ts
```

Expected: PASS — 2 tests passed.

- [ ] **Step 8: Implement `ProjectCard`**

```tsx
// components/projects/ProjectCard.tsx
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
```

- [ ] **Step 9: Implement `Projects` (Featured + More sections)**

```tsx
// components/projects/Projects.tsx
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
```

- [ ] **Step 10: Update the build script to include Tina's build step, and verify**

```json
// package.json — "scripts" field
{
  "dev": "tinacms dev -c \"next dev\"",
  "build": "tinacms build && next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest",
  "format": "prettier --write \"./**/*.{ts,tsx,json,css,md}\"",
  "check-format": "prettier -c \"./**/*.{ts,tsx,json,css,md}\""
}
```

```bash
npm run build
```

Expected: Tina build step completes (may warn about missing `NEXT_PUBLIC_TINA_CLIENT_ID`/`TINA_TOKEN` in this environment — that's expected until the manual Tina Cloud setup above is done), followed by `✓ Compiled successfully` from `next build`.

- [ ] **Step 11: Commit**

```bash
git add tina content/projects lib/getProjects.ts lib/getProjects.test.ts components/projects package.json package-lock.json
git commit -m "feat: add TinaCMS-managed projects collection and Featured/More Projects sections"
```

---

### Task 9: Skills section

**Files:**

- Create: `components/skills/Skills.tsx`, `lib/data/skills.ts`

**Interfaces:**

- Consumes: nothing new
- Produces: `SkillGroup` type and `skillGroups: SkillGroup[]` from `lib/data/skills.ts`; `<Skills />` used by Task 13

- [ ] **Step 1: Add the skills data module**

```ts
// lib/data/skills.ts
export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      "C++",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "SQL",
      "Bash/Shell"
    ]
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "REST APIs",
      "WebSocket",
      "WebRTC"
    ]
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Redis",
      "BullMQ"
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      "Microsoft Azure",
      "AWS",
      "Docker",
      "Git",
      "GitHub",
      "Linux/Unix",
      "Postman",
      "CI/CD"
    ]
  },
  {
    category: "AI / ML",
    items: [
      "Azure OpenAI",
      "Salesforce Agentforce",
      "RAG",
      "FAISS",
      "LLM Integration"
    ]
  },
  {
    category: "Core Concepts",
    items: [
      "Data Structures & Algorithms",
      "System Design",
      "Distributed Systems",
      "OOP",
      "DBMS",
      "Agile"
    ]
  }
];
```

- [ ] **Step 2: Implement `Skills`**

```tsx
// components/skills/Skills.tsx
import {skillGroups} from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">Skills</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {skillGroups.map(group => (
          <div key={group.category}>
            <h3 className="font-mono text-sm uppercase tracking-wide text-accent">
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map(item => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-sm text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add components/skills lib/data/skills.ts
git commit -m "feat: add skills section"
```

---

### Task 10: Leadership and Achievements sections

**Files:**

- Create: `components/leadership/Leadership.tsx`, `components/achievements/Achievements.tsx`, `lib/data/leadership.ts`, `lib/data/achievements.ts`

**Interfaces:**

- Consumes: nothing new
- Produces: `<Leadership />` and `<Achievements />` used by Task 13

- [ ] **Step 1: Add the leadership data module**

```ts
// lib/data/leadership.ts
export interface LeadershipEntry {
  role: string;
  org: string;
  date: string;
  bullets: string[];
}

export const leadership: LeadershipEntry[] = [
  {
    role: "Microsoft Learn Student Ambassador",
    org: "Microsoft",
    date: "Jul 2025 – Present",
    bullets: [
      "Delivered 5+ technical workshops on Microsoft Azure and GitHub Copilot, impacting 1,000+ student developers across campus programs."
    ]
  },
  {
    role: "Vice Chair",
    org: "IEEE SSIT, Anurag University Chapter",
    date: "Jan 2024 – Dec 2025",
    bullets: [
      "Led a 20+ member team to execute 30+ technical events and hackathons, drawing 500+ participants per event over two years."
    ]
  }
];
```

- [ ] **Step 2: Add the achievements data module**

```ts
// lib/data/achievements.ts
export interface Achievement {
  title: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    title: "5x Hackathon Winner",
    detail:
      "Including Murf AI Coding Challenge 5 — 1st Position, All India, against hundreds of participants."
  },
  {
    title: "LeetCode Knight",
    detail: "400+ problems solved, top 5.67% rank, peak contest rating 1857."
  },
  {
    title: "IEEE Publication",
    detail:
      'First-authored and presented "AI-Powered Voice Agent System" at the 2026 IEEE I3CTCON international conference.'
  }
];
```

- [ ] **Step 3: Implement `Leadership`**

```tsx
// components/leadership/Leadership.tsx
import {leadership} from "@/lib/data/leadership";

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">
        Leadership & Roles
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {leadership.map(entry => (
          <div key={entry.role} className="rounded-lg border border-border p-6">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-fg">
                {entry.role}
              </h3>
              <span className="font-mono text-xs text-fg-muted">
                {entry.date}
              </span>
            </div>
            <p className="font-mono text-xs text-fg-muted">{entry.org}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-fg-muted">
              {entry.bullets.map(b => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement `Achievements`**

```tsx
// components/achievements/Achievements.tsx
import {achievements} from "@/lib/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-fg">
        Achievements
      </h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {achievements.map(a => (
          <li key={a.title} className="rounded-lg border border-border p-6">
            <p className="font-display text-lg font-semibold text-fg">
              {a.title}
            </p>
            <p className="mt-2 text-sm text-fg-muted">{a.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 5: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add components/leadership components/achievements lib/data/leadership.ts lib/data/achievements.ts
git commit -m "feat: add leadership and achievements sections"
```

---

### Task 11: Education and Certifications sections, certificate assets

**Files:**

- Create: `components/education/Education.tsx`, `components/certifications/Certifications.tsx`, `lib/data/education.ts`, `lib/data/certifications.ts`, `public/certificates/*.pdf` (copied)

**Interfaces:**

- Consumes: nothing new
- Produces: `<Education />` and `<Certifications />` used by Task 13

- [ ] **Step 1: Copy certificate PDFs into `public/certificates/` with clear filenames**

```bash
mkdir -p "d:\D\WebDev\jitesh\public\certificates"
cp "D:\Backup\certificates\CCNA1AU.pdf" "d:\D\WebDev\jitesh\public\certificates\ccna-1-introduction-to-networks.pdf"
cp "D:\Backup\certificates\CCNA2AU.pdf" "d:\D\WebDev\jitesh\public\certificates\ccna-2-switching-routing-wireless.pdf"
cp "D:\Backup\certificates\CCNA3AU.pdf" "d:\D\WebDev\jitesh\public\certificates\ccna-3-enterprise-networking-security.pdf"
cp "D:\Backup\certificates\Python essential 1 cisco.pdf" "d:\D\WebDev\jitesh\public\certificates\python-essentials-1.pdf"
cp "D:\Backup\certificates\Python essential 2 cisco.pdf" "d:\D\WebDev\jitesh\public\certificates\python-essentials-2.pdf"
cp "D:\Backup\certificates\applyAICisco.pdf" "d:\D\WebDev\jitesh\public\certificates\applied-ai-cisco.pdf"
cp "D:\Backup\certificates\modernAICisco.pdf" "d:\D\WebDev\jitesh\public\certificates\modern-ai-cisco.pdf"
cp "D:\Backup\certificates\dataScienceCisco.pdf" "d:\D\WebDev\jitesh\public\certificates\data-science-cisco.pdf"
cp "D:\Backup\certificates\cloud computing.pdf" "d:\D\WebDev\jitesh\public\certificates\cloud-computing-cisco.pdf"
```

(`Id26-2485.pdf` and `software_engineer certificate.pdf` are intentionally skipped, per the design spec.)

- [ ] **Step 2: Add the education data module**

```ts
// lib/data/education.ts
export interface EducationEntry {
  school: string;
  detail: string;
  score: string;
  date: string;
}

export const education: EducationEntry[] = [
  {
    school: "Anurag University",
    detail: "Bachelor of Technology in Information Technology",
    score: "CGPA 8.70/10",
    date: "2023 – 2027"
  },
  {
    school: "Kendriya Vidyalaya Picket, Hyderabad",
    detail: "CBSE 12th Grade",
    score: "81%",
    date: "2021 – 2023"
  }
];
```

- [ ] **Step 3: Add the certifications data module**

```ts
// lib/data/certifications.ts
export interface Certification {
  title: string;
  issuer: string;
  files?: {label: string; href: string}[];
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "CCNA",
    issuer: "Cisco",
    files: [
      {
        label: "Introduction to Networks",
        href: "/certificates/ccna-1-introduction-to-networks.pdf"
      },
      {
        label: "Switching, Routing & Wireless Essentials",
        href: "/certificates/ccna-2-switching-routing-wireless.pdf"
      },
      {
        label: "Enterprise Networking, Security & Automation",
        href: "/certificates/ccna-3-enterprise-networking-security.pdf"
      }
    ]
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco",
    files: [
      {
        label: "Python Essentials 1",
        href: "/certificates/python-essentials-1.pdf"
      },
      {
        label: "Python Essentials 2",
        href: "/certificates/python-essentials-2.pdf"
      }
    ]
  },
  {title: "OCI Generative AI Professional", issuer: "Oracle"},
  {
    title: "Google AI Essentials",
    issuer: "Google / Coursera",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/WQC7KJL8DXM8"
  },
  {
    title: "Applied AI",
    issuer: "Cisco",
    files: [{label: "Certificate", href: "/certificates/applied-ai-cisco.pdf"}]
  },
  {
    title: "Modern AI Practitioner",
    issuer: "Cisco",
    files: [{label: "Certificate", href: "/certificates/modern-ai-cisco.pdf"}]
  },
  {
    title: "Data Science",
    issuer: "Cisco",
    files: [
      {label: "Certificate", href: "/certificates/data-science-cisco.pdf"}
    ]
  },
  {
    title: "Cloud Computing",
    issuer: "Cisco",
    files: [
      {label: "Certificate", href: "/certificates/cloud-computing-cisco.pdf"}
    ]
  }
];
```

- [ ] **Step 4: Implement `Education`**

```tsx
// components/education/Education.tsx
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
```

- [ ] **Step 5: Implement `Certifications`**

```tsx
// components/certifications/Certifications.tsx
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
```

- [ ] **Step 6: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 7: Commit**

```bash
git add components/education components/certifications lib/data/education.ts lib/data/certifications.ts public/certificates
git commit -m "feat: add education and certifications sections with certificate PDFs"
```

---

### Task 12: Footer/Contact section, resume PDF

**Files:**

- Create: `components/footer/Footer.tsx`, `public/resume/jitesh-resume.pdf` (copied)

**Interfaces:**

- Consumes: `profile` from `lib/data/profile.ts` (Task 5)
- Produces: `<Footer />` used by Task 13; `/resume/jitesh-resume.pdf` served as a static asset (already referenced by `profile.resumeUrl` in Hero, Task 6)

- [ ] **Step 1: Copy the resume PDF into the public folder**

```bash
mkdir -p "d:\D\WebDev\jitesh\public\resume"
cp "D:\Backup\resume\jitesh-resume.pdf" "d:\D\WebDev\jitesh\public\resume\jitesh-resume.pdf"
```

- [ ] **Step 2: Implement `Footer`**

```tsx
// components/footer/Footer.tsx
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
```

- [ ] **Step 3: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add components/footer public/resume
git commit -m "feat: add contact footer and host resume PDF on own domain"
```

---

### Task 13: Assemble the page, scroll-reveal motion, smoke test

**Files:**

- Create: `components/motion/Reveal.tsx`, `app/page.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**

- Consumes: `<Nav />` (Task 5), `<Hero />` (Task 6), `<Experience />` (Task 7), `<Projects />` (Task 8), `<Skills />` (Task 9), `<Leadership />` and `<Achievements />` (Task 10), `<Education />` and `<Certifications />` (Task 11), `<Footer />` (Task 12)
- Produces: the complete `Home` page component, default-exported from `app/page.tsx`

- [ ] **Step 1: Implement the `Reveal` scroll-in wrapper**

```tsx
// components/motion/Reveal.tsx
"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

export function Reveal({children}: {children: ReactNode}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: "-80px"}}
      transition={{duration: 0.5, ease: "easeOut"}}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Write the failing smoke test for the assembled page**

```tsx
// app/page.test.tsx
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders every major section", () => {
    render(<Home />);
    expect(screen.getAllByText("Jitesh Kumar").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {name: "Experience"})
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {name: "Featured Projects"})
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Skills"})).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {name: "Leadership & Roles"})
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {name: "Achievements"})
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {name: "Education"})
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {name: "Certifications"})
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Contact"})).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
npx vitest run app/page.test.tsx
```

Expected: FAIL — current `app/page.tsx` only renders the placeholder text, none of the expected headings exist.

- [ ] **Step 4: Assemble the full page**

```tsx
// app/page.tsx
import {Nav} from "@/components/nav/Nav";
import {Hero} from "@/components/hero/Hero";
import {Experience} from "@/components/experience/Experience";
import {Projects} from "@/components/projects/Projects";
import {Skills} from "@/components/skills/Skills";
import {Leadership} from "@/components/leadership/Leadership";
import {Achievements} from "@/components/achievements/Achievements";
import {Education} from "@/components/education/Education";
import {Certifications} from "@/components/certifications/Certifications";
import {Footer} from "@/components/footer/Footer";
import {Reveal} from "@/components/motion/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Leadership />
        </Reveal>
        <Reveal>
          <Achievements />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <Certifications />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
npx vitest run app/page.test.tsx
```

Expected: PASS — 1 test passed.

- [ ] **Step 6: Run the full test suite**

```bash
npm test
```

Expected: all test files pass (page, Nav, ThemeToggle, projects split, getProjects).

- [ ] **Step 7: Commit**

```bash
git add components/motion app/page.tsx app/page.test.tsx
git commit -m "feat: assemble full page with scroll-reveal animation"
```

---

### Task 14: Responsive audit, repo cleanup, final production build

**Files:**

- Modify: `README.md`
- Delete: `.pre-commit-config.yaml` review (keep if still generic — see step 3), `env.example` (review — see step 3)

**Interfaces:**

- Consumes: the complete site from Task 13
- Produces: final deployable state of the repo

- [ ] **Step 1: Grep for any grid/flex layout missing a responsive breakpoint variant**

```bash
grep -rn "grid-cols-[2-9]" components/ | grep -v "sm:grid-cols\|md:grid-cols\|lg:grid-cols"
```

Expected: no output. Every multi-column grid in the codebase (`Projects.tsx`, `Skills.tsx`, `Leadership.tsx`, `Achievements.tsx`, `Certifications.tsx`) sets its 2/3-column layout only at `sm:`/`lg:` and above, defaulting to a single column below that — confirm this by reading each match if any appear, and add the missing breakpoint prefix directly in that file.

- [ ] **Step 2: Manually verify in a real browser**

```bash
npm run dev
```

Open `http://localhost:3000` and resize the viewport (or use browser devtools device toolbar) at 360px, 768px, 1024px, and 1440px widths. Confirm: no horizontal scrollbar at any width, the mobile menu (Task 5) appears below `md:` and the inline nav links appear above it, project/skill/cert grids collapse to one column on phone widths, and the theme toggle switches light/dark correctly at every width. Fix any overflow or cramped spacing directly in the affected component before moving on.

- [ ] **Step 3: Rewrite `README.md`**

````markdown
# Jitesh Kumar — Portfolio

Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Content for experience, skills, education, leadership, achievements, and certifications lives in `lib/data/`; projects are managed through a TinaCMS admin at `/admin`, backed by Markdown files in `content/projects/`.

## Development

```bash
npm install
npm run dev
```
````

## Testing

```bash
npm test
```

## Deployment

Deployed on Vercel, connected to this repo's `main` branch. Domain: `jitesh.codes`.

Editing projects requires Tina Cloud env vars (`NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`) set in the Vercel project settings — see `tina/config.ts`.

```

- [ ] **Step 4: Check whether `env.example` and `.pre-commit-config.yaml` still apply, update or remove**

Read `env.example` — if it lists CRA-era vars (`REACT_APP_*`, `USE_GITHUB_DATA`, etc. from the old GitHub-fetch script), replace its contents with:

```

NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=

````

`.pre-commit-config.yaml`'s prettier hook (`files: ".*.(json|js|css)"`) doesn't match `.ts`/`.tsx`/`.md` — update the pattern:

```yaml
repos:
- repo: https://github.com/pre-commit/mirrors-prettier
  rev: "v3.0.0-alpha.4"
  hooks:
    - id: prettier
      files: "\\.(json|js|ts|tsx|css|md)$"
````

- [ ] **Step 5: Run the full test suite and production build one final time**

```bash
npm test
npm run build
```

Expected: all tests pass, build completes with `✓ Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add README.md env.example .pre-commit-config.yaml
git commit -m "chore: update docs and config for the rebuilt site"
```
