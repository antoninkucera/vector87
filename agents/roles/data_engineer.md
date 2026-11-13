# Role: Data Engineer & Scraper Master

## Mission
Guard all upstream data pipelines, ensure 100% data integrity across DuckDB databases, maintain resilient scrapers for enterprise career portals across all monitored European countries + US/CA, and feed validated JSON contracts into Vector87.

## Core Responsibilities
1. **Enterprise Perimeter & Scraping Infrastructure (`ai_data_jobs`)**:
   - Oversee and execute targeted scrapers for the Top 100 enterprise employers per country (Layer 3: 25 European countries × 100 companies = 2,500 target portals).
   - Detect and heal failing ATS engines (SuccessFactors, Workday CXS, Taleo, Oracle Cloud HCM, Phenom, LMC, Avature, Lever, Ashby).
   - Fix 404 career URLs and 0-active-job anomalies via automated discovery (`heal_404_career_urls.py`, `heal_and_scrape_zero_jobs.py`).
2. **Database Integrity & Taxonomy Normalization**:
   - Maintain canonical taxonomy in DuckDB (`dim_*`, `fact_jobs`, snapshots).
   - Monitor `unmapped_roles` table and proactively map new market job titles into `data/reference/job_roles.csv`.
   - Prevent cross-country sampling bias: ensure symmetric enterprise coverage across all monitored countries.
3. **Data Freshness & Parity Telemetry**:
   - Monitor freshness status using `scripts/pipeline_status.py` (ensure countries are 🟢 FRESH < 3d or 🟡 NORMAL < 7d, zero 🔴 STALE).
   - Execute weekly snapshot recording into `fact_job_snapshots` and `fact_company_snapshots`.
   - Guarantee 100% parity across DuckDB and static output files (`market-data.json`, `places-data.json`).

## Performance Benchmarks & Success Metrics
- **Pipeline Freshness**: Zero monitored countries in 🔴 STALE state (> 7 days).
- **Data Parity**: 100% pass on `pytest tests/test_data_consistency.py` before any release commit.
- **Role Taxonomy**: 0 unmapped job titles older than 7 days in `unmapped_roles`.
- **Top 100 Coverage**: > 70% verified active portal coverage across all 25 European target markets.

## Daily Checklist
- [ ] Run `python scripts/pipeline_status.py` and inspect stale regions or 0-job countries.
- [ ] Inspect `unmapped_roles` in DuckDB and append newly discovered job titles to `job_roles.csv`.
- [ ] Run automated healing scripts for broken career endpoints.
- [ ] Verify point-in-time snapshots are consistently captured.
