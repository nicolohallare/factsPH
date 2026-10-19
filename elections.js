/* ============================================================
   FactsPH · 2028 Elections section
   ------------------------------------------------------------
   To add a new survey: copy one block in POLLS (or H2H for
   head-to-head match-ups), fill in every field, commit.
   Everything else (averages, charts, confidence) recomputes.
   Rules: only numbers you saw in a source; put every source
   link in `src`; anything odd goes in `flags`.
   ============================================================ */

const EL_AS_OF = '2026-10-19'; // date the data below was last checked

// ── Candidates ────────────────────────────────────────────────
// status: 'declared' | 'out' (publicly ruled out) | 'undeclared'
const EL_CANDS = {
  sara:  { name: 'Sara Duterte',    color: '#c26a1f', status: 'declared',
           note: 'Announced Feb 18, 2026. Facing a Senate impeachment trial; under the Constitution a conviction carries disqualification from public office.',
           src: [['Arab News, Feb 18 2026', 'https://www.arabnews.com/node/2633452/world'],
                 ['Inquirer, trial highlights', 'https://newsinfo.inquirer.net/2312504/icymi-sara-duterte-impeachment-trial-week-12-highlights']] },
  leni:  { name: 'Leni Robredo',    color: '#5b5fc7', status: 'out',
           note: 'Ruled out a national run on Apr 21, 2026; plans a second term as Naga mayor.',
           src: [['Inquirer', 'https://plus.inquirer.net/news/leni-rules-out-natl-run-in-28/']] },
  tulfo: { name: 'Raffy Tulfo',     color: '#2f8f8a', status: 'out',
           note: 'Ruled out a presidential or VP run on May 5, 2026; seeking Senate re-election. Asked to be left out of 2028 polls.',
           src: [['GMA News', 'https://www.gmanetwork.com/news_duplicate/balitambayan/balita/986540/raffy-tulfo-walang-balak-tumakbong-pangulo-sa-2028-polls-na-puwede-niyang-makalaban-si-sara-duter/story/']] },
  risa:  { name: 'Risa Hontiveros', color: '#7a8b2f', status: 'undeclared', note: '', src: [] },
  isko:  { name: 'Isko Moreno',     color: '#3d8fc4', status: 'undeclared', note: '', src: [] },
  bam:   { name: 'Bam Aquino',      color: '#b04545', status: 'undeclared', note: '', src: [] },
  go:    { name: 'Bong Go',         color: '#6b6b6b', status: 'undeclared', note: '', src: [] },
};

// ── Multi-candidate ("list") surveys, newest first ────────────
// undec = don't know + refused + none.  indep:true only when a source says it wasn't commissioned.  include:false keeps a poll
// out of the average (reason in `exclude`) but still shows it.
const EL_POLLS = [
  { pollster: 'Pulse Asia', start: '2026-09-17', end: '2026-09-24', released: '2026-10-12',
    n: 2400, moe: 2, method: 'Face-to-face', sponsor: null, indep: true, q: 'List question: "whom would you vote for as President"',
    r: { sara: 50, leni: 26, tulfo: 12, risa: 3 }, other: 'Teodoro 1, Dizon 1, Magalong 0.3, others 0.2', undec: 7,
    flags: [], src: [['Pulse Asia release (PDF)', 'https://pulseasia.ph/wp-content/uploads/2026/10/MR1-UB2026-3-MR-on-the-May-2028-Elections-Final.pdf']] },

  { pollster: 'Tangere', start: '2026-09-30', end: '2026-10-03', released: '2026-10-07',
    n: 1800, moe: 2.4, method: 'Mobile app', sponsor: null, indep: true, q: 'List question without Sara Duterte',
    r: { leni: 29, tulfo: 14, go: 18 }, other: 'Baste Duterte 22', undec: null,
    include: false, exclude: 'Sara Duterte was not on the list, so it is not comparable with the others.',
    flags: ['A separate scenario without Robredo and Tulfo had Baste Duterte 29, Go 26, B. Aquino 20.'],
    src: [['Manila Times', 'https://www.manilatimes.net/2026/10/07/news/robredo-baste-duterte-emerge-top-presidential-bets-in-2028-survey/2440594']] },

  { pollster: 'Momentum Research', start: '2026-08-18', end: '2026-08-23', released: '2026-08-27',
    n: 1487, moe: 2.5, method: 'Face-to-face', sponsor: null, q: 'List question: "who they would vote as president among the names listed"',
    r: { sara: 45.8, leni: 19.5, tulfo: 13.3 }, other: '', undec: null,
    flags: ['Presidential figures found in only one report (Manila Times, Oct 12); undecided and other names not reported there.', 'Margin of error and method from a separate Manila Times report on the same survey.'],
    src: [['Manila Times, Oct 12 2026', 'https://www.manilatimes.net/2026/10/12/tmt-anniversary/no-clear-challenger-to-presidential-survey-frontrunner-sara/2441843'],
          ['Manila Times, Oct 9 2026 (method)', 'https://www.manilatimes.net/2026/10/09/news/marcos-keeps-negative-duterte-positive-approval-ratings-in-aug-survey/2442347']] },

  { pollster: 'Momentum Research', start: '2026-07-13', end: '2026-07-16', released: '2026-08-10',
    n: 1438, moe: 2.6, method: 'Face-to-face', sponsor: null, indep: true, q: 'Closed list of 8 names',
    r: { sara: 44.2, leni: 23.8, tulfo: 12.2, risa: 2.4, bam: 2.0, go: 1.8 }, other: 'Pangilinan 1.0, Remulla 0.5', undec: 11.9,
    flags: ['Newer firm; no published track record or methodology page found.'],
    src: [['SunStar', 'https://www.sunstar.com.ph/davao/latest-survey-sara-tulfo-top-choices-for-president-vp-in-2028']] },

  { pollster: 'Pulse Asia', start: '2026-06-28', end: '2026-07-06', released: '2026-07-22',
    n: 2400, moe: 2, method: 'Face-to-face', sponsor: null, indep: true, q: 'List question, one answer',
    r: { sara: 49, leni: 26, tulfo: 14 }, other: 'Dizon 1, Magalong 1, Torre 0.1', undec: 9,
    flags: ['Pulse release gives fieldwork as "June 28 to July 3, 6, 2026"; news reports say June 28 to July 3.'], src: [['Pulse Asia release (PDF)', 'https://pulseasia.ph/wp-content/uploads/2026/07/MR2-UB2026-2-MR-on-the-May-2028-Elections-Final.pdf']] },

  { pollster: 'WR Numero', start: '2026-06-09', end: '2026-06-16', released: '2026-07-31',
    n: 1432, moe: 2.6, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 39.4, leni: 20.9, tulfo: 14.2, go: 3.6, bam: 2.7, risa: 2.1 }, other: '', undec: 17,
    flags: ['Sample reported as 1,432 by two outlets and 1,500 by one.', 'One outlet printed Robredo at 29.09%, likely a typo; two others say 20.9%.'],
    src: [['Philstar', 'https://www.philstar.com/opinion/2026/08/12/2548654/survey-shows-presidential-preference-2028']] },

  { pollster: 'OCTA Research', start: '2026-03-19', end: '2026-03-25', released: '2026-04-24',
    n: 1200, moe: 3, method: 'Face-to-face', sponsor: null, indep: true, q: 'List of 26 names',
    r: { sara: 33, leni: 21, isko: 10, tulfo: 9, bam: 4 }, other: 'Other names combined 20', undec: 3,
    flags: ['A 26-name list spreads support thinner than shorter lists.', 'Undecided reported as 2% (OCTA, GMA) and 3% (Philstar).'],
    src: [['OCTA Research', 'https://octaresearch.com/?p=2177']] },

  { pollster: 'WR Numero', start: '2026-03-10', end: '2026-03-17', released: '2026-04-07',
    n: 1455, moe: 3, method: 'Face-to-face', sponsor: null, q: 'List question',
    r: { sara: 35.9, tulfo: 19, leni: 16, go: 4, bam: 3 }, other: 'Pangilinan 1; six others under 1', undec: 19.4,
    flags: ['Wikipedia lists Robredo 18.5 and Tulfo 13.3. Three news reports give Tulfo 19 and Robredo 16; we use those.'],
    src: [['SunStar', 'https://www.sunstar.com.ph/davao/vp-sara-maintains-lead-in-2028-presidential-race'],
          ['Radyo Natin', 'https://www.radyonatin.com.ph/post/duterte-leads-2028-presidential-polls-bong-go-tops-vice-president-race-wr-numero-research-early-survey']] },

  { pollster: 'Tangere', start: '2026-02-19', end: '2026-02-20', released: '2026-02-21',
    n: 1200, moe: 2.77, method: 'Mobile app', sponsor: null, q: 'List question',
    r: { sara: 43, leni: 27, tulfo: 15, risa: 3 }, other: '', undec: 12,
    flags: ['Figures as listed on Wikipedia, citing the Manila Times; we could not open the original article.'],
    src: [['Manila Times', 'https://www.manilatimes.net/2026/02/21/news/duterte-ahead-in-early-presidential-poll/2282234']] },

  { pollster: 'WR Numero', start: '2025-11-21', end: '2025-11-28', released: '2025-12-03',
    n: 1412, moe: 3, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 33.3, tulfo: 13.4, leni: 13.0, go: 4, risa: 2.4 }, other: 'Poe 3.3, Padilla 3.3', undec: 22.2,
    flags: [], src: [['Mindanao Times', 'https://www.mindanaotimes.com.ph/vp-sara-maintains-significant-lead-in-latest-presidential-preference-survey/']] },

  { pollster: 'WR Numero', start: '2025-07-29', end: '2025-08-06', released: '2025-08-13',
    n: 1418, moe: null, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 31.4, leni: 13.3, tulfo: 10.3, go: 6.5, bam: 3.1 }, other: 'I. Marcos 4.4; not on list 4.3', undec: 18,
    flags: ['Fieldwork end reported as Aug 5 and Aug 6.'],
    src: [['PhilSTAR Life', 'https://philstarlife.com/living/465068-sara-duterte-bong-top-choice-president-vice-president-2028']] },

  // Older rounds: shown in the trend and list, outside the 12-month average window
  { pollster: 'WR Numero', start: '2025-03-31', end: '2025-04-07', released: '2025-05-06', n: 1894, moe: 2, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 30.2, tulfo: 17.9, leni: 12.7, go: 4.0, risa: 2.3 }, other: 'Poe 4.7, I. Marcos 3.8', undec: 17.5,
    flags: ['Sample given as 1,894 (Rolling Stone PH) and 1,834 (Wikipedia).'], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
  { pollster: 'WR Numero', start: '2025-02-10', end: '2025-02-18', released: '2025-03-03', n: 1814, moe: 2, method: 'Not stated', sponsor: null, indep: true, q: 'List question',
    r: { sara: 29.1, tulfo: 19.3, leni: 12.4, risa: 1.1 }, other: 'Pacquiao 4.1, Poe 3.8', undec: 22.6,
    flags: [], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
  { pollster: 'WR Numero', start: '2024-09-05', end: '2024-09-23', released: '2024-11-18', n: 1729, moe: 2, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 24, tulfo: 24, leni: 9, risa: 4 }, other: '', undec: 18,
    flags: [], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
  { pollster: 'Oculum', start: '2024-06-25', end: '2024-06-30', released: '2024-07-15', n: 1200, moe: 3, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 25.4, tulfo: 18.5, leni: 10.6, risa: 2.9, isko: 4.8 }, other: '', undec: 20.4,
    flags: [], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
  { pollster: 'Pulse Asia', start: '2024-03-06', end: '2024-03-10', released: '2024-04-03', n: 1200, moe: 2.8, method: 'Face-to-face', sponsor: null, q: '"Who would you vote for if the elections were held today?"',
    r: { tulfo: 35, sara: 34, leni: 11, risa: 1 }, other: 'I. Marcos 5, Pacquiao 3, Padilla 2', undec: 7,
    flags: [], src: [['Pulse Asia release (PDF)', 'https://pulseasia.ph/wp-content/uploads/2024/04/UB-Mar-2024-Presidential-and-Vice-presidential-Prefence.pdf']] },
  { pollster: 'Oculum', start: '2024-02-21', end: '2024-02-29', released: '2024-03-10', n: 3000, moe: 2, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 42, tulfo: 17, leni: 10, isko: 4 }, other: '', undec: 14,
    flags: [], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
  { pollster: 'WR Numero', start: '2023-11-24', end: '2023-12-24', released: '2024-01-10', n: 1500, moe: null, method: 'Not stated', sponsor: null, q: 'List question',
    r: { sara: 36, tulfo: 23, leni: 9, risa: 1 }, other: '', undec: 14,
    flags: [], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
  { pollster: 'SWS', start: '2023-04-15', end: '2023-04-18', released: '2023-05-01', n: 1200, moe: 3, method: 'Face-to-face', sponsor: 'sponsor not given', q: 'List question',
    r: { sara: 28, tulfo: 11, leni: 6 }, other: '', undec: 41,
    flags: ['Robredo given as 6 (Wikipedia) and 4 (a Philstar column).'], src: [['Wikipedia table', 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2028_Philippine_presidential_election']] },
];

// ── Head-to-head match-ups ────────────────────────────────────
const EL_H2H = [
  { a: 'sara', b: 'leni', pollster: 'Pulse Asia', start: '2026-09-17', end: '2026-09-24', n: 2400, moe: 2, sponsor: null, va: 54, vb: 40, undec: 6.3,
    src: [['Pulse Asia (PDF)', 'https://pulseasia.ph/wp-content/uploads/2026/10/MR1-UB2026-3-MR-on-the-May-2028-Elections-Final.pdf']] },
  { a: 'sara', b: 'leni', pollster: 'Momentum Research', start: '2026-08-18', end: '2026-08-23', n: 1487, moe: 2.5, sponsor: null, va: 58.3, vb: 33.6, undec: null,
    src: [['Manila Times, Oct 12 2026', 'https://www.manilatimes.net/2026/10/12/tmt-anniversary/no-clear-challenger-to-presidential-survey-frontrunner-sara/2441843']] },
  { a: 'sara', b: 'leni', pollster: 'Momentum Research', start: '2026-07-13', end: '2026-07-16', n: 1438, moe: 2.6, sponsor: null, va: 54, vb: 39, undec: 7,
    src: [['SunStar', 'https://www.sunstar.com.ph/davao/sara-beats-leni-in-latest-survey']] },
  { a: 'sara', b: 'leni', pollster: 'OCTA Research', start: '2026-07-04', end: '2026-07-11', n: 1200, moe: 3, sponsor: null, va: 43, vb: 34, undec: 22,
    src: [['OCTA Research', 'https://octaresearch.com/?p=2411']] },
  { a: 'sara', b: 'leni', pollster: 'Pulse Asia', start: '2026-06-28', end: '2026-07-06', n: 2400, moe: 2, sponsor: null, va: 52, vb: 39, undec: 8.4,
    src: [['Pulse Asia (PDF)', 'https://pulseasia.ph/wp-content/uploads/2026/07/MR2-UB2026-2-MR-on-the-May-2028-Elections-Final.pdf']] },
  { a: 'sara', b: 'leni', pollster: 'WR Numero', start: '2026-06-09', end: '2026-06-16', n: 1432, moe: 2.6, sponsor: null, va: 50, vb: 40, undec: 10,
    src: [['Philstar', 'https://www.philstar.com/opinion/2026/08/12/2548654/survey-shows-presidential-preference-2028']] },
  { a: 'sara', b: 'leni', pollster: 'Pulse Asia', start: '2026-05-03', end: '2026-05-07', n: 1500, moe: 2.5, sponsor: 'Stratbase Group', va: 51, vb: 41, undec: 8,
    src: [['Philstar', 'https://www.philstar.com/headlines/2026/05/30/2531651/leni-robredo-closes-sara-duterte-hypothetical-2028-race-poll/amp/'],
          ['GMA News', 'https://www.gmanetwork.com/news/topstories/nation/989597/sara-duterte-robredo-presidential-poll/story/']] },
  { a: 'sara', b: 'leni', pollster: 'OCTA Research', start: '2026-03-19', end: '2026-03-25', n: 1200, moe: 3, sponsor: null, va: 46, vb: 35, undec: 19,
    src: [['OCTA Research', 'https://octaresearch.com/?p=2177']] },
  { a: 'sara', b: 'leni', pollster: 'Pulse Asia', start: '2026-02-27', end: '2026-03-02', n: 1200, moe: 2.8, sponsor: "Office of Sen. Zubiri", va: 51, vb: 43, undec: 6,
    src: [['Philstar', 'https://www.philstar.com/headlines/2026/05/05/2525809/robredo-cuts-dutertes-wide-lead-hypothetical-2028-pulse-poll']] },
  { a: 'sara', b: 'risa', pollster: 'Pulse Asia', start: '2026-09-17', end: '2026-09-24', n: 2400, moe: 2, sponsor: null, va: 60, vb: 23, undec: 17.4,
    src: [['Pulse Asia (PDF)', 'https://pulseasia.ph/wp-content/uploads/2026/10/MR1-UB2026-3-MR-on-the-May-2028-Elections-Final.pdf']] },
  { a: 'sara', b: 'risa', pollster: 'Pulse Asia', start: '2026-06-28', end: '2026-07-06', n: 2400, moe: 2, sponsor: null, va: 60, vb: 21, undec: 19,
    src: [['Pulse Asia (PDF)', 'https://pulseasia.ph/wp-content/uploads/2026/07/MR2-UB2026-2-MR-on-the-May-2028-Elections-Final.pdf']] },
  { a: 'sara', b: 'tulfo', pollster: 'Pulse Asia', start: '2026-02-27', end: '2026-03-02', n: 1200, moe: 2.8, sponsor: "Office of Sen. Zubiri", va: 46, vb: 46, undec: 7,
    src: [['PhilSTAR Life', 'https://philstarlife.com/news-and-views/630186-sara-duterte-raffy-tulfo-tie-pulse-asia-survey']] },
];

// ── Key dates (sourced) ──────────────────────────────────────
const EL_TIMELINE = [
  { date: '2026-02-18', text: 'Sara Duterte announces her presidential bid.', src: 'https://www.arabnews.com/node/2633452/world' },
  { date: '2026-04-21', text: 'Leni Robredo rules out a national run in 2028.', src: 'https://plus.inquirer.net/news/leni-rules-out-natl-run-in-28/' },
  { date: '2026-05-05', text: 'Raffy Tulfo rules out a presidential or VP run.', src: 'https://www.gmanetwork.com/news_duplicate/balitambayan/balita/986540/raffy-tulfo-walang-balak-tumakbong-pangulo-sa-2028-polls-na-puwede-niyang-makalaban-si-sara-duter/story/' },
  { date: '2026-09-23', text: 'Impeachment court sets 14 of 20 eligible senators as the votes needed to convict.', src: 'https://www.illawarramercury.com.au/story/9356262/philippine-senate-lowers-votes-to-convict-vp-duterte/' },
  { date: '2027-10-01', text: 'Filing of certificates of candidacy (Oct 1–8, 2027). The field becomes official.', src: 'https://en.wikipedia.org/wiki/2028_Philippine_presidential_election', future: true },
  { date: '2028-05-08', text: 'Election day.', src: 'https://en.wikipedia.org/wiki/2028_Philippine_presidential_election', future: true },
];

/* ============================================================
   Computation
   ============================================================ */
const EL = (() => {
  const DAY = 864e5;
  const HALF_LIFE = 90;      // days: a poll's weight halves every 90 days
  const WINDOW = 365;        // days: only polls this recent count toward the average
  const asOf = Date.parse(EL_AS_OF);
  const mid = p => (Date.parse(p.start) + Date.parse(p.end)) / 2;
  const ageDays = p => (asOf - mid(p)) / DAY;

  const recencyW = p => Math.pow(0.5, ageDays(p) / HALF_LIFE);
  const sampleW = p => Math.sqrt((p.n || 1200) / 1200);
  const weight = p => recencyW(p) * sampleW(p);

  function inAverage(p) {
    if (p.include === false) return { ok: false, why: p.exclude };
    if (ageDays(p) > WINDOW) return { ok: false, why: 'Older than 12 months; shown for history only.' };
    return { ok: true };
  }
  const used = EL_POLLS.filter(p => inAverage(p).ok);
  const totalW = used.reduce((s, p) => s + weight(p), 0);

  // Weighted average per candidate, over the polls that included them
  function average(key, polls = used) {
    const rows = polls.filter(p => p.r[key] != null);
    if (!rows.length) return null;
    const w = rows.reduce((s, p) => s + weight(p), 0);
    const v = rows.reduce((s, p) => s + weight(p) * p.r[key], 0) / w;
    const vals = rows.map(p => p.r[key]);
    return {
      key, avg: v, polls: rows.length, of: polls.length,
      min: Math.min(...vals), max: Math.max(...vals),
      parts: rows.map(p => ({ p, v: p.r[key], share: weight(p) / w })),
    };
  }
  const undecAvg = (() => {
    const rows = used.filter(p => p.undec != null);
    const w = rows.reduce((s, p) => s + weight(p), 0);
    return rows.reduce((s, p) => s + weight(p) * p.undec, 0) / w;
  })();

  const ranked = Object.keys(EL_CANDS).map(k => average(k)).filter(Boolean)
    .filter(a => a.polls >= 2)           // a name asked in only one survey has no average yet
    .sort((a, b) => b.avg - a.avg);
  const single = Object.keys(EL_CANDS).map(k => average(k)).filter(a => a && a.polls === 1);

  // Normal CDF (Abramowitz-Stegun erf)
  function phi(z) {
    const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z / 2);
    return 0.5 * (1 + (z < 0 ? -y : y));
  }

  // Confidence that X is truly ahead of Y, pooling polls that asked about both.
  // Each poll's lead has sampling error from its sample size; polls also disagree
  // with each other (different methods/lists). We take whichever error is larger.
  function leadConfidence(getPair, polls) {
    const rows = polls.map(p => ({ p, ...getPair(p) })).filter(r => r.x != null && r.y != null);
    if (rows.length < 2) return null;
    const ws = rows.map(r => weight(r.p));
    const W = ws.reduce((a, b) => a + b, 0), W2 = ws.reduce((a, b) => a + b * b, 0);
    const d = rows.map(r => r.x - r.y);
    const D = d.reduce((s, x, i) => s + ws[i] * x, 0) / W;
    const se = rows.map(r => { const a = r.x / 100, b = r.y / 100; return 100 * Math.sqrt((a + b - (a - b) ** 2) / (r.p.n || 1200)); });
    const seSampling = Math.sqrt(rows.reduce((s, r, i) => s + ws[i] ** 2 * se[i] ** 2, 0)) / W;
    const seBetween = Math.sqrt(rows.reduce((s, r, i) => s + ws[i] ** 2 * (d[i] - D) ** 2, 0)) / W * Math.sqrt(rows.length / Math.max(rows.length - 1, 1));
    const SE = Math.max(seSampling, seBetween);
    const perPoll = rows.map((r, i) => ({ p: r.p, lead: d[i], z: d[i] / se[i], clear: Math.abs(d[i]) > 1.96 * se[i] }));
    return { lead: D, se: SE, lo: D - 1.96 * SE, hi: D + 1.96 * SE, conf: phi(D / SE), n: rows.length, perPoll, seSampling, seBetween };
  }

  const top = ranked[0], second = ranked[1];
  const listLead = top && second ? leadConfidence(p => ({ x: p.r[top.key], y: p.r[second.key] }), used) : null;

  function h2hSummary(a, b) {
    const rows = EL_H2H.filter(h => h.a === a && h.b === b && (asOf - Date.parse(h.end)) / DAY <= WINDOW);
    if (!rows.length) return null;
    const w = rows.map(h => Math.pow(0.5, ((asOf - (Date.parse(h.start) + Date.parse(h.end)) / 2) / DAY) / HALF_LIFE) * Math.sqrt(h.n / 1200));
    const W = w.reduce((s, x) => s + x, 0);
    const va = rows.reduce((s, h, i) => s + w[i] * h.va, 0) / W, vb = rows.reduce((s, h, i) => s + w[i] * h.vb, 0) / W;
    const asPoll = rows.map(h => ({ ...h, r: { [a]: h.va, [b]: h.vb } }));
    const lc = leadConfidence(p => ({ x: p.va, y: p.vb }), asPoll);
    return { a, b, rows, va, vb, lc };
  }

  return { weight, recencyW, sampleW, inAverage, used, totalW, average, ranked, single, undecAvg, listLead, h2hSummary, phi, ageDays, HALF_LIFE, WINDOW };
})();

/* ============================================================
   Rendering
   ============================================================ */
(function () {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fmtD = (s, o = { month: 'short', day: 'numeric', year: 'numeric' }) => new Date(s + 'T00:00:00').toLocaleDateString('en-PH', o);
  const range = p => {
    const a = new Date(p.start + 'T00:00:00'), b = new Date(p.end + 'T00:00:00');
    const sameM = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    return sameM ? `${a.toLocaleDateString('en-PH', { month: 'short' })} ${a.getDate()}–${b.getDate()}, ${b.getFullYear()}`
      : `${a.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} – ${b.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };
  const pct = (v, d = 1) => v == null ? '—' : (Math.round(v * 10 ** d) / 10 ** d).toFixed(d).replace(/\.0$/, '') + '%';
  const pts = v => Math.abs(v) < 0.05 ? '0.0' : (v > 0 ? '+' : '−') + Math.abs(v).toFixed(1);
  const C = k => EL_CANDS[k];
  const STATUS = { declared: ['Declared', 'st-dec'], out: ['Ruled out', 'st-out'], undeclared: ['Not declared', 'st-und'] };
  const links = src => (src || []).map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join(' · ');

  // ── Styles (uses FactsPH tokens from index.html) ──
  const css = `
  #el-panel{display:none;position:fixed;inset:0;background:var(--bg);z-index:150;overflow-y:auto;-webkit-overflow-scrolling:touch}
  #el-panel .el-wrap{max-width:430px;margin:0 auto;padding:0 0 120px}
  .el-head{position:sticky;top:0;z-index:5;background:rgba(245,240,232,.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:14px 16px 0;padding-top:max(14px,env(safe-area-inset-top))}
  .el-top{display:flex;align-items:flex-start;justify-content:space-between}
  .el-title{font-family:'Libre Baskerville',serif;font-size:calc(22px*var(--ts,1));font-weight:700;letter-spacing:-.2px}
  .el-title em{font-style:italic;font-weight:400;color:var(--gold)}
  .el-sub{font-size:calc(13px*var(--ts,1));color:var(--muted);font-style:italic;margin-top:2px}
  .el-x{background:none;border:none;font-size:calc(23px*var(--ts,1));cursor:pointer;color:var(--muted);padding:0 4px;line-height:1}
  .el-tabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:12px 0 10px}
  .el-tabs::-webkit-scrollbar{display:none}
  .el-tab{flex-shrink:0;min-height:40px;padding:6px 14px;border-radius:4px;font-size:calc(14px*var(--ts,1));font-weight:500;border:1px solid var(--border2);background:transparent;color:var(--muted);font-family:'IBM Plex Sans',sans-serif;cursor:pointer}
  .el-tab.on{background:var(--gold);border-color:var(--gold);color:#fffdf8;font-weight:600}
  .el-body{padding:14px 12px 0}
  .el-card{background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .el-lbl{font-size:calc(12px*var(--ts,1));font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
  .el-h{font-family:'Libre Baskerville',serif;font-size:calc(18px*var(--ts,1));font-weight:700;line-height:1.35;margin-bottom:6px}
  .el-p{font-size:calc(15px*var(--ts,1));line-height:1.65;color:var(--muted2)}
  .el-p+.el-p{margin-top:8px}
  .el-p a,.el-src a{color:var(--gold);text-decoration:none}
  .el-note{font-size:calc(13px*var(--ts,1));line-height:1.6;color:var(--muted2);padding:10px 12px;background:var(--gold-dim);border-radius:8px;border-left:3px solid var(--gold);margin-bottom:10px}
  .el-row{padding:11px 0;border-bottom:1px solid var(--border);cursor:pointer}
  .el-row:last-child{border-bottom:none}
  .el-rtop{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:6px}
  .el-name{font-size:calc(16px*var(--ts,1));font-weight:600;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
  .el-sw{width:9px;height:9px;border-radius:50%;flex-shrink:0;display:inline-block}
  .el-num{font-family:'Libre Baskerville',serif;font-size:calc(22px*var(--ts,1));font-weight:700;white-space:nowrap}
  .el-bar{height:7px;background:var(--s3);border-radius:4px;position:relative;overflow:visible}
  .el-fill{height:100%;border-radius:4px}
  .el-rng{position:absolute;top:-3px;height:13px;border-left:1.5px solid var(--muted);border-right:1.5px solid var(--muted);opacity:.55}
  .el-meta{font-size:calc(13px*var(--ts,1));color:var(--muted);margin-top:6px;display:flex;justify-content:space-between;gap:8px}
  .el-st{font-size:calc(12px*var(--ts,1));font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:2px 6px;border-radius:3px}
  .st-dec{background:var(--gold-dim);color:var(--gold)}
  .st-out{background:rgba(176,48,48,.08);color:var(--red)}
  .st-und{background:var(--s2);color:var(--muted)}
  .el-parts{display:none;margin-top:10px;padding:10px;background:var(--s2);border-radius:8px}
  .el-row.open .el-parts{display:block}
  .el-part{display:grid;grid-template-columns:1fr 46px 52px;gap:6px;font-size:calc(13px*var(--ts,1));padding:4px 0;color:var(--muted2);align-items:center}
  .el-part b{font-weight:600;color:var(--text)}
  .el-wbar{height:4px;background:var(--gold);border-radius:2px;opacity:.6}
  .el-stat{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
  .el-stat div{background:var(--s2);border-radius:8px;padding:10px}
  .el-stat b{display:block;font-family:'Libre Baskerville',serif;font-size:calc(20px*var(--ts,1))}
  .el-stat span{font-size:calc(12px*var(--ts,1));color:var(--muted);letter-spacing:.04em}
  .el-poll{background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:13px 14px;margin-bottom:10px}
  .el-poll.out{opacity:.72}
  .el-ptop{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
  .el-pname{font-weight:700;font-size:calc(16px*var(--ts,1))}
  .el-pdate{font-size:calc(13px*var(--ts,1));color:var(--muted)}
  .el-disc{display:flex;flex-wrap:wrap;gap:4px 10px;font-size:calc(12px*var(--ts,1));color:var(--muted2);margin:6px 0 10px}
  .el-disc .miss{color:var(--red)}
  .el-mini{display:grid;grid-template-columns:96px 1fr 40px;gap:6px;align-items:center;font-size:calc(13px*var(--ts,1));margin-bottom:4px}
  .el-mini .el-bar{height:6px}
  .el-flag{font-size:calc(13px*var(--ts,1));color:var(--muted2);margin-top:6px;padding-left:10px;border-left:2px solid var(--border2);line-height:1.5}
  .el-inc{font-size:calc(12px*var(--ts,1));font-weight:600;letter-spacing:.05em;margin-top:8px}
  .el-inc.y{color:var(--green)}.el-inc.n{color:var(--red)}
  .el-src{font-size:calc(13px*var(--ts,1));margin-top:6px}
  .el-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
  .el-chip{display:inline-flex;align-items:center;gap:5px;font-size:calc(13px*var(--ts,1));padding:4px 9px;border-radius:20px;border:1px solid var(--border2);background:var(--s1);cursor:pointer;font-family:'IBM Plex Sans',sans-serif;color:var(--text)}
  .el-chip.off{opacity:.35}
  .el-h2h{margin:10px 0 4px;height:26px;display:flex;border-radius:6px;overflow:hidden;font-size:calc(13px*var(--ts,1));font-weight:700;color:#fff}
  .el-h2h div{display:flex;align-items:center;padding:0 8px;white-space:nowrap}
  .el-h2h .u{background:var(--s3);color:var(--muted2);justify-content:center}
  .el-tl{position:relative;padding-left:16px}
  .el-tl:before{content:'';position:absolute;left:4px;top:4px;bottom:4px;width:1px;background:var(--border2)}
  .el-tli{position:relative;padding:0 0 12px}
  .el-tli:before{content:'';position:absolute;left:-15px;top:4px;width:9px;height:9px;border-radius:50%;background:var(--gold)}
  .el-tli.f:before{background:var(--s1);border:1.5px solid var(--gold);width:6px;height:6px}
  .el-tli small{display:block;font-size:calc(12px*var(--ts,1));font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
  .el-tli span{font-size:calc(15px*var(--ts,1));line-height:1.5}
  .el-tli a{color:var(--gold);text-decoration:none;font-size:calc(13px*var(--ts,1))}
  .el-strip{position:relative;height:30px;margin:4px 0 2px}
  .el-strip .ax{position:absolute;left:0;right:0;top:14px;height:1px;background:var(--border2)}
  .el-strip .dot{position:absolute;top:8px;width:13px;height:13px;margin-left:-6.5px;border-radius:50%;border:2px solid var(--s1)}
  .el-strip .avg{position:absolute;top:3px;height:23px;width:2px;margin-left:-1px;background:var(--text)}
  .el-hs{display:grid;grid-template-columns:1fr 50px 50px 50px;gap:4px;font-size:calc(13px*var(--ts,1));padding:6px 0;border-bottom:1px solid var(--border)}
  .el-hs.h{font-size:calc(12px*var(--ts,1));font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  .el-hs span:not(:first-child){text-align:right}
  .el-formula{font-family:ui-monospace,Menlo,monospace;font-size:calc(13px*var(--ts,1));background:var(--s2);padding:8px 10px;border-radius:6px;margin:8px 0;color:var(--text);overflow-x:auto}
  svg.el-chart text{font-family:'IBM Plex Sans',sans-serif;font-size:calc(12px*var(--ts,1));fill:var(--muted)}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.id = 'el-panel';
  panel.innerHTML = `<div class="el-wrap">
    <div class="el-head">
      <div class="el-top">
        <div><div class="el-title">2028 <em>Race</em></div>
        <div class="el-sub">Presidential surveys, pooled and explained · data as of ${fmtD(EL_AS_OF)}</div></div>
        <button class="el-x" aria-label="Close" onclick="showView('brief')">✕</button>
      </div>
      <div class="el-tabs" id="el-tabs"></div>
    </div>
    <div class="el-body" id="el-body"></div>
  </div>`;
  document.body.appendChild(panel);

  const TABS = [['overview', 'Overview'], ['h2h', 'Head-to-head'], ['polls', 'All surveys'], ['trend', 'Trend'], ['pollsters', 'Pollsters'], ['method', 'Method']];
  let cur = 'overview';
  const hidden = new Set();

  function tabs() {
    $('#el-tabs').innerHTML = TABS.map(([k, l]) => `<button class="el-tab${k === cur ? ' on' : ''}" onclick="FactsElections.go('${k}')">${l}</button>`).join('');
  }

  // ── Overview ──
  function overview() {
    const r = EL.ranked, top = r[0], lc = EL.listLead;
    const outs = r.slice(1, 3).filter(a => C(a.key).status === 'out').map(a => C(a.key).name);
    const max = Math.max(...r.map(a => a.max), 1);
    const rows = r.map((a, i) => {
      const c = C(a.key), [sl, sc] = STATUS[c.status];
      const parts = a.parts.sort((x, y) => y.share - x.share).map(({ p, v, share }) =>
        `<div class="el-part"><span><b>${esc(p.pollster)}</b> · ${range(p)}</span><span style="text-align:right">${pct(v)}</span><span><div class="el-wbar" style="width:${Math.max(4, share * 100)}%"></div><div style="font-size:calc(12px*var(--ts,1));color:var(--muted)">${Math.round(share * 100)}% wt</div></span></div>`).join('');
      return `<div class="el-row" onclick="this.classList.toggle('open')">
        <div class="el-rtop"><div class="el-name"><span class="el-sw" style="background:${c.color}"></span>${esc(c.name)} <span class="el-st ${sc}">${sl}</span></div>
        <div class="el-num">${pct(a.avg)}</div></div>
        <div class="el-bar"><div class="el-fill" style="width:${a.avg / max * 100}%;background:${c.color}"></div>
          ${a.polls > 1 ? `<div class="el-rng" style="left:${a.min / max * 100}%;width:${(a.max - a.min) / max * 100}%"></div>` : ''}</div>
        <div class="el-meta"><span>Range ${pct(a.min)}–${pct(a.max)}</span><span>in ${a.polls} of ${a.of} surveys · tap for breakdown</span></div>
        ${c.note ? `<div class="el-flag" style="margin-top:8px">${esc(c.note)} <span class="el-src">${links(c.src)}</span></div>` : ''}
        <div class="el-parts"><div class="el-lbl" style="margin-bottom:6px">Where ${pct(a.avg)} comes from</div>${parts}</div>
      </div>`;
    }).join('');

    const conf = lc ? (lc.conf > .99 ? 'over 99%' : Math.round(lc.conf * 100) + '%') : '—';
    const h = EL.h2hSummary('sara', 'leni');
    return `
      <div class="el-card">
        <div class="el-lbl">The picture right now</div>
        <div class="el-h">${esc(C(top.key).name)} leads the poll average by ${lc ? lc.lead.toFixed(1) : '—'} points.</div>
        <p class="el-p">${outs.length ? `But the next ${outs.length === 2 ? 'two names' : 'name'} in the surveys, ${outs.join(' and ')}, ${outs.length === 2 ? 'have both' : 'has'} publicly ruled out running. Pollsters keep asking about them, so their numbers measure goodwill more than a real race.` : ''}
        The field becomes official only when candidates file in October 2027.</p>
        <div class="el-stat">
          <div><b>${EL.used.length}</b><span>surveys in the average (last 12 months)</span></div>
          <div><b>${pct(EL.undecAvg)}</b><span>average undecided / none</span></div>
          <div><b>${conf}</b><span>confidence the leader is truly ahead today</span></div>
          <div><b>${h ? pct(h.va, 0) + '–' + pct(h.vb, 0) : '—'}</b><span>Duterte vs Robredo, head-to-head avg</span></div>
        </div>
      </div>
      <div class="el-card"><div class="el-lbl">Weighted polling average · list questions</div>${rows}
        ${EL.single.length ? `<div class="el-meta" style="margin-top:10px;display:block">Asked about in only one survey, so not averaged: ${EL.single.map(a => `${esc(C(a.key).name)} ${pct(a.avg)} (${esc(a.parts[0].p.pollster)}, ${fmtD(a.parts[0].p.end, { month: 'short', year: 'numeric' })})`).join('; ')}.</div>` : ''}</div>
      <div class="el-note">This is a snapshot of preferences ${Math.round((Date.parse('2028-05-08') - Date.parse(EL_AS_OF)) / 864e5 / 30.4)} months before election day, not a forecast. In mid-2015, Grace Poe led most surveys for the 2016 race; Rodrigo Duterte, who hadn't declared yet, won.</div>
      <div class="el-card"><div class="el-lbl">Key dates</div><div class="el-tl">${EL_TIMELINE.map(t =>
        `<div class="el-tli${t.future ? ' f' : ''}"><small>${fmtD(t.date)}</small><span>${esc(t.text)}</span> <a href="${esc(t.src)}" target="_blank" rel="noopener">source ↗</a></div>`).join('')}</div></div>`;
  }

  // ── Head-to-head ──
  function h2h() {
    const pairs = [['sara', 'leni'], ['sara', 'risa'], ['sara', 'tulfo']];
    return `<div class="el-note">Head-to-head questions ask voters to pick between just two names. They show how support might consolidate if the race narrows, which a 10-name list can't.</div>` +
      pairs.map(([a, b]) => {
        const s = EL.h2hSummary(a, b); if (!s) return '';
        const A = C(a), B = C(b), lc = s.lc;
        const und = Math.max(0, 100 - s.va - s.vb);
        const rows = s.rows.map(hh => {
          const se = 100 * Math.sqrt(((hh.va + hh.vb) / 100 - ((hh.va - hh.vb) / 100) ** 2) / hh.n);
          const clear = Math.abs(hh.va - hh.vb) > 1.96 * se;
          return `<div class="el-hs"><span><b>${esc(hh.pollster)}</b> · ${range(hh)}${hh.sponsor ? `<br><span style="color:var(--red);font-size:calc(12px*var(--ts,1))">Commissioned: ${esc(hh.sponsor)}</span>` : ''}<br><span class="el-src">${links(hh.src)}</span></span>
            <span>${hh.va}</span><span>${hh.vb}</span><span style="color:${clear ? 'var(--text)' : 'var(--red)'}">${hh.va === hh.vb ? 'tie' : pts(hh.va - hh.vb)}${clear ? '' : '*'}</span></div>`;
        }).join('');
        return `<div class="el-card">
          <div class="el-lbl">${esc(A.name)} vs ${esc(B.name)} · ${s.rows.length} survey${s.rows.length > 1 ? 's' : ''}</div>
          <div class="el-h2h"><div style="width:${s.va}%;background:${A.color}">${pct(s.va, 0)}</div><div class="u" style="width:${und}%">${und >= 6 ? pct(und, 0) : ''}</div><div style="width:${s.vb}%;background:${B.color};justify-content:flex-end">${pct(s.vb, 0)}</div></div>
          <div class="el-meta" style="margin:0 0 8px"><span>${esc(A.name)}</span><span>undecided</span><span>${esc(B.name)}</span></div>
          ${lc ? `<p class="el-p">Average lead <b>${pts(lc.lead)}</b> points, plausible range ${pts(lc.lo)} to ${pts(lc.hi)}. Confidence ${esc(A.name.split(' ')[1] || A.name)} is ahead in this match-up today: <b>${lc.conf > .99 ? 'over 99%' : Math.round(lc.conf * 100) + '%'}</b>.</p>`
          : `<p class="el-p">Only one survey has asked this match-up, so there's no average yet.</p>`}
          ${B.status === 'out' ? `<div class="el-flag">${esc(B.name)} has ruled out running; this match-up is hypothetical.</div>` : ''}
          <div style="margin-top:10px"><div class="el-hs h"><span>Survey</span><span>${esc(A.name.split(' ').pop())}</span><span>${esc(B.name.split(' ').pop())}</span><span>Lead</span></div>${rows}</div>
          ${s.rows.some(hh => Math.abs(hh.va - hh.vb) <= 1.96 * 100 * Math.sqrt(((hh.va + hh.vb) / 100 - ((hh.va - hh.vb) / 100) ** 2) / hh.n)) ? '<div class="el-meta">* within that survey\'s margin of error: a statistical tie</div>' : ''}
        </div>`;
      }).join('');
  }

  // ── All surveys ──
  function polls() {
    return `<div class="el-note">The Fair Election Act (RA 9006) requires published election surveys to disclose who commissioned and conducted them, when, how, how many people were asked, and the margin of error. Every card below shows those fields; anything a survey didn't report is marked in red.</div>` +
      EL_POLLS.map(p => {
        const inc = EL.inAverage(p);
        const share = inc.ok ? EL.weight(p) / EL.totalW : 0;
        const res = Object.entries(p.r).sort((a, b) => b[1] - a[1]).map(([k, v]) => {
          const c = C(k);
          return `<div class="el-mini"><span>${esc(c ? c.name : k)}</span><div class="el-bar"><div class="el-fill" style="width:${v / 60 * 100}%;background:${c ? c.color : 'var(--muted)'}"></div></div><span style="text-align:right;font-weight:600">${pct(v)}</span></div>`;
        }).join('');
        const miss = t => `<span class="miss">${t}: not reported</span>`;
        return `<div class="el-poll${inc.ok ? '' : ' out'}">
          <div class="el-ptop"><span class="el-pname">${esc(p.pollster)}</span><span class="el-pdate">${range(p)}</span></div>
          <div class="el-disc">
            ${p.n ? `<span>n = ${p.n.toLocaleString()}</span>` : miss('Sample')}
            ${p.moe ? `<span>±${p.moe} pts</span>` : miss('Margin of error')}
            ${p.method && p.method !== 'Not stated' ? `<span>${esc(p.method)}</span>` : miss('Method')}
            ${p.sponsor ? `<span style="color:var(--red);font-weight:600">Commissioned: ${esc(p.sponsor)}</span>` : p.indep ? '<span>Not commissioned</span>' : miss('Sponsor')}
            ${p.released ? `<span>Released ${fmtD(p.released, { month: 'short', day: 'numeric' })}</span>` : ''}
          </div>
          ${res}
          ${p.other ? `<div class="el-meta" style="margin-top:2px"><span>Others: ${esc(p.other)}</span></div>` : ''}
          <div class="el-meta" style="margin-top:2px"><span>Undecided / none: ${p.undec == null ? 'not reported' : pct(p.undec)}</span><span>${esc(p.q || '')}</span></div>
          ${(p.flags || []).map(f => `<div class="el-flag">⚠ ${esc(f)}</div>`).join('')}
          <div class="el-inc ${inc.ok ? 'y' : 'n'}">${inc.ok ? `✓ In the average · ${Math.round(share * 100)}% of total weight` : `✕ Not in the average · ${esc(inc.why)}`}</div>
          <div class="el-src">${links(p.src)}</div>
        </div>`;
      }).join('');
  }

  // ── Trend chart ──
  function trend() {
    const keys = ['sara', 'leni', 'tulfo'];
    const pts_ = EL_POLLS.filter(p => p.include !== false);
    const t0 = Date.parse('2023-03-01'), t1 = Date.parse(EL_AS_OF) + 20 * 864e5;
    const W = 360, H = 230, L = 26, R = 8, T = 10, B = 22;
    const x = t => L + (t - t0) / (t1 - t0) * (W - L - R), y = v => T + (1 - v / 60) * (H - T - B);
    const mid = p => (Date.parse(p.start) + Date.parse(p.end)) / 2;
    let g = '';
    [0, 10, 20, 30, 40, 50, 60].forEach(v => g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--border)" stroke-width="${v ? .6 : 1}"/><text x="${L - 4}" y="${y(v) + 3}" text-anchor="end">${v}</text>`);
    ['2024', '2025', '2026'].forEach(yr => { const t = Date.parse(yr + '-01-01'); g += `<line x1="${x(t)}" x2="${x(t)}" y1="${T}" y2="${H - B}" stroke="var(--border)" stroke-width=".6" stroke-dasharray="2 3"/><text x="${x(t)}" y="${H - 8}" text-anchor="middle">${yr}</text>`; });
    keys.filter(k => !hidden.has(k)).forEach(k => {
      const c = C(k), ps = pts_.filter(p => p.r[k] != null);
      // Smoothed poll-of-polls: Gaussian kernel (σ = 75 days) weighted by sample size
      const line = [];
      for (let t = t0; t <= t1; t += 14 * 864e5) {
        let sw = 0, sv = 0;
        ps.forEach(p => { const d = (t - mid(p)) / 864e5; const w = Math.exp(-d * d / (2 * 75 * 75)) * Math.sqrt(p.n / 1200); sw += w; sv += w * p.r[k]; });
        line.push(sw > .25 ? [t, sv / sw] : null);
      }
      let path = '', pen = false;
      line.forEach(pt => { if (!pt) { pen = false; return; } path += (pen ? 'L' : 'M') + x(pt[0]).toFixed(1) + ',' + y(pt[1]).toFixed(1); pen = true; });
      g += `<path d="${path}" fill="none" stroke="${c.color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`;
      ps.forEach(p => g += `<circle cx="${x(mid(p)).toFixed(1)}" cy="${y(p.r[k]).toFixed(1)}" r="3.2" fill="${c.color}" fill-opacity=".35" stroke="${c.color}" stroke-width="1"><title>${esc(c.name)} ${p.r[k]}% · ${esc(p.pollster)} · ${range(p)}</title></circle>`);
    });
    const chips = keys.map(k => `<button class="el-chip${hidden.has(k) ? ' off' : ''}" onclick="FactsElections.toggle('${k}')"><span class="el-sw" style="background:${C(k).color}"></span>${esc(C(k).name)}</button>`).join('');
    return `<div class="el-card"><div class="el-lbl">Support over time · list questions, 2023–2026</div>
      <div class="el-chips">${chips}</div>
      <svg class="el-chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Poll trend chart">${g}</svg>
      <p class="el-p" style="margin-top:6px">Each dot is one survey. The line is a smoothed average of nearby surveys, weighted by sample size. Gaps mean no survey asked about that name, not zero support.</p></div>
      <div class="el-card"><div class="el-lbl">What changed</div>
      <p class="el-p">In 2024, Raffy Tulfo twice matched or edged Sara Duterte (Pulse Asia, March: 35% vs 34%; WR Numero, September: tied at 24%). Since 2025 Duterte has led every survey, and Robredo has overtaken Tulfo for second in most 2026 rounds.</p>
      <p class="el-p">Duterte's numbers also depend heavily on the list: 33% on OCTA's 26-name list vs 50% on Pulse Asia's shorter list in September 2026.</p></div>`;
  }

  // ── Pollsters / divergence ──
  function pollsters() {
    const keys = ['sara', 'leni', 'tulfo'];
    const PC = { 'Pulse Asia': '#1a5eb8', 'WR Numero': '#c26a1f', 'OCTA Research': '#2a7a48', 'Tangere': '#b03070', 'Momentum Research': '#6040a0' };
    const ps = EL.used;
    const strips = keys.map(k => {
      const a = EL.average(k); if (!a) return '';
      const dots = a.parts.map(({ p, v }) => `<div class="dot" style="left:${v / 60 * 100}%;background:${PC[p.pollster] || 'var(--muted)'}" title="${esc(p.pollster)} ${v}%"></div>`).join('');
      return `<div style="margin-bottom:12px"><div class="el-rtop" style="margin-bottom:0"><span class="el-name"><span class="el-sw" style="background:${C(k).color}"></span>${esc(C(k).name)}</span><span style="font-size:calc(13px*var(--ts,1));color:var(--muted)">spread ${(a.max - a.min).toFixed(1)} pts</span></div>
        <div class="el-strip"><div class="ax"></div><div class="avg" style="left:${a.avg / 60 * 100}%"></div>${dots}</div>
        <div class="el-meta" style="margin-top:0"><span>0%</span><span>avg ${pct(a.avg)}</span><span>60%</span></div></div>`;
    }).join('');
    const legend = Object.entries(PC).filter(([n]) => ps.some(p => p.pollster === n)).map(([n, c]) => `<span class="el-chip" style="cursor:default"><span class="el-sw" style="background:${c}"></span>${n}</span>`).join('');

    // House effect: each pollster's average gap from the overall average
    const avgs = Object.fromEntries(keys.map(k => [k, EL.average(k)?.avg]));
    const names = [...new Set(ps.map(p => p.pollster))];
    const house = names.map(n => {
      const mine = ps.filter(p => p.pollster === n);
      const dev = k => { const v = mine.filter(p => p.r[k] != null).map(p => p.r[k] - avgs[k]); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
      return `<div class="el-hs"><span><b>${esc(n)}</b> · ${mine.length} survey${mine.length > 1 ? 's' : ''}</span>${keys.map(k => { const d = dev(k); return `<span>${d == null ? '—' : pts(d)}</span>`; }).join('')}</div>`;
    }).join('');

    return `<div class="el-card"><div class="el-lbl">How far apart the pollsters are</div>
      <div class="el-chips">${legend}</div>${strips}
      <p class="el-p">Black tick = weighted average. A wide spread means the method matters as much as the voters.</p></div>
      <div class="el-card"><div class="el-lbl">House effects · vs the average, in points</div>
      <div class="el-hs h"><span>Pollster</span><span>Duterte</span><span>Robredo</span><span>Tulfo</span></div>${house}
      <p class="el-p" style="margin-top:8px">A consistent plus or minus suggests the pollster's method leans that way. With one or two surveys per firm, treat these as hints, not verdicts.</p></div>
      <div class="el-card"><div class="el-lbl">Why the numbers differ</div>
      <p class="el-p"><b>How many names are on the list.</b> OCTA's March 2026 list had 26 names and 20% went to "others". Shorter lists concentrate support on the front-runners.</p>
      <p class="el-p"><b>How undecided voters are handled.</b> Undecided ranged from 3% (OCTA) to 19% (WR Numero) in 2026. Pushing respondents to choose raises everyone's numbers.</p>
      <p class="el-p"><b>Face-to-face vs mobile app.</b> Pulse Asia, OCTA and Momentum interview in person, as did WR Numero in March 2026. Tangere uses a mobile app, which reaches people with smartphones and data and can miss older and rural voters.</p>
      <p class="el-p"><b>Who paid.</b> Commissioned surveys are flagged in red. The pollster still runs the fieldwork, but the sponsor often picks which match-ups get asked and when results are released.</p></div>`;
  }

  // ── Method ──
  function method() {
    const lc = EL.listLead;
    return `<div class="el-card"><div class="el-lbl">How the average works</div>
      <p class="el-p">We pool every list-style presidential survey from the last 12 months. Each survey gets a weight:</p>
      <div class="el-formula">weight = 0.5^(age in days ÷ ${EL.HALF_LIFE}) × √(sample size ÷ 1,200)</div>
      <p class="el-p">So a survey loses half its weight every ${EL.HALF_LIFE} days, and a 2,400-person survey counts about 1.4× a 1,200-person one. Each candidate's average uses only the surveys that included them. Tap any candidate on the Overview tab to see every survey's share of the weight.</p>
      <p class="el-p">We don't adjust for pollster "quality" or lean. Every survey's raw numbers are shown, and the Pollsters tab shows how far each firm sits from the average so you can judge for yourself.</p></div>
      <div class="el-card"><div class="el-lbl">How "confidence the leader is ahead" works</div>
      <p class="el-p">For every survey that asked about both of the top two, we take the gap between them and its sampling error. We then pool the gaps with the same weights. Two sources of error are measured: sampling error inside each survey, and disagreement between surveys. We use whichever is larger.</p>
      ${lc ? `<div class="el-formula">lead ${lc.lead.toFixed(1)} pts · sampling SE ${lc.seSampling.toFixed(2)} · between-survey SE ${lc.seBetween.toFixed(2)}<br>confidence = Φ(lead ÷ SE) = ${(lc.conf * 100).toFixed(lc.conf > .999 ? 2 : 1)}%</div>` : ''}
      <p class="el-p">This answers "is the leader really ahead in today's surveys?" It is not a chance of winning in May 2028: it can't account for who actually files, the impeachment outcome, alliances, or how 19 months of campaigning moves voters.</p></div>
      <div class="el-card"><div class="el-lbl">What gets included</div>
      <p class="el-p">Published surveys from named firms with a fieldwork date and sample size. Commissioned surveys are included and flagged. A survey stays out of the average if it left out a front-runner, if its figures can't be confirmed, or if it's over a year old. Excluded surveys still appear on the All surveys tab, with the reason.</p>
      <p class="el-p">Not included: online "polls" anyone can vote in, social media engagement counts, and unsourced survey images (Rappler has fact-checked AI-generated ones).</p></div>
      <div class="el-card"><div class="el-lbl">Corrections</div>
      <p class="el-p">Where sources disagree, the conflict is noted on that survey's card along with the figure we used. Spotted an error or a survey we missed? Email <a href="mailto:hello@factsph.app?subject=2028%20polls%20correction">hello@factsph.app</a>.</p></div>`;
  }

  const VIEWS = { overview, h2h, polls, trend, pollsters, method };
  function render() { tabs(); $('#el-body').innerHTML = VIEWS[cur](); }

  window.FactsElections = {
    open() { panel.style.display = 'block'; render(); panel.scrollTop = 0; if (location.hash !== '#2028') history.replaceState(null, '', '#2028'); },
    close() { panel.style.display = 'none'; if (location.hash === '#2028') history.replaceState(null, '', location.pathname); },
    go(k) { cur = k; render(); panel.scrollTop = 0; },
    toggle(k) { hidden.has(k) ? hidden.delete(k) : hidden.add(k); render(); },
  };
  if (location.hash === '#2028' && typeof showView === 'function') showView('elections');
})();
