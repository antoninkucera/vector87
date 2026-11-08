import marketData from './market-data.json';
import { getTechnology } from './technologies';
import { ACADEMY_COURSES, CERTIFICATIONS_LIST, type AcademyCourse, type CertificationItem } from './academy';

export interface VennItem {
  name: string;
  pctA?: number;
  pctB?: number;
  detail: {
    en: string;
    cs: string;
  };
}

export interface ComparisonDefinition {
  slug: string; // canonical slug, e.g. 'data-analyst-vs-data-scientist'
  type: 'role' | 'technology';
  entityAId: string; // role category_id or tech id
  entityBId: string;
  aliases?: string[]; // reverse slug aliases, e.g. 'data-scientist-vs-data-analyst'
  title: {
    en: string;
    cs: string;
  };
  subtitle: {
    en: string;
    cs: string;
  };
  executiveSummary: {
    en: string[];
    cs: string[];
  };
  uniqueA: VennItem[];
  shared: VennItem[];
  uniqueB: VennItem[];
  careerTransition?: {
    title: {
      en: string;
      cs: string;
    };
    advice: {
      en: string[];
      cs: string[];
    };
    recommendedCourseIds?: string[];
    recommendedCertIds?: string[];
  };
}

export interface ComparisonResolved {
  slug: string;
  type: 'role' | 'technology';
  title: {
    en: string;
    cs: string;
  };
  subtitle: {
    en: string;
    cs: string;
  };
  executiveSummary: {
    en: string[];
    cs: string[];
  };
  entityA: {
    id: string;
    name: string;
    jobCount: number;
    marketSharePct: number;
    sp500SharePct?: number;
    seniorPlusPct?: number;
    remotePct?: number;
    topCompanies: Array<{ name: string; count: number }>;
    topSkills: Array<{ name: string; pct: number }>;
    kebabSlug: string;
  };
  entityB: {
    id: string;
    name: string;
    jobCount: number;
    marketSharePct: number;
    sp500SharePct?: number;
    seniorPlusPct?: number;
    remotePct?: number;
    topCompanies: Array<{ name: string; count: number }>;
    topSkills: Array<{ name: string; pct: number }>;
    kebabSlug: string;
  };
  uniqueA: VennItem[];
  shared: VennItem[];
  uniqueB: VennItem[];
  careerTransition?: {
    title: {
      en: string;
      cs: string;
    };
    advice: {
      en: string[];
      cs: string[];
    };
    courses: AcademyCourse[];
    certifications: CertificationItem[];
  };
}

export const COMPARISONS_CATALOG: ComparisonDefinition[] = [
  // 1. Data Analyst vs. Data Scientist
  {
    slug: 'data-analyst-vs-data-scientist',
    type: 'role',
    entityAId: 'data_analyst',
    entityBId: 'data_scientist',
    aliases: ['data-scientist-vs-data-analyst'],
    title: {
      en: 'Data Analyst vs. Data Scientist: What the Market Demands',
      cs: 'Data Analyst vs. Data Scientist: Srovnání dovedností a požadavků trhu',
    },
    subtitle: {
      en: 'An empirical comparison of job posting requirements across S&P 500 corporations: shared analytical foundations, diverging tools, and machine learning boundaries.',
      cs: 'Empirické srovnání požadavků z inzerátů předních korporací: společný analytický základ, rozdílné nástroje a hranice strojového učení.',
    },
    executiveSummary: {
      en: [
        'The boundary between Data Analysts and Data Scientists is frequently misunderstood. In production enterprise environments, the distinction is clear: Data Analysts interpret historical and current business performance to guide decision-making, while Data Scientists build predictive mathematical models and machine learning pipelines to forecast future outcomes.',
        'Both roles share a heavy reliance on SQL and data wrangling, but diverge fundamentally in their tooling: Data Analysts prioritize governed BI tools (Power BI, Tableau, Excel) and dimensional modeling, whereas Data Scientists require rigorous Python, PyTorch, scikit-learn, and experimental statistical inference.',
      ],
      cs: [
        'Hranice mezi Data Analystem a Data Scientistem bývá často zaměňována. V podnikové praxi je však rozdíl zřetelný: Data Analyst analyzuje historická a aktuální data pro podporu byznysových rozhodnutí, zatímco Data Scientist vytváří matematické a prediktivní modely strojového učení předpovídající budoucí vývoj.',
        'Obě role sdílejí nutnost pokročilého SQL a čištění dat. Zásadně se však rozcházejí v nástrojích: Analytik se soustředí na BI platformy (Power BI, Tableau, Excel) a dimenzionální modelování, zatímco Data Scientist na pokročilý Python, scikit-learn, PyTorch a statistické testování hypotéz.',
      ],
    },
    uniqueA: [
      {
        name: 'Power BI & Tableau',
        pctA: 35.3,
        detail: {
          en: 'Executive reporting, interactive self-service dashboards, and DAX metric formulation.',
          cs: 'Manažerský reporting, tvorba interaktivních dashboardů a vývoj metrik v DAX.',
        },
      },
      {
        name: 'Advanced Excel & Modeling',
        pctA: 35.3,
        detail: {
          en: 'Financial modeling, ad-hoc scenario simulations, and cross-functional business communication.',
          cs: 'Finanční a ad-hoc modelování, simulace scénářů a komunikace napříč byznysem.',
        },
      },
      {
        name: 'Business Performance KPIs',
        detail: {
          en: 'Designing metric trees, churn analytics, revenue tracking, and stakeholder alignment.',
          cs: 'Definice metrik, analýza retence zákazníků, sledování tržeb a komunikace s vedením.',
        },
      },
      {
        name: 'Looker & Semantic Layers',
        pctA: 4.8,
        detail: {
          en: 'Governed business metrics definition (LookML) and single-source-of-truth semantic models.',
          cs: 'Definice jednotných firemních metrik v sémantické vrstvě (LookML).',
        },
      },
    ],
    shared: [
      {
        name: 'SQL (Structured Query Language)',
        pctA: 55.0,
        pctB: 73.3,
        detail: {
          en: 'Complex CTEs, window functions, relational aggregations, and warehouse data retrieval.',
          cs: 'Komplexní CTE, window functions, agregace a extrakce dat z cloudových skladů.',
        },
      },
      {
        name: 'Python for Data Analysis',
        pctA: 40.8,
        pctB: 89.2,
        detail: {
          en: 'Data wrangling, pandas/Polars, exploratory data analysis (EDA), and data cleaning.',
          cs: 'Čištění a transformace dat, pandas/Polars, explorační analýza (EDA).',
        },
      },
      {
        name: 'Data Governance & Quality',
        pctA: 30.7,
        pctB: 15.6,
        detail: {
          en: 'Ensuring data veracity, handling missing values, metric standardization, and pipeline audits.',
          cs: 'Ověřování přesnosti dat, ošetření anomálií a kontrola kvality pipeline.',
        },
      },
      {
        name: 'Cloud Data Platforms (AWS / Azure / GCP)',
        pctA: 19.3,
        pctB: 35.1,
        detail: {
          en: 'Interacting with modern cloud warehouses (Snowflake, BigQuery, Databricks).',
          cs: 'Práce s moderními cloudovými sklady (Snowflake, BigQuery, Databricks).',
        },
      },
      {
        name: 'A/B Testing & Statistical Basics',
        detail: {
          en: 'Hypothesis testing, significance levels, conversion experiments, and sample sizing.',
          cs: 'Testování hypotéz, statistická významnost, A/B experimenty a velikosti vzorku.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Machine Learning (scikit-learn, XGBoost)',
        pctB: 45.2,
        detail: {
          en: 'Supervised & unsupervised learning, classification, regression, and clustering algorithms.',
          cs: 'Trénování modelů pod dohledem i bez něj, klasifikace, regrese a shlukování.',
        },
      },
      {
        name: 'Deep Learning & Neural Networks (PyTorch)',
        pctB: 14.6,
        detail: {
          en: 'Neural architecture design, tensor operations, backpropagation, and GPU acceleration.',
          cs: 'Architektury neuronových sítí, tenzorové výpočty a akcelerace na GPU.',
        },
      },
      {
        name: 'LLM & Generative AI Integration',
        pctB: 21.8,
        detail: {
          en: 'Prompt engineering, fine-tuning foundation models, embedding spaces, and RAG architectures.',
          cs: 'Práce s velkými jazykovými modely, fine-tuning, embeddingy a RAG systémy.',
        },
      },
      {
        name: 'MLOps & Experiment Tracking (MLflow)',
        pctB: 19.1,
        detail: {
          en: 'Model registry, automated evaluations, metric tracking, and deployment to production.',
          cs: 'Správa modelů v MLflow, systematické evaluace a nasazování modelů do produkce.',
        },
      },
    ],
    careerTransition: {
      title: {
        en: 'Bridging the Gap: Moving from Data Analyst to Data Scientist',
        cs: 'Kariérní přechod: Jak se posunout z Data Analysta na Data Scientista',
      },
      advice: {
        en: [
          'Master Statistical Inference: Move beyond descriptive statistics (mean, median, standard deviation) to causal inference, confidence intervals, and hypothesis testing.',
          'Level up Python from Scripting to Production: Transition from casual notebook analysis to writing modular, testable Python with object-oriented principles and virtual environments.',
          'Learn Classical Machine Learning First: Before jumping into LLMs, thoroughly understand logistic regression, decision trees, random forests, and gradient boosting (XGBoost/LightGBM).',
          'Build an End-to-End ML Project: Train a model on real-world messy data, deploy it as an API with FastAPI/Docker, and log experiments with MLflow.',
        ],
        cs: [
          'Ovládněte statistickou inferenci: Posuňte se od pouhé deskriptivní statistiky k testování hypotéz, kauzální inferenci a rigoróznímu vyhodnocování experimentů.',
          'Zlepšete Python z notebooků do modulárního kódu: Pište znovupoužitelný, testovatelný kód s ošetřením chyb namísto jednorázových skriptů v Jupyteru.',
          'Začněte klasickým strojovým učením: Než skočíte do hlubokých neuronových sítí a LLM, detailně pochopte regresi, rozhodovací stromy a gradient boosting (XGBoost/LightGBM).',
          'Postavte ucelený projekt: Natrénujte model na reálných datech, zabalte ho do API přes FastAPI a nasadťe v Docker kontejneru s logováním experimentů v MLflow.',
        ],
      },
      recommendedCourseIds: ['course-ibm-ds', 'course-dl-genai', 'course-google-bi'],
      recommendedCertIds: ['cert-databricks-de', 'cert-gcp-pde'],
    },
  },

  // 2. Data Analyst vs. Data Engineer
  {
    slug: 'data-analyst-vs-data-engineer',
    type: 'role',
    entityAId: 'data_analyst',
    entityBId: 'data_engineer',
    aliases: ['data-engineer-vs-data-analyst'],
    title: {
      en: 'Data Analyst vs. Data Engineer: Skills, Scope & Overlap',
      cs: 'Data Analyst vs. Data Engineer: Rozdíl v dovednostech a požadavcích',
    },
    subtitle: {
      en: 'Comparing business-facing analytical roles with backend infrastructure engineering across S&P 500 job postings.',
      cs: 'Porovnání byznysově orientované analytiky a backendového inženýrství na datech podle reálných inzerátů.',
    },
    executiveSummary: {
      en: [
        'Data Analysts and Data Engineers form the core symbiotic pair in modern data teams. The Data Engineer builds, scales, and maintains the data pipelines, lakes, and warehouses that ingest raw telemetry. The Data Analyst consumes that modeled data to uncover business trends, build dashboards, and advise leadership.',
        'While both roles rely heavily on SQL and data governance, Data Engineers operate as backend software engineers utilizing distributed compute (Apache Spark), orchestrators (Apache Airflow), and cloud infrastructure (AWS S3, Databricks, Snowflake). Analysts operate closer to business stakeholders utilizing BI platforms and dimensional modeling.',
      ],
      cs: [
        'Data Analyst a Data Engineer tvoří klíčový tandem v moderních datových týmech. Data Engineer navrhuje, staví a udržuje infrastrukturu, která sbírá a transformuje surová data do spolehlivých skladů. Data Analyst nad těmito daty staví metriky, dashboardy a pomáhá byznysu v rozhodování.',
        'Obě role denně pracují se SQL a kvalitou dat. Data Engineer však vystupuje jako backendový softwarový inženýr: ovládá distribuované výpočty (Apache Spark), orchestrátory (Apache Airflow) a cloudové platformy (AWS S3, Databricks, Snowflake). Analytik se soustředí na sémantiku, metriky a vizualizaci.',
      ],
    },
    uniqueA: [
      {
        name: 'Power BI & Tableau',
        pctA: 35.3,
        detail: {
          en: 'Interactive business reporting, executive dashboards, and visual storytelling.',
          cs: 'Interaktivní reporting pro vedení firmy, dashboardy a vizualizace dat.',
        },
      },
      {
        name: 'Spreadsheet Analytics (Excel)',
        pctA: 35.3,
        detail: {
          en: 'Ad-hoc stakeholder queries, financial logic, and spreadsheet modeling.',
          cs: 'Rychlé ad-hoc dotazy pro byznys, finanční logika a tabulkové modely.',
        },
      },
      {
        name: 'Stakeholder & Commercial KPI Alignment',
        detail: {
          en: 'Translating vague business questions into actionable quantitative metrics.',
          cs: 'Překlad byznysových požadavků do exaktních měřitelných metrik.',
        },
      },
    ],
    shared: [
      {
        name: 'SQL (Structured Query Language)',
        pctA: 55.0,
        pctB: 64.5,
        detail: {
          en: 'Relational data modeling, table joins, window functions, and schema design.',
          cs: 'Relační datové modelování, spojování tabulek, window functions a návrh schémat.',
        },
      },
      {
        name: 'Python Programming',
        pctA: 40.8,
        pctB: 66.8,
        detail: {
          en: 'Data transformation scripts, API integrations, and automated pipelines.',
          cs: 'Transformační skripty, integrace API a automatizované pipeline.',
        },
      },
      {
        name: 'Data Governance, Testing & Quality',
        pctA: 30.7,
        pctB: 46.3,
        detail: {
          en: 'Ensuring schema consistency, testing data contracts, and lineage tracking.',
          cs: 'Konzistence schémat, testování datových kontraktů a sledování původu dat (lineage).',
        },
      },
      {
        name: 'Cloud Warehouses (Snowflake, BigQuery, Databricks)',
        pctA: 15.2,
        pctB: 58.7,
        detail: {
          en: 'Querying and organizing datasets in modern cloud lakehouses.',
          cs: 'Ukládání a dotazování dat v moderních cloudových skladech.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Distributed Compute (Apache Spark / PySpark)',
        pctB: 42.6,
        detail: {
          en: 'Petabyte-scale distributed processing, streaming transformations, and cluster memory tuning.',
          cs: 'Zpracování obrovských objemů dat (Big Data), streaming a správa paměti clusterů.',
        },
      },
      {
        name: 'Workflow Orchestration (Apache Airflow / Dagster)',
        pctB: 20.4,
        detail: {
          en: 'DAG design, dependency scheduling, automated retries, and backfilling pipelines.',
          cs: 'Návrh DAG grafů, plánování závislostí, automatické retry a zpětné dopočty.',
        },
      },
      {
        name: 'Cloud Infrastructure & Lakehouse (AWS S3, Delta Lake)',
        pctB: 39.9,
        detail: {
          en: 'Object storage partitioning, IAM access controls, table formats (Iceberg/Delta), and Terraform.',
          cs: 'Partitioning v S3/GCS, přístupová práva, otevřené formáty (Iceberg/Delta) a Terraform.',
        },
      },
      {
        name: 'Data Transformation with dbt (data build tool)',
        pctB: 18.3,
        detail: {
          en: 'Modular ELT pipelines, automated schema tests, Git CI/CD, and table materializations.',
          cs: 'Modulární ELT pipeline v dbt, automatizované testy v CI/CD a materializace tabulek.',
        },
      },
    ],
    careerTransition: {
      title: {
        en: 'Transitioning from Data Analyst to Data Engineer',
        cs: 'Kariérní přechod: Jak se posunout z Analytika na Data Engineera',
      },
      advice: {
        en: [
          'Adopt Software Engineering Habits: Learn Git branch workflows, write unit tests for your transformation logic, and use Docker for local reproducible development.',
          'Start with dbt (Analytics Engineering): The most natural stepping stone is mastering dbt. It leverages your existing SQL strength while introducing modular architecture and CI/CD.',
          'Learn Distributed Systems Concepts: Understand how data is partitioned, how shuffling impacts performance, and how columnar storage (Parquet) differs from row storage.',
          'Build an Ingestion Pipeline: Create an automated pipeline that extracts data from an external API, loads it into object storage, and materializes it into BigQuery or Snowflake.',
        ],
        cs: [
          'Osvojte si softwarové návyky: Začněte důsledně verzovat kód v Gitu, pište testy pro transformační logiku a naučte se pracovat s Docker kontejnery.',
          'Začněte přes dbt (Analytics Engineering): Nejlepším mezikrokem je dbt. Zúročíte svou sílu v SQL a zároveň se naučíte modulární architektuře a testování v CI/CD.',
          'Pochopte distribuované systémy: Zjistěte, jak funguje partitioning, jak shuffling zpomaluje výpočty a jak se liší sloupcové ukládání (Parquet) od řádkového.',
          'Postavte reálnou pipeline: Vytvořte proces, který automaticky stahuje data z externího REST API, ukládá je do S3/Cloud Storage a čistí v BigQuery nebo Snowflake.',
        ],
      },
      recommendedCourseIds: ['course-de-zoomcamp', 'course-data-eng-foundations'],
      recommendedCertIds: ['cert-databricks-de', 'cert-gcp-pde'],
    },
  },

  // 3. AI Developer vs. Machine Learning Engineer
  {
    slug: 'ai-developer-vs-ml-engineer',
    type: 'role',
    entityAId: 'ai_developer',
    entityBId: 'ml_engineer',
    aliases: ['ml-engineer-vs-ai-developer'],
    title: {
      en: 'AI Developer vs. ML Engineer: Generative AI vs. Core Modeling',
      cs: 'AI Developer vs. ML Engineer: Generativní AI vs. Trénování modelů',
    },
    subtitle: {
      en: 'Deconstructing modern AI job descriptions: application-level LLM integrations and agent architectures vs. foundational training and low-latency inference systems.',
      cs: 'Rozbor požadavků v AI: aplikační integrace LLM modelů a agentů vs. trénování vlastních modelů a nízkolatenční inferenční systémy.',
    },
    executiveSummary: {
      en: [
        'The explosion of Large Language Models created a distinct specialization: the AI Developer. While Machine Learning Engineers focus on mathematical modeling, distributed training, feature engineering, and MLOps, AI Developers operate primarily at the application software layer.',
        'AI Developers integrate pre-trained foundation models (Gemini, Claude, GPT-4) into products using agentic frameworks (LangGraph, CrewAI), Vector Search / RAG pipelines, and automated evaluations. ML Engineers build custom architectures, fine-tune models from scratch in PyTorch, and optimize GPU inference servers.',
      ],
      cs: [
        'Rozmach velkých jazykových modelů dal vzniknout nové roli: AI Developerovi. Zatímco Machine Learning Engineer se soustředí na matematické modelování, trénování modelů a robustní MLOps infrastrukturu, AI Developer pracuje primárně na aplikační softwarové vrstvě.',
        'AI Developer integruje hotové základní modely (Gemini, Claude, GPT-4) do produktů pomocí agentních frameworků (LangGraph, CrewAI), vektorového vyhledávání (RAG) a evaluačních smyček. ML Engineer navrhuje architektury na míru, ladí váhy v PyTorch a optimalizuje GPU inferenční servery.',
      ],
    },
    uniqueA: [
      {
        name: 'AI Agents & Agentic Workflows',
        pctA: 37.8,
        detail: {
          en: 'Tool calling, multi-agent coordination (LangGraph, CrewAI), and planning loops.',
          cs: 'Autonomní agenti, volání externích nástrojů (Function Calling) a orchestrace procesů.',
        },
      },
      {
        name: 'RAG Architectures & Vector Search',
        pctA: 28.4,
        detail: {
          en: 'Hybrid search, semantic chunking, dense vector databases, and cross-encoder reranking.',
          cs: 'Vektorové databáze, hybridní vyhledávání, sémantické dělení textu a reranking.',
        },
      },
      {
        name: 'Full-Stack & Product Engineering',
        detail: {
          en: 'TypeScript/FastAPI integrations, streaming WebSocket responses, and user-facing UX.',
          cs: 'Integrace do webových aplikací (TypeScript, FastAPI), streaming odpovědí a UX.',
        },
      },
      {
        name: 'LLM Evals & Guardrails',
        detail: {
          en: 'Prompt security, hallucination evaluation, latency control, and token cost optimization.',
          cs: 'Obrana proti prompt injection, evaluace halucinací a optimalizace nákladů na tokeny.',
        },
      },
    ],
    shared: [
      {
        name: 'Python Software Engineering',
        pctA: 67.9,
        pctB: 73.9,
        detail: {
          en: 'Asynchronous programming, API development, clean architecture, and packaging.',
          cs: 'Asynchronní programování, vývoj API, čistá architektura a testování v Pythonu.',
        },
      },
      {
        name: 'Cloud AI Infrastructure (AWS / GCP / Azure)',
        pctA: 42.1,
        pctB: 48.6,
        detail: {
          en: 'Deploying workloads on Vertex AI, AWS Bedrock, SageMaker, or Azure AI.',
          cs: 'Nasazování aplikací na Vertex AI, AWS Bedrock, SageMaker či Azure AI.',
        },
      },
      {
        name: 'Containerization & Deployment (Docker / Kubernetes)',
        pctA: 24.5,
        pctB: 38.2,
        detail: {
          en: 'Packaging models and microservices into reproducible containers.',
          cs: 'Kontejnerizace mikroslužeb a inferenčních endpointů v Dockeru a Kubernetes.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Deep Learning Frameworks (PyTorch / TensorFlow)',
        pctB: 42.1,
        detail: {
          en: 'Custom neural layer implementation, loss function design, and GPU memory optimization.',
          cs: 'Implementace vlastních vrstev neuronových sítí, návrh loss funkcí a správa GPU paměti.',
        },
      },
      {
        name: 'Distributed Model Training (Deepspeed, FSDP)',
        pctB: 18.5,
        detail: {
          en: 'Multi-GPU cluster training, gradient accumulation, and parameter sharding.',
          cs: 'Trénování na GPU clusterech, gradient accumulation a dělení parametrů.',
        },
      },
      {
        name: 'Low-Latency Inference Optimization (vLLM, TensorRT)',
        pctB: 24.2,
        detail: {
          en: 'Quantization (INT8/FP4), PagedAttention, batching, and KV-cache optimization.',
          cs: 'Kvantizace modelů, vLLM, TensorRT a optimalizace propustnosti a odezvy.',
        },
      },
      {
        name: 'Feature Stores & Pipeline MLOps',
        pctB: 22.8,
        detail: {
          en: 'Feature drift detection, automated retraining pipelines, and model registry governance.',
          cs: 'Detekce posunu dat (data drift), automatizované přetrénování a správa modelů.',
        },
      },
    ],
    careerTransition: {
      title: {
        en: 'Transitioning between AI Development and ML Engineering',
        cs: 'Kariérní přechod: AI Developer vs. ML Engineer',
      },
      advice: {
        en: [
          'For Software Engineers moving to AI Developer: Focus on mastering LLM APIs, prompt engineering frameworks, vector embeddings, and rigorous evaluation pipelines (Ragas, TruLens).',
          'For AI Developers moving to ML Engineer: Invest deeply in linear algebra, calculus, and PyTorch fundamentals. You must understand what happens inside model weights, not just how to call an API.',
        ],
        cs: [
          'Pro softwarové inženýry směřující na AI Developera: Ovládněte API jazykových modelů, techniky RAG systémů, vektorové databáze a systematické testování kvality odpovědí (Evals).',
          'Pro AI Developery směřující na ML Engineera: Pronikněte hlouběji do lineární algebry, matematiky a frameworku PyTorch. Je nutné rozumět tomu, jak funguje trénování a architektury uvnitř modelů.',
        ],
      },
      recommendedCourseIds: ['course-dl-genai', 'course-ibm-ai-eng'],
      recommendedCertIds: ['cert-databricks-de', 'cert-gcp-pde'],
    },
  },

  // 4. Databricks vs. Snowflake
  {
    slug: 'databricks-vs-snowflake',
    type: 'technology',
    entityAId: 'databricks',
    entityBId: 'snowflake',
    aliases: ['snowflake-vs-databricks'],
    title: {
      en: 'Databricks vs. Snowflake: Real Enterprise Market Demand',
      cs: 'Databricks vs. Snowflake: Reálná poptávka a souboj datových platforem',
    },
    subtitle: {
      en: 'An empirical comparison of the two dominant modern data platforms across S&P 500 job postings: Lakehouse architecture, PySpark, and Unity Catalog vs. Cloud Data Warehousing, SQL, and Snowpark.',
      cs: 'Empirické srovnání dvou dominantních datových platforem na základě inzerátů firem S&P 500: Lakehouse, PySpark a Unity Catalog vs. Cloudový datový sklad, SQL a Snowpark.',
    },
    executiveSummary: {
      en: [
        'The competition between Databricks and Snowflake defines modern enterprise data architecture. Databricks originated from Apache Spark and the open data lake, evolving upwards into data warehousing (Databricks SQL) and AI model governance (Unity Catalog). Snowflake began as an ultra-fast, zero-maintenance cloud data warehouse and expanded downwards into data engineering, Apache Iceberg, and Cortex AI.',
        'In active job postings, Databricks holds a strong lead in open positions (854 postings vs 527 for Snowflake), driven by high demand among Data Engineers and Data Architects managing large-scale Spark streaming. Snowflake remains the preferred powerhouse for Analytics Engineers, BI Developers, and commercial SQL workloads.',
      ],
      cs: [
        'Souboj mezi Databricks a Snowflake představuje nejvýraznější technologickou bitvu v moderní datové architektuře. Databricks vyrostl na základech Apache Sparku a otevřeného data lake, odkud expandoval k datovému skladu (Databricks SQL) a správě AI modelů (Unity Catalog). Snowflake začal jako bezúdržbový cloudový datový sklad a postupně přidal podporu pro data engineering, Apache Iceberg a Cortex AI.',
        'V aktivních inzerátech si Databricks udržuje vyšší počet otevřených pozic (854 pozic oproti 527 u Snowflake), zejména u Data Engineerů a architektů zpracovávajících velké objemy dat v PySparku. Snowflake naopak exceluje u Analytics Engineerů, BI specialistů a týmů stavějících na čistém SQL a dbt.',
      ],
    },
    uniqueA: [
      {
        name: 'Apache Spark & PySpark Engine',
        detail: {
          en: 'Native distributed in-memory compute for massive ETL, structured streaming, and ML pipelines.',
          cs: 'Nativní distribuovaný výpočetní engine pro masivní ETL, streaming a strojové učení v PySparku.',
        },
      },
      {
        name: 'Delta Lake & Unity Catalog',
        detail: {
          en: 'ACID transactions on object storage with centralized cross-cloud governance for data, tables, and AI models.',
          cs: 'ACID transakce nad objektovým úložištěm a centralizovaná správa oprávnění i AI modelů.',
        },
      },
      {
        name: 'MLflow & Native AI Workflows',
        detail: {
          en: 'Built-in model tracking, registry, feature stores, and automated serverless model serving.',
          cs: 'Nativní správa životního cyklu modelů v MLflow, feature store a škálovatelné servování modelů.',
        },
      },
    ],
    shared: [
      {
        name: 'Multi-Cloud Deployment (AWS, Azure, GCP)',
        detail: {
          en: 'Both run identically across all three major hyperscalers, avoiding single-cloud lock-in.',
          cs: 'Obě platformy běží identicky nad AWS, Azure i GCP bez závislosti na jednom poskytovateli.',
        },
      },
      {
        name: 'Open Table Formats (Apache Iceberg & Delta)',
        detail: {
          en: 'Interoperability with open storage formats, separating storage costs from platform compute.',
          cs: 'Podpora otevřených úložných formátů oddělujících náklady na storage od výpočetního výkonu.',
        },
      },
      {
        name: 'Python & SQL Programmability',
        detail: {
          en: 'Full support for complex SQL queries and Python development (PySpark vs. Snowpark).',
          cs: 'Plná podpora pro komplexní analytické dotazy v SQL i vývoj v Pythonu.',
        },
      },
      {
        name: 'dbt Integration & Modern Analytics',
        detail: {
          en: 'Seamless transformation orchestration with dbt-databricks and dbt-snowflake adapters.',
          cs: 'Přímá integrace s nástrojem dbt pro orchestraci a testování datových transformací.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Zero-Maintenance Virtual Warehouses',
        detail: {
          en: 'Instant autoscaling, auto-suspend, and multi-cluster concurrency without tuning clusters or nodes.',
          cs: 'Okamžité automatické škálování a uspávání výpočetních skladů bez nutnosti ladění nodů.',
        },
      },
      {
        name: 'Snowflake Data Sharing & Marketplace',
        detail: {
          en: 'Zero-copy live data sharing across different corporate accounts and external vendors.',
          cs: 'Okamžité bezkopírové sdílení živých tabulek mezi různými organizacemi a partnery.',
        },
      },
      {
        name: 'Snowpark & Streamlit Applications',
        detail: {
          en: 'Native Python/Java runtime inside the engine with built-in interactive Streamlit web apps.',
          cs: 'Běhové prostředí pro Python přímo v databázi včetně tvorby interaktivních webů v Streamlitu.',
        },
      },
    ],
  },
];

/**
 * Resolves full metrics and details for a comparison slug
 */
export function getComparison(slugOrAlias: string): ComparisonResolved | null {
  const normalized = slugOrAlias.toLowerCase().trim().replace(/_/g, '-');

  const def = COMPARISONS_CATALOG.find((c) => {
    if (c.slug === normalized) return true;
    if (c.aliases && c.aliases.some((a) => a.toLowerCase().replace(/_/g, '-') === normalized)) return true;
    return false;
  });

  if (!def) return null;

  if (def.type === 'role') {
    const roleA = marketData.roles?.find((r) => r.category_id === def.entityAId);
    const roleB = marketData.roles?.find((r) => r.category_id === def.entityBId);

    if (!roleA || !roleB) return null;

    const courses = (def.careerTransition?.recommendedCourseIds || [])
      .map((id) => ACADEMY_COURSES.find((c) => c.id === id))
      .filter((c): c is AcademyCourse => Boolean(c));

    const certs = (def.careerTransition?.recommendedCertIds || [])
      .map((id) => CERTIFICATIONS_LIST.find((c) => c.id === id))
      .filter((c): c is CertificationItem => Boolean(c));

    return {
      slug: def.slug,
      type: 'role',
      title: def.title,
      subtitle: def.subtitle,
      executiveSummary: def.executiveSummary,
      entityA: {
        id: roleA.category_id,
        name: roleA.canonical_name,
        jobCount: roleA.job_count,
        marketSharePct: roleA.market_share_pct,
        sp500SharePct: roleA.sp500_job_count ? Number(((roleA.sp500_job_count / roleA.job_count) * 100).toFixed(1)) : undefined,
        seniorPlusPct: roleA.senior_plus_pct,
        remotePct: roleA.remote_pct,
        topCompanies: (roleA.top_companies || []).slice(0, 5).map((c) => ({ name: c.company_name, count: c.job_count })),
        topSkills: (roleA.top_skills || []).slice(0, 6).map((s) => ({ name: s.skill_name, pct: s.penetration_pct })),
        kebabSlug: roleA.category_id.replace(/_/g, '-'),
      },
      entityB: {
        id: roleB.category_id,
        name: roleB.canonical_name,
        jobCount: roleB.job_count,
        marketSharePct: roleB.market_share_pct,
        sp500SharePct: roleB.sp500_job_count ? Number(((roleB.sp500_job_count / roleB.job_count) * 100).toFixed(1)) : undefined,
        seniorPlusPct: roleB.senior_plus_pct,
        remotePct: roleB.remote_pct,
        topCompanies: (roleB.top_companies || []).slice(0, 5).map((c) => ({ name: c.company_name, count: c.job_count })),
        topSkills: (roleB.top_skills || []).slice(0, 6).map((s) => ({ name: s.skill_name, pct: s.penetration_pct })),
        kebabSlug: roleB.category_id.replace(/_/g, '-'),
      },
      uniqueA: def.uniqueA,
      shared: def.shared,
      uniqueB: def.uniqueB,
      careerTransition: def.careerTransition
        ? {
            title: def.careerTransition.title,
            advice: def.careerTransition.advice,
            courses,
            certifications: certs,
          }
        : undefined,
    };
  } else {
    // Technology comparison
    const techA = getTechnology(def.entityAId);
    const techB = getTechnology(def.entityBId);

    if (!techA || !techB) return null;

    return {
      slug: def.slug,
      type: 'technology',
      title: def.title,
      subtitle: def.subtitle,
      executiveSummary: def.executiveSummary,
      entityA: {
        id: techA.id,
        name: techA.name,
        jobCount: techA.jobCount,
        marketSharePct: techA.penetrationPct,
        topCompanies: techA.topCompanies.slice(0, 5).map((c) => ({ name: c.companyName, count: c.jobCount })),
        topSkills: techA.topRoles.slice(0, 6).map((r) => ({ name: r.roleName, pct: r.penetrationPct })),
        kebabSlug: techA.id,
      },
      entityB: {
        id: techB.id,
        name: techB.name,
        jobCount: techB.jobCount,
        marketSharePct: techB.penetrationPct,
        topCompanies: techB.topCompanies.slice(0, 5).map((c) => ({ name: c.companyName, count: c.jobCount })),
        topSkills: techB.topRoles.slice(0, 6).map((r) => ({ name: r.roleName, pct: r.penetrationPct })),
        kebabSlug: techB.id,
      },
      uniqueA: def.uniqueA,
      shared: def.shared,
      uniqueB: def.uniqueB,
    };
  }
}

export function getAllComparisons(): ComparisonResolved[] {
  return COMPARISONS_CATALOG.map((c) => getComparison(c.slug)!).filter(Boolean);
}
