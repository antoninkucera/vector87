# AGENTS.md — Vector87.com

## Project overview
Vector87.com is a static data hub monitoring the AI/data job market (primarily S&P 500, later CZ/Europe).
Hosted on GitHub Pages (`https://github.com/antoninkucera/vector87`), fully static (SSG).

## Tech stack
- Astro (static output), Tailwind CSS, Chart.js
- Data: pre-generated JSON committed into this repo

## Localization (i18n)
- Two supported locales: **English (`en`, primary/default)** at root routes (`/`, `/roles`, `/cloud-tech`, `/academy`, `/about`) and **Czech (`cs`)** at `/cs/*` (`/cs/`, `/cs/roles`, `/cs/cloud-tech`, `/cs/academy`, `/cs/about`). Old `/gcp-hub` and `/cs/gcp-hub` routes redirect to the Cloud & Tech section.
- Architecture follows Rule #10 (Generic base + delta): shared view components in `src/components/views/` render both languages using typed dictionaries in `src/i18n/ui.ts` and localized `en`/`cs` fields in `src/data/market-data.json`.

## Visual identity
- Dark style by default, high contrast for charts, no visual clutter.
- Brand meaning: precise mathematical sense (vector = direction of market development), clear analytical vision; "87" signals maturity.

## Data source and responsibilities
The data lives in a separate project: `/Users/antonin.kucera/Projects/personal/ai_data_jobs`
(DuckDB `db/jobs.duckdb`, model described in its `docs/data-model.md` and `db/schema.sql` — read those, do not copy them here).

| What | Where | Why |
|---|---|---|
| DuckDB + scraping/transform pipeline | `ai_data_jobs` (unchanged by this project unless explicitly agreed) | that is where data is produced |
| JSON contract (JSON Schema) | `vector87_com/schema/` | the frontend defines what it expects |
| Export script DuckDB -> JSON | `vector87_com/pipeline/`, DB path from env var, DB opened read-only | contract + exporter + consumer in one place |
| Generated JSON | committed in `vector87_com/src/data/` | GitHub Pages CI cannot reach the local DuckDB |
| Agent instructions | each repo has its own `AGENTS.md`; this file references the data project docs instead of duplicating them | single source of truth |

Agent access: `ai_data_jobs` is added as an additional folder of this Antigravity project (read/write),
so changes there are possible when explicitly agreed.

## Data contract & feature rules
- **Time-series trajectories**: Included in the JSON contract (`time_series.snapshots`, `time_series.monthly_inflow`). Early snapshots reflect initial scraper expansion rather than organic market growth; the exporter marks `has_mature_history` so the UI can annotate or toggle historical views cleanly as data matures over subsequent months.
- **Role analysis & synthesized job descriptions**: Each canonical role in `roles` includes a 2-paragraph executive synthesis (`synthesized_description`), separate top core/analytical skills (`top_skills`) vs. engineering/cloud/framework technologies (`top_technologies`), plus top hiring companies (`top_companies`) and S&P 500 sector distribution (`top_sectors`). The export script merges curated/LLM-generated role narratives from `pipeline/role_descriptions.json` with deterministic fallback synthesis when a new role appears.
- **Workforce headcount & LinkedIn/Coresignal ratios**: Supported via `headcount_analytics` (sourced from `fact_headcount_snapshots` and `v_hiring_intensity` in DuckDB), tracking occupied data/AI seats vs. open job postings (`hiring_intensity_ratio_pct`).

## About author section
Content is sourced from https://akucera.eu (bio, links, Substack articles).

## Git & Workflow Conventions
- **Proactive Push Prompts**: After completing any major milestone, feature block, or logical chunk of work (and committing the changes locally), always proactively ask the user for confirmation to push the commits to the remote repository (GitHub / GitLab).

