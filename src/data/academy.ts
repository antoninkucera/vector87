export interface AcademyCourse {
  id: string;
  platform: 'Coursera' | 'DataCamp' | 'DeepLearning.AI' | 'Google Cloud' | 'dbt Labs';
  trackId: 'analytics' | 'data-engineering' | 'applied-ai';
  skills: string[];
  url: string;
  duration: {
    en: string;
    cs: string;
  };
  level: {
    en: string;
    cs: string;
  };
  marketSignal: {
    en: string;
    cs: string;
  };
  title: {
    en: string;
    cs: string;
  };
  description: {
    en: string;
    cs: string;
  };
}

export interface CertificationItem {
  id: string;
  code: string;
  title: string;
  issuer: string;
  skills: string[];
  url: string;
  level: {
    en: string;
    cs: string;
  };
  marketValue: {
    en: string;
    cs: string;
  };
  summary: {
    en: string;
    cs: string;
  };
}

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'gcp-data-eng-spec',
    platform: 'Coursera',
    trackId: 'data-engineering',
    title: {
      en: 'Google Cloud Professional Data Engineer Specialization',
      cs: 'Google Cloud Professional Data Engineer Specializace',
    },
    skills: ['BigQuery', 'GCP', 'Dataflow', 'Dataproc', 'Pub/Sub'],
    url: 'https://www.coursera.org/professional-certificates/gcp-data-engineering',
    duration: {
      en: '2–3 months (6 hrs/week)',
      cs: '2–3 měsíce (6 hod/týdně)',
    },
    level: {
      en: 'Intermediate → Advanced',
      cs: 'Středně pokročilý → Pokročilý',
    },
    marketSignal: {
      en: '#1 Cloud Data Engineering track in S&P 500 telemetry',
      cs: '#1 cloudová specializace v datech S&P 500 inzerátů',
    },
    description: {
      en: 'Official curriculum by Google Cloud covering large-scale data processing with BigQuery, streaming pipelines with Dataflow, and modern lakehouse architecture.',
      cs: 'Oficiální certifikační kurikulum od Google Cloud pokrývající velkoobjemové zpracování dat v BigQuery, streamovací pipeline v Dataflow a architekturu moderních lakehouse systémů.',
    },
  },
  {
    id: 'datacamp-data-engineer-python',
    platform: 'DataCamp',
    trackId: 'data-engineering',
    title: {
      en: 'Data Engineer with Python Career Track',
      cs: 'Data Engineer with Python Kariérní Dráha',
    },
    skills: ['Python', 'SQL', 'Git', 'Docker', 'PySpark'],
    url: 'https://www.datacamp.com/tracks/data-engineer-with-python',
    duration: {
      en: '60 hours hands-on',
      cs: '60 hodin interaktivního kódování',
    },
    level: {
      en: 'Foundational → Mid IC',
      cs: 'Základní → Středně pokročilý',
    },
    marketSignal: {
      en: 'Python & SQL required in 74% of enterprise data engineering positions',
      cs: 'Python a SQL jsou vyžadovány v 74 % podnikových datových rolí',
    },
    description: {
      en: 'Interactive, browser-based coding track covering robust data pipelines, PostgreSQL, unit testing, software design patterns for data, and PySpark fundamentals.',
      cs: 'Praktická interaktivní dráha v prohlížeči zaměřená na robustní ETL pipeline, SQL, automatizované testování kódu a základy distribuovaného výpočtu v PySparku.',
    },
  },
  {
    id: 'deeplearning-genai-llm',
    platform: 'DeepLearning.AI',
    trackId: 'applied-ai',
    title: {
      en: 'Generative AI with Large Language Models',
      cs: 'Generativní AI a práce s velkými jazykovými modely (LLMs)',
    },
    skills: ['LLM', 'GenAI', 'Fine-Tuning', 'RLHF', 'PEFT/LoRA'],
    url: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/',
    duration: {
      en: '3 weeks (5 hrs/week)',
      cs: '3 týdny (5 hod/týdně)',
    },
    level: {
      en: 'Intermediate',
      cs: 'Středně pokročilý',
    },
    marketSignal: {
      en: 'LLM & Generative AI skills grew +310% YoY across top tier tech employers',
      cs: 'Poptávka po LLM a GenAI vzrostla o +310 % meziročně',
    },
    description: {
      en: 'Created by Andrew Ng and AWS: practical engineering foundations of transformer architectures, pre-training, instruction fine-tuning, and alignment evaluation in production.',
      cs: 'Kurz od Andrewa Nga a AWS pokrývající transformery, instruction fine-tuning, techniky PEFT/LoRA a systematické vyhodnocování kvality modelů v produkci.',
    },
  },
  {
    id: 'datacamp-analytics-engineering',
    platform: 'DataCamp',
    trackId: 'analytics',
    title: {
      en: 'Analytics Engineering with dbt & SQL',
      cs: 'Analytics Engineering s nástrojem dbt & moderním SQL',
    },
    skills: ['dbt', 'SQL', 'Data Modeling', 'Testing', 'Semantic Layer'],
    url: 'https://www.datacamp.com/courses/introduction-to-dbt',
    duration: {
      en: '20 hours hands-on',
      cs: '20 hodin praktických cvičení',
    },
    level: {
      en: 'Foundational → Senior IC',
      cs: 'Základní → Pokročilý analytik',
    },
    marketSignal: {
      en: 'dbt penetration surged to 28% in modern data warehouse stacks',
      cs: 'Penetrace dbt v moderních cloudových skladech dosahuje 28 %',
    },
    description: {
      en: 'Bridge the gap between raw data analysis and software-grade transformations. Learn modular dimensional modeling, automated testing assertions, and Git-driven CI/CD.',
      cs: 'Překleňte propast mezi ad-hoc dotazováním a inženýrským vývojem. Naučte se modulární dimenzionální modelování, testování dat a verzování v Gitu.',
    },
  },
  {
    id: 'coursera-ibm-ai-engineering',
    platform: 'Coursera',
    trackId: 'applied-ai',
    title: {
      en: 'Applied AI & Autonomous Agents Specialization',
      cs: 'Specializace Aplikovaná AI a Autonomní Agenti',
    },
    skills: ['AI Agents', 'RAG', 'Vector DB', 'LangChain', 'Python'],
    url: 'https://www.coursera.org/specializations/applied-artifical-intelligence-ibm-watson-systems',
    duration: {
      en: '3 months (4 hrs/week)',
      cs: '3 měsíce (4 hod/týdně)',
    },
    level: {
      en: 'Intermediate → Advanced',
      cs: 'Středně pokročilý → Pokročilý',
    },
    marketSignal: {
      en: 'Autonomous Agents & Vector Search signal stage: Scaling in enterprise R&D',
      cs: 'Agentic AI a vektorové databáze jsou v dynamické fázi Scaling',
    },
    description: {
      en: 'Hands-on projects covering retrieval-augmented generation (RAG), vector embeddings, multi-agent frameworks, and deterministic tool use for enterprise applications.',
      cs: 'Praktické projekty zaměřené na RAG architektury, embeddingy ve vektorových databázích, agentní workflows a řízené volání API.',
    },
  },
  {
    id: 'datacamp-bi-data-analyst',
    platform: 'DataCamp',
    trackId: 'analytics',
    title: {
      en: 'Modern Business Intelligence & Data Visualization Track',
      cs: 'Moderní Business Intelligence & Datová Vizualizace',
    },
    skills: ['Power BI', 'Tableau', 'SQL', 'Storytelling', 'Metrics Design'],
    url: 'https://www.datacamp.com/tracks/bi-analyst',
    duration: {
      en: '45 hours practical',
      cs: '45 hodin praktického výcviku',
    },
    level: {
      en: 'Foundational → Mid IC',
      cs: 'Základní → Středně pokročilý',
    },
    marketSignal: {
      en: 'Business-critical telemetry: 52% of organizations require executive data translation',
      cs: '52 % firem požaduje schopnost překládat telemetrii do exekutivního rozhodování',
    },
    description: {
      en: 'Master executive KPI design, dashboard performance tuning, cohort retention analysis, and stakeholder storytelling using industry-standard BI suites.',
      cs: 'Zvládněte návrh exekutivních KPI, optimalizaci rychlosti dashboardů, kohortové analýzy a srozumitelné předávání vhledu byznysovým lídrům.',
    },
  },
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    id: 'cert-gcp-pde',
    code: 'GCP PDE',
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    skills: ['BigQuery', 'Dataflow', 'Cloud Storage', 'Vertex AI', 'IAM & Security'],
    url: 'https://cloud.google.com/learn/certification/data-engineer',
    level: {
      en: 'Professional (2+ years cloud experience)',
      cs: 'Profesionální (2+ roky praxe v cloudu)',
    },
    marketValue: {
      en: 'High salary premium in enterprise cloud migrations',
      cs: 'Výrazná platová prémie v podnikových cloudových migracích',
    },
    summary: {
      en: 'Gold standard certification assessing design, security, scalability, and operational reliability of BigQuery and GCP analytical pipelines.',
      cs: 'Zlatý standard ověřující schopnost navrhovat, zabezpečit a škálovat analytická řešení v prostředí Google Cloud a BigQuery.',
    },
  },
  {
    id: 'cert-databricks-de',
    code: 'DATABRICKS DE',
    title: 'Databricks Certified Data Engineer Professional',
    issuer: 'Databricks',
    skills: ['Delta Lake', 'Apache Spark', 'Databricks SQL', 'Lakehouse', 'Unity Catalog'],
    url: 'https://www.databricks.com/learn/certification/data-engineer-professional',
    level: {
      en: 'Senior / Staff IC',
      cs: 'Senior / Staff architekt',
    },
    marketValue: {
      en: '#1 fastest growing lakehouse credential in enterprise data teams',
      cs: '#1 nejrychleji rostoucí certifikace pro lakehouse platformy',
    },
    summary: {
      en: 'Validates mastery of streaming, batch ETL, Unity Catalog governance, and production Lakehouse architectures with Delta Lake and Spark.',
      cs: 'Ověřuje pokročilé dovednosti ve streamingu, batch ETL, řízení přístupů v Unity Catalogu a produkční správě Delta Lake.',
    },
  },
  {
    id: 'cert-dbt-dev',
    code: 'DBT CERTIFIED',
    title: 'dbt Certified Analytics Engineering Professional',
    issuer: 'dbt Labs',
    skills: ['dbt Core / Cloud', 'Data Testing', 'Jinja / Macros', 'CI/CD'],
    url: 'https://www.getdbt.com/certifications/developer',
    level: {
      en: 'Mid → Senior IC',
      cs: 'Mid → Senior Analytics Engineer',
    },
    marketValue: {
      en: 'Essential benchmark for modern analytics engineering teams',
      cs: 'Základní průkaz kvality v moderních týmech Analytics Engineeringu',
    },
    summary: {
      en: 'Tests proficiency in modular SQL transformations, snapshotting, documentation generation, and Git-governed production workflows.',
      cs: 'Testuje pokročilé schopnosti modulárního modelování v SQL, verzování sémantické vrstvy a automatizovaného testování kvality dat.',
    },
  },
];
