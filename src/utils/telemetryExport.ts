/**
 * Client-side utility for exporting high-resolution branded charts and copying citations.
 * Generates ready-to-share 16:9 PNG assets for LinkedIn, Substack, and slide decks.
 */

export function showExportToast(message: string): void {
  let toast = document.getElementById('v87-export-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'v87-export-toast';
    toast.className =
      'fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl shadow-cyan-950/40 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-all duration-300 opacity-0 translate-y-2 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span><span>${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast?.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
    toast?.classList.remove('opacity-100', 'translate-y-0');
  }, 2600);
}

export function copyCitationToClipboard(title: string, customUrl?: string, lang: 'en' | 'cs' = 'en'): void {
  const url = customUrl || (typeof window !== 'undefined' ? window.location.href : 'https://vector87.com');
  const cleanUrl = url.split('#')[0];
  const citationText = `Vector87. (2026). "${title}". Vector87 Global AI & Data Job Market Telemetry. Retrieved from ${cleanUrl}`;

  navigator.clipboard.writeText(citationText).then(
    () => {
      showExportToast(lang === 'cs' ? '✓ Citace zkopírována do schránky' : '✓ Citation copied to clipboard');
    },
    (err) => {
      console.error('Failed to copy citation:', err);
    }
  );
}

export function exportChartAsBrandedPng(
  canvas: HTMLCanvasElement,
  title: string,
  subtitle?: string,
  lang: 'en' | 'cs' = 'en'
): void {
  try {
    const exportCanvas = document.createElement('canvas');
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const width = 1200;
    const height = 675; // 16:9 presentation standard
    exportCanvas.width = width * dpr;
    exportCanvas.height = height * dpr;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // 1. Dark background
    ctx.fillStyle = '#04070e';
    ctx.fillRect(0, 0, width, height);

    // Subtle outer border
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // 2. Header: Vector87 Brand Logo
    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillStyle = '#22d3ee';
    ctx.fillText('VECTOR 87', 52, 56);
    ctx.fillStyle = '#64748b';
    ctx.fillText(' // ANALYTICAL TELEMETRY HUB', 144, 56);

    // Top Right Snapshot Pill
    ctx.textAlign = 'right';
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('S&P 500 & EUROPEAN ENTERPRISE HIRING • NOV 2026', width - 52, 56);
    ctx.textAlign = 'left';

    // Header divider line
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.beginPath();
    ctx.moveTo(52, 70);
    ctx.lineTo(width - 52, 70);
    ctx.stroke();

    // 3. Title & Subtitle
    ctx.font = "bold 23px 'Inter', sans-serif";
    ctx.fillStyle = '#ffffff';
    ctx.fillText(title, 52, 108);

    if (subtitle) {
      ctx.font = "13px 'Inter', sans-serif";
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(subtitle, 52, 132);
    }

    // 4. Render the Chart.js Canvas
    const chartY = subtitle ? 148 : 124;
    const chartAvailableH = height - chartY - 64;
    const chartAvailableW = width - 104;

    // Draw chart canvas with high clarity
    ctx.drawImage(canvas, 52, chartY, chartAvailableW, chartAvailableH);

    // 5. Footer Watermark & Formal License
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.beginPath();
    ctx.moveTo(52, height - 46);
    ctx.lineTo(width - 52, height - 46);
    ctx.stroke();

    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillStyle = '#64748b';
    ctx.fillText('Source: https://vector87.com • Verified enterprise job postings • CC BY 4.0', 52, height - 24);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('vector87.com', width - 52, height - 24);

    // Trigger download
    const cleanSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const a = document.createElement('a');
    a.download = `vector87-${cleanSlug}.png`;
    a.href = exportCanvas.toDataURL('image/png');
    a.click();

    showExportToast(lang === 'cs' ? '✓ Graf stažen jako PNG (16:9)' : '✓ Chart downloaded as PNG (16:9)');
  } catch (err) {
    console.error('Failed to export chart PNG:', err);
  }
}
