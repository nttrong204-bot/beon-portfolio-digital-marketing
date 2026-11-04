import { useRef, useState } from 'react';
import { useC, Icon } from '../ctx.jsx';

const masked = p => p.replace(/\d{3}\s\d{3}$/, '••• •••');

export default function Contact() {
  const { t, pf, toast } = useC();
  const [shown, setShown] = useState(false);
  const emailEl = useRef(null), phoneEl = useRef(null);
  const email = pf('email'), phone = pf('phone');

  const copy = (txt, el) => {
    const fb = () => {
      try {
        const r = document.createRange(); r.selectNodeContents(el);
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        toast(t('toast.sel'));
      } catch { /* nothing else to try */ }
    };
    try { navigator.clipboard.writeText(txt).then(() => toast(t('toast.copied')), fb); } catch { fb(); }
  };

  const links = [['cvBtn', 'cv_url', 'c.cv', 'down'], ['liBtn', 'linkedin', 'c.li', 'arrow'], ['fgBtn', 'figma_portfolio', 'c.fg', 'arrow']];
  return (
    <section id="contact" className="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>{t('c.h')}</h2>
        <p className="sub">{t('c.s')}</p>
        <div className="cgrid">
          <div className="crow">
            <Icon id="mail" />
            <div className="t"><small>Email</small><span className="v" ref={emailEl}>{email}</span></div>
            <div className="acts">
              <a className="btn pri sm" href={'mailto:' + email}>{t('c.mail')}</a>
              <button className="btn sm" type="button" aria-label="Copy email" onClick={() => copy(email, emailEl.current)}><Icon id="copy" /></button>
            </div>
          </div>
          <div className="crow">
            <Icon id="phone" />
            <div className="t"><small>{t('c.phone')}</small><span className="v" ref={phoneEl}>{shown ? phone : masked(phone)}</span></div>
            <div className="acts">
              <button className="btn sm" type="button" hidden={shown} onClick={() => setShown(true)}>{t('c.show')}</button>
              <button className="btn sm" type="button" aria-label="Copy phone" onClick={() => { setShown(true); copy(phone, phoneEl.current); }}><Icon id="copy" /></button>
            </div>
          </div>
        </div>
        <div className="cta" style={{ marginTop: 20 }}>
          {links.map(([id, key, label, icon], i) => {
            const u = pf(key);
            if (!u) return null;
            return (
              <a key={id} className={'btn' + (i === 0 ? ' pri' : '')} href={u} target="_blank" rel="noopener">
                {i === 0 ? <><Icon id={icon} /><span>{t(label)}</span></> : <><span>{t(label)}</span><Icon id={icon} /></>}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
