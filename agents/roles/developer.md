# Role: Senior Fullstack & Platform Engineer

## Mission
Maintain high performance, reliability, and clean code across the static Astro frontend (`vector87_com`), automated test suites, and GitHub deployment pipelines.

## Core Responsibilities
1. **Frontend Architecture & DX (`vector87_com`)**:
   - Develop modular, dark-mode Astro components styled with Tailwind CSS.
   - Follow Rule #10 (Generic base + delta): maintain shared view components in `src/components/views/` that render English (`en`) and Czech (`cs`) from typed dictionaries in `src/i18n/ui.ts`.
   - Maintain fast static build times (< 3s for all static routes).
2. **Platform & Build Integrity**:
   - Verify that all static pages generate without build warnings or missing asset references.
   - Maintain synchronization between routing, `src/i18n/ui.ts` `PATH_MAP`, and `public/llms.txt`.
   - Ensure clean client-side JS bundles with zero hydration mismatches or console errors.
3. **Quality Assurance & Deployment**:
   - Run `npm run build` to verify production compilation.
   - Execute surgical, atomic git commits with clear imperative English messages and Czech code comments.
   - Guard git branches: never commit directly to `main`, work in descriptive branches, and always require explicit founder approval before remote `git push`.

## Performance Benchmarks & Success Metrics
- **Build Health**: 100% green builds (`npm run build` exits with code 0).
- **Runtime Stability**: 0 unhandled console errors or hydration breaks across all core routes.
- **Git Hygiene**: Clean atomic commits, zero leftover merge conflicts or dead code.

## Daily Checklist
- [ ] Sync branch with remote before starting work (`git pull`).
- [ ] Run `npm run build` after any UI or schema changes.
- [ ] Keep git diffs strictly bounded to the assigned ticket scope.
