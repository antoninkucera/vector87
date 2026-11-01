#!/usr/bin/env node
/**
 * scripts/generate-map-paths.mjs
 * Generates clean, antimeridian-clipped SVG path strings for the Interactive World Map (960x500).
 * Uses d3-geo and topojson-client with world-atlas countries-110m.
 */
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT_DIR, 'src', 'data', 'world-map-paths.json');

const TOPO_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const ISO_URL = 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json';

console.log('[Map Generator] Fetching world-atlas topology and ISO mapping...');
const [topoRes, isoRes] = await Promise.all([
  fetch(TOPO_URL),
  fetch(ISO_URL)
]);

if (!topoRes.ok || !isoRes.ok) {
  throw new Error(`Failed to fetch data: topo=${topoRes.status}, iso=${isoRes.status}`);
}

const topo = await topoRes.json();
const isoList = await isoRes.json();

const numToA3 = {};
for (const item of isoList) {
  numToA3[item['country-code'].padStart(3, '0')] = item['alpha-3'];
}
// Kosovo manual override
numToA3['-99'] = 'XKX';

const geo = topojson.feature(topo, topo.objects.countries);

// Equirectangular projection fitted to 960x500 with proper antimeridian cutting
const projection = d3.geoEquirectangular().fitSize([960, 500], { type: 'Sphere' });
const pathGenerator = d3.geoPath(projection);

const paths = {};
for (const feat of geo.features) {
  const rawId = String(feat.id || '').padStart(3, '0');
  const iso3 = numToA3[rawId];
  if (!iso3) continue;

  const rawD = pathGenerator(feat);
  if (!rawD) continue;

  // Round coordinates to 1 decimal place for compact JSON size without visual loss
  const cleanD = rawD.replace(/\d+\.\d+/g, m => Math.round(parseFloat(m) * 10) / 10);
  paths[iso3] = cleanD;
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(paths), 'utf-8');

console.log(`[Map Generator] Successfully wrote ${Object.keys(paths).length} antimeridian-clipped country paths to ${OUTPUT_PATH}`);
