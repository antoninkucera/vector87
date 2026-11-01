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
    if MAP_PATHS_OUTPUT.exists():
        with open(MAP_PATHS_OUTPUT, "r", encoding="utf-8") as f:
            return json.load(f)

    print("Fetching world topology (world-110m) and ISO codes...")
    topo_url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
    iso_url = "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json"

    with httpx.Client(timeout=30.0) as client:
        topo = client.get(topo_url).json()
        iso_list = client.get(iso_url).json()

    num_to_a3 = {item["country-code"].zfill(3): item["alpha-3"] for item in iso_list}
    # Kosovo manuální doplnění
    num_to_a3["-99"] = "XKX"

    scale = topo["transform"]["scale"]
    translate = topo["transform"]["translate"]
    arcs = topo["arcs"]

    def decode_arc(arc_idx: int) -> list[tuple[float, float]]:
        raw_arc = arcs[~arc_idx] if arc_idx < 0 else arcs[arc_idx]
        pts = []
        x, y = 0, 0
        for dx, dy in raw_arc:
            x += dx
            y += dy
            pts.append((x * scale[0] + translate[0], y * scale[1] + translate[1]))
        if arc_idx < 0:
            pts.reverse()
        return pts

    def project(lon: float, lat: float, w: float = 960.0, h: float = 500.0) -> str:
        # Equirectangular (Plate Carrée) projekce se středem na Greenwici
        # Oříznutí pólů pro čistší poměr stran
        lat_clamped = max(-84.0, min(84.0, lat))
        px = round((lon + 180.0) * (w / 360.0), 1)
        py = round((90.0 - lat_clamped) * (h / 180.0), 1)
        return f"{px},{py}"

    paths: dict[str, str] = {}
    for idx, c in enumerate(topo["objects"]["countries"]["geometries"]):
        raw_id = str(c.get("id", f"c_{idx}")).zfill(3)
        iso3 = num_to_a3.get(raw_id)
        if not iso3:
            continue

        geom_type = c["type"]
        c_arcs = c["arcs"]
        parts = []

        if geom_type == "Polygon":
            for ring in c_arcs:
                ring_pts = []
                for a_idx in ring:
                    decoded = decode_arc(a_idx)
                    if ring_pts and decoded:
                        ring_pts.extend(decoded[1:])
                    else:
                        ring_pts.extend(decoded)
                if ring_pts:
                    parts.append("M" + "L".join(project(p[0], p[1]) for p in ring_pts) + "Z")
        elif geom_type == "MultiPolygon":
            for poly in c_arcs:
                for ring in poly:
                    ring_pts = []
                    for a_idx in ring:
                        decoded = decode_arc(a_idx)
                        if ring_pts and decoded:
                            ring_pts.extend(decoded[1:])
                        else:
                            ring_pts.extend(decoded)
                    if ring_pts:
                        parts.append("M" + "L".join(project(p[0], p[1]) for p in ring_pts) + "Z")

        if parts:
            paths[iso3] = " ".join(parts)

    MAP_PATHS_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(MAP_PATHS_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(paths, f, ensure_ascii=False)

    print(f"Saved {len(paths)} projected country paths to {MAP_PATHS_OUTPUT}.")
    return paths



def export_places_data() -> None:
    db_path = Path(os.environ.get("WORLD_STATS_DB_PATH", str(DEFAULT_WORLD_DB_PATH)))
    if not db_path.exists():
        raise FileNotFoundError(f"World Stats DuckDB database not found at {db_path}")

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
                norm_housing_cost_overburden
            FROM v_country_profiles
            ORDER BY is_focus_country DESC, country_name ASC
        """).fetchall()

        countries_list = []
        focus_count = 0

        for row in profiles:
            (
                c_a3, c_a2, c_name, continent, subregion, is_focus, is_eu, has_reg,
                norm_gdp, norm_le, norm_peace, norm_rol, norm_ps, norm_ge, norm_pli, norm_hco
            ) = row

            if is_focus:
                focus_count += 1

            # Výpočet pilířů (0-100)
            safety_score = mean_of_valid([norm_peace, norm_ps])
            housing_score = mean_of_valid([norm_hco, norm_pli])
            economy_score = mean_of_valid([norm_gdp, norm_le])
            gov_score = mean_of_valid([norm_rol, norm_ge])

            # Kompozitní skóre pro defaultní váhy (rovnoměrně přes dostupné pilíře)
            available_scores = []
            if safety_score is not None:
                available_scores.append(safety_score)
            if housing_score is not None:
                available_scores.append(housing_score)
            if economy_score is not None:
                available_scores.append(economy_score)
            if gov_score is not None:
                available_scores.append(gov_score)

            composite = round(sum(available_scores) / len(available_scores), 1) if available_scores else None

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
                    "composite_score": composite,
                },
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
            "sources": ["World Bank Open Data", "Eurostat", "Institute for Economics & Peace"],
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
