import { useCallback, useEffect, useRef, useState } from 'react';
import { useC, reduce, Icon } from '../ctx.jsx';

const pad2 = n => (n < 10 ? '0' : '') + n;

export default function Offer() {
  const { t, k, M } = useC();
  const O = M.OFFER, n = O.length;
  const el = useRef(null);
  const [st, setSt] = useState({ i: 0, bar: 1 / Math.max(1, n), prev: true, next: false });

  const step = () => { const c = el.current && el.current.querySelector('.ch'); return c ? c.offsetWidth + 16 : 300; };
  const update = useCallback(() => {
    const e = el.current; if (!e || !n) return;
    const i = Math.min(n - 1, Math.max(0, Math.round(e.scrollLeft / step())));
    const max = e.scrollWidth - e.clientWidth;
    setSt({ i, bar: max > 0 ? Math.max(1 / n, e.scrollLeft / max) : 1, prev: e.scrollLeft < 4, next: e.scrollLeft > max - 4 });
  }, [n]);

  useEffect(() => {
    const e = el.current; if (!e) return undefined;
    let dr = null;
    const down = ev => {
      if (ev.pointerType !== 'mouse' || ev.target.closest('a,button')) return;
      dr = { x: ev.clientX, l: e.scrollLeft }; e.classList.add('drag');
    };
    const move = ev => { if (dr) e.scrollLeft = dr.l - (ev.clientX - dr.x); };
    const up = () => { if (!dr) return; dr = null; e.classList.remove('drag'); };
    e.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('resize', update);
    update();
    return () => {
      e.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('resize', update);
    };
  }, [update]);
  useEffect(update, [update, k, M]);

  if (!n) return null;
  const by = d => el.current && el.current.scrollBy({ left: d * step(), behavior: reduce ? 'auto' : 'smooth' });

  return (
    <section id="offer" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh"><h2>{t('of.h')}</h2><p>{t('of.s')}</p></div>
        <div className="sbar">
          <span className="num" aria-live="polite">{pad2(st.i + 1)} / {pad2(n)}</span>
          <div className="sprog" aria-hidden="true"><i style={{ transform: 'scaleX(' + st.bar + ')' }} /></div>
          <div className="sbtn">
            <button className="btn sm" type="button" aria-label={t('of.prev')} disabled={st.prev} onClick={() => by(-1)}><Icon id="right" flip /></button>
            <button className="btn sm" type="button" aria-label={t('of.next')} disabled={st.next} onClick={() => by(1)}><Icon id="right" /></button>
          </div>
        </div>
      </div>
      <div className="story" ref={el} tabIndex={0} role="region" aria-label={t('of.h')} onScroll={update}>
        {O.map((s, i) => (
          <article className="ch" id={'ch-' + s.id} aria-label={s.t[k]} key={s.id}>
            <span className="chn">{pad2(i + 1)}</span>
            <h3>{s.t[k]}</h3>
            <p className="chd">{s.d[k]}</p>
            <ul>{s.f.map((x, j) => <li key={j}>{x[k]}</li>)}</ul>
            {s.p[k] ? <p className="chp">{s.p[k]}</p> : null}
            <a className="link" href={s.to}>{t('of.see')} <Icon id="right" /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
