/* ============================================================
   FactsPH · 2028 Elections section
   ------------------------------------------------------------
   To add a new survey: copy one block in POLLS (or H2H for
   head-to-head match-ups), fill in every field, commit.
   Everything else (averages, charts, confidence) recomputes.
   Rules: only numbers you saw in a source; put every source
   link in `src`; anything odd goes in `flags`.
   `added` = the date the survey was added to FactsPH. The app uses it
   to show "New survey" alerts; if left out, `released` is used.
   ============================================================ */

const EL_AS_OF = '2026-11-12'; // date the data below was last checked

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
  tulfo: { name: 'Raffy Tulfo',     color: '#0f9488', status: 'out',
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
  { pollster: 'WR Numero', start: '2026-10-07', end: '2026-10-13', released: '2026-11-04',
    n: 1225, moe: 2.6, method: 'Face-to-face', sponsor: null, q: 'List question (first choice), with a second-choice follow-up',
    added: '2026-11-12',
    r: { sara: 42.4, leni: 15.9, tulfo: 6.7, bam: 2.5, risa: 2.0 }, other: 'Baste Duterte 6.9, Padilla 3.8, Pangilinan 1.9, Teodoro 1.5', undec: null,
    flags: ['Undecided share not published in any source we opened.', 'Margin of error: Mindanao Times says ±2.6; SunStar says it was not reported.', 'Second choice: Baste Duterte 21.3, Tulfo 10.0, Robredo 9.4, Padilla 9.3, Sara Duterte 8.6.'],
    src: [['Mindanao Times', 'https://www.mindanaotimes.com.ph/second-choice/'],
          ['SunStar Davao', 'https://www.sunstar.com.ph/davao/survey-duterte-siblings-most-preferred-presidential-bets']] },

  { pollster: 'Momentum Research', start: '2026-10-16', end: '2026-10-19', released: '2026-10-27',
    n: 1401, moe: 2.6, method: 'Face-to-face', sponsor: null, indep: true, q: 'Two-way match-up: Robredo vs. Baste Duterte (Sara Duterte not in this question)',
    added: '2026-10-29',
    r: { leni: 45.7 }, other: 'Baste Duterte 43.2%', undec: 11,
    include: false, exclude: 'A two-way Robredo vs. Baste Duterte question without Sara Duterte, so it is not comparable with the list surveys. The same survey had Sara Duterte leading two- and three-way match-ups by more than 20 points at about 44%, but exact figures were not published in any source we could open.',
    flags: ['Undecided = 6.4 unsure + 4.6 declined.', 'Only one source opened (Iloilo Metropolitan Times, Oct 27); it cites the Momentum Research dashboard. Release date is the earliest report found.'],
    src: [['Iloilo Metropolitan Times, Oct 27 2026', 'https://www.imtnews.ph/filipinos-split-between-robredo-baste-duterte-in-two-way-race-for-president-survey/']] },

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

  { pollster: 'Momentum Research', start: '2026-08-18', end: '2026-08-23', released: '2026-10-12',
    n: 1487, moe: 2.5, method: 'Face-to-face', sponsor: null, q: 'List question: "who they would vote as president among the names listed"',
    added: '2026-10-22', indep: true,
    r: { sara: 45.8, leni: 19.5, tulfo: 13.3, bam: 3.9, go: 2.4, risa: 2.1 }, other: 'Remulla 0.5, Pangilinan 0.0', undec: 12.5,
    flags: ['Reported Oct 12 (Manila Times) and Oct 22 (Daily Guardian); the full list and undecided figure are from Daily Guardian.'],
    src: [['Daily Guardian, Oct 22 2026', 'https://www.dailyguardian.com.ph/blog/sara-duterte-still-tops-2028-poll-leni-robredo-second'],
          ['Manila Times, Oct 12 2026', 'https://www.manilatimes.net/2026/10/12/tmt-anniversary/no-clear-challenger-to-presidential-survey-frontrunner-sara/2441843'],
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
  { a: 'sara', b: 'leni', pollster: 'OCTA Research', start: '2026-09-28', end: '2026-10-04', released: '2026-11-04', added: '2026-11-05', n: 1200, moe: 3, sponsor: null, va: 40, vb: 33, undec: 27,
    note: 'Undecided/neither 26, refused 1. By region (Duterte–Robredo): Mindanao 71–2, Visayas 46–27, Balance Luzon 24–49, NCR 32–39.',
    src: [['Manila Times, Nov 4 2026', 'https://www.manilatimes.net/2026/11/04/news/dutertes-lead-over-robredo-narrows-to-7-points-in-octa-survey/2461287'],
          ['SunStar', 'https://www.sunstar.com.ph/davao/saras-lead-vs-leni-continues']] },
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
  { a: 'sara', b: 'risa', pollster: 'Momentum Research', start: '2026-08-18', end: '2026-08-23', n: 1487, moe: 2.5, sponsor: null, va: 64.9, vb: 22.6, undec: null,
    src: [['Daily Guardian', 'https://www.dailyguardian.com.ph/blog/sara-duterte-still-tops-2028-poll-leni-robredo-second']] },
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
  { date: '2026-10-13', text: 'Impeachment court lets prosecutors drop three of four charges against Sara Duterte; only the unexplained-wealth charge remains.', src: 'https://www.philstar.com/headlines/2026/10/13/2562940/impeach-court-grants-prosecution-bid-drop-3-4-charges-vs-vp-sara' },
  { date: '2026-11-09', text: 'Sara Duterte’s defense begins presenting its case in the impeachment trial.', src: 'https://www.manilatimes.net/2026/11/09/news/vp-saras-impeachment-trial-resumes/2464835' },
  { date: '2026-11-04', text: 'OCTA: Sara Duterte’s one-on-one lead over Leni Robredo narrows to 7 points (40–33), from 11 in March.', src: 'https://www.manilatimes.net/2026/11/04/news/dutertes-lead-over-robredo-narrows-to-7-points-in-octa-survey/2461287' },
  { date: '2027-10-01', text: 'Filing of certificates of candidacy (Oct 1–8, 2027). The field becomes official.', src: 'https://en.wikipedia.org/wiki/2028_Philippine_presidential_election', future: true },
  { date: '2028-05-08', text: 'Election day.', src: 'https://en.wikipedia.org/wiki/2028_Philippine_presidential_election', future: true },
];

/* ============================================================
   Computation
   ============================================================ */
// ── Senate surveys (May 2028: 12 seats; voters pick up to 12 names) ──
// r = { 'Full Name': percent }. Names are kept exactly as each pollster published them.
// SEN_PEOPLE adds optional facts per name (only sourced ones).
const EL_SEN_POLLS = [
  {"pollster": "Momentum Research", "start": "2026-10-16", "end": "2026-10-19", "released": "2026-11-10", "added": "2026-11-12", "n": 1401, "moe": 2.6, "method": "Face-to-face", "indep": true, "q": "Up to 12 names from a list of 51", "r": {"Robin Padilla": 37.0, "Baste Duterte": 36.0, "Alan Peter Cayetano": 35.0, "Raffy Tulfo": 34.0, "Vico Sotto": 32.0, "Grace Poe": 29.0, "Manny Pacquiao": 26.0, "Chiz Escudero": 23.0, "Loren Legarda": 23.0, "Paolo Duterte": 21.0, "Nancy Binay": 19.0, "Ben Tulfo": 17.0}, "flags": ["Only the top 12 names were published.", "Gen Z voters: Baste Duterte 47, Padilla 40, Sotto 33, Cayetano 27."], "src": [["The Global Filipino Magazine", "https://theglobalfilipinomagazine.com/baste-duterte-is-gen-zs-top-pick-for-senator-in-early-2028-survey"]], "sponsor": null},
  {"pollster": "WR Numero", "start": "2026-10-01", "end": "2026-10-31", "released": "2026-11-09", "method": "Not stated", "q": "Senate preference (exact question and fieldwork dates not published; shown as October)", "r": {"Alan Peter Cayetano": 39.0, "Robin Padilla": 37.0, "Raffy Tulfo": 32.0, "Vico Sotto": 32.0, "Grace Poe": 30.0}, "include": false, "exclude": "Only five names, no fieldwork dates and no sample size were published in any source we could open.", "flags": ["Undecided 14%, down from 19.4% in June.", "One of the sources is Sen. Cayetano’s own press release."], "src": [["Cayetano press release", "https://alanpetercayetano.com/press/cayetano-continues-to-rank-among-top-choices-in-2028-senate-polls/"], ["Boracay Island News", "https://www.boracayislandnews.com/cayetano-nangunguna-sa-paunang-2028-senatorial-survey"]], "sponsor": null},
  {"pollster": "Publicus Asia", "start": "2026-10-01", "end": "2026-10-04", "released": "2026-10-20", "n": 1581, "method": "Online panel", "q": "Senate voting preference", "r": {"Vico Sotto": 39.0, "Chel Diokno": 28.0, "Grace Poe": 23.0, "Baste Duterte": 23.0, "Alan Peter Cayetano": 23.0, "Raffy Tulfo": 22.0, "Leila de Lima": 21.0, "Robin Padilla": 20.0, "Gibo Teodoro": 20.0, "Chiz Escudero": 19.0}, "include": false, "exclude": "An opt-in online panel, not a random sample, so its error can’t be measured the way the others can.", "flags": ["Heidi Mendoza and Willie Ong tied for 11th–12th; their percentages were not published."], "src": [["DZRH", "https://www.dzrh.com.ph/post/vico-sotto-chel-diokno-top-publicus-asias-2028-senatorial-preference-survey"]], "sponsor": null},
  {"pollster": "OCTA Research", "start": "2026-09-28", "end": "2026-10-04", "released": "2026-10-19", "n": 1200, "moe": 3, "method": "Face-to-face", "indep": true, "q": "\"If the May 2028 elections will be held today, who will you likely vote for as SENATOR?\" Up to 12.", "r": {"Raffy Tulfo": 47.0, "Robin Padilla": 45.0, "Alan Peter Cayetano": 44.0, "Vico Sotto": 42.0, "Grace Poe": 36.0, "Baste Duterte": 36.0, "Loren Legarda": 31.0, "Abby Binay": 29.0, "Mark Lapid": 28.0, "Chiz Escudero": 27.0, "Sonny Angara": 25.0, "Manny Pacquiao": 25.0, "Ben Tulfo": 23.0, "Jinggoy Estrada": 22.0, "Koko Pimentel": 20.0, "Sal Panelo": 20.0, "Mark Villar": 19.0, "Gringo Honasan": 18.0, "Francis Tolentino": 18.0, "Gibo Teodoro": 16.0, "Willie Revillame": 16.0, "Benhur Abalos": 16.0, "Bonifacio Bosita": 16.0, "JV Ejercito": 16.0, "Bong Revilla": 15.0, "Franklin Drilon": 15.0, "Ace Barbers": 15.0}, "flags": ["OCTA issued an erratum the same day to add Baste Duterte.", "Philstar names the Makati mayor “Abby” Binay; Pulse Asia lists Nancy Binay as Makati mayor. Shown as reported."], "src": [["Philstar", "https://www.philstar.com/headlines/2026/10/19/2564265/raffy-tulfo-padilla-cayetano-vico-sotto-statistically-tied-hypothetical-2028-senate-race"], ["Inquirer", "https://www.inquirer.net/493342/raffy-tulfo-overtakes-padilla-in-octas-2028-senate-survey/"]], "sponsor": null},
  {"pollster": "Pulse Asia", "start": "2026-09-17", "end": "2026-09-24", "released": "2026-10-12", "n": 2400, "moe": 2, "method": "Face-to-face", "indep": true, "q": "Up to 12 names from a list of 66", "r": {"Grace Poe": 50.2, "Alan Peter Cayetano": 46.5, "Robin Padilla": 45.9, "Raffy Tulfo": 44.4, "Baste Duterte": 37.2, "Manny Pacquiao": 36.5, "Loren Legarda": 33.0, "Nancy Binay": 31.7, "Chiz Escudero": 30.1, "Sonny Angara": 26.3, "Ben Tulfo": 21.5, "Mark Lapid": 19.8, "Jinggoy Estrada": 18.2, "Willie Revillame": 17.7, "Mike Defensor": 16.9, "Mark Villar": 16.6, "Mar Roxas": 16.5, "JV Ejercito": 15.5, "Koko Pimentel": 14.2, "Rex Gatchalian": 14.1, "Bong Revilla": 13.8, "Benhur Abalos": 13.7, "Chel Diokno": 11.8, "Francis Tolentino": 11.5, "Ralph Recto": 11.4, "Leila de Lima": 11.2}, "flags": ["Vico Sotto was not on Pulse Asia’s list.", "Voters named 7 people on average; 22% named a full 12."], "src": [["Pulse Asia release (PDF)", "https://pulseasia.ph/wp-content/uploads/2026/10/MR1-UB2026-3-MR-on-the-May-2028-Elections-Final.pdf"]], "sponsor": null},
  {"pollster": "Tangere", "start": "2026-09-10", "end": "2026-09-14", "released": "2026-09-21", "n": 2400, "moe": 2, "method": "Mobile app", "indep": true, "q": "Senate preference, up to 12", "r": {"Raffy Tulfo": 39.9, "Grace Poe": 36.7, "Robin Padilla": 34.0, "Baste Duterte": 33.7, "Paolo Duterte": 32.8, "Manny Pacquiao": 32.5, "Ben Tulfo": 30.8, "Chiz Escudero": 27.3, "Alan Peter Cayetano": 26.6, "Sonny Angara": 23.6, "Chel Diokno": 22.9, "Loren Legarda": 22.5, "Nancy Binay": 19.0, "Jimmy Bondoc": 18.5, "Joy Belmonte": 15.2, "Mike Defensor": 14.5, "Richard Mata": 13.1, "Zia Adiong": 12.5}, "flags": ["Left out Vico Sotto, Isko Moreno and Leni Robredo, saying they will not run. Other names may score higher as a result."], "src": [["Tangere", "https://tangereapp.com/tangere-2028-senatorial-survey-september/"]], "sponsor": null},
  {"pollster": "Tangere", "start": "2026-08-12", "end": "2026-08-15", "released": "2026-08-22", "n": 2400, "moe": 1.96, "method": "Mobile app", "indep": true, "q": "Up to 12 names from a list of 75", "r": {"Vico Sotto": 42.1, "Baste Duterte": 37.0, "Raffy Tulfo": 36.5, "Robin Padilla": 36.0, "Grace Poe": 35.8, "Alan Peter Cayetano": 32.3, "Paolo Duterte": 31.6, "Leni Robredo": 30.8, "Isko Moreno": 30.8, "Ben Tulfo": 28.7, "Manny Pacquiao": 28.0, "Chel Diokno": 25.1, "Chiz Escudero": 24.3, "Loren Legarda": 20.6, "Francis Tolentino": 16.7, "Richard Mata": 15.1, "JV Ejercito": 11.5, "Mark Villar": 9.6}, "flags": ["The article skips some ranks, so names between 15th and 33rd are partly missing.", "The same article also says Tulfo placed 4th."], "src": [["Newswav", "https://newswav.com/article/vico-sotto-takes-lead-in-tangere-senate-poll-A2608_KKxD6v"]], "sponsor": null},
  {"pollster": "OCTA Research", "start": "2026-07-04", "end": "2026-07-11", "released": "2026-07-29", "n": 1200, "moe": 3, "method": "Face-to-face", "indep": true, "q": "\"If the May 2028 elections will be held today, who will you likely vote for as SENATOR?\" Up to 12.", "r": {"Robin Padilla": 53.9, "Raffy Tulfo": 47.4, "Alan Peter Cayetano": 45.4, "Grace Poe": 44.5, "Vico Sotto": 42.0, "Loren Legarda": 39.0, "Manny Pacquiao": 34.5, "Paolo Duterte": 34.3, "Ben Tulfo": 31.0, "Abby Binay": 26.1, "Jinggoy Estrada": 25.5, "Mark Lapid": 25.0, "Chiz Escudero": 23.2, "Koko Pimentel": 21.2, "Mark Villar": 19.5, "Sonny Angara": 19.2, "Sal Panelo": 18.4, "JV Ejercito": 18.1, "Gringo Honasan": 16.9, "Philip Salvador": 16.3, "Nicolas Torre III": 15.5, "Willie Revillame": 15.1, "Bonifacio Bosita": 14.9, "Leila de Lima": 13.7, "Benhur Abalos": 13.3, "Antonio Trillanes": 12.9, "Francis Tolentino": 12.5, "Ralph Recto": 12.0, "Gibo Teodoro": 11.2, "Chel Diokno": 10.6}, "flags": ["Baste Duterte was not on this list.", "Newswav says 1,200 registered voters; other outlets say adults."], "src": [["Philstar", "https://www.philstar.com/headlines/2026/07/29/2545571/robin-padilla-leads-hypothetical-2028-senate-race-vico-sotto-cracks-top-5-survey"], ["GMA News", "https://www.gmanetwork.com/news/topstories/nation/996537/robin-padilla-raffy-tulfo-alan-peter-cayetano-top-voting-preference-for-senatorial-polls-octa/story/"]], "sponsor": null},
  {"pollster": "Momentum Research", "start": "2026-07-13", "end": "2026-07-16", "released": "2026-08-14", "n": 1438, "moe": 2.6, "method": "Face-to-face", "indep": true, "q": "Up to 12 names from a list of 50", "r": {"Robin Padilla": 43.9, "Alan Peter Cayetano": 43.4, "Raffy Tulfo": 38.2, "Baste Duterte": 34.8, "Grace Poe": 33.7, "Vico Sotto": 32.9, "Loren Legarda": 31.0, "Manny Pacquiao": 24.2, "Nancy Binay": 23.6, "Chiz Escudero": 23.0, "Paolo Duterte": 22.4, "Cynthia Villar": 19.1, "Jinggoy Estrada": 18.3, "Ben Tulfo": 17.6, "Abby Binay": 15.0, "Sonny Angara": 14.6, "Mark Villar": 14.5, "Koko Pimentel": 13.5, "JV Ejercito": 12.9, "Bong Revilla": 12.7, "Chel Diokno": 12.4, "Philip Salvador": 11.8, "Francis Tolentino": 11.4, "Leila de Lima": 11.4, "Jimmy Bondoc": 10.6}, "flags": ["Undecided 8.2, declined 2.7."], "src": [["Newswav", "https://newswav.com/article/incumbent-senators-lead-2028-survey-A2608_1XaMNd"]], "sponsor": null},
  {"pollster": "Pulse Asia", "start": "2026-06-28", "end": "2026-07-06", "released": "2026-07-22", "n": 2400, "moe": 2, "method": "Face-to-face", "indep": true, "q": "Up to 12 names from a list of 53", "r": {"Robin Padilla": 48.4, "Vico Sotto": 47.9, "Raffy Tulfo": 43.9, "Alan Peter Cayetano": 43.2, "Loren Legarda": 40.3, "Manny Pacquiao": 35.6, "Nancy Binay": 32.4, "Sonny Angara": 27.2, "Mark Villar": 26.1, "Ben Tulfo": 20.7, "Jinggoy Estrada": 19.5, "Willie Revillame": 19.0, "Chiz Escudero": 17.2, "Mike Defensor": 17.1, "Mar Roxas": 17.1, "Benhur Abalos": 17.0, "Mark Lapid": 16.9, "Philip Salvador": 14.9, "Jimmy Bondoc": 14.9, "JV Ejercito": 14.2}, "flags": ["Grace Poe and Baste Duterte were not on this list.", "Pulse Asia’s first 2028 Senate round."], "src": [["Pulse Asia release (PDF)", "https://pulseasia.ph/wp-content/uploads/2026/07/MR2-UB2026-2-MR-on-the-May-2028-Elections-Final.pdf"]], "sponsor": null},
  {"pollster": "Tangere", "start": "2026-06-23", "end": "2026-06-27", "released": "2026-07-22", "n": 1500, "moe": 2.15, "method": "Mobile app", "q": "Senate preference, up to 12", "r": {"Raffy Tulfo": 37.6, "Vico Sotto": 36.0, "Grace Poe": 35.6, "Isko Moreno": 34.7, "Baste Duterte": 34.3, "Paolo Duterte": 34.1, "Robin Padilla": 32.3, "Chiz Escudero": 30.9, "Sonny Angara": 28.3, "Manny Pacquiao": 26.1, "Alan Peter Cayetano": 25.0, "Chel Diokno": 20.3, "Benhur Abalos": 19.9, "Loren Legarda": 19.6, "Rex Gatchalian": 19.4}, "flags": [], "src": [["Tangere", "https://tangereapp.com/tulfo-sotto-and-poe-lead-tangeres-2028-senatorial-preference-survey-as-race-tightens/"]], "sponsor": null},
  {"pollster": "Arkipelago Analytics", "start": "2026-05-26", "end": "2026-06-02", "released": "2026-06-29", "n": 2637, "method": "Face-to-face", "q": "Senate election preference (election year not stated)", "r": {"Baste Duterte": 48.0, "Leni Robredo": 48.0, "Robin Padilla": 48.0, "Vico Sotto": 45.0, "Loren Legarda": 45.0, "Raffy Tulfo": 42.0, "Alan Peter Cayetano": 42.0, "Paolo Duterte": 39.0, "Chiz Escudero": 39.0, "Mark Villar": 39.0, "Dingdong Dantes": 35.0, "Grace Poe": 35.0}, "include": false, "exclude": "The published results are rounded into tie groups, and the article does not say the question is about 2028.", "flags": [], "src": [["OneNews", "https://www.onenews.ph/articles/baste-duterte-leni-robredo-robin-padilla-lead-senate-preference-survey"]], "sponsor": null},
  {"pollster": "Arkipelago Analytics", "start": "2026-02-26", "end": "2026-03-06", "released": "2026-04-01", "n": 2637, "moe": 2, "method": "Face-to-face", "q": "Senate election preference (election year not stated)", "r": {"Baste Duterte": 47.0, "Raffy Tulfo": 47.0, "Vico Sotto": 47.0, "Robin Padilla": 42.0, "Loren Legarda": 42.0, "Leni Robredo": 42.0, "Alan Peter Cayetano": 39.0, "Paolo Duterte": 39.0, "Chiz Escudero": 39.0}, "include": false, "exclude": "The published results are rounded into tie groups, and the article does not say the question is about 2028.", "flags": ["SunStar and Edge Davao list different names in the lower groups."], "src": [["SunStar Davao", "https://www.sunstar.com.ph/davao/baste-duterte-raffy-tulfo-vico-sotto-lead-2026-voting-survey-arkipelago-analytics"]], "sponsor": null},
  {"pollster": "Tangere", "start": "2026-02-02", "end": "2026-02-06", "released": "2026-02-12", "n": 2000, "moe": 2.15, "method": "Mobile app", "indep": true, "q": "Senate preference, up to 12", "r": {"Raffy Tulfo": 49.8, "Grace Poe": 43.5, "Alan Peter Cayetano": 38.0, "Loren Legarda": 38.0, "Paolo Duterte": 37.1, "Baste Duterte": 36.6, "Rex Gatchalian": 34.4, "Manny Pacquiao": 31.2, "Chiz Escudero": 30.2, "Ben Tulfo": 30.1, "Joy Belmonte": 29.3, "Sonny Angara": 28.4, "Chel Diokno": 27.4, "Francis Zamora": 19.8, "Benjie Magalong": 15.1, "Lala Sotto": 14.7}, "flags": ["Left out Robin Padilla and Vico Sotto, then reported as not running. Both returned in later surveys.", "The reported ranks don’t match the percentages in one source."], "src": [["DZRH", "https://www.dzrh.com.ph/post/raffy-tulfo-grace-poe-lead-tangeres-2028-senatorial-race"], ["Newswav", "https://newswav.com/article/tulfo-poe-top-2028-senatorial-poll-after-padilla-sotto-exit-A2602_ZP8x04"]], "sponsor": null},
  {"pollster": "Tangere", "start": "2025-07-18", "end": "2025-07-20", "released": "2025-07-24", "n": 2400, "moe": 1.96, "method": "Mobile app", "indep": true, "q": "Up to 12 names from a list of 42", "r": {"Vico Sotto": 61.0, "Raffy Tulfo": 55.3, "Grace Poe": 46.1, "Chiz Escudero": 37.7, "Loren Legarda": 37.0, "Paolo Duterte": 36.6, "Alan Peter Cayetano": 34.8, "Ben Tulfo": 32.2, "Robin Padilla": 30.1, "Benhur Abalos": 29.0, "Sonny Angara": 27.7, "Bong Revilla": 26.7}, "flags": [], "src": [["Manila Bulletin", "https://mb.com.ph/2025/07/26/vico-sotto-dominates-early-2028-senate-race-survey-with-61research-firm"]], "sponsor": null}
];
const SEN_PEOPLE = {
  "Leni Robredo": {"note": "Has said she will not run for a national post in 2028 (April 21; repeated November 9)."},
  "Vico Sotto": {"note": "Tangere left him off its September list, saying he has said he will not run."}
};

// ── Senate impeachment trial of Vice President Sara Duterte ──
const EL_TRIAL = {
  asOf: '2026-11-12',
  stage: 'The defense is presenting its witnesses on the one remaining charge: unexplained wealth.',
  details: [
    'Only Article II is left: assets and business interests the prosecution says were not declared in her SALN, at least ₱817.87 million. Prosecutors dropped the other three charges (confidential funds, bribery, threats) on October 13.',
    'The defense started on November 9. Witnesses so far include local assessors, a GenCorp lawyer who said Duterte received ₱2.14 million from a Jollibee branch investment with no written records, and people explaining specific card charges. The defense dropped most of its bank witnesses on November 12.',
    'Next hearing dates: November 13, 19, 20 and 23. December dates depend on how many more days the defense asks for. No verdict date has been set; the presiding officer, Sen. Chiz Escudero, said the trial could end within 2026.',
    'Still pending at the Supreme Court: a petition by Sens. Robin Padilla and Bong Go against the 14-vote rule. The Court has asked for comments but has not stopped the trial.',
  ],
  stageSrc: [['DZRH, Nov 12', 'https://www.dzrh.com.ph/post/day-43-of-vp-sara-duterte-impeachment-trial-or-november-12-2026'],
             ['Reuters via BusinessDay, Nov 9', 'https://www.businessday.co.za/world/2026-11-09-explainer-where-does-philippine-vp-sara-dutertes-impeachment-trial-stand/'],
             ['GMA, Nov 11', 'https://gmanetwork.com/news/topstories/nation/1009172/vp-sara-impeachment-trial-future-defense-witnesses-could-fill-in-gaps-says-poa/story'],
             ['DZRH schedule', 'https://www.dzrh.com.ph/post/court-sets-november-schedule-for-vp-sara-duterte-impeachment-trial'],
             ['Daily Tribune, SC petition', 'https://tribune.net.ph/amp/story/2026/11/04/osg-urges-sc-to-junk-petition-vs-sara-impeachment-voting-threshold']],
  seats: {
    total: 24, eligible: 20, needed: 14,
    note: 'On September 23 the court voted 13–1 to count two-thirds of the senators able to take part, not of all 24. Four are not taking part: Jinggoy Estrada and Rodante Marcoleta (detained in separate plunder cases), Bato dela Rosa (has not attended, amid an ICC arrest order) and Loren Legarda (on leave since August). Two-thirds of 20 is 13.3, so 14 votes convict. Before that ruling, 16 were needed. The court has not formally named who is excluded.',
    src: [['Daily Tribune, Sep 23', 'https://tribune.net.ph/2026/09/23/when-16-is-not-16-senate-rewrites-impeach-math-2'],
          ['Asia News Network', 'https://asianews.network/2-3-rule-revisited-fewer-votes-needed-to-convict-philippine-vp-sara-duterte/'],
          ['Daily Tribune, Nov 5', 'https://tribune.net.ph/2026/11/05/luistro-warns-impeachment-chaos-looms-sans-sc-ruling']],
  },
  outcomes: [
    'Convicted (14 or more votes): she is removed as Vice President and barred from public office, so she cannot run in 2028. President Marcos would nominate a new VP from the Senate or House, who needs a majority vote in each chamber.',
    'Acquitted (13 or fewer): she stays in office and can run in 2028. She leads every presidential survey FactsPH tracks.',
  ],
  outcomesSrc: [['Reuters via BusinessDay', 'https://www.businessday.co.za/world/2026-11-09-explainer-where-does-philippine-vp-sara-dutertes-impeachment-trial-stand/'],
                ['Daily Tribune, Oct 16', 'https://tribune.net.ph/2026/10/16/sara-barred-from-2028-race-if-convicted-prosecutor-insists']],
  opinion: [
    { pollster: 'Momentum Research', start: '2026-10-16', end: '2026-10-19', n: 1401, moe: 2.6,
      q: 'Should she be convicted or acquitted?', convict: 38.8, acquit: 33.8,
      note: 'Undecided 22.6, refused 4.7.',
      src: [['Daily Guardian, Oct 31', 'https://www.dailyguardian.com.ph/blog/more-filipinos-favor-sara-duterte-conviction-october-survey-finds']] },
    { pollster: 'OCTA Research', start: '2026-09-28', end: '2026-10-04', n: 1200, moe: 3,
      q: 'Convict or acquit?', convict: 21, acquit: 25,
      note: '47% said they need to see the evidence first. NCR: convict 34, acquit 17. Mindanao: acquit 52. At the start of the trial it was convict 17, acquit 21.',
      src: [['GMA News, Oct 21', 'https://www.gmanetwork.com/news/topstories/nation/1006632/acquit-or-convict-filipinos-split-over-vp-sara-duterte-impeachment-trial-in-latest-octa-survey/story/']] },
    { pollster: 'Publicus Asia', start: '2026-10-01', end: '2026-10-04', n: 1581, moe: null,
      q: 'What do you expect the outcome to be?', convict: 44, acquit: 31, convictLbl: 'Expect conviction', acquitLbl: 'Expect acquittal',
      note: 'This asks what people expect, not what they want. Online panel, not a random sample, so no margin of error. Done before three charges were dropped.',
      src: [['Manila Times, Oct 14', 'https://www.manilatimes.net/2026/10/14/news/44-expect-sara-dutertes-conviction-in-impeachment-trial-survey/2445251']] },
  ],
  timeline: [
    { date: '2026-05-11', text: 'House impeaches Sara Duterte: 257 yes, 25 no, 9 abstain.', src: 'https://en.wikipedia.org/wiki/Second_impeachment_of_Sara_Duterte' },
    { date: '2026-07-06', text: 'Trial opens. Escudero is elected presiding officer and rules 16 votes are needed to convict.', src: 'https://en.wikipedia.org/wiki/Second_impeachment_of_Sara_Duterte' },
    { date: '2026-09-23', text: 'Court votes 13–1 to count only senators able to take part: 14 of 20 votes now convict.', src: 'https://tribune.net.ph/2026/09/23/when-16-is-not-16-senate-rewrites-impeach-math-2' },
    { date: '2026-09-30', text: 'Supreme Court dismisses three petitions against the vote rule.', src: 'https://www.philstar.com/headlines/2026/09/30/2560026/sc-dismisses-petitions-vs-vote-threshold-sara-duterte-impeachment-trial' },
    { date: '2026-10-13', text: 'Prosecution drops three of four charges; only unexplained wealth remains.', src: 'https://www.manilatimes.net/2026/10/13/news/prosecution-drops-3-impeachment-articles-vs-sara-duterte/2444253' },
    { date: '2026-10-14', text: 'Supreme Court asks for comments on the Padilla–Go petition against the 14-vote rule.', src: 'https://tribune.net.ph/2026/10/29/sc-orders-congress-to-respond-to-challenge-on-sara-impeachment-voting-rule' },
    { date: '2026-11-09', text: 'Defense begins presenting witnesses.', src: 'https://www.manilatimes.net/2026/11/09/news/vp-saras-impeachment-trial-resumes/2464835' },
    { date: '2026-11-12', text: 'Day 43: defense drops most of its bank witnesses.', src: 'https://www.dzrh.com.ph/post/day-43-of-vp-sara-duterte-impeachment-trial-or-november-12-2026' },
    { date: '2026-11-23', text: 'Last November hearing date set so far (10 a.m.–2 p.m.).', src: 'https://www.dzrh.com.ph/post/court-sets-november-schedule-for-vp-sara-duterte-impeachment-trial', future: true },
  ],
};

const ELS = (() => {
  const DAY = 864e5, HALF_LIFE = 90, WINDOW = 365, asOf = Date.parse(EL_AS_OF);
  const mid = p => (Date.parse(p.start) + Date.parse(p.end)) / 2;
  const weight = p => Math.pow(0.5, ((asOf - mid(p)) / DAY) / HALF_LIFE) * Math.sqrt((p.n || 1200) / 1200);
  const inAverage = p => p.include === false ? { ok: false, why: p.exclude }
    : (asOf - mid(p)) / DAY > WINDOW ? { ok: false, why: 'Older than 12 months; shown for history only.' } : { ok: true };
  const used = EL_SEN_POLLS.filter(p => inAverage(p).ok);
  const names = [...new Set(used.flatMap(p => Object.keys(p.r)))];
  const rows = names.map(name => {
    const ps = used.filter(p => p.r[name] != null);
    const W = ps.reduce((s, p) => s + weight(p), 0);
    const avg = ps.reduce((s, p) => s + weight(p) * p.r[name], 0) / W;
    const vals = ps.map(p => p.r[name]);
    // how much the surveys disagree about this name (weighted spread), at least 2 points
    const sd = Math.max(2, Math.sqrt(ps.reduce((s, p) => s + weight(p) / W * (p.r[name] - avg) ** 2, 0)));
    return { name, avg, sd, polls: ps.length, of: used.length, min: Math.min(...vals), max: Math.max(...vals),
      parts: ps.map(p => ({ p, v: p.r[name], share: weight(p) / W })) };
  });
  // A name needs 2+ surveys to be averaged
  const ranked = rows.filter(r => r.polls >= 2).sort((a, b) => b.avg - a.avg);
  const single = rows.filter(r => r.polls === 1).sort((a, b) => b.avg - a.avg);

  // Chance of finishing in the top 12: simulate the election many times
  function rng(seed) { return () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const gauss = r => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
  const cache = {};
  function top12(swing, N = 10000) {
    if (cache[swing]) return cache[swing];
    const r = rng(2028), hits = ranked.map(() => 0);
    for (let i = 0; i < N; i++) {
      const sim = ranked.map((a, j) => ({ j, v: a.avg + gauss(r) * a.sd + gauss(r) * swing }));
      sim.sort((a, b) => b.v - a.v);
      for (let k = 0; k < Math.min(12, sim.length); k++) hits[sim[k].j]++;
    }
    return (cache[swing] = ranked.map((a, j) => ({ ...a, p: hits[j] / N })));
  }
  const addedOn = p => Date.parse(p.added || p.released || p.end);
  const latest = [...EL_SEN_POLLS].sort((a, b) => addedOn(b) - addedOn(a))[0] || null;
  return { used, ranked, single, top12, weight, inAverage, addedOn, latest, total: EL_SEN_POLLS.length };
})();

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

  // ── Progress over time ──────────────────────────────────────
  // A survey counts from the day it was made public (released, else fieldwork end).
  const avail = p => Date.parse(p.released || p.end);
  const addedOn = p => Date.parse(p.added || p.released || p.end);
  const wAt = (p, when) => Math.pow(0.5, ((when - mid(p)) / DAY) / HALF_LIFE) * sampleW(p);
  const poolAt = (when, skip) => EL_POLLS.filter(p => p !== skip && p.include !== false && avail(p) <= when
    && when >= mid(p) && (when - mid(p)) / DAY <= WINDOW);
  // The average for one candidate as it stood on a given date (same method as today's average)
  function averageAt(key, when, skip) {
    const rows = poolAt(when, skip).filter(p => p.r[key] != null);
    if (!rows.length) return null;
    let sw = 0, sv = 0;
    rows.forEach(p => { const w = wAt(p, when); sw += w; sv += w * p.r[key]; });
    return sv / sw;
  }
  // What one survey did: the average right before vs right after it came out, and its weight then and now
  function impact(p, keys) {
    const when = avail(p), pool = poolAt(when);
    const tw = pool.reduce((s, q) => s + wAt(q, when), 0);
    return {
      p, when,
      weightThen: pool.includes(p) ? wAt(p, when) / tw : 0,
      weightNow: inAverage(p).ok ? weight(p) / totalW : 0,
      moves: keys.filter(k => p.r[k] != null).map(k => ({ key: k, before: averageAt(k, when, p), after: averageAt(k, when) })),
      // effect on TODAY's average: today's average with vs without this survey
      today: keys.filter(k => p.r[k] != null && inAverage(p).ok).map(k => {
        const a = average(k), b = average(k, used.filter(q => q !== p));
        return { key: k, without: b ? b.avg : null, with: a ? a.avg : null };
      }),
    };
  }
  const updates = [...EL_POLLS].sort((a, b) => addedOn(b) - addedOn(a) || avail(b) - avail(a));
  // head-to-head-only releases also count as news when they carry `added`
  const h2hUpdates = EL_H2H.filter(h => h.added).sort((a, b) => addedOn(b) - addedOn(a));
  const latestAdded = [...updates.slice(0, 1), ...h2hUpdates.slice(0, 1)].map(addedOn);
  const latestUpdate = latestAdded.length ? new Date(Math.max(...latestAdded)).toISOString().slice(0, 10) : EL_AS_OF;

  // ── Chances of finishing first ──────────────────────────────
  // Simulation: each candidate's election-day share = today's average
  //   + survey uncertainty (how much the surveys disagree about them)
  //   + a "swing" for everything that can change before election day (σ in points, chosen by the reader).
  // Same random seed every time, so the numbers don't jump around between visits.
  function rng(seed) { return () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const gauss = r => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
  const spread = a => Math.max(1, Math.sqrt(a.parts.reduce((s, { v, share }) => s + share * (v - a.avg) ** 2, 0)));
  const chanceCache = {};
  function chances(swing, N = 20000) {
    if (chanceCache[swing]) return chanceCache[swing];
    const r = rng(2028), wins = Object.fromEntries(ranked.map(a => [a.key, 0])), sd = ranked.map(spread);
    for (let i = 0; i < N; i++) {
      let best = -1e9, bk = null;
      ranked.forEach((a, j) => { const v = a.avg + gauss(r) * sd[j] + gauss(r) * swing; if (v > best) { best = v; bk = a.key; } });
      wins[bk]++;
    }
    return (chanceCache[swing] = ranked.map((a, j) => ({ key: a.key, p: wins[a.key] / N, avg: a.avg, sd: sd[j] })));
  }
  // Two-way version for head-to-head match-ups: each side can swing by σ, so the lead swings by σ√2
  function h2hChance(a, b, swing) {
    const s = h2hSummary(a, b); if (!s) return null;
    const se = s.lc ? s.lc.se : 3;
    return phi((s.va - s.vb) / Math.sqrt(se * se + 2 * swing * swing));
  }

  return { weight, recencyW, sampleW, inAverage, used, totalW, average, ranked, single, undecAvg, listLead, h2hSummary, phi, ageDays, HALF_LIFE, WINDOW,
    avail, addedOn, averageAt, impact, updates, h2hUpdates, latestUpdate, chances, h2hChance, spread };
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
  .el-newcard{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold-dim)}
  .el-upd{padding:10px 0;border-bottom:1px solid var(--border)} .el-upd:last-child{border-bottom:none;padding-bottom:0}
  .el-newtag{display:inline-block;background:var(--gold);color:#fffdf8;font-size:calc(11px*var(--ts,1));font-weight:700;letter-spacing:.06em;padding:1px 6px;border-radius:3px;vertical-align:2px}
  .el-moves{display:flex;flex-direction:column;gap:3px;font-size:calc(14px*var(--ts,1));color:var(--muted2)}
  .el-moves .el-sw{margin-right:6px}
  .el-moves .up{color:var(--green);font-weight:600} .el-moves .dn{color:var(--red);font-weight:600} .el-moves .eq{color:var(--muted)}
  .el-log{padding:10px 0;border-bottom:1px solid var(--border)} .el-log:last-child{border-bottom:none}
  .el-seg{display:grid;grid-template-columns:1fr 1fr;gap:6px}
  .el-seg button{min-height:44px;border:1px solid var(--border2);background:var(--s1);border-radius:8px;font-family:'IBM Plex Sans',sans-serif;font-size:calc(14px*var(--ts,1));color:var(--muted2);cursor:pointer;padding:6px}
  .el-seg button.on{background:var(--gold);border-color:var(--gold);color:#fffdf8;font-weight:600}
  .el-crow{padding:10px 0;border-bottom:1px solid var(--border)} .el-crow:last-of-type{border-bottom:none}
  svg.el-chart text{font-family:'IBM Plex Sans',sans-serif;font-size:calc(12px*var(--ts,1));fill:var(--muted)}
  .el-sec{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;background:var(--s2);border:1px solid var(--border2);border-radius:10px;padding:4px;margin-top:12px}
  .el-sec button{min-height:44px;border:none;background:transparent;border-radius:7px;font-family:'IBM Plex Sans',sans-serif;font-size:calc(15px*min(var(--ts,1),1.15));font-weight:600;color:var(--muted2);cursor:pointer}
  .el-sec button.on{background:var(--s1);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.12)}
  .el-sec button .dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--red);margin-left:5px;vertical-align:2px}
  .sn-row{display:grid;grid-template-columns:28px 1fr auto;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid var(--border)}
  .sn-rank{font-family:'Libre Baskerville',serif;font-weight:700;color:var(--muted);text-align:right;font-size:calc(15px*var(--ts,1))}
  .sn-name{font-size:calc(16px*var(--ts,1));font-weight:600;line-height:1.3}
  .sn-sub{font-size:calc(13px*var(--ts,1));color:var(--muted);margin-top:2px}
  .sn-bar{height:8px;background:var(--s3);border-radius:4px;margin-top:6px;position:relative}
  .sn-bar i{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:#5b5fc7}
  .sn-bar.out i{background:#a9a6c9}
  .sn-bar b{position:absolute;top:-3px;height:14px;border-left:1.5px solid var(--muted);border-right:1.5px solid var(--muted);opacity:.5}
  .sn-num{text-align:right;font-family:'Libre Baskerville',serif;font-weight:700;font-size:calc(18px*var(--ts,1));white-space:nowrap}
  .sn-chance{font-family:'IBM Plex Sans',sans-serif;font-weight:500;font-size:calc(12px*var(--ts,1));color:var(--muted2);display:block}
  .sn-cut{display:flex;align-items:center;gap:8px;margin:6px 0;font-size:calc(12px*var(--ts,1));font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}
  .sn-cut:before,.sn-cut:after{content:'';flex:1;height:2px;background:var(--gold);opacity:.5}
  .tr-stage{font-family:'Libre Baskerville',serif;font-size:calc(19px*var(--ts,1));font-weight:700;line-height:1.35;margin:4px 0 8px}
  .tr-seats{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin:10px 0 6px}
  .tr-seats span{aspect-ratio:1;border-radius:4px;background:var(--s3);border:1px solid var(--border2)}
  .tr-seats span.need{background:#2f6db5;border-color:#2f6db5}
  .tr-seats span.off{background:transparent;border-style:dashed}
  .tr-key{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:calc(13px*var(--ts,1));color:var(--muted2)}
  .tr-key i{display:inline-block;width:12px;height:12px;border-radius:3px;vertical-align:-1px;margin-right:5px;border:1px solid var(--border2)}
  .tr-op{margin:10px 0 4px}
  .tr-opbar{display:flex;height:30px;border-radius:6px;overflow:hidden;gap:2px;font-size:calc(13px*var(--ts,1));font-weight:700;color:#fff}
  .tr-opbar div{display:flex;align-items:center;justify-content:center;white-space:nowrap;min-width:0}
  .tr-opbar .cv{background:#2f6db5} .tr-opbar .aq{background:#b5562f} .tr-opbar .un{background:#e4ded2;color:var(--muted2)}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.id = 'el-panel';
  panel.innerHTML = `<div class="el-wrap">
    <div class="el-head">
      <div class="el-top">
        <div><div class="el-title">2028 <em>Race</em></div>
        <div class="el-sub" id="el-sub"></div></div>
        <button class="el-x" aria-label="Close" onclick="showView('brief')">✕</button>
      </div>
      <div class="el-sec" id="el-sec" role="tablist" aria-label="Section"></div>
      <div class="el-tabs" id="el-tabs"></div>
    </div>
    <div class="el-body" id="el-body"></div>
  </div>`;
  document.body.appendChild(panel);

  const TABS = [['overview', 'Overview'], ['chances', 'Chances'], ['trend', 'Progress'], ['h2h', 'Head-to-head'], ['polls', 'All surveys'], ['pollsters', 'Pollsters'], ['method', 'Method']];
  let cur = 'overview';
  const hidden = new Set();
  const DAYMS = 864e5;
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };

  // How much can the race still change before election day? (σ, in percentage points)
  const SWINGS = [
    { k: 0,  label: 'If the vote were today', note: 'Only the uncertainty in today’s surveys. Assumes nothing changes before election day.' },
    { k: 8,  label: 'Small changes', note: 'Each candidate’s share could plausibly move about 8 points either way by election day.' },
    { k: 15, label: 'Moderate changes', note: 'About 15 points either way. Still smaller than what happened in 2016 and 2022.' },
    { k: 25, label: 'Like 2016 & 2022', note: 'About 25 points either way, the size of the late swings in the last two elections (see below).' },
  ];
  let swing = (() => { const v = +store.get('factsph-swing'); return SWINGS.some(x => x.k === v) && store.get('factsph-swing') != null ? v : 25; })();
  const PLAIN = k => C(k).name.split(' ').pop();
  const lastSeen = () => store.get('factsph-el-seen') || '';
  const isNew = p => new Date(EL.addedOn(p)).toISOString().slice(0, 10) > lastSeen();

  const SECTIONS = [['president', 'President'], ['senate', 'Senate'], ['trial', 'VP Trial']];
  let section = (() => { const v = store.get('factsph-el-section'); return SECTIONS.some(x => x[0] === v) ? v : 'president'; })();
  const SUBS = {
    president: 'Presidential surveys, pooled and explained',
    senate: 'Senate surveys: who is in the Magic 12',
    trial: 'The Senate impeachment trial of VP Sara Duterte',
  };
  const senNew = () => ELS.latest && (Date.now() - ELS.addedOn(ELS.latest)) / DAYMS <= 14 && new Date(ELS.addedOn(ELS.latest)).toISOString().slice(0, 10) > (store.get('factsph-sen-seen') || '');
  function tabs() {
    $('#el-sub').textContent = `${SUBS[section]} · data as of ${fmtD(EL_AS_OF)}`;
    $('#el-sec').innerHTML = SECTIONS.map(([k, l]) => `<button role="tab" aria-selected="${k === section}" class="${k === section ? 'on' : ''}" onclick="FactsElections.section('${k}')">${l}${k === 'senate' && senNew() ? '<span class="dot" aria-label="new"></span>' : ''}</button>`).join('');
    $('#el-tabs').style.display = section === 'president' ? '' : 'none';
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
    const ch = EL.chances(swing).slice().sort((a, b) => b.p - a.p);
    return `${whatsNew()}
      <div class="el-card">
        <div class="el-lbl">The picture right now</div>
        <div class="el-h">${esc(C(top.key).name)} leads the poll average by ${lc ? lc.lead.toFixed(1) : '—'} points.</div>
        <p class="el-p">${outs.length ? `But the next ${outs.length === 2 ? 'two names' : 'name'} in the surveys, ${outs.join(' and ')}, ${outs.length === 2 ? 'have both' : 'has'} publicly ruled out running. Pollsters keep asking about them, so their numbers measure goodwill more than a real race.` : ''}
        The field becomes official only when candidates file in October 2027.</p>
        <div class="el-stat">
          <div><b>${EL.used.length}</b><span>surveys in the average (last 12 months)</span></div>
          <div><b>${pct(EL.undecAvg)}</b><span>average undecided / none</span></div>
          <div onclick="FactsElections.go('chances')" style="cursor:pointer"><b>${chanceTxt(ch[0].p)}</b><span>${esc(PLAIN(ch[0].key))}’s chance of finishing first (${esc(SWINGS.find(x => x.k === swing).label.toLowerCase())}) · see Chances ›</span></div>
          <div><b>${h ? pct(h.va, 0) + '–' + pct(h.vb, 0) : '—'}</b><span>Duterte vs Robredo, head-to-head avg</span></div>
        </div>
      </div>
      <div class="el-card"><div class="el-lbl">Weighted polling average · list questions</div>${rows}
        ${EL.single.length ? `<div class="el-meta" style="margin-top:10px;display:block">Asked about in only one survey, so not averaged: ${EL.single.map(a => `${esc(C(a.key).name)} ${pct(a.avg)} (${esc(a.parts[0].p.pollster)}, ${fmtD(a.parts[0].p.end, { month: 'short', year: 'numeric' })})`).join('; ')}.</div>` : ''}</div>
      <div class="el-note">This is a snapshot of preferences ${Math.round((Date.parse('2028-05-08') - Date.parse(EL_AS_OF)) / 864e5 / 30.4)} months before election day, not a forecast. In mid-2015, Grace Poe led most surveys for the 2016 race; Rodrigo Duterte, who hadn't declared yet, won.</div>
      <div class="el-card"><div class="el-lbl">Key dates</div><div class="el-tl">${EL_TIMELINE.map(t =>
        `<div class="el-tli${t.future ? ' f' : ''}"><small>${fmtD(t.date)}</small><span>${esc(t.text)}</span> <a href="${esc(t.src)}" target="_blank" rel="noopener">source ↗</a></div>`).join('')}</div></div>`;
  }

  const chanceTxt = p => p >= 0.995 ? 'over 99%' : p < 0.005 ? 'under 1%' : Math.round(p * 100) + '%';
  const mv = (a, b) => a == null || b == null ? '' : `${pct(a)} → ${pct(b)} <span class="${b - a >= 0.05 ? 'up' : b - a <= -0.05 ? 'dn' : 'eq'}">(${pts(b - a)})</span>`;

  // ── What's new: surveys added in the last 30 days, and what each did to the average ──
  function whatsNew() {
    const keys = EL.ranked.slice(0, 3).map(a => a.key);
    const within = x => (Date.now() - EL.addedOn(x)) / DAYMS <= 30;
    const items = [...EL.updates.filter(within).slice(0, 3), ...EL.h2hUpdates.filter(within).slice(0, 2)]
      .sort((a, b) => EL.addedOn(b) - EL.addedOn(a)).slice(0, 4);
    if (!items.length) return '';
    const added = x => `Added ${fmtD(new Date(EL.addedOn(x)).toISOString().slice(0, 10), { month: 'short', day: 'numeric' })}`;
    const row = x => {
      if (x.va != null) {   // one-on-one match-up
        const s = EL.h2hSummary(x.a, x.b);
        const prev = s && s.rows.filter(r => r !== x && r.pollster === x.pollster)[0];
        return `<div class="el-upd">
          <div class="el-ptop"><span class="el-pname">${isNew(x) ? '<span class="el-newtag">NEW</span> ' : ''}${esc(x.pollster)} · one-on-one</span><span class="el-pdate">${range(x)}</span></div>
          <div class="el-p" style="margin:4px 0 6px"><b>${esc(PLAIN(x.a))} ${pct(x.va, 0)} vs ${esc(PLAIN(x.b))} ${pct(x.vb, 0)}</b>${prev ? ` <span style="color:var(--muted)">(${esc(x.pollster)}’s previous round: ${prev.va}–${prev.vb})</span>` : ''}</div>
          ${s ? `<div class="el-moves"><div>One-on-one average now: ${esc(PLAIN(x.a))} ${pct(s.va, 0)} – ${esc(PLAIN(x.b))} ${pct(s.vb, 0)}</div></div>` : ''}
          ${x.note ? `<div class="el-meta" style="display:block;margin-top:4px">${esc(x.note)}</div>` : ''}
          <div class="el-meta" style="display:block;margin-top:4px">${added(x)} · <a href="#" onclick="FactsElections.go('h2h');return false" style="color:var(--gold)">all match-ups ›</a></div>
        </div>`;
      }
      const p = x, im = EL.impact(p, keys), inc = EL.inAverage(p);
      const top = Object.entries(p.r).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${esc(C(k) ? PLAIN(k) : k)} ${pct(v)}`).join(' · ');
      return `<div class="el-upd">
        <div class="el-ptop"><span class="el-pname">${isNew(p) ? '<span class="el-newtag">NEW</span> ' : ''}${esc(p.pollster)}</span><span class="el-pdate">${range(p)}</span></div>
        <div class="el-p" style="margin:4px 0 6px"><b>${top}${p.other && Object.keys(p.r).length < 2 ? ' · ' + esc(p.other) : ''}</b></div>
        ${inc.ok ? `<div class="el-meta" style="display:block;margin:0 0 4px">Weight in today’s average: <b>${Math.round(im.weightNow * 100)}%</b> of all surveys</div>
        <div class="el-moves">${im.today.map(m => `<div><span class="el-sw" style="background:${C(m.key).color}"></span>${esc(PLAIN(m.key))}: average ${mv(m.without, m.with)}</div>`).join('')}</div>`
        : `<div class="el-flag">Not counted in the average: ${esc(inc.why)}</div>`}
        <div class="el-meta" style="display:block;margin-top:4px">${added(p)} · <a href="#" onclick="FactsElections.go('polls');return false" style="color:var(--gold)">full details ›</a></div>
      </div>`;
    };
    return `<div class="el-card el-newcard"><div class="el-lbl">What’s new · latest surveys</div>${items.map(row).join('')}</div>`;
  }

  // ── Chances of finishing first ──
  function chancesView() {
    const res = EL.chances(swing).slice().sort((a, b) => b.p - a.p);
    const S = SWINGS.find(x => x.k === swing);
    const rows = res.map(r => {
      const c = C(r.key), [sl, sc] = STATUS[c.status];
      return `<div class="el-crow">
        <div class="el-rtop"><div class="el-name"><span class="el-sw" style="background:${c.color}"></span>${esc(c.name)} <span class="el-st ${sc}">${sl}</span></div><div class="el-num">${chanceTxt(r.p)}</div></div>
        <div class="el-bar"><div class="el-fill" style="width:${Math.max(r.p * 100, 0.6)}%;background:${c.color}"></div></div>
        <div class="el-meta"><span>Poll average ${pct(r.avg)}</span><span>surveys disagree by ±${r.sd.toFixed(1)}</span></div>
      </div>`;
    }).join('');
    const hh = [['sara', 'leni'], ['sara', 'risa']].map(([a, b]) => { const p = EL.h2hChance(a, b, swing); return p == null ? '' :
      `<div class="el-hs"><span>${esc(PLAIN(a))} vs ${esc(PLAIN(b))}</span><span></span><span>${esc(PLAIN(a))}</span><span><b>${chanceTxt(p)}</b></span></div>`; }).join('');
    return `<div class="el-card">
      <div class="el-lbl">Chance of finishing first</div>
      <div class="el-seg" role="group" aria-label="How much can the race change">${SWINGS.map(x => `<button class="${x.k === swing ? 'on' : ''}" onclick="FactsElections.swing(${x.k})">${esc(x.label)}</button>`).join('')}</div>
      <p class="el-p" style="margin:8px 0 10px">${esc(S.note)}</p>
      ${rows}
      <div class="el-meta" style="display:block;margin-top:8px">Based on 20,000 simulated elections using the poll averages. Candidates asked about in only one survey are left out.</div>
    </div>
    <div class="el-card"><div class="el-lbl">One-on-one match-ups · same assumption</div>
      <div class="el-hs h"><span>Match-up</span><span></span><span>Chance for</span><span></span></div>${hh}
      <p class="el-p" style="margin-top:8px">From the head-to-head surveys, where voters choose between only two names.</p></div>
    <div class="el-note"><b>Read this before trusting any percentage.</b> Robredo and Tulfo have said they won’t run, and no one has filed yet; that happens in October 2027. Sara Duterte’s impeachment trial is ongoing, and a conviction would bar her from running. None of this is in the numbers above.</div>
    <div class="el-card"><div class="el-lbl">Why the swing matters so much</div>
      <p class="el-p">In the last two elections, the leader eight months out did not win:</p>
      <p class="el-p"><b>2016:</b> In September 2015, Pulse Asia had Grace Poe ahead at 26% and Rodrigo Duterte at 16%. Duterte won with 39%, a 23-point rise. <span class="el-src"><a href="https://newsinfo.inquirer.net/725880/poe-leads-pulse-asia-poll-roxas-binay-duterte-tied-in-2nd-place" target="_blank" rel="noopener">Inquirer ↗</a> · <a href="https://en.wikipedia.org/wiki/2016_Philippine_presidential_election" target="_blank" rel="noopener">results ↗</a></span></p>
      <p class="el-p"><b>2022:</b> In September 2021, Pulse Asia had Sara Duterte ahead at 20%, Bongbong Marcos at 15% and Leni Robredo at 8%. Sara Duterte ran for vice president instead; Marcos won with 58.8%, a 44-point rise, and Robredo got 27.9%. <span class="el-src"><a href="https://en.wikipedia.org/wiki/Opinion_polling_for_the_2022_Philippine_presidential_election" target="_blank" rel="noopener">polls & results ↗</a></span></p>
      <p class="el-p">That is why “Like 2016 & 2022” is the default here. Today we are ${Math.round((Date.parse('2028-05-08') - Date.parse(EL_AS_OF)) / DAYMS / 30.4)} months out, even earlier than those comparisons.</p></div>`;
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

  // ── Progress: the average as it stood on each date, and what each survey did to it ──
  function trend() {
    const keys = ['sara', 'leni', 'tulfo'];
    const t0 = Date.parse('2024-01-01'), t1 = Date.parse(EL_AS_OF);
    const W = 360, H = 230, L = 26, R = 8, T = 10, B = 22;
    const x = t => L + (t - t0) / (t1 - t0) * (W - L - R), y = v => T + (1 - v / 60) * (H - T - B);
    const mid = p => (Date.parse(p.start) + Date.parse(p.end)) / 2;
    let g = '';
    [0, 10, 20, 30, 40, 50, 60].forEach(v => g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--border)" stroke-width="${v ? .6 : 1}"/><text x="${L - 4}" y="${y(v) + 3}" text-anchor="end">${v}</text>`);
    ['2025', '2026'].forEach(yr => { const t = Date.parse(yr + '-01-01'); g += `<line x1="${x(t)}" x2="${x(t)}" y1="${T}" y2="${H - B}" stroke="var(--border)" stroke-width=".6" stroke-dasharray="2 3"/><text x="${x(t)}" y="${H - 8}" text-anchor="middle">${yr}</text>`; });
    g += `<text x="${x(t0) + 2}" y="${H - 8}">2024</text>`;
    keys.filter(k => !hidden.has(k)).forEach(k => {
      const c = C(k);
      // step through time weekly; the average only changes when a new survey comes out (and slowly as weights age)
      let path = '', pen = false;
      for (let t = t0; t <= t1 + 1; t += 7 * DAYMS) {
        const v = EL.averageAt(k, Math.min(t, t1));
        if (v == null) { pen = false; continue; }
        path += (pen ? 'L' : 'M') + x(Math.min(t, t1)).toFixed(1) + ',' + y(v).toFixed(1); pen = true;
      }
      g += `<path d="${path}" fill="none" stroke="${c.color}" stroke-width="2.6" stroke-linejoin="round" opacity=".95"/>`;
      EL_POLLS.filter(p => p.include !== false && p.r[k] != null && mid(p) >= t0).forEach(p =>
        g += `<circle cx="${x(mid(p)).toFixed(1)}" cy="${y(p.r[k]).toFixed(1)}" r="2.6" fill="${c.color}" fill-opacity=".25" stroke="${c.color}" stroke-opacity=".6" stroke-width=".8"><title>${esc(c.name)} ${p.r[k]}% · ${esc(p.pollster)} · ${range(p)}</title></circle>`);
    });
    const chips = keys.map(k => `<button class="el-chip${hidden.has(k) ? ' off' : ''}" onclick="FactsElections.toggle('${k}')"><span class="el-sw" style="background:${C(k).color}"></span>${esc(C(k).name)}</button>`).join('');

    // Change log: every survey in the 12-month window, newest first
    const log = EL_POLLS.filter(p => p.include !== false && (Date.parse(EL_AS_OF) - EL.avail(p)) / DAYMS <= 400)
      .sort((a, b) => EL.avail(b) - EL.avail(a)).map(p => {
        const im = EL.impact(p, keys);
        return `<div class="el-log">
          <div class="el-ptop"><span class="el-pname">${esc(p.pollster)}</span><span class="el-pdate">out ${fmtD(new Date(im.when).toISOString().slice(0, 10), { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
          <div class="el-meta" style="display:block;margin:2px 0 4px">Weight when it came out: <b>${Math.round(im.weightThen * 100)}%</b> · today: <b>${Math.round(im.weightNow * 100)}%</b> <span style="color:var(--muted)">(newer surveys take over as it ages)</span></div>
          <div class="el-moves">${im.moves.map(m => `<div><span class="el-sw" style="background:${C(m.key).color}"></span>${esc(PLAIN(m.key))} ${pct(p.r[m.key])} → average ${m.before == null ? `starts at ${pct(m.after)}` : mv(m.before, m.after)}</div>`).join('')}</div>
        </div>`;
      }).join('');

    const now = keys.map(k => ({ k, v: EL.averageAt(k, Date.parse(EL_AS_OF)), v3: EL.averageAt(k, Date.parse(EL_AS_OF) - 90 * DAYMS), v12: EL.averageAt(k, Date.parse(EL_AS_OF) - 365 * DAYMS) }));
    return `<div class="el-card"><div class="el-lbl">The poll average over time</div>
      <div class="el-chips">${chips}</div>
      <svg class="el-chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Poll average over time">${g}</svg>
      <p class="el-p" style="margin-top:6px">Lines show the weighted average as it stood on each date, using only surveys public by then. Faint dots are individual surveys.</p>
      <div style="margin-top:8px"><div class="el-hs h"><span>Average</span><span>now</span><span>3 mo ago</span><span>1 yr ago</span></div>
      ${now.map(n => `<div class="el-hs"><span><span class="el-sw" style="background:${C(n.k).color}"></span> ${esc(C(n.k).name)}</span><span><b>${pct(n.v)}</b></span><span>${pct(n.v3)}</span><span>${pct(n.v12)}</span></div>`).join('')}</div></div>
      <div class="el-card"><div class="el-lbl">What each survey did to the average</div>
      <p class="el-p" style="margin-bottom:8px">Newest first. Each row shows that survey's numbers and how the average moved the day it came out.</p>${log}</div>
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
      <div class="el-card"><div class="el-lbl">How the Chances tab works</div>
      <p class="el-p">We simulate the election 20,000 times. In each run, every candidate's share starts at their poll average and moves by two random amounts: one for how much the surveys disagree about them, and one for how much the race can change before election day (the "swing" you choose). Whoever is highest wins that run. A candidate's chance is the share of runs they win.</p>
      <div class="el-formula">share = average + N(0, survey disagreement) + N(0, swing)</div>
      <p class="el-p">Swing choices: 0, 8, 15 or 25 points. The default, 25, matches the size of the late moves in 2016 and 2022. The model can't know who will actually file, the impeachment outcome, or alliances, so treat these as "what the surveys imply under this assumption", not predictions.</p></div>
      <div class="el-card"><div class="el-lbl">What gets included</div>
      <p class="el-p">Published surveys from named firms with a fieldwork date and sample size. Commissioned surveys are included and flagged. A survey stays out of the average if it left out a front-runner, if its figures can't be confirmed, or if it's over a year old. Excluded surveys still appear on the All surveys tab, with the reason.</p>
      <p class="el-p">Not included: online "polls" anyone can vote in, social media engagement counts, and unsourced survey images (Rappler has fact-checked AI-generated ones).</p></div>
      <div class="el-card"><div class="el-lbl">Corrections</div>
      <p class="el-p">Where sources disagree, the conflict is noted on that survey's card along with the figure we used. Spotted an error or a survey we missed? Email <a href="mailto:hello@factsph.app?subject=2028%20polls%20correction">hello@factsph.app</a>.</p></div>`;
  }

  // ── Senate ──
  const SEN_SWINGS = [
    { k: 0, label: 'If the vote were today', note: 'Only the uncertainty in today’s surveys.' },
    { k: 5, label: 'Some changes', note: 'Each name’s share could move about 5 points either way by election day.' },
    { k: 10, label: 'Big changes', note: 'Each name’s share could move about 10 points either way by election day.' },
  ];
  let senSwing = (() => { const v = store.get('factsph-sen-swing'); return SEN_SWINGS.some(x => String(x.k) === v) ? +v : 5; })();
  const senLink = n => SEN_PEOPLE[n] && SEN_PEOPLE[n].note ? `<div class="sn-sub">${esc(SEN_PEOPLE[n].note)}</div>` : '';
  function senateView() {
    if (!ELS.total) return `<div class="el-card"><p class="el-p">No Senate surveys have been added yet.</p></div>`;
    const res = ELS.top12(senSwing);
    const max = Math.max(...res.map(r => r.max), 1);
    const S = SEN_SWINGS.find(x => x.k === senSwing);
    const SHOW = 20, rest = res.slice(SHOW);
    const rows = res.slice(0, SHOW).map((r, i) => `${i === 12 ? '<div class="sn-cut">12 seats · cut-off</div>' : ''}
      <div class="sn-row" onclick="this.nextElementSibling.classList.toggle('open')" style="cursor:pointer">
        <div class="sn-rank">${i + 1}</div>
        <div><div class="sn-name">${esc(r.name)}</div>
          <div class="sn-bar${i >= 12 ? ' out' : ''}"><i style="width:${r.avg / max * 100}%"></i>${r.polls > 1 ? `<b style="left:${r.min / max * 100}%;width:${(r.max - r.min) / max * 100}%"></b>` : ''}</div>
          <div class="sn-sub">Range ${pct(r.min)}–${pct(r.max)} · in ${r.polls} of ${r.of} surveys</div>${senLink(r.name)}</div>
        <div class="sn-num">${pct(r.avg)}<span class="sn-chance">${chanceTxt(r.p)} top-12 chance</span></div>
      </div>
      <div class="el-parts">${r.parts.slice().sort((a, b) => b.share - a.share).map(({ p, v, share }) => `<div class="el-part"><span><b>${esc(p.pollster)}</b> · ${range(p)}</span><span style="text-align:right">${pct(v)}</span><span><div class="el-wbar" style="width:${Math.max(4, share * 100)}%"></div><div style="font-size:calc(12px*var(--ts,1));color:var(--muted)">${Math.round(share * 100)}% wt</div></span></div>`).join('')}</div>`).join('');
    const more = rest.length ? `<div class="el-meta" style="display:block;margin-top:10px">Also averaged, below #${SHOW}: ${rest.map(r => `${esc(r.name)} ${pct(r.avg)}`).join('; ')}.</div>` : '';
    const singles = ELS.single.length ? `<div class="el-meta" style="display:block;margin-top:10px">In only one survey so far, so not averaged: ${ELS.single.slice(0, 12).map(r => `${esc(r.name)} ${pct(r.avg)} (${esc(r.parts[0].p.pollster)})`).join('; ')}${ELS.single.length > 12 ? `; and ${ELS.single.length - 12} more` : ''}.</div>` : '';
    const polls = EL_SEN_POLLS.map(p => {
      const inc = ELS.inAverage(p);
      const top = Object.entries(p.r).sort((a, b) => b[1] - a[1]);
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
        <ol class="el-p" style="margin:0 0 0 22px;columns:2;column-gap:18px">${top.slice(0, 16).map(([n, v]) => `<li style="break-inside:avoid">${esc(n)} <b>${pct(v)}</b></li>`).join('')}</ol>
        ${top.length > 16 ? `<div class="el-meta" style="display:block">…and ${top.length - 16} more names</div>` : ''}
        ${p.q ? `<div class="el-meta" style="display:block;margin-top:4px">${esc(p.q)}</div>` : ''}
        ${(p.flags || []).map(f => `<div class="el-flag">⚠ ${esc(f)}</div>`).join('')}
        <div class="el-inc ${inc.ok ? 'y' : 'n'}">${inc.ok ? '✓ In the Senate average' : `✕ Not in the average · ${esc(inc.why)}`}</div>
        <div class="el-src">${links(p.src)}</div>
      </div>`;
    }).join('');
    return `<div class="el-card">
        <div class="el-lbl">How the Senate race works</div>
        <p class="el-p">12 of the 24 Senate seats are up in May 2028. Each voter can pick up to 12 names, and the 12 with the most votes win. Surveys ask the same way, so a name’s percentage is the share of voters who included them in their list.</p>
      </div>
      <div class="el-card">
        <div class="el-lbl">Weighted average · ${ELS.used.length} survey${ELS.used.length === 1 ? '' : 's'}</div>
        <div class="el-seg" style="grid-template-columns:1fr 1fr 1fr">${SEN_SWINGS.map(x => `<button class="${x.k === senSwing ? 'on' : ''}" onclick="FactsElections.senSwing(${x.k})">${esc(x.label)}</button>`).join('')}</div>
        <p class="el-p" style="margin:8px 0 6px">${esc(S.note)} The “top-12 chance” is how often each name finished in the top 12 across 10,000 simulated elections. Tap a name to see which surveys its average comes from.</p>
        ${rows}${more}${singles}
      </div>
      <div class="el-note">No one has filed to run yet; that happens in October 2027. Surveys this early mostly measure name recognition.</div>
      <div class="el-card"><div class="el-lbl">The Senate surveys</div></div>${polls}`;
  }

  // ── VP Trial ──
  function trialView() {
    const T = EL_TRIAL;
    if (!T) return `<div class="el-card"><p class="el-p">Trial information is being updated.</p></div>`;
    const seats = Array.from({ length: T.seats.total }, (_, i) => `<span class="${i >= T.seats.eligible ? 'off' : i < T.seats.needed ? 'need' : ''}"></span>`).join('');
    const op = (T.opinion || []).map(o => {
      const u = Math.max(0, 100 - o.convict - o.acquit);
      return `<div class="tr-op">
        <div class="el-ptop"><span class="el-pname">${esc(o.pollster)}</span><span class="el-pdate">${range(o)}</span></div>
        <div class="el-meta" style="display:block;margin:2px 0 6px">${esc(o.q)}${o.n ? ` · n = ${o.n.toLocaleString()}` : ''}${o.moe ? ` · ±${o.moe} pts` : ''}</div>
        <div class="tr-opbar" role="img" aria-label="${esc(o.convictLbl || 'Convict')} ${o.convict}%, ${esc(o.acquitLbl || 'Acquit')} ${o.acquit}%, undecided ${u}%">
          <div class="cv" style="width:${o.convict}%">${o.convict}%</div><div class="un" style="width:${u}%">${u >= 8 ? u + '%' : ''}</div><div class="aq" style="width:${o.acquit}%">${o.acquit}%</div></div>
        <div class="el-meta"><span>■ ${esc(o.convictLbl || 'Convict')}</span><span>Undecided / other</span><span>${esc(o.acquitLbl || 'Acquit')} ■</span></div>
        ${o.note ? `<div class="el-meta" style="display:block">${esc(o.note)}</div>` : ''}
        <div class="el-src">${links(o.src)}</div>
      </div>`;
    }).join('<div style="height:1px;background:var(--border);margin:10px 0"></div>');
    return `<div class="el-card">
        <div class="el-lbl">Where the trial stands · as of ${fmtD(T.asOf)}</div>
        <div class="tr-stage">${esc(T.stage)}</div>
        ${T.details.map(d => `<p class="el-p">${esc(d)}</p>`).join('')}
        <div class="el-src" style="margin-top:6px">${links(T.stageSrc)}</div>
      </div>
      <div class="el-card">
        <div class="el-lbl">Votes needed to convict</div>
        <div class="el-h">${T.seats.needed} of ${T.seats.eligible} senator-judges</div>
        <div class="tr-seats" role="img" aria-label="${T.seats.needed} of ${T.seats.eligible} votes needed; ${T.seats.total - T.seats.eligible} senators not taking part">${seats}</div>
        <div class="tr-key"><span><i style="background:#2f6db5;border-color:#2f6db5"></i>Votes needed (${T.seats.needed})</span><span><i style="background:var(--s3)"></i>Other senator-judges (${T.seats.eligible - T.seats.needed})</span><span><i style="border-style:dashed"></i>Not taking part (${T.seats.total - T.seats.eligible})</span></div>
        <p class="el-p" style="margin-top:8px">${esc(T.seats.note)}</p>
        <div class="el-src">${links(T.seats.src)}</div>
      </div>
      <div class="el-card">
        <div class="el-lbl">If she is convicted / acquitted</div>
        ${T.outcomes.map(d => `<p class="el-p">${esc(d)}</p>`).join('')}
        <div class="el-src">${links(T.outcomesSrc)}</div>
      </div>
      ${op ? `<div class="el-card"><div class="el-lbl">What the public says</div>${op}</div>` : ''}
      <div class="el-card"><div class="el-lbl">Timeline</div><div class="el-tl">${T.timeline.map(t =>
        `<div class="el-tli${t.future ? ' f' : ''}"><small>${fmtD(t.date)}</small><span>${esc(t.text)}</span> <a href="${esc(t.src)}" target="_blank" rel="noopener">source ↗</a></div>`).join('')}</div></div>
      <div class="el-note">FactsPH does not predict how individual senators will vote. Positions are shown only when a senator has stated them publicly, with a source.</div>`;
  }

  const VIEWS = { overview, chances: chancesView, h2h, polls, trend, pollsters, method };
  function render() {
    if (section === 'senate' && ELS.latest) store.set('factsph-sen-seen', new Date(ELS.addedOn(ELS.latest)).toISOString().slice(0, 10));
    tabs();
    $('#el-body').innerHTML = section === 'senate' ? senateView() : section === 'trial' ? trialView() : VIEWS[cur]();
  }
  // A survey added since this device last opened the 2028 tab (and within 14 days) counts as "new"
  function newSurvey() {
    const p = EL.updates[0], h = EL.h2hUpdates[0];
    const fresh = x => x && (Date.now() - EL.addedOn(x)) / DAYMS <= 14 && isNew(x);
    const pick = [p, h].filter(fresh).sort((a, b) => EL.addedOn(b) - EL.addedOn(a))[0];
    if (!pick) return null;
    if (pick === h) return { pollster: h.pollster, dates: range(h), top: `${PLAIN(h.a)} ${pct(h.va, 0)} vs ${PLAIN(h.b)} ${pct(h.vb, 0)}, one-on-one` };
    const top = Object.entries(p.r).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, v]) => `${C(k) ? PLAIN(k) : k} ${pct(v)}`).join(', ');
    return { pollster: p.pollster, dates: range(p), top };
  }

  window.FactsElections = {
    open() { panel.style.display = 'block'; render(); panel.scrollTop = 0; if (location.hash !== '#2028') history.replaceState(null, '', '#2028');
      store.set('factsph-el-seen', EL.latestUpdate); if (window.onElectionsSeen) window.onElectionsSeen(); },
    newSurvey,
    swing(k) { swing = k; store.set('factsph-swing', String(k)); render(); },
    senSwing(k) { senSwing = k; store.set('factsph-sen-swing', String(k)); render(); },
    section(k) { section = k; store.set('factsph-el-section', k); render(); panel.scrollTop = 0; },
    close() { panel.style.display = 'none'; if (location.hash === '#2028') history.replaceState(null, '', location.pathname); },
    go(k) { cur = k; section = 'president'; store.set('factsph-el-section', 'president'); render(); panel.scrollTop = 0; },
    toggle(k) { hidden.has(k) ? hidden.delete(k) : hidden.add(k); render(); },
  };
  if (location.hash === '#2028' && typeof showView === 'function') showView('elections');
})();
