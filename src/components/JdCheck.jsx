import { useEffect, useRef, useState } from 'react';
import { useC, reduce } from '../ctx.jsx';
import { KW, GP } from '../data/skillset.js';

function Score({ score, animate }) {
  const [v, setV] = useState(animate && !reduce ? 0 : score);
  const [w, setW] = useState(animate && !reduce ? 0 : score);
  useEffect(() => {
    if (!animate || reduce) { setV(score); setW(score); return undefined; }
    let raf, stop = false;
    const raf0 = requestAnimationFrame(() => setW(score));
    const t0 = performance.now();
    const f = n => {
      if (stop) return;
      const p = Math.min(1, (n - t0) / 900);
      setV(Math.round(score * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => { stop = true; cancelAnimationFrame(raf); cancelAnimationFrame(raf0); };
  }, [score, animate]);
  const { t } = useC();
  return (
    <div>
      <div className="score"><span className="num">{v}%</span><span className="muted">{t('jd.fit')}</span></div>
      <div className="meter" style={{ marginTop: 12 }}><i style={{ width: w + '%' }} /></div>
    </div>
  );
}

export default function JdCheck() {
  const { t, lang, byId, bname, open } = useC();
  const sample = t('jd.sample');
  const [text, setText] = useState(null); // null = user has not edited, show the sample for the current language
  const value = text == null ? sample : text;
  const [applied, setApplied] = useState({ txt: value, animate: false, n: 0 });
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setApplied(a => ({ txt: value, animate: false, n: a.n + 1 }));
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const txt = applied.txt;
  const st = KW.filter(x => x.re.test(txt)), gp = GP.filter(x => x.re.test(txt));
  const score = Math.max(38, Math.min(94, 46 + 7 * st.length - 8 * gp.length));
  const cs = [];
  st.forEach(x => { if (cs.indexOf(x.c) < 0 && byId(x.c)) cs.push(x.c); });

  return (
    <section id="jd" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh"><h2>{t('jd.h')}</h2><p>{t('jd.s')}</p></div>
        <div className="jd">
          <div className="jd-in">
            <label htmlFor="jdIn">{t('jd.l')}</label>
            <textarea className="field" id="jdIn" value={value} onChange={e => setText(e.target.value)} />
            <button className="btn pri" type="button" onClick={() => setApplied(a => ({ txt: value, animate: true, n: a.n + 1 }))}>{t('jd.b')}</button>
            <p className="note">{t('jd.note')}</p>
          </div>
          <div className="jd-out" aria-live="polite">
            {!st.length ? <p className="note">{t('jd.none')}</p> : (
              <>
                <Score key={applied.n} score={score} animate={applied.animate} />
                <div><h4>{t('jd.st')}</h4><ul>{st.map(x => <li key={x.vi}>{x[lang]}</li>)}</ul></div>
                <div className="gap"><h4>{t('jd.gp')}</h4><ul>{gp.length ? gp.map(x => <li key={x.vi}>{x[lang]}</li>) : <li>{t('jd.nogap')}</li>}</ul></div>
                <div><h4>{t('jd.cs')}</h4><div className="cs">{cs.slice(0, 4).map(id => <button className="link" type="button" key={id} onClick={() => open(id)}>{bname(byId(id))}</button>)}</div></div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
