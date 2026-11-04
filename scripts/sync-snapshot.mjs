/* Refresh src/data/snapshot.json from the published Google Sheet.
   Usage: SHEET_PUB_BASE="https://docs.google.com/spreadsheets/d/e/<key>/pub" npm run sync
   The snapshot is only the fallback shown if /api/content is unreachable; the live site reads the Sheet. */
import { writeFileSync } from 'node:fs';
import { parseCSV } from '../src/lib/content.js';

const GIDS = { Profile: 1, HeroStats: 2, Cases: 3, CaseMetrics: 4, CreativeSkills: 5, Channels: 6, Experience: 7, Tools: 8, Offer: 1873816816 };
const base = process.env.SHEET_PUB_BASE;
if (!base) { console.error('Set SHEET_PUB_BASE first.'); process.exit(1); }
const out = {};
for (const [tab, gid] of Object.entries(GIDS)) {
  const r = await fetch(`${base}?gid=${gid}&single=true&output=csv`);
  if (!r.ok) { console.error(`${tab}: HTTP ${r.status}`); process.exit(1); }
  const rows = parseCSV(await r.text());
  const note = rows[0].indexOf('note');
  out[tab] = note < 0 ? rows : rows.map(x => x.filter((_, i) => i !== note));
  console.log(tab, rows.length - 1, 'rows');
}
writeFileSync(new URL('../src/data/snapshot.json', import.meta.url), JSON.stringify(out));
