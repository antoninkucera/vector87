# Information Architecture & Organic Search Strategy — Vector87.com

Single source of truth for Vector87's website information architecture (IA), keyword & search intent clusters, URL hierarchy, and programmatic SEO structure.

---

## 1. Executive Strategy: Data-Backed Authority & Unfair Advantage

Vector87 tracks real-world data and AI labor market demands across S&P 500 and European enterprises via DuckDB.
To scale organic search acquisition without paid advertising, Vector87 combines:
1. **Programmatic Landing Pages**: Structured, data-driven URLs matching high-intent comparison and technology queries.
2. **Authoritative Domain Depth (E-E-A-T)**: Deep-dive enterprise cloud expertise (specifically Google Cloud Platform & BigQuery architecture) directly authored by Antonín Kučera.
3. **Bidirectional Audience Mesh**: Cross-linking between Vector87 telemetry, [akucera.eu](https://akucera.eu), and Substack deep-dives ([antoninkucera.substack.com](https://antoninkucera.substack.com)).

---

## 2. Search Intent Clusters & Keyword Mapping

| Cluster | Primary Search Queries (EN / CS) | User Search Intent | Landing Page Pattern |
|---|---|---|---|
| **A. Role Requirements & Roadmaps** | `data engineer skills`, `data engineer roadmap`, `co musi umet data engineer`, `junior data engineer requirements`, `data analyst to data engineer` | Decision / Career transition | `/roles/[id]` and `/cs/roles/[id]` |
| **B. Role vs. Role Comparisons** | `data analyst vs data engineer`, `ai developer vs ml engineer`, `data engineer vs data scientist`, `analytics engineer vs bi developer` | Comparative / Career selection | `/compare/[role-a]-vs-[role-b]` |
| **C. Technology Battles** | `databricks vs snowflake`, `bigquery vs snowflake`, `aws vs azure vs gcp for data`, `dbt vs spark` | Technical architecture / Stack choice | `/compare/[tech-a]-vs-[tech-b]` |
| **D. Cloud Platforms & GCP Hub** | `gcp data engineer stack`, `bigquery job market demand`, `vertex ai enterprise adoption`, `google cloud vs aws data jobs` | Platform specialization / Architectural validation | `/technologies/[tech-id]` and `/technologies/gcp` |

---

## 3. Site Navigation & URL Hierarchy

The site uses a dual-locale architecture (`/` default English, `/cs/` Czech) following the *Generic base + delta* principle.

```
vector87.com/
│
├── / (Market Dashboard — macro velocity, market vitality, top gaining stacks)
│
├── /roles/ (21 Canonical Roles directory)
│   ├── /roles/data-engineer/
│   ├── /roles/ai-developer/
│   └── /roles/[role-id]/
│
├── /technologies/ (Tracked Technologies & Platforms from DuckDB)
│   ├── /technologies/ (Index of all tracked skills, platforms & tools)
│   ├── /technologies/gcp/           <-- GCP Cloud Hub (Cloud, BigQuery, Vertex AI, Dataform)
│   ├── /technologies/bigquery/      <-- Flagship architectural deep-dive
│   ├── /technologies/databricks/
│   ├── /technologies/snowflake/
│   └── /technologies/[tech-id]/
│
├── /compare/ (Programmatic Head-to-Head Comparison Matrix)
│   │── [Role vs Role]
│   ├── /compare/data-analyst-vs-data-engineer/
│   ├── /compare/ai-developer-vs-ml-engineer/
│   ├── /compare/data-engineer-vs-data-scientist/
│   │── [Tech vs Tech]
│   ├── /compare/databricks-vs-snowflake/
│   ├── /compare/bigquery-vs-snowflake/
│   └── /compare/aws-vs-azure-vs-gcp/
│
├── /academy/ (Curated Learning Pathways & Media)
│   ├── /academy/ (Curated courses, certifications & reading list)
│   └── /academy/podcasts/ (500+ curated multimedia episodes & AI digests)
│
├── /places/ (Future Tracker — Country Livability & Relocation Matrix)
├── /methodology/ (Data collection rigor, sample sizes, DuckDB pipelines)
└── /about/ (Author credentials, contact, and Substack integration)
```

---

## 4. E-E-A-T & Substack Bidirectional Mesh

To establish search engine authority and direct subscriber conversion:

### A. Vector87 -> Substack & akucera.eu Links
1. **GCP & BigQuery Pages (`/technologies/bigquery`, `/technologies/gcp`)**:
   - Feature contextual editorial cards linking to Antonín Kučera's hands-on architectural essays:
     - **Czech**: [BigQuery Overview: Nový rozcestník v komplexním světě datové platformy](https://antoninkucera.substack.com/p/bigquery-overview-novy-rozcestnik-v-komplexnim-svete-dat)
     - **English**: [BigQuery Overview: A New Navigation Hub in the Complex Analytics Platform](https://antoninkucera.substack.com/p/bigquery-overview-a-new-navigation-hub-in-the-complex-analytics-platform)
     - Enterprise Telemetry: [Mastering Tableau Cloud Logs: From S3 to hundreds of fields in BigQuery](https://antoninkucera.substack.com/p/mastering-tableau-cloud-logs-from-s3-to-a-hundreds-fields-in-bigquery)
     - Philosophy: [No Blueprint Exists: Why AI Made Me Double Down on Being Data-Informed](https://antoninkucera.substack.com/p/no-blueprint-exists-why-ai-made-me-double-down-on-being-data-informed)
2. **Newsletter Signup Cards (`NewsletterCta.astro`)**:
   - Embedded directly on Homepage and Role detail pages to capture returning traffic.

### B. Substack -> Vector87 Inbound Authority Links
In all Substack publications concerning market trends, hiring, BigQuery, or data engineering:
- Embed canonical live telemetry widgets / links back to `vector87.com/roles/[id]` or `vector87.com/technologies/[id]`.
- Provide permanent linkable references for data citations (e.g. *"Data verified by Vector87 live enterprise telemetry"*).

---

## 5. Implementation Roadmap for Programmatic Pages

1. **Phase 1: Polish Foundation (Completed)**
   - Clean taxonomy exclusions in upstream `ai_data_jobs`.
   - Newsletter CTA component integration.
   - S&P 500 / Databricks telemetry copy consistency.
   - Localized Substack deep-dive links in `src/i18n/ui.ts`.

2. **Phase 2: Technology Landing Pages (`/technologies/`)**
   - Create shared dynamic route `src/pages/technologies/[id].astro` (and `src/pages/cs/technologies/[id].astro`).
   - Sourced from `tech_cloud_stack.top_technologies` and `gcp_hub.services` in `market-data.json`.
   - Flagship presentation for BigQuery and GCP with author commentary and Substack cross-links.

3. **Phase 3: Head-to-Head Comparison Engine (`/compare/`)**
   - Create route `src/pages/compare/[slug].astro`.
   - Side-by-side comparison tables: Job volume, Penetration %, Co-occurring skills, Hiring companies, Seniority ratio.
   - Initial high-impact pair launches:
     - `databricks-vs-snowflake`
     - `data-analyst-vs-data-engineer`
     - `bigquery-vs-snowflake`
