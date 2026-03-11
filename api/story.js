export const config = { runtime: 'edge' };

export default function handler(req) {
  const { searchParams } = new URL(req.url);

  const trim = (s, max) => {
    const str = (s || '').trim();
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  };

  const esc = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const h    = trim(searchParams.get('h')    || 'Philippine News, Without the Spin', 100);
  const n    = trim(searchParams.get('n')    || 'Factual summary of the story.', 200);
  const slug = searchParams.get('slug')      || '';
  const t    = searchParams.get('t')         || 'general';

  // Build the redirect URL — back to main app with story highlighted
  const appUrl = `https://factsph.vercel.app/${slug ? '#' + slug : ''}`;

  // Build the OG image URL using the existing /api/og endpoint
  const ogParams = new URLSearchParams({
    h:    searchParams.get('h')    || '',
    n:    searchParams.get('n')    || '',
    dds:  searchParams.get('dds')  || '',
    pink: searchParams.get('pink') || '',
    t,
  });
  const ogImage = `https://factsph.vercel.app/api/og?${ogParams.toString()}`;

  // Square OG image for mobile (uses static asset)
  const ogSquare = `https://factsph.vercel.app/assets/og-square.png`;

  const topicEmoji = {
    icc:      '⚖️',
    marcos:   '🏛️',
    sara:     '🗳️',
    wps:      '🌊',
    elections:'🗳️',
  }[t] || '🇵🇭';

  const title = `${topicEmoji} ${esc(h)} — FactsPH`;
  const desc  = esc(n) || 'Same story. Admin version. DDS version. Progressives version. Read it on FactsPH.';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">

<!-- Open Graph — square image for mobile Facebook -->
<meta property="og:type"        content="article">
<meta property="og:url"         content="https://factsph.vercel.app/api/story?${esc(searchParams.toString())}">
<meta property="og:title"       content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image"       content="${esc(ogImage)}">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name"   content="FactsPH">
<meta property="og:locale"      content="en_PH">

<!-- Twitter -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image"       content="${esc(ogImage)}">

<!-- Instant redirect for human visitors -->
<meta http-equiv="refresh" content="0; url=${esc(appUrl)}">
<script>window.location.replace(${JSON.stringify(appUrl)});</script>

<style>
  body{font-family:Georgia,serif;background:#f5f0e8;color:#1a1612;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;box-sizing:border-box}
  .card{background:#fffdf8;border:1px solid #ddd8cc;border-radius:12px;padding:28px;max-width:480px;width:100%;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.08)}
  .logo{font-size:28px;font-weight:bold;margin-bottom:4px}
  .logo em{font-style:italic;color:#8a6800}
  .tag{font-size:12px;color:#7a7060;margin-bottom:20px;font-style:italic}
  h1{font-size:18px;line-height:1.4;margin-bottom:12px}
  p{font-size:14px;color:#4a4030;line-height:1.6;margin-bottom:20px}
  a{display:inline-block;background:#8a6800;color:#fffdf8;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600}
</style>
</head>
<body>
<div class="card">
  <div class="logo">Facts<em>PH</em></div>
  <div class="tag">Read the News, Without the Bias</div>
  <h1>${esc(h)}</h1>
  <p>${esc(n)}</p>
  <a href="${esc(appUrl)}">Read on FactsPH →</a>
</div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
