export const config = { runtime: 'edge' };

export default function handler(req) {
  const { searchParams } = new URL(req.url);

  const trim = (s, max) => (s||'').length > max ? (s||'').slice(0, max - 1) + '...' : (s||'');

  const h = trim(searchParams.get('h')     || 'Philippine News, Without the Spin', 80);
  const n = trim(searchParams.get('n')     || 'Factual summary of the story.', 110);
  const a = trim(searchParams.get('admin') || 'Admin framing of the story.', 72);
  const d = trim(searchParams.get('dds')   || 'DDS framing of the story.', 72);
  const p = trim(searchParams.get('pink')  || 'Progressive framing of the story.', 72);

  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="spec" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#1a5eb8"/>
      <stop offset="33%"  stop-color="#2a7a48"/>
      <stop offset="60%"  stop-color="#b0a898"/>
      <stop offset="100%" stop-color="#b03070"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#f5f0e8"/>

  <!-- Gold left bar -->
  <rect x="0" y="0" width="8" height="630" fill="#8a6800"/>

  <!-- Header band -->
  <rect x="8" y="0" width="1192" height="72" fill="#fffdf8"/>
  <line x1="8" y1="72" x2="1200" y2="72" stroke="#ddd8cc" stroke-width="1"/>

  <!-- Wordmark -->
  <text x="52" y="48" font-family="Georgia, serif" font-size="38" font-weight="bold" fill="#1a1612">Facts</text>
  <text x="138" y="48" font-family="Georgia, serif" font-size="38" font-style="italic" fill="#8a6800">PH</text>

  <!-- Spectrum labels -->
  <text x="700" y="44" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1a5eb8">&#9664; Admin</text>
  <text x="790" y="44" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#2a7a48">DDS</text>
  <text x="840" y="44" font-family="Arial, sans-serif" font-size="12" fill="#7a7060">Center</text>
  <text x="910" y="44" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#b03070">Progressives &#9654;</text>

  <!-- Spectrum gradient bar -->
  <rect x="60" y="66" width="1080" height="5" rx="2" fill="url(#spec)"/>

  <!-- Headline -->
  <text x="52" y="122" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#1a1612">${esc(h)}</text>

  <!-- Neutral box -->
  <rect x="52" y="145" width="1096" height="46" rx="6" fill="#fffef5" stroke="#d4c890" stroke-width="1"/>
  <text x="70" y="173" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#8a6800" letter-spacing="1">NEUTRAL</text>
  <text x="148" y="173" font-family="Georgia, serif" font-size="14" font-style="italic" fill="#2a2218">${esc(n)}</text>

  <!-- Admin column -->
  <rect x="52"  y="208" width="346" height="360" rx="10" fill="#f0f4ff" stroke="#8aade8" stroke-width="1"/>
  <rect x="52"  y="208" width="346" height="5"   rx="3"  fill="#1a5eb8"/>
  <text x="68"  y="233" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1a5eb8" letter-spacing="1">ADMIN ANGLE</text>
  <text x="68"  y="260" font-family="Georgia, serif" font-size="13" font-style="italic" fill="#2a2218">"${esc(a)}"</text>

  <!-- DDS column -->
  <rect x="414" y="208" width="346" height="360" rx="10" fill="#f2faf5" stroke="#90c8a8" stroke-width="1"/>
  <rect x="414" y="208" width="346" height="5"   rx="3"  fill="#2a7a48"/>
  <text x="430" y="233" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#2a7a48" letter-spacing="1">DDS ANGLE</text>
  <text x="430" y="260" font-family="Georgia, serif" font-size="13" font-style="italic" fill="#2a2218">"${esc(d)}"</text>

  <!-- Progressives column -->
  <rect x="776" y="208" width="372" height="360" rx="10" fill="#fdf2f7" stroke="#d890b8" stroke-width="1"/>
  <rect x="776" y="208" width="372" height="5"   rx="3"  fill="#b03070"/>
  <text x="792" y="233" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#b03070" letter-spacing="1">PROGRESSIVES</text>
  <text x="792" y="260" font-family="Georgia, serif" font-size="13" font-style="italic" fill="#2a2218">"${esc(p)}"</text>

  <!-- Footer -->
  <line x1="52" y1="596" x2="1148" y2="596" stroke="#ccc6b8" stroke-width="1"/>
  <text x="52" y="616" font-family="Arial, sans-serif" font-size="13" fill="#7a7060">factsPH.vercel.app  ·  Same story. 3 versions. You decide.</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
