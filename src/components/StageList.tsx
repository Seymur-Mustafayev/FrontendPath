import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale';
import { LEVELS, pathIndex, pathsOfLevel } from '../lib/content';
import { useProgress } from '../lib/useProgress';
import { LEVEL_LABEL } from '../types';
import { ProgressBar } from './ProgressBar';

export function StageList() {
  const { doneInPath } = useProgress();
  const { ui, content } = useLocale();
  const s = ui.stages;

  return (
    <section className="sec sec--alt" id="merhele">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{s.kicker}</p>
          <h2 className="sh">{s.title}</h2>
          <p>{s.intro}</p>
        </div>

        {LEVELS.map((level) => (
          <div className="stage" key={level}>
            <div className="stage-head">
              <h3>{s.items[level].title}</h3>
              <span>{s.items[level].description}</span>
            </div>
            <div className="cards">
              {pathsOfLevel(content, level).map((path) => {
                const done = doneInPath(path.id);
                return (
                  <Link className="card" to={`/yol/${path.id}`} key={path.id}>
                    <span className="cno">
                      {s.pathNo(String(pathIndex(content, path.id) + 1).padStart(2, '0'))} ·{' '}
                      {LEVEL_LABEL[path.lvl].toUpperCase()}
                    </span>
                    <h4>{path.name}</h4>
                    <p>{path.sum}</p>
                    <span className="cfoot">
                      <ProgressBar done={done} total={path.topics.length} />
                      {s.topics(done, path.topics.length)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
