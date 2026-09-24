import { useState } from 'react';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { formatSessionDate } from './ReadingTimer';

const SHOWN = 4;

export function ChapterSessions({ bookId, chapterId }: { bookId: string; chapterId: string }) {
  const { ui } = useLocale();
  const { logs } = useProgress();
  const [all, setAll] = useState(false);
  const t = ui.timer;

  const items = logs
    .filter((l) => l.book === bookId && l.ch === chapterId)
    .sort((a, b) => b.start - a.start);
  if (items.length === 0) return null;

  const total = items.reduce((n, l) => n + l.ms, 0);
  const shown = all ? items : items.slice(0, SHOWN);

  return (
    <div className="csess">
      <p className="csess-head">
        <span aria-hidden="true">⏱</span> <b>{t.dur(total)}</b> · {t.sessionsCount(items.length)}
      </p>
      <ul className="csess-list">
        {shown.map((l) => (
          <li key={l.id}>
            <span className="when">{formatSessionDate(l.start, t.months)}</span>
            <span className="len">{t.dur(l.ms)}</span>
          </li>
        ))}
      </ul>
      {items.length > SHOWN && (
        <button type="button" className="link-btn csess-more" onClick={() => setAll((v) => !v)}>
          {all ? t.showLess : t.showAll(items.length)}
        </button>
      )}
    </div>
  );
}
