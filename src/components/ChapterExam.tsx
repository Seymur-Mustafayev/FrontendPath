import { useEffect, useRef, useState } from 'react';
import type { ExamQuestion } from '../data/books';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { Inline, TopicBody } from './TopicBody';

const STORE_KEY = 'fe-exam-v1';
const PASS = 80;

interface Saved {
  best: number;
}

function readStore(): Record<string, Saved> {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}') as Record<string, Saved>;
  } catch {
    return {};
  }
}

export function examKey(bookId: string, chapterId: string): string {
  return `exam.${bookId}.${chapterId}`;
}

export function examBest(key: string): number | null {
  return readStore()[key]?.best ?? null;
}

function saveBest(key: string, pct: number) {
  try {
    const all = readStore();
    all[key] = { best: Math.max(pct, all[key]?.best ?? 0) };
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable */
  }
}

export function ChapterExam({
  bookId,
  chapterId,
  questions
}: {
  bookId: string;
  chapterId: string;
  questions: ExamQuestion[];
}) {
  const { ui } = useLocale();
  const { isDone, toggle } = useProgress();
  const t = ui.exam;
  const key = examKey(bookId, chapterId);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const [missing, setMissing] = useState(0);
  const [best, setBest] = useState<number | null>(() => examBest(key));
  const top = useRef<HTMLElement>(null);

  useEffect(() => {
    setAnswers(questions.map(() => null));
    setChecked(false);
    setMissing(0);
    setBest(examBest(key));
  }, [key, questions]);

  const correct = answers.filter((a, i) => a === questions[i]!.answer).length;
  const pct = Math.round((correct / questions.length) * 100);

  function pick(qi: number, oi: number) {
    if (checked) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
    setMissing(0);
  }

  function check() {
    const left = answers.filter((a) => a === null).length;
    if (left > 0) {
      setMissing(left);
      const first = answers.findIndex((a) => a === null);
      document.getElementById(`q-${chapterId}-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setChecked(true);
    saveBest(key, pct);
    setBest((b) => Math.max(pct, b ?? 0));
    if (pct >= PASS && !isDone(key)) toggle(key);
  }

  function retry() {
    setAnswers(questions.map(() => null));
    setChecked(false);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="exam" id="exam" ref={top} aria-labelledby={`exam-title-${chapterId}`}>
      <div className="exam-head">
        <div>
          <p className="kicker">{t.kicker}</p>
          <h3 id={`exam-title-${chapterId}`}>{t.title}</h3>
          <p className="exam-intro">{t.intro(questions.length)}</p>
        </div>
        {best !== null && (
          <p className={`exam-best${best >= PASS ? ' exam-best--ok' : ''}`}>
            {best >= PASS ? '✓ ' : ''}
            {t.best(best)}
          </p>
        )}
      </div>

      <ol className="exam-list">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          const right = chosen === q.answer;
          return (
            <li
              key={qi}
              id={`q-${chapterId}-${qi}`}
              className={`exam-q${checked ? (right ? ' is-right' : ' is-wrong') : ''}${
                missing && chosen === null ? ' is-missing' : ''
              }`}
            >
              <fieldset>
                <legend>
                  <span className="exam-no">{qi + 1}.</span> <Inline text={q.q} />
                </legend>
                {q.code && (
                  <pre className="code">
                    <code>{q.code}</code>
                  </pre>
                )}
                <div className="exam-options">
                  {q.options.map((o, oi) => {
                    let cls = 'exam-opt';
                    if (chosen === oi) cls += ' is-chosen';
                    if (checked && oi === q.answer) cls += ' is-answer';
                    if (checked && chosen === oi && !right) cls += ' is-miss';
                    return (
                      <label key={oi} className={cls}>
                        <input
                          type="radio"
                          name={`q-${chapterId}-${qi}`}
                          checked={chosen === oi}
                          disabled={checked}
                          onChange={() => pick(qi, oi)}
                        />
                        <span>
                          <Inline text={o} />
                        </span>
                      </label>
                    );
                  })}
                </div>
                {checked && (
                  <div className="exam-why">
                    <p className="exam-verdict">{right ? `✓ ${t.correct}` : `✗ ${t.wrong}`}</p>
                    <TopicBody text={q.why} />
                  </div>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="exam-foot">
        {checked ? (
          <>
            <p className={`exam-result${pct >= PASS ? ' is-pass' : ''}`} role="status">
              <b>{t.score(correct, questions.length)}</b> · {pct}% — {pct >= PASS ? t.passed : t.failed}
            </p>
            <button type="button" className="rt-btn" onClick={retry}>
              {t.retry}
            </button>
          </>
        ) : (
          <>
            {missing > 0 && (
              <p className="exam-missing" role="status">
                {t.unanswered(missing)}
              </p>
            )}
            <button type="button" className="rt-btn rt-btn--main" onClick={check}>
              {t.check}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
