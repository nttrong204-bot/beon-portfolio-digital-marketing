import { loadTabs, publicTabs } from './_sheet.js';

export default async function handler(req, res) {
  try {
    const { tabs, live } = await loadTabs();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=60');
    res.status(200).json({ ...publicTabs(tabs), _live: live });
  } catch {
    res.status(502).json({ error: 'content_unavailable' });
  }
}
