import { esc } from './content.js';

export function shape(b, fill, stroke) {
  const a = ' fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="5"' : '');
  if (b.sh === 'ci') return '<circle cx="50" cy="50" r="44"' + a + '/>';
  if (b.sh === 'hx') return '<polygon points="50,6 89,28 89,72 50,94 11,72 11,28"' + a + '/>';
  if (b.sh === 'di') return '<rect x="18" y="18" width="64" height="64" rx="14" transform="rotate(45 50 50)"' + a + '/>';
  return '<rect x="6" y="6" width="88" height="88" rx="24"' + a + '/>';
}
const fsz = b => (b.mk.length > 1 ? 34 : 42);

export function logoBody(b, id) {
  return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + b.col[0] + '"/><stop offset="1" stop-color="' + b.col[1] + '"/></linearGradient></defs>' +
    shape(b, 'url(#' + id + ')') +
    '<text x="50" y="52" text-anchor="middle" dominant-baseline="central" font-family="Unbounded,Segoe UI,Arial,sans-serif" font-weight="600" font-size="' + fsz(b) + '" fill="#0e1012">' + esc(b.mk) + '</text>';
}

export function monoBody(b) {
  return shape(b, 'none', 'currentColor') +
    '<text x="50" y="52" text-anchor="middle" dominant-baseline="central" font-family="Unbounded,Segoe UI,Arial,sans-serif" font-weight="600" font-size="' + (b.mk.length > 1 ? 32 : 38) + '" fill="currentColor">' + esc(b.mk) + '</text>';
}

/* Cover art for the 3D ring: an SVG data URI built from real case data only. */
function wrap(s, n, max) {
  const w = String(s).split(/\s+/), lines = [];
  let cur = '';
  w.forEach(x => { if (cur && (cur + ' ' + x).length > n) { lines.push(cur); cur = x; } else cur = cur ? cur + ' ' + x : x; });
  if (cur) lines.push(cur);
  return lines.slice(0, max);
}

export function coverUri(c, { k, name, dur, nf }) {
  const b = c.b, q = c.m[0];
  const ff = 'Unbounded,Segoe UI,Helvetica,Arial,sans-serif', fb = 'Be Vietnam Pro,Segoe UI,Helvetica,Arial,sans-serif';
  const tag = { ads: 'ADS', kol: 'KOL', concept: 'CONCEPT' }[c.skill] || '';
  const lines = wrap(name, 18, 3), y = 232;
  let nm = '';
  lines.forEach((l, i) => { nm += '<text x="56" y="' + (y + i * 50) + '" font-size="40" font-weight="600" fill="#eceef1" font-family="' + ff + '">' + esc(l) + '</text>'; });
  const yi = y + (lines.length - 1) * 50 + 46, info = [c.co, dur].filter(Boolean).join(' · ');
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">' +
    '<defs><radialGradient id="gl" cx="0.9" cy="0" r="0.8"><stop offset="0" stop-color="' + b.col[0] + '" stop-opacity=".22"/><stop offset="1" stop-color="' + b.col[0] + '" stop-opacity="0"/></radialGradient></defs>' +
    '<rect width="640" height="800" fill="#16191c"/><rect width="640" height="800" fill="url(#gl)"/>' +
    '<svg x="56" y="56" width="96" height="96" viewBox="0 0 100 100">' + logoBody(b, 'lg') + '</svg>' +
    '<text x="584" y="92" text-anchor="end" font-size="20" letter-spacing="4" fill="#9097a0" font-family="' + fb + '">' + tag + '</text>' + nm +
    '<text x="56" y="' + yi + '" font-size="26" fill="#9097a0" font-family="' + fb + '">' + esc(b.ind[k]) + '</text>' +
    (q ? '<text x="50" y="520" font-size="' + (nf(q[0]).length > 5 ? 104 : 128) + '" font-weight="500" letter-spacing="-6" fill="#eceef1" font-family="' + ff + '">' + esc(nf(q[0])) + '</text>' +
      '<text x="56" y="574" font-size="27" fill="#c3c8cf" font-family="' + fb + '">' + esc(q[k + 1]) + '</text>' : '') +
    '<rect x="56" y="690" width="528" height="2" fill="#ffffff" fill-opacity=".1"/>' +
    '<text x="56" y="738" font-size="24" fill="#9097a0" font-family="' + fb + '">' + esc(info) + '</text></svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
