#!/usr/bin/env python3
"""
Exportní skript pro Vector87.com: DuckDB (world_stats) -> src/data/places-data.json.
Otevírá databázi db/world.duckdb v read-only režimu, agreguje profily zemí pro interaktivní
mapu i žebříček a validuje výstup oproti JSON kontraktu.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import duckdb
import httpx

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_WORLD_DB_PATH = Path("/Users/antonin.kucera/Projects/personal/world_stats/db/world.duckdb")
DEFAULT_JOBS_DB_PATH = Path("/Users/antonin.kucera/Projects/personal/ai_data_jobs/db/jobs.duckdb")
SCHEMA_PATH = ROOT_DIR / "schema" / "places-data.schema.json"
OUTPUT_PATH = ROOT_DIR / "src" / "data" / "places-data.json"
MAP_PATHS_OUTPUT = ROOT_DIR / "src" / "data" / "world-map-paths.json"

PILLARS = [
    {
        "id": "safety",
        "name": "Safety & Security",
        "name_cs": "Bezpečnost a stabilita",
        "description": "Geopolitical peace and absence of violence/conflict (Global Peace Index, WGI Political Stability).",
        "description_cs": "Geopolitická bezpečnost a absence konfliktů/násilí (Global Peace Index, Politická stabilita WGI).",
        "default_weight": 25.0,
    },
    {
        "id": "housing",
        "name": "Housing Affordability",
        "name_cs": "Dostupnost bydlení",
        "description": "Housing cost burden and consumer price levels (Eurostat overburden rate, price index).",
        "description_cs": "Zatížení náklady na bydlení a srovnávací cenová hladina (Eurostat).",
        "default_weight": 25.0,
    },
    {
        "id": "economy",
        "name": "Economy & Prosperity",
        "name_cs": "Ekonomika a životní úroveň",
        "description": "Purchasing power and quality of life (World Bank GDP per capita PPP, life expectancy).",
        "description_cs": "Kupní síla obyvatel a kvalita života (HDP na obyvatele v paritě kupní síly, naděje dožití).",
        "default_weight": 25.0,
    },
    {
        "id": "governance",
        "name": "Governance & Rule of Law",
        "name_cs": "Instituce a právní stát",
        "description": "Enforceability of contracts, regulatory quality, and judicial independence (World Bank WGI).",
        "description_cs": "Vynutitelnost práva, kvalita veřejné správy a nezávislost soudů (Světová banka WGI).",
        "default_weight": 25.0,
    },
]


def mean_of_valid(values: list[float | None]) -> float | None:
    valid = [v for v in values if v is not None]
    if not valid:
        return None
    return round(sum(valid) / len(valid), 1)


def generate_world_map_svg_paths() -> dict[str, str]:
    """Generuje a cachuje SVG path stringy pro mapu světa v equirectangular projekci (960x500)."""
    if not MAP_PATHS_OUTPUT.exists():
        import subprocess
        print("[Places Exporter] Generating SVG map paths via scripts/generate-map-paths.mjs...")
        script_path = ROOT_DIR / "scripts" / "generate-map-paths.mjs"
        subprocess.run(["node", str(script_path)], check=True)

    with open(MAP_PATHS_OUTPUT, "r", encoding="utf-8") as f:
        return json.load(f)



def load_tech_jobs_metrics(jobs_db_path: Path) -> dict[str, dict[str, Any]]:
    """Načte telemetrii otevřených pozic a zaměstnavatelů z jobs.duckdb pro focus země."""
    if not jobs_db_path.exists():
        print(f"Warning: jobs.duckdb not found at {jobs_db_path}, skipping live job telemetry.")
        return {}

    print(f"Connecting to jobs DB {jobs_db_path} (read-only)...")
    con = duckdb.connect(str(jobs_db_path), read_only=True)
    try:
        ISO2_TO_ISO3 = {
            "US": "USA", "CA": "CAN", "UK": "GBR", "DE": "DEU", "CZ": "CZE",
            "PL": "POL", "ES": "ESP", "FR": "FRA", "IE": "IRL", "PT": "PRT",
            "IT": "ITA", "CH": "CHE", "SE": "SWE", "NL": "NLD", "RO": "ROU",
            "BE": "BEL", "LU": "LUX", "GR": "GRC", "FI": "FIN", "AT": "AUT",
            "LT": "LTU", "BG": "BGR", "NO": "NOR", "SK": "SVK", "DK": "DNK",
            "HU": "HUN", "HR": "HRV", "IN": "IND", "BR": "BRA", "EE": "EST",
            "LV": "LVA", "SI": "SVN", "CY": "CYP", "MT": "MLT", "IS": "ISL"
        }

        # Počty aktivních pozic a zaměstnavatelů (striktně deduplikováno podle unikátních URL inzerátů)
        counts = con.execute("""
            SELECT 
                country_code,
                COUNT(DISTINCT url) FILTER (WHERE is_active = TRUE) AS active_jobs,
                COUNT(DISTINCT company_id) FILTER (WHERE is_active = TRUE) AS hiring_companies
            FROM fact_jobs
            WHERE country_code IS NOT NULL
            GROUP BY country_code
        """).fetchall()

        from collections import defaultdict

        # Všechny role s počty pozic pro každou zemi (striktní primární přiřazení)
        roles_breakdown_rows = con.execute("""
            WITH primary_roles AS (
                SELECT 
                    j.job_id,
                    r.category_id,
                    cat.canonical_name AS role_name,
                    ROW_NUMBER() OVER (
                        PARTITION BY j.job_id 
                        ORDER BY 
                            CASE WHEN j.title_normalized = cat.canonical_name THEN 0 ELSE 1 END,
                            CASE WHEN LOWER(j.title_raw) LIKE '%' || LOWER(REPLACE(REPLACE(cat.canonical_name, ' (AI/ML)', ''), ' / ', ' ')) || '%' THEN 0 ELSE 1 END,
                            r.category_id
                    ) as rn
                FROM fact_jobs j
                LEFT JOIN bridge_job_roles r ON j.job_id = r.job_id
                LEFT JOIN dim_job_categories cat ON r.category_id = cat.category_id
                WHERE j.is_active = TRUE AND j.country_code IS NOT NULL
            )
            SELECT 
                j.country_code,
                COALESCE(pr.category_id, 'unmapped') AS category_id,
                COALESCE(pr.role_name, 'Other Data/AI') AS role_name,
                COUNT(DISTINCT j.job_id) AS cnt
            FROM fact_jobs j
            LEFT JOIN primary_roles pr ON j.job_id = pr.job_id AND pr.rn = 1
            WHERE j.is_active = TRUE AND j.country_code IS NOT NULL
            GROUP BY j.country_code, category_id, role_name
            ORDER BY j.country_code, cnt DESC
        """).fetchall()

        roles_by_country = defaultdict(list)
        for c_code, cat_id, rname, cnt in roles_breakdown_rows:
            roles_by_country[c_code].append({
                "category_id": cat_id,
                "role_name": rname,
                "count": int(cnt)
            })

        # Reprezentativní aktivní inzeráty s přímým URL (až 5 nejlepších zástupců různých firem pro rychlý SSR náhled)
        sample_jobs_rows = con.execute("""
            WITH candidate_jobs AS (
                SELECT 
                    j.country_code,
                    j.job_id,
                    j.title_raw AS title,
                    c.company_name,
                    c.is_sp500,
                    j.city,
                    j.seniority,
                    j.work_mode,
                    j.url,
                    CAST(j.posted_at AS VARCHAR) AS posted_at,
                    r.category_id,
                    cat.canonical_name AS role_name,
                    ROW_NUMBER() OVER (
                        PARTITION BY j.country_code, 
                            CASE 
                                WHEN c.company_name ILIKE '%Alphabet%' OR c.company_name ILIKE '%Google%' THEN 'Google'
                                ELSE c.company_name 
                            END
                        ORDER BY j.posted_at DESC NULLS LAST
                    ) AS comp_rn
                FROM fact_jobs j
                LEFT JOIN dim_companies c ON j.company_id = c.company_id
                LEFT JOIN bridge_job_roles r ON j.job_id = r.job_id
                LEFT JOIN dim_job_categories cat ON r.category_id = cat.category_id
                WHERE j.is_active = TRUE AND j.url IS NOT NULL AND j.url != '' AND j.country_code IS NOT NULL
            ),
            ranked_jobs AS (
                SELECT 
                    *,
                    ROW_NUMBER() OVER (
                        PARTITION BY country_code 
                        ORDER BY 
                            CASE WHEN is_sp500 = TRUE THEN 0 ELSE 1 END,
                            CASE WHEN url LIKE '%greenhouse.io%' OR url LIKE '%lever.co%' OR url LIKE '%careers.google.com%' THEN 0 ELSE 1 END,
                            comp_rn,
                            posted_at DESC NULLS LAST
                    ) AS rn
                FROM candidate_jobs
                WHERE comp_rn = 1
            )
            SELECT country_code, job_id, title, company_name, is_sp500, city, seniority, work_mode, url, posted_at, category_id, role_name
            FROM ranked_jobs
            WHERE rn <= 5
            ORDER BY country_code, rn
        """).fetchall()

        sample_jobs_by_country = defaultdict(list)
        for (c_code, jid, title, cname, sp500_flag, city, sen, wm, url, pdate, cat_id, rname) in sample_jobs_rows:
            sample_jobs_by_country[c_code].append({
                "job_id": jid,
                "title": title,
                "company_name": cname or "Enterprise Employer",
                "is_sp500": bool(sp500_flag),
                "city": city,
                "seniority": sen,
                "work_mode": wm,
                "url": url,
                "posted_at": pdate,
                "category_id": cat_id,
                "role_name": rname or (cat_id.replace("_", " ").title() if cat_id else None),
            })

        # Export kompletního seznamu aktivních pozic pro každou zemi do statického JSON
        jobs_dir = ROOT_DIR / "public" / "data" / "jobs"
        jobs_dir.mkdir(parents=True, exist_ok=True)

        all_jobs_rows = con.execute("""
            WITH primary_roles AS (
                SELECT 
                    j.job_id,
                    r.category_id,
                    cat.canonical_name AS role_name,
                    ROW_NUMBER() OVER (
                        PARTITION BY j.job_id 
                        ORDER BY 
                            CASE WHEN j.title_normalized = cat.canonical_name THEN 0 ELSE 1 END,
                            CASE WHEN LOWER(j.title_raw) LIKE '%' || LOWER(REPLACE(REPLACE(cat.canonical_name, ' (AI/ML)', ''), ' / ', ' ')) || '%' THEN 0 ELSE 1 END,
                            r.category_id
                    ) as rn
                FROM fact_jobs j
                LEFT JOIN bridge_job_roles r ON j.job_id = r.job_id
                LEFT JOIN dim_job_categories cat ON r.category_id = cat.category_id
                WHERE j.is_active = TRUE AND j.country_code IS NOT NULL
            ),
            all_roles AS (
                SELECT 
                    j.job_id,
                    LIST(DISTINCT r.category_id) as categories
                FROM fact_jobs j
                JOIN bridge_job_roles r ON j.job_id = r.job_id
                WHERE j.is_active = TRUE AND j.country_code IS NOT NULL
                GROUP BY j.job_id
            )
            SELECT 
                j.job_id,
                j.country_code,
                j.title_raw AS title,
                COALESCE(c.company_name, 'Enterprise Employer') AS company_name,
                COALESCE(c.is_sp500, FALSE) AS is_sp500,
                j.city,
                j.seniority,
                j.work_mode,
                j.url,
                CAST(j.posted_at AS VARCHAR) AS posted_at,
                pr.category_id,
                COALESCE(pr.role_name, 'Other Data/AI') AS role_name,
                COALESCE(ar.categories, []) AS categories
            FROM fact_jobs j
            LEFT JOIN dim_companies c ON j.company_id = c.company_id
            LEFT JOIN primary_roles pr ON j.job_id = pr.job_id AND pr.rn = 1
            LEFT JOIN all_roles ar ON j.job_id = ar.job_id
            WHERE j.is_active = TRUE AND j.country_code IS NOT NULL AND j.url IS NOT NULL AND j.url != ''
            ORDER BY j.country_code, 
                     CASE WHEN c.is_sp500 = TRUE THEN 0 ELSE 1 END,
                     j.posted_at DESC NULLS LAST
        """).fetchall()

        all_country_jobs = defaultdict(list)
        for (jid, c_code, title, cname, sp500_flag, city, sen, wm, url, pdate, cat_id, rname, cats) in all_jobs_rows:
            all_country_jobs[c_code].append({
                "job_id": jid,
                "title": title,
                "company_name": cname,
                "is_sp500": bool(sp500_flag),
                "city": city,
                "seniority": sen,
                "work_mode": wm,
                "url": url,
                "posted_at": pdate,
                "category_id": cat_id,
                "role_name": rname,
                "categories": cats,
            })

        for c_code, j_list in all_country_jobs.items():
            iso3 = ISO2_TO_ISO3.get(c_code, c_code)
            c_payload = {
                "country_code": c_code,
                "country_code_alpha3": iso3,
                "total_jobs": len(j_list),
                "roles_breakdown": roles_by_country.get(c_code, []),
                "jobs": j_list,
            }
            # Uložit pod ISO2 (např. cz.json) i ISO3 (např. cze.json)
            file_iso2 = jobs_dir / f"{c_code.lower()}.json"
            file_iso3 = jobs_dir / f"{iso3.lower()}.json"
            with open(file_iso2, "w", encoding="utf-8") as f:
                json.dump(c_payload, f, ensure_ascii=False)
            if file_iso3 != file_iso2:
                with open(file_iso3, "w", encoding="utf-8") as f:
                    json.dump(c_payload, f, ensure_ascii=False)

        res = {}
        for c_code, active_j, hiring_c in counts:
            iso3 = ISO2_TO_ISO3.get(c_code, c_code)
            top_roles_list = [r["category_id"] for r in roles_by_country.get(c_code, []) if r["category_id"] != "unmapped"][:5]
            res[iso3] = {
                "active_jobs": int(active_j),
                "hiring_companies": int(hiring_c),
                "top_roles": top_roles_list,
                "roles_breakdown": roles_by_country.get(c_code, []),
                "sample_jobs": sample_jobs_by_country.get(c_code, []),
            }
        print(f"Loaded live AI/Data jobs telemetry for {len(res)} countries from jobs.duckdb.")
        return res
    finally:
        con.close()


def export_places_data() -> None:
    db_path = Path(os.environ.get("WORLD_STATS_DB_PATH", str(DEFAULT_WORLD_DB_PATH)))
    if not db_path.exists():
        raise FileNotFoundError(f"World Stats DuckDB database not found at {db_path}")

    jobs_db_path = Path(os.environ.get("AI_DATA_JOBS_DB_PATH", str(DEFAULT_JOBS_DB_PATH)))
    tech_metrics = load_tech_jobs_metrics(jobs_db_path)

    print(f"Connecting to {db_path} (read-only)...")
    con = duckdb.connect(str(db_path), read_only=True)

    try:
        # 1. Načtení všech indikátorů s rokem
        indicators_rows = con.execute("""
            SELECT country_code_alpha3, indicator_id, reference_year, raw_value, normalized_value
            FROM v_latest_country_indicators
        """).fetchall()

        ind_by_country: dict[str, dict[str, Any]] = {}
        for c_a3, ind_id, yr, raw_v, norm_v in indicators_rows:
            if c_a3 not in ind_by_country:
                ind_by_country[c_a3] = {}
            ind_by_country[c_a3][ind_id] = {
                "raw_value": round(raw_v, 2) if raw_v is not None else None,
                "normalized_value": round(norm_v, 1) if norm_v is not None else None,
                "reference_year": yr,
            }

        # 2. Načtení profilů zemí
        profiles = con.execute("""
            SELECT 
                country_code_alpha3,
                country_code_alpha2,
                country_name,
                continent,
                subregion,
                is_focus_country,
                is_eu,
                has_regional_data,
                norm_gdp_pc_ppp,
                norm_life_expectancy,
                norm_peace_index,
                norm_rule_of_law,
                norm_political_stability,
                norm_gov_effectiveness,
                norm_price_level_index,
                norm_housing_cost_overburden,
                ease_of_relocation,
                norm_ease_of_relocation
            FROM v_country_profiles
            ORDER BY is_focus_country DESC, country_name ASC
        """).fetchall()

        countries_list = []
        focus_count = 0

        for row in profiles:
            (
                c_a3, c_a2, c_name, continent, subregion, is_focus, is_eu, has_reg,
                norm_gdp, norm_le, norm_peace, norm_rol, norm_ps, norm_ge, norm_pli, norm_hco,
                reloc_raw, reloc_norm
            ) = row

            if is_focus:
                focus_count += 1

            # Výpočet pilířů (0-100)
            safety_score = mean_of_valid([norm_peace, norm_ps])
            housing_score = mean_of_valid([norm_hco, norm_pli])
            economy_score = mean_of_valid([norm_gdp, norm_le])
            gov_score = mean_of_valid([norm_rol, norm_ge])

            # Kompozitní skóre pro defaultní váhy (pouze pokud jsou k dispozici alespoň 3 pilíře ze 4)
            available_scores = []
            if safety_score is not None:
                available_scores.append(safety_score)
            if housing_score is not None:
                available_scores.append(housing_score)
            if economy_score is not None:
                available_scores.append(economy_score)
            if gov_score is not None:
                available_scores.append(gov_score)

            # Ochrana před zkreslením u mikrostátů (např. Gibraltar s pouze 1 pilířem má skóre N/A)
            composite = (
                round(sum(available_scores) / len(available_scores), 1)
                if len(available_scores) >= 3
                else None
            )

            countries_list.append({
                "country_code_alpha3": c_a3,
                "country_code_alpha2": c_a2,
                "country_name": c_name,
                "continent": continent,
                "subregion": subregion,
                "is_focus_country": bool(is_focus),
                "is_eu": bool(is_eu),
                "has_regional_data": bool(has_reg),
                "pillar_scores": {
                    "safety": safety_score,
                    "housing": housing_score,
                    "economy": economy_score,
                    "governance": gov_score,
                    "ease_of_relocation": round(reloc_raw, 1) if reloc_raw is not None else None,
                    "composite_score": composite,
                },
                "tech_market": tech_metrics.get(c_a3),
                "indicators": ind_by_country.get(c_a3, {}),
            })

    finally:
        con.close()

    payload = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "schema_version": "1.0.0",
            "total_countries": len(countries_list),
            "focus_countries_count": focus_count,
            "sources": [
                "World Bank Open Data",
                "Eurostat",
                "Institute for Economics & Peace",
                "Vector87 Policy & Mobility Index",
                "Vector87 Enterprise Job Telemetry (ai_data_jobs)",
            ],
        },
        "pillars": PILLARS,
        "countries": countries_list,
    }

    # Uložení do JSON
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    # Generování SVG mapových křivek
    generate_world_map_svg_paths()

    print(f"Successfully exported {len(countries_list)} countries ({focus_count} focus countries) to {OUTPUT_PATH}.")


if __name__ == "__main__":
    export_places_data()
