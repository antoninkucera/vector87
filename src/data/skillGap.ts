import marketData from './market-data.json';
import {
  ACADEMY_COURSES,
  FREE_AI_COURSES,
  CERTIFICATIONS_LIST,
  type AcademyCourse,
  type FreeAiCourse,
  type CertificationItem,
} from './academy';
import type { Locale } from '../i18n/ui';

export type SkillCategory = 'languages' | 'cloud_wh' | 'data_eng' | 'analytics_bi' | 'ai_ml' | 'genai';

export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategory;
  marketName: string; // Exact match in market-data.json top_skills or top_technologies
  badgeColor?: string;
}

export interface PresetProfile {
  id: string;
  title: {
    en: string;
    cs: string;
  };
  subtitle: {
    en: string;
    cs: string;
  };
  icon: string;
  skillIds: string[];
}

export const SKILL_CATEGORIES: { id: SkillCategory; label: { en: string; cs: string } }[] = [
  { id: 'languages', label: { en: 'Languages & Core', cs: 'Jazyky a základy' } },
  { id: 'cloud_wh', label: { en: 'Cloud & Warehousing', cs: 'Cloud a datové sklady' } },
  { id: 'data_eng', label: { en: 'Data Engineering & Ops', cs: 'Datové inženýrství & Ops' } },
  { id: 'analytics_bi', label: { en: 'Analytics & BI', cs: 'Analytika & BI' } },
  { id: 'ai_ml', label: { en: 'Machine Learning & AI', cs: 'Machine Learning & AI' } },
  { id: 'genai', label: { en: 'GenAI & Agentic Systems', cs: 'GenAI a agentní systémy' } },
];

export const SKILLS_TAXONOMY: SkillDefinition[] = [
  // Languages & Core
  { id: 'python', name: 'Python', category: 'languages', marketName: 'Python' },
  { id: 'sql', name: 'SQL', category: 'languages', marketName: 'SQL' },
  { id: 'r_lang', name: 'R', category: 'languages', marketName: 'R' },
  { id: 'java', name: 'Java', category: 'languages', marketName: 'Java' },
  { id: 'excel', name: 'Excel / Spreadsheets', category: 'languages', marketName: 'Excel' },
  { id: 'pandas', name: 'pandas', category: 'languages', marketName: 'pandas' },

  // Cloud & Warehouses
  { id: 'gcp', name: 'Google Cloud Platform (GCP)', category: 'cloud_wh', marketName: 'Google Cloud Platform' },
  { id: 'bigquery', name: 'Google BigQuery', category: 'cloud_wh', marketName: 'BigQuery' },
  { id: 'aws', name: 'Amazon Web Services (AWS)', category: 'cloud_wh', marketName: 'AWS' },
  { id: 'azure', name: 'Microsoft Azure', category: 'cloud_wh', marketName: 'Microsoft Azure' },
  { id: 'snowflake', name: 'Snowflake', category: 'cloud_wh', marketName: 'Snowflake' },
  { id: 'databricks', name: 'Databricks', category: 'cloud_wh', marketName: 'Databricks' },
  { id: 'redshift', name: 'Amazon Redshift', category: 'cloud_wh', marketName: 'Amazon Redshift' },
  { id: 'fabric', name: 'Microsoft Fabric', category: 'cloud_wh', marketName: 'Microsoft Fabric' },

  // Data Engineering & Ops
  { id: 'spark', name: 'Apache Spark / PySpark', category: 'data_eng', marketName: 'Apache Spark' },
  { id: 'dbt', name: 'dbt (Data Build Tool)', category: 'data_eng', marketName: 'dbt' },
  { id: 'airflow', name: 'Apache Airflow', category: 'data_eng', marketName: 'Apache Airflow' },
  { id: 'docker', name: 'Docker / Containers', category: 'data_eng', marketName: 'Docker' },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'data_eng', marketName: 'Kubernetes' },

  // Analytics & BI
  { id: 'power_bi', name: 'Power BI / DAX', category: 'analytics_bi', marketName: 'Power BI' },
  { id: 'tableau', name: 'Tableau', category: 'analytics_bi', marketName: 'Tableau' },
  { id: 'looker', name: 'Looker / LookML', category: 'analytics_bi', marketName: 'Looker' },
  { id: 'data_governance', name: 'Data Governance & Quality', category: 'analytics_bi', marketName: 'Data Governance & Quality' },

  // Machine Learning & AI
  { id: 'pytorch', name: 'PyTorch', category: 'ai_ml', marketName: 'PyTorch' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai_ml', marketName: 'TensorFlow' },
  { id: 'scikit_learn', name: 'scikit-learn', category: 'ai_ml', marketName: 'scikit-learn' },
  { id: 'mlops', name: 'MLOps / Evals & Observability', category: 'ai_ml', marketName: 'MLOps / Evals & Observability' },
  { id: 'nlp', name: 'Natural Language Processing (NLP)', category: 'ai_ml', marketName: 'Natural Language Processing' },
  { id: 'computer_vision', name: 'Computer Vision', category: 'ai_ml', marketName: 'Computer Vision' },
  { id: 'jax', name: 'JAX', category: 'ai_ml', marketName: 'JAX' },

  // GenAI & Agentic Systems
  { id: 'llm', name: 'LLMs (Large Language Models)', category: 'genai', marketName: 'LLM / Large Language Models' },
  { id: 'genai', name: 'Generative AI (GenAI)', category: 'genai', marketName: 'GenAI / Generative AI' },
  { id: 'ai_agents', name: 'AI Agents / Agentic Workflows', category: 'genai', marketName: 'AI Agents / Agentic AI' },
  { id: 'rag', name: 'RAG (Retrieval-Augmented Gen)', category: 'genai', marketName: 'RAG (Retrieval-Augmented Generation)' },
  { id: 'fine_tuning', name: 'Model Fine-Tuning & PEFT', category: 'genai', marketName: 'Fine-Tuning' },
  { id: 'langchain', name: 'LangChain / Frameworks', category: 'genai', marketName: 'LangChain' },
  { id: 'vector_dbs', name: 'Vector Databases', category: 'genai', marketName: 'Vector Databases' },
  { id: 'huggingface', name: 'Hugging Face Transformers', category: 'genai', marketName: 'Hugging Face Transformers' },
];

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'bi_analyst',
    title: {
      en: 'BI & Reporting Analyst',
      cs: 'BI a reportingový analytik',
    },
    subtitle: {
      en: 'SQL, Power BI, Excel, Tableau & Governance',
      cs: 'SQL, Power BI, Excel, Tableau a správa dat',
    },
    icon: '📊',
    skillIds: ['sql', 'power_bi', 'excel', 'tableau', 'data_governance'],
  },
  {
    id: 'analytics_engineer',
    title: {
      en: 'Analytics Engineer',
      cs: 'Analytics Engineer',
    },
    subtitle: {
      en: 'SQL, dbt, BigQuery, Snowflake & Data Modeling',
      cs: 'SQL, dbt, BigQuery, Snowflake a datové modelování',
    },
    icon: '🏗️',
    skillIds: ['sql', 'python', 'dbt', 'snowflake', 'bigquery', 'data_governance'],
  },
  {
    id: 'data_engineer',
    title: {
      en: 'Core Data Engineer',
      cs: 'Datový inženýr',
    },
    subtitle: {
      en: 'Python, SQL, Spark, Databricks, Airflow, Docker & AWS',
      cs: 'Python, SQL, Spark, Databricks, Airflow, Docker a AWS',
    },
    icon: '⚙️',
    skillIds: ['python', 'sql', 'spark', 'databricks', 'airflow', 'docker', 'aws'],
  },
  {
    id: 'data_scientist',
    title: {
      en: 'Classic Data Scientist',
      cs: 'Datový vědec (DS)',
    },
    subtitle: {
      en: 'Python, SQL, R, scikit-learn, pandas & PyTorch',
      cs: 'Python, SQL, R, scikit-learn, pandas a PyTorch',
    },
    icon: '🔬',
    skillIds: ['python', 'sql', 'r_lang', 'scikit_learn', 'pandas', 'pytorch'],
  },
  {
    id: 'applied_ai_dev',
    title: {
      en: 'Applied AI & LLM Developer',
      cs: 'AI Developer & LLM specialista',
    },
    subtitle: {
      en: 'Python, LLMs, AI Agents, RAG, Vector DBs, LangChain & Docker',
      cs: 'Python, LLM, autonomní agenti, RAG, vektorové DB a Docker',
    },
    icon: '🤖',
    skillIds: ['python', 'llm', 'genai', 'ai_agents', 'rag', 'vector_dbs', 'langchain', 'docker'],
  },
];

// Helper to find relevant Academy items for missing skills
export function findCoursesForSkills(skillMarketNames: string[]): {
  courses: AcademyCourse[];
  freeCourses: FreeAiCourse[];
  certifications: CertificationItem[];
} {
  const normSkills = skillMarketNames.map((s) => s.toLowerCase());

  const courses = ACADEMY_COURSES.filter((c) =>
    c.skills.some((sk) =>
      normSkills.some((ns) => ns.includes(sk.toLowerCase()) || sk.toLowerCase().includes(ns))
    )
  ).slice(0, 3);

  const freeCourses = FREE_AI_COURSES.filter((c) =>
    c.skills.some((sk) =>
      normSkills.some((ns) => ns.includes(sk.toLowerCase()) || sk.toLowerCase().includes(ns))
    )
  ).slice(0, 2);

  const certifications = CERTIFICATIONS_LIST.filter((cert) =>
    cert.skills.some((sk) =>
      normSkills.some((ns) => ns.includes(sk.toLowerCase()) || sk.toLowerCase().includes(ns))
    )
  ).slice(0, 2);

  return { courses, freeCourses, certifications };
}

// Payload for client-side analyzer engine
export function getAnalyzerPayload() {
  const roles = marketData.roles
    .map((role) => {
      const topSkills = (role.top_skills || []).map((s) => ({
        name: s.skill_name,
        penetration: s.penetration_pct || 0,
        type: 'skill' as const,
      }));

      const topTech = (role.top_technologies || []).map((t) => ({
        name: t.skill_name,
        penetration: t.penetration_pct || 0,
        type: 'tech' as const,
      }));

      let requirements = [...topSkills, ...topTech];

      // Fallback enterprise domain requirements for roles with sparse scraped descriptions
      if (requirements.length === 0) {
        if (role.category_id === 'chief_data_ai_officer') {
          requirements = [
            { name: 'Data Governance & Quality', penetration: 85, type: 'skill' as const },
            { name: 'GenAI / Generative AI', penetration: 80, type: 'skill' as const },
            { name: 'AI Agents / Agentic AI', penetration: 65, type: 'skill' as const },
            { name: 'SQL', penetration: 60, type: 'skill' as const },
            { name: 'Python', penetration: 55, type: 'skill' as const },
            { name: 'Google Cloud Platform', penetration: 45, type: 'tech' as const },
            { name: 'AWS', penetration: 45, type: 'tech' as const },
            { name: 'Microsoft Azure', penetration: 45, type: 'tech' as const },
            { name: 'Snowflake', penetration: 40, type: 'tech' as const },
          ];
        }
      } else if (role.category_id === 'nlp_engineer' && requirements.length <= 2) {
        requirements = [
          ...requirements,
          { name: 'Python', penetration: 92, type: 'skill' as const },
          { name: 'PyTorch', penetration: 80, type: 'skill' as const },
          { name: 'LLM / Large Language Models', penetration: 75, type: 'skill' as const },
          { name: 'Hugging Face Transformers', penetration: 70, type: 'tech' as const },
        ];
      } else if (role.category_id === 'computer_vision_engineer' && requirements.length <= 2) {
        requirements = [
          ...requirements,
          { name: 'Python', penetration: 90, type: 'skill' as const },
          { name: 'PyTorch', penetration: 82, type: 'skill' as const },
          { name: 'TensorFlow', penetration: 55, type: 'skill' as const },
          { name: 'Docker', penetration: 50, type: 'tech' as const },
        ];
      }

      return {
        id: role.category_id,
        slug: role.category_id.replace(/_/g, '-'),
        canonicalName: role.canonical_name,
        domain: role.domain,
        track: role.track,
        jobCount: role.job_count,
        sp500JobCount: role.sp500_job_count,
        seniorPlusPct: role.senior_plus_pct,
        remotePct: role.remote_pct,
        description: role.synthesized_description,
        requirements,
      };
    })
    .filter((r) => r.requirements.length > 0);

  return {
    taxonomy: SKILLS_TAXONOMY,
    categories: SKILL_CATEGORIES,
    presets: PRESET_PROFILES,
    roles,
  };
}
