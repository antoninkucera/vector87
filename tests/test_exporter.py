"""
Testy pro exportní pipeline Vector87.com.
Ověřují strukturu JSON kontraktu, přítomnost 2-odstavcových popisů rolí,
nových GCP/Trend Radar skillů a detekci porušení schématu.
"""

from __future__ import annotations

import copy
import json
import unittest

from pipeline.export_market_data import (
    OUTPUT_PATH,
    validate_against_contract,
)


class TestVector87Exporter(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(OUTPUT_PATH.exists(), "market-data.json must exist")
        self.payload = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))

    def test_exported_json_matches_contract_and_data_invariants(self) -> None:
        validate_against_contract(self.payload)

        # 1. Tržní vitalita
        mv = self.payload["market_vitality"]
        self.assertGreater(mv["total_ai_data_jobs"], 5000)
        self.assertGreater(mv["sp500_ai_data_jobs"], 4000)
        self.assertGreater(mv["sp500_ai_intensity_pct"], 0)
        self.assertLess(mv["sp500_ai_intensity_pct"], 15)

        # 2. Trend Radar a GCP Hub obsahují nově doplněnou taxonomii
        radar_ids = {k["skill_id"] for k in self.payload["trend_radar"]["keywords"]}
        self.assertTrue({"genai", "semantic_layer", "vertex_ai", "dataform", "ai_agents"}.issubset(radar_ids))

        gcp_ids = {s["skill_id"] for s in self.payload["gcp_hub"]["services"]}
        self.assertEqual({"gcp", "bigquery", "vertex_ai", "looker", "dataflow", "dataform"}, gcp_ids)

        # 3. Každá role má 2 odstavce, skills, technologie, firmy a odvětví
        self.assertEqual(len(self.payload["roles"]), 21)
        for role in self.payload["roles"]:
            self.assertEqual(len(role["synthesized_description"]), 2)
            for p in role["synthesized_description"]:
                self.assertIsInstance(p, str)
                self.assertGreater(len(p), 40)
            self.assertIn("top_skills", role)
            self.assertIn("top_technologies", role)
            self.assertIn("top_companies", role)
            self.assertIn("top_sectors", role)

    def test_contract_validation_fails_on_broken_payload(self) -> None:
        broken = copy.deepcopy(self.payload)
        broken["roles"][0]["synthesized_description"] = ["Pouze jeden odstavec"]

        with self.assertRaisesRegex(ValueError, "must have exactly 2 paragraphs"):
            validate_against_contract(broken)

        broken_missing_key = copy.deepcopy(self.payload)
        del broken_missing_key["gcp_hub"]
        with self.assertRaisesRegex(ValueError, "Missing required top-level key"):
            validate_against_contract(broken_missing_key)


if __name__ == "__main__":
    unittest.main()
