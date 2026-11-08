import placesData from './places-data.json';
import { CONFERENCES_DATA, type ConferenceItem } from './conferences';
import { SALARY_MARKET_CONFIG, PURCHASING_POWER_DATA } from './salaries';

export interface CountryMeta {
  alpha2: string;
  alpha3: string;
  slug: string;
  aliases: string[];
  nameEn: string;
  nameCs: string;
  continent: string;
  subregion?: string;
  flag: string;
}

const CUSTOM_SLUGS: Record<string, string> = {
  CZ: 'czechia',
  GB: 'united-kingdom',
  US: 'united-states',
  SK: 'slovakia',
  MO: 'macao',
  CD: 'dr-congo',
  CG: 'congo',
  CI: 'ivory-coast',
  CV: 'cape-verde',
  LA: 'laos',
  RU: 'russia',
  SY: 'syria',
  TZ: 'tanzania',
  VE: 'venezuela',
  VN: 'vietnam',
  IR: 'iran',
  BO: 'bolivia',
  BN: 'brunei',
  FM: 'micronesia',
  MD: 'moldova',
  KP: 'north-korea',
  KR: 'south-korea',
};

const CUSTOM_ALIASES: Record<string, string[]> = {
  CZ: ['cz', 'cze', 'czech-republic'],
  GB: ['uk', 'gbr', 'gb'],
  US: ['us', 'usa', 'united-states'],
  SK: ['sk', 'svk', 'slovak-republic'],
  DE: ['de', 'deu'],
  FR: ['fr', 'fra'],
  ES: ['es', 'esp'],
  IT: ['it', 'ita'],
  PL: ['pl', 'pol'],
  AT: ['at', 'aut'],
  CH: ['ch', 'che'],
  NL: ['nl', 'nld'],
  CA: ['ca', 'can'],
  IE: ['ie', 'irl'],
  SE: ['se', 'swe'],
  NO: ['no', 'nor'],
  DK: ['dk', 'dnk'],
  FI: ['fi', 'fin'],
  JP: ['jp', 'jpn'],
  AU: ['au', 'aus'],
  NZ: ['nz', 'nzl'],
  MO: ['mo', 'mac', 'macau'],
  AD: ['ad', 'and'],
  SM: ['sm', 'smr'],
  SG: ['sg', 'sgp'],
  IN: ['in', 'ind'],
  BR: ['br', 'bra'],
};

const CZECH_NAME_MAP: Record<string, string> = {
  AD: 'Andorra',
  AE: 'Spojené arabské emiráty',
  AF: 'Afghánistán',
  AL: 'Albánie',
  AM: 'Arménie',
  AO: 'Angola',
  AR: 'Argentina',
  AT: 'Rakousko',
  AU: 'Austrálie',
  AZ: 'Ázerbájdžán',
  BA: 'Bosna a Hercegovina',
  BD: 'Bangladéš',
  BE: 'Belgie',
  BF: 'Burkina Faso',
  BG: 'Bulharsko',
  BH: 'Bahrajn',
  BI: 'Burundi',
  BJ: 'Benin',
  BM: 'Bermudy',
  BN: 'Brunej',
  BO: 'Bolívie',
  BR: 'Brazílie',
  BS: 'Bahamy',
  BT: 'Bhútán',
  BW: 'Botswana',
  BY: 'Bělorusko',
  BZ: 'Belize',
  CA: 'Kanada',
  CD: 'Demokratická republika Kongo',
  CF: 'Středoafrická republika',
  CG: 'Kongo',
  CH: 'Švýcarsko',
  CI: 'Pobřeží slonoviny',
  CL: 'Chile',
  CM: 'Kamerun',
  CN: 'Čína',
  CO: 'Kolumbie',
  CR: 'Kostarika',
  CU: 'Kuba',
  CV: 'Kapverdy',
  CY: 'Kypr',
  CZ: 'Česko',
  DE: 'Německo',
  DK: 'Dánsko',
  DO: 'Dominikánská republika',
  DZ: 'Alžírsko',
  EC: 'Ekvádor',
  EE: 'Estonsko',
  EG: 'Egypt',
  ES: 'Španělsko',
  ET: 'Etiopie',
  FI: 'Finsko',
  FJ: 'Fidži',
  FR: 'Francie',
  GA: 'Gabon',
  GB: 'Velká Británie',
  GE: 'Gruzie',
  GH: 'Ghana',
  GM: 'Gambie',
  GN: 'Guinea',
  GR: 'Řecko',
  GT: 'Guatemala',
  HK: 'Hongkong',
  HN: 'Honduras',
  HR: 'Chorvatsko',
  HT: 'Haiti',
  HU: 'Maďarsko',
  ID: 'Indonésie',
  IE: 'Irsko',
  IL: 'Izrael',
  IN: 'Indie',
  IQ: 'Irák',
  IR: 'Írán',
  IS: 'Island',
  IT: 'Itálie',
  JM: 'Jamajka',
  JO: 'Jordánsko',
  JP: 'Japonsko',
  KE: 'Keňa',
  KG: 'Kyrgyzstán',
  KH: 'Kambodža',
  KP: 'Severní Korea',
  KR: 'Jižní Korea',
  KW: 'Kuvajt',
  KZ: 'Kazachstán',
  LA: 'Laos',
  LB: 'Libanon',
  LI: 'Lichtenštejnsko',
  LK: 'Srí Lanka',
  LR: 'Libérie',
  LT: 'Litva',
  LU: 'Lucembursko',
  LV: 'Lotyšsko',
  LY: 'Libye',
  MA: 'Maroko',
  MC: 'Monako',
  MD: 'Moldavsko',
  ME: 'Černá Hora',
  MG: 'Madagaskar',
  MK: 'Severní Makedonie',
  ML: 'Mali',
  MM: 'Myanmar',
  MN: 'Mongolsko',
  MO: 'Macao',
  MT: 'Malta',
  MU: 'Mauricius',
  MV: 'Maledivy',
  MW: 'Malawi',
  MX: 'Mexiko',
  MY: 'Malajsie',
  MZ: 'Mosambik',
  NA: 'Namibie',
  NE: 'Niger',
  NG: 'Nigérie',
  NI: 'Nikaragua',
  NL: 'Nizozemsko',
  NO: 'Norsko',
  NP: 'Nepál',
  NZ: 'Nový Zéland',
  OM: 'Omán',
  PA: 'Panama',
  PE: 'Peru',
  PG: 'Papua-Nová Guinea',
  PH: 'Filipíny',
  PK: 'Pákistán',
  PL: 'Polsko',
  PR: 'Portoriko',
  PS: 'Palestina',
  PT: 'Portugalsko',
  PY: 'Paraguay',
  QA: 'Katar',
  RO: 'Rumunsko',
  RS: 'Srbsko',
  RU: 'Rusko',
  RW: 'Rwanda',
  SA: 'Saúdská Arábie',
  SD: 'Súdán',
  SE: 'Švédsko',
  SG: 'Singapur',
  SI: 'Slovinsko',
  SK: 'Slovensko',
  SL: 'Sierra Leone',
  SM: 'San Marino',
  SN: 'Senegal',
  SO: 'Somálsko',
  SR: 'Surinam',
  SV: 'Salvador',
  SY: 'Sýrie',
  TH: 'Thajsko',
  TJ: 'Tádžikistán',
  TM: 'Turkmenistán',
  TN: 'Tunisko',
  TR: 'Turecko',
  TT: 'Trinidad a Tobago',
  TW: 'Tchaj-wan',
  TZ: 'Tanzanie',
  UA: 'Ukrajina',
  UG: 'Uganda',
  US: 'USA',
  UY: 'Uruguay',
  UZ: 'Uzbekistán',
  VA: 'Vatikán',
  VE: 'Venezuela',
  VN: 'Vietnam',
  YE: 'Jemen',
  ZA: 'Jihoafrická republika',
  ZM: 'Zambie',
  ZW: 'Zimbabwe',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCountryFlag(code?: string | null): string {
  if (!code) return '🌐';
  const c = code.toUpperCase();
  if (c === 'UK' || c === 'GB') return '🇬🇧';
  if (c.length === 2) {
    const offset = 127397;
    return String.fromCodePoint(c.charCodeAt(0) + offset, c.charCodeAt(1) + offset);
  }
  return '🌐';
}

// Build complete catalog for all 217 countries in places-data.json
export const ALL_COUNTRIES_META: CountryMeta[] = (placesData.countries as any[]).map((c) => {
  const a2 = c.country_code_alpha2;
  const a3 = c.country_code_alpha3;
  const slug = CUSTOM_SLUGS[a2] || slugify(c.country_name);
  const aliasesSet = new Set<string>();

  aliasesSet.add(a2.toLowerCase());
  aliasesSet.add(a3.toLowerCase());
  if (CUSTOM_ALIASES[a2]) {
    for (const ca of CUSTOM_ALIASES[a2]) aliasesSet.add(ca.toLowerCase());
  }
  aliasesSet.delete(slug);

  return {
    alpha2: a2,
    alpha3: a3,
    slug,
    aliases: Array.from(aliasesSet),
    nameEn: c.country_name,
    nameCs: CZECH_NAME_MAP[a2] || c.country_name,
    continent: c.continent,
    subregion: c.subregion,
    flag: getCountryFlag(a2),
  };
});

const COUNTRY_BY_SLUG = new Map<string, CountryMeta>();
for (const cm of ALL_COUNTRIES_META) {
  COUNTRY_BY_SLUG.set(cm.slug, cm);
  COUNTRY_BY_SLUG.set(cm.alpha2.toLowerCase(), cm);
  COUNTRY_BY_SLUG.set(cm.alpha3.toLowerCase(), cm);
  for (const alias of cm.aliases) {
    COUNTRY_BY_SLUG.set(alias.toLowerCase(), cm);
  }
}

export function getCountryMeta(slugOrCode: string): CountryMeta | undefined {
  if (!slugOrCode) return undefined;
  return COUNTRY_BY_SLUG.get(slugOrCode.toLowerCase().trim());
}

export function getCountryData(alpha3: string) {
  return (placesData.countries as any[]).find((c) => c.country_code_alpha3 === alpha3);
}

export function getCountryConferences(countryCode: string): ConferenceItem[] {
  const code = countryCode.toUpperCase();
  const altCode = code === 'UK' ? 'GB' : code === 'GB' ? 'UK' : code;
  return CONFERENCES_DATA.filter((conf) => {
    const cCode = (conf.countryCode || '').toUpperCase();
    return cCode === code || cCode === altCode;
  });
}

export function getCountrySalaryContext(countryCode: string) {
  const code = countryCode.toUpperCase();
  let marketKey: 'CZ' | 'US' | 'UK' | 'EU' | null = null;
  if (code === 'CZ') marketKey = 'CZ';
  else if (code === 'US') marketKey = 'US';
  else if (code === 'GB' || code === 'UK') marketKey = 'UK';
  else marketKey = 'EU';

  const marketConfig = marketKey ? SALARY_MARKET_CONFIG[marketKey] : null;
  const pppComp = PURCHASING_POWER_DATA.find((p) => p.marketCode === marketKey);

  return {
    marketKey,
    marketConfig,
    purchasingPower: pppComp,
  };
}

export function getRegionalNeighbors(alpha3: string, limit = 4): CountryMeta[] {
  const target = ALL_COUNTRIES_META.find((c) => c.alpha3 === alpha3);
  if (!target) return [];

  const allCountriesDataMap = new Map((placesData.countries as any[]).map((c) => [c.country_code_alpha3, c]));

  const candidates = ALL_COUNTRIES_META.filter((c) => c.alpha3 !== alpha3 && c.continent === target.continent);

  // Score candidates: same subregion + has tech jobs + high composite score
  candidates.sort((a, b) => {
    const da = allCountriesDataMap.get(a.alpha3);
    const db = allCountriesDataMap.get(b.alpha3);

    const sameSubA = a.subregion === target.subregion ? 1 : 0;
    const sameSubB = b.subregion === target.subregion ? 1 : 0;
    if (sameSubA !== sameSubB) return sameSubB - sameSubA;

    const jobsA = (da?.tech_market?.active_jobs || 0) > 0 ? 1 : 0;
    const jobsB = (db?.tech_market?.active_jobs || 0) > 0 ? 1 : 0;
    if (jobsA !== jobsB) return jobsB - jobsA;

    const scoreA = da?.pillar_scores?.composite_score ?? -1;
    const scoreB = db?.pillar_scores?.composite_score ?? -1;
    return scoreB - scoreA;
  });

  return candidates.slice(0, limit);
}

export function getAllCountryStaticPaths() {
  const paths: any[] = [];
  for (const cm of ALL_COUNTRIES_META) {
    const cData = getCountryData(cm.alpha3);
    if (!cData) continue;

    // Canonical primary slug
    paths.push({
      params: { id: cm.slug },
      props: { countryMeta: cm, countryData: cData, isAlias: false },
    });

    // Aliases with 301 redirects to canonical
    for (const alias of cm.aliases) {
      if (alias !== cm.slug) {
        paths.push({
          params: { id: alias },
          props: { countryMeta: cm, countryData: cData, isAlias: true, targetSlug: cm.slug },
        });
      }
    }
  }
  return paths;
}
