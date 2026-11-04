import { useEffect, useState } from 'react';
import { useC, reduce, Icon, Mono } from '../ctx.jsx';
import { brandOf, parts, safeB, mark } from '../lib/content.js';

function Counter({ to }) {
  const { nf } = useC();
  const [v, setV] = useState(to);
  useEffect(() => {
    if (reduce) return undefined;
    let raf, stop = false;
    const t0 = performance.now() + 250;
    const f = n => {
      if (stop) return;
      const p = Math.max(0, Math.min(1, (n - t0) / 1300)), e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => { stop = true; cancelAnimationFrame(raf); };
  }, [to]);
  return nf(v);
}

function Portrait() {
  const { pf } = useC();
  const u = pf('portrait_url'), n = pf('name'), ini = mark(n.split(' ').slice(-2).join(' '));
  if (u) return <img src={u} alt={n} />;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={n}>
      <rect width="400" height="500" fill="#15181b" />
      <circle cx="200" cy="200" r="72" fill="#22272c" />
      <path d="M60 500 C 70 370 130 318 200 318 C 270 318 330 370 340 500 Z" fill="#22272c" />
      <text x="200" y="212" textAnchor="middle" fontFamily="Unbounded,Segoe UI,Arial,sans-serif" fontWeight="500" fontSize="44" fill="#a9bcff">{ini}</text>
    </svg>
  );
}

export default function Hero() {
  const { t, pf, k, M, nf, open } = useC();
  const names = parts(pf('worked_with'));
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-l enter">
            <span className="status"><i className="dot" /><span>{pf('status')}</span></span>
            <h1>{pf('name')}</h1>
            <p className="role">{pf('role')}</p>
            <p className="lede" dangerouslySetInnerHTML={{ __html: safeB(pf('hero_lede')) }} />
            <div className="proof">
              {M.HS.map((h, i) => (
                <div key={i}>
                  <span className={'num' + (i === 0 ? ' ac' : '')}>{/^\d+$/.test(h.v) ? <Counter to={+h.v} /> : nf(h.v)}</span>
                  <span>{h.l[k]}</span>
                  <small>{h.s[k]}</small>
                </div>
              ))}
            </div>
            <div className="cta">
              <a className="btn pri" href="#projects"><span>{t('hero.cta1')}</span><Icon id="right" /></a>
              <a className="btn" href="#contact">{t('hero.cta2')}</a>
            </div>
          </div>
          <figure className="portrait enter">
            <div className="ph"><Portrait /></div>
            <figcaption><span>{pf('job_types')}</span><span>{pf('location')}</span></figcaption>
          </figure>
        </div>
        <div className="worked">
          <span>{t('hero.worked')}</span>
          <span className="wlist">
            {names.map(n => {
              const key = n.toLowerCase();
              const hit = M.D.find(c => c.co.toLowerCase().indexOf(key) >= 0 || c.b.n.toLowerCase().indexOf(key) >= 0);
              const b = brandOf(n, n, 'real', ['', '']);
              return hit
                ? <button type="button" className="wm" key={n} title={n} onClick={() => open(hit.id)}><Mono b={b} /><span>{n}</span></button>
                : <span className="wm static" key={n}><Mono b={b} /><span>{n}</span></span>;
            })}
          </span>
        </div>
      </div>
    </section>
  );
}
