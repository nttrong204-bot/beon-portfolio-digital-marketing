import { createContext, useContext, useId } from 'react';
import { L } from './lib/strings.js';
import { nf as nfRaw } from './lib/content.js';
import { logoBody, monoBody } from './lib/marks.js';

export const reduce = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const Ctx = createContext(null);
export const useC = () => useContext(Ctx);

export function makeCtx(lang, M, open, toast) {
  const k = lang === 'vi' ? 0 : 1;
  return {
    lang, k, ix: k + 1, M, open, toast,
    t: key => { const v = L[key]; return v ? v[k] : key; },
    nf: v => nfRaw(v, lang),
    V: (vi, en) => (k === 0 ? vi : en),
    pf: key => { const v = M.P[key]; return v ? v[k] : ''; },
    byId: id => M.D.find(d => d.id === id),
    bname: c => (c.b.hid ? (c.b.ind[k] || '') : c.b.n),
    dur: c => (c.months ? c.months + ' ' + L.months[k] : (c.per[k] || ''))
  };
}

export function Icon({ id, flip }) {
  return <svg className={'i' + (flip ? ' flip' : '')}><use href={'#i-' + id} /></svg>;
}

export function Logo({ b }) {
  const { k } = useC();
  const rid = useId().replace(/:/g, '');
  if (b.logo) return <img className="lg" src={b.logo} alt={b.n + ' logo'} />;
  return <svg viewBox="0 0 100 100" role="img" aria-label={b.n || b.ind[k]} dangerouslySetInnerHTML={{ __html: logoBody(b, 'lg' + rid) }} />;
}

export function Mono({ b }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true" dangerouslySetInnerHTML={{ __html: monoBody(b) }} />;
}
