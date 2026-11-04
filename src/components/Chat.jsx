import { useEffect, useRef, useState } from 'react';
import { useC, reduce, Icon } from '../ctx.jsx';

const MAX_Q = 8; // questions per browser session; the server enforces its own limits too

function getCount() { try { return +sessionStorage.getItem('pf-q') || 0; } catch { return 0; } }
function setCount(n) { try { sessionStorage.setItem('pf-q', String(n)); } catch { /* storage can be blocked */ } }

function Typed({ text, onTick }) {
  const words = text.split(' ');
  const [n, setN] = useState(reduce ? words.length : 0);
  useEffect(() => {
    if (reduce) return undefined;
    const iv = setInterval(() => setN(x => { if (x >= words.length) { clearInterval(iv); return x; } return x + 1; }), 30);
    return () => clearInterval(iv);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (onTick) onTick(); }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  return words.slice(0, n).join(' ');
}

export default function Chat() {
  const { t, lang, pf } = useC();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]); // {id, who, text, pending, typed}
  const [val, setVal] = useState('');
  const [busy, setBusy] = useState(false);
  const box = useRef(null), input = useRef(null), fab = useRef(null), seq = useRef(0);
  const scroll = () => { if (box.current) box.current.scrollTop = box.current.scrollHeight; };
  useEffect(scroll, [msgs]);
  useEffect(() => { if (open && input.current) input.current.focus(); }, [open]);
  useEffect(() => {
    const k = e => { if (e.key === 'Escape' && open && !document.querySelector('dialog[open]')) { setOpen(false); if (fab.current) fab.current.focus(); } };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open]);

  const email = pf('email');
  const ask = async q => {
    q = q.trim();
    if (!q || busy) return;
    const id = ++seq.current;
    setMsgs(m => [...m, { id: 'q' + id, who: 'me', text: q }, { id: 'a' + id, who: 'bot', pending: true }]);
    const put = (text, extra) => setMsgs(m => m.map(x => (x.id === 'a' + id ? { ...x, pending: false, text, typed: true, ...extra } : x)));
    if (getCount() >= MAX_Q) { put(t('ai.lim') + ' ' + email); return; }
    setBusy(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q, lang }) });
      const j = await r.json().catch(() => ({}));
      setCount(getCount() + 1);
      if (r.ok && j.answer) put(j.answer);
      else put(t('ai.fb') + ' ' + email);
    } catch {
      put(t('ai.fb') + ' ' + email);
    } finally { setBusy(false); }
  };

  return (
    <>
      <button className="fab" type="button" ref={fab} aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(o => !o)}>
        <i className="dot" /><span className="lbl">{t('ai.fab')}</span>
      </button>
      <div className="drawer" id="drawer" role="dialog" aria-label="AI Assistant" hidden={!open}>
        <header>
          <b><i className="dot" style={{ background: 'var(--accent)', boxShadow: 'none' }} />AI Assistant</b>
          <button className="x" type="button" aria-label="Close" onClick={() => { setOpen(false); if (fab.current) fab.current.focus(); }}><Icon id="x" /></button>
        </header>
        <div className="msgs" ref={box} aria-live="polite">
          <div className="m bot">{t('ai.hello')}</div>
          {msgs.map(m => (
            <div className={'m ' + m.who} key={m.id}>
              {m.pending ? <span className="dots"><i /><i /><i /></span> : m.who === 'bot' && m.typed ? <Typed text={m.text} onTick={scroll} /> : m.text}
            </div>
          ))}
        </div>
        <div className="sugg">
          {['q1', 'q2', 'q3', 'q4'].map(k => <button type="button" key={k} onClick={() => ask(t(k))}>{t(k)}</button>)}
        </div>
        <form className="ask" onSubmit={e => { e.preventDefault(); ask(val); setVal(''); }}>
          <input className="field" ref={input} type="text" autoComplete="off" aria-label="Question" placeholder={t('ai.ph')} value={val} onChange={e => setVal(e.target.value)} maxLength={300} />
          <button className="btn pri" type="submit" aria-label="Send" disabled={busy}><Icon id="send" /></button>
        </form>
        <p className="note">{t('ai.demo')}</p>
      </div>
    </>
  );
}
