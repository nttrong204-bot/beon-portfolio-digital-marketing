/* Live content. The site first renders from the bundled snapshot (instant, works offline), then asks /api/content,
   which reads the published Google Sheet on the server. Tabs that fail to load keep the snapshot values. */
export async function loadLive() {
  try {
    const r = await fetch('/api/content', { headers: { Accept: 'application/json' } });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j || typeof j !== 'object' || !j.Cases || !j.Profile) return null;
    return j;
  } catch {
    return null;
  }
}
