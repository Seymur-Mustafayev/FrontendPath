import { useState } from 'react';
import { useProgress } from '../lib/useProgress';
import type { SyncStatus } from '../lib/useProgress';
import { CODE_RE, newCode, normalizeCode } from '../lib/sync';
import { useUI } from '../i18n/useLocale';

/** Footer-dəki «cihazlar arası sinxron» bölməsi. */
export function SyncPanel() {
  const { syncCode, setSyncCode, syncStatus } = useProgress();
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const { sync: t } = useUI();
  const status: Record<SyncStatus, string> = {
    off: '',
    loading: t.loading,
    saved: t.saved,
    error: t.error
  };

  if (syncCode) {
    return (
      <div className="sync">
        <p>
          {t.code} <code>{syncCode}</code>{' '}
          <button
            type="button"
            className="linklike"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(syncCode);
                setCopied(true);
              } catch {
                /* bufer bağlıdır — kod ekranda görünür */
              }
            }}
          >
            {copied ? t.copied : t.copy}
          </button>
        </p>
        <p className="muted">{t.hint}</p>
        <p className="muted" role="status">{status[syncStatus]}</p>
        <button
          type="button"
          className="linklike"
          onClick={() => {
            if (confirm(t.offConfirm)) setSyncCode('');
          }}
        >
          {t.off}
        </button>
      </div>
    );
  }

  const code = normalizeCode(draft);
  return (
    <div className="sync">
      <p className="muted">{t.intro}</p>
      <button type="button" className="sync-btn" onClick={() => setSyncCode(newCode())}>
        {t.start}
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (CODE_RE.test(code)) setSyncCode(code);
        }}
      >
        <label htmlFor="sync-code" className="muted">
          {t.haveCode}
        </label>
        <div className="sync-row">
          <input
            id="sync-code"
            placeholder="abcd-efgh-jkmn-pqrs"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" className="sync-btn" disabled={!CODE_RE.test(code)}>
            {t.join}
          </button>
        </div>
      </form>
    </div>
  );
}
