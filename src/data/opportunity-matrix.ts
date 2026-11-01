import placesData from './places-data.json';

export interface OpportunityCountry {
  iso3: string;
  iso2: string;
  name: string;
  nameCs: string;
  easeOfRelocation: number;
  livability: number;
  safety: number | null;
  housing: number | null;
  economy: number | null;
  governance: number | null;
  quadrant: 'easy_win' | 'high_reward' | 'lifestyle_haven';
  relocationNoteEn: string;
  relocationNoteCs: string;
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

export const OPPORTUNITY_MATRIX_DATA: OpportunityCountry[] = (placesData.countries as any[])
  .filter((c) => c.is_focus_country && c.pillar_scores?.composite_score && c.pillar_scores?.ease_of_relocation)
  .map((c) => {
    const iso3 = c.country_code_alpha3;
    const iso2 = c.country_code_alpha2;
    const livability = c.pillar_scores.composite_score;
    const easeOfRelocation = c.pillar_scores.ease_of_relocation;

    // Quadrant logic:
    // 1. high_reward: Relocation barriers/quotas (< 80) but high livability / compensation (USA, CAN, GBR)
    // 2. easy_win: High Relocation Ease (>= 85) + Top-tier Livability (>= 75)
    // 3. lifestyle_haven: High Relocation Ease (>= 85) + Lifestyle appeal (Mediterranean/Eastern EU)
    let quadrant: 'easy_win' | 'high_reward' | 'lifestyle_haven' = 'lifestyle_haven';
    if (easeOfRelocation < 80) {
      quadrant = 'high_reward';
    } else if (livability >= 75) {
      quadrant = 'easy_win';
    } else {
      quadrant = 'lifestyle_haven';
    }

    const notes = RELOCATION_NOTES[iso3] || {
      en: 'Standard European work authorization and mobility rights.',
      cs: 'Standardní evropská pracovní a pobytová práva.',
    };

    return {
      iso3,
      iso2,
      name: c.country_name,
      nameCs: COUNTRY_NAMES_CS[iso3] || c.country_name,
      easeOfRelocation,
      livability,
      safety: c.pillar_scores.safety ?? null,
      housing: c.pillar_scores.housing ?? null,
      economy: c.pillar_scores.economy ?? null,
      governance: c.pillar_scores.governance ?? null,
      quadrant,
      relocationNoteEn: notes.en,
      relocationNoteCs: notes.cs,
      highlightEn: notes.en,
      highlightCs: notes.cs,
    };
  })
  .sort((a, b) => b.livability - a.livability);

export const TOP_SPOTLIGHT_COUNTRIES = OPPORTUNITY_MATRIX_DATA.filter((c) =>
  ['CHE', 'CAN', 'CZE', 'ESP', 'NLD', 'USA'].includes(c.iso3)
);
