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

export interface FreeAiCourse {
  id: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Hugging Face' | 'Stanford' | 'Harvard' | 'DeepLearning.AI' | 'IBM' | 'NVIDIA' | 'Microsoft';
  title: {
    en: string;
    cs: string;
  };
  skills: string[];
  url: string;
  duration: {
    en: string;
    cs: string;
  };
  format: {
    en: string;
    cs: string;
  };
  marketSignal: {
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
      en: 'Google Cloud Professional Data Engineer Professional Certificate',
      cs: 'Google Cloud Professional Data Engineer Profesionální certifikát',
    },
    skills: ['BigQuery', 'GCP', 'Dataflow', 'Dataproc', 'Pub/Sub'],
    url: 'https://www.coursera.org/professional-certificates/gcp-data-engineering',
    duration: {
      en: '2-3 months (6 hrs/week)',
      cs: '2-3 měsíce (6 hod/týdně)',
    },
    level: {
      en: 'Intermediate → Advanced',
      cs: 'Středně pokročilý → Pokročilý',
    },
    marketSignal: {
      en: 'Google Cloud & BigQuery rank among the top enterprise cloud requirements in job postings',
      cs: 'Google Cloud a BigQuery patří k nejžádanějším podnikovým cloudovým technologiím v inzerátech',
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
      en: 'Python and SQL represent the two primary required languages across data engineering job postings',
      cs: 'Python a SQL představují dva nejčastěji poptávané základní jazyky u inženýrských datových pozic',
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
      en: 'LLM fine-tuning, PEFT, and model alignment are high-priority capabilities across enterprise AI teams',
      cs: 'Práce s LLM, fine-tuning a alignment modelů patří k nejžádanějším schopnostem v týmech podnikové AI',
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
      en: 'dbt and modern modular SQL transformations define the benchmark for analytics engineering',
      cs: 'dbt a modulární SQL transformace představují oborový standard pro pozice analytics engineer',
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
      en: 'IBM RAG and Agentic AI Professional Certificate',
      cs: 'IBM RAG a Agentic AI Profesionální certifikát',
    },
    skills: ['AI Agents', 'RAG', 'Vector DB', 'LangChain', 'Python'],
    url: 'https://www.coursera.org/professional-certificates/ibm-rag-and-agentic-ai',
    duration: {
      en: '3-4 months (4 hrs/week)',
      cs: '3-4 měsíce (4 hod/týdně)',
    },
    level: {
      en: 'Intermediate → Advanced',
      cs: 'Středně pokročilý → Pokročilý',
    },
    marketSignal: {
      en: 'RAG pipelines, vector retrieval, and autonomous agent frameworks are high-growth enterprise architecture skills',
      cs: 'RAG architektury, vektorové vyhledávání a autonomní agenti tvoří klíčovou růstovou oblast v podnikovém vývoji',
    },
    description: {
      en: 'Hands-on curriculum by IBM covering retrieval-augmented generation (RAG), vector embeddings, multi-agent frameworks (LangGraph, CrewAI), and production tool use.',
      cs: 'Praktické kurikulum od IBM zaměřené na RAG architektury, embeddingy ve vektorových databázích, agentní workflows (LangGraph, CrewAI) a řízené volání nástrojů.',
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
      en: 'Power BI, Tableau, and executive dashboard storytelling are core requirements across business intelligence roles',
      cs: 'Power BI, Tableau a schopnost předávat vhled vedení firmy jsou základem pro Business Intelligence role',
    },
    description: {
      en: 'Master executive KPI design, dashboard performance tuning, cohort retention analysis, and stakeholder storytelling using industry-standard BI suites.',
      cs: 'Zvládněte návrh exekutivních KPI, optimalizaci rychlosti dashboardů, kohortové analýzy a srozumitelné předávání vhledu byznysovým lídrům.',
    },
  },
  {
    id: 'coursera-google-ai-agents',
    platform: 'Coursera',
    trackId: 'applied-ai',
    title: {
      en: 'Google Cloud AI Agents: From Foundations to Enterprise Scale',
      cs: 'Google Cloud AI Agenti: Od základů po enterprise nasazení',
    },
    skills: ['AI Agents', 'Gemini Enterprise', 'Agent Memory & Tools', 'Vertex AI', 'VPC Security'],
    url: 'https://www.coursera.org/specializations/google-cloud-ai-agents',
    duration: {
      en: '1-2 months (5 hrs/week)',
      cs: '1-2 měsíce (5 hod/týdně)',
    },
    level: {
      en: 'Intermediate → Advanced',
      cs: 'Středně pokročilý → Pokročilý',
    },
    marketSignal: {
      en: 'Official 2026 Google Cloud curriculum for production agent deployment',
      cs: 'Oficiální kurikulum Google Cloud pro nasazování agentních systémů do produkce',
    },
    description: {
      en: 'End-to-end specialization covering Gemini Enterprise, agent memory/state management, deterministic tool use, private VPC connections, and enterprise production safeguards.',
      cs: 'Ucelená specializace pokrývající Gemini Enterprise, správu stavu a paměti agentů, deterministické volání nástrojů, privátní síťové propojení a zabezpečení produkčních systémů.',
    },
  },
  {
    id: 'coursera-google-genai-path',
    platform: 'Coursera',
    trackId: 'applied-ai',
    title: {
      en: 'Introduction to Generative AI Learning Path',
      cs: 'Generativní AI: Oficiální vzdělávací dráha Google Cloud',
    },
    skills: ['Generative AI', 'LLMs', 'Transformer Models', 'Model Garden', 'Vertex AI'],
    url: 'https://www.coursera.org/specializations/introduction-to-generative-ai',
    duration: {
      en: '3-4 weeks (4 hrs/week)',
      cs: '3-4 týdny (4 hod/týdně)',
    },
    level: {
      en: 'Foundational',
      cs: 'Základní',
    },
    marketSignal: {
      en: 'Foundational entrypoint for enterprise cloud data practitioners',
      cs: 'Základní oficiální průprava pro moderní práci s modely v cloudu',
    },
    description: {
      en: 'Curated by Google Cloud engineers: fundamental principles of Large Language Models, attention mechanisms, ethical AI governance, and Vertex AI Model Garden workflows.',
      cs: 'Připraveno inženýry Google Cloud: principy velkých jazykových modelů, mechanismus attention, etické řízení AI a praktická práce s Vertex AI Model Garden.',
    },
  },
  {
    id: 'coursera-google-data-analytics',
    platform: 'Coursera',
    trackId: 'analytics',
    title: {
      en: 'Introduction to Data Analytics on Google Cloud',
      cs: 'Úvod do moderní datové analytiky na Google Cloud',
    },
    skills: ['BigQuery', 'Looker', 'Cloud Storage', 'SQL', 'Data Pipelines'],
    url: 'https://www.coursera.org/learn/data-analytics-google-cloud',
    duration: {
      en: '4 weeks (3 hrs/week)',
      cs: '4 týdny (3 hod/týdně)',
    },
    level: {
      en: 'Foundational',
      cs: 'Základní',
    },
    marketSignal: {
      en: 'Core BigQuery & analytics ingestion fundamentals for enterprise scale',
      cs: 'Základní stavební kameny pro práci s BigQuery, Lookerem a analytickými daty v cloudu',
    },
    description: {
      en: 'Explore the modern cloud data ecosystem: structuring data lakes in Cloud Storage, serverless analytics in BigQuery, and enterprise BI modeling in Looker.',
      cs: 'Seznamte se s moderním datovým ekosystémem: data lakes v Cloud Storage, serverless SQL dotazy v BigQuery a tvorba BI reportů v Lookeru.',
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
      en: 'Industry-standard credential for enterprise Lakehouse and Apache Spark deployments',
      cs: 'Uznávaná oborová certifikace pro platformu Databricks Lakehouse a Apache Spark',
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

export const FREE_AI_COURSES: FreeAiCourse[] = [
  {
    id: 'openai-academy',
    provider: 'OpenAI',
    title: {
      en: 'OpenAI Academy: Prompting, Agents & Workflows',
      cs: 'OpenAI Academy: Prompting, agenti a automatizace workflow',
    },
    skills: ['ChatGPT', 'Prompt Engineering', 'AI Agents', 'Function Calling', 'Workflows'],
    url: 'https://academy.openai.com',
    duration: {
      en: 'Self-paced',
      cs: 'Vlastní tempo',
    },
    format: {
      en: 'Free Certificate',
      cs: 'Certifikát zdarma',
    },
    marketSignal: {
      en: 'Official training straight from the ChatGPT research and product team',
      cs: 'Oficiální výuka přímo od vývojového a výzkumného týmu ChatGPT',
    },
    description: {
      en: 'Interactive curriculum straight from OpenAI covering systematic prompting patterns, agent tool integrations, and modern workflow automation. Self-paced with a free certificate.',
      cs: 'Interaktivní kurikulum přímo od tvůrců OpenAI. Pokrývá promptovací techniky, stavbu agentů, napojení externích API nástrojů a automatizaci rutinních úkolů. Včetně bezplatného certifikátu.',
    },
  },
  {
    id: 'anthropic-ai-fluency',
    provider: 'Anthropic',
    title: {
      en: 'Anthropic Academy: AI Fluency & The 4D Framework',
      cs: 'Anthropic Academy: AI Fluency a rámec 4D pro rozhodování',
    },
    skills: ['Claude 3.5 Sonnet', 'Delegation', 'System Prompts', 'Evaluation', 'AI Judgment'],
    url: 'https://github.com/anthropics/courses',
    duration: {
      en: 'Self-paced',
      cs: 'Vlastní tempo',
    },
    format: {
      en: 'Curriculum & Notebooks',
      cs: 'Kurikulum & interaktivní notebooky',
    },
    marketSignal: {
      en: 'Teaches actual human-in-the-loop engineering judgment over brittle prompt hacks',
      cs: 'Učí inženýrský úsudek a rigorózní evaluaci místo křehkých promptových triků',
    },
    description: {
      en: 'Teaches Anthropic’s 4D framework: delegation, description, discernment, and diligence. Focuses on building rigorous evaluation discipline and high-reliability reasoning with Claude.',
      cs: 'Výukový rámec od tvůrců modelu Claude zaměřený na 4 klíčové pilíře: delegování, popis, rozlišování a pečlivost. Pomáhá budovat kritický inženýrský úsudek a spolehlivost výstupů.',
    },
  },
  {
    id: 'harvard-generative-ai',
    provider: 'Harvard',
    title: {
      en: 'Harvard: Generative AI: How to Use It and Why It Matters',
      cs: 'Harvard: Generativní AI – jak ji používat a proč na ní záleží',
    },
    skills: ['Executive AI', 'Strategic AI Adoption', 'Ethics & Governance', 'GenAI Strategy'],
    url: 'https://pll.harvard.edu/course/generative-ai-leaders',
    duration: {
      en: '4-6 hours self-paced',
      cs: '4-6 hodin vlastním tempem',
    },
    format: {
      en: 'Executive Academic Course',
      cs: 'Akademický přehled pro lídry',
    },
    marketSignal: {
      en: 'Built specifically for leaders, managers, and non-technical decision makers',
      cs: 'Vytvořeno přímo pro lídry, manažery a byznysové stratégy',
    },
    description: {
      en: 'Harvard academic course tailored for leaders and non-technical professionals with zero prior background needed. Explains technological mechanics, ethical considerations, and organizational strategy.',
      cs: 'Univerzitní kurz z Harvardu pro netechnické lídry a manažery bez předchozích znalostí. Vysvětluje základní principy, řízení rizik a firemní adaptaci generativní AI.',
    },
  },
  {
    id: 'google-grow-ai-basics',
    provider: 'Google',
    title: {
      en: 'Grow with Google: AI Basics & Cloud Skills',
      cs: 'Grow with Google: Základy AI a cloudové dovednosti',
    },
    skills: ['Gemini', 'Generative AI', 'LLMs', 'Cloud Fundamentals', 'Productivity'],
    url: 'https://grow.google/ai',
    duration: {
      en: 'Self-paced modules',
      cs: 'Samostatné moduly',
    },
    format: {
      en: 'Interactive Modules',
      cs: 'Interaktivní moduly',
    },
    marketSignal: {
      en: 'Official introductory bridge to Google Cloud & Gemini ecosystems',
      cs: 'Oficiální úvodní průprava do světa Google Cloud a modelů Gemini',
    },
    description: {
      en: 'Official Google training covering foundational principles of Generative AI, Large Language Models, and practical Gemini-assisted productivity workflows.',
      cs: 'Oficiální školení od Googlu pokrývající principy generativních modelů, základy LLM a praktické využití ekosystému Gemini pro zvýšení produktivity.',
    },
  },
  {
    id: 'deeplearning-ai-for-everyone',
    provider: 'DeepLearning.AI',
    title: {
      en: 'AI for Everyone by Andrew Ng',
      cs: 'AI pro každého (Andrew Ng)',
    },
    skills: ['Machine Learning Basics', 'Data Strategy', 'AI Project Lifecycle', 'AI Ethics'],
    url: 'https://www.deeplearning.ai/courses/ai-for-everyone/',
    duration: {
      en: '6 hours',
      cs: '6 hodin',
    },
    format: {
      en: 'Free Audit on Coursera',
      cs: 'Audit zdarma na Coursera',
    },
    marketSignal: {
      en: 'The most recognized non-technical introduction into AI globally',
      cs: 'Globálně nejuznávanější netechnický úvod do světa umělé inteligence',
    },
    description: {
      en: 'The classic non-technical introduction by Andrew Ng. No equations, no coding prerequisites: learn what modern AI can and cannot do, and how to spot realistic project opportunities.',
      cs: 'Legendární netechnický úvod od průkopníka AI Andrewa Nga. Žádné složité rovnice ani programování: pochopte, co AI reálně dokáže, kde jsou její limity a jak řídit AI projekty.',
    },
  },
  {
    id: 'huggingface-agents-course',
    provider: 'Hugging Face',
    title: {
      en: 'Hugging Face: Open-Source AI Agents & LLM Course',
      cs: 'Hugging Face: Praktický kurz AI agentů a LLM',
    },
    skills: ['smolagents', 'Open Source LLMs', 'Agent Frameworks', 'Tool Use', 'Gradio'],
    url: 'https://huggingface.co/learn/agents-course',
    duration: {
      en: 'Hands-on projects',
      cs: 'Praktické projekty',
    },
    format: {
      en: 'Open Source Community Track',
      cs: 'Otevřené komunitní kurikulum',
    },
    marketSignal: {
      en: 'Essential curriculum for engineering practitioners building open-weight systems',
      cs: 'Nezbytné kurikulum pro inženýry stavějící nad open-source modely',
    },
    description: {
      en: 'Deeply technical, constantly updated hands-on curriculum. Build autonomous multi-agent pipelines with smolagents, integrate search and bash tools, and deploy on Hugging Face Hub.',
      cs: 'Praktické, průběžně aktualizované inženýrské kurikulum. Naučte se stavět autonomní agenty pomocí knihovny smolagents, napojovat nástroje a publikovat řešení na Hugging Face.',
    },
  },
  {
    id: 'stanford-cs221-ai',
    provider: 'Stanford',
    title: {
      en: 'Stanford CS221: Artificial Intelligence: Principles & Techniques',
      cs: 'Stanford CS221: Principy a techniky umělé inteligence',
    },
    skills: ['Search Algorithms', 'Markov Decision Processes', 'Machine Learning', 'Logic & Inference'],
    url: 'https://stanford-cs221.github.io/',
    duration: {
      en: 'Full academic term',
      cs: 'Celý univerzitní semestr',
    },
    format: {
      en: 'Public Lectures & Assignments',
      cs: 'Veřejné přednášky a úlohy',
    },
    marketSignal: {
      en: 'Rigorous Ivy-league mathematical foundation for serious practitioners',
      cs: 'Špičkový akademický základ pro inženýry hledající hluboké matematické porozumění',
    },
    description: {
      en: 'Rigorous university course led by Percy Liang. Covers reflex models, state-based search, constraint satisfaction, probabilistic models, and machine learning principles.',
      cs: 'Komplexní semestrální kurz vedený Percym Liangem. Pokrývá reflexní modely, prohledávání stavového prostoru, markovské rozhodovací procesy a matematické základy strojového učení.',
    },
  },
  {
    id: 'ibm-skillsbuild-ai',
    provider: 'IBM',
    title: {
      en: 'IBM SkillsBuild: AI Fundamentals & Credential',
      cs: 'IBM SkillsBuild: Základy AI a digitální odznak',
    },
    skills: ['AI Ethics', 'NLP Basics', 'Computer Vision Basics', 'Credly Badge'],
    url: 'https://skillsbuild.org',
    duration: {
      en: '8-10 hours',
      cs: '8-10 hodin',
    },
    format: {
      en: 'Verified Credly Badge',
      cs: 'Ověřitelný Credly odznak',
    },
    marketSignal: {
      en: 'Verifiable corporate credential recognized by enterprise HR teams',
      cs: 'Ověřitelný digitální odznak uznávaný v podnikovém náboru',
    },
    description: {
      en: 'Self-paced introductory track covering neural networks, NLP, and computer vision. Completing the curriculum grants a verified, LinkedIn-shareable Credly digital badge.',
      cs: 'Bezplatný kurz zaměřený na neuronové sítě, zpracování přirozeného jazyka a etiku AI. Úspěšné dokončení generuje oficiální digitální odznak Credly pro profil na LinkedIn.',
    },
  },
  {
    id: 'nvidia-deep-learning-ai',
    provider: 'NVIDIA',
    title: {
      en: 'NVIDIA: Generative AI & Agentic AI Explained',
      cs: 'NVIDIA: Generativní a agentní AI v praxi',
    },
    skills: ['GPU Computing', 'Model Acceleration', 'NIM Microservices', 'RAG Infra'],
    url: 'https://www.nvidia.com/en-us/training/',
    duration: {
      en: 'Short self-paced modules',
      cs: 'Krátké samostatné moduly',
    },
    format: {
      en: 'Technical Briefings & Labs',
      cs: 'Technické briefingy & laby',
    },
    marketSignal: {
      en: 'Hardware-aware AI engineering insight from the market compute leader',
      cs: 'Hardwarový a infrastrukturní pohled od lídra v akceleraci AI',
    },
    description: {
      en: 'Concise architectural introductions directly from the engineers designing modern GPU acceleration. Explains generative model mechanics, inference optimization, and agentic workflows.',
      cs: 'Stručné a úderné výukové materiály přímo od tvůrců AI hardwaru. Vysvětlují principy inferenční akcelerace, generativních modelů a architektury agentních systémů.',
    },
  },
  {
    id: 'microsoft-learn-ai-fluency',
    provider: 'Microsoft',
    title: {
      en: 'Microsoft Learn: AI Fluency & Copilot Foundations',
      cs: 'Microsoft Learn: AI Fluency a základy práce s Copilotem',
    },
    skills: ['Microsoft 365 Copilot', 'Azure OpenAI', 'Semantic Kernel', 'Prompting'],
    url: 'https://learn.microsoft.com/en-us/training/paths/copilot/',
    duration: {
      en: '4-6 hours',
      cs: '4-6 hodin',
    },
    format: {
      en: 'Interactive Learning Path',
      cs: 'Interaktivní studijní cesta',
    },
    marketSignal: {
      en: 'Essential enterprise workplace skill across Microsoft corporate stacks',
      cs: 'Klíčová dovednost pro podnikovou produktivitu v Microsoft ekosystému',
    },
    description: {
      en: 'Practical modules teaching how to collaborate with Copilot across enterprise productivity suites and connect generative models to enterprise data repositories.',
      cs: 'Praktické studijní moduly zaměřené na efektivní využití Copilota v podnikových aplikacích, základy Azure OpenAI a bezpečné propojování modelů s firemními daty.',
    },
  },
];
