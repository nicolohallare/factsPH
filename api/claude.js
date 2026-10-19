export const config = { runtime: 'edge' };

// The server decides which model runs, so this endpoint can't be used to call
// arbitrary (or expensive) models with the FactsPH API key.
//   fast  → story summaries on the Brief (many calls per visit, so cheap and quick)
//   smart → Search / "Ask FactsPH" (one call, user-initiated, deeper analysis)
const MODELS = {
  fast: 'claude-haiku-5-5',
  smart: 'claude-sonnet-5-5',
};
const MAX_TOKENS = 1500;
const MAX_PROMPT_CHARS = 16000;

const CORS = { 'Access-Control-Allow-Origin': '*' };
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: { ...CORS, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }
    });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: 'No API key configured' }, 500);

  try {
    const body = await req.json();

    // Only a single user message of bounded length is accepted
    const msgs = body.messages;
    const ok = Array.isArray(msgs) && msgs.length === 1 && msgs[0].role === 'user'
      && typeof msgs[0].content === 'string' && msgs[0].content.length <= MAX_PROMPT_CHARS;
    if (!ok) return json({ error: 'Invalid request' }, 400);

    const model = MODELS[body.tier] || MODELS.fast;
    const max_tokens = Math.min(Math.max(Number(body.max_tokens) || 900, 100), MAX_TOKENS);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, messages: msgs }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic error:', model, JSON.stringify(data));
      return json(data, response.status);
    }
    return json(data);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
