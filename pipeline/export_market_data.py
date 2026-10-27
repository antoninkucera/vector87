#!/usr/bin/env python3
"""
Exportní skript pro Vector87.com (DuckDB -> src/data/market-data.json).
Otevírá lokální databázi v read-only režimu, provádí agregace pro všechny moduly
(Market Dashboard, Analýza rolí, Google Cloud Hub, Time-series, Headcount)
a validuje výstup oproti JSON kontraktu.
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import duckdb

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DB_PATH = Path("/Users/antonin.kucera/Projects/personal/ai_data_jobs/db/jobs.duckdb")
SCHEMA_PATH = ROOT_DIR / "schema" / "market-data.schema.json"
ROLE_DESC_PATH = ROOT_DIR / "pipeline" / "role_descriptions.json"
OUTPUT_PATH = ROOT_DIR / "src" / "data" / "market-data.json"
LLMS_TXT_PATH = ROOT_DIR / "public" / "llms.txt"
LLMS_FULL_TXT_PATH = ROOT_DIR / "public" / "llms-full.txt"

# Rozdělení skillů pro detail role: koncepční/jádrové dovednosti vs. konkrétní nástroje a platformy
SKILL_CATEGORIES = {"Programming", "AI/ML", "Business"}
TECH_CATEGORIES = {"Cloud", "Framework", "Database", "MLOps"}

HYPERSCALER_IDS = ("aws", "gcp", "azure")
DATA_PLATFORM_IDS = ("snowflake_db", "databricks", "bigquery", "redshift", "ms_fabric", "duckdb")
TREND_RADAR_IDS = (
    "llm",
    "ai_agents",
    "genai",
    "evals_observability",
    "rag",
    "fine_tuning",
    "vector_db",
    "vertex_ai",
    "semantic_layer",
    "dataflow",
    "dataform",
)
GCP_ECOSYSTEM_IDS = ("gcp", "bigquery", "vertex_ai", "looker", "dataflow", "dataform")
SENIORITY_ORDER = [
    "Junior / Entry",
    "Mid",
    "Senior",
    "Staff / Principal",
    "Lead / Manager",
    "Executive",
]


def classify_signal_stage(penetration_pct: float) -> str:
    """Určí fázi adopce klíčového slova v Trend Radaru podle penetrace v inzerátech."""
    if penetration_pct >= 12.0:
        return "Dominant"
    if penetration_pct >= 4.0:
        return "Scaling"
    if penetration_pct >= 0.8:
        return "Emerging"
    return "Niche Signal"


def load_role_descriptions() -> dict[str, dict[str, list[str]]]:
    if ROLE_DESC_PATH.exists():
        return json.loads(ROLE_DESC_PATH.read_text(encoding="utf-8"))
    return {}


def build_fallback_description(
    canonical_name: str,
    domain: str,
    job_count: int,
    top_skills: list[dict[str, Any]],
    top_tech: list[dict[str, Any]],
) -> dict[str, list[str]]:
    skill_names_en = ", ".join(s["skill_name"] for s in top_skills[:3]) or "SQL and Python"
    tech_names_en = ", ".join(t["skill_name"] for t in top_tech[:3]) or "modern cloud platforms"
    skill_names_cs = ", ".join(s["skill_name"] for s in top_skills[:3]) or "SQL a Python"
    tech_names_cs = ", ".join(t["skill_name"] for t in top_tech[:3]) or "moderní cloudové platformy"
    return {
        "en": [
            f"The {canonical_name} role sits within the {domain} domain and currently accounts for {job_count} active job postings. It focuses on designing, building, and scaling data or AI capabilities with direct impact on product and enterprise decision-making.",
            f"Core competency requirements center on {skill_names_en}, while the underlying technology stack is anchored by {tech_names_en}.",
        ],
        "cs": [
            f"Pozice {canonical_name} spadá do domény {domain} a v aktuálním vzorku pokrývá {job_count} aktivních inzerátů. Role se zaměřuje na návrh, realizaci a rozvoj datových či AI řešení s přímým dopadem na produkt a firemní rozhodování.",
            f"Mezi nejčastěji vyžadované odborné dovednosti patří {skill_names_cs}, zatímco technologickému stacku dominují nástroje jako {tech_names_cs}.",
        ],
    }


def export_market_data(db_path: Path | None = None, output_path: Path | None = None) -> dict[str, Any]:
    resolved_db = Path(os.environ.get("VECTOR87_DB_PATH", str(db_path or DEFAULT_DB_PATH)))
    resolved_out = output_path or OUTPUT_PATH

    if not resolved_db.exists():
        raise FileNotFoundError(f"DuckDB database not found at: {resolved_db}")

    con = duckdb.connect(str(resolved_db), read_only=True)
    role_narratives = load_role_descriptions()

    try:
        # 0. Meta
        total_jobs = int(con.execute("SELECT COUNT(*) FROM fact_jobs WHERE is_active = TRUE").fetchone()[0])
        total_companies = int(con.execute("SELECT COUNT(*) FROM dim_companies").fetchone()[0])
        sp500_companies = int(con.execute("SELECT COUNT(*) FROM dim_companies WHERE is_sp500 = TRUE").fetchone()[0])
        latest_snap_row = con.execute("SELECT MAX(snapshot_date) FROM fact_job_snapshots").fetchone()
        latest_snapshot_date = str(latest_snap_row[0]) if latest_snap_row and latest_snap_row[0] else datetime.now(timezone.utc).strftime("%Y-%m-%d")

        meta = {
            "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "schema_version": "1.0.0",
            "latest_snapshot_date": latest_snapshot_date,
            "total_tracked_companies": total_companies,
            "sp500_tracked_companies": sp500_companies,
        }

        # 1. Market Vitality
        total_pool = int(
            con.execute("SELECT COALESCE(SUM(total_active_jobs), 0) FROM dim_companies WHERE total_active_jobs IS NOT NULL").fetchone()[0]
        )
        sp500_pool = int(
            con.execute(
                "SELECT COALESCE(SUM(total_active_jobs), 0) FROM dim_companies WHERE is_sp500 = TRUE AND total_active_jobs IS NOT NULL"
            ).fetchone()[0]
        )
        sp500_ai_jobs = int(
            con.execute(
                """
                SELECT COUNT(j.job_id)
                FROM fact_jobs j
                JOIN dim_companies c ON j.company_id = c.company_id
                WHERE j.is_active = TRUE AND c.is_sp500 = TRUE
                """
            ).fetchone()[0]
        )
        sp500_hiring = int(
            con.execute(
                """
                SELECT COUNT(DISTINCT c.company_id)
                FROM dim_companies c
                JOIN fact_jobs j ON c.company_id = j.company_id
                WHERE j.is_active = TRUE AND c.is_sp500 = TRUE
                """
            ).fetchone()[0]
        )
        cz_jobs = int(con.execute("SELECT COUNT(*) FROM fact_jobs WHERE is_active = TRUE AND country_code = 'CZ'").fetchone()[0])
        us_ca_jobs = int(
            con.execute("SELECT COUNT(*) FROM fact_jobs WHERE is_active = TRUE AND country_code IN ('US', 'CA')").fetchone()[0]
        )
        eu_uk_ch_jobs = total_jobs - us_ca_jobs

        top_comp_rows = con.execute(
            """
            SELECT
                CASE 
                    WHEN c.company_id IN ('alphabet', 'alphabet_class_a', 'alphabet_class_c', 'google') THEN 'alphabet'
                    ELSE c.company_id 
                END AS comp_id,
                CASE 
                    WHEN c.company_id IN ('alphabet', 'alphabet_class_a', 'alphabet_class_c', 'google') THEN 'Google (Alphabet)'
                    ELSE c.company_name 
                END AS comp_name,
                MAX(COALESCE(c.is_sp500, FALSE)) AS is_sp500,
                MAX(c.sp500_sector) AS sector,
                COUNT(DISTINCT j.url) AS ai_jobs,
                MAX(COALESCE(c.total_active_jobs, 0)) AS total_pool,
                ROUND(100.0 * COUNT(DISTINCT j.url) / NULLIF(MAX(c.total_active_jobs), 0), 2) AS intensity_pct
            FROM fact_jobs j
            JOIN dim_companies c ON j.company_id = c.company_id
            WHERE j.is_active = TRUE
            GROUP BY 1, 2
            ORDER BY ai_jobs DESC
            LIMIT 15
            """
        ).fetchall()

        top_hiring_companies = [
            {
                "company_id": r[0],
                "company_name": r[1],
                "is_sp500": bool(r[2]),
                "sector": r[3],
                "ai_data_jobs": int(r[4]),
                "total_active_jobs": int(r[5]),
                "ai_intensity_pct": float(r[6]) if r[6] is not None else 0.0,
            }
            for r in top_comp_rows
        ]

        sp500_distinct_jobs = int(
            con.execute(
                """
                SELECT COUNT(DISTINCT j.url)
                FROM fact_jobs j
                JOIN dim_companies c ON j.company_id = c.company_id
                WHERE j.is_active = TRUE AND c.is_sp500 = TRUE
                """
            ).fetchone()[0]
        )

        reg_rows = con.execute(
            """
            SELECT
                j.country_code,
                COALESCE(d.country_name, j.country_code) AS country_name,
                COALESCE(d.region, 'Other') AS region,
                COUNT(DISTINCT j.url) AS cnt,
                ROUND(100.0 * COUNT(DISTINCT j.url) / NULLIF(?, 0), 2) AS share_pct
            FROM fact_jobs j
            JOIN dim_companies c ON j.company_id = c.company_id
            LEFT JOIN dim_countries d ON j.country_code = d.country_code
            WHERE j.is_active = TRUE AND j.country_code IS NOT NULL AND c.is_sp500 = TRUE
            GROUP BY 1, 2, 3
            ORDER BY cnt DESC
            LIMIT 12
            """,
            [sp500_distinct_jobs],
        ).fetchall()

        regional_breakdown = [
            {
                "country_code": r[0],
                "country_name": r[1],
                "region": r[2],
                "job_count": int(r[3]),
                "share_pct": float(r[4] or 0.0),
            }
            for r in reg_rows
        ]

        market_vitality = {
            "total_ai_data_jobs": total_jobs,
            "total_open_jobs_pool": total_pool,
            "overall_ai_intensity_pct": round(100.0 * total_jobs / max(total_pool, 1), 2),
            "sp500_ai_data_jobs": sp500_ai_jobs,
            "sp500_open_jobs_pool": sp500_pool,
            "sp500_ai_intensity_pct": round(100.0 * sp500_ai_jobs / max(sp500_pool, 1), 2),
            "sp500_hiring_companies": sp500_hiring,
            "sp500_zero_job_companies": sp500_companies - sp500_hiring,
            "cz_ai_data_jobs": cz_jobs,
            "eu_uk_ch_ai_data_jobs": eu_uk_ch_jobs,
            "us_ca_ai_data_jobs": us_ca_jobs,
            "top_hiring_companies": top_hiring_companies,
            "regional_breakdown": regional_breakdown,
        }

        # 2. Tech & Cloud Stack
        all_skills_rows = con.execute(
            """
            SELECT
                s.skill_id,
                s.skill_name,
                s.category,
                COUNT(DISTINCT b.job_id) AS cnt,
                ROUND(100.0 * COUNT(DISTINCT b.job_id) / NULLIF(?, 0), 2) AS pen_pct
            FROM dim_skills s
            LEFT JOIN bridge_job_skills b ON s.skill_id = b.skill_id
            GROUP BY 1, 2, 3
            ORDER BY cnt DESC, s.skill_name ASC
            """,
            [total_jobs],
        ).fetchall()

        skill_map: dict[str, dict[str, Any]] = {}
        for r in all_skills_rows:
            item = {
                "skill_id": r[0],
                "skill_name": r[1],
                "category": r[2],
                "job_count": int(r[3]),
                "penetration_pct": float(r[4] or 0.0),
            }
            skill_map[r[0]] = item

        hyperscalers = sorted(
            [skill_map[sid] for sid in HYPERSCALER_IDS if sid in skill_map],
            key=lambda x: x["job_count"],
            reverse=True,
        )
        data_platforms = sorted(
            [skill_map[sid] for sid in DATA_PLATFORM_IDS if sid in skill_map],
            key=lambda x: x["job_count"],
            reverse=True,
        )
        top_technologies = [item for item in skill_map.values() if item["job_count"] > 0][:24]

        cooc_rows = con.execute(
            """
            SELECT skill_a, skill_b, cooccurrence_count, jaccard_pct
            FROM v_skill_cooccurrence
            ORDER BY cooccurrence_count DESC
            LIMIT 18
            """
        ).fetchall()
        skill_cooccurrence = [
            {
                "skill_a": r[0],
                "skill_b": r[1],
                "cooccurrence_count": int(r[2]),
                "jaccard_pct": float(r[3] or 0.0),
            }
            for r in cooc_rows
        ]

        # Multi-cloud kombinace a penetrace
        mc_row = con.execute(
            """
            WITH job_clouds AS (
                SELECT 
                    j.url,
                    MAX(CASE WHEN b.skill_id = 'aws' THEN 1 ELSE 0 END) AS has_aws,
                    MAX(CASE WHEN b.skill_id = 'azure' THEN 1 ELSE 0 END) AS has_azure,
                    MAX(CASE WHEN b.skill_id = 'gcp' THEN 1 ELSE 0 END) AS has_gcp
                FROM fact_jobs j
                JOIN bridge_job_skills b ON j.job_id = b.job_id
                WHERE j.is_active = TRUE AND b.skill_id IN ('aws', 'azure', 'gcp')
                GROUP BY j.url
            )
            SELECT 
                COUNT(*) AS total_cloud_jobs,
                SUM(CASE WHEN (has_aws + has_azure + has_gcp) >= 2 THEN 1 ELSE 0 END) AS multicloud_jobs,
                ROUND(100.0 * SUM(CASE WHEN (has_aws + has_azure + has_gcp) >= 2 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) AS multicloud_pct,
                SUM(CASE WHEN has_aws = 1 AND has_azure = 1 THEN 1 ELSE 0 END) AS aws_azure,
                SUM(CASE WHEN has_aws = 1 AND has_gcp = 1 THEN 1 ELSE 0 END) AS aws_gcp,
                SUM(CASE WHEN has_azure = 1 AND has_gcp = 1 THEN 1 ELSE 0 END) AS azure_gcp,
                SUM(CASE WHEN has_aws = 1 AND has_azure = 1 AND has_gcp = 1 THEN 1 ELSE 0 END) AS all_three
            FROM job_clouds
            """
        ).fetchone()

        multicloud_stats = {
            "total_cloud_jobs": int(mc_row[0] or 0),
            "multicloud_jobs": int(mc_row[1] or 0),
            "multicloud_pct": float(mc_row[2] or 0.0),
            "aws_azure_jobs": int(mc_row[3] or 0),
            "aws_gcp_jobs": int(mc_row[4] or 0),
            "azure_gcp_jobs": int(mc_row[5] or 0),
            "all_three_jobs": int(mc_row[6] or 0),
        }

        # Ekosystémové profily pro AWS, Azure, GCP, Databricks a Snowflake
        ecosystems: dict[str, Any] = {}
        target_platforms = [
            ("aws", "AWS", "hyperscaler"),
            ("azure", "Microsoft Azure", "hyperscaler"),
            ("gcp", "Google Cloud", "hyperscaler"),
            ("databricks", "Databricks", "platform"),
            ("snowflake_db", "Snowflake", "platform"),
        ]

        for pid, pname, ptype in target_platforms:
            filter_skill_ids = [pid] if pid != "gcp" else list(GCP_ECOSYSTEM_IDS)

            plat_comps = con.execute(
                """
                SELECT 
                    CASE 
                        WHEN comp.company_id IN ('alphabet', 'alphabet_class_a', 'alphabet_class_c', 'google') THEN 'Google (Alphabet)'
                        ELSE comp.company_name 
                    END AS c_name,
                    MAX(comp.sp500_sector) AS sector,
                    COUNT(DISTINCT j.url) AS cnt
                FROM fact_jobs j
                JOIN dim_companies comp ON j.company_id = comp.company_id
                WHERE j.is_active = TRUE AND j.job_id IN (
                    SELECT DISTINCT job_id FROM bridge_job_skills WHERE skill_id IN (SELECT UNNEST(?))
                )
                GROUP BY 1
                ORDER BY cnt DESC
                LIMIT 8
                """,
                [filter_skill_ids],
            ).fetchall()

            plat_roles = con.execute(
                """
                SELECT c.canonical_name, COUNT(DISTINCT j.url) AS cnt
                FROM bridge_job_roles r
                JOIN dim_job_categories c ON r.category_id = c.category_id
                JOIN fact_jobs j ON r.job_id = j.job_id
                WHERE j.is_active = TRUE AND r.job_id IN (
                    SELECT DISTINCT job_id FROM bridge_job_skills WHERE skill_id IN (SELECT UNNEST(?))
                )
                GROUP BY 1
                ORDER BY cnt DESC
                LIMIT 6
                """,
                [filter_skill_ids],
            ).fetchall()

            plat_tot = int(
                con.execute(
                    """
                    SELECT COUNT(DISTINCT j.url)
                    FROM bridge_job_skills b
                    JOIN fact_jobs j ON b.job_id = j.job_id
                    WHERE j.is_active = TRUE AND b.skill_id IN (SELECT UNNEST(?))
                    """,
                    [filter_skill_ids],
                ).fetchone()[0]
            )

            ecosystems[pid] = {
                "id": pid,
                "name": pname,
                "type": ptype,
                "total_jobs": plat_tot,
                "share_of_all_jobs_pct": round(100.0 * plat_tot / max(total_jobs, 1), 2),
                "share_of_cloud_jobs_pct": round(100.0 * plat_tot / max(multicloud_stats["total_cloud_jobs"], 1), 2),
                "top_companies": [{"company_name": r[0], "sector": r[1], "job_count": int(r[2])} for r in plat_comps],
                "top_roles": [{"canonical_name": r[0], "job_count": int(r[1])} for r in plat_roles],
            }

        tech_cloud_stack = {
            "hyperscalers": hyperscalers,
            "data_platforms": data_platforms,
            "top_technologies": top_technologies,
            "skill_cooccurrence": skill_cooccurrence,
            "multicloud": multicloud_stats,
            "ecosystems": ecosystems,
        }

        # 3. Industry Heatmap (S&P 500 Sectors + Seniority matrix)
        sector_rows = con.execute(
            """
            SELECT
                sp500_sector,
                companies_count,
                total_active_jobs,
                ai_data_jobs,
                ai_intensity_pct,
                genai_jobs,
                genai_share_of_ai_pct
            FROM v_sp500_sector_intensity
            ORDER BY ai_intensity_pct DESC NULLS LAST
            """
        ).fetchall()

        sector_sen_rows = con.execute(
            """
            SELECT
                c.sp500_sector,
                j.seniority,
                COUNT(j.job_id) AS cnt
            FROM fact_jobs j
            JOIN dim_companies c ON j.company_id = c.company_id
            WHERE j.is_active = TRUE AND c.is_sp500 = TRUE AND c.sp500_sector IS NOT NULL AND j.seniority IS NOT NULL
            GROUP BY 1, 2
            """
        ).fetchall()

        sector_sen_map: dict[str, dict[str, int]] = {}
        for sec, sen, cnt in sector_sen_rows:
            sector_sen_map.setdefault(sec, {})[sen] = int(cnt)

        sectors_list = []
        for r in sector_rows:
            sec_name = r[0]
            sen_breakdown = {lvl: sector_sen_map.get(sec_name, {}).get(lvl, 0) for lvl in SENIORITY_ORDER}
            sectors_list.append(
                {
                    "sector": sec_name,
                    "companies_count": int(r[1]),
                    "total_active_jobs": int(r[2] or 0),
                    "ai_data_jobs": int(r[3] or 0),
                    "ai_intensity_pct": float(r[4] or 0.0),
                    "genai_jobs": int(r[5] or 0),
                    "genai_share_of_ai_pct": float(r[6] or 0.0),
                    "seniority_breakdown": sen_breakdown,
                }
            )

        industry_heatmap = {
            "sectors": sectors_list,
            "seniority_levels": SENIORITY_ORDER,
        }

        # 4. Hierarchy Shift (IC vs Management)
        track_rows = con.execute(
            """
            SELECT track, COUNT(*) AS cnt
            FROM fact_jobs
            WHERE is_active = TRUE AND track IS NOT NULL
            GROUP BY 1
            """
        ).fetchall()
        track_counts = {r[0]: int(r[1]) for r in track_rows}
        ic_count = track_counts.get("IC", 0)
        mgmt_count = track_counts.get("Management", 0) + track_counts.get("Executive", 0)
        track_total = max(ic_count + mgmt_count, 1)

        sen_rows = con.execute(
            """
            SELECT
                seniority,
                MAX(track) AS primary_track,
                COUNT(*) AS cnt,
                ROUND(100.0 * COUNT(*) / NULLIF(?, 0), 2) AS share_pct
            FROM fact_jobs
            WHERE is_active = TRUE AND seniority IS NOT NULL
            GROUP BY 1
            """,
            [total_jobs],
        ).fetchall()
        sen_lookup = {r[0]: (r[1] or "IC", int(r[2]), float(r[3] or 0.0)) for r in sen_rows}
        by_seniority = [
            {
                "seniority": lvl,
                "track": "Management" if lvl in ("Lead / Manager", "Executive") else sen_lookup.get(lvl, ("IC", 0, 0.0))[0],
                "job_count": sen_lookup.get(lvl, ("IC", 0, 0.0))[1],
                "share_pct": sen_lookup.get(lvl, ("IC", 0, 0.0))[2],
            }
            for lvl in SENIORITY_ORDER
        ]

        dom_track_rows = con.execute(
            """
            SELECT
                c.domain,
                SUM(CASE WHEN c.track = 'IC' THEN 1 ELSE 0 END) AS ic_jobs,
                SUM(CASE WHEN c.track != 'IC' THEN 1 ELSE 0 END) AS mgmt_jobs
            FROM bridge_job_roles b
            JOIN dim_job_categories c ON b.category_id = c.category_id
            GROUP BY 1
            ORDER BY (ic_jobs + mgmt_jobs) DESC
            """
        ).fetchall()
        by_domain = [
            {
                "domain": r[0],
                "ic_jobs": int(r[1]),
                "management_jobs": int(r[2]),
                "ic_share_pct": round(100.0 * int(r[1]) / max(int(r[1]) + int(r[2]), 1), 1),
            }
            for r in dom_track_rows
        ]

        wm_rows = con.execute(
            """
            SELECT work_mode, COUNT(*) AS cnt, ROUND(100.0 * COUNT(*) / NULLIF(?, 0), 2) AS share_pct
            FROM fact_jobs
            WHERE is_active = TRUE AND work_mode IS NOT NULL
            GROUP BY 1
            ORDER BY cnt DESC
            """,
            [total_jobs],
        ).fetchall()
        work_modes = [
            {"work_mode": r[0], "job_count": int(r[1]), "share_pct": float(r[2] or 0.0)}
            for r in wm_rows
        ]

        hierarchy_shift = {
            "ic_count": ic_count,
            "management_count": mgmt_count,
            "ic_share_pct": round(100.0 * ic_count / track_total, 2),
            "management_share_pct": round(100.0 * mgmt_count / track_total, 2),
            "ic_to_management_ratio": round(ic_count / max(mgmt_count, 1), 1),
            "by_seniority": by_seniority,
            "by_domain": by_domain,
            "work_modes": work_modes,
        }

        # 5. Trend Radar
        trend_rows = con.execute(
            """
            SELECT
                s.skill_id,
                s.skill_name,
                s.category,
                COUNT(DISTINCT b.job_id) AS all_cnt,
                COUNT(DISTINCT CASE WHEN c.is_sp500 = TRUE THEN b.job_id END) AS sp500_cnt,
                ROUND(100.0 * COUNT(DISTINCT b.job_id) / NULLIF(?, 0), 2) AS pen_pct
            FROM dim_skills s
            LEFT JOIN bridge_job_skills b ON s.skill_id = b.skill_id
            LEFT JOIN fact_jobs j ON b.job_id = j.job_id
            LEFT JOIN dim_companies c ON j.company_id = c.company_id
            WHERE s.skill_id IN (SELECT UNNEST(?))
            GROUP BY 1, 2, 3
            ORDER BY all_cnt DESC
            """,
            [total_jobs, list(TREND_RADAR_IDS)],
        ).fetchall()

        trend_keywords = [
            {
                "skill_id": r[0],
                "label": r[1],
                "category": r[2],
                "job_count": int(r[3]),
                "penetration_pct": float(r[5] or 0.0),
                "sp500_job_count": int(r[4]),
                "signal_stage": classify_signal_stage(float(r[5] or 0.0)),
            }
            for r in trend_rows
        ]
        trend_radar = {"keywords": trend_keywords}

        # 6. Time Series (připraveno na budoucí měsíční/týdenní sběry)
        snap_rows = con.execute(
            """
            SELECT
                CAST(latest_date_in_week AS VARCHAR) AS snap_date,
                snapshot_week,
                active_jobs,
                active_companies,
                COALESCE(senior_plus_pct, 0.0),
                COALESCE(remote_of_known_pct, 0.0)
            FROM v_weekly_snapshots
            ORDER BY snapshot_week ASC
            """
        ).fetchall()

        snapshots = [
            {
                "snapshot_date": r[0],
                "snapshot_week": r[1],
                "active_jobs": int(r[2]),
                "active_companies": int(r[3]),
                "senior_plus_pct": float(r[4]),
                "remote_of_known_pct": float(r[5]),
            }
            for r in snap_rows
        ]

        inflow_rows = con.execute(
            """
            SELECT
                posted_month,
                new_jobs,
                aiml_jobs,
                data_eng_jobs,
                analytics_jobs,
                COALESCE(aiml_share_pct, 0.0),
                COALESCE(senior_plus_pct, 0.0)
            FROM v_monthly_inflow
            WHERE posted_month >= '2026-06'
            ORDER BY posted_month ASC
            """
        ).fetchall()

        monthly_inflow = [
            {
                "posted_month": r[0],
                "new_jobs": int(r[1]),
                "aiml_jobs": int(r[2] or 0),
                "data_eng_jobs": int(r[3] or 0),
                "analytics_jobs": int(r[4] or 0),
                "aiml_share_pct": float(r[5]),
                "senior_plus_pct": float(r[6]),
            }
            for r in inflow_rows
        ]

        distinct_months = len({s["snapshot_date"][:7] for s in snapshots})
        has_mature_history = distinct_months >= 3

        time_series = {
            "has_mature_history": has_mature_history,
            "status_note": {
                "en": (
                    "Longitudinal collection is in its initial baseline phase (Q4 2026). Early snapshot growth reflects progressive onboarding of S&P 500 ATS sources; full MoM/WoW market dynamics activate after 3 completed monthly cohorts."
                    if not has_mature_history
                    else "Active longitudinal tracking across weekly and monthly cohorts."
                ),
                "cs": (
                    "Longitudinální sběr je v iniciační fázi (Q4 2026). Počáteční nárůst snapshotů odráží postupné zapojování S&P 500 ATS zdrojů; plnohodnotné MoM/WoW srovnávání tržní dynamiky se aktivuje po uzavření 3 měsíčních kohort."
                    if not has_mature_history
                    else "Aktivní longitudinální sledování týdenních a měsíčních kohort."
                ),
            },
            "snapshots": snapshots,
            "monthly_inflow": monthly_inflow,
        }

        # 7. Headcount Analytics (LinkedIn / Coresignal obsazené pozice vs. inzeráty)
        hc_tracked_comps = 0
        hc_total_snaps = 0
        total_occupied_seats = 0
        company_ratios: list[dict[str, Any]] = []
        macro_role_intensity: list[dict[str, Any]] = []
        company_team_growth: list[dict[str, Any]] = []
        occupied_by_role: dict[str, int] = {}

        try:
            hc_meta = con.execute(
                "SELECT COUNT(DISTINCT company_id), COUNT(*) FROM fact_headcount_snapshots"
            ).fetchone()
            hc_tracked_comps = int(hc_meta[0] or 0)
            hc_total_snaps = int(hc_meta[1] or 0)

            total_occ_row = con.execute(
                "SELECT SUM(headcount) FROM fact_headcount_snapshots WHERE country_code = 'GLOBAL' AND role_id != '_ALL_'"
            ).fetchone()
            total_occupied_seats = int(total_occ_row[0] or 0)

            # 7a. Makro poměr pro každou roli (obsazená místa vs. otevřené inzeráty)
            macro_rows = con.execute(
                """
                WITH occupied AS (
                    SELECT 
                        role_id,
                        SUM(headcount) AS total_headcount
                    FROM fact_headcount_snapshots
                    WHERE country_code = 'GLOBAL' AND role_id != '_ALL_'
                    GROUP BY 1
                ),
                open_p AS (
                    SELECT 
                        r.category_id AS role_id,
                        COUNT(DISTINCT r.job_id) AS total_open_jobs
                    FROM bridge_job_roles r
                    JOIN fact_jobs j ON r.job_id = j.job_id
                    WHERE j.is_active = TRUE
                    GROUP BY 1
                )
                SELECT 
                    c.category_id,
                    c.canonical_name,
                    c.domain,
                    COALESCE(o.total_headcount, 0) AS occupied_seats,
                    COALESCE(p.total_open_jobs, 0) AS open_jobs,
                    ROUND(100.0 * COALESCE(p.total_open_jobs, 0) / NULLIF(o.total_headcount, 0), 2) AS intensity_pct
                FROM dim_job_categories c
                LEFT JOIN occupied o ON c.category_id = o.role_id
                LEFT JOIN open_p p ON c.category_id = p.role_id
                ORDER BY occupied_seats DESC NULLS LAST
                """
            ).fetchall()

            for r in macro_rows:
                cid, cname, cdom, occ, op, inten = r
                occ = int(occ)
                op = int(op)
                occupied_by_role[cid] = occ
                macro_role_intensity.append({
                    "role_id": cid,
                    "canonical_name": cname,
                    "domain": cdom,
                    "occupied_seats": occ,
                    "open_jobs": op,
                    "hiring_intensity_pct": float(inten) if inten is not None else 0.0,
                })

            # 7b. Firemní žebříček: růst a expanze stávajících datových týmů
            team_growth_rows = con.execute(
                """
                WITH comp_jobs AS (
                    SELECT 
                        j.company_id,
                        COUNT(DISTINCT j.job_id) AS open_data_jobs
                    FROM fact_jobs j
                    WHERE j.is_active = TRUE
                    GROUP BY 1
                ),
                comp_headcount AS (
                    SELECT 
                        company_id,
                        MAX(CASE WHEN role_id = '_ALL_' THEN headcount ELSE NULL END) AS total_company_headcount,
                        SUM(CASE WHEN role_id != '_ALL_' THEN headcount ELSE 0 END) AS total_data_team
                    FROM fact_headcount_snapshots
                    WHERE country_code = 'GLOBAL'
                    GROUP BY 1
                )
                SELECT 
                    c.company_id,
                    c.company_name,
                    c.sp500_sector,
                    h.total_company_headcount,
                    h.total_data_team,
                    COALESCE(j.open_data_jobs, 0) AS open_data_jobs,
                    ROUND(100.0 * COALESCE(j.open_data_jobs, 0) / NULLIF(h.total_data_team, 0), 1) AS hiring_intensity_ratio_pct,
                    ROUND(100.0 * h.total_data_team / NULLIF(h.total_company_headcount, 0), 2) AS data_team_share_pct
                FROM dim_companies c
                JOIN comp_headcount h ON c.company_id = h.company_id
                LEFT JOIN comp_jobs j ON c.company_id = j.company_id
                WHERE h.total_data_team >= 20 AND COALESCE(j.open_data_jobs, 0) > 0
                ORDER BY hiring_intensity_ratio_pct DESC
                LIMIT 15
                """
            ).fetchall()

            for r in team_growth_rows:
                cid, cname, sec, comp_tot, dt_tot, op_tot, ratio_pct, share_pct = r
                company_team_growth.append({
                    "company_id": cid,
                    "company_name": cname,
                    "sector": sec,
                    "total_company_headcount": int(comp_tot) if comp_tot is not None else None,
                    "total_data_team": int(dt_tot),
                    "open_data_jobs": int(op_tot),
                    "hiring_intensity_ratio_pct": float(ratio_pct) if ratio_pct is not None else 0.0,
                    "data_team_share_pct": float(share_pct) if share_pct is not None else None,
                })

            hc_rows = con.execute(
                """
                SELECT
                    company_id,
                    company_name,
                    category_id,
                    role_name,
                    global_headcount,
                    us_headcount,
                    open_jobs,
                    hiring_intensity_ratio_pct
                FROM v_hiring_intensity
                WHERE global_headcount IS NOT NULL AND global_headcount > 0
                ORDER BY open_jobs DESC, global_headcount DESC
                LIMIT 25
                """
            ).fetchall()
            company_ratios = [
                {
                    "company_id": r[0],
                    "company_name": r[1],
                    "role_id": r[2],
                    "role_name": r[3],
                    "global_headcount": int(r[4]) if r[4] is not None else None,
                    "us_headcount": int(r[5]) if r[5] is not None else None,
                    "open_jobs": int(r[6] or 0),
                    "hiring_intensity_ratio_pct": float(r[7]) if r[7] is not None else None,
                }
                for r in hc_rows
            ]
        except duckdb.Error:
            pass

        headcount_analytics = {
            "tracked_companies_count": hc_tracked_comps,
            "total_snapshots": hc_total_snaps,
            "total_occupied_seats": total_occupied_seats,
            "coverage_note": {
                "en": (
                    f"Workforce intelligence integration tracking {total_occupied_seats:,} occupied Data & AI seats across {hc_tracked_comps} enterprises. Measures Hiring Intensity Ratio: open job postings relative to currently occupied team seats."
                ),
                "cs": (
                    f"Telemetrie obsazených pozic sledující {total_occupied_seats:,} zaměstnaných Data & AI expertů u {hc_tracked_comps} korporací. Měří Hiring Intensity Ratio: poměr otevřených inzerátů vůči aktuální velikosti týmů."
                ),
            },
            "macro_role_intensity": macro_role_intensity,
            "company_team_growth": company_team_growth,
            "company_ratios": company_ratios,
        }

        # 8. Analýza rolí (21 kanonických rolí + 2-odstavcová syntéza + skills + tech + firmy + odvětví)
        role_base_rows = con.execute(
            """
            SELECT
                c.category_id,
                c.canonical_name,
                c.domain,
                c.track,
                COUNT(DISTINCT r.job_id) AS job_cnt,
                COUNT(DISTINCT CASE WHEN comp.is_sp500 = TRUE THEN r.job_id END) AS sp500_cnt,
                COUNT(DISTINCT CASE WHEN j.country_code = 'CZ' THEN r.job_id END) AS cz_cnt,
                ROUND(
                    100.0 * COUNT(DISTINCT CASE WHEN j.seniority IN ('Senior', 'Staff / Principal', 'Lead / Manager', 'Executive') THEN r.job_id END)
                    / NULLIF(COUNT(DISTINCT r.job_id), 0),
                    1
                ) AS senior_plus_pct,
                ROUND(
                    100.0 * COUNT(DISTINCT CASE WHEN j.work_mode = 'Remote' THEN r.job_id END)
                    / NULLIF(COUNT(DISTINCT CASE WHEN j.work_mode IS NOT NULL AND j.work_mode != 'Unspecified' THEN r.job_id END), 0),
                    1
                ) AS remote_pct
            FROM dim_job_categories c
            LEFT JOIN bridge_job_roles r ON c.category_id = r.category_id
            LEFT JOIN fact_jobs j ON r.job_id = j.job_id AND j.is_active = TRUE
            LEFT JOIN dim_companies comp ON j.company_id = comp.company_id
            GROUP BY 1, 2, 3, 4
            ORDER BY job_cnt DESC, c.canonical_name ASC
            """
        ).fetchall()

        # Přednačtení skillů pro role
        role_skill_rows = con.execute(
            """
            SELECT
                r.category_id,
                s.skill_id,
                s.skill_name,
                s.category,
                COUNT(DISTINCT bs.job_id) AS cnt
            FROM bridge_job_roles r
            JOIN bridge_job_skills bs ON r.job_id = bs.job_id
            JOIN dim_skills s ON bs.skill_id = s.skill_id
            GROUP BY 1, 2, 3, 4
            ORDER BY 1, cnt DESC
            """
        ).fetchall()
        role_skills_by_cat: dict[str, list[tuple[str, str, str, int]]] = {}
        for cat_id, sid, sname, scat, cnt in role_skill_rows:
            role_skills_by_cat.setdefault(cat_id, []).append((sid, sname, scat, int(cnt)))

        # Přednačtení top firem pro role
        role_comp_rows = con.execute(
            """
            SELECT
                r.category_id,
                comp.company_name,
                COUNT(DISTINCT r.job_id) AS cnt
            FROM bridge_job_roles r
            JOIN fact_jobs j ON r.job_id = j.job_id
            JOIN dim_companies comp ON j.company_id = comp.company_id
            WHERE j.is_active = TRUE
            GROUP BY 1, 2
            ORDER BY 1, cnt DESC
            """
        ).fetchall()
        role_comps_by_cat: dict[str, list[dict[str, Any]]] = {}
        for cat_id, cname, cnt in role_comp_rows:
            lst = role_comps_by_cat.setdefault(cat_id, [])
            if len(lst) < 6:
                lst.append({"company_name": cname, "job_count": int(cnt)})

        # Přednačtení S&P 500 odvětví pro role
        role_sec_rows = con.execute(
            """
            SELECT
                r.category_id,
                comp.sp500_sector,
                COUNT(DISTINCT r.job_id) AS cnt
            FROM bridge_job_roles r
            JOIN fact_jobs j ON r.job_id = j.job_id
            JOIN dim_companies comp ON j.company_id = comp.company_id
            WHERE j.is_active = TRUE AND comp.is_sp500 = TRUE AND comp.sp500_sector IS NOT NULL
            GROUP BY 1, 2
            ORDER BY 1, cnt DESC
            """
        ).fetchall()
        role_secs_by_cat: dict[str, list[tuple[str, int]]] = {}
        for cat_id, sec, cnt in role_sec_rows:
            role_secs_by_cat.setdefault(cat_id, []).append((sec, int(cnt)))

        # Přednačtení seniority pro role
        role_sen_rows = con.execute(
            """
            SELECT
                r.category_id,
                j.seniority,
                COUNT(DISTINCT r.job_id) AS cnt
            FROM bridge_job_roles r
            JOIN fact_jobs j ON r.job_id = j.job_id
            WHERE j.is_active = TRUE AND j.seniority IS NOT NULL
            GROUP BY 1, 2
            """
        ).fetchall()
        role_sen_by_cat: dict[str, dict[str, int]] = {}
        for cat_id, sen, cnt in role_sen_rows:
            role_sen_by_cat.setdefault(cat_id, {})[sen] = int(cnt)

        # Přednačtení vzorku reálných aktivních inzerátů pro detail role (SEO a prolinky)
        sample_rows = con.execute(
            """
            WITH candidate_jobs AS (
                SELECT 
                    r.category_id,
                    j.job_id,
                    j.title_raw AS title,
                    comp.company_name,
                    comp.is_sp500,
                    COALESCE(
                        CASE 
                            WHEN j.city IS NOT NULL AND j.city != '' THEN j.city || ', ' || COALESCE(j.country_code, '')
                            ELSE j.country_code 
                        END, 
                        'Global / Unspecified'
                    ) AS location,
                    j.country_code,
                    j.seniority,
                    COALESCE(j.work_mode, 'Unspecified') AS work_mode,
                    j.url,
                    CAST(j.posted_at AS VARCHAR) AS posted_at,
                    ROW_NUMBER() OVER (
                        PARTITION BY r.category_id, comp.company_name 
                        ORDER BY 
                            CASE WHEN LOWER(j.title_raw) LIKE '%' || LOWER(REPLACE(REPLACE(cat.canonical_name, ' (AI/ML)', ''), ' / ', ' ')) || '%' THEN 0 ELSE 1 END,
                            j.posted_at DESC NULLS LAST,
                            j.job_id
                    ) as comp_rn
                FROM bridge_job_roles r
                JOIN dim_job_categories cat ON r.category_id = cat.category_id
                JOIN fact_jobs j ON r.job_id = j.job_id
                JOIN dim_companies comp ON j.company_id = comp.company_id
                WHERE j.is_active = TRUE AND j.url IS NOT NULL AND j.url != ''
            ),
            ranked_jobs AS (
                SELECT 
                    *,
                    ROW_NUMBER() OVER (
                        PARTITION BY category_id 
                        ORDER BY 
                            CASE WHEN is_sp500 = TRUE THEN 0 ELSE 1 END,
                            CASE WHEN url LIKE '%greenhouse.io%' OR url LIKE '%lever.co%' OR url LIKE '%careers.google.com%' THEN 0 ELSE 1 END,
                            comp_rn,
                            posted_at DESC NULLS LAST
                    ) as rn
                FROM candidate_jobs
                WHERE comp_rn = 1
            )
            SELECT category_id, job_id, title, company_name, is_sp500, location, country_code, seniority, work_mode, url, posted_at
            FROM ranked_jobs
            WHERE rn <= 8
            ORDER BY category_id, rn
            """
        ).fetchall()
        role_samples_by_cat: dict[str, list[dict[str, Any]]] = {}
        for row in sample_rows:
            cat_id, jid, jtitle, cname, sp500_flag, loc, ccode, sen, wm, jurl, pdate = row
            role_samples_by_cat.setdefault(cat_id, []).append(
                {
                    "job_id": jid,
                    "title": jtitle,
                    "company_name": cname,
                    "is_sp500": bool(sp500_flag),
                    "location": loc,
                    "country_code": ccode,
                    "seniority": sen,
                    "work_mode": wm,
                    "url": jurl,
                    "posted_at": pdate,
                }
            )

        roles_output: list[dict[str, Any]] = []
        for r in role_base_rows:
            cat_id, can_name, domain, track, job_cnt, sp500_cnt, cz_cnt, sen_plus, rem_pct = r
            job_cnt = int(job_cnt)
            denom = max(job_cnt, 1)

            raw_items = role_skills_by_cat.get(cat_id, [])
            top_skills_list = [
                {
                    "skill_id": sid,
                    "skill_name": sname,
                    "category": scat,
                    "job_count": cnt,
                    "penetration_pct": round(100.0 * cnt / denom, 1),
                }
                for sid, sname, scat, cnt in raw_items
                if scat in SKILL_CATEGORIES
            ][:8]

            top_tech_list = [
                {
                    "skill_id": sid,
                    "skill_name": sname,
                    "category": scat,
                    "job_count": cnt,
                    "penetration_pct": round(100.0 * cnt / denom, 1),
                }
                for sid, sname, scat, cnt in raw_items
                if scat in TECH_CATEGORIES
            ][:8]

            narrative = role_narratives.get(cat_id)
            if (
                not isinstance(narrative, dict)
                or len(narrative.get("en", [])) != 2
                or len(narrative.get("cs", [])) != 2
            ):
                narrative = build_fallback_description(can_name, domain, job_cnt, top_skills_list, top_tech_list)

            sec_tuples = role_secs_by_cat.get(cat_id, [])
            sec_denom = max(sp500_cnt, 1)
            top_sectors = [
                {
                    "sector": sec,
                    "job_count": cnt,
                    "share_pct": round(100.0 * cnt / sec_denom, 1),
                }
                for sec, cnt in sec_tuples[:5]
            ]

            sen_map_for_role = role_sen_by_cat.get(cat_id, {})
            sen_breakdown = [
                {
                    "seniority": lvl,
                    "job_count": sen_map_for_role.get(lvl, 0),
                    "share_pct": round(100.0 * sen_map_for_role.get(lvl, 0) / denom, 1) if job_cnt > 0 else 0.0,
                }
                for lvl in SENIORITY_ORDER
            ]

            occ_count = occupied_by_role.get(cat_id)
            exp_index = round(100.0 * job_cnt / occ_count, 1) if (occ_count and occ_count > 0) else None

            roles_output.append(
                {
                    "category_id": cat_id,
                    "canonical_name": can_name,
                    "domain": domain,
                    "track": track,
                    "job_count": job_cnt,
                    "market_share_pct": round(100.0 * job_cnt / max(total_jobs, 1), 2),
                    "sp500_job_count": int(sp500_cnt),
                    "cz_job_count": int(cz_cnt),
                    "occupied_seats": occ_count,
                    "expansion_index_pct": exp_index,
                    "senior_plus_pct": float(sen_plus or 0.0),
                    "remote_pct": float(rem_pct or 0.0),
                    "synthesized_description": narrative,
                    "top_skills": top_skills_list,
                    "top_technologies": top_tech_list,
                    "top_companies": role_comps_by_cat.get(cat_id, []),
                    "top_sectors": top_sectors,
                    "seniority_breakdown": sen_breakdown,
                    "sample_postings": role_samples_by_cat.get(cat_id, []),
                }
            )

        # 9. Google Cloud Hub
        gcp_total_jobs = int(
            con.execute(
                """
                SELECT COUNT(DISTINCT job_id)
                FROM bridge_job_skills
                WHERE skill_id IN (SELECT UNNEST(?))
                """,
                [list(GCP_ECOSYSTEM_IDS)],
            ).fetchone()[0]
        )
        any_cloud_jobs = int(
            con.execute(
                """
                SELECT COUNT(DISTINCT b.job_id)
                FROM bridge_job_skills b
                JOIN dim_skills s ON b.skill_id = s.skill_id
                WHERE s.category = 'Cloud'
                """
            ).fetchone()[0]
        )

        gcp_services_list: list[dict[str, Any]] = []
        for sid in GCP_ECOSYSTEM_IDS:
            s_info = skill_map.get(sid)
            if not s_info:
                continue
            paired_rows = con.execute(
                """
                SELECT s2.skill_name, COUNT(DISTINCT b1.job_id) AS cnt
                FROM bridge_job_skills b1
                JOIN bridge_job_skills b2 ON b1.job_id = b2.job_id AND b1.skill_id != b2.skill_id
                JOIN dim_skills s2 ON b2.skill_id = s2.skill_id
                WHERE b1.skill_id = ?
                GROUP BY 1
                ORDER BY cnt DESC
                LIMIT 4
                """,
                [sid],
            ).fetchall()
            gcp_services_list.append(
                {
                    "skill_id": sid,
                    "service_name": s_info["skill_name"],
                    "category": s_info["category"],
                    "job_count": s_info["job_count"],
                    "penetration_in_gcp_pct": round(100.0 * s_info["job_count"] / max(gcp_total_jobs, 1), 1),
                    "penetration_all_pct": s_info["penetration_pct"],
                    "top_paired_skills": [r[0] for r in paired_rows],
                }
            )
        gcp_services_list.sort(key=lambda x: x["job_count"], reverse=True)

        gcp_role_rows = con.execute(
            """
            SELECT c.canonical_name, COUNT(DISTINCT j.url) AS cnt
            FROM bridge_job_roles r
            JOIN dim_job_categories c ON r.category_id = c.category_id
            JOIN fact_jobs j ON r.job_id = j.job_id
            WHERE j.is_active = TRUE AND r.job_id IN (
                SELECT DISTINCT job_id FROM bridge_job_skills WHERE skill_id IN (SELECT UNNEST(?))
            )
            GROUP BY 1
            ORDER BY cnt DESC
            LIMIT 8
            """,
            [list(GCP_ECOSYSTEM_IDS)],
        ).fetchall()

        gcp_comp_rows = con.execute(
            """
            SELECT 
                CASE 
                    WHEN comp.company_id IN ('alphabet', 'alphabet_class_a', 'alphabet_class_c', 'google') THEN 'Google (Alphabet)'
                    ELSE comp.company_name 
                END AS c_name,
                MAX(comp.sp500_sector) AS sector,
                COUNT(DISTINCT j.url) AS cnt
            FROM fact_jobs j
            JOIN dim_companies comp ON j.company_id = comp.company_id
            WHERE j.is_active = TRUE AND j.job_id IN (
                SELECT DISTINCT job_id FROM bridge_job_skills WHERE skill_id IN (SELECT UNNEST(?))
            )
            GROUP BY 1
            ORDER BY cnt DESC
            LIMIT 10
            """,
            [list(GCP_ECOSYSTEM_IDS)],
        ).fetchall()

        gcp_hub = {
            "total_gcp_ecosystem_jobs": gcp_total_jobs,
            "gcp_share_of_all_jobs_pct": round(100.0 * gcp_total_jobs / max(total_jobs, 1), 2),
            "gcp_share_of_cloud_jobs_pct": round(100.0 * gcp_total_jobs / max(any_cloud_jobs, 1), 2),
            "services": gcp_services_list,
            "top_gcp_roles": [{"canonical_name": r[0], "job_count": int(r[1])} for r in gcp_role_rows],
            "top_gcp_companies": [
                {"company_name": r[0], "sector": r[1], "job_count": int(r[2])} for r in gcp_comp_rows
            ],
        }

        payload: dict[str, Any] = {
            "meta": meta,
            "market_vitality": market_vitality,
            "tech_cloud_stack": tech_cloud_stack,
            "industry_heatmap": industry_heatmap,
            "hierarchy_shift": hierarchy_shift,
            "trend_radar": trend_radar,
            "time_series": time_series,
            "headcount_analytics": headcount_analytics,
            "roles": roles_output,
            "gcp_hub": gcp_hub,
        }

        validate_against_contract(payload)

        resolved_out.parent.mkdir(parents=True, exist_ok=True)
        resolved_out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(
            f"[Vector87 Exporter] Wrote {resolved_out} "
            f"({resolved_out.stat().st_size:,} bytes, {total_jobs:,} active jobs, {len(roles_output)} roles)"
        )

        # Automatické generování a synchronizace llms.txt a llms-full.txt
        generate_llms_txt(payload)

        return payload
    finally:
        con.close()


def generate_llms_txt(payload: dict[str, Any]) -> None:
    """Generuje /public/llms.txt a /public/llms-full.txt podle standardu llmstxt.org."""
    meta = payload["meta"]
    mv = payload["market_vitality"]
    ha = payload["headcount_analytics"]
    roles = payload["roles"]
    gcp = payload["gcp_hub"]
    trend = payload["trend_radar"]

    # 1. llms.txt (Lehký přehledový manifest)
    llms_txt = f"""# Vector87.com | Quantitative Telemetry of the Global AI & Data Job Market

> Vector87.com is an open, static data and intelligence hub monitoring the direction of the AI, ML, Data Science, and Analytics job market across S&P 500 corporations, frontier technology leaders, and Europe. Data is aggregated directly from corporate ATS platforms into a local DuckDB analytical warehouse and exported into deterministic static JSON contracts.

## Core Market Telemetry (Snapshot: {meta['latest_snapshot_date']})
- **Active AI & Data Job Postings**: {mv['total_ai_data_jobs']:,}
- **S&P 500 AI/Data Postings**: {mv['sp500_ai_data_jobs']:,} ({mv['sp500_ai_intensity_pct']}% of total corporate hiring pool)
- **S&P 500 Enterprise Coverage**: {mv['sp500_hiring_companies']} hiring / {meta['sp500_tracked_companies']} tracked firms
- **Tracked Occupied Workforce (Headcount)**: {ha['total_occupied_seats']:,} data/AI team seats across {ha['tracked_companies_count']} enterprises
- **Hands-on (IC) to Management Ratio**: {payload['hierarchy_shift']['ic_to_management_ratio']} : 1 ({payload['hierarchy_shift']['ic_share_pct']}% IC vs {payload['hierarchy_shift']['management_share_pct']}% Management)

## Key Pages & Endpoints
- [Market Dashboard](https://vector87.com/): Core telemetry covering vitality, cloud stack, S&P 500 sector heatmap, hierarchy ratios, and emerging technology signals.
- [Czech Version / Česká verze](https://vector87.com/cs/): Kompletní zrcadlo v češtině.
- [Role Analysis](https://vector87.com/roles): 21 canonical AI & Data roles with synthesized job descriptions, required competencies, and team expansion velocity.
- [Cloud & Tech Hub](https://vector87.com/cloud-tech): In-depth market telemetry across cloud ecosystems (AWS, Azure, GCP) and platforms (Databricks, Snowflake).
- [Education Academy](https://vector87.com/academy): 3 structured learning tracks (Analytics Engineering, Cloud Data Engineering, Applied AI/LLMOps) and essential architectural literature.
- [About Author](https://vector87.com/about): Background of Antonín Kučera (akucera.eu), project philosophy, and essays on Data-Informed leadership.

## Machine-Readable Data Contracts
- [JSON Schema](https://vector87.com/schema/market-data.schema.json): Formal draft 2020-12 schema specification.
- [Full Text for LLMs](https://vector87.com/llms-full.txt): Complete uncompressed textual dump of all synthesized role profiles, skills, and telemetry for direct ingestion.
"""

    LLMS_TXT_PATH.parent.mkdir(parents=True, exist_ok=True)
    LLMS_TXT_PATH.write_text(llms_txt.strip() + "\n", encoding="utf-8")

    # 2. llms-full.txt (Detailní datový a syntetický výtah pro AI agenty)
    full_lines = [
        f"# Vector87.com | Complete Telemetry & Role Syntheses (Snapshot {meta['latest_snapshot_date']})",
        "",
        "## 1. Executive Summary & Market Vitality",
        f"- Total Active AI & Data Jobs: {mv['total_ai_data_jobs']:,}",
        f"- Total Corporate Hiring Pool (all departments): {mv['total_open_jobs_pool']:,}",
        f"- S&P 500 AI Hiring Intensity: {mv['sp500_ai_intensity_pct']}% of all open jobs",
        f"- Tracked Headcount Base (Coresignal / LinkedIn): {ha['total_occupied_seats']:,} occupied data/AI seats across {ha['tracked_companies_count']} companies",
        f"- Organizational Shift: {payload['hierarchy_shift']['ic_to_management_ratio']} : 1 in favor of Individual Contributors",
        "",
        "## 2. Emerging Paradigms & Trend Radar Signals",
    ]

    for kw in trend["keywords"]:
        full_lines.append(f"- **{kw['label']}** ({kw['category']}): {kw['job_count']:,} postings ({kw['penetration_pct']}% market penetration) | Stage: {kw['signal_stage']}")

    full_lines.extend([
        "",
        "## 3. Google Cloud (GCP) Telemetry",
        f"- Total GCP Ecosystem Postings: {gcp['total_gcp_ecosystem_jobs']:,} ({gcp['gcp_share_of_all_jobs_pct']}% of all data jobs, {gcp['gcp_share_of_cloud_jobs_pct']}% of cloud jobs)",
    ])
    for s in gcp["services"]:
        full_lines.append(f"- {s['service_name']} ({s['category']}): {s['job_count']:,} postings ({s['penetration_in_gcp_pct']}% of GCP positions) | Paired with: {', '.join(s['top_paired_skills'])}")

    full_lines.extend([
        "",
        "## 4. Canonical Role Analysis & Syntheses (21 Profiles)",
    ])

    for r in roles:
        full_lines.append(f"### {r['canonical_name']} ({r['domain']} • {r['track']})")
        full_lines.append(f"- Active Job Postings: {r['job_count']:,} ({r['market_share_pct']}% of market)")
        if r.get("occupied_seats"):
            full_lines.append(f"- Installed Workforce Base: {r['occupied_seats']:,} occupied seats (Expansion Index: {r.get('expansion_index_pct')}%)")
        full_lines.append(f"- Seniority Skew (Senior+): {r['senior_plus_pct']}% | Remote Share: {r['remote_pct']}%")
        full_lines.append("- Synthesized Profile (English):")
        for p in r["synthesized_description"]["en"]:
            full_lines.append(f"  {p}")
        full_lines.append("- Syntetizovaný profil (Čeština):")
        for p in r["synthesized_description"]["cs"]:
            full_lines.append(f"  {p}")
        skills_str = ", ".join(f"{s['skill_name']} ({s['penetration_pct']}%)" for s in r["top_skills"][:5])
        tech_str = ", ".join(f"{t['skill_name']} ({t['penetration_pct']}%)" for t in r["top_technologies"][:5])
        comps_str = ", ".join(f"{c['company_name']} ({c['job_count']})" for c in r["top_companies"][:4])
        full_lines.append(f"- Core Skills: {skills_str or 'N/A'}")
        full_lines.append(f"- Technology Stack: {tech_str or 'N/A'}")
        full_lines.append(f"- Top Hiring Companies: {comps_str or 'N/A'}")
        full_lines.append("")

    full_lines.extend([
        "## 5. Author & Methodology",
        "Author: Antonín Kučera (akucera.eu) | Data & BI Leader, Google Cloud & BigQuery specialist.",
        "Methodology: Continuous scraping of ATS endpoints across S&P 500, EU leaders, and consultancies; normalized through DuckDB regex taxonomies and point-in-time snapshotting.",
        "License: CC BY 4.0 Vector87.com / Antonín Kučera."
    ])

    LLMS_FULL_TXT_PATH.write_text("\n".join(full_lines).strip() + "\n", encoding="utf-8")
    print(f"[Vector87 Exporter] Generated {LLMS_TXT_PATH} and {LLMS_FULL_TXT_PATH} successfully.")


def validate_against_contract(payload: dict[str, Any]) -> None:
    """Rychlá strukturální kontrola proti schema/market-data.schema.json bez externích závislostí."""
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    for req_key in schema.get("required", []):
        if req_key not in payload:
            raise ValueError(f"Missing required top-level key in exported JSON: {req_key}")
        sub_schema = schema["properties"].get(req_key, {})
        if sub_schema.get("type") == "object":
            for sub_req in sub_schema.get("required", []):
                if sub_req not in payload[req_key]:
                    raise ValueError(f"Missing required key '{req_key}.{sub_req}' in exported JSON")
    if not isinstance(payload.get("roles"), list) or len(payload["roles"]) == 0:
        raise ValueError("Exported 'roles' array must not be empty")
    for role in payload["roles"]:
        desc = role.get("synthesized_description", {})
        if not isinstance(desc, dict) or len(desc.get("en", [])) != 2 or len(desc.get("cs", [])) != 2:
            raise ValueError(
                f"Role '{role.get('category_id')}' must have localized 'en' and 'cs' arrays of 2 paragraphs in synthesized_description"
            )


if __name__ == "__main__":
    export_market_data()
