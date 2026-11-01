import placesData from './places-data.json';
import marketData from './market-data.json';

export interface OpportunityCountry {
  iso3: string;
  iso2: string;
  name: string;
  nameCs: string;
  jobs: number;
  livability: number;
  safety: number | null;
  housing: number | null;
  economy: number | null;
  governance: number | null;
  quadrant: 'dream' | 'power' | 'haven' | 'developing';
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

const JOB_COUNTS_MAP: Record<string, number> = {
  USA: 4428,
  CAN: 750,
  GBR: 247,
  CZE: 176,
  DEU: 142,
  POL: 58,
  IRL: 43,
  ESP: 43,
  FRA: 36,
  CHE: 24,
  NLD: 22,
  SWE: 11,
  ITA: 10,
  PRT: 10,
  ROU: 9,
  AUT: 5,
  LTU: 4,
  DNK: 3,
  GRC: 3,
  BEL: 2,
  FIN: 2,
  NOR: 2,
  BGR: 1,
  HRV: 1,
  HUN: 1,
  LUX: 1,
  SVK: 1,
};

const HIGHLIGHTS_EN: Record<string, string> = {
  USA: 'Unrivaled hiring volume, premium enterprise compensation, higher cost pressure.',
  CAN: 'Exceptional combination of massive tech hiring and world-class livability.',
  GBR: 'Premier European financial and AI research hub with dense corporate presence.',
  CZE: 'High safety index, central European lifestyle, resilient tech engineering hub.',
  DEU: 'European industrial heavyweight with balanced stability and high corporate demand.',
  IRL: 'European tech headquarters capital with stellar economic prosperity score.',
  CHE: 'Top-tier safety and purchasing power with high salaries in financial and tech hubs.',
  NLD: 'Outstanding institutional governance, international ecosystem, and high quality of life.',
  PRT: 'Emerging tech and remote hub with high safety, mild climate, and affordable housing.',
  ESP: 'Leading European lifestyle destination with growing AI and data engineering hubs.',
  AUT: 'Superb quality of life, robust public services, and stable corporate economy.',
  NOR: 'Exceptional social safety net, high stability, and progressive work culture.',
  SWE: 'Vibrant Nordic innovation ecosystem with premier governance and work-life balance.',
};

const HIGHLIGHTS_CS: Record<string, string> = {
  USA: 'Bezkonkurenční objem nabídek a vysoké mzdy, vyšší náklady na život a zdravotnictví.',
  CAN: 'Mimořádné spojení silného tech trhu (750+ pozic) s vysokou úrovní bezpečí a stability.',
  GBR: 'Hlavní evropský finanční a AI výzkumný uzel s vysokou koncentrací firem.',
  CZE: 'Vynikající bezpečnost (87,0), dostupnější život a silné inženýrské zázemí.',
  DEU: 'Průmyslový lídr Evropy se stabilním zázemím a vysokou poptávkou po datařích.',
  IRL: 'Evropská centrála technologických gigantů s mimořádnou kupní silou (96,6).',
  CHE: 'Špičková bezpečnost (90,9) a nejvyšší platy, prémiový životní standard.',
  NLD: 'Vynikající veřejná správa, mezinárodní prostředí a vysoká životní úroveň.',
  PRT: 'Populární cíl pro remote práci a nomády: vysoké bezpečí, mírné klima a dostupnost.',
  ESP: 'Atraktivní středomořský životní styl s rostoucími AI a datovými huby.',
  AUT: 'Mimořádná kvalita veřejných služeb, čisté prostředí a stabilní ekonomika.',
  NOR: 'Špičkový sociální systém, geopolitický klid a vyvážený pracovní život.',
  SWE: 'Silný skandinávský inovační ekosystém s prvotřídním právním státem.',
};

export const OPPORTUNITY_MATRIX_DATA: OpportunityCountry[] = (placesData.countries as any[])
  .filter((c) => c.is_focus_country && c.pillar_scores?.composite_score)
  .map((c) => {
    const iso3 = c.country_code_alpha3;
    const iso2 = c.country_code_alpha2;
    const score = c.pillar_scores.composite_score;
    const jobs = JOB_COUNTS_MAP[iso3] ?? 1;

    let quadrant: 'dream' | 'power' | 'haven' | 'developing' = 'developing';
    if (jobs >= 20 && score >= 75) {
      quadrant = 'dream';
    } else if (jobs >= 200) {
      quadrant = 'power';
    } else if (score >= 75) {
      quadrant = 'haven';
    }

    return {
      iso3,
      iso2,
      name: c.country_name,
      nameCs: COUNTRY_NAMES_CS[iso3] || c.country_name,
      jobs,
      livability: score,
      safety: c.pillar_scores.safety ?? null,
      housing: c.pillar_scores.housing ?? null,
      economy: c.pillar_scores.economy ?? null,
      governance: c.pillar_scores.governance ?? null,
      quadrant,
      highlightEn: HIGHLIGHTS_EN[iso3] || 'Balanced corporate destination with European standards.',
      highlightCs: HIGHLIGHTS_CS[iso3] || 'Vyvážená destinace splňující evropské standardy.',
    };
  })
  .sort((a, b) => b.jobs - a.jobs);

export const TOP_SPOTLIGHT_COUNTRIES = OPPORTUNITY_MATRIX_DATA.filter((c) =>
  ['CHE', 'CAN', 'CZE', 'IRL', 'NLD', 'PRT'].includes(c.iso3)
);
