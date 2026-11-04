import { useEffect, useMemo, useRef, useState } from 'react';
import { useC, reduce, Icon, Logo } from '../ctx.jsx';
import { coverUri } from '../lib/marks.js';
import CircularCarousel from './CircularCarousel.jsx';

function Ring() {
  const { M, lang, k, bname, dur, nf, open } = useC();
  const host = useRef(null);
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const e = host.current; let rt;
    const upd = () => setSmall(e.clientWidth < 640);
    upd();
    const onR = () => { clearTimeout(rt); rt = setTimeout(upd, 200); };
    window.addEventListener('resize', onR);
    return () => { clearTimeout(rt); window.removeEventListener('resize', onR); };
  }, []);
  const items = useMemo(() => M.D.filter(c => c.type !== 'concept').map(c => ({
    src: coverUri(c, { k, name: bname(c), dur: dur(c), nf }), alt: c[lang].title, title: bname(c), subtitle: c.b.ind[k], id: c.id
  })), [M, lang]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="cc-host" ref={host}>
      <CircularCarousel
        items={items} preset="cylinder" intro={reduce ? 'none' : 'spin'} cardWidth={small ? 170 : 236} aspectRatio={0.8}
        speed={9} captions gap={22} tilt={-9} perspective={2200} momentum={0.31} parallax={0.35} stretch={0.4}
        depthFade={0.7} innerShade={0.6} cornerRadius={18} fadeColor="#0e1012" onItemClick={it => open(it.id)}
      />
    </div>
  );
}

const Cell = ({ label, text }) => (text ? <div><dt>{label}</dt><dd>{text}</dd></div> : null);

function Features() {
  const { M, t, k, ix, lang, bname, dur, nf, open } = useC();
  return (
    <div className="wrap" id="features">
      {M.D.filter(c => c.feat).map(c => {
        const x = c[lang], m = c.m, top = m[0], sub = m.slice(1);
        const meta = [c.co, x.role, dur(c)].filter(Boolean).join(' · ');
        return (
          <article className="feature" key={c.id}>
            <div className="f-l">
              <div className="who"><Logo b={c.b} /><span><b>{bname(c)}</b><br />{[c.b.ind[k], c.co].filter(Boolean).join(' · ')}</span></div>
              <h3>{x.title}</h3>
              <dl>
                <Cell label={t('ctx')} text={x.ctx} /><Cell label={t('m.goal')} text={x.goal} />
                <Cell label={t('how')} text={x.str} /><Cell label={t('m.les')} text={x.les} />
              </dl>
              <button className="link" type="button" onClick={() => open(c.id)}>{t('read')} <Icon id="right" /></button>
            </div>
            <div className="f-r">
              {top ? (
                <div className="top">
                  <div><div className="num big">{nf(top[0])}</div><p>{top[ix]}</p></div>
                  {c.ch.length ? <p>{c.ch.join(' · ')}</p> : null}
                </div>
              ) : null}
              {meta ? <p className="meta">{meta}</p> : null}
              {c.imgs.length ? <img className="dash-img" loading="lazy" src={c.imgs[0]} alt={bname(c)} /> : null}
              {sub.length ? <div className="sub">{sub.map((q, i) => <div key={i}><b>{nf(q[0])}</b><span>{q[ix]}</span></div>)}</div> : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function Projects() {
  const { t } = useC();
  return (
    <section id="projects" style={{ paddingTop: 'clamp(32px,5vw,64px)' }}>
      <div className="wrap"><div className="sh"><h2>{t('pj.h')}</h2><p>{t('pj.s')}</p></div></div>
      <div className="wrap"><Ring /></div>
      <Features />
    </section>
  );
}

export function AllRows() {
  const { M, t, k, ix, bname, dur, nf, open } = useC();
  const [f, setF] = useState('all');
  const filters = [['all', 'f.all'], ['ads', 'f.ads'], ['kol', 'f.kol'], ['concept', 'f.concept']];
  return (
    <section id="all" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="tbar">
          <div className="sh"><h2>{t('all.h')}</h2><p>{t('all.s')}</p></div>
          <div className="seg" role="group" aria-label="Filter">
            {filters.map(([id, key]) => <button type="button" key={id} aria-pressed={f === id} onClick={() => setF(id)}>{t(key)}</button>)}
          </div>
        </div>
        <div className="rows">
          <div className="r hd" aria-hidden="true"><span>{t('th.b')}</span><span>{t('th.i')}</span><span>{t('th.c')}</span><span>{t('th.r')}</span><span>{t('th.t')}</span><span /></div>
          {M.D.filter(c => f === 'all' || c.skill === f).map(c => {
            const q = c.m[0];
            return (
              <button type="button" className="r" key={c.id} onClick={() => open(c.id)}>
                <span className="b"><Logo b={c.b} /><span>{bname(c)}</span></span>
                <span className="c">{c.b.ind[k]}</span>
                <span className="c">{c.ch.length ? c.ch.join(', ') : c.co}</span>
                <span className="res">{q ? <><b>{nf(q[0])}</b><span>{q[ix]}</span></> : <span>{t('concept')}</span>}</span>
                <span className="t">{dur(c) || ''}</span>
                <svg className="i go"><use href="#i-arrow" /></svg>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
