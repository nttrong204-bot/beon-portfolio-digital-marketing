/* Shared helpers for the serverless functions: read the published Google Sheet tabs as CSV (server side),
   cache them for a few minutes, and fall back to the snapshot bundled with the site if the Sheet is unreachable. */
import { parseCSV, TAB_NAMES } from '../src/lib/content.js';
import snapshot from '../src/data/snapshot.json' with { type: 'json' };
import botSnapshot from './bot-snapshot.json' with { type: 'json' };

/* gid of each tab in the Sheet (the number after gid= in the tab's URL) */
export const GIDS = {
  Profile: 1, HeroStats: 2, Cases: 3, CaseMetrics: 4, CreativeSkills: 5, Channels: 6,
  Experience: 7, Tools: 8, Offer: 1873816816, Bot: 665885387
};

/* Columns that are internal notes and must never reach the public site or the bot. */
const PRIVATE_COLUMNS = ['note'];

const TTL = 60 * 1000;
let cache = { at: 0, data: null };

function csvUrl(tab) {
  const override = process.env['SHEET_CSV_' + tab.toUpperCase()];
  if (override) return override;
  const base = process.env.SHEET_PUB_BASE; // https://docs.google.com/spreadsheets/d/e/<key>/pub
  if (!base) return '';
  return `${base}?gid=${GIDS[tab]}&single=true&output=csv`;
}

function stripPrivate(rows) {
  if (!rows.length) return rows;
  const keep = rows[0].map((h, i) => (PRIVATE_COLUMNS.includes(String(h).trim().toLowerCase()) ? -1 : i)).filter(i => i >= 0);
  return rows.map(r => keep.map(i => (r[i] == null ? '' : r[i])));
}

/* Returns { tabs, live }: tabs = every tab (public and Bot), live = true when at least the core tabs came from the Sheet. */
export async function loadTabs() {
  if (cache.data && Date.now() - cache.at < TTL) return cache.data;
  const tabs = { ...snapshot, ...botSnapshot };
  let loaded = 0;
  await Promise.all(Object.keys(GIDS).map(async tab => {
    const url = csvUrl(tab);
    if (!url) return;
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!r.ok) throw new Error(String(r.status));
      const text = await r.text();
      if (/^\s*<(!doctype|html)/i.test(text)) throw new Error('not csv');
      const rows = parseCSV(text);
      if (rows.length > 1) { tabs[tab] = stripPrivate(rows); loaded++; }
    } catch { /* keep the snapshot for this tab */ }
  }));
  const data = { tabs, live: loaded > 0 };
  cache = { at: Date.now(), data };
  return data;
}

/* Public tabs only (the Bot tab holds chatbot rules, not page content). */
export function publicTabs(tabs) {
  const out = {};
  TAB_NAMES.forEach(n => { if (tabs[n]) out[n] = stripPrivate(tabs[n]); });
  return out;
}
