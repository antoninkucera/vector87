import placesData from './places-data.json';
import { CONFERENCES_DATA, type ConferenceItem } from './conferences';
import { SALARY_MARKET_CONFIG, PURCHASING_POWER_DATA, type PurchasingPowerComparison } from './salaries';

export interface CountryMeta {
  alpha2: string;
  alpha3: string;
  slug: string;
  aliases: string[];
  nameEn: string;
  nameCs: string;
  flag: string;
}

export const TARGET_COUNTRIES: CountryMeta[] = [
  { alpha2: 'AT', alpha3: 'AUT', slug: 'austria', aliases: ['at', 'aut'], nameEn: 'Austria', nameCs: 'Rakousko', flag: '🇦🇹' },
  { alpha2: 'BE', alpha3: 'BEL', slug: 'belgium', aliases: ['be', 'bel'], nameEn: 'Belgium', nameCs: 'Belgie', flag: '🇧🇪' },
  { alpha2: 'BG', alpha3: 'BGR', slug: 'bulgaria', aliases: ['bg', 'bgr'], nameEn: 'Bulgaria', nameCs: 'Bulharsko', flag: '🇧🇬' },
  { alpha2: 'CA', alpha3: 'CAN', slug: 'canada', aliases: ['ca', 'can'], nameEn: 'Canada', nameCs: 'Kanada', flag: '🇨🇦' },
  { alpha2: 'HR', alpha3: 'HRV', slug: 'croatia', aliases: ['hr', 'hrv'], nameEn: 'Croatia', nameCs: 'Chorvatsko', flag: '🇭🇷' },
  { alpha2: 'CZ', alpha3: 'CZE', slug: 'czechia', aliases: ['cz', 'cze', 'czech-republic'], nameEn: 'Czechia', nameCs: 'Česko', flag: '🇨🇿' },
  { alpha2: 'DK', alpha3: 'DNK', slug: 'denmark', aliases: ['dk', 'dnk'], nameEn: 'Denmark', nameCs: 'Dánsko', flag: '🇩🇰' },
  { alpha2: 'FI', alpha3: 'FIN', slug: 'finland', aliases: ['fi', 'fin'], nameEn: 'Finland', nameCs: 'Finsko', flag: '🇫🇮' },
  { alpha2: 'FR', alpha3: 'FRA', slug: 'france', aliases: ['fr', 'fra'], nameEn: 'France', nameCs: 'Francie', flag: '🇫🇷' },
  { alpha2: 'DE', alpha3: 'DEU', slug: 'germany', aliases: ['de', 'deu'], nameEn: 'Germany', nameCs: 'Německo', flag: '🇩🇪' },
  { alpha2: 'GR', alpha3: 'GRC', slug: 'greece', aliases: ['gr', 'grc'], nameEn: 'Greece', nameCs: 'Řecko', flag: '🇬🇷' },
  { alpha2: 'HU', alpha3: 'HUN', slug: 'hungary', aliases: ['hu', 'hun'], nameEn: 'Hungary', nameCs: 'Maďarsko', flag: '🇭🇺' },
  { alpha2: 'IE', alpha3: 'IRL', slug: 'ireland', aliases: ['ie', 'irl'], nameEn: 'Ireland', nameCs: 'Irsko', flag: '🇮🇪' },
  { alpha2: 'IT', alpha3: 'ITA', slug: 'italy', aliases: ['it', 'ita'], nameEn: 'Italy', nameCs: 'Itálie', flag: '🇮🇹' },
  { alpha2: 'LT', alpha3: 'LTU', slug: 'lithuania', aliases: ['lt', 'ltu'], nameEn: 'Lithuania', nameCs: 'Litva', flag: '🇱🇹' },
  { alpha2: 'LU', alpha3: 'LUX', slug: 'luxembourg', aliases: ['lu', 'lux'], nameEn: 'Luxembourg', nameCs: 'Lucembursko', flag: '🇱🇺' },
  { alpha2: 'NL', alpha3: 'NLD', slug: 'netherlands', aliases: ['nl', 'nld'], nameEn: 'Netherlands', nameCs: 'Nizozemsko', flag: '🇳🇱' },
  { alpha2: 'NO', alpha3: 'NOR', slug: 'norway', aliases: ['no', 'nor'], nameEn: 'Norway', nameCs: 'Norsko', flag: '🇳🇴' },
  { alpha2: 'PL', alpha3: 'POL', slug: 'poland', aliases: ['pl', 'pol'], nameEn: 'Poland', nameCs: 'Polsko', flag: '🇵🇱' },
  { alpha2: 'PT', alpha3: 'PRT', slug: 'portugal', aliases: ['pt', 'prt'], nameEn: 'Portugal', nameCs: 'Portugalsko', flag: '🇵🇹' },
  { alpha2: 'RO', alpha3: 'ROU', slug: 'romania', aliases: ['ro', 'rou'], nameEn: 'Romania', nameCs: 'Rumunsko', flag: '🇷🇴' },
  { alpha2: 'SK', alpha3: 'SVK', slug: 'slovakia', aliases: ['sk', 'svk', 'slovak-republic'], nameEn: 'Slovakia', nameCs: 'Slovensko', flag: '🇸🇰' },
  { alpha2: 'ES', alpha3: 'ESP', slug: 'spain', aliases: ['es', 'esp'], nameEn: 'Spain', nameCs: 'Španělsko', flag: '🇪🇸' },
  { alpha2: 'SE', alpha3: 'SWE', slug: 'sweden', aliases: ['se', 'swe'], nameEn: 'Sweden', nameCs: 'Švédsko', flag: '🇸🇪' },
  { alpha2: 'CH', alpha3: 'CHE', slug: 'switzerland', aliases: ['ch', 'che'], nameEn: 'Switzerland', nameCs: 'Švýcarsko', flag: '🇨🇭' },
  { alpha2: 'GB', alpha3: 'GBR', slug: 'united-kingdom', aliases: ['uk', 'gbr', 'gb'], nameEn: 'United Kingdom', nameCs: 'Velká Británie', flag: '🇬🇧' },
  { alpha2: 'US', alpha3: 'USA', slug: 'united-states', aliases: ['us', 'usa'], nameEn: 'United States', nameCs: 'USA', flag: '🇺🇸' },
  { alpha2: 'BR', alpha3: 'BRA', slug: 'brazil', aliases: ['br', 'bra'], nameEn: 'Brazil', nameCs: 'Brazílie', flag: '🇧🇷' },
  { alpha2: 'IN', alpha3: 'IND', slug: 'india', aliases: ['in', 'ind'], nameEn: 'India', nameCs: 'Indie', flag: '🇮🇳' },
];

export function getCountryFlag(code?: string | null): string {
  if (!code) return '🌐';
  const c = code.toUpperCase();
  if (c === 'UK' || c === 'GB') return '🇬🇧';
  const match = TARGET_COUNTRIES.find((tc) => tc.alpha2 === c || tc.alpha3 === c);
  if (match) return match.flag;
  if (code.length === 2) {
    const offset = 127397;
    return String.fromCodePoint(c.charCodeAt(0) + offset, c.charCodeAt(1) + offset);
  }
  return '🌐';
}

export function getCountryMeta(slugOrCode: string): CountryMeta | undefined {
  const q = slugOrCode.toLowerCase().trim();
  return TARGET_COUNTRIES.find(
    (c) => c.slug === q || c.alpha2.toLowerCase() === q || c.alpha3.toLowerCase() === q || c.aliases.includes(q)
  );
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

export function getAllCountryStaticPaths() {
  const paths: any[] = [];
  for (const tc of TARGET_COUNTRIES) {
    const cData = getCountryData(tc.alpha3);
    if (!cData) continue;

    // Canonical primary slug
    paths.push({
      params: { id: tc.slug },
      props: { countryMeta: tc, countryData: cData, isAlias: false },
    });

    // Aliases with 301 redirects to canonical
    for (const alias of tc.aliases) {
      if (alias !== tc.slug) {
        paths.push({
          params: { id: alias },
          props: { countryMeta: tc, countryData: cData, isAlias: true, targetSlug: tc.slug },
        });
      }
    }
  }
  return paths;
}
