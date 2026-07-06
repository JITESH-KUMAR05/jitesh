# Portfolio Rebuild — Design Spec

Date: 2026-07-06

## Problem

Current site (`iamjitesh.me`) is a well-known open-source React portfolio template ("Personal-Portfolio" style: CRA + `react-easy-emoji` + lottie splash screen + `fetch.js` GitHub-API build hack + gh-pages deploy). It is immediately recognizable to recruiters as a template, and its content is stale — it markets Jitesh as an "aspiring AI/ML engineer" still learning ML basics, while his resume shows he's now a Full-Stack/Backend Software Development Engineer Intern with distributed-systems, database-security, and applied-AI (RAG/LLM) work, 5x hackathon wins, an IEEE publication, and LeetCode Knight ranking.

Goal: full rebuild — custom-coded, professional, recruiter-facing, fully responsive, content aligned to the current resume, no template fingerprints.

## Content source of truth

Resume (`D:\Backup\resume\jitesh-resume.pdf`) is authoritative over the existing `portfolio.js`. Cross-referenced against `github.com/JITESH-KUMAR05` repos to resolve actual project/live links (resume PDF text lost hyperlink URLs on extraction):

- **VoiceFlow** (resume: "Low-Latency AI Voice Agent") → repo `VoiceFlowAI` (pushed 2026-01-27, most recent of the two VoiceFlow-named repos).
- **ReachInbox** (resume: "Distributed Email Scheduling System") → repo `EmailScheduler` (live: `https://zealous-mushroom-0aa6fa00f.1.azurestaticapps.net/`).
- **AmeBot** → repo `AmeBot` (live: `https://amenify-support-bot-faagfdfwdhbggae7.canadacentral-01.azurewebsites.net/`).
- **Travel Together** → `github.com/BhanuPrakashChintal/TravelTogether` (freelance collab, per existing portfolio.js).
- **Heritage Hues** → `github.com/JITESH-KUMAR05/Heritage-Hues`.
- **Student Performance Prediction** → `github.com/JITESH-KUMAR05/studentperformance`.
- Resume placeholder "onboarding [X]+ partner temples" → confirmed as **3**.
- Contact email: `jiteshtechwork@gmail.com` (resume), not the old `jitesh.kumar05official@gmail.com`.
- LeetCode: `https://leetcode.com/u/jitesh_kumar05`.
- Domain: `jitesh.codes` (matches resume header). DNS cutover is a manual step for Jitesh once the site is deployed — not part of this build.
- Phone number: **not** shown publicly on the site (resume PDF still has it for anyone who downloads it).
- Positioning: **Full-Stack / Backend Software Engineer** (AI/RAG work shown as applied skill, not the headline).
- Certificates sourced from `D:\Backup\certificates`. Site's Certifications section covers all of them except two skipped files (`Id26-2485.pdf`, `software_engineer certificate.pdf`):
  - Cisco CCNA — 3 parts (`CCNA1AU.pdf`, `CCNA2AU.pdf`, `CCNA3AU.pdf`)
  - Cisco Python Essentials 1 & 2 (`Python essential 1 cisco.pdf`, `Python essential 2 cisco.pdf`)
  - OCI Generative AI Professional
  - Google AI Essentials
  - Cisco: Applied AI (`applyAICisco.pdf`), Modern AI (`modernAICisco.pdf`), Data Science (`dataScienceCisco.pdf`), Cloud Computing (`cloud computing.pdf`) — extra certs beyond the resume's list, included for added credibility
  - PDFs copied into the repo (e.g. `public/certificates/`) and each cert entry links to its own file.

## Stack & architecture

- **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.
- Single scrolling one-page site with anchor-linked sections (matches how recruiters actually skim a portfolio) — no multi-route navigation.
- Non-project resume content (experience, skills, education, leadership, achievements, certifications) lives in one typed data module, `lib/data.ts` (or split by section under `lib/data/` if it grows large). No runtime GitHub API fetch, no build-time `fetch.js` hack. Projects are the one content type that changes often after launch, so they live in a TinaCMS-managed collection instead (see below).
- Theme: `next-themes` — light/dark toggle, defaults to OS preference, persists user choice in localStorage.
- **CMS: TinaCMS**, git-backed. Admin UI at `/admin` lets Jitesh add/edit project entries (title, description, tech tags, GitHub/live links, screenshot) and toggle a `highlighted` boolean per project. Edits save as commits to the repo; Vercel auto-redeploys. No database, no separate auth backend to run/maintain. The "Featured Projects" and "More Projects" sections both render from the same project collection, split by the `highlighted` flag, instead of being hardcoded separately.
- Animation: Framer Motion, used only for restrained scroll-reveal/hover transitions. No splash screen, no lottie.
- The current CRA app (`src/App.js`, `src/portfolio.js`, all `*.scss`, `react-easy-emoji`, `lottie-react`, `fetch.js`, `gh-pages` deploy script) is removed entirely and replaced. Same repo, same git history.
- **Fully responsive**: mobile-first Tailwind breakpoints across every section — hero, nav, project/skill grids, experience/achievement blocks all reflow cleanly from small phone widths up through wide desktop. Verified by resizing, not assumed.

## Page structure (in order)

1. **Hero** — name, "Full-Stack / Backend Software Engineer" positioning line, short tagline, icon links (GitHub, LinkedIn, LeetCode, email), resume download button (PDF hosted in repo, served from own domain).
2. **Experience** — USJ Technologies (OPC) Pvt Ltd, SDE Intern, May 2026–Present. Bullets: usjtechnologies.com B2B e-commerce platform; 16-table Postgres schema + RLS + RBAC + privilege-escalation fix; chalokumbh.com live-streaming pipeline; stakeholder onboarding, 3 partner temples.
3. **Featured Projects** — projects from the TinaCMS collection where `highlighted: true`. Seeded with VoiceFlow, ReachInbox, AmeBot. Each: description, tech tags, GitHub link, live link where available.
4. **More Projects** — remaining projects (`highlighted: false`) in a smaller secondary grid. Seeded with Travel Together, Heritage Hues, Student Performance Prediction. New projects Jitesh adds via `/admin` default here unless marked highlighted.
5. **Skills** — grouped chip lists: Languages / Frontend / Backend / Cloud & DevOps / AI-ML / Core Concepts. No fabricated proficiency percentages.
6. **Leadership & Roles** — Microsoft Learn Student Ambassador; IEEE SSIT Anurag University Chapter Vice Chair.
7. **Achievements** — 5x hackathon winner (incl. Murf AI Coding Challenge 5, 1st All India); LeetCode Knight, 400+ problems, top 5.67%, peak rating 1857; IEEE I3CTCON 2026 publication ("AI-Powered Voice Agent System"). Presented as a clean text/stat list, not clipart achievement cards.
8. **Education** — Anurag University (B.Tech IT, CGPA 8.70/10, 2023–2027); Kendriya Vidyalaya Picket (CBSE 12th, 81%).
9. **Certifications** — Cisco CCNA (3 courses), Cisco Python Essentials 1 & 2, OCI Generative AI Professional, Google AI Essentials, Cisco Applied AI, Cisco Modern AI, Cisco Data Science, Cisco Cloud Computing. Each links to its PDF.
10. **Footer / Contact** — email, GitHub, LinkedIn, LeetCode icons, resume download repeat. No contact form, no phone number.

## Visual design

- Both **light and dark mode**, same layout skeleton, toggle in nav.
- **Light** = minimal/editorial: generous whitespace, strong typographic hierarchy, single restrained accent color, content-first.
- **Dark** = technical/terminal-inspired: monospace section labels/tags, subtle code-like accent details, still calm (not neon/hacker-cliché).
- Distinctive type pairing, self-hosted variable fonts — not default-Inter-everywhere. A display/heading face + a monospace face for labels, tags, and section markers (works in both themes).
- Photo: layout built to accept a headshot; Jitesh supplies the file when we implement.

## Out of scope

- Working contact form (chose mailto/links only).
- GitHub stats/activity widgets or any runtime GitHub API calls.
- Multi-page routing — this is a single scrolling page.
- CMS for anything beyond projects (experience/skills/education stay code-edited, not admin-editable).
