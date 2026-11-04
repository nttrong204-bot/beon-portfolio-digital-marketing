/* Content model. Turns the Google Sheet tabs (arrays of rows, row 1 = headers) into the objects the page renders.
   Placeholders such as [cần xác nhận: ...] and [to confirm: ...] are dropped here, so they never reach the page. */

export const TAB_NAMES = ['Profile', 'HeroStats', 'Cases', 'CaseMetrics', 'CreativeSkills', 'Channels', 'Experience', 'Tools', 'Offer'];

export function parseCSV(s) {
  const rows = [];
  let r = [], f = '', q = false, i = 0, c;
  for (; i < s.length; i++) {
    c = s[i];
    if (q) {
      if (c === '"') { if (s[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { r.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && s[i + 1] === '\n') i++; r.push(f); rows.push(r); r = []; f = ''; }
    else f += c;
  }
  if (f !== '' || r.length) { r.push(f); rows.push(r); }
  return rows;
}

export function esc(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* Escape everything, then allow only <b> and </b> (the Sheet uses them for bold in the intro). */
export function safeB(s) {
  return esc(s).replace(/&lt;(\/?)b&gt;/gi, '<$1b>');
}

export const isPH = s => /\[(cần xác nhận|to confirm)/i.test(String(s));
export function cl(s) {
  s = String(s == null ? '' : s).trim();
  if (!s || isPH(s) || /^(không áp dụng|not applicable)$/i.test(s)) return '';
  return s.replace(/^\[(Bản nháp|Draft)\]\s*/i, '');
}
export const B = v => v === true || /^true$/i.test(String(v).trim());
export const parts = s => String(s == null ? '' : s).split(/\s*[·;]\s*/).map(cl).filter(Boolean);
export const byOrder = (a, b) => (+a.order || 0) - (+b.order || 0);

/* English-style numbers in the Sheet (1.4%, 2,000) become Vietnamese-style (1,4%, 2.000) when VI is selected. */
export function nf(v, lang) {
  v = String(v);
  if (lang !== 'vi') return v;
  return v.replace(/(\d),(\d{3})/g, '$1\u0001$2').replace(/(\d)\.(\d)/g, '$1,$2').replace(/\u0001/g, '.');
}
export function split2(s) {
  const m = String(s).match(/^(.*?)(\d[\d.,]*%?)\s+(.*)$/);
  return m ? [m[2], ((m[1] ? m[1].trim() + ' ' : '') + m[3]).trim()] : null;
}

export function rowsOf(S, tab) {
  const a = S[tab] || [], h = a[0] || [];
  return a.slice(1).map(r => {
    const o = {};
    h.forEach((k, i) => { o[k] = r[i] == null ? '' : r[i]; });
    return o;
  });
}

/* ---------- brand marks (monogram, not real logos unless logo_url is set) ---------- */
export function mark(name) {
  const w = String(name).replace(/[:()!&,]/g, ' ').split(/\s+/).filter(x => /[A-Za-zÀ-ỹ0-9]/.test(x));
  return ((w[0] ? w[0].charAt(0) : '?') + (w[1] ? w[1].charAt(0) : '')).toUpperCase();
}
function pal(co, type) {
  const c = String(co).toLowerCase();
  if (type === 'concept') return { col: ['#cfd3d9', '#9aa1ab'], sh: 'ci' };
  if (/indiez/.test(c)) return { col: ['#a9bcff', '#7f95ff'], sh: 'sq' };
  if (/imcn/.test(c)) return { col: ['#7fe3cf', '#4cc3b0'], sh: 'ci' };
  if (/sony/.test(c)) return { col: ['#c5b3ff', '#9d86ff'], sh: 'hx' };
  if (/heineken/.test(c)) return { col: ['#8fe0a0', '#5bc277'], sh: 'di' };
  return { col: ['#a9bcff', '#7f95ff'], sh: 'sq' };
}
export function brandOf(name, co, type, ind, logo) {
  const p = pal(co || name, type);
  return { n: name, mk: mark(name), col: p.col, sh: p.sh, ind, logo: logo || '' };
}

const splitBar = s => String(s || '').split(/\s*\|\s*/);

export function buildModel(S) {
  const P = {};
  rowsOf(S, 'Profile').forEach(r => { P[r.key] = [cl(r.vi), cl(r.en)]; });

  const met = {};
  rowsOf(S, 'CaseMetrics').forEach(r => {
    (met[r.case_id] = met[r.case_id] || []).push({ s: +r.slot || 0, v: String(r.value).replace(/^'/, ''), vi: cl(r.label_vi), en: cl(r.label_en) });
  });

  const D = rowsOf(S, 'Cases').filter(r => B(r.show)).sort(byOrder).map(r => {
    const m = (met[r.id] || []).sort((a, b) => a.s - b.s).map(q => [q.v, q.vi, q.en]);
    const show = B(r.show_brand), ind = [cl(r.industry_vi), cl(r.industry_en)];
    const b = brandOf(show ? r.brand : ind[0] + ' / ' + ind[1], r.company, r.type, ind, show ? cl(r.logo_url) : '');
    b.n = show ? r.brand : ''; b.hid = !show;
    return {
      id: r.id, skill: r.skill, type: r.type, feat: B(r.featured), months: +r.months || 0, co: cl(r.company),
      per: [cl(r.period_vi), cl(r.period_en)], ch: parts(r.channels), b, m,
      imgs: parts(r.chart_image).filter(u => /^(https?:\/\/|data:image\/|[\w\-./]+\.(png|jpe?g|webp|gif|svg|avif))/i.test(u)),
      vi: { title: cl(r.title_vi), ctx: cl(r.context_vi), goal: cl(r.goal_vi), str: cl(r.strategy_vi), role: cl(r.role_vi), les: cl(r.lesson_vi) },
      en: { title: cl(r.title_en), ctx: cl(r.context_en), goal: cl(r.goal_en), str: cl(r.strategy_en), role: cl(r.role_en), les: cl(r.lesson_en) }
    };
  });

  const HS = rowsOf(S, 'HeroStats').sort(byOrder).map(r => ({
    v: String(r.value).replace(/^'/, ''), l: [cl(r.label_vi), cl(r.label_en)], s: [cl(r.source_vi), cl(r.source_en)]
  }));

  const OFFER = rowsOf(S, 'Offer').filter(r => r.show === '' || B(r.show)).sort(byOrder).map(r => {
    const pv = splitBar(r.points_vi), pe = splitBar(r.points_en);
    return {
      id: r.id, to: r.to || '#projects', t: [cl(r.title_vi), cl(r.title_en)], d: [cl(r.desc_vi), cl(r.desc_en)],
      f: pv.map((v, i) => [cl(v), cl(pe[i])]).filter(x => x[0] && x[1]),
      p: [cl(r.proof_vi), cl(r.proof_en)]
    };
  }).filter(o => o.t[0] && o.t[1]);

  return {
    P, D, HS, OFFER,
    XP: rowsOf(S, 'Experience').sort(byOrder),
    TL: rowsOf(S, 'Tools').sort(byOrder),
    CR: rowsOf(S, 'CreativeSkills').sort(byOrder),
    CH: rowsOf(S, 'Channels').sort(byOrder)
  };
}
