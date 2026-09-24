import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { clock, useElapsed, useReadingTimer } from '../lib/useReadingTimer';

const RECENT = 5;

export function timeOfDay(ms: number): string {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatSessionDate(start: number, months: readonly string[]): string {
  const d = new Date(start);
  return `${d.getDate()} ${months[d.getMonth()]}, ${timeOfDay(start)}`;
}

export function ReadingTimer({ bookId, chapterId }: { bookId: string; chapterId: string }) {
  const { ui, content } = useLocale();
  const { logs, removeLog } = useProgress();
  const { timer, start, pause, resume, finish, discard } = useReadingTimer();
  const [note, setNote] = useState('');
  const t = ui.timer;
  const here = timer?.book === bookId && timer.ch === chapterId;
  const elapsed = useElapsed(here ? timer : null);
  const running = here && timer?.runningSince != null;
  const chapterLogs = logs.filter((l) => l.book === bookId && l.ch === chapterId);
  const total = chapterLogs.reduce((n, l) => n + l.ms, 0);
  const other = timer && !here ? content.books.find((b) => b.id === timer.book)?.chapters.find((c) => c.id === timer.ch) : undefined;

  useEffect(() => setNote(''), [bookId, chapterId]);

  function onFinish() {
    setNote(finish() ? t.saved : t.tooShort);
  }

  function onDiscard() {
    if (window.confirm(t.discardConfirm)) discard();
  }

  return (
    <div className="rtimer" id="timer">
      <p className="mini-title">⏱ {t.title}</p>

      {here ? (
        <>
          <div className={`rtimer-clock${running ? ' running' : ''}`} role="timer" aria-live="off">
            {clock(elapsed)}
          </div>
          <p className="rtimer-state">{running ? t.running : t.paused}</p>
          <div className="rtimer-actions">
            {running ? (
              <button type="button" className="rt-btn" onClick={pause}>
                {t.pause}
              </button>
            ) : (
              <button type="button" className="rt-btn rt-btn--main" onClick={resume}>
                {t.resume}
              </button>
            )}
            <button type="button" className="rt-btn" onClick={onFinish}>
              {t.finish}
            </button>
            <button type="button" className="rt-btn rt-btn--quiet" onClick={onDiscard}>
              {t.discard}
            </button>
          </div>
        </>
      ) : (
        <>
          {timer && other && (
            <p className="rtimer-note">
              {t.elsewhere}{' '}
              <Link to={`/kitab/${timer.book}/${timer.ch}`}>
                {t.chapterShort(other.no)} — {other.titleTr}
              </Link>
            </p>
          )}
          <div className="rtimer-actions">
            <button
              type="button"
              className="rt-btn rt-btn--main"
              onClick={() => {
                setNote('');
                start(bookId, chapterId);
              }}
            >
              {timer ? t.startHere : t.start}
            </button>
          </div>
        </>
      )}

      {note && (
        <p className="rtimer-note" role="status">
          {note}
        </p>
      )}

      <div className="rtimer-total">
        <span>{t.chapterTotal}</span>
        <b>{t.dur(total)}</b>
      </div>

      <p className="rtimer-sub">
        {t.sessions} · {t.sessionsCount(chapterLogs.length)}
      </p>
      {chapterLogs.length === 0 ? (
        <p className="rtimer-empty">{t.noSessions}</p>
      ) : (
        <ul className="rtimer-log">
          {chapterLogs.slice(0, RECENT).map((l) => (
            <li key={l.id}>
              <span className="when">{formatSessionDate(l.start, t.months)}</span>
              <span className="len">{t.dur(l.ms)}</span>
              <button
                type="button"
                className="rt-del"
                aria-label={`${t.remove}: ${formatSessionDate(l.start, t.months)}`}
                title={t.remove}
                onClick={() => window.confirm(t.removeConfirm) && removeLog(l.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TimerPill() {
  const { ui } = useLocale();
  const { timer } = useReadingTimer();
  const elapsed = useElapsed(timer);
  if (!timer) return null;
  const running = timer.runningSince != null;
  return (
    <Link
      to={`/kitab/${timer.book}/${timer.ch}#timer`}
      className={`timer-pill${running ? ' running' : ''}`}
      aria-label={`${ui.timer.navAria}: ${clock(elapsed)}`}
      title={ui.timer.navAria}
    >
      <span aria-hidden="true">{running ? '⏱' : '⏸'}</span>
      {clock(elapsed)}
    </Link>
  );
}
