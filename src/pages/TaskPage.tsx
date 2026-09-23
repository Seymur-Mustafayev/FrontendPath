import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CodeEditor } from '../components/CodeEditor';
import { LevelBadge } from '../components/LevelBadge';
import { TopicBody } from '../components/TopicBody';
import { TASK_TOPICS, getTask, topicTasks } from '../data/tasks';
import type { Task } from '../data/tasks';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';
import { formatExpected, runTests } from '../lib/runTests';
import type { TestResult } from '../lib/runTests';
import { NotFoundPage } from './NotFoundPage';
import { taskKey } from './TasksPage';

const draftKey = (id: string) => `task-code:${id}`;

function readDraft(task: Task): string {
  try {
    return localStorage.getItem(draftKey(task.id)) ?? task.starter;
  } catch {
    return task.starter;
  }
}

function writeDraft(task: Task, code: string) {
  try {
    if (code === task.starter) localStorage.removeItem(draftKey(task.id));
    else localStorage.setItem(draftKey(task.id), code);
  } catch {
  }
}

export function TaskPage() {
  const { taskId = '' } = useParams();
  const task = getTask(taskId);
  if (!task) return <NotFoundPage />;
  return <TaskView key={task.id} task={task} />;
}

function TaskView({ task }: { task: Task }) {
  const { ui, locale } = useLocale();
  const { isDone, toggle } = useProgress();
  const t = ui.tasks;
  const [code, setCode] = useState(() => readDraft(task));
  const [results, setResults] = useState<(TestResult | undefined)[]>([]);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const topic = TASK_TOPICS.find((x) => x.id === task.topic);
  const siblings = topicTasks(task.topic);
  const index = siblings.findIndex((x) => x.id === task.id);
  const prev = siblings[index - 1];
  const next = siblings[index + 1];
  const solved = isDone(taskKey(task.id));
  const ran = results.length > 0;
  const passed = results.filter((r) => r?.status === 'pass').length;

  useEffect(() => writeDraft(task, code), [task, code]);

  async function run() {
    if (running) return;
    setRunning(true);
    setResults(task.tests.map(() => undefined));
    const final = await runTests(code, task.tests, (i, r) =>
      setResults((prevResults) => {
        const copy = [...prevResults];
        copy[i] = r;
        return copy;
      })
    );
    setRunning(false);
    if (final.length === task.tests.length && final.every((r) => r.status === 'pass') && !isDone(taskKey(task.id))) {
      toggle(taskKey(task.id));
    }
  }

  function reset() {
    if (code !== task.starter && !window.confirm(t.resetConfirm)) return;
    setCode(task.starter);
    setResults([]);
  }

  function revealSolution() {
    if (showSolution) return setShowSolution(false);
    if (solved || window.confirm(t.solutionConfirm)) setShowSolution(true);
  }

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">
            <Link to={`/tapsiriqlar?m=${task.topic}`}>{t.back}</Link> · {topic?.title[locale]}
          </p>
          <h2 className="sh task-title">
            {task.title[locale]}
            <LevelBadge level={task.lvl} />
            {solved && <span className="task-solved">✓ {t.solved}</span>}
          </h2>
        </div>

        <div className="task-layout">
          <div className="task-desc">
            <div className="body body--flush">
              <TopicBody text={task.desc[locale]} />
            </div>

            <details className="task-hint">
              <summary>{t.hint}</summary>
              <div className="body body--flush">
                <TopicBody text={task.hint[locale]} />
              </div>
            </details>

            <div className="task-solution">
              <button type="button" className="link-btn" aria-expanded={showSolution} onClick={revealSolution}>
                {showSolution ? t.solutionHide : t.solution}
              </button>
              {showSolution && (
                <>
                  <pre className="code">
                    <code>{task.solution}</code>
                  </pre>
                  <button type="button" className="link-btn" onClick={() => setCode(task.solution)}>
                    {t.useSolution}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="task-work">
            <div className="task-editor-head">
              <label htmlFor="task-code">{t.editor}</label>
              <span>{t.editorHint}</span>
            </div>
            <CodeEditor id="task-code" value={code} onChange={setCode} onRun={run} label={t.editor} />
            <div className="task-actions">
              <button type="button" className="btn btn--primary" onClick={run} disabled={running}>
                {running ? t.running : `▶ ${t.run}`}
              </button>
              <button type="button" className="btn btn--ghost" onClick={reset} disabled={running}>
                {t.reset}
              </button>
            </div>

            <div className="task-results" aria-live="polite">
              <div className="task-results-head">
                <h3>{t.tests}</h3>
                {ran && !running && (
                  <span className={passed === task.tests.length ? 'score all' : 'score'}>
                    {t.passed(passed, task.tests.length)}
                  </span>
                )}
              </div>
              {ran && !running && passed === task.tests.length && <p className="task-win">{t.allPassed}</p>}
              {!ran && <p className="task-empty">{t.notRun}</p>}
              <ol>
                {task.tests.map((test, i) => {
                  const r = results[i];
                  const status = r?.status ?? (running ? 'pending' : 'idle');
                  return (
                    <li key={i} className={`test test--${status}`}>
                      <span className="test-icon" aria-hidden="true">
                        {status === 'pass' ? '✓' : status === 'pending' ? '…' : status === 'idle' ? '•' : '✗'}
                      </span>
                      <div className="test-body">
                        <code className="test-call">{test.call}</code>
                        <dl>
                          <dt>{t.expected}</dt>
                          <dd>
                            <code>{test.throws ? t.throws : formatExpected(test)}</code>
                          </dd>
                          {r && r.status !== 'timeout' && (r.actual !== undefined || r.error) && (
                            <>
                              <dt>{r.error ? t.error : t.actual}</dt>
                              <dd>
                                <code>{r.error ?? r.actual}</code>
                              </dd>
                            </>
                          )}
                        </dl>
                        {r?.status === 'timeout' && <p className="test-note">{t.timeout}</p>}
                        {r && r.logs.length > 0 && (
                          <pre className="test-logs" aria-label={t.logs}>
                            {r.logs.join('\n')}
                          </pre>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        <nav className="task-nav">
          {prev ? (
            <Link to={`/tapsiriqlar/${prev.id}`}>← {t.prev}: {prev.title[locale]}</Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/tapsiriqlar/${next.id}`}>
              {t.next}: {next.title[locale]} →
            </Link>
          )}
        </nav>
      </div>
    </section>
  );
}
