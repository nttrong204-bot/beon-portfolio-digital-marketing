import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import snapshot from './data/snapshot.json';
import { buildModel } from './lib/content.js';
import { loadLive } from './lib/live.js';
import { Ctx, makeCtx } from './ctx.jsx';
import Hero from './components/Hero.jsx';
import Offer from './components/Offer.jsx';
import { Projects, AllRows } from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import JdCheck from './components/JdCheck.jsx';
import Contact from './components/Contact.jsx';
import CaseModal from './components/CaseModal.jsx';
import Chat from './components/Chat.jsx';

export default function App() {
  const [lang, setLang] = useState('vi');
  const [S, setS] = useState(snapshot);
  const [openId, setOpenId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const tt = useRef();

  useEffect(() => { loadLive().then(live => { if (live) setS(s => ({ ...s, ...live })); }); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const M = useMemo(() => buildModel(S), [S]);
  const toast = useCallback(m => {
    setToastMsg(m); setToastOn(true);
    clearTimeout(tt.current); tt.current = setTimeout(() => setToastOn(false), 2200);
  }, []);
  const c = useMemo(() => makeCtx(lang, M, setOpenId, toast), [lang, M, toast]);

  return (
    <Ctx.Provider value={c}>
      <header className="nav">
        <div className="wrap">
          <a className="me" href="#top">{c.pf('name')}</a>
          <nav className="links" aria-label="Main">
            <a href="#projects">{c.t('nav.work')}</a>
            <a href="#skills">{c.t('nav.skills')}</a>
            <a href="#experience">{c.t('nav.xp')}</a>
            <a href="#jd">{c.t('nav.jd')}</a>
          </nav>
          <div className="seg" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'vi'} onClick={() => setLang('vi')}>VI</button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="btn pri sm" href="#contact">{c.t('nav.contact')}</a>
        </div>
      </header>
      <main id="top">
        <Hero />
        <Offer />
        <Projects />
        <AllRows />
        <Skills />
        <Experience />
        <JdCheck />
        <Contact />
      </main>
      <footer><div className="wrap"><span>© 2026 <span>{c.pf('name')}</span></span><span>{c.t('foot')}</span></div></footer>
      <CaseModal openId={openId} setOpenId={setOpenId} />
      <Chat />
      <div className={'toast' + (toastOn ? ' on' : '')} role="status" aria-live="polite">{toastMsg}</div>
    </Ctx.Provider>
  );
}
