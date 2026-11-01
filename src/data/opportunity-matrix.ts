import placesData from './places-data.json';

export interface OpportunityCountry {
  iso3: string;
  iso2: string;
  name: string;
  nameCs: string;
  easeOfRelocation: number;
  livability: number;
  activeJobs: number;
  hiringCompanies: number;
  topRoles: string[];
  topRolesFormattedEn: string;
  topRolesFormattedCs: string;
  safety: number | null;
  housing: number | null;
  economy: number | null;
  governance: number | null;
  thrivingScore: number;
  quadrant: 'easy_win' | 'high_reward' | 'lifestyle_haven';
  relocationNoteEn: string;
  relocationNoteCs: string;
  techNoteEn: string;
  techNoteCs: string;
  highlightEn: string;
  highlightCs: string;
}

const COUNTRY_NAMES_CS: Record<string, string> = {
  USA: 'Spojené státy',
  CAN: 'Kanada',
  GBR: 'Velká Británie',
  CZE: 'Česká republika',
  DEU: 'Německo',
  POL: 'Polsko',
  IRL: 'Irsko',
  ESP: 'Španělsko',
  FRA: 'Francie',
  CHE: 'Švýcarsko',
  NLD: 'Nizozemsko',
  SWE: 'Švédsko',
  ITA: 'Itálie',
  PRT: 'Portugalsko',
  ROU: 'Rumunsko',
  AUT: 'Rakousko',
  LTU: 'Litva',
  DNK: 'Dánsko',
  GRC: 'Řecko',
  BEL: 'Belgie',
  FIN: 'Finsko',
  NOR: 'Norsko',
  BGR: 'Bulharsko',
  HRV: 'Chorvatsko',
  HUN: 'Maďarsko',
  LUX: 'Lucembursko',
  SVK: 'Slovensko',
};

const ROLE_NAMES: Record<string, { en: string; cs: string }> = {
  ai_developer: { en: 'AI Developer', cs: 'AI Developer' },
  data_engineer: { en: 'Data Engineer', cs: 'Datový inženýr' },
  data_scientist: { en: 'Data Scientist', cs: 'Data Scientist' },
  data_analyst: { en: 'Data Analyst', cs: 'Datový analytik' },
  ml_engineer: { en: 'ML Engineer', cs: 'Machine Learning inženýr' },
  research_scientist: { en: 'Research Scientist', cs: 'Research Scientist' },
  data_architect: { en: 'Data Architect', cs: 'Datový architekt' },
  analytics_engineer: { en: 'Analytics Engineer', cs: 'Analytics Engineer' },
  llm_engineer: { en: 'LLM Engineer', cs: 'LLM / GenAI inženýr' },
  mlops_engineer: { en: 'MLOps Engineer', cs: 'MLOps inženýr' },
};

const RELOCATION_NOTES: Record<string, { en: string; cs: string }> = {
  ESP: {
    en: 'EU free movement + premier Digital Nomad Visa (Beckham Law 24% tax regime).',
    cs: 'Volný pohyb v EU + Digital Nomad Visa (daňový režim Beckham Law 24 %).',
  },
  PRT: {
    en: 'EU free movement + D8 digital nomad visa and attractive coastal lifestyle.',
    cs: 'Volný pohyb v EU + D8 digitální nomádské vízum a přívětivé klima.',
  },
  NLD: {
    en: 'EU free movement + 30% tax ruling for expats and English as the corporate standard.',
    cs: 'Volný pohyb v EU + 30% daňová úleva pro expaty a angličtina jako firemní standard.',
  },
  IRL: {
    en: 'EU free movement + European headquarters cluster for Big Tech with zero language barrier.',
    cs: 'Volný pohyb v EU + evropské sídlo tech gigantů a nulová jazyková bariéra.',
  },
  NOR: {
    en: 'EEA agreement (full freedom of movement) + world-class living standards and work-life balance.',
    cs: 'Dohoda o EHP (plný volný pohyb pracovníků) + špičkový životní standard.',
  },
  DNK: {
    en: 'EU free movement + streamlined digital public services and Fast-Track scheme.',
    cs: 'Volný pohyb v EU + digitalizovaná veřejná správa a Fast-Track schéma.',
  },
  FIN: {
    en: 'EU free movement + 90 Day Finn fast track for tech talent and world-leading safety.',
    cs: 'Volný pohyb v EU + program 90 Day Finn pro specialisty a špičkové bezpečí.',
  },
  SWE: {
    en: 'EU free movement + global innovation ecosystem with premier governance.',
    cs: 'Volný pohyb v EU + silný skandinávský inovační ekosystém a právní stát.',
  },
  DEU: {
    en: 'EU free movement + Chancenkarte opportunity card for skilled tech specialists.',
    cs: 'Volný pohyb v EU + Chancenkarte pro specialisty ze třetích zemí a robustní trh.',
  },
  AUT: {
    en: 'EU free movement + Red-White-Red Card and exceptional Viennese quality of life.',
    cs: 'Volný pohyb v EU + Rot-Weiß-Rot Karte a výjimečná vídeňská kvalita života.',
  },
  CZE: {
    en: 'EU free movement + accessible trade license (Zivno) pathway and top-tier safety (87.0).',
    cs: 'Volný pohyb v EU + dostupná živnost (Zivno) pro expaty a vysoká bezpečnost (87,0).',
  },
  LUX: {
    en: 'EU free movement + highest GDP per capita in Europe and trilingual financial hub.',
    cs: 'Volný pohyb v EU + nejvyšší HDP na hlavu v Evropě a mezinárodní finanční centrum.',
  },
  CHE: {
    en: 'Bilateral EU freedom of movement (permit B) + world-leading compensation and safety.',
    cs: 'Bilaterální volný pohyb pro EU (povolení B) + nejvyšší platy a bezpečnost.',
  },
  CAN: {
    en: 'Express Entry points system + Global Talent Stream (2-week visa processing).',
    cs: 'Bodový systém Express Entry + Global Talent Stream (vyřízení do 2 týdnů).',
  },
  GBR: {
    en: 'Post-Brexit points system: Skilled Worker & Global Talent routes, sponsor required.',
    cs: 'Post-brexitový bodový systém: Skilled Worker & Global Talent víza vyžadující sponzora.',
  },
  USA: {
    en: 'Strict H-1B lottery cap (~15-20% odds) and employer sponsorship hurdles; unrivaled compensation.',
    cs: 'Přísná loterie H-1B (~15-20% úspěšnost) a vázanost na zaměstnavatele; nejvyšší odměny.',
  },
  HRV: {
    en: 'EU & Schengen member + established Mediterranean digital nomad community.',
    cs: 'Člen EU a Schengenu + populární středomořská komunita digitálních nomádů.',
  },
  POL: {
    en: 'EU free movement + rapidly growing Central European software engineering cluster.',
    cs: 'Volný pohyb v EU + dynamicky rostoucí středoevropský inženýrský uzel.',
  },
  FRA: {
    en: 'EU free movement + French Tech Visa for startup founders and tech employees.',
    cs: 'Volný pohyb v EU + French Tech Visa pro startupisty a specialisty.',
  },
  BEL: {
    en: 'EU free movement + European institutional hub and dense corporate infrastructure.',
    cs: 'Volný pohyb v EU + institucionální srdce Evropy a stabilní zázemí.',
  },
  ITA: {
    en: 'EU free movement + Italian digital nomad visa and attractive lifestyle.',
    cs: 'Volný pohyb v EU + italské nomádské vízum a středomořský životní styl.',
  },
  GRC: {
    en: 'EU free movement + Digital Nomad Visa with 50% income tax exemption for 7 years.',
    cs: 'Volný pohyb v EU + Digital Nomad vízum s 50% slevou na dani z příjmu na 7 let.',
  },
  LTU: {
    en: 'EU free movement + premier Baltic fintech hub and agile Startup Visa.',
    cs: 'Volný pohyb v EU + přední pobaltský fintech hub a Startup Visa.',
  },
  SVK: {
    en: 'EU free movement + integrated Central European industrial and tech ecosystem.',
    cs: 'Volný pohyb v EU + integrované středoevropské inženýrské zázemí.',
  },
  HUN: {
    en: 'EU free movement + White Card residency for remote tech workers.',
    cs: 'Volný pohyb v EU + White Card pro digitální a remote pracovníky.',
  },
  ROU: {
    en: 'EU free movement + vast software developer talent pool and affordable cost of living.',
    cs: 'Volný pohyb v EU + početná komunita vývojářů a dostupné životní náklady.',
  },
  BGR: {
    en: 'EU free movement + 10% flat personal and corporate tax, low operational friction.',
    cs: 'Volný pohyb v EU + 10% rovná daň a nejnižší provozní náklady v EU.',
  },
};

const TECH_NOTES: Record<string, { en: string; cs: string }> = {
  CZE: {
    en: '190 open roles across 129 enterprise firms; premier Central European data engineering hub.',
    cs: '190 otevřených rolí ve 129 firmách; přední středoevropský uzel pro dataře a AI inženýry.',
  },
  DEU: {
    en: '230 open roles across 112 firms; massive industrial AI, automotive, and enterprise cloud market.',
    cs: '230 otevřených rolí ve 112 firmách; silný průmyslový AI a cloudový trh se silnou poptávkou.',
  },
  USA: {
    en: '6,203 open roles across 722 enterprise firms; unrivaled AI venture capital and compensation.',
    cs: '6 203 otevřených rolí v 722 korporacích; globální centrum AI inovací a nejvyšších mezd.',
  },
  CAN: {
    en: '779 open roles across 113 firms; major North American tech hub with vibrant AI research.',
    cs: '779 otevřených rolí ve 113 firmách; druhý největší anglosaský trh s předním AI výzkumem.',
  },
  GBR: {
    en: '346 open roles across 142 firms; leading European AI research clusters (DeepMind, Cambridge).',
    cs: '346 otevřených rolí ve 142 firmách; klíčové evropské AI centrum s vysokou koncentrací korporací.',
  },
  IRL: {
    en: '59 open roles across 27 tech giants; European operational HQ for hyperscalers.',
    cs: '59 otevřených rolí ve 27 korporacích; evropská centrála hyperscalerů a špičková kupní síla.',
  },
  CHE: {
    en: '26 open roles across 10 top firms; world-class AI research labs (Zurich) with premier salaries.',
    cs: '26 otevřených rolí v 10 špičkových firmách; prémiové AI laboratoře (Curych) s nejvyššími platy.',
  },
  NLD: {
    en: '25 open roles across 12 firms; international tech ecosystem with high English fluency.',
    cs: '25 otevřených rolí ve 12 firmách; mezinárodní technologická scéna v Amsterdamu.',
  },
  ESP: {
    en: '97 open roles across 27 firms; booming hub for remote engineers and tech nomads.',
    cs: '97 otevřených rolí ve 27 firmách; rychle rostoucí tech uzel pro nomády a remote inženýry.',
  },
  POL: {
    en: '113 open roles across 37 firms; large pool of elite competitive programmers and engineers.',
    cs: '113 otevřených rolí ve 37 firmách; obrovský pool špičkových softwarových inženýrů.',
  },
};

export const OPPORTUNITY_MATRIX_DATA: OpportunityCountry[] = (placesData.countries as any[])
  .filter((c) => c.is_focus_country && c.pillar_scores?.composite_score && c.pillar_scores?.ease_of_relocation)
  .map((c) => {
    const iso3 = c.country_code_alpha3;
    const iso2 = c.country_code_alpha2;
    const livability = c.pillar_scores.composite_score;
    const easeOfRelocation = c.pillar_scores.ease_of_relocation;
    const tm = c.tech_market || {};
    const activeJobs = tm.active_jobs ?? 1;
    const hiringCompanies = tm.hiring_companies ?? 1;
    const rawRoles = (tm.top_roles as string[]) || [];

    const formattedRolesEn = rawRoles
      .map((r) => ROLE_NAMES[r]?.en || r.replace(/_/g, ' '))
      .slice(0, 3)
      .join(', ');
    const formattedRolesCs = rawRoles
      .map((r) => ROLE_NAMES[r]?.cs || r.replace(/_/g, ' '))
      .slice(0, 3)
      .join(', ');

    // Normalized Market Score based on active jobs (log-scaled 0 - 100)
    // log(1) = 0, log(6203) = ~8.73
    const marketScore = Math.min(100, Math.round((Math.log(activeJobs) / Math.log(6500)) * 100));

    // Thriving Score: Weighted blend of Market Vitality (35%), Livability (40%), and Ease of Relocation (25%)
    const thrivingScore = Math.round(marketScore * 0.35 + livability * 0.40 + easeOfRelocation * 0.25);

    let quadrant: 'easy_win' | 'high_reward' | 'lifestyle_haven' = 'lifestyle_haven';
    if (easeOfRelocation < 80) {
      quadrant = 'high_reward';
    } else if (livability >= 75) {
      quadrant = 'easy_win';
    } else {
      quadrant = 'lifestyle_haven';
    }

    const relocNotes = RELOCATION_NOTES[iso3] || {
      en: 'Standard European work authorization and mobility rights.',
      cs: 'Standardní evropská pracovní a pobytová práva.',
    };

    const techNotes = TECH_NOTES[iso3] || {
      en: `${activeJobs} active open AI/Data roles across ${hiringCompanies} enterprise employers.`,
      cs: `${activeJobs} aktivních AI/Data pozic napříč ${hiringCompanies} korporátními zaměstnavateli.`,
    };

    return {
      iso3,
      iso2,
      name: c.country_name,
      nameCs: COUNTRY_NAMES_CS[iso3] || c.country_name,
      easeOfRelocation,
      livability,
      activeJobs,
      hiringCompanies,
      topRoles: rawRoles,
      topRolesFormattedEn: formattedRolesEn || 'AI & Data Engineering',
      topRolesFormattedCs: formattedRolesCs || 'AI & Datové inženýrství',
      safety: c.pillar_scores.safety ?? null,
      housing: c.pillar_scores.housing ?? null,
      economy: c.pillar_scores.economy ?? null,
      governance: c.pillar_scores.governance ?? null,
      thrivingScore,
      quadrant,
      relocationNoteEn: relocNotes.en,
      relocationNoteCs: relocNotes.cs,
      techNoteEn: techNotes.en,
      techNoteCs: techNotes.cs,
      highlightEn: `${techNotes.en} ${relocNotes.en}`,
      highlightCs: `${techNotes.cs} ${relocNotes.cs}`,
    };
  })
  .sort((a, b) => b.thrivingScore - a.thrivingScore);

export const TOP_SPOTLIGHT_COUNTRIES = OPPORTUNITY_MATRIX_DATA.filter((c) =>
  ['CZE', 'CAN', 'CHE', 'DEU', 'ESP', 'USA', 'IRL', 'NLD'].includes(c.iso3)
).sort((a, b) => b.thrivingScore - a.thrivingScore);
