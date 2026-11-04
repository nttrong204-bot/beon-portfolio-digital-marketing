/* Build snapshot files from a Sheet export (text with "## Sheet name: X" headings, CSV below each).
   Usage: node scripts/import-export.mjs <export-file> */
import { readFileSync, writeFileSync } from 'node:fs';
import { parseCSV, TAB_NAMES } from '../src/lib/content.js';
const txt = readFileSync(process.argv[2], 'utf8');
const parts = txt.split(/^## Sheet name: /m).slice(1);
const pub = {}, priv = {};
for (const p of parts) {
  const nl = p.indexOf('\n'); const name = p.slice(0, nl).trim();
  let rows = parseCSV(p.slice(nl + 1).trim()).filter(r => r.some(c => String(c).trim() !== ''));
  const ni = rows[0].findIndex(h => String(h).trim().toLowerCase() === 'note');
  if (ni >= 0) rows = rows.map(r => r.filter((_, i) => i !== ni));
  if (TAB_NAMES.includes(name)) pub[name] = rows; else if (name === 'Bot') priv[name] = rows;
  console.log(name, rows.length - 1, TAB_NAMES.includes(name) ? 'public' : name === 'Bot' ? 'private' : 'skipped');
}
writeFileSync(new URL('../src/data/snapshot.json', import.meta.url), JSON.stringify(pub));
writeFileSync(new URL('../api/bot-snapshot.json', import.meta.url), JSON.stringify(priv));
