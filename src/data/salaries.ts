import marketData from './market-data.json';
import type { Locale } from '../i18n/ui';

export type SalaryMarket = 'US' | 'UK' | 'EU' | 'CZ';

export type SeniorityTier =
  | 'Junior / Entry'
  | 'Mid'
  | 'Senior'
  | 'Staff / Principal'
  | 'Lead / Manager'
  | 'Executive';

export interface MarketCompensation {
  currency: 'USD' | 'GBP' | 'EUR' | 'CZK';
  currencySymbol: string;
  period: 'annual' | 'monthly';
  p25: number;
  median: number;
  p75: number;
  p90: number;
  typicalBonusPct: number;
  typicalEquityPct: number;
  totalCompMedian: number; // Base + Bonus + Equity
  // Optional local period conversions
  monthlyGross?: number;
  annualGross?: number;
}

export interface SeniorityBenchmark {
  tier: SeniorityTier;
  yearsOfExperience: string;
  US: number; // Annual USD Base
  UK: number; // Annual GBP Base
  EU: number; // Annual EUR Base
  CZ: number; // Monthly CZK Gross
}

export interface DisclosedJobSample {
  jobId: string;
  title: string;
  companyName: string;
  countryCode: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  seniority: string;
  url: string;
}

export interface RoleSalaryProfile {
  roleId: string;
  canonicalName: string;
  kebabSlug: string;
  category: 'engineering' | 'ai-research' | 'analytics-bi' | 'leadership';
  tierRank: number; // 1 to 21 based on compensation level
  aiPremiumPct: number; // relative to median analytical baseline
  description: {
    en: string;
    cs: string;
  };
  markets: Record<SalaryMarket, MarketCompensation>;
  senioritySpread: SeniorityBenchmark[];
  liveDisclosedPostings: DisclosedJobSample[];
}

export interface PurchasingPowerComparison {
  city: string;
  country: string;
  countryCode: string;
  market: SalaryMarket;
  roleTitle: string;
  seniority: SeniorityTier;
  grossAnnualLocal: number;
  currency: string;
  effectiveTaxPct: number;
  netAnnualLocal: number;
  estimatedAnnualRent: number;
  costOfLivingIndex: number; // NYC = 100
  netDisposableIncomeEur: number;
  qualityOfLifeScore: number; // 0-100
}

export const SALARY_MARKET_CONFIG: Record<
  SalaryMarket,
  {
    name: { en: string; cs: string };
    currency: string;
    symbol: string;
    flag: string;
    standardPeriod: { en: string; cs: string };
    taxContext: { en: string; cs: string };
  }
> = {
  US: {
    name: { en: 'United States', cs: 'Spojené státy' },
    currency: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    standardPeriod: { en: 'Annual Base (USD)', cs: 'Roční základ (USD)' },
    taxContext: {
      en: 'Federal + State taxes (~28–38% total). High equity upside (RSUs / Stock Options).',
      cs: 'Federální + státní daň (~28–38 % celkem). Významná složka akcií (RSU / opce).',
    },
  },
  UK: {
    name: { en: 'United Kingdom', cs: 'Velká Británie' },
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    standardPeriod: { en: 'Annual Base (GBP)', cs: 'Roční základ (GBP)' },
    taxContext: {
      en: 'Income tax + National Insurance (~35–45%). London market carries 20–30% weighting.',
      cs: 'Daň z příjmu + odvody (~35–45 %). Londýnský trh nese 20–30% prémii vůči regionům.',
    },
  },
  EU: {
    name: { en: 'Western Europe (DACH / Benelux)', cs: 'Západní Evropa (DACH / Benelux)' },
    currency: 'EUR',
    symbol: '€',
    flag: '🇪🇺',
    standardPeriod: { en: 'Annual Base (EUR)', cs: 'Roční základ (EUR)' },
    taxContext: {
      en: 'Progressive taxation (~38–48%). Robust social benefits, mandatory health, 25–30 days PTO.',
      cs: 'Progresivní zdanění (~38–48 %). Vysoké sociální jistoty, zdravotní pojištění a 25–30 dní dovolené.',
    },
  },
  CZ: {
    name: { en: 'Czech Republic', cs: 'Česká republika' },
    currency: 'CZK',
    symbol: 'Kč',
    flag: '🇨🇿',
    standardPeriod: { en: 'Monthly Gross (CZK)', cs: 'Měsíční hrubá mzda (Kč)' },
    taxContext: {
      en: 'Flat 15%/23% tax + social/health insurance. Frequently contracted via B2B (IČO with 60% flat expense deductions).',
      cs: 'Pásmová 15%/23% daň + SP/ZP. Běžná spolupráce na IČO (výdajový paušál 60 % s výrazně nižším efektivním zdaněním).',
    },
  },
};

export const SENIORITY_TIERS: SeniorityTier[] = [
  'Junior / Entry',
  'Mid',
  'Senior',
  'Staff / Principal',
  'Lead / Manager',
  'Executive',
];

export const SALARY_PROFILES_DATA: RoleSalaryProfile[] = [
  {
    roleId: 'ml_engineer',
    canonicalName: 'Machine Learning Engineer',
    kebabSlug: 'ml-engineer',
    category: 'engineering',
    tierRank: 1,
    aiPremiumPct: 28.5,
    description: {
      en: 'Designs, trains, deploys, and optimizes production machine learning and deep learning pipelines. Commands the highest technical base salary premium across individual contributor tracks.',
      cs: 'Navrhuje, trénuje, nasazuje a škáluje produkční modely strojového učení a deep learningu. Drží nejvyšší platovou prémii mezi čistě technickými specialisty.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 165000,
        median: 195000,
        p75: 245000,
        p90: 295000,
        typicalBonusPct: 15,
        typicalEquityPct: 25,
        totalCompMedian: 275000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 85000,
        median: 110000,
        p75: 145000,
        p90: 175000,
        typicalBonusPct: 12,
        typicalEquityPct: 15,
        totalCompMedian: 140000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 75000,
        median: 95000,
        p75: 125000,
        p90: 155000,
        typicalBonusPct: 10,
        typicalEquityPct: 10,
        totalCompMedian: 115000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 110000,
        median: 145000,
        p75: 185000,
        p90: 230000,
        monthlyGross: 145000,
        annualGross: 1740000,
        typicalBonusPct: 10,
        typicalEquityPct: 5,
        totalCompMedian: 1950000,
      },
    },
    senioritySpread: [
      { tier: 'Junior / Entry', yearsOfExperience: '0–2 yrs', US: 125000, UK: 55000, EU: 62000, CZ: 75000 },
      { tier: 'Mid', yearsOfExperience: '2–5 yrs', US: 165000, UK: 85000, EU: 80000, CZ: 115000 },
      { tier: 'Senior', yearsOfExperience: '5–8 yrs', US: 210000, UK: 120000, EU: 105000, CZ: 160000 },
      { tier: 'Staff / Principal', yearsOfExperience: '8+ yrs', US: 275000, UK: 160000, EU: 140000, CZ: 215000 },
      { tier: 'Lead / Manager', yearsOfExperience: '6+ yrs', US: 235000, UK: 135000, EU: 120000, CZ: 185000 },
      { tier: 'Executive', yearsOfExperience: '10+ yrs', US: 310000, UK: 190000, EU: 165000, CZ: 260000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'us-ml-01',
        title: 'Staff Machine Learning Engineer, Financial Products',
        companyName: 'Capital One',
        countryCode: 'US',
        salaryMin: 297000,
        salaryMax: 401000,
        currency: 'USD',
        seniority: 'Staff / Principal',
        url: 'https://www.linkedin.com/jobs/search/?keywords=Staff+Machine+Learning+Engineer',
      },
      {
        jobId: 'us-ml-02',
        title: 'Machine Learning Engineer, Core Platform',
        companyName: 'Twilio',
        countryCode: 'US',
        salaryMin: 180000,
        salaryMax: 230000,
        currency: 'USD',
        seniority: 'Senior',
        url: 'https://job-boards.greenhouse.io/twilio/',
      },
      {
        jobId: 'cz-ml-01',
        title: 'Senior Machine Learning Engineer – Conversational AI',
        companyName: 'Livesport / Tech Hub Prague',
        countryCode: 'CZ',
        salaryMin: 120000,
        salaryMax: 160000,
        currency: 'CZK',
        seniority: 'Senior',
        url: 'https://www.startupjobs.cz',
      },
    ],
  },
  {
    roleId: 'ai_developer',
    canonicalName: 'AI Developer & Agent Builder',
    kebabSlug: 'ai-developer',
    category: 'engineering',
    tierRank: 2,
    aiPremiumPct: 24.0,
    description: {
      en: 'Builds end-to-end applications around LLMs, multi-agent frameworks (LangGraph, CrewAI), vector databases, tool-calling interfaces, and autonomous agent loops.',
      cs: 'Vyvíjí aplikace stavějící na velkých jazykových modelech (LLM), víceagentních frameworcích (LangGraph, CrewAI), vektorových databázích a autonomních smyčkách.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 155000,
        median: 185000,
        p75: 225000,
        p90: 270000,
        typicalBonusPct: 12,
        typicalEquityPct: 20,
        totalCompMedian: 245000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 80000,
        median: 105000,
        p75: 135000,
        p90: 165000,
        typicalBonusPct: 10,
        typicalEquityPct: 15,
        totalCompMedian: 130000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 70000,
        median: 90000,
        p75: 115000,
        p90: 145000,
        typicalBonusPct: 10,
        typicalEquityPct: 10,
        totalCompMedian: 108000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 100000,
        median: 135000,
        p75: 175000,
        p90: 215000,
        monthlyGross: 135000,
        annualGross: 1620000,
        typicalBonusPct: 10,
        typicalEquityPct: 5,
        totalCompMedian: 1800000,
      },
    },
    senioritySpread: [
      { tier: 'Junior / Entry', yearsOfExperience: '0–2 yrs', US: 115000, UK: 50000, EU: 58000, CZ: 70000 },
      { tier: 'Mid', yearsOfExperience: '2–5 yrs', US: 155000, UK: 80000, EU: 75000, CZ: 105000 },
      { tier: 'Senior', yearsOfExperience: '5–8 yrs', US: 195000, UK: 115000, EU: 100000, CZ: 150000 },
      { tier: 'Staff / Principal', yearsOfExperience: '8+ yrs', US: 255000, UK: 150000, EU: 130000, CZ: 200000 },
      { tier: 'Lead / Manager', yearsOfExperience: '6+ yrs', US: 220000, UK: 130000, EU: 115000, CZ: 175000 },
      { tier: 'Executive', yearsOfExperience: '10+ yrs', US: 290000, UK: 175000, EU: 150000, CZ: 240000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'us-aid-01',
        title: 'Forward Deployed Engineer (FDE) - AI Agents',
        companyName: 'Databricks',
        countryCode: 'US',
        salaryMin: 184000,
        salaryMax: 253000,
        currency: 'USD',
        seniority: 'Senior',
        url: 'https://www.databricks.com/company/careers',
      },
      {
        jobId: 'cz-aid-01',
        title: 'Vibecoder / AI Developer – onsite spolupráce',
        companyName: 'Creative Dock / Seed AI Hub',
        countryCode: 'CZ',
        salaryMin: 80000,
        salaryMax: 100000,
        currency: 'CZK',
        seniority: 'Mid',
        url: 'https://www.startupjobs.cz',
      },
    ],
  },
  {
    roleId: 'data_engineer',
    canonicalName: 'Data Engineer',
    kebabSlug: 'data-engineer',
    category: 'engineering',
    tierRank: 3,
    aiPremiumPct: 15.0,
    description: {
      en: 'Architects robust batch and real-time data pipelines, lakehouse infrastructure (Databricks, Snowflake, BigQuery), orchestration (dbt, Airflow), and data modeling.',
      cs: 'Navrhuje a staví robustní dávkové i real-time datové pipeline, lakehouse architekturu (Databricks, Snowflake, BigQuery), orchestraci v dbt a datové modely.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 135000,
        median: 165000,
        p75: 205000,
        p90: 245000,
        typicalBonusPct: 12,
        typicalEquityPct: 18,
        totalCompMedian: 215000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 75000,
        median: 95000,
        p75: 125000,
        p90: 150000,
        typicalBonusPct: 10,
        typicalEquityPct: 12,
        totalCompMedian: 118000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 65000,
        median: 85000,
        p75: 110000,
        p90: 135000,
        typicalBonusPct: 8,
        typicalEquityPct: 8,
        totalCompMedian: 98000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 90000,
        median: 125000,
        p75: 165000,
        p90: 200000,
        monthlyGross: 125000,
        annualGross: 1500000,
        typicalBonusPct: 10,
        typicalEquityPct: 5,
        totalCompMedian: 1680000,
      },
    },
    senioritySpread: [
      { tier: 'Junior / Entry', yearsOfExperience: '0–2 yrs', US: 105000, UK: 45000, EU: 52000, CZ: 65000 },
      { tier: 'Mid', yearsOfExperience: '2–5 yrs', US: 140000, UK: 75000, EU: 72000, CZ: 100000 },
      { tier: 'Senior', yearsOfExperience: '5–8 yrs', US: 175000, UK: 105000, EU: 92000, CZ: 140000 },
      { tier: 'Staff / Principal', yearsOfExperience: '8+ yrs', US: 230000, UK: 140000, EU: 120000, CZ: 190000 },
      { tier: 'Lead / Manager', yearsOfExperience: '6+ yrs', US: 200000, UK: 120000, EU: 108000, CZ: 165000 },
      { tier: 'Executive', yearsOfExperience: '10+ yrs', US: 265000, UK: 160000, EU: 140000, CZ: 220000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'us-de-01',
        title: 'Distributed Systems Engineer - Data Platform',
        companyName: 'Cloudflare',
        countryCode: 'US',
        salaryMin: 160000,
        salaryMax: 215000,
        currency: 'USD',
        seniority: 'Senior',
        url: 'https://boards.greenhouse.io/cloudflare',
      },
      {
        jobId: 'uk-de-01',
        title: 'Senior Data Engineer (Snowflake, dbt, AWS)',
        companyName: 'Burns Sheehan / Fintech',
        countryCode: 'UK',
        salaryMin: 85000,
        salaryMax: 110000,
        currency: 'GBP',
        seniority: 'Senior',
        url: 'https://www.linkedin.com',
      },
      {
        jobId: 'cz-de-01',
        title: 'Senior Data Engineer – DWH / BigQuery / dbt',
        companyName: 'Heureka Group',
        countryCode: 'CZ',
        salaryMin: 140000,
        salaryMax: 160000,
        currency: 'CZK',
        seniority: 'Senior',
        url: 'https://www.startupjobs.cz',
      },
    ],
  },
  {
    roleId: 'data_scientist',
    canonicalName: 'Data Scientist',
    kebabSlug: 'data-scientist',
    category: 'ai-research',
    tierRank: 4,
    aiPremiumPct: 18.0,
    description: {
      en: 'Leverages statistical rigor, causal inference, predictive modeling, and machine learning to uncover core business insights, optimize algorithms, and run scientific A/B tests.',
      cs: 'Využívá statistiku, kauzální inferenci, prediktivní modely a machine learning k hluboké analýze byznysu, algoritmizaci a vědeckému vyhodnocování experimentů.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 140000,
        median: 170000,
        p75: 215000,
        p90: 260000,
        typicalBonusPct: 12,
        typicalEquityPct: 20,
        totalCompMedian: 225000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 75000,
        median: 98000,
        p75: 130000,
        p90: 155000,
        typicalBonusPct: 10,
        typicalEquityPct: 12,
        totalCompMedian: 122000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 68000,
        median: 88000,
        p75: 115000,
        p90: 140000,
        typicalBonusPct: 8,
        typicalEquityPct: 10,
        totalCompMedian: 104000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 95000,
        median: 130000,
        p75: 170000,
        p90: 210000,
        monthlyGross: 130000,
        annualGross: 1560000,
        typicalBonusPct: 10,
        typicalEquityPct: 5,
        totalCompMedian: 1750000,
      },
    },
    senioritySpread: [
      { tier: 'Junior / Entry', yearsOfExperience: '0–2 yrs', US: 110000, UK: 48000, EU: 55000, CZ: 68000 },
      { tier: 'Mid', yearsOfExperience: '2–5 yrs', US: 145000, UK: 78000, EU: 75000, CZ: 105000 },
      { tier: 'Senior', yearsOfExperience: '5–8 yrs', US: 185000, UK: 110000, EU: 98000, CZ: 145000 },
      { tier: 'Staff / Principal', yearsOfExperience: '8+ yrs', US: 245000, UK: 145000, EU: 130000, CZ: 195000 },
      { tier: 'Lead / Manager', yearsOfExperience: '6+ yrs', US: 215000, UK: 125000, EU: 112000, CZ: 170000 },
      { tier: 'Executive', yearsOfExperience: '10+ yrs', US: 280000, UK: 170000, EU: 150000, CZ: 230000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'us-ds-01',
        title: 'Data Scientist, Core Experimentation',
        companyName: 'DoorDash',
        countryCode: 'US',
        salaryMin: 293000,
        salaryMax: 325000,
        currency: 'USD',
        seniority: 'Staff / Principal',
        url: 'https://careers.doordash.com',
      },
      {
        jobId: 'us-ds-02',
        title: 'Data Scientist, Safety & Risk',
        companyName: 'Airbnb',
        countryCode: 'US',
        salaryMin: 230000,
        salaryMax: 325000,
        currency: 'USD',
        seniority: 'Senior',
        url: 'https://careers.airbnb.com',
      },
    ],
  },
  {
    roleId: 'analytics_engineer',
    canonicalName: 'Analytics Engineer',
    kebabSlug: 'analytics-engineer',
    category: 'engineering',
    tierRank: 5,
    aiPremiumPct: 10.0,
    description: {
      en: 'Bridges raw data engineering with business intelligence. Implements modular transformation layers with dbt, automated testing, version control, and semantic metrics.',
      cs: 'Tvoří most mezi datovým inženýrstvím a byznysovou analytikou. Implementuje modulární transformace v dbt, testy kvality, verzování a sémantické metriky.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 125000,
        median: 155000,
        p75: 185000,
        p90: 220000,
        typicalBonusPct: 10,
        typicalEquityPct: 15,
        totalCompMedian: 195000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 70000,
        median: 88000,
        p75: 115000,
        p90: 135000,
        typicalBonusPct: 8,
        typicalEquityPct: 10,
        totalCompMedian: 105000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 60000,
        median: 78000,
        p75: 100000,
        p90: 120000,
        typicalBonusPct: 8,
        typicalEquityPct: 8,
        totalCompMedian: 90000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 85000,
        median: 115000,
        p75: 150000,
        p90: 185000,
        monthlyGross: 115000,
        annualGross: 1380000,
        typicalBonusPct: 10,
        typicalEquityPct: 5,
        totalCompMedian: 1550000,
      },
    },
    senioritySpread: [
      { tier: 'Junior / Entry', yearsOfExperience: '0–2 yrs', US: 95000, UK: 42000, EU: 48000, CZ: 60000 },
      { tier: 'Mid', yearsOfExperience: '2–5 yrs', US: 130000, UK: 70000, EU: 68000, CZ: 92000 },
      { tier: 'Senior', yearsOfExperience: '5–8 yrs', US: 165000, UK: 98000, EU: 88000, CZ: 130000 },
      { tier: 'Staff / Principal', yearsOfExperience: '8+ yrs', US: 215000, UK: 130000, EU: 112000, CZ: 175000 },
      { tier: 'Lead / Manager', yearsOfExperience: '6+ yrs', US: 185000, UK: 115000, EU: 102000, CZ: 155000 },
      { tier: 'Executive', yearsOfExperience: '10+ yrs', US: 240000, UK: 150000, EU: 130000, CZ: 200000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'us-ae-01',
        title: 'Senior Analytics Engineer (dbt + Snowflake)',
        companyName: 'Figma',
        countryCode: 'US',
        salaryMin: 165000,
        salaryMax: 210000,
        currency: 'USD',
        seniority: 'Senior',
        url: 'https://www.figma.com/careers',
      },
    ],
  },
  {
    roleId: 'data_analyst',
    canonicalName: 'Data Analyst & BI Specialist',
    kebabSlug: 'data-analyst',
    category: 'analytics-bi',
    tierRank: 6,
    aiPremiumPct: 0.0, // baseline
    description: {
      en: 'Transforms structured business data into actionable dashboards, KPIs, executive reporting, and ad-hoc SQL exploratory analyses.',
      cs: 'Přetváří strukturovaná podniková data v přehledné dashboardy, KPI reporty pro vedení a ad-hoc analytické náhledy v SQL a BI nástrojích.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 85000,
        median: 110000,
        p75: 140000,
        p90: 165000,
        typicalBonusPct: 8,
        typicalEquityPct: 8,
        totalCompMedian: 128000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 45000,
        median: 62000,
        p75: 85000,
        p90: 105000,
        typicalBonusPct: 8,
        typicalEquityPct: 5,
        totalCompMedian: 70000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 48000,
        median: 65000,
        p75: 85000,
        p90: 105000,
        typicalBonusPct: 6,
        typicalEquityPct: 5,
        totalCompMedian: 72000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 60000,
        median: 85000,
        p75: 115000,
        p90: 145000,
        monthlyGross: 85000,
        annualGross: 1020000,
        typicalBonusPct: 8,
        typicalEquityPct: 2,
        totalCompMedian: 1120000,
      },
    },
    senioritySpread: [
      { tier: 'Junior / Entry', yearsOfExperience: '0–2 yrs', US: 75000, UK: 35000, EU: 42000, CZ: 50000 },
      { tier: 'Mid', yearsOfExperience: '2–5 yrs', US: 98000, UK: 55000, EU: 58000, CZ: 75000 },
      { tier: 'Senior', yearsOfExperience: '5–8 yrs', US: 130000, UK: 75000, EU: 78000, CZ: 105000 },
      { tier: 'Staff / Principal', yearsOfExperience: '8+ yrs', US: 165000, UK: 98000, EU: 98000, CZ: 140000 },
      { tier: 'Lead / Manager', yearsOfExperience: '6+ yrs', US: 150000, UK: 88000, EU: 90000, CZ: 125000 },
      { tier: 'Executive', yearsOfExperience: '10+ yrs', US: 195000, UK: 120000, EU: 115000, CZ: 165000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'uk-da-01',
        title: 'Senior Data Analyst (SQL, Looker, Tableau)',
        companyName: 'Deliveroo',
        countryCode: 'UK',
        salaryMin: 65000,
        salaryMax: 85000,
        currency: 'GBP',
        seniority: 'Senior',
        url: 'https://careers.deliveroo.com',
      },
    ],
  },
  {
    roleId: 'director_vp_data_ai',
    canonicalName: 'Director / VP of Data & AI',
    kebabSlug: 'director-vp-data-ai',
    category: 'leadership',
    tierRank: 7,
    aiPremiumPct: 35.0,
    description: {
      en: 'Directs company-wide AI, analytics, and data engineering roadmaps. Sponsors infrastructure investments, guides organizational scaling, and drives strategic AI monetization.',
      cs: 'Řídí celofiremní strategii pro AI, data a analytiku. Rozhoduje o infrastrukturních investicích, buduje týmy a zodpovídá za byznysový dopad AI.',
    },
    markets: {
      US: {
        currency: 'USD',
        currencySymbol: '$',
        period: 'annual',
        p25: 220000,
        median: 275000,
        p75: 350000,
        p90: 450000,
        typicalBonusPct: 25,
        typicalEquityPct: 35,
        totalCompMedian: 440000,
      },
      UK: {
        currency: 'GBP',
        currencySymbol: '£',
        period: 'annual',
        p25: 130000,
        median: 175000,
        p75: 230000,
        p90: 290000,
        typicalBonusPct: 20,
        typicalEquityPct: 25,
        totalCompMedian: 250000,
      },
      EU: {
        currency: 'EUR',
        currencySymbol: '€',
        period: 'annual',
        p25: 120000,
        median: 160000,
        p75: 210000,
        p90: 260000,
        typicalBonusPct: 20,
        typicalEquityPct: 15,
        totalCompMedian: 215000,
      },
      CZ: {
        currency: 'CZK',
        currencySymbol: 'Kč',
        period: 'monthly',
        p25: 180000,
        median: 250000,
        p75: 330000,
        p90: 420000,
        monthlyGross: 250000,
        annualGross: 3000000,
        typicalBonusPct: 20,
        typicalEquityPct: 10,
        totalCompMedian: 3900000,
      },
    },
    senioritySpread: [
      { tier: 'Lead / Manager', yearsOfExperience: '8+ yrs', US: 235000, UK: 145000, EU: 135000, CZ: 200000 },
      { tier: 'Executive', yearsOfExperience: '12+ yrs', US: 310000, UK: 195000, EU: 175000, CZ: 280000 },
    ],
    liveDisclosedPostings: [
      {
        jobId: 'us-dir-01',
        title: 'Senior Director, Enterprise Data & AI Platforms',
        companyName: 'ServiceNow',
        countryCode: 'US',
        salaryMin: 260000,
        salaryMax: 360000,
        currency: 'USD',
        seniority: 'Executive',
        url: 'https://careers.servicenow.com',
      },
    ],
  },
];

export const PURCHASING_POWER_DATA: PurchasingPowerComparison[] = [
  {
    city: 'San Francisco, CA',
    country: 'United States',
    countryCode: 'US',
    market: 'US',
    roleTitle: 'Senior Machine Learning Engineer',
    seniority: 'Senior',
    grossAnnualLocal: 210000,
    currency: 'USD',
    effectiveTaxPct: 34.5,
    netAnnualLocal: 137550,
    estimatedAnnualRent: 39600, // $3,300/mo 1BR
    costOfLivingIndex: 96,
    netDisposableIncomeEur: 82000,
    qualityOfLifeScore: 78,
  },
  {
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    market: 'UK',
    roleTitle: 'Senior Machine Learning Engineer',
    seniority: 'Senior',
    grossAnnualLocal: 120000,
    currency: 'GBP',
    effectiveTaxPct: 39.0,
    netAnnualLocal: 73200,
    estimatedAnnualRent: 26400, // £2,200/mo 1BR
    costOfLivingIndex: 82,
    netDisposableIncomeEur: 55000,
    qualityOfLifeScore: 79,
  },
  {
    city: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    market: 'EU',
    roleTitle: 'Senior Machine Learning Engineer',
    seniority: 'Senior',
    grossAnnualLocal: 105000,
    currency: 'EUR',
    effectiveTaxPct: 42.0,
    netAnnualLocal: 60900,
    estimatedAnnualRent: 19200, // €1,600/mo 1BR
    costOfLivingIndex: 72,
    netDisposableIncomeEur: 41700,
    qualityOfLifeScore: 89,
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    countryCode: 'CZ',
    market: 'CZ',
    roleTitle: 'Senior Machine Learning Engineer',
    seniority: 'Senior',
    grossAnnualLocal: 1920000, // 160k/mo
    currency: 'CZK',
    effectiveTaxPct: 22.5, // Effective employee or B2B
    netAnnualLocal: 1488000, // ~€60,000 net!
    estimatedAnnualRent: 336000, // 28k CZK/mo (~€13,500/yr)
    costOfLivingIndex: 48,
    netDisposableIncomeEur: 46500, // higher net disposable than Munich!
    qualityOfLifeScore: 88,
  },
];

export function getSalaryProfile(roleId: string): RoleSalaryProfile | undefined {
  return SALARY_PROFILES_DATA.find((r) => r.roleId === roleId || r.kebabSlug === roleId);
}

export function getAllSalaryProfiles(): RoleSalaryProfile[] {
  return SALARY_PROFILES_DATA;
}
