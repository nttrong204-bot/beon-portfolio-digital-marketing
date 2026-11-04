import { useEffect, useRef } from 'react';
import { useC, Icon, Logo } from '../ctx.jsx';

function Body({ c, close }) {
  const { t, k, ix, lang, bname, dur, nf } = useC();
  const x = c[lang];
  const cols = [[t('ctx'), x.ctx], [t('m.goal'), x.goal], [t('m.str'), x.str]].filter(a => a[1]);
  const meta = [c.ch.join(' · '), dur(c), c.co].filter(Boolean).join(' · ');
  return (
    <>
      <header>
        <div className="bid">
          <Logo b={c.b} />
          <div>
            <b style={{ fontWeight: 600, fontSize: 17 }}>{bname(c)}{c.type === 'concept' ? <span className="tag">{t('concept')}</span> : null}</b>
            <div className="muted" style={{ fontSize: 14 }}>{c.b.ind[k]}</div>
          </div>
        </div>
        <button className="x" type="button" aria-label={t('m.close')} onClick={close}><Icon id="x" /></button>
      </header>
      <div><h3 id="dlgT" style={{ marginTop: 0 }}>{x.title}</h3>{meta ? <p className="meta">{meta}</p> : null}</div>
      {cols.length ? <div className="cols auto">{cols.map(a => <div key={a[0]}><h4>{a[0]}</h4><p>{a[1]}</p></div>)}</div> : null}
      {x.role ? <div><h4>{t('m.role')}</h4><p>{x.role}</p></div> : null}
      {c.m.length ? (
        <div>
          <h4>{t('m.res')}</h4>
          <div className="tiles" style={{ '--n': Math.min(4, c.m.length) }}>
            {c.m.map((q, i) => <div className="tile" key={i}><b>{nf(q[0])}</b><span>{q[ix]}</span></div>)}
          </div>
        </div>
      ) : <p className="note">{t('m.concept')}</p>}
      {c.imgs.length ? (
        <div className="gal">
          {c.imgs.map((u, i) => <a href={u} target="_blank" rel="noopener" key={u}><img className="dash-img" loading="lazy" src={u} alt={bname(c) + ' ' + (i + 1)} /></a>)}
        </div>
      ) : null}
      {x.les ? <div><h4>{t('m.les')}</h4><p className="lesson">{x.les}</p></div> : null}
    </>
  );
}

export default function CaseModal({ openId, setOpenId }) {
  const { byId } = useC();
  const dlg = useRef(null), sheet = useRef(null);
  const c = openId ? byId(openId) : null;
  useEffect(() => {
    const d = dlg.current;
    if (c && !d.open) d.showModal();
    if (c && sheet.current) sheet.current.scrollTop = 0;
  }, [openId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <dialog id="dlg" ref={dlg} aria-labelledby="dlgT"
      onClick={e => { if (e.target === dlg.current) dlg.current.close(); }}
      onClose={() => setOpenId(null)}>
      <div className="sheet" ref={sheet}>{c ? <Body c={c} close={() => dlg.current.close()} /> : null}</div>
    </dialog>
  );
}
