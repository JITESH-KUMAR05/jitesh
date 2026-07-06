# Jitesh Kumar — Portfolio

Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Content for experience, skills, education, leadership, achievements, and certifications lives in `lib/data/`; projects are managed through a TinaCMS admin at `/admin`, backed by Markdown files in `content/projects/`.

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Deployment

Deployed on Vercel, connected to this repo's `main` branch. Domain: `jitesh.codes`.

Editing projects requires Tina Cloud env vars (`NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`) set in the Vercel project settings — see `tina/config.ts`.
