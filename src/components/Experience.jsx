import { useC } from '../ctx.jsx';
import { cl } from '../lib/content.js';

export default function Experience() {
  const { t, k, pf, M } = useC();
  const o = k ? '_en' : '_vi';
  const edu = [pf('education_school'), pf('education_degree'), pf('education_gpa') ? 'GPA ' + pf('education_gpa') : '', pf('english')].filter(Boolean);
  return (
    <section id="experience" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh"><h2>{t('xp.h')}</h2></div>
        <div className="xp">
          <div>
            <h3 className="col">{t('xp.tl')}</h3>
            <ol className="tl">
              {M.XP.map((r, i) => (
                <li key={i}>
                  <span className="yr">{r['period' + o]}</span>
                  <div><b>{r['title' + o]}</b><span className="co">{r['company' + o]}</span><p>{r['desc' + o]}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="col">{t('xp.tc')}</h3>
            <div id="tools">
              {M.TL.map((r, i) => {
                const items = String(r.tools).split(/\s*·\s*/).map(cl).filter(Boolean);
                return <p className="tools" key={i}><b>{k ? r.group_en : r.group_vi}:</b> {items.join(' · ')}</p>;
              })}
            </div>
            <p className="cert"><b>{t('xp.edu')}</b> {edu.join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
