const LEAN_LBL={dds:'DDS',center:'Center',admin:'Admin',pink:'Progressive',alt:'Independent'};
const TODAY=()=>new Date().toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric',timeZone:'Asia/Manila'});
const PLAIN_STYLE=`WRITING STYLE — readers include older Filipinos and people who don't follow politics closely:
- Short sentences (about 20 words or fewer). Common, everyday words.
- The first time an acronym or term appears, explain it in a few words, e.g. "ICC (International Criminal Court)", "WPS (West Philippine Sea)", "DDS (Duterte supporters)".
- Say who is who: give a person's role the first time you name them (e.g. "Senator", "Vice President").
- No jargon, no sarcasm, no loaded adjectives. Do not take sides.
- Never add facts that are not in the headlines given to you.`;
function getLeanSources(story, lean){ return story.sources.filter(s=>s.lean===lean); }
function buildPrompt(story){
  // Build source-grounded input — each lean gets its actual headlines
  const allLines = story.sources.map(s=>`[${s.source} / ${LEAN_LBL[s.lean]||s.lean}] ${s.title}`).join('\n');

  const adminSrcs  = getLeanSources(story,'admin');
  const ddsSrcs    = getLeanSources(story,'dds');
  const pinkSrcs   = getLeanSources(story,'pink');
  const centerSrcs = getLeanSources(story,'center');

  const adminLines  = adminSrcs.length  ? adminSrcs.map(s=>`${s.source}: "${s.title}"`).join('\n')  : 'No admin source covered this story.';
  const ddsLines    = ddsSrcs.length    ? ddsSrcs.map(s=>`${s.source}: "${s.title}"`).join('\n')    : 'No DDS source covered this story.';
  const pinkLines   = pinkSrcs.length   ? pinkSrcs.map(s=>`${s.source}: "${s.title}"`).join('\n')   : 'No progressive source covered this story.';
  const centerLines = centerSrcs.length ? centerSrcs.map(s=>`${s.source}: "${s.title}"`).join('\n') : '';

  const hasSide = (srcs) => srcs.length > 0;

  const p=`You are a neutral Philippine political news analyst. Today is ${TODAY()}. Below are actual headlines published by different outlets about the same story. Each outlet has a known editorial lean.

ALL HEADLINES COVERING THIS STORY:
${allLines}

Your task — generate exactly 8 fields:

1. NEUTRAL_SHORT: One factual sentence (max 30 words) synthesizing what happened across all sources — no framing, no opinion.
2. NEUTRAL_LONG: 3–4 sentence factual summary drawing on all headlines above. What are the confirmed facts?

3. ADMIN_PHRASE: Max 9 words — the angle/spin in the admin/Bagong Pilipinas headlines below.
4. ADMIN_SUMMARY: 2–3 sentences. Based ONLY on these admin outlet headlines: ${adminLines} — explain how they frame the story, what they emphasize or omit, and why.

5. DDS_PHRASE: Max 9 words — the angle/spin in the DDS/pro-Duterte headlines below.
6. DDS_SUMMARY: 2–3 sentences. Based ONLY on these DDS outlet headlines: ${ddsLines} — explain how they frame the story, what they emphasize or omit, and why.

7. PINK_PHRASE: Max 9 words — the angle/spin in the progressive/Pinklawan headlines below.
8. PINK_SUMMARY: 2–3 sentences. Based ONLY on these progressive outlet headlines: ${pinkLines} — explain how they frame the story, what they emphasize or omit, and why.

If a side has no source, note that no outlet from that side covered this story and explain what that silence might mean.
If this is not a political story (for example a typhoon, earthquake, price change or outage), do not invent a political spin: say plainly when coverage is factual and similar across outlets, and put practical details people need (where, when, what to do) in the neutral summary.

${PLAIN_STYLE}

Respond in EXACTLY this format with no extra text:
NEUTRAL_SHORT: [sentence]
NEUTRAL_LONG: [paragraph]
ADMIN_PHRASE: [phrase]
ADMIN_SUMMARY: [paragraph]
DDS_PHRASE: [phrase]
DDS_SUMMARY: [paragraph]
PINK_PHRASE: [phrase]
PINK_SUMMARY: [paragraph]`;

  return p;
}
export const config = { runtime: 'edge' };
// TEMPORARY diagnostic: send the app's real story prompt and return the raw reply. Remove after use.
const STORY={headline:'Senate panel clears OVP budget in under 20 minutes as Duterte skips hearing',sources:[
 {source:'Philippine Star',lean:'center',title:'Senate panel clears OVP budget in under 20 minutes as Duterte skips hearing'},
 {source:'Rappler',lean:'pink',title:'Senate panel approves proposed 2027 OVP budget in under 20 minutes'},
 {source:'Manila Times',lean:'dds',title:'Senate extends courtesy to OVP in budget hearing'},
 {source:'Manila Bulletin',lean:'admin',title:'Senate finance panel endorses P785-M OVP budget'}]};
export default async function handler(req){
  const p=buildPrompt(STORY);
  const q=new URL(req.url).searchParams; const model=q.get('m')||'claude-haiku-5-5'; const effort=q.get('e')||'low';
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},
    body:JSON.stringify({model,max_tokens:3000,output_config:{effort},messages:[{role:'user',content:p}]})});
  const d=await r.json();
  return new Response(JSON.stringify({status:r.status,stop_reason:d.stop_reason,usage:d.usage,blocks:(d.content||[]).map(c=>c.type),raw:(d.content||[]).map(c=>c.text).join('\n---\n'),error:d.error},null,2),{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
}