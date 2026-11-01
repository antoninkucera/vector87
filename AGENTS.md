# AGENTS.md — Vector87.com

## Project overview
Vector87.com is a static data hub monitoring the AI/data job market (primarily S&P 500, later CZ/Europe).
Hosted on GitHub Pages (`https://github.com/antoninkucera/vector87`), fully static (SSG).

## Positioning: future tracker (agreed 2026-11-01, in progress)
Vector87 expands from "current state of data jobs" to a general **future tracker** under the same brand.
Why one brand: the name already means "direction of development", the jobs dataset becomes one input of the
country ranking (unique combination), and one person cannot sustain two sites' SEO/social/maintenance.
- **Audience**: digital professionals (data people, developers, etc.) who can work relatively location-independently
  and ask where to live long-term, whether their current quality of life still pays off, and secondarily what the
  risk of buying property abroad is.
- **Scope**: a country ranking. No specific properties, listings or towns (that is a different niche, e.g. Filip Molčan's 11houses).
- **Data**: produced in a separate repo `/Users/antonin.kucera/Projects/personal/world_stats` (agreed 2026-11-01).
  Granularity, sources, responsibilities and open decisions live in its `AGENTS.md` — read them there, do not copy them here.

## Tech stack
- Astro (static output), Tailwind CSS, Chart.js
- Data: pre-generated JSON committed into this repo

## Localization (i18n)
- Two supported locales: **English (`en`, primary/default)** at root routes (`/`, `/roles`, `/roles/[id]`, `/cloud-tech`, `/academy`, `/about`) and **Czech (`cs`)** at `/cs/*` (`/cs/`, `/cs/roles`, `/cs/roles/[id]`, `/cs/cloud-tech`, `/cs/academy`, `/cs/about`). Old `/gcp-hub` and `/cs/gcp-hub` routes redirect to the Cloud & Tech section.
- Architecture follows Rule #10 (Generic base + delta): shared view components in `src/components/views/` render both languages using typed dictionaries in `src/i18n/ui.ts` and localized `en`/`cs` fields in `src/data/market-data.json`.

## Visual identity
- Dark style by default, high contrast for charts, no visual clutter.
- Brand meaning: precise mathematical sense (vector = direction of market development), clear analytical vision; "87" signals maturity.

## Data source and responsibilities
Which repos and data feed the site, how they connect, and who owns what: `docs/architecture.md`.
Internal product backlog, planned epics and ideas: `docs/internal/roadmap.md` (gitignored).
Upstream repos (`ai_data_jobs`, `world_stats`) are not changed from this project unless explicitly agreed.

Agent access: `ai_data_jobs` is added as an additional folder of this Antigravity project (read/write),
so changes there are possible when explicitly agreed.

## Data contract & feature rules
- **Time-series trajectories**: Included in the JSON contract (`time_series.snapshots`, `time_series.monthly_inflow`). Early snapshots reflect initial scraper expansion rather than organic market growth; the exporter marks `has_mature_history` so the UI can annotate or toggle historical views cleanly as data matures over subsequent months.
- **Role analysis & synthesized job descriptions**: Each canonical role in `roles` includes a 2-paragraph executive synthesis (`synthesized_description`), separate top core/analytical skills (`top_skills`) vs. engineering/cloud/framework technologies (`top_technologies`), plus top hiring companies (`top_companies`), S&P 500 sector distribution (`top_sectors`), and representative live postings (`sample_postings`) with direct ATS application links. Each role features a dedicated subpage (`/roles/[id]` and `/cs/roles/[id]`) with SEO schema.org `Occupation` markup and dynamically matched courses/certifications from `src/data/academy.ts`. The export script merges curated/LLM-generated role narratives from `pipeline/role_descriptions.json` with deterministic fallback synthesis when a new role appears.
- **Workforce headcount & LinkedIn/Coresignal ratios**: Supported via `headcount_analytics` (sourced from `fact_headcount_snapshots` and `v_hiring_intensity` in DuckDB), tracking occupied data/AI seats vs. open job postings (`hiring_intensity_ratio_pct`).
- **Places & Relocation Opportunity Quadrant (agreed 2026-11-01)**: Evaluates countries on a 2D matrix: Composite Quality of Life / Opportunity Score (Y-axis) vs. Ease of Relocation / Legal Friction (X-axis, e.g. EU free movement vs. US/CH visa barrier) to classify destinations into Easy Wins, High Friction/High Reward, Low Barrier/Low Reward, and Avoid.


## About author section
Content is sourced from https://akucera.eu (bio, links, Substack articles).

## Git & Workflow Conventions
- **Proactive Push Prompts**: After completing any major milestone, feature block, or logical chunk of work (and committing the changes locally), always proactively ask the user for confirmation to push the commits to the remote repository (GitHub / GitLab).

