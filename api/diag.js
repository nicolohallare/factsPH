export const config = { runtime: 'edge' };
// TEMPORARY diagnostic: calls the app's own /api/claude with a real story prompt. Remove after use.
export default async function handler(req) {
  const origin = 'https://factsph.vercel.app';
  const prompt = `You are a neutral Philippine political news analyst. Below are actual headlines about the same story.
ALL HEADLINES:
[Philippine Star / Center] Senate panel clears OVP budget in under 20 minutes as Duterte skips hearing
[Rappler / Progressive] Senate panel approves proposed 2027 OVP budget in under 20 minutes
[Manila Times / DDS] Senate extends courtesy to OVP in budget hearing
[Manila Bulletin / Admin] Senate finance panel endorses P785-M OVP budget
Respond in EXACTLY this format:
NEUTRAL_SHORT: [sentence]
NEUTRAL_LONG: [paragraph]
ADMIN_PHRASE: [phrase]
ADMIN_SUMMARY: [paragraph]
DDS_PHRASE: [phrase]
DDS_SUMMARY: [paragraph]
PINK_PHRASE: [phrase]
PINK_SUMMARY: [paragraph]`;
  const out = {};
  for (const tier of ['fast', 'smart']) {
    const t0 = Date.now();
    const r = await fetch(origin + '/api/claude', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier, messages: [{ role: 'user', content: prompt }] }) });
    const txt = await r.text();
    out[tier] = { status: r.status, ms: Date.now() - t0, body: txt.slice(0, 1500) };
  }
  return new Response(JSON.stringify(out, null, 2), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
