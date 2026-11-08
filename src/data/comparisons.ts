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

export interface DiagramBullets {
  left: {
    en: string[];
    cs: string[];
  };
  shared: {
    en: string[];
    cs: string[];
  };
  right: {
    en: string[];
    cs: string[];
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
  diagramBullets?: DiagramBullets;
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
  diagramBullets?: DiagramBullets;
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
    diagramBullets: {
      left: {
        en: [
          'Provide insights into business performance & trends',
          'Develop analytical systems to act as a single source of truth',
          'Explain outcomes via data visualization & KPI monitoring',
        ],
        cs: [
          'Poskytování vhledu do výkonnosti byznysu a trendů',
          'Vývoj analytických systémů a jednotného zdroje pravdy',
          'Interpretace výsledků, vizualizace dat a sledování KPI',
        ],
      },
      shared: {
        en: [
          'Data gathering & extraction',
          'Data cleaning & wrangling',
          'Exploratory data analysis (EDA)',
        ],
        cs: [
          'Získávání a extrakce dat',
          'Čištění a transformace dat',
          'Explorační analýza dat (EDA)',
        ],
      },
      right: {
        en: [
          'Develop predictive models & algorithms for business forecasting',
          'Generate hypotheses & statistical experiment design',
          'Deploy machine learning models & data software products',
        ],
        cs: [
          'Vývoj prediktivních modelů a algoritmů pro předpověď vývoje',
          'Formulace hypotéz a navrhování statistických experimentů',
          'Nasazování modelů strojového učení do produkce',
        ],
      },
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
        'Data Analysts and Data Engineers form the core symbiotic pair in modern data teams. The Data Engineer builds, scales, and maintains the data pipelines, lakes, and warehouses that ingest enterprise data. The Data Analyst consumes that modeled data to uncover business trends, build dashboards, and advise leadership.',
        'While both roles rely heavily on SQL and data governance, Data Engineers operate as backend software engineers utilizing distributed compute (Apache Spark), orchestrators (Apache Airflow), and cloud infrastructure (AWS S3, Databricks, Snowflake). Analysts operate closer to business stakeholders utilizing BI platforms and dimensional modeling.',
      ],
      cs: [
        'Data Analyst a Data Engineer tvoří klíčový tandem v moderních datových týmech. Data Engineer navrhuje, staví a udržuje infrastrukturu, která sbírá a transformuje surová data do spolehlivých skladů. Data Analyst nad těmito daty staví metriky, dashboardy a pomáhá byznysu v rozhodování.',
        'Obě role denně pracují se SQL a kvalitou dat. Data Engineer však vystupuje jako backendový softwarový inženýr: ovládá distribuované výpočty (Apache Spark), orchestrátory (Apache Airflow) a cloudové platformy (AWS S3, Databricks, Snowflake). Analytik se soustředí na sémantiku, metriky a vizualizaci.',
      ],
    },
    diagramBullets: {
      left: {
        en: [
          'Extract commercial value & KPI trees from curated data',
          'Executive BI dashboards, dimensional semantic models & ad-hoc queries',
          'Bridge quantitative insights with corporate strategy & operations',
        ],
        cs: [
          'Tvorba hierarchie KPI a extrakce byznysové hodnoty z dat',
          'Manažerské BI dashboardy, sémantické modely a ad-hoc analýzy',
          'Propojení datových výstupů s firemní strategií a exekutivou',
        ],
      },
      shared: {
        en: [
          'Advanced relational SQL & dimensional schema modeling',
          'Data warehouse navigation (Snowflake, BigQuery, Databricks)',
          'Data quality validation, documentation & governance',
        ],
        cs: [
          'Pokročilé relační SQL a dimenzionální modelování schémat',
          'Práce s cloudovými sklady (Snowflake, BigQuery, Databricks)',
          'Validace kvality dat, dokumentace a správa metadat',
        ],
      },
      right: {
        en: [
          'Build scalable, distributed ETL/ELT pipelines & streaming ingestion',
          'Warehouse & lakehouse performance optimization, clustering & partitioning',
          'CI/CD automation, orchestration (Airflow/Dagster) & infrastructure as code',
        ],
        cs: [
          'Vývoj škálovatelných ETL/ELT pipeline a streamingových architektur',
          'Optimalizace skladů a lakehouse, particionování a clustering',
          'Automatizace CI/CD, orchestrace (Airflow/Dagster) a infrastruktura',
        ],
      },
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
    diagramBullets: {
      left: {
        en: [
          'Build AI-augmented applications, agentic workflows & UX interfaces',
          'Prompt engineering, structured output parsing & function calling',
          'Integrate foundation model APIs (Gemini, Claude, OpenAI) into products',
        ],
        cs: [
          'Vývoj aplikací s AI agenty a interaktivním uživatelským rozhraním',
          'Prompt engineering, parsování strukturovaných výstupů a function calling',
          'Integrace API velkých jazykových modelů (Gemini, Claude, OpenAI)',
        ],
      },
      shared: {
        en: [
          'Python software engineering & modern API architectures',
          'Vector embeddings, semantic chunking & RAG retrieval pipelines',
          'Automated LLM evaluation frameworks & latency profiling',
        ],
        cs: [
          'Vývoj v Pythonu a moderní API mikroservisní architektura',
          'Vektorové embeddingy, chunking a RAG retrieval pipeline',
          'Evaluační frameworky pro LLM a profilování latence systémů',
        ],
      },
      right: {
        en: [
          'Train, fine-tune & quantize custom neural architectures in PyTorch',
          'Distributed GPU cluster training, tensor parallelism & mixed precision',
          'Production model serving (vLLM, Triton), caching & MLOps pipelines',
        ],
        cs: [
          'Trénování, fine-tuning a kvantizace neuronových sítí v PyTorch',
          'Distribuované trénování na GPU clusterech a tensor parallelism',
          'Produkční model serving (vLLM, Triton), monitoring a MLOps pipeline',
        ],
      },
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
    diagramBullets: {
      left: {
        en: [
          'Unified Apache Spark distributed compute & streaming engine',
          'Native MLflow experiment registry & Mosaic AI model training',
          'Unstructured video, audio & complex lakehouse workloads',
        ],
        cs: [
          'Distribuovaný výpočetní engine Apache Spark a streaming',
          'Nativní správa ML modelů v MLflow a trénování v Mosaic AI',
          'Zpracování nestrukturovaných dat (video, audio, text) a lakehouse',
        ],
      },
      shared: {
        en: [
          'Cloud-native separation of storage & elastic compute',
          'ACID transaction guarantees & enterprise multi-cloud support',
          'Centralized data governance, RBAC security & SQL querying',
        ],
        cs: [
          'Oddělení cloudového úložiště od elastického výpočetního výkonu',
          'ACID transakce a multi-cloud provoz (AWS, Azure, GCP)',
          'Centralizovaná správa přístupů, governance a SQL analytika',
        ],
      },
      right: {
        en: [
          'Zero-maintenance serverless multi-cluster shared data architecture',
          'Instant secure cross-company data sharing & Snowflake Marketplace',
          'Cortex AI serverless LLM functions & SQL-first enterprise warehousing',
        ],
        cs: [
          'Bezúdržbová serverless architektura s automatickým škálováním',
          'Okamžité sdílení dat mezi firmami bez nutnosti kopírování',
          'Serverless Cortex AI funkce pro LLM a SQL-first datový sklad',
        ],
      },
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

  // 5. Data Engineer vs. Data Scientist
  {
    slug: 'data-engineer-vs-data-scientist',
    type: 'role',
    entityAId: 'data_engineer',
    entityBId: 'data_scientist',
    aliases: ['data-scientist-vs-data-engineer'],
    title: {
      en: 'Data Engineer vs. Data Scientist: Infrastructure vs. Models',
      cs: 'Data Engineer vs. Data Scientist: Stavba infrastruktury vs. prediktivní modely',
    },
    subtitle: {
      en: 'An empirical comparison of job posting requirements across enterprise employers: distributed data systems, ETL/ELT pipelines, and machine learning boundaries.',
      cs: 'Empirické srovnání požadavků z tisíců inzerátů: distribuované systémy, datová potrubí vs. trénování a nasazování modelů.',
    },
    executiveSummary: {
      en: [
        'Data Engineers and Data Scientists represent the two foundational pillars of enterprise data maturity. Data Engineers build, orchestrate, and maintain high-throughput pipelines, distributed compute frameworks, and governed lakehouse platforms. Data Scientists build upon that reliable data foundation to develop statistical models, machine learning algorithms, and predictive experiments.',
        'While both roles demonstrate high demand for Python and SQL, their operational focus differs drastically. Data Engineers function primarily as backend distributed systems engineers (Apache Spark, Kafka, Airflow, dbt, cloud warehouses). In contrast, Data Scientists require deep competency in statistical inference, experimental design (A/B testing), machine learning libraries (scikit-learn, XGBoost, PyTorch), and model evaluation.',
      ],
      cs: [
        'Data Engineer a Data Scientist představují dva základní pilíře moderních datových týmů. Data Engineer navrhuje, staví a provozuje vysoce propustná datová potrubí, distribuované výpočty a bezpečné cloudové sklady. Data Scientist nad touto spolehlivou datovou základnou vytváří statistické modely, algoritmy strojového učení a predikce budoucího vývoje.',
        'Ačkoli obě role intenzivně vyžadují Python a SQL, jejich zaměření se zásadně liší. Data Engineer funguje jako backendový systémový inženýr se zaměřením na distribuované výpočty (Apache Spark, Kafka, Airflow, dbt a cloudové sklady). Data Scientist se naproti tomu soustředí na matematické modelování, testování hypotéz (A/B testy), trénování modelů (scikit-learn, PyTorch) a evaluaci výstupů.',
      ],
    },
    diagramBullets: {
      left: {
        en: [
          'Distributed compute frameworks (Apache Spark, PySpark)',
          'Automated pipeline orchestration (Airflow, dbt)',
          'Cloud lakehouse infrastructure (AWS S3, Databricks, Snowflake)',
        ],
        cs: [
          'Distribuované výpočty a engine (Apache Spark, PySpark)',
          'Automatizovaná orchestrace datových potrubí (Airflow, dbt)',
          'Infrastruktura cloudových skladů a jezer (S3, Databricks, Snowflake)',
        ],
      },
      shared: {
        en: [
          'Core programming in Python & advanced SQL querying',
          'Data governance, schema evolution & pipeline quality audits',
          'Cloud platform infrastructure (AWS, Azure, GCP)',
        ],
        cs: [
          'Základní programování v Pythonu a pokročilý jazyk SQL',
          'Správa datové kvality, datová schémata a governance',
          'Práce v cloudových prostředích (AWS, Azure, GCP)',
        ],
      },
      right: {
        en: [
          'Supervised & unsupervised Machine Learning (scikit-learn, XGBoost)',
          'Deep Learning & neural architectures (PyTorch, TensorFlow)',
          'Statistical inference, hypothesis testing & A/B experiment design',
        ],
        cs: [
          'Trénování modelů strojového učení (scikit-learn, XGBoost)',
          'Hluboké neuronové sítě a výpočty na GPU (PyTorch, TensorFlow)',
          'Statistická inference, testování hypotéz a návrh A/B experimentů',
        ],
      },
    },
    uniqueA: [
      {
        name: 'Distributed Compute & Spark',
        detail: {
          en: 'Scaling in-memory transformations and streaming jobs over petabyte-scale datasets.',
          cs: 'Škálování distribuovaných transformací a streamingových úloh v paměti nad velkými daty.',
        },
      },
      {
        name: 'ELT Pipeline Orchestration (Airflow / dbt)',
        detail: {
          en: 'Building version-controlled DAG dependencies, automated tests, and fault-tolerant scheduling.',
          cs: 'Tvorba verzovaných DAG závislostí v Airflow, testování datových modelů a spolehlivý scheduling.',
        },
      },
      {
        name: 'Event Streaming & Messaging (Kafka)',
        detail: {
          en: 'Decoupling event producers from analytical consumers with low-latency pub/sub streaming.',
          cs: 'Nízko-latenční zachytávání a distribuce událostí v reálném čase mezi mikroslužbami a skladem.',
        },
      },
    ],
    shared: [
      {
        name: 'Python for Data Architecture',
        detail: {
          en: 'Demanded in over 66% of Data Engineer and 89% of Data Scientist postings.',
          cs: 'Vyžadováno u více než 66 % inzerátů Data Engineerů a 89 % Data Scientistů.',
        },
      },
      {
        name: 'Advanced Relational SQL',
        detail: {
          en: 'Foundational analytical language required across virtually all enterprise positions.',
          cs: 'Základní dotazovací jazyk vyžadovaný u naprosté většiny otevřených pozic obou rolí.',
        },
      },
      {
        name: 'Data Governance & Quality Standards',
        detail: {
          en: 'Ensuring schema consistency, handling missing values, and validating data contracts.',
          cs: 'Garantování integrity dat, audit chybějících hodnot a dodržování datových kontraktů.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Machine Learning & Predictive Modeling',
        detail: {
          en: 'Formulating classification, regression, and clustering algorithms to optimize business KPIs.',
          cs: 'Formulace klasifikačních a regresních algoritmů pro optimalizaci byznysových procesů.',
        },
      },
      {
        name: 'Statistical Experimentation & A/B Testing',
        detail: {
          en: 'Calculating sample sizes, power analysis, and establishing causal significance.',
          cs: 'Výpočet velikosti vzorků, testování statistické významnosti a měření kauzálního dopadu změn.',
        },
      },
      {
        name: 'Deep Learning & Neural Networks',
        detail: {
          en: 'Designing neural architectures for NLP, computer vision, and generative foundation models.',
          cs: 'Návrh a fine-tuning neuronových sítí pro zpracování textu, obrazu a generativní modely.',
        },
      },
    ],
    careerTransition: {
      title: {
        en: 'Bridging the Engineering and Science Gap',
        cs: 'Kariérní přechod mezi Data Engineeringem a Data Science',
      },
      advice: {
        en: [
          'If transitioning from Data Engineering to Data Science: Focus on applied mathematics, statistical hypothesis testing, and standard ML evaluation metrics (ROC-AUC, RMSE, Precision/Recall) rather than just model syntax.',
          'If transitioning from Data Science to Data Engineering: Deepen software engineering rigor — study containerization (Docker), distributed systems theory (CAP, Spark shuffle bottlenecks), and modular CI/CD deployment pipelines.',
        ],
        cs: [
          'Při přechodu z Data Engineeringu k Data Science: Zaměřte se na aplikovanou matematiku, statistické testování hypotéz a metriky evaluace modelů (ROC-AUC, Precision/Recall), nikoli pouze na syntaxi knihoven.',
          'Při přechodu z Data Science k Data Engineeringu: Posilte softwarové inženýrství — zvládněte kontejnerizaci (Docker), architekturu distribuovaných systémů (Spark bottlenecky) a CI/CD nasazování datových modelů.',
        ],
      },
      recommendedCourseIds: ['coursera-ibm-ai-engineering', 'datacamp-data-engineer-python', 'gcp-data-eng-spec'],
      recommendedCertIds: ['cert-databricks-de', 'cert-gcp-pde'],
    },
  },

  // 6. BigQuery vs. Snowflake
  {
    slug: 'bigquery-vs-snowflake',
    type: 'technology',
    entityAId: 'bigquery',
    entityBId: 'snowflake',
    aliases: ['snowflake-vs-bigquery'],
    title: {
      en: 'BigQuery vs. Snowflake: Real Enterprise Market Demand',
      cs: 'BigQuery vs. Snowflake: Reálná poptávka a souboj cloudových skladů',
    },
    subtitle: {
      en: 'An empirical comparison of the two leading enterprise cloud data warehouses across S&P 500 postings: Google Cloud serverless slot economics vs. Snowflake multi-cloud virtual warehouses.',
      cs: 'Empirické srovnání dvou předních cloudových platforem na základě inzerátů firem S&P 500: serverless slotová ekonomika v BigQuery vs. virtuální sklady a multi-cloud u Snowflake.',
    },
    executiveSummary: {
      en: [
        'The competition between Google BigQuery and Snowflake is one of the most strategic architectural choices in enterprise data infrastructure. BigQuery is a truly serverless, multi-tenant analytical engine deeply embedded within Google Cloud Platform, offering unified compute across storage, analytics, and Vertex AI with zero virtual machine management.',
        'Snowflake pioneered independent multi-cluster shared data architecture across all three major clouds (AWS, Azure, GCP). In analyzed enterprise job postings, Snowflake leads in broad multi-cloud corporate adoption (527 postings), while BigQuery (207 postings) is heavily anchored in enterprises with strategic commitments to Google Cloud, advanced AI/ML integration, and streaming ingestion.',
      ],
      cs: [
        'Souboj mezi Google BigQuery a Snowflake představuje jedno z nejvýznamnějších strategických rozhodnutí při stavbě moderní podnikové datové platformy. BigQuery nabízí plně serverless architekturu hluboce integrovanou do Google Cloud Platform, která spojuje analytické dotazování, strojové učení v BigQuery ML a modely Gemini bez nutnosti správy virtuálních serverů.',
        'Snowflake definoval standard pro nezávislý multi-cloudový datový sklad s odděleným výpočetním výkonem nad všemi třemi hyperscalery (AWS, Azure, GCP). V analyzovaných podnikových inzerátech vede Snowflake v celkovém zastoupení (527 pozic), zatímco BigQuery (207 pozic) je silně zastoupeno u firem strategicky postavených na ekosystému Google Cloud a přímém napojení na pokročilé AI/ML služby.',
      ],
    },
    diagramBullets: {
      left: {
        en: [
          'Pure serverless slot management (Standard, Enterprise & Enterprise Plus)',
          'Native in-warehouse machine learning & Vertex AI Gemini invocation',
          'Zero-infrastructure streaming buffer & BigLake Iceberg federation',
        ],
        cs: [
          'Čistě serverless slotová správa (Standard, Enterprise a Enterprise Plus)',
          'Nativní strojové učení BigQuery ML a přímé volání modelů Gemini přes SQL',
          'Nativní streaming buffer bez infrastruktury a BigLake federace nad Icebergem',
        ],
      },
      shared: {
        en: [
          'Full separation of cloud storage from elastic analytical compute',
          'Standard ANSI SQL compliance, complex window functions & CTEs',
          'Apache Iceberg open table format support & enterprise access governance',
        ],
        cs: [
          'Úplné oddělení cloudového úložiště od škálovatelného výpočetního výkonu',
          'Plná podpora standardního ANSI SQL, analytických funkcí a CTE',
          'Podpora otevřeného formátu Apache Iceberg a centralizovaná správa přístupů',
        ],
      },
      right: {
        en: [
          'Independent Virtual Warehouses with instant T-shirt sizing (XS to 6XL)',
          'Identical operational experience natively across AWS, Azure, and GCP',
          'Snowflake Marketplace & zero-copy cross-organization data sharing',
        ],
        cs: [
          'Nezávislé virtuální sklady s okamžitým škálováním (velikosti XS až 6XL)',
          'Identický provoz a správa nativně napříč AWS, Azure i GCP',
          'Snowflake Marketplace a okamžité sdílení živých dat bez kopírování',
        ],
      },
    },
    uniqueA: [
      {
        name: 'Serverless Dynamic Slots & BigQuery Editions',
        detail: {
          en: 'No cluster provisioning; queries execute across shared slot pools with autoscaling baseline reservations.',
          cs: 'Žádné spouštění clusterů; dotazy běží nad sdíleným poolem slotů s automatickým škálováním a rezervacemi.',
        },
      },
      {
        name: 'Native BigQuery ML & Vertex AI Integration',
        detail: {
          en: 'Train regressions, k-means, and invoke Gemini LLMs directly within SQL statements without moving data.',
          cs: 'Trénování modelů a přímé volání LLM modelů Gemini přímo v SQL dotazech bez nutnosti přesouvat data ven.',
        },
      },
      {
        name: 'Built-in Dataform Orchestration',
        detail: {
          en: 'Native SQLX transformation framework built directly into the BigQuery console with zero operational cost.',
          cs: 'Nativní orchestrace v SQLX přímo v konzoli BigQuery s nulovými licenčními náklady navíc.',
        },
      },
    ],
    shared: [
      {
        name: 'Decoupled Storage & Compute Architecture',
        detail: {
          en: 'Store petabytes indefinitely at object storage rates while scaling query compute dynamically.',
          cs: 'Dlouhodobé ukládání petabajtů dat za nízké ceny s dynamickým škálováním výpočetního výkonu.',
        },
      },
      {
        name: 'Modern Open Table Formats (Apache Iceberg)',
        detail: {
          en: 'Both platforms read and write Iceberg metadata, preventing proprietary storage lock-in.',
          cs: 'Obě platformy podporují otevřené tabulky Apache Iceberg bez vendor lock-inu na úrovni úložiště.',
        },
      },
      {
        name: 'Governed Enterprise Analytics & BI Support',
        detail: {
          en: 'Direct high-speed native connectors for Looker, Tableau, Power BI, and dbt.',
          cs: 'Rychlé nativní konektory pro Looker, Tableau, Power BI i transformační framework dbt.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Independent Virtual Warehouses (T-Shirt Sizing)',
        detail: {
          en: 'Isolate departments and workloads onto dedicated compute clusters that auto-suspend when idle.',
          cs: 'Oddělení oddělení a pipeline do vlastních výpočetních warehouse s automatickým uspáním při nečinnosti.',
        },
      },
      {
        name: 'Multi-Cloud Portability (AWS / Azure / GCP)',
        detail: {
          en: 'Deploy identical data architectures across multiple cloud providers with unified billing and governance.',
          cs: 'Identická správa a migrace datových skladů napříč všemi třemi hlavními cloudy.',
        },
      },
      {
        name: 'Secure Data Sharing & Snowflake Marketplace',
        detail: {
          en: 'Query third-party financial and market datasets live without setting up ETL extraction pipelines.',
          cs: 'Okamžitý přístup k externím datovým sadám na trhu bez nutnosti stavět integrační pipeline.',
        },
      },
    ],
  },

  // 7. BI Developer vs. Data Analyst
  {
    slug: 'bi-developer-vs-data-analyst',
    type: 'role',
    entityAId: 'bi_developer',
    entityBId: 'data_analyst',
    aliases: ['data-analyst-vs-bi-developer'],
    title: {
      en: 'BI Developer vs. Data Analyst: Architecture vs. Business Insights',
      cs: 'BI Developer vs. Data Analyst: Sémantická architektura vs. byznysová analýza',
    },
    subtitle: {
      en: 'Enterprise dimensional modeling, DAX tabular structures, and semantic layers vs. ad-hoc exploratory analysis, KPI trees, and executive storytelling.',
      cs: 'Rozdíl mezi tvorbou dimenzionálních modelů (DAX, LookML, ETL) a ad-hoc interpretací metrik pro strategická rozhodnutí managementu.',
    },
    executiveSummary: {
      en: [
        'While often categorized under the same business intelligence umbrella, BI Developers and Data Analysts fulfill complementary responsibilities. The BI Developer acts as an analytics software engineer: they design dimensional schemas (star schemas), optimize semantic layers (LookML, Power BI semantic models, Tabular cubes), and write complex DAX calculations to ensure consistent enterprise-wide metric definitions.',
        'The Data Analyst acts as an investigative business partner: they query those governed data models to analyze trends, discover operational bottlenecks, build ad-hoc scenario forecasts in Excel/Python, and present actionable findings to executive leadership. In enterprise postings, Data Analyst has broader overall demand (1,593 postings), while BI Developer positions (121 postings) specialize in governed infrastructure.',
      ],
      cs: [
        'Ačkoli bývají obě role často řazeny pod pojem business intelligence, v podnikové praxi plní odlišné úkoly. BI Developer funguje jako inženýr analytických systémů: navrhuje dimenzionální schémata (hvězdicová schémata), staví sémantické vrstvy (LookML, Power BI tabular modely) a píše pokročilé DAX kalkulace pro jednotnou definici metrik napříč firmou.',
        'Data Analyst vystupuje jako strategický partner byznysu: využívá připravené datové modely pro zkoumání trendů, odhalování propadů v tržbách, ad-hoc modelování scénářů v Excelu či Pythonu a prezentaci doporučení pro vedení. V inzerátech má Data Analyst výrazně širší poptávku (1 593 inzerátů), zatímco BI Developer (121 inzerátů) je úzce specializovanou inženýrskou rolí.',
      ],
    },
    diagramBullets: {
      left: {
        en: [
          'Dimensional modeling & schema design (Star / Snowflake schemas)',
          'Advanced DAX, Tabular models & calculation groups',
          'Governed semantic layer engineering (LookML, Power BI Semantic Models)',
        ],
        cs: [
          'Dimenzionální modelování skladů (hvězdicová schémata)',
          'Pokročilé DAX vzorce, kalkulační skupiny a Tabular modely',
          'Vývoj sémantické vrstvy a centralizovaných metrik (LookML, Power BI)',
        ],
      },
      shared: {
        en: [
          'Enterprise SQL querying, window functions & relational joins',
          'Executive dashboard development in Power BI & Tableau',
          'Data governance, metric definitions & reporting QA',
        ],
        cs: [
          'Podnikové SQL dotazování, analytické funkce a spojování tabulek',
          'Tvorba manažerských přehledů a dashboardů v Power BI a Tableau',
          'Datová governance, správa definic klíčových metrik a kontrola kvality',
        ],
      },
      right: {
        en: [
          'Ad-hoc exploratory data analysis (EDA) & business hypothesis testing',
          'Python (Pandas) & advanced Excel scenario modeling',
          'Customer cohort analysis, funnel drop-off & KPI root-cause audits',
        ],
        cs: [
          'Ad-hoc analýzy, testování byznysových hypotéz a hledání příčin výkyvů',
          'Práce v Pythonu (Pandas) a pokročilé finanční modelování v Excelu',
          'Kohortové analýzy zákazníků, konverzní trychtýře a prezentace pro management',
        ],
      },
    },
    uniqueA: [
      {
        name: 'Advanced DAX & Tabular Optimization',
        detail: {
          en: 'Writing high-performance measure formulations, filter context manipulation, and row-level security (RLS).',
          cs: 'Optimalizace výkonu měřítek v DAX, práce s kontextem filtrů a řízení přístupových práv (RLS).',
        },
      },
      {
        name: 'Dimensional Modeling (Kimball Methodology)',
        detail: {
          en: 'Architecting fact and dimension tables, slowly changing dimensions (SCD), and conformed dimensions.',
          cs: 'Návrh faktových a dimenzionálních tabulek, pomalu se měnících dimenzí (SCD) a modelování schémat.',
        },
      },
      {
        name: 'Governed Semantic Layer Maintenance',
        detail: {
          en: 'Centralizing metric logic into single-source-of-truth semantic models (LookML, Power BI datasets).',
          cs: 'Sjednocení logiky výpočtu metrik do centrální sémantické vrstvy eliminující duplicitní definice.',
        },
      },
    ],
    shared: [
      {
        name: 'Enterprise SQL Proficiency',
        detail: {
          en: 'Demanded in 85.6% of BI Developer and 55.0% of Data Analyst job postings.',
          cs: 'Vyžadováno u 85,6 % inzerátů BI Developerů a 55,0 % pozic Data Analystů.',
        },
      },
      {
        name: 'Power BI & Tableau Platforms',
        detail: {
          en: 'The two dominant BI visualization platforms across S&P 500 enterprises.',
          cs: 'Dvě dominantní vizualizační platformy v podnikovém reportingu velkých korporací.',
        },
      },
      {
        name: 'Stakeholder Metric Alignment',
        detail: {
          en: 'Translating strategic business objectives into verified, deterministic reporting metrics.',
          cs: 'Převod strategických byznysových cílů do spolehlivých a ověřitelných reportů.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Exploratory & Ad-Hoc Data Analysis',
        detail: {
          en: 'Investigating unexpected business fluctuations, margin drops, and customer behavior shifts.',
          cs: 'Zkoumání nečekaných výkyvů v tržbách, poklesu marží a změn v chování zákazníků.',
        },
      },
      {
        name: 'Python (Pandas) & Excel Modeling',
        detail: {
          en: 'Flexible exploratory data cleaning, rapid prototyping, and financial forecasting.',
          cs: 'Rychlé prototypování analýz, čištění dat v Pandas a finanční modelování scénářů.',
        },
      },
      {
        name: 'Executive Storytelling & Decision Framing',
        detail: {
          en: 'Synthesizing complex multi-source data into concise narrative presentations for leadership.',
          cs: 'Shrnutí komplexních dat do srozumitelných prezentací pro vedení a navrhování konkrétních kroků.',
        },
      },
    ],
    careerTransition: {
      title: {
        en: 'Evolution from Analyst to BI Architect',
        cs: 'Kariérní růst od analytika k BI architektovi',
      },
      advice: {
        en: [
          'For Data Analysts moving into BI Development: Deepen your understanding of data warehousing principles — master Kimball star schemas, calculation groups, and tabular engine internals (VertiPaq) rather than relying on flat reporting tables.',
          'For BI Developers aiming for strategic Data Analyst roles: Strengthen business acumen, exploratory Python scripting, and executive communication to present actionable insights rather than purely maintaining dashboard infrastructure.',
        ],
        cs: [
          'Pro Data Analysty směřující k BI Developmentu: Zvládněte principy datového modelování — hvězdicová schémata podle Kimballa, kalkulační skupiny a fungování tabular enginu (VertiPaq), místo spoléhání se na ploché tabulky.',
          'Pro BI Developery směřující ke strategické analytice: Posilte byznysové myšlení, práci v Pythonu a prezentační dovednosti pro vedení, abyste byli vnímáni jako partneři byznysu, nejen správci dashboardů.',
        ],
      },
      recommendedCourseIds: ['datacamp-bi-data-analyst', 'coursera-google-data-analytics'],
      recommendedCertIds: ['cert-dbt-dev'],
    },
  },

  // 8. dbt vs. Dataform
  {
    slug: 'dbt-vs-dataform',
    type: 'technology',
    entityAId: 'dbt',
    entityBId: 'dataform',
    aliases: ['dataform-vs-dbt'],
    title: {
      en: 'dbt vs. Dataform: Modern Analytics Engineering Frameworks',
      cs: 'dbt vs. Dataform: Nástroje pro moderní analytics engineering',
    },
    subtitle: {
      en: 'Multi-cloud ecosystem ubiquity (dbt) versus serverless Google BigQuery native orchestration (Dataform SQLX) in corporate job postings.',
      cs: 'Srovnání otevřeného multi-cloudového standardu (dbt) s nativním serverless orchestrátorem v Google BigQuery (Dataform SQLX).',
    },
    executiveSummary: {
      en: [
        'The emergence of analytics engineering replaced fragile stored procedures and legacy ETL tools with version-controlled, tested, and modular SQL transformation workflows. dbt (data build tool) established itself as the ubiquitous industry benchmark across Snowflake, Databricks, BigQuery, and Redshift with a massive community and rich package ecosystem.',
        'Google Cloud acquired and integrated Dataform as a first-class, fully serverless service inside BigQuery. Built on SQLX (SQL extended with JavaScript), Dataform provides zero-infrastructure Git-integrated transformations at no additional licensing cost, creating a compelling choice for pure Google Cloud environments.',
      ],
      cs: [
        'Nástup disciplíny analytics engineeringu nahradil křehké uložené procedury verzovanými, testovanými a modulárními SQL pipeline. Nástroj dbt (data build tool) se etabloval jako nezpochybnitelný průmyslový standard napříč platformami Snowflake, Databricks, BigQuery i Redshift s obrovskou globální komunitou a balíčkovým systémem.',
        'Google Cloud naproti tomu integroval Dataform jako nativní serverless službu přímo do BigQuery. Postavený na syntaxi SQLX (SQL rozšířené o bloky JavaScriptu) nabízí verzování v Gitu a závislosti modelů s nulovou správou serverů a bez dodatečných licenčních poplatků, což z něj dělá přirozenou volbu pro organizace stavějící primárně na ekosystému Google Cloud.',
      ],
    },
    diagramBullets: {
      left: {
        en: [
          'Cross-warehouse portability (Snowflake, Databricks, Redshift, BigQuery)',
          'Jinja templating & rich package manager ecosystem (dbt-utils, codegen)',
          'Independent dbt Cloud platform & standalone metric semantic layer',
        ],
        cs: [
          'Přenositelnost napříč sklady (Snowflake, Databricks, Redshift, BigQuery)',
          'Jinja šablony a bohatý balíčkový ekosystém (dbt-utils, codegen)',
          'Samostatná platforma dbt Cloud a nezávislá sémantická vrstva',
        ],
      },
      shared: {
        en: [
          'SQL-first in-warehouse transformation (ELT paradigm)',
          'Git-based version control & pull request CI/CD workflows',
          'Automated data quality assertions & DAG dependency lineage',
        ],
        cs: [
          'Transformace dat přímo uvnitř skladu na bázi SQL (ELT přístup)',
          'Verzování modelů v Gitu a zapojení do CI/CD pipeline přes pull requesty',
          'Automatizované testování kvality dat a strom závislostí modelů (DAG)',
        ],
      },
      right: {
        en: [
          'Native serverless service inside BigQuery (zero setup overhead & free)',
          'SQLX syntax allowing inline JavaScript logic within SQL definitions',
          'Seamless Google Cloud IAM access governance & Workload Identity',
        ],
        cs: [
          'Nativní serverless služba uvnitř BigQuery (žádná instalace a nulová licence)',
          'Syntaxe SQLX umožňující psát bloky JavaScriptu přímo v SQL souborech',
          'Přímé propojení s Google Cloud IAM a bezpečnostním modelem GCP',
        ],
      },
    },
    uniqueA: [
      {
        name: 'Multi-Cloud Warehouse Portability',
        detail: {
          en: 'Write transformation models that can target Snowflake, BigQuery, Databricks, or PostgreSQL with minimal dialect changes.',
          cs: 'Možnost provozovat datové modely identicky nad Snowflake, BigQuery, Databricks i Redshiftem.',
        },
      },
      {
        name: 'Jinja Templating & Package Manager',
        detail: {
          en: 'Leverage community packages like dbt-utils for complex SQL generation, deduplication macros, and surrogate keys.',
          cs: 'Využití komunitních balíčků (např. dbt-utils) pro generování SQL maker, náhradních klíčů a deduplikací.',
        },
      },
      {
        name: 'Ubiquitous Market Demand & Ecosystem',
        detail: {
          en: 'Demanded in over 52% of Analytics Engineer job postings across enterprise corporations.',
          cs: 'Vyžadováno u více než 52 % inzerátů Analytics Engineerů v předních korporacích.',
        },
      },
    ],
    shared: [
      {
        name: 'SQL-First Transformation (ELT)',
        detail: {
          en: 'Transform data directly in the warehouse using performant distributed compute rather than external ETL engines.',
          cs: 'Transformace dat přímo v datovém skladu s využitím jeho výpočetní síly namísto externích ETL nástrojů.',
        },
      },
      {
        name: 'Git Version Control & CI/CD Testing',
        detail: {
          en: 'Treat data transformations like production software code with branch reviews and automated regression tests.',
          cs: 'Správa transformací jako softwarového kódu s revizemi v Gitu a automatickými testy kvality.',
        },
      },
      {
        name: 'DAG Dependency Graph & Lineage',
        detail: {
          en: 'Automatic resolution of model dependencies using ref() statements, ensuring correct execution order.',
          cs: 'Automatické sestavení stromu závislostí modelů, které garantuje správné pořadí běhu transformací.',
        },
      },
    ],
    uniqueB: [
      {
        name: 'Native BigQuery Integration & Zero Licensing',
        detail: {
          en: 'Built into Google Cloud Console with no additional server costs, third-party accounts, or orchestrators required.',
          cs: 'Přímo v konzoli Google Cloud bez nutnosti platit licence externím službám nebo spravovat servery.',
        },
      },
      {
        name: 'SQLX Syntax with Inline JavaScript',
        detail: {
          en: 'Execute JavaScript functions directly within SQL model files for dynamic configuration and declaration.',
          cs: 'Možnost definovat pomocné JavaScript funkce přímo v těle SQL souboru pro dynamickou konfiguraci.',
        },
      },
      {
        name: 'Seamless GCP IAM Security Model',
        detail: {
          en: 'Leverages Google Cloud service accounts, secrets manager, and service-to-service IAM permissions natively.',
          cs: 'Využití servisních účtů Google Cloud a centrální správy oprávnění bez nutnosti ukládat hesla.',
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
      diagramBullets: def.diagramBullets,
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
      diagramBullets: def.diagramBullets,
      uniqueA: def.uniqueA,
      shared: def.shared,
      uniqueB: def.uniqueB,
    };
  }
}

export function getAllComparisons(): ComparisonResolved[] {
  return COMPARISONS_CATALOG.map((c) => getComparison(c.slug)!).filter(Boolean);
}
