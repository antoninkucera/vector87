import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const outputDir = path.resolve('public/social');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. AVATAR SVG (800 x 800 px, optimized for circular crop)
const avatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="spaceGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#0c1836" />
      <stop offset="60%" stop-color="#050a17" />
      <stop offset="100%" stop-color="#020409" />
    </radialGradient>

    <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <linearGradient id="glowLinear" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0" />
      <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="darkPill" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.4" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#spaceGrad)" />
  <rect width="800" height="800" fill="url(#grid)" />

  <!-- Outer Telemetry Radar Ring (within 760 circle safe area) -->
  <circle cx="400" cy="400" r="350" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.6" />
  <circle cx="400" cy="400" r="330" fill="none" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.3" />
  <circle cx="400" cy="400" r="280" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="12 12" stroke-opacity="0.4" />
  <circle cx="400" cy="400" r="230" fill="none" stroke="#0ea5e9" stroke-width="1" stroke-opacity="0.2" />

  <!-- Coordinate Crosshairs -->
  <line x1="80" y1="400" x2="220" y2="400" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.5" />
  <line x1="580" y1="400" x2="720" y2="400" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.5" />
  <line x1="400" y1="80" x2="400" y2="220" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.5" />
  <line x1="400" y1="580" x2="400" y2="720" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.5" />

  <!-- Radar Angle Ticks -->
  <circle cx="400" cy="70" r="4" fill="#22d3ee" />
  <circle cx="400" cy="730" r="4" fill="#22d3ee" />
  <circle cx="70" cy="400" r="4" fill="#22d3ee" />
  <circle cx="730" cy="400" r="4" fill="#22d3ee" />

  <!-- Center Hex Shield / Rounded Rect Plate -->
  <rect x="210" y="210" width="380" height="380" rx="44" fill="url(#darkPill)" stroke="#22d3ee" stroke-width="2.5" stroke-opacity="0.7" />
  <rect x="226" y="226" width="348" height="348" rx="32" fill="none" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="6 8" />

  <!-- Technical Corner Accents -->
  <path d="M 235 270 L 235 235 L 270 235" fill="none" stroke="#38bdf8" stroke-width="3" />
  <path d="M 565 270 L 565 235 L 530 235" fill="none" stroke="#38bdf8" stroke-width="3" />
  <path d="M 235 530 L 235 565 L 270 565" fill="none" stroke="#38bdf8" stroke-width="3" />
  <path d="M 565 530 L 565 565 L 530 565" fill="none" stroke="#38bdf8" stroke-width="3" />

  <!-- Top System Pill inside card -->
  <text x="400" y="268" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="4" text-anchor="middle">MARKET INTELLIGENCE</text>

  <!-- Dynamic Vector Arrow Icon (Subtle top right) -->
  <g transform="translate(480, 290)">
    <line x1="0" y1="36" x2="36" y2="0" stroke="#22d3ee" stroke-width="4" stroke-linecap="round" />
    <polyline points="14,0 36,0 36,22" fill="none" stroke="#22d3ee" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Big Core Typographic Brand: V87 -->
  <text x="390" y="440" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', monospace" font-size="168" font-weight="900" fill="url(#cyanNeon)" text-anchor="middle" letter-spacing="-4" filter="url(#glow)">V87</text>

  <!-- Glowing underline scanline -->
  <rect x="260" y="468" width="280" height="3" fill="url(#glowLinear)" />

  <!-- Sub-label: VECTOR87.COM -->
  <text x="400" y="520" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', monospace" font-size="22" font-weight="800" fill="#f8fafc" letter-spacing="8" text-anchor="middle">VECTOR 87</text>

  <text x="400" y="552" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#94a3b8" letter-spacing="3" text-anchor="middle">AI &amp; DATA INTELLIGENCE</text>
</svg>
`;

// 2. HEADER BANNER SVG (3000 x 1000 px, scaled 2x for Retina 1500x500)
// Safe area: Left x=0..700 has bottom avatar overlap on X UI.
// Core content positioned between x=750 and x=2850, y=140 and y=860.
const bannerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1000" width="3000" height="1000">
  <defs>
    <radialGradient id="bgGlow" cx="65%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#0a1a3a" />
      <stop offset="45%" stop-color="#050d20" />
      <stop offset="100%" stop-color="#020409" />
    </radialGradient>

    <radialGradient id="leftAmbient" cx="15%" cy="60%" r="45%">
      <stop offset="0%" stop-color="#0d244a" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#020409" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="60%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#090e1a" stop-opacity="0.85" />
    </linearGradient>

    <filter id="glowBanner" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <pattern id="bannerGrid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.3" />
    </pattern>

    <pattern id="dotMatrix" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="#334155" opacity="0.4" />
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="3000" height="1000" fill="url(#bgGlow)" />
  <rect width="3000" height="1000" fill="url(#leftAmbient)" />
  <rect width="3000" height="1000" fill="url(#bannerGrid)" />
  <rect x="1800" y="100" width="1100" height="800" fill="url(#dotMatrix)" opacity="0.6" />

  <!-- Left Side: Radar / Telemetry Backdrop (behind avatar area) -->
  <g opacity="0.4">
    <circle cx="380" cy="520" r="320" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6 8" />
    <circle cx="380" cy="520" r="240" fill="none" stroke="#22d3ee" stroke-width="1" stroke-opacity="0.3" />
    <circle cx="380" cy="520" r="160" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="10 10" stroke-opacity="0.4" />
    <line x1="60" y1="520" x2="700" y2="520" stroke="#1e293b" stroke-width="1" />
    <line x1="380" y1="200" x2="380" y2="840" stroke="#1e293b" stroke-width="1" />
    <text x="380" y="180" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="14" fill="#38bdf8" letter-spacing="4" text-anchor="middle">CALIBRATION // AZIMUTH 087°</text>
  </g>

  <!-- Right Side: Graphic Telemetry Wave & Vector Curve -->
  <g transform="translate(1650, 220)">
    <!-- Chart Area Fill -->
    <path d="M 0 540 L 150 480 L 320 500 L 480 380 L 680 410 L 860 220 L 1050 140 L 1200 60 L 1200 620 L 0 620 Z" fill="url(#chartGradient)" />

    <!-- Trajectory Line with Glow -->
    <path d="M 0 540 L 150 480 L 320 500 L 480 380 L 680 410 L 860 220 L 1050 140 L 1200 60" fill="none" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowBanner)" />

    <!-- Axis and Grid Guides -->
    <line x1="0" y1="620" x2="1220" y2="620" stroke="#334155" stroke-width="2" />
    <line x1="0" y1="460" x2="1220" y2="460" stroke="#1e293b" stroke-width="1" stroke-dasharray="6 8" />
    <line x1="0" y1="300" x2="1220" y2="300" stroke="#1e293b" stroke-width="1" stroke-dasharray="6 8" />
    <line x1="0" y1="140" x2="1220" y2="140" stroke="#1e293b" stroke-width="1" stroke-dasharray="6 8" />

    <!-- Data Nodes / Pulsing Points -->
    <circle cx="150" cy="480" r="7" fill="#0f172a" stroke="#38bdf8" stroke-width="4" />
    <circle cx="320" cy="500" r="7" fill="#0f172a" stroke="#38bdf8" stroke-width="4" />
    <circle cx="480" cy="380" r="8" fill="#0f172a" stroke="#22d3ee" stroke-width="4" />
    <circle cx="680" cy="410" r="8" fill="#0f172a" stroke="#22d3ee" stroke-width="4" />
    <circle cx="860" cy="220" r="9" fill="#0f172a" stroke="#38bdf8" stroke-width="5" />
    <circle cx="1050" cy="140" r="10" fill="#0f172a" stroke="#22d3ee" stroke-width="5" />

    <!-- Peak Endpoint with Dynamic Vector Ray -->
    <circle cx="1200" cy="60" r="14" fill="#22d3ee" filter="url(#glowBanner)" />
    <circle cx="1200" cy="60" r="6" fill="#ffffff" />

    <!-- Data Callout Tooltip at Peak -->
    <g transform="translate(940, -20)">
      <rect width="240" height="56" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5" opacity="0.95" />
      <text x="120" y="24" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="12" font-weight="700" fill="#38bdf8" letter-spacing="2" text-anchor="middle">PRIMARY SIGNAL</text>
      <text x="120" y="44" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="1" text-anchor="middle">Δt &gt; CAPITAL FLOW</text>
    </g>

    <!-- Vector Legend Coordinates -->
    <text x="0" y="650" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="14" font-weight="600" fill="#64748b" letter-spacing="2">01 // MARKET DATA</text>
    <text x="480" y="650" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="14" font-weight="600" fill="#64748b" letter-spacing="2">02 // S&amp;P 500 INFLOW</text>
    <text x="1000" y="650" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="14" font-weight="600" fill="#22d3ee" letter-spacing="2">03 // ACTIVE VELOCITY ↗</text>
  </g>

  <!-- Center-Left: Main Brand Identity & Typography -->
  <!-- Starts safely at x=780, well clear of Twitter's avatar on desktop & mobile -->
  <g transform="translate(780, 180)">

    <!-- Top Status / Eyebrow Pill -->
    <g transform="translate(0, 0)">
      <rect width="460" height="42" rx="21" fill="url(#pillGrad)" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.6" />
      <circle cx="24" cy="21" r="5" fill="#22d3ee" filter="url(#glowBanner)" />
      <text x="44" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#38bdf8" letter-spacing="3">SYSTEM 087 // S&amp;P 500 RADAR</text>
    </g>

    <!-- Main Title: VECTOR 87 -->
    <g transform="translate(0, 155)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', sans-serif" font-size="124" font-weight="900" fill="#ffffff" letter-spacing="-2">
        VECTOR <tspan fill="url(#cyanGrad)">87</tspan>
      </text>
    </g>

    <!-- High-Impact Tagline / Positioning -->
    <g transform="translate(0, 225)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'JetBrains Mono', sans-serif" font-size="34" font-weight="800" fill="#38bdf8" letter-spacing="4">
        EMPIRICAL INTELLIGENCE ON THE AI &amp; DATA JOB MARKET
      </text>
    </g>

    <!-- Analytical Description line -->
    <g transform="translate(0, 280)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="500" fill="#94a3b8" letter-spacing="1">
        Tracking real capital allocation, engineering seats, and tech stacks across S&amp;P 500 &amp; tech leaders.
      </text>
      <text x="0" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="500" fill="#64748b" letter-spacing="1">
        No synthetic hype. Grounded on primary data and Data-Informed intelligence.
      </text>
    </g>

    <!-- 3 Telemetry Feature Badges -->
    <g transform="translate(0, 390)">
      <!-- Badge 1 -->
      <g transform="translate(0, 0)">
        <rect width="320" height="54" rx="12" fill="url(#pillGrad)" stroke="#334155" stroke-width="1.5" />
        <text x="24" y="33" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="16" font-weight="700" fill="#f1f5f9" letter-spacing="1.5">◆ S&amp;P 500 HIRING INTENSITY</text>
      </g>

      <!-- Badge 2 -->
      <g transform="translate(345, 0)">
        <rect width="320" height="54" rx="12" fill="url(#pillGrad)" stroke="#334155" stroke-width="1.5" />
        <text x="24" y="33" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="16" font-weight="700" fill="#f1f5f9" letter-spacing="1.5">◆ IC vs. MANAGEMENT RATIO</text>
      </g>

      <!-- Badge 3 -->
      <g transform="translate(690, 0)">
        <rect width="330" height="54" rx="12" fill="url(#pillGrad)" stroke="#334155" stroke-width="1.5" />
        <text x="24" y="33" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="16" font-weight="700" fill="#f1f5f9" letter-spacing="1.5">◆ TECH STACK PENETRATION</text>
      </g>
    </g>

    <!-- Bottom Anchor Line: Domain & Author Credit -->
    <g transform="translate(0, 520)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="#1e293b" stroke-width="1.5" />
      <text x="0" y="36" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="20" font-weight="800" fill="#22d3ee" letter-spacing="4">
        VECTOR87.COM
      </text>
      <text x="320" y="36" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="18" font-weight="500" fill="#64748b" letter-spacing="2">
        // CREATED BY ANTONÍN KUČERA (@akucera)
      </text>
    </g>
  </g>

  <!-- High-Tech Corner Frame Accents -->
  <path d="M 50 120 L 50 50 L 120 50" fill="none" stroke="#22d3ee" stroke-width="3" stroke-opacity="0.6" />
  <path d="M 2950 120 L 2950 50 L 2880 50" fill="none" stroke="#22d3ee" stroke-width="3" stroke-opacity="0.6" />
  <path d="M 50 880 L 50 950 L 120 950" fill="none" stroke="#22d3ee" stroke-width="3" stroke-opacity="0.6" />
  <path d="M 2950 880 L 2950 950 L 2880 950" fill="none" stroke="#22d3ee" stroke-width="3" stroke-opacity="0.6" />

  <!-- Top / Bottom Thin Accent Borders -->
  <rect x="0" y="0" width="3000" height="4" fill="url(#cyanGrad)" />
  <rect x="0" y="996" width="3000" height="4" fill="#0f172a" />
</svg>
`;

async function run() {
  console.log('Writing SVG files...');
  const avatarSvgPath = path.join(outputDir, 'x-avatar.svg');
  const bannerSvgPath = path.join(outputDir, 'x-banner.svg');

  fs.writeFileSync(avatarSvgPath, avatarSvg.trim());
  fs.writeFileSync(bannerSvgPath, bannerSvg.trim());

  console.log('Rendering Avatar PNG via Sharp (800x800)...');
  await sharp(Buffer.from(avatarSvg))
    .resize(800, 800)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'x-avatar.png'));

  console.log('Rendering Header Banner PNG via Sharp (3000x1000, 2x Retina)...');
  await sharp(Buffer.from(bannerSvg))
    .resize(3000, 1000)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'x-banner.png'));

  // Also create a 1500x500 1x version for exact spec upload if needed
  console.log('Rendering Header Banner PNG via Sharp (1500x500, 1x standard)...');
  await sharp(Buffer.from(bannerSvg))
    .resize(1500, 500)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'x-banner-1500x500.png'));

  console.log('✅ All assets generated successfully in:', outputDir);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
