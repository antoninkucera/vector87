# Vector87.com — Data & AI Job Market Telemetry Hub

Vector87.com is a high-speed static intelligence hub monitoring the global AI, ML, and Data job market across S&P 500 corporations, North America, and Europe.

## Architecture & Data Flow

1. **Data Warehouse (`ai_data_jobs`)**: Scrapers and transformation pipelines populate a local DuckDB database (`db/jobs.duckdb`).
2. **Contract (`schema/market-data.schema.json`)**: JSON Schema defining the exact payload expected by the static frontend.
3. **Exporter (`pipeline/export_market_data.py`)**: Connects to DuckDB in `read_only=True` mode, computes all aggregations, merges synthesized role descriptions from `pipeline/role_descriptions.json`, validates against `schema/market-data.schema.json`, and writes `src/data/market-data.json`.
4. **Static Frontend (`src/`)**: Astro + Tailwind CSS + Chart.js static site generator producing zero-backend HTML/CSS/JS bundles for GitHub Pages.

## Key Modules

- **`/` (Market Dashboard)**:
  1. Market Vitality (S&P 500 AI/Data hiring intensity vs. total open job pool)
  2. Tech & Cloud Stack (AWS, GCP, Azure, Snowflake, Databricks, skill co-occurrence)
  3. Industry Heatmap (S&P 500 GICS sectors × Seniority distribution)
  4. Hierarchy Shift (Hands-on IC vs. Management ratios + LinkedIn/Coresignal headcount ratio pilot)
  5. Trend Radar (Adoption of LLM, Agentic AI, GenAI, RAG, Evals, Semantic Layer, Vertex AI, Dataform)
- **`/roles` (Role Analysis)**: 21 canonical roles with 2-paragraph synthesized job descriptions, core skills, technology stack, top hiring companies, and S&P 500 sector breakdown.
- **`/gcp-hub` (Google Cloud Hub)**: Dedicated telemetry for BigQuery, Vertex AI, Looker, Dataflow, and Dataform, paired with architectural notes.
- **`/academy` (Education Academy)**: Curated learning tracks and foundational literature mapped to market demand.
- **`/about` (About Author)**: Author bio, Vector87 philosophy, and links to [akucera.eu](https://akucera.eu).

## Commands

```bash
# 1. Export fresh data from local DuckDB into src/data/market-data.json
npm run export:data
# Or with custom DuckDB path:
VECTOR87_DB_PATH=/path/to/jobs.duckdb npm run export:data

# 2. Start local development server
npm run dev

# 3. Build static production bundle into dist/
npm run build

# 4. Preview production build locally
npm run preview
```
