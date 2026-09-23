import { Link, useSearchParams } from 'react-router-dom';
import { LevelBadge } from '../components/LevelBadge';
import { TASK_TOPICS, topicTasks } from '../data/tasks';
import { useLocale } from '../i18n/useLocale';
import { useProgress } from '../lib/useProgress';

export function taskKey(id: string): string {
  return `task.${id}`;
}

export function TasksPage() {
  const { ui, locale, content } = useLocale();
  const { isDone } = useProgress();
  const [params, setParams] = useSearchParams();
  const t = ui.tasks;
  const topic = TASK_TOPICS.find((x) => x.id === params.get('m')) ?? TASK_TOPICS[0]!;
  const tasks = topicTasks(topic.id);
  const path = content.paths.find((p) => p.id === topic.path);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{t.kicker}</p>
          <h2 className="sh">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <div className="task-topics" role="tablist" aria-label={t.topics}>
          {TASK_TOPICS.map((x) => {
            const list = topicTasks(x.id);
            const solved = list.filter((task) => isDone(taskKey(task.id))).length;
            const active = x.id === topic.id;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`task-topic${active ? ' task-topic--active' : ''}`}
                onClick={() => setParams({ m: x.id }, { replace: true })}
              >
                <span className="task-topic-title">{x.title[locale]}</span>
                <span className={`task-topic-meta${solved === list.length ? ' all' : ''}`}>
                  {t.solvedOf(solved, list.length)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="task-panel" role="tabpanel">
          <div className="task-panel-head">
            <h3>{topic.title[locale]}</h3>
            <p>{topic.sum[locale]}</p>
            {path && (
              <p className="task-path">
                {t.fromPath} <Link to={`/yol/${path.id}`}>{path.name}</Link>
              </p>
            )}
          </div>
          <ol className="task-list">
            {tasks.map((task, i) => {
              const done = isDone(taskKey(task.id));
              return (
                <li key={task.id} className={done ? 'done' : undefined}>
                  <Link to={`/tapsiriqlar/${task.id}`}>
                    <span className="task-no">{done ? '✓' : String(i + 1).padStart(2, '0')}</span>
                    <span className="task-name">{task.title[locale]}</span>
                    <LevelBadge level={task.lvl} />
                    {done && <span className="visually-hidden">{t.solved}</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
