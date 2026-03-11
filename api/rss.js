export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing url param', { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FactsPH/1.0; +https://facts-ph.vercel.app)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return new Response(`Feed returned ${response.status}`, { status: 502 });
    }

    const text = await response.text();
    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (err) {
    return new Response(`Fetch failed: ${err.message}`, { status: 502 });
  }
}
