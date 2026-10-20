export const config = { runtime: 'edge' };

// The server decides which model runs, so this endpoint can't be used to call
// arbitrary (or expensive) models with the FactsPH API key.
//   fast  → story summaries on the Brief (many calls per visit, so cheap and quick)
//   smart → Search / "Ask FactsPH" (one call, user-initiated, deeper analysis)
// These models think before answering, and thinking counts toward max_tokens. "effort" keeps the
// thinking short; the token budget leaves room for thinking plus the answer (about 1,200 tokens).
const TIERS = {
  fast:  { model: 'claude-haiku-5-5',  effort: 'low',    max_tokens: 3000 },
  smart: { model: 'claude-sonnet-5-5', effort: 'medium', max_tokens: 6000 },
};
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

    const { model, effort, max_tokens } = TIERS[body.tier] || TIERS.fast;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, output_config: { effort }, messages: msgs }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic error:', model, JSON.stringify(data));
      return json(data, response.status);
    }
    // Send back only the answer text (drop thinking blocks), in the shape the app already reads
    const text = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    if (!text) console.error('Empty answer:', model, data.stop_reason, JSON.stringify(data.usage));
    return json({ content: [{ type: 'text', text }], stop_reason: data.stop_reason, model });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
