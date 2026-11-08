import type { Locale } from '../i18n/ui';

export type ConferenceRegion = 'Europe' | 'North America' | 'Global / Online';
export type ConferenceFormat = 'in-person' | 'virtual' | 'hybrid';
export type ConferenceTopic =
  | 'Data Engineering'
  | 'Applied AI & LLMs'
  | 'Cloud & Warehousing'
  | 'MLOps & Agents'
  | 'Analytics & BI';

export type CfpStatus = 'open' | 'closed' | 'tba';

export interface ConferenceItem {
  id: string;
  name: string;
  organizer: string;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string; // ISO YYYY-MM-DD
  city: string;
  country: string;
  countryCode: string;
  venue?: string;
  region: ConferenceRegion;
  format: ConferenceFormat;
  topics: ConferenceTopic[];
  description: {
    en: string;
    cs: string;
  };
  websiteUrl: string;
  ticketUrl?: string;
  cfpStatus: CfpStatus;
  cfpDeadline?: string; // ISO YYYY-MM-DD
  cfpUrl?: string;
  attendeesCount?: string;
  isFlagship?: boolean;
}

export const CONFERENCES_DATA: ConferenceItem[] = [
  {
    id: 'data-ai-summit-2027',
    name: 'Data + AI Summit 2027',
    organizer: 'Databricks',
    startDate: '2027-06-07',
    endDate: '2027-06-10',
    city: 'San Francisco',
    country: 'United States',
    countryCode: 'US',
    venue: 'Moscone Center',
    region: 'North America',
    format: 'hybrid',
    topics: ['Data Engineering', 'Applied AI & LLMs', 'Cloud & Warehousing', 'MLOps & Agents'],
    description: {
      en: 'The global epicenter for data teams, lakehouse architecture, Apache Spark, Delta Lake, Unity Catalog, and enterprise generative AI deployment.',
      cs: 'Světové centrum pro datové týmy, lakehouse architekturu, Apache Spark, Delta Lake, Unity Catalog a nasazení generativní AI v enterprise měřítku.',
    },
    websiteUrl: 'https://www.databricks.com/dataaisummit',
    cfpStatus: 'open',
    cfpDeadline: '2027-01-31',
    cfpUrl: 'https://www.databricks.com/dataaisummit/call-for-speakers',
    attendeesCount: '15,000+',
    isFlagship: true,
  },
  {
    id: 'google-cloud-next-2027',
    name: 'Google Cloud Next 2027',
    organizer: 'Google Cloud',
    startDate: '2027-04-13',
    endDate: '2027-04-15',
    city: 'Las Vegas',
    country: 'United States',
    countryCode: 'US',
    venue: 'Mandalay Bay Convention Center',
    region: 'North America',
    format: 'hybrid',
    topics: ['Cloud & Warehousing', 'Applied AI & LLMs', 'Data Engineering'],
    description: {
      en: 'Google Cloud flagship showcase: foundational announcements for BigQuery, Vertex AI, Gemini models, Looker semantic layers, and modern data architecture.',
      cs: 'Vlajková loď Google Cloud: klíčové novinky pro BigQuery, Vertex AI, modely Gemini, sémantickou vrstvu Lookeru a moderní datovou architekturu.',
    },
    websiteUrl: 'https://cloud.withgoogle.com/next',
    cfpStatus: 'tba',
    attendeesCount: '25,000+',
    isFlagship: true,
  },
  {
    id: 'snowflake-summit-2027',
    name: 'Snowflake Data Cloud Summit 2027',
    organizer: 'Snowflake',
    startDate: '2027-06-01',
    endDate: '2027-06-04',
    city: 'San Francisco',
    country: 'United States',
    countryCode: 'US',
    venue: 'Moscone Center',
    region: 'North America',
    format: 'hybrid',
    topics: ['Cloud & Warehousing', 'Analytics & BI', 'Applied AI & LLMs'],
    description: {
      en: 'The annual conference for the Data Cloud: Apache Iceberg storage innovations, Snowpark data processing, Cortex AI, and enterprise data sharing.',
      cs: 'Každoroční konference Data Cloudu: inovace kolem Apache Iceberg, zpracování dat ve Snowparku, Cortex AI a enterprise sdílení dat.',
    },
    websiteUrl: 'https://www.snowflake.com/summit/',
    cfpStatus: 'closed',
    attendeesCount: '12,000+',
    isFlagship: true,
  },
  {
    id: 'coalesce-2027',
    name: 'Coalesce 2027 (The Analytics Engineering Conference)',
    organizer: 'dbt Labs',
    startDate: '2027-10-18',
    endDate: '2027-10-21',
    city: 'San Diego',
    country: 'United States',
    countryCode: 'US',
    venue: 'San Diego Convention Center',
    region: 'North America',
    format: 'hybrid',
    topics: ['Data Engineering', 'Analytics & BI', 'Cloud & Warehousing'],
    description: {
      en: 'The definitive annual gathering of the analytics engineering community. Best practices for modular SQL, dbt Core/Cloud, data mesh, and data quality testing.',
      cs: 'Zásadní každoroční setkání komunity Analytics Engineeringu. Osvědčené postupy pro modulární SQL, dbt Core/Cloud, data mesh a automatizované testování kvality dat.',
    },
    websiteUrl: 'https://coalesce.getdbt.com/',
    cfpStatus: 'tba',
    attendeesCount: '4,000+',
    isFlagship: true,
  },
  {
    id: 'big-data-london-2027',
    name: 'Big Data LDN (London) 2027',
    organizer: 'Big Data LDN',
    startDate: '2027-09-22',
    endDate: '2027-09-23',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    venue: 'Olympia London',
    region: 'Europe',
    format: 'in-person',
    topics: ['Data Engineering', 'Analytics & BI', 'Cloud & Warehousing', 'Applied AI & LLMs'],
    description: {
      en: "The UK and Western Europe's largest free-to-attend data, analytics, and AI exhibition and conference, hosting over 300 expert practitioners and tech leaders.",
      cs: 'Největší bezplatná konference a výstava o datech, analytice a AI ve Velké Británii a západní Evropě, s více než 300 praktickými přednáškami.',
    },
    websiteUrl: 'https://bigdataldn.com/',
    cfpStatus: 'open',
    cfpDeadline: '2027-04-30',
    cfpUrl: 'https://bigdataldn.com/call-for-papers',
    attendeesCount: '16,000+',
    isFlagship: true,
  },
  {
    id: 'kubecon-cloudnative-eu-2027',
    name: 'KubeCon + CloudNativeCon Europe 2027',
    organizer: 'Linux Foundation / CNCF',
    startDate: '2027-03-23',
    endDate: '2027-03-26',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    venue: 'ExCeL London',
    region: 'Europe',
    format: 'in-person',
    topics: ['Data Engineering', 'MLOps & Agents', 'Cloud & Warehousing'],
    description: {
      en: 'The flagship conference for the cloud native ecosystem: Kubernetes platforms, containerized data pipelines, Ray on Kubernetes, and enterprise MLOps infrastructure.',
      cs: 'Vlajková konference cloud-native ekosystému: správa Kubernetes, kontejnerizované datové pipeline, Ray na K8s a infrastruktura pro enterprise MLOps.',
    },
    websiteUrl: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/',
    cfpStatus: 'closed',
    attendeesCount: '12,000+',
    isFlagship: true,
  },
  {
    id: 'pydata-london-2027',
    name: 'PyData London 2027',
    organizer: 'NumFOCUS',
    startDate: '2027-06-18',
    endDate: '2027-06-20',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    venue: 'Leonardo Royal Hotel London Tower Bridge',
    region: 'Europe',
    format: 'in-person',
    topics: ['Data Engineering', 'Applied AI & LLMs', 'MLOps & Agents'],
    description: {
      en: 'Community conference bringing together developers and users of Python data libraries (pandas, PyTorch, scikit-learn, Polars, DuckDB) for technical deep-dives.',
      cs: 'Komunitní konference pro vývojáře a uživatele datových knihoven v Pythonu (pandas, PyTorch, scikit-learn, Polars, DuckDB) zaměřená na hluboké technické znalosti.',
    },
    websiteUrl: 'https://pydata.org/london2027/',
    cfpStatus: 'open',
    cfpDeadline: '2027-02-28',
    attendeesCount: '800+',
  },
  {
    id: 'pydata-amsterdam-2027',
    name: 'PyData Amsterdam 2027',
    organizer: 'NumFOCUS',
    startDate: '2027-09-15',
    endDate: '2027-09-17',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    venue: 'Beurs van Berlage',
    region: 'Europe',
    format: 'in-person',
    topics: ['Applied AI & LLMs', 'Data Engineering', 'MLOps & Agents'],
    description: {
      en: 'Top European Python data summit exploring production-grade machine learning, data engineering with Polars/DuckDB, and large language model engineering.',
      cs: 'Přední evropský summit pro Python zaměřený na produkční machine learning, datové inženýrství s Polars a DuckDB a vývoj aplikací nad LLM.',
    },
    websiteUrl: 'https://pydata.org/amsterdam2027/',
    cfpStatus: 'tba',
    attendeesCount: '700+',
  },
  {
    id: 'webexpo-2027',
    name: 'WebExpo Prague 2027',
    organizer: 'WebExpo',
    startDate: '2027-05-26',
    endDate: '2027-05-28',
    city: 'Prague',
    country: 'Czech Republic',
    countryCode: 'CZ',
    venue: 'Lucerna Palace',
    region: 'Europe',
    format: 'in-person',
    topics: ['Applied AI & LLMs', 'Analytics & BI'],
    description: {
      en: "Central Europe's flagship technology and digital product conference in the historic center of Prague, featuring deep tracks on AI development, architecture, and design.",
      cs: 'Přední technologická a produktová konference ve střední Evropě v historickém paláci Lucerna v Praze. Přednášky o vývoji AI aplikací, architektuře a datových produktech.',
    },
    websiteUrl: 'https://www.webexpo.net/',
    cfpStatus: 'open',
    cfpDeadline: '2027-01-15',
    attendeesCount: '2,500+',
    isFlagship: true,
  },
  {
    id: 'data-talk-prague-2027',
    name: 'Data Talk Prague 2027',
    organizer: 'Czech Data Community',
    startDate: '2027-04-22',
    endDate: '2027-04-22',
    city: 'Prague',
    country: 'Czech Republic',
    countryCode: 'CZ',
    venue: 'Cubex Centre Prague',
    region: 'Europe',
    format: 'in-person',
    topics: ['Data Engineering', 'Cloud & Warehousing', 'Analytics & BI'],
    description: {
      en: 'Hands-on conference for Czech and Central European data engineers, BI architects, and analytics leaders, showcasing real-world corporate case studies and modern stacks.',
      cs: 'Praktická konference pro české a středoevropské datové inženýry, BI architekty a vedoucí analytiky zaměřená na reálné případové studie a moderní stack.',
    },
    websiteUrl: 'https://datatalk.cz/',
    cfpStatus: 'open',
    cfpDeadline: '2027-02-15',
    attendeesCount: '600+',
  },
  {
    id: 'ai-engineer-summit-2027',
    name: 'AI Engineer World’s Fair 2027',
    organizer: 'AI Engineer Foundation',
    startDate: '2027-06-23',
    endDate: '2027-06-25',
    city: 'San Francisco',
    country: 'United States',
    countryCode: 'US',
    venue: 'San Francisco',
    region: 'North America',
    format: 'hybrid',
    topics: ['Applied AI & LLMs', 'MLOps & Agents'],
    description: {
      en: 'The premier technical conference exclusively for engineers building with LLMs, autonomous agents, RAG architectures, prompt evals, and foundation model APIs.',
      cs: 'Přední čistě technická konference pro vývojáře stavějící aplikace nad LLM, autonomními agenty, RAG architekturami, evaluačními frameworky a API základních modelů.',
    },
    websiteUrl: 'https://www.ai.engineer/worlds-fair',
    cfpStatus: 'tba',
    attendeesCount: '3,000+',
    isFlagship: true,
  },
  {
    id: 'aws-reinvent-2026',
    name: 'AWS re:Invent 2026',
    organizer: 'Amazon Web Services',
    startDate: '2026-11-30',
    endDate: '2026-12-04',
    city: 'Las Vegas',
    country: 'United States',
    countryCode: 'US',
    venue: 'Venetian Convention Center',
    region: 'North America',
    format: 'hybrid',
    topics: ['Cloud & Warehousing', 'Applied AI & LLMs', 'Data Engineering'],
    description: {
      en: 'The grand scale cloud computing conference with landmark announcements across Amazon Redshift, Amazon Bedrock, Glue ETL, and multi-region infrastructure.',
      cs: 'Největší cloudová konference na světě s klíčovými oznámeními pro Amazon Redshift, generativní AI platformu Bedrock, Glue ETL a distribuovanou infrastrukturu.',
    },
    websiteUrl: 'https://reinvent.awsevents.com/',
    cfpStatus: 'closed',
    attendeesCount: '65,000+',
    isFlagship: true,
  },
  {
    id: 'big-data-ai-paris-2027',
    name: 'Big Data & AI Paris 2027',
    organizer: 'Corp Agency',
    startDate: '2027-10-12',
    endDate: '2027-10-13',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    venue: 'Paris Expo Porte de Versailles',
    region: 'Europe',
    format: 'in-person',
    topics: ['Data Engineering', 'Applied AI & LLMs', 'Analytics & BI'],
    description: {
      en: "France's flagship B2B event uniting corporate CIOs, data architects, and AI researchers navigating European compliance, sovereign cloud, and scalable analytics.",
      cs: 'Přední francouzský B2B event propojující CIO, datové architekty a výzkumníky AI řešící evropskou regulaci, suverénní cloud a škálovatelnou analytiku.',
    },
    websiteUrl: 'https://www.bigdataparis.com/',
    cfpStatus: 'tba',
    attendeesCount: '15,000+',
  },
];
