import marketData from './market-data.json';
import { ACADEMY_COURSES, CERTIFICATIONS_LIST, type AcademyCourse, type CertificationItem } from './academy';

export interface AuthorNoteLink {
  label: string;
  href: string;
}

export interface AuthorNoteContent {
  title: string;
  lead: string;
  paragraphs: string[];
  links?: AuthorNoteLink[];
}

export interface TechnologyComparisonTarget {
  targetSlug: string;
  targetName: string;
}

export interface TechnologyDefinition {
  id: string; // canonical URL slug, e.g. 'bigquery'
  name: string;
  category: 'cloud' | 'programming' | 'ai-ml' | 'data-platform' | 'bi-analytics' | 'framework' | 'mlops';
  aliases?: string[];
  skillIdMatch?: string[]; // IDs in marketData to match (e.g. ['bigquery'], ['snowflake', 'snowflake_db'])
  tags: string[];
  description: {
    en: string[];
    cs: string[];
  };
  authorNotes?: {
    en: AuthorNoteContent;
    cs: AuthorNoteContent;
  };
  comparisons?: TechnologyComparisonTarget[];
}

export interface TechnologyRoleMatch {
  roleId: string;
  roleName: string;
  kebabSlug: string;
  penetrationPct: number;
  jobCount: number;
}

export interface AgentFrameworkMetric {
  skillId: string;
  name: string;
  paradigm: string;
  summary: string;
  jobCount: number;
  penetrationPct: number;
  shareOfAgentJobsPct: number;
  topCompanies: Array<{ companyName: string; sector?: string | null; jobCount: number }>;
  samplePostings: Array<{ title: string; companyName: string; countryCode: string; url: string }>;
}

export interface TechnologyResolved {
  id: string;
  name: string;
  category: TechnologyDefinition['category'];
  aliases: string[];
  tags: string[];
  description: {
    en: string[];
    cs: string[];
  };
  authorNotes?: {
    en: AuthorNoteContent;
    cs: AuthorNoteContent;
  };
  comparisons: TechnologyComparisonTarget[];
  // Telemetry metrics
  jobCount: number;
  penetrationPct: number;
  rank: number;
  totalCatalogued: number;
  // Matching relationships
  topRoles: TechnologyRoleMatch[];
  pairedSkills: Array<{ skillName: string; cooccurrenceCount?: number; penetrationPct?: number }>;
  topCompanies: Array<{ companyName: string; sector?: string | null; jobCount: number }>;
  recommendedCourses: AcademyCourse[];
  recommendedCerts: CertificationItem[];
  agentFrameworks?: AgentFrameworkMetric[];
}

export const TECHNOLOGIES_CATALOG: TechnologyDefinition[] = [
  {
    id: 'bigquery',
    name: 'BigQuery & BigLake',
    category: 'data-platform',
    aliases: ['google-bigquery', 'big-query'],
    skillIdMatch: ['bigquery'],
    tags: ['GCP', 'SQL', 'Serverless', 'Lakehouse', 'Iceberg', 'BigLake'],
    description: {
      en: [
        'Google BigQuery is the cornerstone serverless data warehouse and lakehouse engine on Google Cloud Platform. Built upon Google’s distributed Dremel query engine and Colossus storage architecture, it cleanly decouples compute from storage, enabling instantaneous elasticity and zero-infrastructure management.',
        'In modern enterprise job postings, BigQuery demand centers on large-scale analytical modeling (SQL/SQLX), Apache Iceberg interoperability via BigLake, integrated machine learning directly from SQL (BigQuery ML / Gemini multimodal models), and cost governance around BigQuery Editions and slot reservations.',
      ],
      cs: [
        'Google BigQuery je klíčový serverless datový sklad a lakehouse engine v prostředí Google Cloud Platform. Architektura založená na distribuovaném výpočetním enginu Dremel a úložišti Colossus důsledně odděluje compute od storage, což umožňuje bleskové škálování a nulovou režii se správou infrastruktury.',
        'V podnikových inzerátech se poptávka po BigQuery soustředí na rozsáhlé analytické modelování (SQL/SQLX), interoperabilitu s otevřenými formáty Apache Iceberg přes BigLake, přímé volání modelů ze SQL (BigQuery ML a Gemini) a řízení nákladů v rámci BigQuery Editions a slotových rezervací.',
      ],
    },
    authorNotes: {
      en: {
        title: 'Architectural Field Notes from Antonín Kučera',
        lead: 'Practical lessons from architecting enterprise data platforms, slot economics, and warehouse migrations.',
        paragraphs: [
          'BigQuery has transformed from a straightforward SQL query engine into a holistic analytical operating system (BigQuery Studio). In production at scale, success is rarely about writing basic SELECT statements; it requires mastering partition & clustering layouts to avoid full-table scans, fine-tuning BigQuery Editions (Standard vs. Enterprise vs. Enterprise Plus), and leveraging BigLake to query open table formats without vendor lock-in.',
          'When designing telemetry and log pipelines, pairing BigQuery with Dataform or dbt and native streaming buffers creates an exceptionally resilient, zero-maintenance lakehouse foundation.',
        ],
        links: [
          {
            label: 'BigQuery Overview: A New Navigation Hub in the Complex Analytics Platform ↗',
            href: 'https://antoninkucera.substack.com/p/bigquery-overview-a-new-navigation-hub-in-the-complex-analytics-platform',
          },
          {
            label: 'Mastering Tableau Cloud Logs: From S3 to hundreds of fields in BigQuery ↗',
            href: 'https://antoninkucera.substack.com/p/mastering-tableau-cloud-logs-from-s3-to-a-hundreds-fields-in-bigquery',
          },
        ],
      },
      cs: {
        title: 'Praktické poznámky k architektuře od Antonína Kučery',
        lead: 'Zkušenosti z návrhu podnikových datových platforem, slotové ekonomiky a migrací do cloudu.',
        paragraphs: [
          'BigQuery se v posledních letech posunulo od pouhého SQL analytického skladu k ucelenému analytickému prostředí (BigQuery Studio). V reálné podnikové praxi nerozhoduje znalost základního SELECTu, ale mistrné zvládnutí partitioningu a clusterování (které šetří terabajty skenovaných dat), optimalizace slotových rezervací v rámci BigQuery Editions a využití BigLake pro čtení otevřených formátů (Apache Iceberg) bez vendor lock-inu.',
          'Při stavbě analytických a logovacích pipeline poskytuje BigQuery v kombinaci s Dataformem či dbt a nativním streaming bufferem mimořádně stabilní a bezúdržbový základ pro moderní lakehouse.',
        ],
        links: [
          {
            label: 'BigQuery Overview: Nový rozcestník v komplexním světě datové platformy ↗',
            href: 'https://antoninkucera.substack.com/p/bigquery-overview-novy-rozcestnik-v-komplexnim-svete-dat',
          },
          {
            label: 'Mastering Tableau Cloud Logs: From S3 to hundreds of fields in BigQuery ↗',
            href: 'https://antoninkucera.substack.com/p/mastering-tableau-cloud-logs-from-s3-to-a-hundreds-fields-in-bigquery',
          },
        ],
      },
    },
    comparisons: [
      { targetSlug: 'snowflake', targetName: 'Snowflake' },
      { targetSlug: 'databricks', targetName: 'Databricks' },
    ],
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform (GCP)',
    category: 'cloud',
    aliases: ['google-cloud', 'google-cloud-platform'],
    skillIdMatch: ['gcp'],
    tags: ['Cloud', 'Hyperscaler', 'BigQuery', 'Vertex AI', 'Dataflow', 'Looker'],
    description: {
      en: [
        'Google Cloud Platform (GCP) is the premier hyperscaler for data engineering, advanced analytics, and AI/ML workloads. Leveraging Google’s global fiber backbone and pioneering open-source infrastructure (Kubernetes, MapReduce/BigQuery, TensorFlow), GCP delivers best-in-class data services.',
        'Enterprise job postings heavily emphasize the triad of BigQuery (warehouse/lakehouse), Vertex AI (enterprise GenAI & agent orchestration), and Google Cloud Dataflow (Apache Beam unified streaming/batch processing), alongside governed BI in Looker.',
      ],
      cs: [
        'Google Cloud Platform (GCP) představuje předního hyperscalera pro data engineering, pokročilou analytiku a aplikace umělé inteligence. Těží z globální infrastruktury Googlu a inovací, které daly vzniknout dnešnímu standardu distribuovaných systémů (Kubernetes, Dremel/BigQuery, TensorFlow).',
        'V podnikových nabídkách na GCP dominuje osvědčená triáda BigQuery (analytický sklad a lakehouse), Vertex AI (podnikové GenAI a nasazování modelů Gemini) a Google Cloud Dataflow (streamingové a dávkové pipeline na Apache Beam) v kombinaci s Lookerem.',
      ],
    },
    authorNotes: {
      en: {
        title: 'Enterprise GCP Architecture Perspective',
        lead: 'Why GCP remains an exceptional ecosystem for modern data-informed organizations.',
        paragraphs: [
          'GCP provides unprecedented developer velocity for analytics teams because core services like BigQuery, Cloud Pub/Sub, and Cloud Storage require zero infrastructure management. In contrast to more complex multi-component setups, a lean engineering team can manage enterprise-grade data ingestion on GCP without dedicated DevOps overhead.',
          'The integration between Vertex AI, BigQuery Vector Search, and Gemini makes GCP the most natural environment for organizations building production RAG and AI agent systems.',
        ],
        links: [
          {
            label: 'No Blueprint Exists: Why AI Made Me Double Down on Being Data-Informed ↗',
            href: 'https://antoninkucera.substack.com/p/no-blueprint-exists-why-ai-made-me-double-down-on-being-data-informed',
          },
          {
            label: 'BigQuery Overview: A New Navigation Hub ↗',
            href: 'https://antoninkucera.substack.com/p/bigquery-overview-a-new-navigation-hub-in-the-complex-analytics-platform',
          },
        ],
      },
      cs: {
        title: 'Pohled na podnikovou architekturu GCP',
        lead: 'Proč je Google Cloud mimořádně efektivním prostředím pro datově informované organizace.',
        paragraphs: [
          'GCP nabízí datovým týmům obrovskou rychlost vývoje, protože klíčové služby jako BigQuery, Pub/Sub a Cloud Storage nevyžadují žádnou správu serverů. Na rozdíl od těžkopádných infrastrukturních sestav dokáže i nevelký datový tým postavit robustní datovou platformu bez nutnosti dedikovaného DevOps dohledu.',
          'Díky přímé integraci mezi Vertex AI, BigQuery Vector Searchem a modely Gemini je dnes GCP nejpřirozenějším prostředím pro stavbu produkčních RAG systémů a podnikových AI agentů.',
        ],
        links: [
          {
            label: 'No Blueprint Exists: Proč mě AI utvrdila v přístupu Data-Informed ↗',
            href: 'https://antoninkucera.substack.com/p/no-blueprint-exists-why-ai-made-me-double-down-on-being-data-informed',
          },
          {
            label: 'BigQuery Overview: Nový rozcestník v komplexním světě datové platformy ↗',
            href: 'https://antoninkucera.substack.com/p/bigquery-overview-novy-rozcestnik-v-komplexnim-svete-dat',
          },
        ],
      },
    },
    comparisons: [
      { targetSlug: 'aws', targetName: 'AWS' },
      { targetSlug: 'azure', targetName: 'Microsoft Azure' },
    ],
  },
  {
    id: 'databricks',
    name: 'Databricks',
    category: 'data-platform',
    aliases: ['databricks-lakehouse'],
    skillIdMatch: ['databricks'],
    tags: ['Lakehouse', 'Apache Spark', 'Delta Lake', 'Unity Catalog', 'MLflow'],
    description: {
      en: [
        'Databricks pioneered the Lakehouse architecture, unifying data engineering, real-time streaming, data warehousing (Databricks SQL), and machine learning on a single governed storage layer powered by open-source Delta Lake and Apache Spark.',
        'Across S&P 500 job postings, Databricks leads the modern data platform segment with strong presence among Data Engineers and Data Architects. Core hiring requirements center on PySpark batch/streaming jobs, Unity Catalog universal governance, and end-to-end MLflow lifecycle management.',
      ],
      cs: [
        'Databricks je průkopníkem konceptu Lakehouse, který sjednocuje datové inženýrství, streaming, datové sklady (Databricks SQL) a strojové učení nad otevřeným úložným formátem Delta Lake a výpočetním enginem Apache Spark.',
        'V inzerátech korporátních firem si Databricks drží nejsilnější pozici mezi moderními datovými platformami. Zaměstnavatelé vyžadují především vývoj v PySparku, správu přístupů přes Unity Catalog a řízení životního cyklu modelů přes MLflow.',
      ],
    },
    comparisons: [
      { targetSlug: 'snowflake', targetName: 'Snowflake' },
      { targetSlug: 'bigquery', targetName: 'BigQuery' },
      { targetSlug: 'spark', targetName: 'Apache Spark' },
    ],
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'data-platform',
    aliases: ['snowflake_db', 'snowflake-data-cloud'],
    skillIdMatch: ['snowflake_db', 'snowflake'],
    tags: ['Data Warehouse', 'Data Cloud', 'Snowpark', 'Apache Iceberg', 'Cortex AI'],
    description: {
      en: [
        'Snowflake revolutionized cloud data warehousing with its multi-cluster shared data architecture, separating compute (Virtual Warehouses) from cloud storage and providing seamless data sharing across corporate boundaries.',
        'In corporate hiring, Snowflake is especially prominent among Analytics Engineers, Data Engineers, and BI Developers. Key technical expectations include Snowpark Python development, dbt transformations, Apache Iceberg table integration, and cost optimization of credit consumption.',
      ],
      cs: [
        'Snowflake změnil pravidla hry v cloudových datových skladech díky své architektuře oddělených virtuálních skladů (compute) a centralizovaného cloudového úložiště, která umožňuje bezpečné sdílení dat napříč organizacemi bez duplikace.',
        'Na trhu práce je Snowflake silně poptáván u Analytics Engineerů, Data Engineerů a BI specialistů. Důraz je kladen na vývoj v Pythonu přes Snowpark, orchestraci transformací v dbt, podporu Apache Iceberg a disciplinované řízení spotřeby kreditů.',
      ],
    },
    comparisons: [
      { targetSlug: 'databricks', targetName: 'Databricks' },
      { targetSlug: 'bigquery', targetName: 'BigQuery' },
    ],
  },
  {
    id: 'dbt',
    name: 'dbt (data build tool)',
    category: 'framework',
    aliases: ['dbt-core', 'dbt-cloud'],
    skillIdMatch: ['dbt'],
    tags: ['Analytics Engineering', 'SQL', 'Data Modeling', 'Data Testing', 'ELT'],
    description: {
      en: [
        'dbt (data build tool) is the standard transformation framework in modern analytics engineering. It enables data analysts and engineers to build production data pipelines inside cloud warehouses using modular SQL and software engineering best practices (Git version control, CI/CD, documentation, and automated testing).',
        'In job postings, dbt is the defining technical skill for Analytics Engineers (appearing in over 50% of postings) and is increasingly demanded from Data Engineers and BI Developers working with Snowflake, BigQuery, and Databricks.',
      ],
      cs: [
        'dbt (data build tool) představuje standard pro transformaci dat v moderním analytics engineeringu. Umožňuje analytikům a datovým inženýrům psát ELT transformace přímo uvnitř cloudových skladů pomocí modulárního SQL a osvědčených softwarových postupů (verzování v Gitu, automatické testy, CI/CD a generovaná dokumentace).',
        'V inzerátech je dbt naprosto klíčovou dovedností pro roli Analytics Engineera (objevuje se u více než 50 % pozic) a stále častěji je vyžadováno i po Data Engineerech pracujících se Snowflake, BigQuery nebo Databricks.',
      ],
    },
    comparisons: [
      { targetSlug: 'dataform', targetName: 'Dataform' },
      { targetSlug: 'sql', targetName: 'SQL' },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    skillIdMatch: ['python'],
    tags: ['Programming', 'Data Science', 'Data Engineering', 'AI/ML', 'PySpark', 'PyTorch'],
    description: {
      en: [
        'Python is the undisputed lingua franca of data science, data engineering, and artificial intelligence, present in nearly 40% of all tracked enterprise technical positions.',
        'From high-throughput data pipelines (PySpark, Polars, DuckDB) to ML training (PyTorch, scikit-learn) and modern LLM application development (LangChain, LlamaIndex), Python is a non-negotiable foundational requirement across almost all technical tracks.',
      ],
      cs: [
        'Python je nezpochybnitelným hlavním jazykem moderní datové vědy, datového inženýrství a umělé inteligence. Objevuje se v téměř 40 % všech sledovaných podnikových technických pozic.',
        'Od budování datových pipeline (PySpark, Polars, DuckDB) přes trénování modelů (PyTorch, scikit-learn) až po vývoj aplikací nad LLM (LangChain, LlamaIndex) představuje Python povinný základ pro prakticky všechny technické profily.',
      ],
    },
    comparisons: [
      { targetSlug: 'sql', targetName: 'SQL' },
      { targetSlug: 'r', targetName: 'R' },
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'programming',
    skillIdMatch: ['sql'],
    tags: ['Database', 'Query', 'Analytics', 'Data Modeling', 'Dimensional Modeling'],
    description: {
      en: [
        'Structured Query Language (SQL) remains the most durable and universally demanded skill in the data industry, required in over 25% of all AI and data job openings.',
        'Modern enterprise demand goes far beyond basic queries; companies look for mastery of complex window functions, recursive CTEs, query plan optimization, dimensional modeling, and lakehouse extensions across BigQuery, Snowflake, and Databricks.',
      ],
      cs: [
        'SQL (Structured Query Language) zůstává nejtrvalejší a nejuniverzálnější dovedností v celém datovém odvětví, vyžadovanou ve více než čtvrtině všech otevřených technických pozic.',
        'V podnikových inzerátech se nehledá pouhý základní SELECT; zaměstnavatelé vyžadují pokročilé analytické funkce (window functions), rekurzivní CTE, čtení prováděcích plánů (EXPLAIN), dimenzionální modelování a optimalizaci dotazů nad BigQuery, Snowflake či Databricks.',
      ],
    },
    comparisons: [
      { targetSlug: 'python', targetName: 'Python' },
      { targetSlug: 'dbt', targetName: 'dbt' },
    ],
  },
  {
    id: 'spark',
    name: 'Apache Spark',
    category: 'framework',
    aliases: ['apache-spark', 'pyspark'],
    skillIdMatch: ['spark'],
    tags: ['Big Data', 'Distributed Compute', 'PySpark', 'Structured Streaming', 'Lakehouse'],
    description: {
      en: [
        'Apache Spark is the industry standard distributed general-purpose compute engine for big data processing, analytics, and machine learning at petabyte scale.',
        'In job postings, Spark is closely tied to Data Engineer and Machine Learning Engineer profiles. Strong candidates demonstrate fluency in PySpark, Catalyst optimizer tuning, partitioned memory management, and structured streaming pipelines.',
      ],
      cs: [
        'Apache Spark je průmyslovým standardem pro distribuované zpracování velkých objemů dat (Big Data), analytické výpočty a strojové učení v petabajtovém měřítku.',
        'V inzerátech je Spark neodmyslitelně spjat s rolemi Data Engineera a Machine Learning Engineera. Očekává se znalost PySparku, ladění Catalyst optimizeru, správy paměti (shuffling) a stavby streamingových pipeline.',
      ],
    },
    comparisons: [
      { targetSlug: 'databricks', targetName: 'Databricks' },
      { targetSlug: 'python', targetName: 'Python' },
    ],
  },
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: 'cloud',
    aliases: ['amazon-web-services'],
    skillIdMatch: ['aws'],
    tags: ['Cloud', 'Hyperscaler', 'S3', 'Redshift', 'EMR', 'Glue', 'SageMaker'],
    description: {
      en: [
        'Amazon Web Services (AWS) holds the largest total footprint in enterprise cloud infrastructure. In data architectures, Amazon S3 serves as the standard object storage foundation upon which modern data lakes, Snowflake, and Databricks clusters are deployed.',
        'Technical requirements commonly encompass AWS Glue, Amazon EMR, Amazon Redshift, and Athena, alongside containerized infrastructure on ECS/EKS and model hosting on Amazon SageMaker.',
      ],
      cs: [
        'Amazon Web Services (AWS) si drží nejvyšší celkový podíl v podnikové cloudové infrastruktuře. V datových architekturách funguje Amazon S3 jako celosvětový standard pro data lakes, nad kterým firmy provozují Databricks či Snowflake.',
        'Technické požadavky zahrnují práci se službami AWS Glue, Amazon EMR, Amazon Redshift, Athena, kontejnerizaci na EKS a nasazování modelů přes Amazon SageMaker.',
      ],
    },
    comparisons: [
      { targetSlug: 'gcp', targetName: 'Google Cloud Platform' },
      { targetSlug: 'azure', targetName: 'Microsoft Azure' },
    ],
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'cloud',
    aliases: ['microsoft-azure'],
    skillIdMatch: ['azure'],
    tags: ['Cloud', 'Hyperscaler', 'Microsoft Fabric', 'ADLS Gen2', 'Azure OpenAI', 'Synapse'],
    description: {
      en: [
        'Microsoft Azure dominates enterprise IT environments through deep integration with Microsoft 365, Power BI, and Active Directory. In data and AI, Microsoft Fabric and Azure OpenAI Service represent major strategic pillars.',
        'Job listings focus heavily on Azure Data Lake Storage (ADLS Gen2), Azure Data Factory, Synapse Analytics, and enterprise governance with Microsoft Purview.',
      ],
      cs: [
        'Microsoft Azure má silnou pozici v korporátním prostředí díky provázání s Microsoft 365, Power BI a Active Directory. V oblasti dat a AI představují hlavní tahouny Microsoft Fabric a Azure OpenAI Service.',
        'Inzeráty poptávají znalost Azure Data Lake Storage (ADLS Gen2), Azure Data Factory, Synapse Analytics a podnikové správy dat přes Microsoft Purview.',
      ],
    },
    comparisons: [
      { targetSlug: 'aws', targetName: 'AWS' },
      { targetSlug: 'gcp', targetName: 'Google Cloud Platform' },
    ],
  },
  {
    id: 'looker',
    name: 'Looker & LookML',
    category: 'bi-analytics',
    aliases: ['google-looker', 'lookml'],
    skillIdMatch: ['looker'],
    tags: ['BI', 'Semantic Layer', 'LookML', 'Governed Metrics', 'GCP'],
    description: {
      en: [
        'Looker is Google Cloud’s enterprise business intelligence platform, famous for introducing the governed semantic layer (LookML). LookML defines central business logic in code, ensuring consistent KPIs across the organization and preventing metric divergence.',
        'In an era dominated by AI agents and LLM querying, Looker’s semantic layer acts as vital ground-truth context that eliminates hallucinations when non-technical stakeholders query corporate databases.',
      ],
      cs: [
        'Looker je podniková platforma pro business intelligence v rámci Google Cloud, která proslula zavedením sémantické vrstvy (LookML). Ta definuje metriky a byznys logiku přímo v kódu pod verzovací kontrolou, což brání vzniku rozdílných čísel v různých týmech.',
        'V éře generativní AI a agentů funguje sémantická vrstva Lookeru jako spolehlivý zdroj pravdivého kontextu, který zabraňuje halucinacím při dotazování nad firemními daty v přirozeném jazyce.',
      ],
    },
    comparisons: [
      { targetSlug: 'powerbi', targetName: 'Power BI' },
      { targetSlug: 'tableau', targetName: 'Tableau' },
    ],
  },
  {
    id: 'vertex-ai',
    name: 'Vertex AI & Agent Builder',
    category: 'ai-ml',
    aliases: ['vertex_ai', 'google-vertex-ai'],
    skillIdMatch: ['vertex_ai'],
    tags: ['GCP', 'GenAI', 'LLM', 'Gemini', 'Vector Search', 'Agent Builder', 'MLOps'],
    description: {
      en: [
        'Vertex AI is Google Cloud’s fully managed unified AI platform. It covers the complete machine learning lifecycle, from custom model training and evaluation to deploying foundation models (Gemini, Claude, open models in Model Garden) and building autonomous AI agents via Vertex AI Agent Builder.',
        'Enterprise job postings increasingly specify Vertex AI for production RAG pipelines, ground-truth evaluations (Evals), Vector Search at scale, and governed multimodal applications.',
      ],
      cs: [
        'Vertex AI je sjednocená platforma pro strojové učení a generativní AI na Google Cloud. Pokrývá celý životní cyklus modelů: od trénování a evaluací až po nasazování velkých jazykových modelů (Gemini, Claude, open-source v Model Garden) a orchestraci AI agentů přes Vertex AI Agent Builder.',
        'V podnikových inzerátech je Vertex AI vyhledáváno pro stavbu produkčních RAG systémů, vektorové vyhledávání (Vector Search), evaluaci kvality odpovědí a bezpečné zapojení firemních dat do AI.',
      ],
    },
    comparisons: [
      { targetSlug: 'ai-agents', targetName: 'AI Agents' },
      { targetSlug: 'llm', targetName: 'Large Language Models' },
    ],
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'bi-analytics',
    aliases: ['power-bi', 'power_bi'],
    skillIdMatch: ['powerbi'],
    tags: ['BI', 'Data Visualization', 'DAX', 'Power Query', 'Microsoft Fabric'],
    description: {
      en: [
        'Microsoft Power BI is the most widely adopted enterprise business intelligence and reporting platform in corporate environments, deeply integrated into Microsoft 365 and Microsoft Fabric.',
        'Job listings consistently demand fluency in DAX (Data Analysis Expressions), Power Query M modeling, row-level security implementation, and semantic model performance optimization.',
      ],
      cs: [
        'Microsoft Power BI je nejrozšířenějším podnikovým nástrojem pro business intelligence a reporting v korporátním sektoru, úzce propojeným s Microsoft 365 a ekosystémem Microsoft Fabric.',
        'V inzerátech se opakuje požadavek na pokročilý vývoj v jazyce DAX, čištění a modelování v Power Query, správu přístupových oprávnění (RLS) a optimalizaci výkonu sémantických modelů.',
      ],
    },
    comparisons: [
      { targetSlug: 'looker', targetName: 'Looker' },
      { targetSlug: 'tableau', targetName: 'Tableau' },
    ],
  },
  {
    id: 'dataform',
    name: 'Dataform (in BigQuery)',
    category: 'framework',
    skillIdMatch: ['dataform'],
    tags: ['BigQuery', 'SQLX', 'ELT', 'Analytics Engineering', 'Git', 'GCP'],
    description: {
      en: [
        'Dataform is Google Cloud’s native analytics engineering orchestrator embedded directly inside BigQuery. Built on SQLX, it enables data teams to develop, test, version-control in Git, and schedule end-to-end data pipelines without maintaining external execution servers.',
        'For organizations fully invested in the Google Cloud ecosystem, Dataform provides an integrated, cost-free alternative to standalone ELT tools with native BigQuery IAM and audit logging integration.',
      ],
      cs: [
        'Dataform je nativní nástroj pro analytics engineering integrovaný přímo v rozhraní Google BigQuery. Využívá jazyk SQLX a umožňuje datovým týmům verzovat transformace v Gitu, automaticky testovat kvalitu dat a plánovat běhy pipeline bez nutnosti spravovat jakékoliv servery.',
        'Pro týmy postavené na Google Cloud představuje Dataform integrovanou alternativu k externím transformačním nástrojům s přímou návazností na IAM role a auditní logování v GCP.',
      ],
    },
    comparisons: [
      { targetSlug: 'dbt', targetName: 'dbt' },
      { targetSlug: 'bigquery', targetName: 'BigQuery' },
    ],
  },
  {
    id: 'ai-agents',
    name: 'AI Agents & Agentic AI',
    category: 'ai-ml',
    aliases: ['ai_agents', 'agentic-ai'],
    skillIdMatch: ['ai_agents'],
    tags: ['Agentic AI', 'Tool Use', 'Reasoning', 'Multi-Agent', 'LangGraph', 'CrewAI'],
    description: {
      en: [
        'AI Agents represent the transition from passive chatbot interfaces to autonomous systems that reason, plan, call software tools (APIs, databases), and execute multi-step workflows.',
        'Enterprise job postings seeking Agentic AI expertise focus on agent orchestration frameworks (LangGraph, CrewAI, AutoGen), tool-calling reliability, structured evaluation loops, and deterministic guardrails.',
      ],
      cs: [
        'AI Agenti představují posun od pasivních textových konverzací k autonomním systémům, které plánují postupy, volají externí nástroje (API, databáze) a samostatně odbavují vícekrokové byznysové procesy.',
        'V inzerátech se poptávka soustředí na agentní orchestrátory (LangGraph, CrewAI, AutoGen), spolehlivost volání nástrojů (Function Calling), evaluační smyčky a deterministická bezpečnostní pravidla (guardrails).',
      ],
    },
    authorNotes: {
      en: {
        title: 'From Fragile Prompts to Deterministic State Machines',
        lead: 'The initial wave of LLM apps relied on linear chains, which reliably break down when tasks exceed 3 steps. The production industry has pivoted to stateful graph execution and multi-agent delegation.',
        paragraphs: [
          'In production systems, autonomous agents cannot run on pure probabilistic hope. The steep rise of LangGraph in enterprise job postings (220+ active roles, surging 30x since mid-2026) proves that software teams treat agents as state machines: cyclic graphs with clear persistence, checkpointing, and deterministic branching.',
          'Meanwhile, multi-agent frameworks like CrewAI and AutoGen dominate complex business automation where tasks split naturally into specialized personas (e.g. researcher, coder, auditor). For enterprise teams on the Microsoft/Azure stack, Semantic Kernel provides the essential bridge between traditional C#/Python services and agentic planning.',
        ],
        links: [
          { label: 'Autonomous Agents in Production Architecture', href: 'https://akucera.eu' },
        ],
      },
      cs: {
        title: 'Od křehkých promptů k deterministickým stavovým automatům',
        lead: 'První vlna aplikací stavěla na lineárních řetězcích (chains), které v praxi selhávají, jakmile proces přesáhne 3 kroky. Produkční svět proto přešel k řízení stavu v grafech a víceagentní spolupráci.',
        paragraphs: [
          'V produkčním prostředí nemohou autonomní agenti fungovat na bázi pouhé pravděpodobnosti. Rychlý růst poptávky po LangGraphu v enterprise inzerátech (přes 220 aktivních pozic a strmý skok během podzimu 2026) ukazuje, že týmy přistupují k agentům jako ke stavovým automatům: cyklickým grafům s perzistencí, checkpointingem a deterministickým větvením.',
          'Současně frameworky jako CrewAI a AutoGen dominují ve scénářích, kde se byznysová úloha přirozeně dělí na specializované role (výzkumník, programátor, revizor kódu). Pro podniky na Microsoft ekosystému pak klíčové pojítko tvoří Semantic Kernel propojující nativní kód se schopnostmi modelů.',
        ],
        links: [
          { label: 'Autonomní agenti v produkční architektuře', href: 'https://akucera.eu' },
        ],
      },
    },
    comparisons: [
      { targetSlug: 'llm', targetName: 'Large Language Models' },
      { targetSlug: 'rag', targetName: 'RAG' },
    ],
  },
  {
    id: 'llm',
    name: 'LLM (Large Language Models)',
    category: 'ai-ml',
    aliases: ['large-language-models'],
    skillIdMatch: ['llm'],
    tags: ['LLM', 'Generative AI', 'Prompt Engineering', 'Model Garden', 'OpenAI', 'Anthropic', 'Gemini'],
    description: {
      en: [
        'Large Language Models (LLMs) power modern generative AI capabilities across corporate applications, appearing in over 18% of all tracked enterprise technical positions.',
        'Hiring focuses on integrating commercial foundation models (Gemini, Claude, GPT-4) and open weights (Llama, Mistral) via APIs, designing robust prompting pipelines, context caching, and managing latency and token economics.',
      ],
      cs: [
        'Velké jazykové modely (LLM) tvoří technologický motor generativní AI a v současnosti se objevují ve více než 18 % všech sledovaných podnikových technických pozic.',
        'Zaměstnavatelé hledají specialisty na integraci modelů přes API (Gemini, Claude, GPT-4) i open-source variant (Llama, Mistral), návrh spolehlivých promptů, správu kontextu (caching) a optimalizaci nákladů na tokeny a latenci.',
      ],
    },
    comparisons: [
      { targetSlug: 'rag', targetName: 'RAG' },
      { targetSlug: 'ai-agents', targetName: 'AI Agents' },
    ],
  },
  {
    id: 'rag',
    name: 'RAG (Retrieval-Augmented Generation)',
    category: 'ai-ml',
    aliases: ['retrieval-augmented-generation'],
    skillIdMatch: ['rag'],
    tags: ['RAG', 'Vector Search', 'Embeddings', 'Chunking', 'Hybrid Search', 'Reranking'],
    description: {
      en: [
        'Retrieval-Augmented Generation (RAG) is the foundational architecture for grounding LLM outputs in proprietary corporate knowledge bases without fine-tuning model weights.',
        'Job listings highlight advanced RAG techniques: semantic chunking, hybrid search (keyword BM25 + dense vector embeddings), cross-encoder rerankers, and retrieval evaluation (Ragas, TruLens).',
      ],
      cs: [
        'Retrieval-Augmented Generation (RAG) je klíčovou architekturou pro ukotvení odpovědí jazykových modelů ve firemních datech a dokumentech bez nutnosti nákladného přetrénování modelů.',
        'V inzerátech se klade důraz na pokročilé techniky: sémantické dělení textu (chunking), hybridní vyhledávání (spojení fulltextu a vektorových embeddingů), reranking výsledků a evaluaci relevance nalezených pasáží.',
      ],
    },
    comparisons: [
      { targetSlug: 'llm', targetName: 'Large Language Models' },
      { targetSlug: 'ai-agents', targetName: 'AI Agents' },
    ],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'framework',
    skillIdMatch: ['pytorch'],
    tags: ['Deep Learning', 'Neural Networks', 'Model Training', 'PyTorch Lightning', 'CUDA'],
    description: {
      en: [
        'PyTorch is the undisputed deep learning framework of choice for AI research, foundation model development, and computer vision / NLP engineering.',
        'In enterprise recruitment, PyTorch is heavily requested for Machine Learning Engineers, Research Scientists, and Computer Vision specialists developing or fine-tuning neural architectures.',
      ],
      cs: [
        'PyTorch je dominantním frameworkem pro hluboké učení (Deep Learning), výzkum a vývoj základních modelů v oblasti počítačového vidění, NLP i generativní AI.',
        'V inzerátech se PyTorch vyžaduje po Machine Learning Inženýrech, výzkumných pracovnících a specialistech na neuronové sítě provádějících fine-tuning nebo vývoj modelů na míru.',
      ],
    },
    comparisons: [
      { targetSlug: 'tensorflow', targetName: 'TensorFlow' },
      { targetSlug: 'python', targetName: 'Python' },
    ],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'mlops',
    aliases: ['k8s'],
    skillIdMatch: ['kubernetes'],
    tags: ['Containers', 'Orchestration', 'K8s', 'MLOps', 'Inference Serving', 'KubeFlow'],
    description: {
      en: [
        'Kubernetes is the standard container orchestration platform for hosting resilient, scalable backend microservices, data processing pipelines, and high-throughput model inference endpoints.',
        'In AI and Data job postings, Kubernetes is demanded from MLOps Engineers and Platform Engineers managing GPU clusters, KubeFlow pipelines, and autoscaling model serving infrastructure.',
      ],
      cs: [
        'Kubernetes je standardní orchestrátor kontejnerů pro provoz spolehlivých škálovatelných mikroslužeb, datových procesů a vysokokapacitních inferenčních endpointů pro AI.',
        'V inzerátech pro oblast AI a dat se Kubernetes objevuje především u rolí MLOps Engineer a Platform Engineer spravujících GPU clustery, KubeFlow pipeline a škálování modelů.',
      ],
    },
    comparisons: [
      { targetSlug: 'docker', targetName: 'Docker' },
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'mlops',
    aliases: ['containerization'],
    skillIdMatch: ['docker'],
    tags: ['Containers', 'Reproducibility', 'DevOps', 'MLOps', 'CI/CD'],
    description: {
      en: [
        'Docker provides lightweight containerization, guaranteeing that data pipelines, Python environments, and ML serving workloads run reproducibly across local developer laptops and cloud clusters.',
        'It is an essential prerequisite across engineering and MLOps roles for building deterministic deployment packages and CI/CD testing workflows.',
      ],
      cs: [
        'Docker zajišťuje kontejnerizaci aplikací a garantuje, že datové pipeline, prostředí Pythonu a obslužné mikroslužby běží naprosto identicky na počítači vývojáře i v cloudu.',
        'Představuje základní stavební kámen pro softwarové a MLOps role pro stavbu deterministických balíčků a automatizovaných CI/CD testovacích procesů.',
      ],
    },
    comparisons: [
      { targetSlug: 'kubernetes', targetName: 'Kubernetes' },
    ],
  },
];

/**
 * Resolves full technology telemetry metrics, role breakdowns, and paired skills from market-data.json
 */
export function getTechnology(slugOrAlias: string): TechnologyResolved | null {
  const normalized = slugOrAlias.toLowerCase().trim().replace(/_/g, '-');
  
  const def = TECHNOLOGIES_CATALOG.find((t) => {
    if (t.id === normalized) return true;
    if (t.aliases && t.aliases.some((a) => a.toLowerCase().replace(/_/g, '-') === normalized)) return true;
    return false;
  });

  if (!def) return null;

  // Match IDs in top_technologies / gcp_hub / roles
  const matchIds = (def.skillIdMatch || [def.id]).map((s) => s.toLowerCase());

  // 1. Metric: total jobs & penetration from top_technologies or gcp_hub
  let totalJobs = 0;
  let penetrationPct = 0;

  const topTechList = marketData.tech_cloud_stack?.top_technologies || [];
  const gcpServices = marketData.gcp_hub?.services || [];

  for (const t of topTechList) {
    if (matchIds.includes(t.skill_id.toLowerCase())) {
      totalJobs = Math.max(totalJobs, t.job_count);
      penetrationPct = Math.max(penetrationPct, t.penetration_pct);
    }
  }

  for (const s of gcpServices) {
    if (matchIds.includes(s.skill_id.toLowerCase())) {
      totalJobs = Math.max(totalJobs, s.job_count);
      penetrationPct = Math.max(penetrationPct, s.penetration_all_pct);
    }
  }

  // 2. Rank among top technologies
  const sortedTopTech = [...topTechList].sort((a, b) => b.job_count - a.job_count);
  let rank = sortedTopTech.findIndex((t) => matchIds.includes(t.skill_id.toLowerCase())) + 1;
  if (rank === 0) rank = 25;

  // 3. Match across canonical roles
  const topRoles: TechnologyRoleMatch[] = [];
  for (const r of marketData.roles || []) {
    const allSkills = [...(r.top_technologies || []), ...(r.top_skills || [])];
    const match = allSkills.find(
      (s) =>
        matchIds.includes(s.skill_id?.toLowerCase()) ||
        s.skill_name?.toLowerCase() === def.name.toLowerCase() ||
        def.tags.some((tg) => tg.toLowerCase() === s.skill_name?.toLowerCase())
    );

    if (match && match.penetration_pct > 0) {
      topRoles.push({
        roleId: r.category_id,
        roleName: r.canonical_name,
        kebabSlug: r.category_id.replace(/_/g, '-'),
        penetrationPct: match.penetration_pct,
        jobCount: match.job_count || 0,
      });
    }
  }
  topRoles.sort((a, b) => b.penetrationPct - a.penetrationPct);

  // If totalJobs is still 0 (e.g. specialized framework like dbt not in top 20 global), aggregate from roles
  if (totalJobs === 0 && topRoles.length > 0) {
    totalJobs = topRoles.reduce((sum, r) => sum + r.jobCount, 0);
    const totalAiJobs = marketData.market_vitality?.total_ai_data_jobs || 8516;
    penetrationPct = Number(((totalJobs / totalAiJobs) * 100).toFixed(1));
  }

  // 4. Paired skills from gcp_hub or skill_cooccurrence
  const pairedSkills: Array<{ skillName: string; cooccurrenceCount?: number; penetrationPct?: number }> = [];
  
  // Check gcp_hub services
  const gcpMatch = gcpServices.find((s) => matchIds.includes(s.skill_id.toLowerCase()));
  if (gcpMatch && gcpMatch.top_paired_skills) {
    for (const sk of gcpMatch.top_paired_skills) {
      pairedSkills.push({ skillName: sk });
    }
  }

  // Check skill_cooccurrence
  const coocList = marketData.tech_cloud_stack?.skill_cooccurrence || [];
  for (const c of coocList) {
    if (
      c.skill_a.toLowerCase() === def.name.toLowerCase() ||
      matchIds.some((m) => c.skill_a.toLowerCase().includes(m))
    ) {
      if (!pairedSkills.some((p) => p.skillName === c.skill_b)) {
        pairedSkills.push({ skillName: c.skill_b, cooccurrenceCount: c.cooccurrence_count, penetrationPct: c.jaccard_pct });
      }
    } else if (
      c.skill_b.toLowerCase() === def.name.toLowerCase() ||
      matchIds.some((m) => c.skill_b.toLowerCase().includes(m))
    ) {
      if (!pairedSkills.some((p) => p.skillName === c.skill_a)) {
        pairedSkills.push({ skillName: c.skill_a, cooccurrenceCount: c.cooccurrence_count, penetrationPct: c.jaccard_pct });
      }
    }
  }

  // Fallback paired skills if empty
  if (pairedSkills.length === 0) {
    pairedSkills.push({ skillName: 'Python' }, { skillName: 'SQL' }, { skillName: 'Cloud & Infrastructure' });
  }

  // 5. Top companies from ecosystems or sample postings
  const topCompanies: Array<{ companyName: string; sector?: string | null; jobCount: number }> = [];
  const ecosystems = marketData.tech_cloud_stack?.ecosystems || {};
  
  // Check if this tech corresponds to an ecosystem
  const ecoKey = def.id === 'snowflake' ? 'snowflake_db' : def.id;
  if (ecosystems[ecoKey] && ecosystems[ecoKey].top_companies) {
    topCompanies.push(...ecosystems[ecoKey].top_companies.slice(0, 6));
  } else if (def.id === 'bigquery' && ecosystems['gcp']?.top_companies) {
    topCompanies.push(...ecosystems['gcp'].top_companies.slice(0, 6));
  } else if (topRoles.length > 0) {
    // Collect from top role sample postings
    const primaryRole = marketData.roles.find((r) => r.category_id === topRoles[0].roleId);
    if (primaryRole && primaryRole.top_companies) {
      topCompanies.push(
        ...primaryRole.top_companies.slice(0, 5).map((c) => ({
          companyName: c.company_name,
          sector: c.sector || null,
          jobCount: c.job_count,
        }))
      );
    }
  }

  // 6. Matched courses and certs from academy.ts
  const techSearchWords = [def.name.toLowerCase(), def.id.toLowerCase(), ...def.tags.map((t) => t.toLowerCase())];

  const recommendedCourses = ACADEMY_COURSES.filter((c) =>
    c.skills.some((sk) => techSearchWords.some((w) => sk.toLowerCase().includes(w) || w.includes(sk.toLowerCase())))
  ).slice(0, 3);

  const recommendedCerts = CERTIFICATIONS_LIST.filter((cert) =>
    cert.skills.some((sk) => techSearchWords.some((w) => sk.toLowerCase().includes(w) || w.includes(sk.toLowerCase())))
  ).slice(0, 2);

  // 7. Agent Frameworks (if inspecting AI Agents)
  const rawFrameworks = (marketData.tech_cloud_stack as any)?.agent_frameworks || [];
  const agentFrameworks: AgentFrameworkMetric[] =
    def.id === 'ai-agents'
      ? rawFrameworks.map((f: any) => ({
          skillId: f.skill_id,
          name: f.name,
          paradigm: f.paradigm,
          summary: f.summary,
          jobCount: f.job_count,
          penetrationPct: f.penetration_pct,
          shareOfAgentJobsPct: f.share_of_agent_jobs_pct,
          topCompanies: (f.top_companies || []).map((c: any) => ({
            companyName: c.company_name,
            sector: c.sector,
            jobCount: c.job_count,
          })),
          samplePostings: (f.sample_postings || []).map((p: any) => ({
            title: p.title,
            companyName: p.company_name,
            countryCode: p.country_code,
            url: p.url,
          })),
        }))
      : [];

  return {
    id: def.id,
    name: def.name,
    category: def.category,
    aliases: def.aliases || [],
    tags: def.tags,
    description: def.description,
    authorNotes: def.authorNotes,
    comparisons: def.comparisons || [],
    jobCount: totalJobs,
    penetrationPct,
    rank,
    totalCatalogued: topTechList.length || 24,
    topRoles: topRoles.slice(0, 8),
    pairedSkills: pairedSkills.slice(0, 6),
    topCompanies,
    recommendedCourses,
    recommendedCerts,
    agentFrameworks: agentFrameworks.length > 0 ? agentFrameworks : undefined,
  };
}

/**
 * Returns all technology definitions with their basic metrics for catalog list
 */
export function getAllTechnologies(): TechnologyResolved[] {
  return TECHNOLOGIES_CATALOG.map((t) => getTechnology(t.id)!).filter(Boolean);
}
