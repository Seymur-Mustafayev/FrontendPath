import { useEffect, useRef, useState } from 'react';
import type { TermEntry } from '../types';
import { TopicBody } from './TopicBody';
import { useProgress } from '../lib/useProgress';
import { useUI } from '../i18n/useLocale';

const CHAT_TAB = 'claude-chat';

function isChatUrl(url: string) {
  return /^https:\/\/claude\.ai\/(chat|project)\//.test(url);
}

export function TermDialog({ term, onClose }: { term: TermEntry | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { chat, setChat } = useProgress();
  const [draft, setDraft] = useState('');
  const [hint, setHint] = useState('');
  const [editing, setEditing] = useState(false);
  const ui = useUI();
  const tx = ui.term;

  function saveChat(url: string) {
    setChat(url);
    setDraft('');
    setEditing(false);
  }

  function startEdit() {
    setDraft(chat);
    setEditing(true);
  }

  async function askClaude() {
    if (!term) return;
    const q = tx.question(term.en, term.tr);

    const root = document.documentElement;
    root.removeAttribute('data-claude-ask-sent');
    document.dispatchEvent(new CustomEvent('claude-ask', { detail: JSON.stringify({ text: q, chat }) }));
    if (root.hasAttribute('data-claude-ask-sent')) {
      setHint(tx.sentToTab);
      return;
    }

    if (!chat) {
      window.open(`https://claude.ai/new?q=${encodeURIComponent(q)}`, CHAT_TAB);
      return;
    }
    let copied = false;
    try {
      await navigator.clipboard.writeText(q);
      copied = true;
    } catch {
    }
    window.open(`${chat}#ask=${encodeURIComponent(q)}`, CHAT_TAB);
    setHint(
      copied
        ? tx.sentCopied
        : tx.sent
    );
  }

  useEffect(() => {
    setHint('');
    setEditing(false);
  }, [term]);

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
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="term-dialog-title"
    >
      {term && (
        <div className="sheet">
          <p className="kind">{tx.kind}</p>
          <h3 id="term-dialog-title">{term.en}</h3>
          <p className="tr">{term.tr}</p>
          <div className="def body body--flush">
            <TopicBody text={term.def} />
          </div>
          {term.ex && <pre className="ex">{term.ex}</pre>}
          <div className="actions">
            <button type="button" className="more" onClick={askClaude}>
              {tx.ask}
            </button>
            <button type="button" className="close" onClick={onClose}>
              {tx.close}
            </button>
          </div>
          {hint && <p className="hint" role="status">{hint}</p>}
          <div className="chat-pick">
            {chat && !editing ? (
              <>
                {tx.chatCurrent}{' '}
                <a href={chat} target={CHAT_TAB}>
                  {chat.replace('https://claude.ai/', '')}
                </a>{' '}
                <button type="button" className="link" onClick={startEdit}>
                  {tx.chatChange}
                </button>{' '}
                ·{' '}
                <button type="button" className="link" onClick={() => saveChat('')}>
                  {tx.chatRemove}
                </button>
                <br />
                {tx.scriptBefore}{' '}
                <a href={`${import.meta.env.BASE_URL}claude-ask.user.js`} target="_blank" rel="noopener">
                  {tx.scriptLink}
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
                <label htmlFor="chat-url">{tx.chatLabel}</label>
                <div className="row">
                  <input
                    id="chat-url"
                    type="url"
                    placeholder="https://claude.ai/chat/…"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    autoFocus={editing}
                  />
                  <button type="submit" disabled={!isChatUrl(draft.trim())}>
                    {tx.save}
                  </button>
                  {editing && (
                    <button type="button" onClick={() => setEditing(false)}>
                      {tx.cancel}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
