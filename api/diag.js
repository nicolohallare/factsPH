export const config = { runtime: 'edge' };
// TEMPORARY diagnostic: one tiny request per model, reports status and error type only. Remove after use.
export default async function handler() {
  const key = process.env.ANTHROPIC_API_KEY;
  const out = { keyPresent: !!key };
  for (const model of ['claude-haiku-5-5', 'claude-sonnet-5-5', 'claude-haiku-4-5-20251001']) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': key || '', 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model, max_tokens: 5, messages: [{ role: 'user', content: 'Say OK' }] }),
      });
      const d = await r.json();
      out[model] = { status: r.status, text: d.content?.[0]?.text, error: d.error ? `${d.error.type}: ${d.error.message}` : undefined };
    } catch (e) { out[model] = { fetchError: e.message }; }
  }
  return new Response(JSON.stringify(out, null, 2), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
