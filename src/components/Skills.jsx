import { useEffect, useMemo, useRef, useState } from 'react';
import { useC, reduce } from '../ctx.jsx';
import { parts, split2 } from '../lib/content.js';
import { BUL, CHB } from '../data/skillset.js';
import { visVideo, visBanner, visTest, visAI } from '../data/vis.js';

const VIS = { video: visVideo, banner: visBanner, ads: visTest, ai: visAI };
const kpFrom = strings => strings.map(split2).filter(Boolean);

function AutoTabs({ items, kind }) {
  const { t, V, nf, open, byId, bname } = useC();
  const n = items.length;
  const root = useRef(null);
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);
  const [swap, setSwap] = useState(false);
  const [user, setUser] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const e = root.current;
    if (!('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(es => setSeen(es[0].isIntersecting), { threshold: 0.35 });
    io.observe(e);
    return () => io.disconnect();
  }, []);

  const select = (idx, o = {}) => {
    const j = (idx + n) % n;
    setI(j); setTick(x => x + 1); setSwap(!!o.swap);
    if (o.focus) requestAnimationFrame(() => { const b = document.getElementById('t-' + kind + j); if (b) b.focus(); });
  };
  const idx = Math.min(i, n - 1);
  const it = items[idx];
  if (!it) return null;

  const onKey = e => {
    if (!e.target.closest('.tab')) return;
    if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); setUser(true); select(e.key === 'Home' ? 0 : n - 1, { focus: true, swap: true }); return; }
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    e.preventDefault(); setUser(true); select(idx + d, { focus: true, swap: true });
  };

  const cls = 'ft' + (!reduce && !user ? ' auto' : '') + (hover || focus || !seen ? ' paused' : '');
  return (
    <div className={cls} ref={root} style={{ '--dur': kind === 'c' ? '7s' : '8s' }}
      onAnimationEnd={e => { if (e.animationName === 'fillbar') select(idx + 1, { swap: true }); }}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setHover(true); }}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={e => { if (!root.current.contains(e.relatedTarget)) setFocus(false); }}
      onKeyDown={onKey}>
      <div className="tabs" role="tablist" aria-label={kind === 'c' ? 'Creative' : V('Kênh quảng cáo', 'Ad channels')}>
        {items.map((x, j) => (
          <button type="button" className="tab" role="tab" id={'t-' + kind + j} aria-controls={'p-' + kind}
            aria-selected={j === idx} tabIndex={j === idx ? 0 : -1} key={x.k}
            onClick={() => { setUser(true); select(j, { swap: true }); }}>
            <b>{V(x.t[0], x.t[1])}</b><span className="d">{V(x.d[0], x.d[1])}</span><span className="bar"><i key={tick} /></span>
          </button>
        ))}
      </div>
      <div className={'pane' + (swap ? ' swap' : '')} key={'p' + tick} role="tabpanel" id={'p-' + kind} aria-labelledby={'t-' + kind + idx}>
        {kind === 'c'
          ? <div className="vis" dangerouslySetInnerHTML={{ __html: it.vis ? it.vis(V) : '' }} />
          : <p className="pdesc">{V(it.d[0], it.d[1])}</p>}
        <div className={'pbody' + (it.kp.length ? '' : ' one')}>
          <ul>{it.f.map((x, j) => <li key={j}>{V(x[0], x[1])}</li>)}</ul>
          {it.kp.length ? <div className="kpis">{it.kp.map((x, j) => <div key={j}><b>{nf(x[0])}</b><span>{V(x[1], x[2])}</span></div>)}</div> : null}
        </div>
        {it.cs.length ? (
          <div className="pfoot">
            <span>{t(kind === 'c' ? 'ss.see' : 'ss.proj')}</span>
            {it.cs.map(id => <button className="link" type="button" key={id} onClick={() => open(id)}>{bname(byId(id))}</button>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t, pf, M, byId } = useC();
  const creative = useMemo(() => M.CR.map(r => {
    const vi = kpFrom(parts(r.kpi_vi)), en = kpFrom(parts(r.kpi_en));
    return { k: r.id, t: [r.title_vi, r.title_en], d: [r.desc_vi, r.desc_en], f: BUL[r.id] || [], kp: vi.map((q, i) => [q[0], q[1], (en[i] || q)[1]]), cs: parts(r.related_cases).filter(byId), vis: VIS[r.id] };
  }), [M]); // eslint-disable-line react-hooks/exhaustive-deps
  const channels = useMemo(() => M.CH.map(r => {
    const vi = kpFrom(parts(r.best_vi)), en = kpFrom(parts(r.best_en)), x = CHB[r.id] || { d: ['', ''], f: [] };
    return { k: r.id, t: [r.name, r.name], d: x.d, f: x.f, kp: vi.map((q, i) => [q[0], q[1], (en[i] || q)[1]]), cs: parts(r.related_cases).filter(byId) };
  }), [M]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section id="skills" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh"><h2>{pf('skills_heading')}</h2><p>{pf('skills_intro')}</p></div>
        <div className="grp"><h3>{t('ss.g1')}</h3></div>
        <AutoTabs items={creative} kind="c" />
        <div className="grp"><h3>{t('ss.g2')}</h3></div>
        <AutoTabs items={channels} kind="h" />
      </div>
    </section>
  );
}
