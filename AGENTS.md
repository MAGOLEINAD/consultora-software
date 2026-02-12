# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router entrypoints, locale-aware routes under `src/app/[locale]/` (`about`, `services`, `solutions`, `contact`).
- `src/components/`: UI and feature modules grouped by domain (`home`, `services`, `solutions`, `layout`, `ui`).
- `src/messages/`: Translation content (`en.json`, `es.json`). Keep both files in sync when changing copy.
- `src/lib/`, `src/i18n/`, `src/types/`: shared helpers, i18n routing/request config, and TypeScript types.
- `public/images/`: static assets (`services/`, `case-studies/`, `logos/`).

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local development server (`http://localhost:3000/en`).
- `npm run build`: create production build and validate routes/config.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint (`eslint-config-next`) checks.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 2 spaces; prefer single-responsibility components.
- Component filenames: `PascalCase.tsx` (e.g., `ServiceHero.tsx`).
- Utility and config files: `camelCase.ts` (e.g., `metadata.ts`, `routing.ts`).
- Route folders: kebab-case for URL clarity (e.g., `data-platforms-bi`).
- Styling: Tailwind CSS v4 utility classes in JSX; keep shared design tokens in `src/app/globals.css`.

## Testing Guidelines
- No dedicated test suite is configured yet.
- Minimum quality gate for changes: `npm run lint` and `npm run build` must pass.
- If adding tests, colocate as `*.test.ts(x)` next to the feature file or in `src/__tests__/` and prioritize i18n routing, rendering, and schema utilities.

## Commit & Pull Request Guidelines
- Current history uses short, imperative summaries (for example, `Last updates`, `Codex changes`).
- Prefer clearer commit format: `<area>: <what changed>` (for example, `services: update managed services page copy`).
- Keep commits focused; avoid mixing content, styling, and infra changes.
- PRs should include: purpose, affected routes/components, screenshots for UI updates, verification steps (`npm run lint`, `npm run build`), and linked issue/task when available.

## Security & Configuration Notes
- Use `.env.local.example` as the template; never commit `.env.local`.
- Validate `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CALENDLY_URL` before release.
