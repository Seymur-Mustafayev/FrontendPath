import { useEffect, useRef, useState } from 'react';
import type { TermEntry } from '../types';
import { TopicBody } from './TopicBody';
import { useProgress } from '../lib/useProgress';

/** Claude tabının adı — hər klik eyni tabı açsın, yenisini yaratmasın. */
const CHAT_TAB = 'claude-chat';

function question(term: TermEntry) {
  return `"${term.en}" (${term.az}) frontend termini haqqında daha çox məlumat ver: nədir, nə üçün lazımdır, real nümunələrlə izah et. Azərbaycan dilində cavab ver.`;
}

function isChatUrl(url: string) {
  return /^https:\/\/claude\.ai\/(chat|project)\//.test(url);
}

/**
 * Termin pop-up-ı. Native <dialog> istifadə olunur:
 * fokus tələsi, Escape ilə bağlanma və backdrop hazır gəlir.
 */
export function TermDialog({ term, onClose }: { term: TermEntry | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  // Söhbət linki tərəqqi ilə birgə saxlanır və cihazlar arası sinxronlaşır.
  const { chat, setChat } = useProgress();
  const [draft, setDraft] = useState('');
  const [hint, setHint] = useState('');

  function saveChat(url: string) {
    setChat(url);
    setDraft('');
  }

  async function askClaude() {
    if (!term) return;
    const q = question(term);

    // Userscript (public/claude-ask.user.js) açıq Claude tabı taparsa, sualı ora
    // ötürür və atributu qoyur — onda yeni tab açılmır.
    const root = document.documentElement;
    root.removeAttribute('data-claude-ask-sent');
    document.dispatchEvent(new CustomEvent('claude-ask', { detail: JSON.stringify({ text: q, chat }) }));
    if (root.hasAttribute('data-claude-ask-sent')) {
      setHint('Sual açıq Claude tabına göndərildi — cavab üçün o taba keçin.');
      return;
    }

    if (!chat) {
      // Söhbət seçilməyib: sualla yeni söhbət aç.
      window.open(`https://claude.ai/new?q=${encodeURIComponent(q)}`, CHAT_TAB);
      return;
    }
    // Sual #ask= ilə ötürülür; userscript onu söhbətə yazıb göndərir.
    // Script yoxdursa, bufer ehtiyat variantdır.
    let copied = false;
    try {
      await navigator.clipboard.writeText(q);
      copied = true;
    } catch {
      /* bufer icazəsi yoxdur */
    }
    window.open(`${chat}#ask=${encodeURIComponent(q)}`, CHAT_TAB);
    setHint(
      copied
        ? 'Sual Claude-a göndərildi. Userscript quraşdırılmayıbsa: Ctrl+V, sonra Enter.'
        : 'Sual Claude-a göndərildi.'
    );
  }

  useEffect(() => setHint(''), [term]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (term && !el.open) el.showModal();
    if (!term && el.open) el.close();
  }, [term]);

  return (
    <dialog
      ref={ref}
      className="term-dialog"
      onClose={onClose}
      onClick={(e) => {
        // Backdrop-a klik: hədəf dialoqun özüdürsə, içindəki panelə dəyilməyib.
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="term-dialog-title"
    >
      {term && (
        <div className="sheet">
          <p className="kind">Termin</p>
          <h3 id="term-dialog-title">{term.en}</h3>
          <p className="tr">{term.az}</p>
          <div className="def body body--flush">
            <TopicBody text={term.def} />
          </div>
          {term.ex && <pre className="ex">{term.ex}</pre>}
          <div className="actions">
            <button type="button" className="more" onClick={askClaude}>
              Daha çox məlumat — Claude-dan soruş ↗
            </button>
            <button type="button" className="close" onClick={onClose}>
              Bağla
            </button>
          </div>
          {hint && <p className="hint" role="status">{hint}</p>}
          <div className="chat-pick">
            {chat ? (
              <>
                Suallar bu söhbətə gedir:{' '}
                <a href={chat} target={CHAT_TAB}>
                  {chat.replace('https://claude.ai/', '')}
                </a>{' '}
                <button type="button" className="link" onClick={() => saveChat('')}>
                  dəyiş
                </button>
                <br />
                Avtomatik göndərmə üçün{' '}
                <a href={`${import.meta.env.BASE_URL}claude-ask.user.js`} target="_blank" rel="noopener">
                  userscript-i quraşdır
                </a>{' '}
                (Tampermonkey).
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isChatUrl(draft.trim())) saveChat(draft.trim());
                }}
              >
                <label htmlFor="chat-url">Həmişə eyni söhbətdə soruşmaq üçün Claude söhbətinin linkini yapışdır:</label>
                <div className="row">
                  <input
                    id="chat-url"
                    type="url"
                    placeholder="https://claude.ai/chat/…"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <button type="submit" disabled={!isChatUrl(draft.trim())}>
                    Yadda saxla
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
