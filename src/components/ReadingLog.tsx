import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import type { ReadingLog as Log } from '../lib/sync';
import { timeOfDay } from './ReadingTimer';

const DAYS_SHOWN = 7;

function dayKey(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function ReadingLog() {
  const { ui, content } = useLocale();
  const { logs, removeLog } = useProgress();
  const [all, setAll] = useState(false);
  const t = ui.timer;

  const chapters = content.books.flatMap((b) =>
    b.chapters.map((c) => ({ book: b.id, ch: c.id, no: c.no, title: c.titleTr }))
  );
  const find = (l: Log) => chapters.find((c) => c.book === l.book && c.ch === l.ch);
  const total = logs.reduce((n, l) => n + l.ms, 0);

  const perChapter = chapters
    .map((c) => ({
      ...c,
      ms: logs.filter((l) => l.book === c.book && l.ch === c.ch).reduce((n, l) => n + l.ms, 0)
    }))
    .filter((c) => c.ms > 0);
  const max = Math.max(...perChapter.map((c) => c.ms), 1);

  const days: { key: string; start: number; items: Log[] }[] = [];
  for (const l of [...logs].sort((a, b) => b.start - a.start)) {
    const key = dayKey(l.start);
    const day = days.find((d) => d.key === key);
    if (day) day.items.push(l);
    else days.push({ key, start: l.start, items: [l] });
  }
  const shownDays = all ? days : days.slice(0, DAYS_SHOWN);

  const today = dayKey(Date.now());
  const yesterday = dayKey(Date.now() - 86_400_000);
  const dayLabel = (d: { key: string; start: number }) =>
    d.key === today
      ? t.today
      : d.key === yesterday
        ? t.yesterday
        : `${new Date(d.start).getDate()} ${t.monthsLong[new Date(d.start).getMonth()]}`;
  const time = timeOfDay;

  return (
    <section className="rlog" aria-labelledby="rlog-title">
      <div className="rlog-head">
        <div>
          <p className="kicker">{t.logKicker}</p>
          <h3 id="rlog-title">{t.logTitle}</h3>
        </div>
        {logs.length > 0 && (
          <div className="rlog-total">
            <b>{t.dur(total)}</b>
            <span>
              {t.totalTime} · {t.sessionsCount(logs.length)}
            </span>
          </div>
        )}
      </div>

      {logs.length === 0 ? (
        <p className="rlog-empty">{t.logEmpty}</p>
      ) : (
        <div className="rlog-grid">
          <div>
            <p className="mini-title">{t.byChapter}</p>
            <ul className="rlog-chapters">
              {perChapter.map((c) => (
                <li key={c.book + c.ch}>
                  <Link to={`/kitab/${c.book}/${c.ch}`}>
                    <span className="name">
                      {t.chapterShort(c.no)} — {c.title}
                    </span>
                    <span className="len">{t.dur(c.ms)}</span>
                    <span className="bar" aria-hidden="true">
                      <span style={{ width: `${(c.ms / max) * 100}%` }} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mini-title">{t.byDay}</p>
            <ol className="rlog-days">
              {shownDays.map((d) => (
                <li key={d.key}>
                  <div className="day">
                    <span>{dayLabel(d)}</span>
                    <b>{t.dur(d.items.reduce((n, l) => n + l.ms, 0))}</b>
                  </div>
                  <ul>
                    {d.items.map((l) => {
                      const c = find(l);
                      return (
                        <li key={l.id}>
                          <span className="when">{time(l.start)}</span>
                          <span className="what">
                            {c ? (
                              <Link to={`/kitab/${l.book}/${l.ch}`}>
                                {t.chapterShort(c.no)} — {c.title}
                              </Link>
                            ) : (
                              l.ch
                            )}
                          </span>
                          <span className="len">{t.dur(l.ms)}</span>
                          <button
                            type="button"
                            className="rt-del"
                            title={t.remove}
                            aria-label={`${t.remove}: ${time(l.start)}`}
                            onClick={() => window.confirm(t.removeConfirm) && removeLog(l.id)}
                          >
                            ×
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
            {days.length > DAYS_SHOWN && (
              <button type="button" className="link-btn" onClick={() => setAll((v) => !v)}>
                {all ? t.showLess : t.showAll(days.length)}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
