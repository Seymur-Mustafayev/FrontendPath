import { useState } from 'react';
import { useProgress } from '../lib/useProgress';
import type { SyncStatus } from '../lib/useProgress';
import { CODE_RE, newCode, normalizeCode } from '../lib/sync';

const STATUS_LABEL: Record<SyncStatus, string> = {
  off: '',
  loading: 'Yüklənir…',
  saved: 'Sinxronlaşdırılıb ✓',
  error: 'Serverə qoşulmaq alınmadı'
};

/** Footer-dəki «cihazlar arası sinxron» bölməsi. */
export function SyncPanel() {
  const { syncCode, setSyncCode, syncStatus } = useProgress();
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  if (syncCode) {
    return (
      <div className="sync">
        <p>
          Sinxron kodun: <code>{syncCode}</code>{' '}
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
            {copied ? 'kopyalandı' : 'kopyala'}
          </button>
        </p>
        <p className="muted">Telefonda və ya başqa kompüterdə bu kodu daxil et — eyni qeydlər gələcək.</p>
        <p className="muted" role="status">{STATUS_LABEL[syncStatus]}</p>
        <button
          type="button"
          className="linklike"
          onClick={() => {
            if (confirm('Bu cihazda sinxron söndürülsün? Serverdəki data silinmir.')) setSyncCode('');
          }}
        >
          Bu cihazda söndür
        </button>
      </div>
    );
  }

  const code = normalizeCode(draft);
  return (
    <div className="sync">
      <p className="muted">Qeydlərin telefonda və başqa kompüterdə də görünsün:</p>
      <button type="button" className="sync-btn" onClick={() => setSyncCode(newCode())}>
        Sinxronu aç (yeni kod)
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (CODE_RE.test(code)) setSyncCode(code);
        }}
      >
        <label htmlFor="sync-code" className="muted">
          Kodun var? Daxil et:
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
            Qoşul
          </button>
        </div>
      </form>
    </div>
  );
}
