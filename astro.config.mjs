import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { ALL_COUNTRIES_META } from './src/data/places';
import { TECHNOLOGIES_CATALOG } from './src/data/technologies';

// Collect all alias paths that return 301 redirects so the sitemap contains ONLY canonical 200 OK URLs
const countryAliases = new Set();
for (const c of ALL_COUNTRIES_META) {
  for (const a of c.aliases) {
    if (a !== c.slug) countryAliases.add(a.toLowerCase());
  }
}

const techAliases = new Set();
for (const t of TECHNOLOGIES_CATALOG) {
  if (t.aliases) {
    for (const a of t.aliases) {
      if (a !== t.id) techAliases.add(a.toLowerCase());
    }
  }
}

function isSitemapAllowed(page) {
  if (page.includes('/gcp-hub') || page.includes('_') || page.includes('/data/')) {
    return false;
  }

  // Filter country alias redirects, e.g. /places/cz/ or /cs/places/cz/
  const placeMatch = page.match(/\/(?:cs\/)?places\/([a-z0-9-]+)\/?$/);
  if (placeMatch) {
    const slug = placeMatch[1];
    if (countryAliases.has(slug)) return false;
  }

  // Filter technology alias redirects, e.g. /technologies/google-bigquery/
  const techMatch = page.match(/\/(?:cs\/)?technologies\/([a-z0-9-]+)\/?$/);
  if (techMatch) {
    const slug = techMatch[1];
    if (techAliases.has(slug)) return false;
  }

  return true;
}

export default defineConfig({
  site: 'https://vector87.com',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          cs: 'cs',
        },
      },
      filter: isSitemapAllowed,
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cs'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['chart.js/auto'],
    },
  },
});
